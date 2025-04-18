// const userModel = require('../../models/authModel/authModel');
// const bcrypt = require('bcryptjs')
// const jwt = require("jsonwebtoken");
// const SECRET_KEY = process.env.JSONWEBTOKEN 



// module.exports.register = async (req, res) => {
//   const { name, email, phoneNumber, password } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);


//     const user = new userModel({ 
//       name, 
//       email, 
//       phoneNumber, 
//       password: hashedPassword 
//     });

//     await user.save();

//     console.log("Successfully registered");
//     res.status(201).json({ message: "User registered successfully", user });
//   } catch (error) {
//     console.log("Error", error);
//     res.status(500).json({ message: "Registration failed", error });
//   }
// };

// module.exports.login = async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const user = await userModel.findOne({ email });
  
//       if (!user) {
//         return res.status(400).json({ message: "Invalid email or password" });
//       }
  
//       const isPasswordMatch = await bcrypt.compare(password, user.password);
//       if (!isPasswordMatch) {
//         return res.status(400).json({ message: "Invalid email or password" });
//       }
  
//       // Generate token
//       const token = jwt.sign(
//         { userId: user._id, email: user.email },
//         SECRET_KEY,
//         { expiresIn: "1h" } // optional expiration
//       );
  
//       res.status(200).json({
//         message: "Login successful",
//         token,
//         user: {
//           _id: user._id,
//           name: user.name,
//           email: user.email
//         }
//       });
//     } catch (error) {
//       console.error("Login error:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   };
// // module.exports.login = async (req, res) => {
    
// //     const { email, password } = req.body;
  
// //     try {
// //       const user = await userModel.findOne({ email });
  
// //       if (!user) {
// //         return res.status(400).json({ message: "Invalid email or password" });
// //       }
  
// //       const isPasswordMatch = await bcrypt.compare(password, user.password);
// //       if (!isPasswordMatch) {
// //         return res.status(400).json({ message: "Invalid email or password" });
// //       }
  
// //       console.log("User logged in successfully");
// //       res.status(200).json({
// //         message: "Login successful",
// //         user: {
// //           _id: user._id,
// //           name: user.name,
// //           email: user.email
// //         }
// //       });
// //     } catch (error) {
// //       console.error("Login error:", error);
// //       res.status(500).json({ message: "Internal server error" });
// //     }
// //   };
const userModel = require("../../models/authModel/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JSONWEBTOKEN;

module.exports.register = async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await user.save();

    console.log("Successfully registered");
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Registration failed", error });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    console.log("Secret Key:", process.env.JSONWEBTOKEN);  // Log to check the value

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JSONWEBTOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



