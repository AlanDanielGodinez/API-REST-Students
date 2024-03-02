const express = require("express");
const bodyParser = require("body-parser");
const studentRouter = require("./routes/studentRoutes");

const app = express(); 
app.use(bodyParser.json());

app.get("/", (req,res) => {
    res.json({ Message: `Server running on port ${PORT}` });
})

app.use("/student", studentRouter);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})