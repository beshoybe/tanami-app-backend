import { createRequire } from "module";
const require = createRequire(import.meta.url);

const userInvestments = require("../../../DB/fake_user_investments.json"); // Load JSON
const investmentData = require("../../../DB/fake_investments.json"); // Load JSON
const arabicInvestmentData = require("../../../DB/fake_investments_arabic.json"); // Load JSON

const homeController = async (req, res) => {
    try {
        const { user,headers } = req;
        const { id, name, email } = user; // Extract only necessary fields
        const lang = headers["accept-language"];

        return res.status(200).json({ 
            message: "Welcome to the home page", 
            data: { 
                user: { id, name, email }, // Keep user data
                user_investments: userInvestments,  // Include investment data
                best_investments: lang === "ar" ? arabicInvestmentData.investments.slice(0, 2) : investmentData.investments.slice(0, 2), // Include first two investment data
            } 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default homeController;
