const mongoose = require("mongoose");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const express = require("express");

// mongo connection
var conn = mongoose.connection;

// Init gfs
let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("medical_history");
});

// Create storage engine
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
          bucketName: "medical_history",
          note: req.body.note,
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

// end of file upload

// get all files
const findFiles = async () => {
  try {
    const files = await gfs.files.find().toArray();
    return files;
  } catch (err) {
    return err;
  }
};

// get one file by filename
const findFileByFilename = async (filename) => {
  try {
    const file = await gfs.files.findOne({ filename: filename });
    return file;
  } catch (err) {
    return err;
  }
};



// download one file by filename
const getFileByFilename = async (filename, res) => {
  try {
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "medical_history",
    });
    const downloadStream = bucket.openDownloadStreamByName(filename);
    return downloadStream;
  } catch (err) {
    console.log(err);
    res.status(404).send("File not found");
  }
};

module.exports = { upload, findFiles, findFileByFilename, getFileByFilename };
