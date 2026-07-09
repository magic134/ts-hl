import { DbClient } from "../../../../src/dbClient/DbClient";
import { PET_CLASS_MAP } from "../constants/petClassMap";

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
 */
export class PetLeaderboardService {
    async findLeaderboard(type: PetLeaderboardType): Promise<PetLeaderboardRow[]> {
        const db = new DbClient();
        await db.connect();
        try {
            const classFilter = type === "nonEvolution"
                ? "FLOOR(p.class / 10000) = 7"
                : "FLOOR(p.class / 10000) != 7";

            const sql = `
                SELECT
                    p.class,
                    p.name AS pet_name,
                    p.attack,
                    p.defence,
                    p.dexterity,
                    p.base_attack,
                    p.base_defence,
                    p.base_dexterity,
                    FLOOR(p.generation) AS generation,
                    p.grow_rate,
                    FLOOR(p.level) AS level,
                    p.max_life,
                    (p.attack + p.defence + p.dexterity - p.base_attack - p.base_defence - p.base_dexterity) / (p.level - 1) AS grow,
                    u.name AS owner_name
                FROM yx_pet p
                LEFT JOIN yx_user u ON p.owner_id = u.id
                WHERE p.level > 1 AND ${classFilter}
                ORDER BY grow DESC
                LIMIT 100
            `;

            const rows = await db.query(sql, []);
            return rows.map((r: any, idx: number) => ({
                rank: idx + 1,
                owner_name: r.owner_name || "",
                pet_name: r.pet_name || "",
                class: r.class,
                className: PET_CLASS_MAP[r.class] || "未知",
                level: Math.floor(r.level || 0),
                grow: Number(r.grow || 0),
                generation: Math.floor(r.generation || 0)
            }));
        } finally {
            await db.close();
        }
    }
}
