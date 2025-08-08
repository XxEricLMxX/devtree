import type { NextFunction, Request, Response } from "express"
import { validationResult } from 'express-validator'

export const handleInputErrors = (req: Request, res: Response, next : NextFunction) => {
    // Manejar errores del express validator de router para formularios vacios

    let errors = validationResult(req)
    console.log('desde validation.ts')
    if (!errors.isEmpty()) {
        return res.status(400).json({ erorrs: errors.array() })
    }
    next()
}