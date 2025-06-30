import { Router } from "express";
import User from "../../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";




const router = Router();



/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Email and password are required  
*/
router.post("/register", async (req, res) => {
     const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

     try {
         const isExisting = await User.findOne({email})
         if (isExisting) {
            return  res.status(403).json({message : " user already existing please Login"})
         }
     } catch (error) {
        console.log('user already existing please Login')
     }
      
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        email,
        password: hashedPassword
    });
    await newUser.save();
    console.log("User registered successfully");

     res.status(200).json({message : "user registered successfully"});

})


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
        
    }

    const ExistingUser = await User.findOne( { email });
    if(!ExistingUser) {
        return res.status(404).json({ message: "User not found" });
    }

    
    const isPasswordValid = await bcrypt.compare(password, ExistingUser.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });

    }

       const token = jwt.sign({userId : ExistingUser._id}, process.env.JWT_SECRET, { expiresIn: '1h' });

       res.cookie("token", token, {
        httpOnly:true,
        maxAge: 3600000, 
        secure: process.env.NODE_ENV === "production",

       })
   
    res.status(200).json({ message: "Login successful", user: ExistingUser , token});

});


export default router;