import express from "express";

// Create an app
const app = express();

// Listen for incoming request
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
    });
