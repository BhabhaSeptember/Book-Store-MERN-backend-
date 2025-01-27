import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import  { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express() ;

//================================= MIDDLEWARE =================================

app.use(express.json());

app.use("/books", booksRoute);

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
})
);

//================================= ROUTES =================================

//HOME PAGE
app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send(`Welcome To The MERN-Stack BookStore!`);
})

mongoose.connect(mongoDBURL)
.then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
        console.log(`App listening on port : ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});