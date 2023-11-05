const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, ("./uploads") );  // ->("./uploads")  this is the destination where files will save in the HArdDisk Storage / ---> agr koi error nhi ha to store kr do  
      //we can check in the callbacck if error occur we replace null with error message 
      //if user is not authenticated then we'll use if else condition to through error instead of the null
    },
    filename: (req, file, callback) => {
    
      callback(null, file.originalname);
    },
  });

//   const upload = multer({ storage :storage });
  const upload = multer({ storage });

  module.exports = upload;
  
// memoryStorage() vs diskStorage() === {    
// const storage = multer.memoryStorage(); // It open the image in the Ram temporarily --> Not save permanently -> good for croping , editing , and making change in the  file Function without saving the copy permanently 
//we use memoryStorage if we don't need to save the image permanently and for future use

//In our case we have to use the disk storage to save the images permanently for the future use 
//}


//timestaps ==== {  // Append a timestamp to the original filename to avoid overwriting

  // for storing the user id or date with name for distinction btween same name files  //we can use the timestamp but it is not convenient when we getting the single image by creating the path to the uploads 
  //will add when i add user authentication and add the (req.user._id)
  // const user_id = (req.user._id);
  // const filename = `${user_id}-${file.originalname}`;
  // callback(null, filename);
//}
