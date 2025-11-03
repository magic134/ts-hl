import { DbClient } from "./DbClient";

export class YxSubGroupData {
    id: number;                             // 子组ID（主键）
    owner_id: number = 0;                    // 拥有者ID
    title: string = '';                     // 标题
    tenet: string = '';                     // 宗旨
    name: string = '';                      // 名称
    del_flag: number = 0;                    // 删除标志
}

export class YxSubGroup {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_subgroup 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的子组数组
     */
    async findYxSubGroup(condition?: Partial<YxSubGroupData>): Promise<YxSubGroupData[]> {
        return this.db.find<YxSubGroupData>('yx_subgroup', condition);
    }

    /**
     * 新增 yx_subgroup 数据
     * @param data 新增子组数据（不含id）
     * @returns 新增子组的id
     */
    async createYxSubGroup(data: Omit<YxSubGroupData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['owner_id', 'name'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxSubGroupData>('yx_subgroup', data);
    }

    /**
     * 更新 yx_subgroup 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxSubGroup(data: Partial<Omit<YxSubGroupData, 'id'>>, condition: Partial<YxSubGroupData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxSubGroupData>('yx_subgroup', data, condition);
    }

    /**
     * 删除 yx_subgroup 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxSubGroup(condition: Partial<YxSubGroupData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxSubGroupData>('yx_subgroup', condition);
    }
}
