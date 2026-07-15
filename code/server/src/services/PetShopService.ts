import { DbClient } from "../dbClient/DbClient";
import { formatQuery, getQuery } from "../utils/query";

export interface PetShopPetSlot {
    slot: number;
    pet: any | null;
}

export interface PetShopBag {
    bagId: number;
    itemId: number;
    items: PetShopPetSlot[];
}

/**
 * 宠物店宠物查询服务
 *
 * 根据 yx_user.id 查询 yx_storage（type=1）内存储的宠物。
 * item0~item7 对应 yx_pet.id；查询不到或 0 时返回 null。
 */
export class PetShopService {
    async getPets(userId: number): Promise<PetShopBag[]> {
        const db = new DbClient();
        await db.connect();
        try {
            const storageRows = await db.query(
                getQuery("PETSHOP_FIND_STORAGE"),
                [userId]
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
                const placeholders = petIds.map(() => "?").join(", ");
                const petSql = formatQuery("PETSHOP_FIND_PETS", { placeholders });
                const petRows = await db.query(petSql, petIds);
                for (const r of petRows) {
                    petMap.set(Number(r.id), r);
                }
            }

            return storageRows.map((row: any) => {
                const items: PetShopPetSlot[] = [];
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
