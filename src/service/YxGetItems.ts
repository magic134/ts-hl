import { DbClient } from "../dbClient/DbClient";

export class YxGetItems {
    constructor() {}

    /**
     * 根据 用户id 值查询玩家身上的物品
     */
    async getItemByUserId(user_id:number) {
        const db = new DbClient();
        await db.connect();
        try {
            // 第一步：从 yx_item 表查询获取 id, full_trimmed, part1, part2
            const itemRows = await db.query(
                `SELECT 
                    id,
                    MID(id, 2) + 0 AS full_trimmed,
                    FLOOR((MID(id, 2) + 0)/100) AS part1,
                    (MID(id, 2) + 0) % 100 AS part2,
                    name
                FROM 
                    yx_item
                WHERE 
                    FLOOR((MID(id, 2) + 0)/100) = ?;`,
                [user_id]
            );

            if (!itemRows || itemRows.length === 0) {
                return [];
            }

            // 收集所有有效的 account_id
            const itemIds: string[] = [];
            for (const row of itemRows) {
                if (row.name) {
                    itemIds.push(row.name + ' :' + row.part2);
                } 
            }

            if (itemIds.length === 0) {
                return [];
            }


            return itemIds;
        } finally {
            await db.close();
        }
    }
}

export default new YxGetItems();
