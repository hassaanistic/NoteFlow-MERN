https://github.com/hassaanistic/NoteFlow-MERN/assets/97599430/5f4b1aa1-c4d8-4b38-9c18-3c9f74096344
# Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## You need MongoDb,NodeJs,ExpressJs,React to run the project.
First of all:



### `npm install`

### `1-Start the backend and frontend separately like`
Open project folder and open terminal then run these commands:
### `cd backend`
### `npm run start`
And open the new terminal and run this:
### `npm run dev`
Now All set.

### `2-Start both at once`
If you wanna start at once just open terminal in project folder and run 
### `npm run both`


# Acknowledgements 🔎

### `Role: User`

| Feature           | Description                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| Authentication    | Users need to register their account and then log in to use the web application                |
| Profile Update    | Users can update their profile                                                                  |
| Reset Password    | Users can reset their password by receiving a link in their email                                |
| Keep Notes        | Users can create a note with or without image inside it. Edit and delete the Notes                |
| Image Store        | All the images store in the Uploads Folder of the backend and their URLs store in the Databse                |

# Folder Structure 🛠
    .
    ├── backend         # Have all the backend files
    ├── public          # Root folder that provides a context for React.js to render      
    |   ├── index.html          
    |
    ├── src             # Folder containing JavaScript code                     
    │   └── components  # Stores components to be rendered throughout the application
    │   └── layout      # It has the layout component which is specific for the design
    │   └── pages       # Stores all the pages to be rendered throughout the application
    │   └── states      # Stores all the states and their actions
    │     └── NotesStates      # Stores all the states foe the notes handeling
    │     └── UsersState       # Stores all the states for the users handeling
    │   └── styles      # Stores all the CSS styles to be rendered throughout the application
    |   ├── App.jsx     # It has the routes of all the components 
    |   ├── main.jsx    # Root component
    |   ├── index.jsx   # Entry point 
    └──   
# Made by @hassaanistic with ♥ 
