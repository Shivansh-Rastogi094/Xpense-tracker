const User = require("../models/User");
const JWT = require("jsonwebtoken");

const generateToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    //validation of input fields
    if(!fullName || !email || !password){
        return res.status(400).json({ message: "Please fill all required fields" });
    }
    try {
        //check if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: "User already exists with this email" });
        }
        //create new user
        const newUser = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });
        res.status(201).json({
            id: newUser._id,
            user:newUser,
            message: "User registered successfully",
            token: generateToken(newUser._id)
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error registering user ", error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const{ email, password } = req.body;

    //validation of input fields        
    if(!email || !password){
        return res.status(400).json({ message: "Please fill all required fields" });
    }
    try{
        const user = await User.findOne({ email }); 
        if(!user || !(await user.comparePassword(password)))
            return res.status(400).json({ message: "Invalid email or password" });

        res.status(200).json({
            id: user._id,
            user:user,
            message: "User logged in successfully",
            token: generateToken(user._id)
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error registering user ", error: error.message });
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
        }
        catch (error) {
            res.status(500).json({ message: "Error registering user ", error: error.message });   
        }
};
