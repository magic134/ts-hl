import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { fail } from "../utils/response";
import { JWT_SECRET } from "../config";

export interface AuthRequest extends Request {
    tokenPayload?: { account_id: number; user_id: number };
}

/**
 * 验证 Authorization 头中的 JWT
 * 客户端可能发送 `Authorization: <token>` 或 `Authorization: Bearer <token>`
 */
export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): any {
    const raw = req.headers.authorization || "";
    const token = raw.startsWith("Bearer ") ? raw.slice(7) : raw;
    if (!token) {
        return res.json(fail(1, "缺少 Authorization"));
    }
    try {
        req.tokenPayload = jwt.verify(token, JWT_SECRET) as { account_id: number; user_id: number };
        next();
    } catch (e) {
        return res.json(fail(1, "token 无效"));
    }
}
