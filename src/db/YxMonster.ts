import { DbClient } from "./DbClient";

export class YxMonsterData {
    id: number;                             // 主键
    name: string = '';                       // 怪物名
    base_attack: number = 0.0000;            // 基础攻击
    base_defence: number = 0.0000;           // 基础防御
    base_dexterity: number = 0.0000;        // 基础敏捷
    base_life: number = 0.0000;             // 基础生命
    grow_point: number = 0.0000;            // 成长点数
    life_rise: number = 0.0000;             // 生命提升
    attack_rate: number = 0;                 // 攻击率
    defence_rate: number = 0;                // 防御率
    dexterity_rate: number = 0;             // 敏捷率
    look: number = 0;                       // 外观
    class: number = 0;                      // 类别
    index_num: number = 0;                  // 索引号
    hue0: number = 0;                       // 色调0
    saturation0: number = 0;                // 饱和度0
    bright0: number = 0;                    // 亮度0
    hue1: number = 0;                       // 色调1
    saturation1: number = 0;                // 饱和度1
    bright1: number = 0;                    // 亮度1
    hue2: number = 0;                       // 色调2
    saturation2: number = 0;                // 饱和度2
    bright2: number = 0;                    // 亮度2
}

export class YxMonster {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_monster 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的怪物数组
     */
    async findYxMonster(condition?: Partial<YxMonsterData>): Promise<YxMonsterData[]> {
        return this.db.find<YxMonsterData>('yx_monster', condition);
    }

    /**
     * 新增 yx_monster 数据
     * @param data 新增怪物数据（不含id）
     * @returns 新增怪物的id
     */
    async createYxMonster(data: Omit<YxMonsterData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['name'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxMonsterData>('yx_monster', data);
    }

    /**
     * 更新 yx_monster 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxMonster(data: Partial<Omit<YxMonsterData, 'id'>>, condition: Partial<YxMonsterData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxMonsterData>('yx_monster', data, condition);
    }

    /**
     * 删除 yx_monster 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxMonster(condition: Partial<YxMonsterData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxMonsterData>('yx_monster', condition);
    }
}
