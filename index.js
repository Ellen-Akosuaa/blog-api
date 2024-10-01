import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./routes/user.js";


// Connect database
await mongoose.connect(process.env.MONGO_URL);

// Create an app
const app = express();

// Use Middlewares
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    })
}))


// Use Routes
app.use('/users', userRouter);


// Listen for incoming request
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
