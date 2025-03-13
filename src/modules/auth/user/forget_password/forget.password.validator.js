import { z } from "zod";
import validateRequest from "../../../../middleware/validateRequest.js";

const forgetPasswordValidator = z.object({
  email: z
    .string(
        {
            required_error: "validation.email.required",
        }
    )
    .nonempty({ message: "validation.email.required" }) // Translation key
    .email({ message: "validation.email.invalid" }), // Translation key
});

export default validateRequest(forgetPasswordValidator);
