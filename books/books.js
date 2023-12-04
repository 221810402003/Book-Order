const express = require("express");
const connectDb = require("./bookdb");
const dotenv = require("dotenv").config();
const bodyparser = require("body-parser");
const { default: mongoose } = require("mongoose");
const app = express();

connectDb();

require("./bookmodel")

const Book = mongoose.model("Book")

app.use(bodyparser.json());

app.get("/book", (req,res) => {
    Book.find().then((books) => {
        res.json(books)
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})

app.get("/book/:id", (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if(book){
            res.json(book)
        }
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})

app.delete("/book/:id", (req, res) => {
    Book.findByIdAndDelete(req.params.id).then((book) => {
        res.send("book deleted")
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})

app.post("/book", (req,res) => {
    var newbook = {
        title: req.body.title,
        author: req.body.author,
        numberpage: req.body.numberpage,
        publisher: req.body.publisher
    }
    var book = new Book(newbook)
    book.save().then(() => {
        console.log("new book created")
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
    res.send("New book created")
})

app.listen(5000, () => {
    console.log("running")
})