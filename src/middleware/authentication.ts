import { Request, Response, NextFunction } from 'express'
import CustomAPIError from '../errors'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'

interface CustomRequest extends Request {
  user: {
    userId?: string
  }
}
/* eslint-disable-next-line */
const authenticateUser: any = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new CustomAPIError.UnauthenticatedError('Invalid Authentication')
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as Secret
    ) as JwtPayload & { userId: string }

    req.user = { userId: payload.userId }
    next()
  } catch (error) {
    throw new CustomAPIError.UnauthenticatedError('Invalid Authentication')
  }
}

export default authenticateUser
