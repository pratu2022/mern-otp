const express = require("express")
const router = express.Router();
const User = require("./models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
//Routes
router.post("/signup",async(req,res)=>{
    const {email,password} = req.body;
    try {

        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User Already Exists"});
        }

        const securePassword = await bcrypt.hash(password,10);
        user = await User.create({
            email,
            password : securePassword,
        });
        await user.save();
        return res.status(200).json({message:"User created successfully"})
        
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
});

router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {   
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "User does not exist"});
        }

        const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token =  jwt.sign({id: user._id},process.env.JWT_SECRET, {
            expiresIn: "1d"
        })

        res.cookie("token", token ,{
            httpOnly:true,
            secure:true
        })

        return res.status(200).json({message:"User Logged in Successfully "})
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

router.post("/forgot",async(req,res)=>{
    const {email} = req.body;

    try {
        const generateOtp = Math.floor(Math.random() * 10000);

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "89740783971ba7",
              pass: "19ad0d0dcd0eed"
            },
          });

          const info = await transporter.sendMail({
            from: 'bendrepratiksha747@gmail.com', // sender address
            to: email, // list of receivers
            subject: "New Otp Generated", // Subject line
            html: `<b>OTP IS :: <i>${generateOtp}</i> </b>`, // html body
          });

          if(info.messageId){
            let user =  await User.findOneAndUpdate(
            {email},
            {otp: generateOtp},
            {new:true},
        );
        
        if(!user){
            
            return res.status(500).json({message: "User does not exist"});
        }
        }
        return res.status(200).json({message: "Otp sent successfully"});

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
})

router.post("/verify",async(req,res)=>{
    const {otp,password} = req.body;
    try {
        let user = await User.findOne({otp});
        if(!user){
            return res.status(400).json({message:"Invalid Otp"}); 
        }

        const securePassword = await bcrypt.hash(password,10);

        user = await User.findOneAndUpdate(
        {otp},
        {password: securePassword, otp: 0 },
        {new: true}
    );
         return res.status(200).json({message: "Password updated successfully"});
    } 
    catch (error) {
        return res.status(500).json({message:error.message})
    }
})

module.exports = router;