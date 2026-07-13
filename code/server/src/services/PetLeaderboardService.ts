import { DbClient } from "../dbClient/DbClient";
import { formatQuery } from "../utils/query";

export type PetLeaderboardType = "all" | "nonEvolution";

export interface PetLeaderboardRow {
    rank: number;
    owner_name: string;
    pet_name: string;
    class: number;
    className: string;
    level: number;
    grow: number;
    generation: number;
}

/**
 * 宠物排行榜服务（对应 doc/WWW不加密 的 pet.php / pet2.php）
 * - all: 所有宠物
 * - nonEvolution: 不可进化宠（class 前缀 = 7）
 * 宠物类型通过 yx_pet.class 关联 yx_monster.class，显示 yx_monster.name
 */
export class PetLeaderboardService {
    async findLeaderboard(type: PetLeaderboardType, sourceDb?: DbClient): Promise<PetLeaderboardRow[]> {
        const db = sourceDb || new DbClient();
        const shouldClose = !sourceDb;
        if (shouldClose) {
            await db.connect();
        }
        try {
            const classFilter = type === "nonEvolution"
                ? "FLOOR(p.class / 10000) = 7"
                : "FLOOR(p.class / 10000) != 7";

            const sql = formatQuery("PET_LEADERBOARD_FIND", { classFilter });

            const rows = await db.query(sql, []);
            return rows.map((r: any, idx: number) => ({
                rank: idx + 1,
                owner_name: r.owner_name || "",
                pet_name: r.pet_name || "",
                class: r.class,
                className: r.monster_name || "未知",
                level: Math.floor(r.level || 0),
                grow: Number(r.grow || 0),
                generation: Math.floor(r.generation || 0)
            }));
        } finally {
            if (shouldClose) {
                await db.close();
            }
        }
    }
}
