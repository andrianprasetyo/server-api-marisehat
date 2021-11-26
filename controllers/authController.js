require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../models/Users");

module.exports = {
  signUp: (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const resultValidateEmail = re.test(email);

    if (!resultValidateEmail) {
      return res.status(422).json({
        message: "Please input correct email",
      });
    }

    Users.findOne({ email: email }, function (err, data) {
      if (err) {
        return res.status(500).json({
          message: "Error getting users",
        });
      }
      if (data) {
        return res.status(422).json({
          message: "Email already registered, please use another email",
        });
      }

      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new Users({ email: email, password: hashedPassword });
          return user.save();
        })
        .then((result) => {
          res.status(200).json({ message: "User created", result });
        })
        .catch((error) => {
          return res.status(500).json({
            message: "Internal Server Error",
          });
        });
    });
  },

  signIn: (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    Users.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            message: "A user with this email could not be found.",
          });
        }

        loadedUser = user;
        return bcrypt.compare(password, user.password);
      })
      .then((isEqual) => {
        if (!isEqual) {
          return res.status(401).json({
            message: "Wrong password",
          });
        }

        const token = jwt.sign(
          {
            email: loadedUser.email,
            userId: loadedUser.id.toString(),
          },
          process.env.TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).json({ token: token, userId: loadedUser._id.toString() });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Internal Error",
        });
      });
  },
};
