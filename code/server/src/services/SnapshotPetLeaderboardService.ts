import { TargetDbClient } from "../dbClient/TargetDbClient";
import { PetLeaderboardRow } from "./PetLeaderboardService";

export type SnapshotPetLeaderboardType = "all" | "nonEvolution";

/**
 * 宠物排行榜快照查询服务
 * 从目标库的 sync_pet_leaderboard 表读取，不再访问源库
 */
export class SnapshotPetLeaderboardService {
    async findLeaderboard(type: SnapshotPetLeaderboardType): Promise<PetLeaderboardRow[]> {
        const db = new TargetDbClient();
        await db.connect();
        try {
            const rows = await db.query(
                "SELECT * FROM sync_pet_leaderboard WHERE type = ? ORDER BY rank ASC",
                [type]
            );
            return rows.map((r: any) => ({
                rank: r.rank,
                owner_name: r.owner_name || "",
                pet_name: r.pet_name || "",
                class: r.class || 0,
                className: r.className || "",
                level: r.level || 0,
                grow: Number(r.grow || 0),
                generation: r.generation || 0
            }));
        } finally {
            await db.close();
        }
    }
}
