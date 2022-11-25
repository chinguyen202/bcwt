"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const catRouter = require("./routes/catRoute");
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");
const passport = require("./utils/passport");
const port = 3000;

app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//serve upload files
app.use(express.static("/uploads"));

app.use(passport.initialize());
//app.use(passport.session());

app.use("/cat", passport.authenticate("jwt", { session: false }), catRouter);
app.use("/user", passport.authenticate("jwt", { session: false }), userRouter);
app.use("/auth", authRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
