const routes = require("express").Router();
const { getText, textGenerator } = require("../controllers/AI");
routes.post("/", getText);
routes.get("/", textGenerator);


module.exports = routes;