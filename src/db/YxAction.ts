import { DbClient } from "./DbClient";

export class YxActionData {
    id: number = 0;                         // 动作ID（主键）
    id_next: number = 0;                    // 下一个动作ID
    id_nextfail: number = 0;                // 失败时下一个动作ID
    type: number = 0;                       // 动作类型
    data: number = 0;                        // 数据
    param: string = '';                     // 参数
}

export class YxAction {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_action 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的动作数组
     */
    async findYxAction(condition?: Partial<YxActionData>): Promise<YxActionData[]> {
        return this.db.find<YxActionData>('yx_action', condition);
    }

    /**
     * 新增 yx_action 数据
     * @param data 新增动作数据（不含id）
     * @returns 新增动作的id
     */
    async createYxAction(data: Omit<YxActionData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['id'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxActionData>('yx_action', data);
    }

    /**
     * 更新 yx_action 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxAction(data: Partial<Omit<YxActionData, 'id'>>, condition: Partial<YxActionData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxActionData>('yx_action', data, condition);
    }

    /**
     * 删除 yx_action 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxAction(condition: Partial<YxActionData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxActionData>('yx_action', condition);
    }
}
