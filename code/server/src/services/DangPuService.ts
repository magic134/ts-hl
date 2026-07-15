import { DbClient } from "../dbClient/DbClient";
import { formatQuery, getQuery } from "../utils/query";

export interface DangPuItemSlot {
    slot: number;
    item: any | null;
}

export interface DangPuBag {
    bagId: number;
    itemId: number;
    items: DangPuItemSlot[];
}

/**
 * 当铺物品查询服务
 *
 * 根据 yx_user.id 查询 yx_storage（type=4）内存储的物品。
 * item0~item7 对应 yx_useritem.id；查询不到或 0 时返回 null。
 */
export class DangPuService {
    async getItems(userId: number): Promise<DangPuBag[]> {
        const db = new DbClient();
        await db.connect();
        try {
            const storageRows = await db.query(
                getQuery("DANGPU_FIND_STORAGE"),
                [userId]
            );

            if (storageRows.length === 0) {
                return [];
            }

            const userItemIdSet = new Set<number>();
            for (const row of storageRows) {
                for (let i = 0; i <= 7; i++) {
                    const id = Number(row[`item${i}`]) || 0;
                    if (id > 0) {
                        userItemIdSet.add(id);
                    }
                }
            }

            const userItemMap = new Map<number, any>();
            if (userItemIdSet.size > 0) {
                const userItemIds = Array.from(userItemIdSet);
                const placeholders = userItemIds.map(() => "?").join(", ");
                const userItemSql = formatQuery("DANGPU_FIND_USERITEMS", { placeholders });
                const userItemRows = await db.query(userItemSql, userItemIds);
                for (const r of userItemRows) {
                    userItemMap.set(Number(r.id), r);
                }
            }

            return storageRows.map((row: any) => {
                const items: DangPuItemSlot[] = [];
                for (let i = 0; i <= 7; i++) {
                    const id = Number(row[`item${i}`]) || 0;
                    items.push({
                        slot: i,
                        item: id > 0 ? userItemMap.get(id) || null : null
                    });
                }
                return {
                    bagId: Number(row.id),
                    itemId: Number(row.id_user),
                    items
                };
            });
        } finally {
            await db.close();
        }
    }
}
