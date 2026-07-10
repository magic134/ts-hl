import { TargetDbClient } from "../dbClient/TargetDbClient";
import { UserLeaderboardRow } from "./UserLeaderboardService";

export type SnapshotUserLeaderboardType = "hongli" | "deed" | "money";

/**
 * 人物排行榜快照查询服务
 * 从目标库的 sync_user_leaderboard 表读取，不再访问源库
 */
export class SnapshotUserLeaderboardService {
    async findLeaderboard(type: SnapshotUserLeaderboardType): Promise<UserLeaderboardRow[]> {
        const db = new TargetDbClient();
        await db.connect();
        try {
            const rows = await db.query(
                "SELECT * FROM sync_user_leaderboard WHERE type = ? ORDER BY rank ASC",
                [type]
            );
            return rows.map((r: any) => ({
                rank: r.rank,
                name: r.name || "",
                look: r.look || 0,
                level: r.level || 0,
                metempsychosis: r.metempsychosis || 0,
                toutai: r.toutai || 0,
                degree_lev: r.degree_lev || 0,
                money: r.money || 0,
                hongli: type === "hongli" ? r.hongli || 0 : undefined,
                deed: type === "deed" ? r.deed || 0 : undefined,
                total_money: type === "money" ? r.total_money || 0 : undefined
            }));
        } finally {
            await db.close();
        }
    }
}
