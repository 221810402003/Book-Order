const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const connectDb = require("../books/bookdb");
const bodyparser = require("body-parser");

connectDb();
const app = express();

require("./customersmodel")

const Customer = mongoose.model("Customer")

app.use(bodyparser.json());

app.get("/customer", (req,res) => {
    Customer.find().then((customer) => {
        res.json(customer)
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})

app.get("/customer/:id", (req, res) => {
    Customer.findById(req.params.id).then((customer) => {
        if(book){
            res.json(customer)
        }
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})

app.delete("/customer/:id", (req, res) => {
    Customer.findByIdAndDelete(req.params.id).then((customer) => {
        res.send("book deleted")
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})

app.post("/customer", (req, res) => {
    var newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    };
    var customer = new Customer(newCustomer);
    customer.save().then(() => {
        console.log("Customer created");
        res.send("Customer created");
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});


app.get('/', (req,res) => {
    res.send("working")
})

app.listen(4000, (req,res) => {
    console.log("running")
})