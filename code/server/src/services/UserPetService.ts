import { DbClient } from "../dbClient/DbClient";
import { YxPetData } from "../db/YxPet";

export interface UserPet extends YxPetData {
    isActive: boolean;
}

/**
 * 玩家宠物查询服务
 */
export class UserPetService {
    /**
     * 查询玩家宠物列表，并标注当前出征宠物
     */
    async findPets(userId: number): Promise<UserPet[]> {
        const db = new DbClient();
        await db.connect();
        try {
            const sql = `
                SELECT
                    p.*,
                    CASE WHEN p.id = u.petused_id THEN 1 ELSE 0 END AS is_active
                FROM yx_user u, yx_pet p
                WHERE u.id = ?
                  AND p.id IN (u.pet0_id, u.pet1_id, u.pet2_id, u.pet3_id, u.pet4_id)
                ORDER BY p.id
            `;
            const rows = await db.query(sql, [userId]);
            return rows.map((r: any) => ({
                id: r.id,
                name: r.name || "",
                look: r.look || 0,
                attack: r.attack || 0,
                defence: r.defence || 0,
                dexterity: r.dexterity || 0,
                base_attack: r.base_attack || 0,
                base_defence: r.base_defence || 0,
                base_dexterity: r.base_dexterity || 0,
                level: r.level || 0,
                exp: r.exp || 0,
                life: r.life || 0,
                grow_rate: r.grow_rate || 0,
                generation: r.generation || 0,
                posx: r.posx || 0,
                posy: r.posy || 0,
                sp_atk_count: r.sp_atk_count || 0,
                sp_atk0: r.sp_atk0 || 0,
                sp_atk1: r.sp_atk1 || 0,
                sp_atk2: r.sp_atk2 || 0,
                sp_atk3: r.sp_atk3 || 0,
                sp_atk4: r.sp_atk4 || 0,
                cap_lev: r.cap_lev || 0,
                owner_id: r.owner_id || 0,
                treasure_id: r.treasure_id || 0,
                medal_attack: r.medal_attack || 0,
                medal_defence: r.medal_defence || 0,
                medal_dexterity: r.medal_dexterity || 0,
                base_life: r.base_life || 0,
                max_life: r.max_life || 0,
                class: r.class || 0,
                fidelity: r.fidelity || 0,
                life_rise: r.life_rise || 0,
                attack_rate: r.attack_rate || 0,
                defence_rate: r.defence_rate || 0,
                dexterity_rate: r.dexterity_rate || 0,
                state: r.state || 0,
                hue0: r.hue0 || 0,
                saturation0: r.saturation0 || 0,
                bright0: r.bright0 || 0,
                hue1: r.hue1 || 0,
                saturation1: r.saturation1 || 0,
                bright1: r.bright1 || 0,
                hue2: r.hue2 || 0,
                saturation2: r.saturation2 || 0,
                bright2: r.bright2 || 0,
                org_growrate: r.org_growrate || 0,
                isActive: Boolean(r.is_active)
            }));
        } finally {
            await db.close();
        }
    }
}
