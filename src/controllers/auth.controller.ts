import AuthService from '../services/auth.service';
import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password);
    res.status(StatusCodes.OK).json({ token });
  }
}

export default new AuthController();
