const express = require('express');
const db = require("./config/connectToDatabase")
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const notesRouter =  require("./routes/notesRoutes");
const imageRouter =  require("./routes/imageRoutes");
const userRouter =  require("./routes/userRoutes");
var cors = require('cors')

const { userValidator } = require('./middlewares/userValidator'); // Import and use verifyToken middleware

app.use(express.json());
app.use(cors());

app.get('/', (req,res )=>{
    res.send("hello");
});


//using middleware "router"
app.use('/api/notes',notesRouter);
app.use('/api/images',imageRouter);

app.use("/api/users" ,userRouter);

app.listen(PORT , (req, res) => {
    console.log(`Running at http://localhost:${PORT}`);
}); 