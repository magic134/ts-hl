import { DbClient } from "../dbClient/DbClient";
import { formatQuery, getQuery } from "../utils/query";

export interface GangXunShouShiPetSlot {
    slot: number;
    pet: any | null;
}

export interface GangXunShouShiBag {
    bagId: number;
    itemId: number;
    items: GangXunShouShiPetSlot[];
}

/**
 * 帮派驯兽师查询服务
 *
 * 根据 yx_user.id 查询其所属帮派且 rank >= 90，取 owner_id（帮派 id）。
 * 再查 yx_playernpc（owner_id = 帮派 id, type = 202）获取驯兽师 NPC id。
 * 最后通过 yx_storage.id_map = yx_playernpc.id 且 type = 3 查询存放的宠物。
 * item0~item7 对应 yx_pet.id；查询不到或 0 时返回 null。
 */
export class GangXunShouShiService {
    async getPets(userId: number): Promise<GangXunShouShiBag[]> {
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
                getQuery("GANG_XUNSHOUSHI_FIND_PLAYERNPC"),
                [gangId]
            );

            if (npcRows.length === 0) {
                return [];
            }

            const npcIds = npcRows.map((row: any) => Number(row.id));
            const placeholders = npcIds.map(() => "?").join(", ");
            const storageSql = formatQuery("GANG_XUNSHOUSHI_FIND_STORAGE", { placeholders });
            const storageRows = await db.query(storageSql, npcIds);

            if (storageRows.length === 0) {
                return [];
            }

            const petIdSet = new Set<number>();
            for (const row of storageRows) {
                for (let i = 0; i <= 7; i++) {
                    const id = Number(row[`item${i}`]) || 0;
                    if (id > 0) {
                        petIdSet.add(id);
                    }
                }
            }

            const petMap = new Map<number, any>();
            if (petIdSet.size > 0) {
                const petIds = Array.from(petIdSet);
                const petPlaceholders = petIds.map(() => "?").join(", ");
                const petSql = formatQuery("GANG_XUNSHOUSHI_FIND_PETS", { placeholders: petPlaceholders });
                const petRows = await db.query(petSql, petIds);
                for (const r of petRows) {
                    petMap.set(Number(r.id), r);
                }
            }

            return storageRows.map((row: any) => {
                const items: GangXunShouShiPetSlot[] = [];
                for (let i = 0; i <= 7; i++) {
                    const id = Number(row[`item${i}`]) || 0;
                    items.push({
                        slot: i,
                        pet: id > 0 ? petMap.get(id) || null : null
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
