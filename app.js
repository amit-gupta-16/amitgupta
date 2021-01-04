const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://mainAmitSite127:127AmitSitemain@personalsite.mupaq.mongodb.net/contactDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });



const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    message: String
});

const Contact = mongoose.model("Contact", contactSchema);


app.get("/", function (req, res) {
    res.render("main");
});

app.post("/", (request, response) => {
        const contact = new Contact({
            firstName: request.body.fName,
            lastName: request.body.lName,
            email: request.body.email,
            message: request.body.msg
        });
        contact.save(function (err) {
            if (err) {
                response.redirect("/failure");
            } else {
                response.redirect("/success");
            }
        });
    });


app.get("/newsletter-project", function (req, res) {
    res.render("project-1");
});

app.get("/blog-project", function (req, res) {
    res.render("project-2");
});

app.get("/login-project", function (req, res) {
    res.render("project-3");
});

app.get("/about", function (req, res) {
    res.render("aboutpage");
});

app.get("/success", function (req, res) {
    res.render("successpage");
});

app.get("/failure", function (req, res) {
    res.render("failurepage");
});

app.listen(3000 || process.env.PORT, function () {
    console.log("server is running on port 3000...");
});