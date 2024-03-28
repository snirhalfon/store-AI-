const Router = require("express").Router();

const {
    register,
  } = require("../controllers/user");
 // מסלול הרישום למשתמש חדש
 Router.get("/", (req, res) => { // מסלול הצגת טופס הרישום
    return res
      .status(200)
      .render("enrollment", { layout: "main", title: "enrollment" }); // הצגת דף הרישום
    }).post("/", register); // מסלול פעולת הרישום

  module.exports = Router;