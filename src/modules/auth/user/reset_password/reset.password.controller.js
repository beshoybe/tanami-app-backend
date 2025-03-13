import User from "../../../../../DB/models/user.model.js";
import { asyncHandler } from "../../../../utils/asyncHandling.js";
import { generateToken } from "../../../../utils/token.helper.js";

const userResetPasswordController = asyncHandler(async (req, res) => {
    try {
        const { email, otp, password } = req.body;

        // ✅ Find the user
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: req.t("error.emailNotRegistered") });
        }

        // ✅ Check if OTP is correct
        if (!user.otp || user.otp !== otp) {
            return res.status(400).json({ message: req.t("error.invalidOTP") });
        }

        // ✅ Check if OTP is expired
        if (user.otpExpiry && new Date() > user.otpExpiry) {
            return res.status(400).json({ message: req.t("error.expiredOTP") });
        }


        // ✅ Update user's password & clear OTP fields
        user.password = password;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();
        const tokenPayload = {
            id: user.id,  // ✅ Use `id` instead of `_id`
            email: user.email,
        };
        res.status(200).json({ 
            message: req.t("response.passwordResetSuccess"),
            data: {
                    token: generateToken(tokenPayload, "1d"),
                    refresh_token: generateToken(tokenPayload, "7d"),
                    password_less_token: generateToken(tokenPayload, "30d"),
                },
        });

    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ message: req.t("error.serverError") });
    }
});

export default userResetPasswordController;
