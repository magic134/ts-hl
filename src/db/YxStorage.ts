import { DbClient } from "./DbClient";

export class YxStorageData {
    id: number;                             // 存储ID（主键）
    id_user: number = 0;                    // 用户ID
    id_map: number = 0;                     // 地图ID
    type: number = 0;                       // 类型
    item0: number = 0;                      // 物品0
    item1: number = 0;                      // 物品1
    item2: number = 0;                      // 物品2
    item3: number = 0;                      // 物品3
    item4: number = 0;                      // 物品4
    item5: number = 0;                      // 物品5
    item6: number = 0;                      // 物品6
    item7: number = 0;                      // 物品7
}

export class YxStorage {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_storage 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的存储数据数组
     */
    async findYxStorage(condition?: Partial<YxStorageData>): Promise<YxStorageData[]> {
        return this.db.find<YxStorageData>('yx_storage', condition);
    }

    /**
     * 新增 yx_storage 数据
     * @param data 新增存储数据（不含id）
     * @returns 新增存储数据的id
     */
    async createYxStorage(data: Omit<YxStorageData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['id_user', 'id_map', 'type'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxStorageData>('yx_storage', data);
    }

    /**
     * 更新 yx_storage 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxStorage(data: Partial<Omit<YxStorageData, 'id'>>, condition: Partial<YxStorageData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxStorageData>('yx_storage', data, condition);
    }

    /**
     * 删除 yx_storage 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxStorage(condition: Partial<YxStorageData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxStorageData>('yx_storage', condition);
    }
}
