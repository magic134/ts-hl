import { DbClient } from "../dbClient/DbClient";
import { formatQuery } from "../utils/query";

export interface BaoBaoNangItemSlot {
    slot: number;
    item: any | null;
}

export interface BaoBaoNangBag {
    bagId: number;
    itemId: number;
    items: BaoBaoNangItemSlot[];
}

/**
 * 百宝囊物品查询服务
 *
 * 根据 yx_item.id（即 yx_storage.id_user）查询百宝囊（type=6）内存储的物品。
 * item0~item7 对应 yx_useritem.id；查询不到或 0 时返回 null。
 */
export class BaoBaoNangService {
    async getItems(itemIds: number[]): Promise<BaoBaoNangBag[]> {
        if (!Array.isArray(itemIds) || itemIds.length === 0) {
            throw new Error("item_ids 不能为空");
        }

        const db = new DbClient();
        await db.connect();
        try {
            // 1. 查询百宝囊 storage 记录
            const placeholders = itemIds.map(() => "?").join(", ");
            const storageSql = formatQuery("BAOBAONANG_FIND_STORAGE", { placeholders });
            const storageRows = await db.query(storageSql, [...itemIds, 6]);

            if (storageRows.length === 0) {
                return [];
            }

            // 2. 收集所有非 0 的 useritem id
            const userItemIdSet = new Set<number>();
            for (const row of storageRows) {
                for (let i = 0; i <= 7; i++) {
                    const id = Number(row[`item${i}`]) || 0;
                    if (id > 0) {
                        userItemIdSet.add(id);
                    }
                }
            }

            // 3. 查询 yx_useritem
            const userItemMap = new Map<number, any>();
            if (userItemIdSet.size > 0) {
                const userItemIds = Array.from(userItemIdSet);
                const userItemPlaceholders = userItemIds.map(() => "?").join(", ");
                const userItemSql = formatQuery("BAOBAONANG_FIND_USERITEMS", { placeholders: userItemPlaceholders });
                const userItemRows = await db.query(userItemSql, userItemIds);
                for (const r of userItemRows) {
                    userItemMap.set(Number(r.id), r);
                }
            }

            // 4. 组装结果
            return storageRows.map((row: any) => {
                const items: BaoBaoNangItemSlot[] = [];
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
