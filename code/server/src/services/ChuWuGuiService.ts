import { DbClient } from "../dbClient/DbClient";
import { formatQuery, getQuery } from "../utils/query";

export interface ChuWuGuiItemSlot {
    slot: number;
    item: any | null;
}

export interface ChuWuGuiBag {
    bagId: number;
    itemId: number;
    items: ChuWuGuiItemSlot[];
}

/**
 * 储物柜查询服务
 *
 * 根据 yx_user.id 查询 yx_playernpc（type=201）获取储物柜 NPC id，
 * 再通过 yx_storage.id_map = yx_playernpc.id 且 type=2 查询储物柜内物品。
 * item0~item7 对应 yx_useritem.id；查询不到或 0 时返回 null。
 */
export class ChuWuGuiService {
    async getItems(userId: number): Promise<ChuWuGuiBag[]> {
        const db = new DbClient();
        await db.connect();
        try {
            const npcRows = await db.query(
                getQuery("CHUWUGUI_FIND_PLAYERNPC"),
                [userId]
            );

            if (npcRows.length === 0) {
                return [];
            }

            const npcIds = npcRows.map((row: any) => Number(row.id));
            const placeholders = npcIds.map(() => "?").join(", ");
            const storageSql = formatQuery("CHUWUGUI_FIND_STORAGE", { placeholders });
            const storageRows = await db.query(storageSql, npcIds);

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
                const userItemPlaceholders = userItemIds.map(() => "?").join(", ");
                const userItemSql = formatQuery("CHUWUGUI_FIND_USERITEMS", { placeholders: userItemPlaceholders });
                const userItemRows = await db.query(userItemSql, userItemIds);
                for (const r of userItemRows) {
                    userItemMap.set(Number(r.id), r);
                }
            }

            return storageRows.map((row: any) => {
                const items: ChuWuGuiItemSlot[] = [];
                for (let i = 0; i <= 7; i++) {
                    const id = Number(row[`item${i}`]) || 0;
                    items.push({
                        slot: i,
                        item: id > 0 ? userItemMap.get(id) || null : null
                    });
                }
                return {
                    bagId: Number(row.id),
                    itemId: Number(row.id_map),
                    items
                };
            });
        } finally {
            await db.close();
        }
    }
}
