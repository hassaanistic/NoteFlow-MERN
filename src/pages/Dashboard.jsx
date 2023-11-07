import React, { useEffect, useState } from 'react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Image
} from '@chakra-ui/react';
import { notesStates } from '../States/notes/NotesState';

import '../styles/Dashboard.css';

import Spinner from '../components/Spinner';

export default function Dashboard() {
  const { notes, fetchNotes, deleteNote, editNote } = notesStates();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [selectedNote, setSelectedNote] = useState(null); // Store the selected note for editing
  const [dashboardImageData, setDashboardImageData] = useState({});

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  const [isLoading, setIsLoading] = useState(true); // Add loading state



  // const [selectedImageForDisplay, setselectedImageForDisplay] = useState({});
  //we make name changes in both dashboard and profile.jsx
  const fetchAndDisplayImageOfNote = (imageUrlOfNote, noteId) => {
    fetch(imageUrlOfNote, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then(async (response) => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error("Failed to fetch the image.");
      })
      .then((blobForNoteImage) => {
        const noteUrlACTUAL = URL.createObjectURL(blobForNoteImage);
        setDashboardImageData((prevImages) => ({
          ...prevImages,
          [noteId]: noteUrlACTUAL,
        }));
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  };

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     fetchNotes().then(() => {
  //       // After fetching the notes, fetch and display images for each note
  //       notes.forEach((note) => {
  //         if (note.noteImage) {
  //           const imageUrlOfNote = `http://localhost:5000/api/images/${note.noteImage}`;
  //           fetchAndDisplayImageOfNote(imageUrlOfNote, note._id);
  //         }
  //         setIsLoading(false);
  //       });
  //     });
  //   }
  // }, [fetchNotes, notes]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchNotes().then(() => {
        // After fetching the notes, fetch and display images for each note
        const imagePromises = notes.map((note) => {
          if (note.noteImage) {
            const imageUrlOfNote = `http://localhost:5000/api/images/${note.noteImage}`;
            return fetchAndDisplayImageOfNote(imageUrlOfNote, note._id);
          }
          return Promise.resolve(); // Return a resolved promise for notes without images
        });

        Promise.all(imagePromises).then(() => {
            setIsLoading(false); // Set loading state to false

          // setTimeout(() => {
          //   setIsLoading(false); // Set loading state to false
          // }, 300);          
        });
      });
    }
  }, [fetchNotes, notes]);




  //Editing and Open the modal
  const handleEditClick = (note) => {
    setSelectedNote(note);
    setEditedTitle(note.title);
    setEditedDescription(note.description);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const handleEditSubmit = () => {
    if (selectedNote) {
      editNote(selectedNote._id, editedTitle, editedDescription);
      setIsEditModalOpen(false);
    }
  };

  ///deleting the note
  const handleDeleteNote = (noteId) => {
    deleteNote(noteId);
  };


  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };


  return (
    <div className="col">

      {isLoading ? (
         <Flex  w={"70vw"} h={"50vh"} justifyContent={"center"} alignItems={"center"} >
         <Spinner />
       </Flex>

      ) : (
        notes &&
        notes.map((note, index) => (

          <div className="col-item" key={note._id}>
            <Box
              w={"100%"}

              h={note.noteImage ? "150px" : "auto"}


              onClick={() => handleImageClick(dashboardImageData[note._id])}
              style={{ cursor: 'pointer' }} // Add a pointer cursor for images
            >
              {/* //we make an object of the selectedImagesForDisplay and save the url of the image with their "note._id" respectively */}
              {/* And then we fetch the image using the note._id */}
              {dashboardImageData[note._id] && (
                <div style={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden", // Ensure the image doesn't overflow its container
                  position: "relative", // Set the container's position to relative
                }}>
                  <img
                    src={dashboardImageData[note._id]}
                    alt="Selected"
                    style={{
                      width: "100%", // Make the image take 100% of the container's width
                      height: "100%", // Make the image take 100% of the container's height
                      overflow: "hidden",
                      objectFit: "cover", // Cover the container and maintain aspect ratio
                      objectPosition: "center", // Center the image both horizontally and vertically
                    }}
                  />
                </div>
              )}
            </Box>

            <Heading as="h3" fontSize="1.5em">
              {note.title}
            </Heading>

            <div className="col-item-text">
              <Text>{note.description}</Text>
            </div>

            <div className="col-item-buttons">
              <Flex gap={2}  >

                <Button onClick={() => handleDeleteNote(note._id)}
                  fontSize="1em"
                  variant="unstyled"
                  leftIcon={<DeleteIcon />}
                >
                  Delete
                </Button>

                <Button
                  fontSize="1em"
                  variant="unstyled"
                  leftIcon={<EditIcon />}
                  onClick={() => handleEditClick(note)}
                >
                  Edit
                </Button>
              </Flex>
            </div>
          </div>
        ))

      )}


      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={handleEditModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Title"
              value={editedTitle}
              onChange={handleTitleChange}
            />
            <Input
              placeholder="Description"
              value={editedDescription}
              onChange={handleDescriptionChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={handleEditModalClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Image Modal */}
      <Modal
        isOpen={isImageModalOpen}
        onClose={closeImageModal}
        size="lg" // Adjust the size to your preference (e.g., "sm", "md", "lg")
        isCentered // Center the modal
      >
        <ModalOverlay />
        <ModalContent
          style={{
            position: 'absolute',

            transform: 'translate(-50%, -50%)',
          }}
        >
          <ModalHeader>Image Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={selectedImage} alt="Image Preview" />
          </ModalBody>
        </ModalContent>
      </Modal>


    </div>
  );

}
