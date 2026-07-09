import { DbClient } from "../../../../src/dbClient/DbClient";
import { UserVo } from "../types/api";
import { RANK_TYPE_MAP } from "../config";

export interface FindUserRankReq {
    rankType: string;
}

/**
 * 人物排行榜查询服务
 */
export class UserRankService {
    async findRank(req: FindUserRankReq): Promise<UserVo[]> {
        const rankType = req.rankType || "0";
        const mapping = RANK_TYPE_MAP[rankType];
        if (!mapping) {
            throw new Error(`不支持的 rankType: ${rankType}`);
        }
        const sortColumn = mapping.column;

        const db = new DbClient();
        await db.connect();
        try {
            const sql = `
                SELECT u.*, a.ip_mask AS qq
                FROM yx_user u
                LEFT JOIN account a ON u.account_id = a.id
                ORDER BY u.${sortColumn} DESC
                LIMIT 100
            `;
            const rows = await db.query(sql, []);
            return rows.map((r: any) => this.toUserVo(r));
        } finally {
            await db.close();
        }
    }

    /**
     * 将数据库行转换为客户端需要的 UserVo
     */
    toUserVo(row: any, token = ""): UserVo {
        return {
            ...row,
            hongli: row.additional_point || 0,
            toutaishu: row.metempsychosis || 0,
            love: row.love || 0,
            qq: row.qq || "",
            token
        };
    }
}
