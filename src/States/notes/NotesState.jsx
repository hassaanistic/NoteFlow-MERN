import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
const NotesContext = createContext();

export function notesStates() {
  return useContext(NotesContext);
}

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);

  //toast Alerts
  const toast = useToast();
  const addedToast = () => {
    toast({
      title: "Successfully added",
      description: "Note Added Successfully",
      duration: 3000,
      isClosable: true,
      status: "success",
      position: "bottom-right",
    })
  }
  const deleteToast = () => {
    toast({
      title: "Successfully deleted",
      description: "Note delete Successfully",
      duration: 3000,
      isClosable: true,
      status: "error",
      position: "bottom-right",
    })
  }
  const editToast = () => {
    toast({
      title: "Successfully edited",
      description: "Note edited Successfully",
      duration: 3000,
      isClosable: true,
      status: "success",
      position: "bottom-right",
    })
  }


  const fetchNotes = async () => {
    try {
      
      const response = await fetch('http://localhost:5000/api/notes', {
        // const response = await fetch('../data/db.json', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`, // Replace with your JWT token
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const dataOfNotes = await response.json();
      // setNotes(dataOfNotes.tasks);
      setNotes(dataOfNotes);

    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }


  const addNote = async (title, description ,noteImage) => {
    try {
      const response = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          description: description,
          noteImage:noteImage,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // After successfully adding the note, fetch the updated list of notes
      await fetchNotes();

      addedToast();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };


  const deleteNote = async (noteId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // After successfully deleting the note, fetch the updated list of notes
      await fetchNotes();
      deleteToast();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const editNote = async (noteId, editedTitle, editedDescription) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // After successfully editing the note, fetch the updated list of notes
      await fetchNotes();
      editToast();
    } catch (error) {
      console.error('Error editing note:', error);
    }
  };
  return (
    <NotesContext.Provider value={{ notes, fetchNotes, addNote, deleteNote ,editNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export default NotesProvider; 