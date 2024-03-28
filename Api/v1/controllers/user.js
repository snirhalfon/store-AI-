const user = require("../models/user"); //חיבור למודל של המוצרים
const bcrypt = require("bcrypt"); //קישור לספריית ההצפנה
const jwt = require("jsonwebtoken"); //חיבור לספריית jwk


module.exports = {

  register : async (req, res) => {
     const { userId, fullname, email, password, phone } = req.body;
  
  try {
    // בדיקה אם המשתמש כבר קיים
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "User already exists" }); // שימוש בסטטוס קוד 409 להתנגשות
    }
    
    // הצפנת הסיסמה
    const hashPass = await bcrypt.hash(password, 10);
    
    // יצירת משתמש חדש
    const newUser = await user.create({ userId, fullname, email, password: hashPass, phone });
    
    // החזרת מידע מותאם ללקוח
    const userResponse = {
      userId: newUser.userId,
      fullname: newUser.fullname,
      email: newUser.email,
      phone: newUser.phone
    };
    res.status(201).json(userResponse); // שימוש בסטטוס קוד 201 ליצירה
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},





login: (req, res) => {
  const { email, password } = req.body; 
  user.findOne({ email }).then((user) => { // שימוש ב- findOne במקום find
    if (!user) // בדיקה אם המשתמש לא נמצא
      return res.status(200).json({ msg: "user or pass are wrong" });

    const hashPass = user.password; // שימוש בשם השדה הנכון לקבלת הסיסמה המוצפנת

    bcrypt.compare(password, hashPass).then((match) => { // וודא שמשתמשים בשם המשתנה הנכון ובודקים את התוצאה
      if (!match) { // אם ההשוואה נכשלת
        return res.status(200).json({ msg: "user or pass are wrong" });
      } else {
        // אם ההשוואה מצליחה, יצירת ה-token והחזרתו למשתמש
        const token = jwt.sign(
          { email: user.email, fullname: user.fullname }, // ניצול הנתונים הנכונים מהמשתמש
          process.env.PRIVATE_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ token: token, msg: "Login successful" }); // שליחת ה-token בתגובה
      }
    }).catch((error) => {
      console.error("Error comparing password", error);
      res.status(500).json({ msg: "Error during login process" });
    });
  }).catch((error) => {
    console.error("Error finding user", error);
    res.status(500).json({ msg: "Error during login process" });
  });
},



  getAllUser: (req, res) => {
    user.find().then((data) => {
      return res.status(200).json(data);
    });
  },
  getUserById: (req, res) => {
    let userId = req.params.id;
    user.findOne({ userId }).then((data) => {
      return res.status(200).json(data);
    });
  },
  addUser: (req, res) => {
    let body = req.body;
    user.insertMany([body]).then((data) => {
      return res.status(200).json(data);
    });
  },
  updateUser: (req, res) => {
    let userId = req.params.id;
    let body = req.body;
    user.updateOne({ userId }, body).then((date) => {
      return res.status(200).json(date);
    });
  },
  deleteUser: (req, res) => {
    let userId = req.params.id;
    user.deleteOne({ userId }).then((data) => {
      return res.status(200).json(data);
    });
  },
};
