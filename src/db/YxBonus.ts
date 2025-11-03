import { DbClient } from "./DbClient";

export class YxBonusData {
    id: number;                             // 奖励ID（主键）
    serianumber: string = '';                // 序列号
    password: string = '';                   // 密码
    action: number = 0;                     // 动作
}

export class YxBonus {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_bonus 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的奖励数组
     */
    async findYxBonus(condition?: Partial<YxBonusData>): Promise<YxBonusData[]> {
        return this.db.find<YxBonusData>('yx_bonus', condition);
    }

    /**
     * 新增 yx_bonus 数据
     * @param data 新增奖励数据（不含id）
     * @returns 新增奖励的id
     */
    async createYxBonus(data: Omit<YxBonusData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['serianumber', 'password'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxBonusData>('yx_bonus', data);
    }

    /**
     * 更新 yx_bonus 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxBonus(data: Partial<Omit<YxBonusData, 'id'>>, condition: Partial<YxBonusData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxBonusData>('yx_bonus', data, condition);
    }

    /**
     * 删除 yx_bonus 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxBonus(condition: Partial<YxBonusData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxBonusData>('yx_bonus', condition);
    }
}
