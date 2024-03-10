import { Request, Response, NextFunction } from "express"

export const authMiddleware = (req: Request, res: Response, next: NextFunction ): void => {
    const { role } = req.headers

    if ( role !== 'admin' ){
        res.status(403).json({ message: "Unauthorized" })
    } else {
        next()
    }
}