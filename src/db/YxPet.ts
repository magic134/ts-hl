import { DbClient } from "./DbClient";


export class YxPetData {
    id: number;                             // 主键
    name: string = '苦行龟';                     // 宠物名
    look: number = 122;                       // 外观
    attack: number = 6.8600;                // 攻击力
    defence: number = 9.0600;               // 防御力
    dexterity: number = 4.5800;             // 敏捷
    base_attack: number = 6.8600;           // 基础攻击
    base_defence: number = 9.0600;          // 基础防御
    base_dexterity: number = 4.5800;        // 基础敏捷
    level: number = 1;                      // 等级
    exp: number = 0;                        // 经验
    life: number = 43;                       // 生命值
    grow_rate: number = 4.0100;             // 成长率
    generation: number = 0;                 // 世代
    posx: number = 0;                       // X坐标
    posy: number = 0;                       // Y坐标
    sp_atk_count: number = 0;               // 特殊攻击数量
    sp_atk0: number = 0;                    // 特殊攻击0
    sp_atk1: number = 0;                    // 特殊攻击1
    sp_atk2: number = 0;                    // 特殊攻击2
    sp_atk3: number = 0;                    // 特殊攻击3
    sp_atk4: number = 0;                    // 特殊攻击4
    cap_lev: number = 1;                    // 上限等级
    owner_id: number = 1;                   // 主人ID
    treasure_id: number = 1;                // 宝物ID
    medal_attack: number = 0;               // 攻击勋章
    medal_defence: number = 0;              // 防御勋章
    medal_dexterity: number = 0;            // 敏捷勋章
    base_life: number = 43.6400;             // 基础生命
    max_life: number = 43.6400;              // 最大生命
    class: number = 72013;                      // 类别
    fidelity: number = 100;                   // 忠诚度
    life_rise: number = 3.7300;             // 生命提升
    attack_rate: number = 29;                // 攻击率
    defence_rate: number = 41;               // 防御率
    dexterity_rate: number = 30;             // 敏捷率
    state: number = 0;                      // 状态
    hue0: number = 7;                       // 色调0
    saturation0: number = 50;                // 饱和度0
    bright0: number = 32;                    // 亮度0
    hue1: number = 7;                       // 色调1
    saturation1: number = 50;                // 饱和度1
    bright1: number = 23;                    // 亮度1
    hue2: number = 21;                       // 色调2
    saturation2: number = 40;                // 饱和度2
    bright2: number = 45;                    // 亮度2
    org_growrate: number = 4.0100;          // 原始成长率
}

export class YxPet {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_pet 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的宠物数组
     */
    async findYxPet(condition?: Partial<YxPetData>): Promise<YxPetData[]> {
        return this.db.find<YxPetData>('yx_pet', condition);
    }

    /**
     * 新增 yx_pet 数据
     * @param data 新增宠物数据（不含id）
     * @returns 新增宠物的id
     */
    async createYxPet(data: Omit<YxPetData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['name', 'owner_id'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxPetData>('yx_pet', data);
    }

    /**
     * 更新 yx_pet 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxPet(data: Partial<Omit<YxPetData, 'id'>>, condition: Partial<YxPetData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxPetData>('yx_pet', data, condition);
    }

    /**
     * 删除 yx_pet 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxPet(condition: Partial<YxPetData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxPetData>('yx_pet', condition);
    }
}
