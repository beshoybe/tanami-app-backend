import User from "../../../../../DB/models/user.model.js";
import { generateToken } from "../../../../utils/token.helper.js";

const confirmOtpController = async (req, res) => {  
    try {
        const { email, otp } = req.body;

        // ✅ Find the user
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: req.t("error.emailNotRegistred") });
        }

        // ✅ Check if OTP is correct
        if (!user.otp || user.otp !== otp) {
            return res.status(400).json({ message: req.t("error.invalidOTP") });
        }
        console.log(new Date(), user.otpExpires);
        // ✅ Check if OTP is expired
        if (user.otpExpires && new Date() > user.otpExpires) {
            return res.status(410).json({ message: req.t("error.expiredOTP") });
        }
        const tokenPayload = {
            id: user.id,
            email: user.email,
        };

        return res.status(200).json({ message: req.t("response.otpVerified"), data: {
            token: generateToken(tokenPayload, "5m"),
        }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: req.t("error.serverError") });
    }
}

export default confirmOtpController