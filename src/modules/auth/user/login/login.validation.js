import { z } from "zod";
import validateRequest from "../../../../middleware/validateRequest.js";

const loginValidator = z.object({
  email: z
    .string({
      required_error: "validation.email.required",
    })
    .nonempty({ message: "validation.email.required" })
    .email({ message: "validation.email.invalid" }),
  password: z.string({
    required_error: "validation.password.required",
  }).nonempty({ message: "validation.password.required" }),
});

export default validateRequest(loginValidator);
