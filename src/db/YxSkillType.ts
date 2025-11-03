import { DbClient } from "./DbClient";

export class YxSkillTypeData {
    id: number;                             // 技能类型ID（主键）
    name: string = '';                      // 技能类型名称
    skill_sort: number = 0;                  // 技能分类
    owner_id: number = 0;                    // 拥有者ID
    look: number = 0;                        // 外观
    trace: number = 0;                       // 追踪
    blast: number = 0;                       // 爆炸
    level_required: number = 0;              // 等级要求
    power: number = 0;                       // 力量
    attack_coefficient: number = 0;          // 攻击系数
    defence_coefficient: number = 0;          // 防御系数
    recover_coefficient: number = 0;         // 恢复系数
    magic_coefficient: number = 0;           // 魔法系数
    cast_coefficient: number = 0;            // 施法系数
    lost_coefficient: number = 0;            // 损失系数
    magic_bout: number = 0;                  // 魔法回合
    range: number = 0;                       // 范围
    magic_range: number = 0;                 // 魔法范围
    magic_sort: number = 0;                  // 魔法分类
    select_flag: number = 0;                 // 选择标志
    exp: number = 0;                         // 经验
    inventer_name: string = '';              // 发明者名称
}

export class YxSkillType {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_skilltype 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的技能类型数组
     */
    async findYxSkillType(condition?: Partial<YxSkillTypeData>): Promise<YxSkillTypeData[]> {
        return this.db.find<YxSkillTypeData>('yx_skilltype', condition);
    }

    /**
     * 新增 yx_skilltype 数据
     * @param data 新增技能类型数据（不含id）
     * @returns 新增技能类型的id
     */
    async createYxSkillType(data: Omit<YxSkillTypeData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['name'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxSkillTypeData>('yx_skilltype', data);
    }

    /**
     * 更新 yx_skilltype 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxSkillType(data: Partial<Omit<YxSkillTypeData, 'id'>>, condition: Partial<YxSkillTypeData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxSkillTypeData>('yx_skilltype', data, condition);
    }

    /**
     * 删除 yx_skilltype 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxSkillType(condition: Partial<YxSkillTypeData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxSkillTypeData>('yx_skilltype', condition);
    }
}
