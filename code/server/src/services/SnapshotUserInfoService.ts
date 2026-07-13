import { TargetDbClient } from "../dbClient/TargetDbClient";
import { UserVo } from "../types/api";
import { getQuery } from "../utils/query";

/**
 * 个人信息快照查询服务
 * 从目标库的 sync_user_full 表读取，不再访问源库
 */
export class SnapshotUserInfoService {
    async getInfo(userId: number): Promise<UserVo> {
        const db = new TargetDbClient();
        await db.connect();
        try {
            const rows = await db.query(getQuery("SNAPSHOT_USER_INFO_FIND"), [userId]);
            if (rows.length === 0) {
                throw new Error("用户快照不存在");
            }
            return this.toUserVo(rows[0]);
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
