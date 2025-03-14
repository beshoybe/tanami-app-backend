import User from "../../../../../DB/models/user.model.js";
import { asyncHandler } from "../../../../utils/asyncHandling.js";
import sendEmail from "../../../../utils/email.helper.js";

import crypto from "crypto";

const userForgetPasswordController = asyncHandler(async (req, res) => {
    try {
        const { email } = req.body;

        // ✅ Find user in Sequelize
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: req.t("error.emailNotRegistred") });
        }

        // ✅ Generate a 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

        // ✅ Save OTP & expiry in the database
        user.otp = otp;
        user.otpExpires = otpExpiry;
        await user.save();

        // ✅ Create email content
        const html = `
            <p>Dear <b>${user.name}</b>,</p>
            <p>You have requested a password reset. Use the following OTP to reset your password:</p>

            <h2 style="color: #d9534f;">${otp}</h2>

            <p><b>Note:</b> This OTP is valid for <b>5 minutes</b>.</p>

            <p>If you did not request this, please ignore this email.</p>

            <p>Best Regards,</p>
            <h3>Tanami App Support Team</h3>
        `;

        // ✅ Send email
        await sendEmail({
            email: user.email,
            subject: "Password Reset Request",
            html: html,
        });

        res.status(200).json({
            message: req.t("response.otpSent"),
        });

    } catch (error) {
        console.error("Forget Password Error:", error);
        res.status(500).json({ message: req.t("error.serverError") });
    }
});

export default userForgetPasswordController;
