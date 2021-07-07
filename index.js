const express = require("express");
const path = require("path");
const port = 8000;

//connecting the mongoDB with server
const db = require("./config/mongoose");

const Contact = require("./models/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded()); //middleware
app.use(express.static("assets"));

// //middleware 1
// app.use(function (req, res, next) {
//   req.myName = "Chirantan";
//   //console.log("middleware 1 called");
//   next();
// });

// //middleware 2
// app.use(function (req, res, next) {
//   console.log("My name is from mw2", req.myName);
//   //console.log("middleware 2 called");
//   next();
// });

var contactList = [
  {
    name: "Chirantan Basu",
    phone: "1111111111",
  },
  {
    name: "Rahul Shah",
    phone: "2222222222",
  },
  {
    name: "Rohan Das",
    phone: "3333333333",
  },
];

app.get("/", function (req, res) {
  //console.log("from the get route controller", req.myName);

  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("Error in fetching contacts from db");
      return;
    }
    return res.render("home", {
      title: "Contacts List!",
      contact_list: contacts,
    });
  });
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "Let us play with ejs!",
  });
});

app.post("/create-contact", function (req, res) {
  //here it is not get because we are posting the data in the server so thats why its post

  //return res.redirect("/practice"); // just like render(renders the html) it redirects to another page of the server
  //contactList.push(req.body); //pushing the whole input into contactList array.
  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newContact) {
      if (err) {
        console.log("error in creating a contact!");
        return;
      }
      console.log("**********", newContact);
      return res.redirect("back");
    }
  );
});

//for deleting the contact
app.get("/delete-contact", function (req, res) {
  //get the id from query in the url
  let id = req.query.id;

  //find the contact in the database using id and delete
  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("error in deleting an object from database");
      return;
    }
    return res.redirect("back");
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running server");
  }
  console.log("Yup! My express is running on port 8000");
});
