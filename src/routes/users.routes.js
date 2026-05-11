import { Router } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { User } from "../models/user/User.js";

const router = Router();

router.post("/register", async (req, res) => {
    const { name, email, password} = req.body;

    const user = await User.findOne({
        where: {
            email
        }
    })

    if(user)
        return res.status(400).json({ message: "Usuario ya existe"});

    
    const salt = await bcrypt.genSalt();


    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    });

    res.json(newUser.id);
});

router.post("/login", async (req, res) => {
    const { email , password} = req.body;

      const user = await User.findOne({
        where: {
            email
        }
    })

    if(!user)
        return res.status(401).json({ message: "Error en las credenciales"});

    const comparison = await bcrypt.compare(password, user.password);

    if(!comparison)
        return res.status(401).json({ message: "Error en las credenciales"});

    const secretKey = "programacion3-1C-2026";

    const token = jwt.sign( { email }, secretKey, { expiresIn: "1m"})

    return res.json({token});
})

export default router;