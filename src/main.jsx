import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ChakraProvider } from '@chakra-ui/react' //chakra Ui
import { NotesProvider } from "../src/States/notes/NotesState"; // Import the NotesProvider
import { UsersProvider } from "../src/States/users/UsersState"; // Import the NotesProvider


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <UsersProvider>
        <NotesProvider>
          <App />
        </NotesProvider>
      </UsersProvider>

    </ChakraProvider>
  </React.StrictMode>,
)
