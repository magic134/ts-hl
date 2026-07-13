import { DbClient } from "../dbClient/DbClient";
import { YxItemData } from "../db/YxItem";
import { getQuery } from "../utils/query";

export interface EquippedItem extends YxItemData {
    slot: "weapon" | "armor" | "shoes" | "treasure0" | "treasure1";
}

export interface BackpackItem extends YxItemData {
    isEquip: boolean;
}

/**
 * 玩家物品查询服务
 *
 * yx_item.id 编码规则：1 + N 个 0 + yx_user.id + 两位数物品序号
 * 例如 yx_user.id = 1125, 物品序号 = 11，则 yx_item.id = 100112511
 */
export class UserItemService {
    /**
     * 查询玩家身上穿戴的装备
     */
    async findEquippedItems(userId: number): Promise<EquippedItem[]> {
        const db = new DbClient();
        await db.connect();
        try {
            const sql = getQuery("USER_ITEM_FIND_EQUIPPED");
            const rows = await db.query(sql, [userId]);
            return rows.map((r: any) => ({
                id: r.id,
                name: r.name || "",
                cost: r.cost || 0,
                look: r.look || 0,
                item_sort: r.item_sort || 0,
                level_required: r.level_required || 0,
                life: r.life || 0,
                power: r.power || 0,
                attack: r.attack || 0,
                defence: r.defence || 0,
                dexterity: r.dexterity || 0,
                anti_poison: r.anti_poison || 0,
                anti_freeze: r.anti_freeze || 0,
                anti_sleep: r.anti_sleep || 0,
                anti_chaos: r.anti_chaos || 0,
                inventer_name: r.inventer_name || "",
                id_action: r.id_action || 0,
                exp: r.exp || 0,
                class: r.class || 0,
                sacrifice: r.sacrifice || 0,
                slot: r.slot
            }));
        } finally {
            await db.close();
        }
    }

    /**
     * 查询玩家背包物品（排除身上穿戴的装备）
     */
    async findBackpackItems(userId: number): Promise<BackpackItem[]> {
        const db = new DbClient();
        await db.connect();
        try {
            const sql = getQuery("USER_ITEM_FIND_BACKPACK");
            const rows = await db.query(sql, [userId]);
            return rows.map((r: any) => ({
                id: r.id,
                name: r.name || "",
                cost: r.cost || 0,
                look: r.look || 0,
                item_sort: r.item_sort || 0,
                level_required: r.level_required || 0,
                life: r.life || 0,
                power: r.power || 0,
                attack: r.attack || 0,
                defence: r.defence || 0,
                dexterity: r.dexterity || 0,
                anti_poison: r.anti_poison || 0,
                anti_freeze: r.anti_freeze || 0,
                anti_sleep: r.anti_sleep || 0,
                anti_chaos: r.anti_chaos || 0,
                inventer_name: r.inventer_name || "",
                id_action: r.id_action || 0,
                exp: r.exp || 0,
                class: r.class || 0,
                sacrifice: r.sacrifice || 0,
                isEquip: this.isEquipItem(r.item_sort)
            }));
        } finally {
            await db.close();
        }
    }

    /**
     * 判断物品是否为装备
     * 装备类 item_sort：0=武器, 100=衣服, 200=鞋子, 300=饰品, 400=头饰
     */
    private isEquipItem(itemSort: number): boolean {
        return [0, 100, 200, 300, 400].includes(itemSort);
    }
}
