const routes = require("express").Router();
const { login } = require("../controllers/user");

routes.post("/login", login);
routes.get("/", (req, res) => {
    return res.status(200).render("login", { layout: "main", title: "login" });
  });

module.exports = routes;
