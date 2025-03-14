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
        token: z
        .string({
            required_error: "validation.token.required",
        }).nonempty({message: "validation.token.required"}) // Translation key

    });

export default validateRequest(resetPasswordValidator);