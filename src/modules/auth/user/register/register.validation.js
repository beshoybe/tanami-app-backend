import { z } from "zod";
import validateRequest from "../../../../middleware/validateRequest.js";

const userRegisterValidator = z.object({
  name: z.string({
    required_error: "validation.name.required",
  }).nonempty({ message: "validation.name.required" }),
  email: z
    .string({
      required_error: "validation.email.required",
    })
    .nonempty({ message: "validation.email.required" })
    .email({ message: "validation.email.invalid" }),
  password: z.string({
    required_error: "validation.password.required",
  }).nonempty({ message: "validation.password.required" }),
  phone: z.string({
    required_error: "validation.phone.required",
  }).nonempty({ message: "validation.phone.required" }),
});

export default validateRequest(userRegisterValidator);
