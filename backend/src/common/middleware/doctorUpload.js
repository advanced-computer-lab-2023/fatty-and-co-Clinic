// file
const { default: mongoose } = require("mongoose");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

//file upload
//Init gfs
let gfs;
var conn = mongoose.connection;
conn.once("open", () => {
  //Init stream
  gfs = new Grid(conn.db, mongoose.mongo);
  gfs.collection("doctor_uploads");
  
});
//create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "request_uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage }); 
const cpUpload = upload.fields([
  { name: "IdFile", maxCount: 1 },
  { name: "MedicalLicense", maxCount: 1 },
  { name: "MedicalDegree", maxCount: 1 },
]);

const getDoctorFiles = (req, res) => {
  gfs.files.find().toArray((err, files) => {
    //check if files exist
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }
    //files exist
    return res.json(files);
  });
};

const getDoctorFile = (name) => {
  
    try {
      const file = gfs.files.findOne({ filename: name }); //for all files we use find().toArray
      if (!file || file.length === 0) {
        retrun("No file found");
      }
      console.log("file", file);
      resolve(file);
    } catch (error) {
      reject(error);
    }
  };

const getFile = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const file = await getDoctorFile(name);
      //if(file.contentType === 'image/jpeg' || file.contentType === 'image/png')
      //read output to browser
      console.log("file", file.filename);
      let bucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "fs",
      });
      var readstream = bucket.openDownloadStreamByName(file.filename);
      console.log("readstream", readstream);
      //readstream.pipe(res);
      resolve(readstream);
    } catch (error) {
      reject(error);
    }
  });
};


const allFiles = ()=>{
  console.log("out")
 
  gfs.files.find().toArray( (err, files) => {
    console.log("in")
    //check if files exist
    if (!files || files.length === 0) {
      
      return res.status(404).json({
        err: "No files exist",
      });
    }
    //files exist
   
    return files;
  });
}

module.exports = { cpUpload, getDoctorFile, getFile , allFiles};
