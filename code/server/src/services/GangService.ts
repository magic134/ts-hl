import { DbClient } from "../dbClient/DbClient";
import { getQuery } from "../utils/query";

export interface GangStatus {
    hasGang: boolean;
}

/**
 * 帮派权限查询服务
 *
 * 判断玩家是否有所属帮派且职位 rank >= 90。
 */
export class GangService {
    async checkAuth(userId: number): Promise<GangStatus> {
        const db = new DbClient();
        await db.connect();
        try {
            const rows = await db.query(
                getQuery("GANG_CHECK_MEMBER"),
                [userId]
            );
            return { hasGang: rows.length > 0 };
        } finally {
            await db.close();
        }
    }
}
