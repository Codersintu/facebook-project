
const express=require('express');
const morgan =require('morgan')
const helmet=require('helmet')
const app=express();
const mongoose =require('mongoose')
const dotenv =require('dotenv')
dotenv.config()
const authrouter=require('./router/auth')
const postrouter=require('./router/posts')
const conversationrouter=require("./router/conversation")
const messagerouter=require("./router/message")
const cors =require('cors')
const userrouter=require("./router/users")
const multer = require("multer");
const router = express.Router();
const path = require("path");
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            // No deprecated options needed
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}
connectDB();
console.log('MongoDB URI:', process.env.MONGO_URL);


app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use("/images", express.static(path.join(__dirname, "public/images")));


app.use(express.json());
app.use(helmet());
app.use(morgan("common"))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

  
app.use('/api/auth',authrouter)
app.use('/api/post',postrouter)
app.use("/api/users",userrouter)
app.use('/api/conversation',conversationrouter)
app.use('/api/message',messagerouter)

const PORT=8801;
app.listen(PORT,()=>{
    console.log(`Backend server is running http://localhost:${PORT}`)
})
