require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = process.env.SERVER_PORT;

const admin = require("firebase-admin");
const serviceAccount = require("./app/config/redrubygroups-f93fd-firebase-adminsdk-2hny4-454f9c9d7f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://redrubygroups-f93fd.firebaseio.com",
});

app.use("/uploads", express.static("./uploads"));
app.use("/ticket", express.static("./app/helpers/pdf"));
app.use("/dp", express.static("./uploads/memberDisplayPicture"));
app.use(
  "/.well-known/pki-validation/",
  express.static("../.well-known/pki-validation/")
);
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = require("./app/routers/v1/index.js");

app.use("/api", router);

app.listen(port, () => {
  console.log(`\n App Listen port ${port}`);
});
