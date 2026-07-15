import { DbClient } from "../dbClient/DbClient";
import { formatQuery, getQuery } from "../utils/query";

export interface GangXiangZiItemSlot {
    slot: number;
    item: any | null;
}

export interface GangXiangZiBag {
    bagId: number;
    itemId: number;
    items: GangXiangZiItemSlot[];
}

/**
 * 帮派箱子查询服务
 *
 * 根据 yx_user.id 查询其所属帮派且 rank >= 90，取 owner_id（帮派 id）。
 * 再查 yx_playernpc（owner_id = 帮派 id, type = 201）获取帮派箱子 NPC id。
 * 最后通过 yx_storage.id_map = yx_playernpc.id 且 type = 2 查询箱内物品。
 * item0~item7 对应 yx_useritem.id；查询不到或 0 时返回 null。
 */
export class GangXiangZiService {
    async getItems(userId: number): Promise<GangXiangZiBag[]> {
        const db = new DbClient();
        await db.connect();
        try {
            const synRows = await db.query(
                getQuery("GANG_FIND_SYNMEMBER"),
                [userId]
            );

            if (synRows.length === 0) {
                return [];
            }

            const gangId = Number(synRows[0].owner_id);
            const npcRows = await db.query(
                getQuery("GANG_XIANGZI_FIND_PLAYERNPC"),
                [gangId]
            );

            if (npcRows.length === 0) {
                return [];
            }

            const npcIds = npcRows.map((row: any) => Number(row.id));
            const placeholders = npcIds.map(() => "?").join(", ");
            const storageSql = formatQuery("GANG_XIANGZI_FIND_STORAGE", { placeholders });
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
                const userItemSql = formatQuery("GANG_XIANGZI_FIND_USERITEMS", { placeholders: userItemPlaceholders });
                const userItemRows = await db.query(userItemSql, userItemIds);
                for (const r of userItemRows) {
                    userItemMap.set(Number(r.id), r);
                }
            }

            return storageRows.map((row: any) => {
                const items: GangXiangZiItemSlot[] = [];
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
