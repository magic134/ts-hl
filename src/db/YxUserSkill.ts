import { DbClient } from "./DbClient";

export class YxUserSkillData {
    userid: number;                         // 用户ID（主键）
    skill_count: number = 0;                // 技能数量
    skill0_id: number = 0;                  // 技能0ID
    skill1_id: number = 0;                  // 技能1ID
    skill2_id: number = 0;                  // 技能2ID
    skill3_id: number = 0;                  // 技能3ID
    skill4_id: number = 0;                  // 技能4ID
    skill5_id: number = 0;                  // 技能5ID
    skill6_id: number = 0;                  // 技能6ID
    skill7_id: number = 0;                  // 技能7ID
    skill8_id: number = 0;                  // 技能8ID
    skill9_id: number = 0;                  // 技能9ID
    skillused_count: number = 0;            // 使用技能数量
    skillused0_id: number = 0;              // 使用技能0ID
    skillused1_id: number = 0;              // 使用技能1ID
    skillused2_id: number = 0;              // 使用技能2ID
    skillused3_id: number = 0;              // 使用技能3ID
    skillused4_id: number = 0;              // 使用技能4ID
}

export class YxUserSkill {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_userskilldata 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的用户技能数据数组
     */
    async findYxUserSkill(condition?: Partial<YxUserSkillData>): Promise<YxUserSkillData[]> {
        return this.db.find<YxUserSkillData>('yx_userskilldata', condition);
    }

    /**
     * 新增 yx_userskilldata 数据
     * @param data 新增用户技能数据（不含userid）
     * @returns 新增用户技能数据的userid
     */
    async createYxUserSkill(data: YxUserSkillData): Promise<number> {
        // 校验必填字段
        const requiredFields = ['userid'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxUserSkillData>('yx_userskilldata', data);
    }

    /**
     * 更新 yx_userskilldata 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxUserSkill(data: Partial<Omit<YxUserSkillData, 'userid'>>, condition: Partial<YxUserSkillData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxUserSkillData>('yx_userskilldata', data, condition);
    }

    /**
     * 删除 yx_userskilldata 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxUserSkill(condition: Partial<YxUserSkillData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxUserSkillData>('yx_userskilldata', condition);
    }
}
