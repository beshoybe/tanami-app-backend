import {z} from "zod";

import validateRequest from "../../../../middleware/validateRequest.js";

const resetPasswordValidator = z.object({
    password: z
        .string({
            required_error: "validation.password.required",
        })
        .nonempty({message: "validation.password.required"}) // Translation key
        .min(6, {message: "validation.password.min"}) // Translation key
        .max(100, {message: "validation.password.max"}), // Translation key
    email: z
        .string({
            required_error: "validation.email.required",
        })
        .nonempty({message: "validation.email.required"}) // Translation key
        .email({message: "validation.email.invalid"}) // Translation key
        ,
        otp : z
        .string({
            required_error: "validation.otp.required",
        })
        .nonempty({message: "validation.otp.required"}) // Translation key  

    });

export default validateRequest(resetPasswordValidator);