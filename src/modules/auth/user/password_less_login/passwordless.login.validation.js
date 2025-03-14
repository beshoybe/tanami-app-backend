import {z} from "zod";

import validateRequest from "../../../../middleware/validateRequest.js";

const passwordlessLoginValidator = z.object({
    token : z
        .string({
            required_error: "validation.token.required",
        })
        .nonempty({message: "validation.token.required"}) // Translation key
    });


export default validateRequest(passwordlessLoginValidator);