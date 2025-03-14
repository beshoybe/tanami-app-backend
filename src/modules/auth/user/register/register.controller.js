import User from '../../../../../DB/models/user.model.js';
import { asyncHandler } from '../../../../utils/asyncHandling.js';
import { generateToken } from '../../../../utils/token.helper.js';
import { Op } from 'sequelize'; // ✅ Import Sequelize operators

const userRegisterController = asyncHandler(async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // ✅ Check if email or phone already exists using Sequelize
        const existingUser = await User.findOne({ 
            where: { 
                [Op.or]: [{ email }, { phone }]  // ✅ Use Op.or
            } 
        });

        if (existingUser) {
            return res.status(400).json({
                message: existingUser.email === email 
                    ? req.t("error.emailAlreadyExists") 
                    : req.t("error.phoneAlreadyExists")
            });
        }

        // ✅ Create new user in Sequelize
        const user = await User.create({
            name,
            email,
            password, // Will be hashed using a Sequelize hook
            phone,
        });

        const tokenPayload = {
            id: user.id,  // ✅ Use `id` instead of `_id`
            email: user.email,
        };

        res.status(201).json({
            message: req.t("response.userRegistred"),
            data: {
                token: generateToken(tokenPayload, "1d"),
                refresh_token: generateToken(tokenPayload, "7d"),
                password_less_token: generateToken(tokenPayload, "30d"),
            },
        });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: req.t("error.serverError") });
    }
});

export default userRegisterController;
