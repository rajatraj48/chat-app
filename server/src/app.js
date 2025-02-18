import express from 'express'
import cors from "cors"
import bodyParser from 'body-parser'
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import errorHandler from './middleware/errorhandler.js';


const app = express();
app.use(express.json());
app.use(cors());

const corsOptions = {
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], 
  };
  
  app.use(cors(corsOptions)); // This also allows all origins
  app.use(bodyParser.json()); // Parse JSON request bodies
  app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data




app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/message",messageRoutes);
app.use(errorHandler)





app.listen(8082,()=>{
    console.log('server running on port 8082');
})