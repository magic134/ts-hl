import { DbClient } from "../dbClient/DbClient";

export type UserLeaderboardType = "hongli" | "deed" | "money";

export interface UserLeaderboardRow {
    rank: number;
    name: string;
    look: number;
    level: number;
    metempsychosis: number;
    toutai: number;
    degree_lev: number;
    money: number;
    hongli?: number;
    deed?: number;
    total_money?: number;
}

/**
 * 人物排行榜服务（对应 doc/WWW不加密 的 index.php / userdeed.php / usermoney.php）
 */
export class UserLeaderboardService {
    async findLeaderboard(type: UserLeaderboardType, sourceDb?: DbClient): Promise<UserLeaderboardRow[]> {
        const db = sourceDb || new DbClient();
        const shouldClose = !sourceDb;
        if (shouldClose) {
            await db.connect();
        }
        try {
            let sql = "";
            switch (type) {
                case "hongli":
                    sql = `
                        SELECT
                            name,
                            FLOOR(level) AS level,
                            metempsychosis,
                            look,
                            degree_lev,
                            money,
                            FLOOR((metempsychosis % 1000) / 10) AS toutai,
                            FLOOR(additional_point / 100000) AS hongli
                        FROM yx_user
                        WHERE account_id BETWEEN 1 AND 9999
                        ORDER BY hongli DESC, degree_lev DESC
                        LIMIT 100
                    `;
                    break;
                case "deed":
                    sql = `
                        SELECT
                            name,
                            FLOOR(level) AS level,
                            metempsychosis,
                            look,
                            degree_lev,
                            deed,
                            money,
                            FLOOR((metempsychosis % 1000) / 10) AS toutai,
                            FLOOR(additional_point / 100000) AS hongli
                        FROM yx_user
                        WHERE account_id BETWEEN 1 AND 9999
                        ORDER BY deed DESC
                        LIMIT 100
                    `;
                    break;
                case "money":
                    sql = `
                        SELECT
                            name,
                            FLOOR(level) AS level,
                            metempsychosis,
                            look,
                            degree_lev,
                            money,
                            money_saved,
                            (money + money_saved) AS total_money,
                            FLOOR((metempsychosis % 1000) / 10) AS toutai,
                            FLOOR(additional_point / 100000) AS hongli
                        FROM yx_user
                        WHERE account_id BETWEEN 1 AND 9999
                        ORDER BY total_money DESC
                        LIMIT 100
                    `;
                    break;
                default:
                    throw new Error(`不支持的人物排行榜类型: ${type}`);
            }

            const rows = await db.query(sql, []);
            return rows.map((r: any, idx: number) => ({
                ...r,
                rank: idx + 1,
                level: Math.floor(r.level || 0),
                toutai: Math.floor((r.metempsychosis % 1000) / 10),
                hongli: type === "hongli" ? r.hongli : undefined,
                deed: type === "deed" ? r.deed : undefined,
                total_money: type === "money" ? r.total_money : undefined
            }));
        } finally {
            if (shouldClose) {
                await db.close();
            }
        }
    }
}
