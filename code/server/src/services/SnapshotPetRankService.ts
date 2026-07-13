import { TargetDbClient } from "../dbClient/TargetDbClient";
import { PetRankBean } from "../types/api";
import { PROP_MAP } from "../config";
import { getQuery } from "../utils/query";

export interface FindPetRankReq {
    catena: string;
    isEvolution: string;
}

/**
 * 宠物等级排行榜快照查询服务
 * 从目标库的 sync_pet_rank 表读取，不再访问源库
 */
export class SnapshotPetRankService {
    async findPetRank(req: FindPetRankReq): Promise<PetRankBean[]> {
        const db = new TargetDbClient();
        await db.connect();
        try {
            const rows = await db.query(getQuery("SNAPSHOT_PET_RANK_FIND"), [req.catena || "", req.isEvolution || ""]);
            return rows.map((r: any) => ({
                ...r,
                id: r.pet_id || 0,
                prop: PROP_MAP[req.catena] || "",
                pet_treasure: ""
            }));
        } finally {
            await db.close();
        }
    }
}
