const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    //קבלת פרטי משתמש(לדוגמא מתוך גוף הבקשהה)).
    const { email, password, fullname } = req.body;

    const token = jwt.sign({ email, password, fullname }, process.env.PRIVATE_KEY, {
      expiresIn: "1h",
    });

    req.session.user = token; //הגדרת הטוקן
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "you are not authorized " });
  }
};
