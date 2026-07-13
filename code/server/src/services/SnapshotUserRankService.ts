import { TargetDbClient } from "../dbClient/TargetDbClient";
import { UserVo } from "../types/api";
import { getQuery } from "../utils/query";

export interface FindUserRankReq {
    rankType: string;
}

/**
 * 人物通用排行榜快照查询服务
 * 从目标库的 sync_user_rank 表读取，不再访问源库
 */
export class SnapshotUserRankService {
    async findRank(req: FindUserRankReq): Promise<UserVo[]> {
        const rankType = req.rankType || "0";
        const db = new TargetDbClient();
        await db.connect();
        try {
            const rows = await db.query(getQuery("SNAPSHOT_USER_RANK_FIND"), [rankType]);
            return rows.map((r: any) => this.toUserVo(r));
        } finally {
            await db.close();
        }
    }

    private toUserVo(row: any): UserVo {
        return {
            ...row,
            hongli: row.additional_point || 0,
            toutaishu: row.metempsychosis || 0,
            love: row.love || 0,
            qq: row.qq || "",
            token: ""
        };
    }
}
