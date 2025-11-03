import { DbClient } from "./DbClient";

export class YxUserPetData {
    userid: number;                         // 用户ID（主键）
    pet_count: number = 0;                  // 宠物数量
    petused_id: number = 0;                 // 当前使用宠物ID
    pet0_id: number = 0;                    // 宠物0ID
    pet1_id: number = 0;                    // 宠物1ID
    pet2_id: number = 0;                    // 宠物2ID
    pet3_id: number = 0;                    // 宠物3ID
    pet4_id: number = 0;                    // 宠物4ID
}

export class YxUserPet {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_userpetdata 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的用户宠物数据数组
     */
    async findYxUserPet(condition?: Partial<YxUserPetData>): Promise<YxUserPetData[]> {
        return this.db.find<YxUserPetData>('yx_userpetdata', condition);
    }

    /**
     * 新增 yx_userpetdata 数据
     * @param data 新增用户宠物数据（不含userid）
     * @returns 新增用户宠物数据的userid
     */
    async createYxUserPet(data:YxUserPetData): Promise<number> {
        // 校验必填字段
        const requiredFields = ['userid'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxUserPetData>('yx_userpetdata', data);
    }

    /**
     * 更新 yx_userpetdata 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxUserPet(data: Partial<Omit<YxUserPetData, 'userid'>>, condition: Partial<YxUserPetData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxUserPetData>('yx_userpetdata', data, condition);
    }

    /**
     * 删除 yx_userpetdata 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxUserPet(condition: Partial<YxUserPetData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxUserPetData>('yx_userpetdata', condition);
    }
}
