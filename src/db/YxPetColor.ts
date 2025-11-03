import { DbClient } from "./DbClient";

export class YxPetColorData {
    id_pet: number = 0;                     // 宠物ID（主键）
    hue0: number = 0;                        // 色调0
    stauration0: number = 0;                 // 饱和度0
    bright0: number = 0;                     // 亮度0
    hue1: number = 0;                        // 色调1
    stauration1: number = 0;                // 饱和度1
    bright1: number = 0;                     // 亮度1
    hue2: number = 0;                        // 色调2
    stauration2: number = 0;                // 饱和度2
    bright2: number = 0;                     // 亮度2
}

export class YxPetColor {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_petcolor 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的宠物颜色数组
     */
    async findYxPetColor(condition?: Partial<YxPetColorData>): Promise<YxPetColorData[]> {
        return this.db.find<YxPetColorData>('yx_petcolor', condition);
    }

    /**
     * 新增 yx_petcolor 数据
     * @param data 新增宠物颜色数据（不含id_pet）
     * @returns 新增宠物颜色的id_pet
     */
    async createYxPetColor(data: Omit<YxPetColorData, 'id_pet'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['id_pet'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxPetColorData>('yx_petcolor', data);
    }

    /**
     * 更新 yx_petcolor 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxPetColor(data: Partial<Omit<YxPetColorData, 'id_pet'>>, condition: Partial<YxPetColorData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxPetColorData>('yx_petcolor', data, condition);
    }

    /**
     * 删除 yx_petcolor 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxPetColor(condition: Partial<YxPetColorData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxPetColorData>('yx_petcolor', condition);
    }
}
