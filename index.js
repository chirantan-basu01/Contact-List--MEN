const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");

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
  console.log("from the get route controller", req.myName);
  return res.render("home", {
    title: "Contacts List!",
    contact_list: contactList,
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
  contactList.push(req.body); //pushing the whole input into contactList array.

  return res.redirect("back");
});

//for deleting the contact
app.get("/delete-contact", function (req, res) {
  //get the query from the url
  let phone = req.query.phone;

  let contactIndex = contactList.findIndex((contact) => contact.phone == phone);

  if (contactIndex != -1) {
    contactList.splice(contactIndex, 1);
  }

  return res.redirect("back");
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running server");
  }
  console.log("Yup! My express is running on port 8000");
});
