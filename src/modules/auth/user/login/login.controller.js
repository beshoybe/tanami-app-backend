import User from '../../../../../DB/models/user.model.js';
import { asyncHandler } from '../../../../utils/asyncHandling.js';
import { generateToken } from '../../../../utils/token.helper.js';

const userLoginController = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Find user by email (Sequelize syntax)
        const user = await User.findOne({ 
            where: { email }, 
            attributes: ['id', 'email', 'password'] // ✅ Explicitly include password
        });

        if (!user) {
            return res.status(404).json({ message: req.t("error.emailNotRegistred") });
        }

        // ✅ Use Sequelize instance method to check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: req.t("error.invalidPassword") });
        }

        const tokenPayload = {
            id: user.id,  // ✅ Use `id` instead of `_id`
            email: user.email,
        };

        res.status(200).json({
            message: req.t("response.userLoggedIn"),
            data: {
                token: generateToken(tokenPayload, "1d"),
                refresh_token: generateToken(tokenPayload, "7d"),
                password_less_token: generateToken(tokenPayload, "30d"),
            },
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: req.t("error.serverError") });
    }
});

export default userLoginController;
