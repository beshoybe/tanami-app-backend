import { createRequire } from "module";
const require = createRequire(import.meta.url);
const investmentData = require("../../../DB/fake_investments.json"); // Load JSON
const arabicInvestmentData = require("../../../DB/fake_investments_arabic.json"); // Load JSON


const investmentsController = async (req, res) => {
    try {
        const {headers} = req;
        const lang = headers["accept-language"];
        return res.status(200).json({
            message: "Investments data",
            data: {
                investments: lang === "ar" ? arabicInvestmentData.investments : investmentData.investments,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default investmentsController