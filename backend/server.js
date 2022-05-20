import express from "express";
import cors from "cors";
import uitchat from "./routes/index.js";
import bodyParser from "body-parser";
import passport from "passport";
import "./config/passport.js";
import session from "express-session";
import flash from "express-flash";
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secr3t",
    resave: false,
    saveUninitialized: true,
    // store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/uitchat", uitchat);
app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
