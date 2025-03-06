import "dotenv/config.js";
import express from "express";

app.use(express.json());

const app = express();

app.listen(process.env.PORT, () => {
    console.log("listening on port 8080");
});
