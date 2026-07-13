import { DbClient } from "../dbClient/DbClient";
import { PetRankBean } from "../types/api";
import { PROP_MAP } from "../config";
import { formatQuery } from "../utils/query";

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
    async findPetRank(req: FindPetRankReq, sourceDb?: DbClient): Promise<PetRankBean[]> {
        const db = sourceDb || new DbClient();
        const shouldClose = !sourceDb;
        if (shouldClose) {
            await db.connect();
        }
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
            const sql = formatQuery("PET_RANK_FIND", { whereSql });
            const rows = await db.query(sql, params);
            return rows.map((r: any) => ({
                ...r,
                prop: PROP_MAP[req.catena] || "",
                pet_treasure: ""
            }));
        } finally {
            if (shouldClose) {
                await db.close();
            }
        }
    }
}
