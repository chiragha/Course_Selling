import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import courseRoute from "./routes/course.route.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from "express-fileupload";


import cors from "cors";




const app = express();
dotenv.config();


// middleware 
app.use(express.json());
// Note that this option available for versions 1.0.0 and newer. 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
// cors code 
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



const port = process.env.PORT || 3000;
const DB_URL = process.env.MONGO_URL;

try {
  await mongoose.connect(DB_URL);
  console.log("connected to mongodb");
  
} catch (error) {
  console.log(error)
}


// routes code 
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);

// image saving on cloudinary 
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
