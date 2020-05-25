const express = require("express");
const app = express();
const POST = 4000;

function handleListening(){
    console.log(`Listening on: ${POST}`);
}

function handleHome(req, res) {
    res.send("This is HOME area");
}

function handleProfile(req, res){
    res.send("This is Profile area");
}

app.get("/", handleHome);
app.get("/profile", handleProfile);
app.listen(POST, handleListening);