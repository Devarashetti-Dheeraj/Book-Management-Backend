import {Router} from 'express';
import { signup, login } from "../controller/authcontroller";

const authRouter: Router = Router();

authRouter.post('/signup', signup)
authRouter.post('/login', login)

export default authRouter;