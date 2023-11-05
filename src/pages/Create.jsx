
import React, { useState } from 'react'
import { Button, Input, Flex, useToast } from "@chakra-ui/react"
import { notesStates } from '../States/notes/NotesState';


function Create() {
  const { addNote } = notesStates();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [noteFileInput, setNoteFileInput] = useState(null);
  const [noteImage, setNoteImage] = useState(null);



  const onChangeHandleNoteImage = (e) => {
    setNoteFileInput(e.target.files[0]);
  };

  //make sure to write the function code before we calling it 
  //Dont use
  // await 
  // await frequency in one scoope 
  //if no need then make sure to not use keyWord async

  //This code is working well 
  //it show the null when I upload big size image So this is the case that cause the errors 
  //return in the function
  // const name = await function();  
  //then pass the value 
  //this is good practice
  //make sure to check the createfile

  const noteImageUpload = async () => {
    if (noteFileInput) {
      const formData = new FormData();
      formData.append('image', noteFileInput);

      try {
        //------>this await is important <-------
        const response = await fetch('http://localhost:5000/api/images/upload/notes', {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Image upload failed.');
        }

        const dataOfImage = await response.json();
        console.log('Received image data:', dataOfImage);
        console.log(dataOfImage._id);
        setNoteImage(dataOfImage._id);

        return dataOfImage;
      } catch (error) {
        console.error('Error uploading image:', error);
        toast({
          title: 'Image Upload Failed',
          description: 'Failed to upload the image',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom-right',
        });
      }
    }
  };


  const handleAddNote = async () => {

    const image = await noteImageUpload();
    //this "image" has the complete image data

    // console.log(image._id);

    if (image) {
      addNote(title, description, image._id);
      setTitle('');
      setDescription('');
      setNoteImage(null);
      setNoteFileInput(null);

    } else {
      addNote(title, description, null);
      setTitle('');
      setDescription('');
      setNoteImage(null);
      setNoteFileInput(null);

    }


  };

  const toast = useToast();
  const showToast = () => {
    toast({
      title: "Logged out",
      description: "Successfully Logged out",
      duration: 3000,
      isClosable: true,
      status: "error",
      position: "bottom-right",
      icon: <UnlockIcon />

    })
    navigate("/register")
  }

  return (
    <div>
      <Flex width={"100%"} justifyContent={"center"}>
        <Flex flexDir={"column"}
          // gap={"40px"}
          // justifyContent={"center"}
          width={"50vw"}
          boxShadow={"md"}
          bg={"white"}
          borderRadius={10}
        // height={"10vh"}
        >
          <Input
            border="none"
            _focusVisible={false}
            placeholder="Title"
            size="md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            border="none"
            _focusVisible={false}
            placeholder="Write your thoughts . . ."
            size="md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Flex width={"100%"}>

            <Button
              border="none"
              m="10px"
              width="20%"
              bgColor="purple.300"
              onClick={handleAddNote}
            >
              ADD
            </Button>

            <Button
              border="none"
              m="10px"
              width="20%"
              // bgColor="purple.100"
            >
              <label htmlFor="noteImageInput" style={{ cursor: "pointer" }}>
                uploadImage
              </label>

              <input
                type="file"
                accept="image/*"
                id="noteImageInput"
                style={{ display: "none" }}
                onChange={onChangeHandleNoteImage}
              />

            </Button>

          </Flex>
        </Flex>

      </Flex>


    </div>
  )
}

export default Create