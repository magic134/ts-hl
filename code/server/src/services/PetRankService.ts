import { DbClient } from "../../../../src/dbClient/DbClient";
import { PetRankBean } from "../types/api";
import { PROP_MAP } from "../config";

export interface FindPetRankReq {
    catena: string;
    isEvolution: string;
}

/**
 * 宠物排行榜查询服务
 *
 * 过滤条件：
 * - catena: 对应 yx_pet.hue0（2=水, 3=火, 4=金, 5=木, 6=土, 7=无属性）
 * - isEvolution: 对应 yx_pet.generation（"1"=进化，"7"=不进化）
 */
export class PetRankService {
    async findPetRank(req: FindPetRankReq): Promise<PetRankBean[]> {
        const db = new DbClient();
        await db.connect();
        try {
            const where: string[] = [];
            const params: any[] = [];
            if (req.catena) {
                where.push("p.hue0 = ?");
                params.push(parseInt(req.catena, 10));
            }
            if (req.isEvolution) {
                where.push(req.isEvolution === "1" ? "p.generation > 0" : "p.generation = 0");
            }
            const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
            const sql = `
                SELECT
                    p.id,
                    u.name AS owner_name,
                    p.name AS pet_origin_name,
                    p.name AS pet_name,
                    p.grow_rate,
                    p.grow_rate AS grow_point,
                    p.level,
                    p.attack,
                    p.defence,
                    p.dexterity,
                    p.life,
                    p.generation,
                    p.medal_attack,
                    p.medal_defence,
                    p.medal_dexterity,
                    p.treasure_id
                FROM yx_pet p
                LEFT JOIN yx_user u ON p.owner_id = u.id
                ${whereSql}
                ORDER BY p.level DESC, p.grow_rate DESC
                LIMIT 100
            `;
            const rows = await db.query(sql, params);
            return rows.map((r: any) => ({
                ...r,
                prop: PROP_MAP[req.catena] || "",
                pet_treasure: ""
            }));
        } finally {
            await db.close();
        }
    }
}
