import jsonwebtoken from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const checkTocken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header: string | undefined = req.headers.authorization
    const token: string = header ? header.split(' ')[1] : ''

    const userData = jsonwebtoken.verify(token, process.env.JWT_TOKEN as string)
    next(userData)
  } catch (err) {
    res.status(401).json({
      error: new Error('Invalid request!'),
    })
  }
}
