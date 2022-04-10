import UsersDAO from '../dao/usersDAO.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class AuthController {
    static async login(req, res, next) {
        try {
            const { username, password } = req.body;

            const user = await UsersDAO.getUserByUsername(username);
            if (!user) {
                res.status(404).json("Incorrect username");
                return;
            }
    
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                res.status(404).json("Incorrect password");
                return;
            }
    
            if (user && validPassword) {
                const accessToken = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_ACCESS_KEY, { expiresIn: "7d" });
                res.status(200).json({ "accessToken": accessToken, "userId": user._id });
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}