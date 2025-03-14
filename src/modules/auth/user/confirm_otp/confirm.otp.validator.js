import {z} from 'zod'
import validateRequest from '../../../../middleware/validateRequest.js';
const confirmOtpValidator =  z.object({
    otp : z
        .string({
            required_error: "validation.otp.required",
        })
        .nonempty({message: "validation.otp.required"}), // Translation key,
        email : z
        .string({
            required_error: "validation.email.required",
        })
        .nonempty({message: "validation.email.required"}) // Translation key
    });

export default validateRequest(confirmOtpValidator);