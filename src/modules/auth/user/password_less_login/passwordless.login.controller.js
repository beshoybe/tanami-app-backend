

const passwordLessLoginController = async (req, res) => {
    try {
        const {token} = req.body;
        // ✅ Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const
        user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message:req.t("error.userNotFound") });
        }
        const tokenPayload = {
            id: user.id,
            email: user.email,
        };
        return res.status(200).json({
            message: req.t("response.userLoggedIn"),
            data: {
                token: generateToken(tokenPayload, "1d"),
                refresh_token: generateToken(tokenPayload, "7d"),
                password_less_token: generateToken(tokenPayload, "30d"),
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};