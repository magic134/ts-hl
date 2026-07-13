import { DbClient } from "../dbClient/DbClient";

export interface QianKunDaiPetSlot {
    slot: number;
    pet: any | null;
}

export interface QianKunDaiBag {
    bagId: number;
    itemId: number;
    items: QianKunDaiPetSlot[];
}

/**
 * 乾坤袋宠物查询服务
 *
 * 根据 yx_item.id（即 yx_storage.id_user）查询乾坤袋（type=5）内存储的宠物。
 * item0~item7 对应 yx_pet.id；查询不到或 0 时返回 null。
 */
export class QianKunDaiService {
    async getPets(itemIds: number[]): Promise<QianKunDaiBag[]> {
        if (!Array.isArray(itemIds) || itemIds.length === 0) {
            throw new Error("item_ids 不能为空");
        }

        const db = new DbClient();
        await db.connect();
        try {
            const placeholders = itemIds.map(() => "?").join(", ");
            const storageRows = await db.query(
                `SELECT * FROM yx_storage WHERE id_user IN (${placeholders}) AND type = 5`,
                itemIds
            );

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
                const petRows = await db.query(
                    `SELECT * FROM yx_pet WHERE id IN (${petPlaceholders})`,
                    petIds
                );
                for (const r of petRows) {
                    petMap.set(Number(r.id), r);
                }
            }

            return storageRows.map((row: any) => {
                const items: QianKunDaiPetSlot[] = [];
                for (let i = 0; i <= 7; i++) {
                    const id = Number(row[`item${i}`]) || 0;
                    items.push({
                        slot: i,
                        pet: id > 0 ? petMap.get(id) || null : null
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
