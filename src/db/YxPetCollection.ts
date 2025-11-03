import { DbClient } from "./DbClient";

export class YxPetCollectionData {
    id: number = 0;                         // 宠物收集ID（主键）
    metal: number = 4294967295;             // 金
    metal2: number = 4294967295;            // 金2
    wood: number = 4294967295;              // 木
    wood2: number = 4294967295;             // 木2
    water: number = 4294967295;             // 水
    water2: number = 4294967295;            // 水2
    fire: number = 4294967295;              // 火
    fire2: number = 4294967295;             // 火2
    earth: number = 4294967295;             // 土
    earth2: number = 4294967295;             // 土2
    metal3: number = 4294967295;            // 金3
    wood3: number = 4294967295;             // 木3
    metal4: number = 4294967295;            // 金4
    wood4: number = 4294967295;             // 木4
    water3: number = 4294967295;            // 水3
    water4: number = 4294967295;            // 水4
    fire3: number = 4294967295;             // 火3
    fire4: number = 4294967295;             // 火4
    earth3: number = 4294967295;            // 土3
    earth4: number = 4294967295;            // 土4
}

export class YxPetCollection {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_petcollection 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的宠物收集数组
     */
    async findYxPetCollection(condition?: Partial<YxPetCollectionData>): Promise<YxPetCollectionData[]> {
        return this.db.find<YxPetCollectionData>('yx_petcollection', condition);
    }

    /**
     * 新增 yx_petcollection 数据
     * @param data 新增宠物收集数据（不含id）
     * @returns 新增宠物收集的id
     */
    async createYxPetCollection(data: Omit<YxPetCollectionData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['id'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxPetCollectionData>('yx_petcollection', data);
    }

    /**
     * 更新 yx_petcollection 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxPetCollection(data: Partial<Omit<YxPetCollectionData, 'id'>>, condition: Partial<YxPetCollectionData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxPetCollectionData>('yx_petcollection', data, condition);
    }

    /**
     * 删除 yx_petcollection 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxPetCollection(condition: Partial<YxPetCollectionData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxPetCollectionData>('yx_petcollection', condition);
    }
}
