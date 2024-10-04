const router = require("express").Router();
const bcrypt = require("bcrypt");
const User =require("../module/User")

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
});

//LOGIN
//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json("User not found");
    }

    console.log("User found:", user);

    // Check if password exists in the request
    if (!req.body.password) {
      return res.status(400).json("Password is required");
    }

    // Log the received password
    console.log("Password from request:", req.body.password);
    console.log("Hashed password in DB:", user.password);

    // Compare the request password with the stored hashed password
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      return res.status(400).json("Wrong password");
    }

    // If password is correct, send user data
    res.status(200).json(user);

  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json("Internal Server Error");
  }
});




module.exports = router;