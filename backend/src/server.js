import express from "express"
import RestaurantsRoutes from "./Routes/RestaurantsRoutes.js"
import {connectDB} from "./config/db.js"
import dotenv from "dotenv"
import path from "path"
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"
import AuthRoutes from "./Routes/AuthRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

//middleware
if (process.env.NODE_ENV !== "production"){
    app.use(
        cors({
            origin:true,
        })
    );
};


app.use(express.json());// this middleware will pass the json bodies
app.use(rateLimiter);
//our simple custom middleware
// app.use((req,res,next) => {
//    console.log(`Request method is ${req.method} & Req URL is ${req.url}`);
//    next();
// })
app.use("/api/auth", AuthRoutes);
app.use("/api/restaurants",RestaurantsRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    });
}

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server Started on PORT:", PORT);
    });
});

