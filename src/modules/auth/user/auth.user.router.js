//user auth router
import { Router } from 'express';
import userRegisterController from './register/register.controller.js';
import userRegisterValidator from './register/register.validation.js';
import userLoginValidator from './login/login.validation.js';
import userLoginController from './login/login.controller.js';
import forgetPasswordValidator from './forget_password/forget.password.validator.js';
import userForgetPasswordController from './forget_password/forget.password.controller.js';
import resetPasswordValidator from './reset_password/reset.password.validator.js';
import userResetPasswordController from './reset_password/reset.password.controller.js';
import passwordlessLoginValidator from './password_less_login/passwordless.login.validator.js';
import passwordLessLoginController from './password_less_login/passwordless.login.controller.js';
import confirmOtpValidator from './confirm_otp/confirm.otp.validator.js';
import confirmOtpController from './confirm_otp/confirm.otp.controller.js';

const authRouter = Router();

authRouter.post('/register',userRegisterValidator, userRegisterController);

authRouter.post('/login', userLoginValidator, userLoginController);

authRouter.post('/forget-password',forgetPasswordValidator,userForgetPasswordController);

authRouter.post('/reset-password',resetPasswordValidator,userResetPasswordController);

authRouter.post('/passwordless-login',passwordlessLoginValidator,passwordLessLoginController);

authRouter.post('/confirm-otp',confirmOtpValidator,confirmOtpController);
export default authRouter;