require("dotenv").config(); //טעינת קובץ ההגדרות למערכת
const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const loginRouter = require("./Api/v1/routes/login");
const proRoute = require("./Api/v1/routes/product");
const categoryRote = require("./Api/v1/routes/category");
const userRoute = require("./Api/v1/routes/user");
const textRoutes=require("./Api/v1/routes/text");
const morgan = require("morgan");
const registerRoute = require("./Api/v1/routes/register");
app.use(express.json());












app.get('/home', async (req, res) => {
  // נסה לאחזר את הרשומה הנוכחית או ליצור אחת חדשה אם אינה קיימת
  const visitor = await Visitor.findOneAndUpdate({}, { $inc: { count: 1 } }, { new: true, upsert: true });
  
  // הצג את הדף הביתי עם מספר המבקרים (או אחזור את הנתונים הרלוונטיים)
  res.status(200).render("home", { layout: "main", title: "my home", visitorCount: visitor.count });
});















const Visitor = require('./Api/v1/models/visitor');


//views
//הגדרת תיקיית התצוגה של המערכת
app.set("views", "./views");
//הגדרת מנוע תצוגות של הנדל ברסט
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs", //סיומת הקבצים השייכים למערכת התבניות
    defaultView: "index", //תצוגת ברירת המחדל שתוצג במידה ולא ציינו שם של תצוגה
    layoutsDir: __dirname + "/views/layouts", // הגדרת הנתיב לתיקית תבניות התצוגה -מאסטר פייג
    partialsDir: __dirname + "/views/partials", // הגדרת הנתיב לתיקייה של התצוגות החלקיות ,סוג של קומפוננטות תצוגה,יחידות תצוגה עצמאיות
  })
);

app.set("view engine", "hbs"); //פקודה שאומרת את מי אנחנו רוצים להפעיל
app.use(express.static("public")); // הגדרת התיקייה פאבליק כתיקיה סטאטית ממנה ניתן להגיש קבצים סטאטים שלא עוברים עיבוד בצד שרת כגון קבצי css js

app.get("/product", (req, res) => {
  const product = require("./Api/v1/models/product");
  product
    .find()
    .lean()
    .then((product) => {
      return res.status(200).render("product", {
        layout: "main", //מציג בדף את המיין שנמצא בlayout לא משתנה
        title: "my products",
        product,
      });
    });
});

app.get("/home", (req, res) => {
  return res.status(200).render("home", { layout: "main", title: "my home" });
});

app.get("/payment", (req, res) => {
  return res.status(200).render("payment", { layout: "payment", title: "payment" });
});

app.get("/", (req, res) => {
  return res.status(200).render("login", { layout: "main", title: "login" });
});

app.get("/enrollment", (req, res) => {
  return res.status(200).render("enrollment", { layout: "main", title: "enrollment" });
});




app.use("/assets/", express.static("pub"));

const mongoose = require("mongoose"); //חיבור לספריית העבודה מונגו
mongoose.pluralize(null); //מבטל את הרביים
const mongoStore = require("connect-mongo"); //חיבור לספרייה

const connStr = process.env.MONGO_CONN; //שליפת מחרוזת ההתחברות מתוך הגדרות המערכת
console.log(connStr);
mongoose.connect(connStr + "DataBaseStore").then((status) => {
  if (status) {
    console.log("Connected to MongoDB");
  } else {
    console.log("Not connected to MongoDB");
  }
});

//ניצור מודל עבור מוצר

const userModel = require("./Api/v1/models/user");
userModel.find().then((data) => {
  console.log(data);
});

const productModel = require("./Api/v1/models/product");
const session = require("express-session");

productModel.find().then((data) => {
  //פונקצייה שמחזירה את כול הנתונים  כול הרשומות של הטבלה שאני עובד מולה כרגע עובדים מול פרודקט
  console.log(data);
});

let arr = ["198.161.2", "::1", "192.168.127.12"];
app.use((req, res, next) => {
  let i;
  for (i = 0; i < arr.length; i++) {
    if (req.ip === arr[i]) {
      break;
    }
  }
  if (i == arr.length) {
    return res.status(403).send("Forbidden");
  } else {
    next();
  }
});

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
const twentymin = 1000 * 60 * 20;
app.use(
  session({
    secret: "HALFONsnir",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: twentymin,
    },
    store: mongoStore.create({
      mongoUrl: connStr + "SNIRdata",
    }),
  })
);
app.use("/login", loginRouter);
app.use("/category", categoryRote);
app.use("/product", proRoute);
app.use("/user", userRoute);
app.use("/home", textRoutes);
app.use("/register", registerRoute);


app.all("*", (req, res) => {
  return res.status(404).json({ msg: "Not Found" });
});

module.exports = app;
