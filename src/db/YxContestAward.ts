import { DbClient } from "./DbClient";

export class YxContestAwardData {
    id: number;                             // 竞赛奖励ID（主键）
    id_user: number = 0;                    // 用户ID
    id_action: number = 0;                  // 动作ID
    flad: number = 0;                       // 标志
}

export class YxContestAward {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_contestaward 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的竞赛奖励数组
     */
    async findYxContestAward(condition?: Partial<YxContestAwardData>): Promise<YxContestAwardData[]> {
        return this.db.find<YxContestAwardData>('yx_contestaward', condition);
    }

    /**
     * 新增 yx_contestaward 数据
     * @param data 新增竞赛奖励数据（不含id）
     * @returns 新增竞赛奖励的id
     */
    async createYxContestAward(data: Omit<YxContestAwardData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['id_user', 'id_action'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxContestAwardData>('yx_contestaward', data);
    }

    /**
     * 更新 yx_contestaward 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxContestAward(data: Partial<Omit<YxContestAwardData, 'id'>>, condition: Partial<YxContestAwardData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxContestAwardData>('yx_contestaward', data, condition);
    }

    /**
     * 删除 yx_contestaward 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxContestAward(condition: Partial<YxContestAwardData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxContestAwardData>('yx_contestaward', condition);
    }
}
