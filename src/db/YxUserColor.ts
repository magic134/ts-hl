import { DbClient } from "./DbClient";

export class YxUserColorData {
    id_user: number = 0;                     // 用户ID（主键）
    hue0: number = 0;                        // 色调0
    saturation0: number = 0;                // 饱和度0
    bright0: number = 0;                    // 亮度0
    hue1: number = 0;                        // 色调1
    saturation1: number = 0;                // 饱和度1
    bright1: number = 0;                    // 亮度1
    hue2: number = 0;                        // 色调2
    saturation2: number = 0;                // 饱和度2
    bright2: number = 0;                    // 亮度2
    hue3: number = 0;                        // 色调3
    saturation3: number = 0;                // 饱和度3
    bright3: number = 0;                    // 亮度3
    hue4: number = 0;                        // 色调4
    saturation4: number = 0;                // 饱和度4
    bright4: number = 0;                    // 亮度4
}

export class YxUserColor {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_usercolor 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的用户颜色数组
     */
    async findYxUserColor(condition?: Partial<YxUserColorData>): Promise<YxUserColorData[]> {
        return this.db.find<YxUserColorData>('yx_usercolor', condition);
    }

    /**
     * 新增 yx_usercolor 数据
     * @param data 新增用户颜色数据（不含id_user）
     * @returns 新增用户颜色的id_user
     */
    async createYxUserColor(data: YxUserColorData): Promise<number> {
        // 校验必填字段
        const requiredFields = ['id_user'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxUserColorData>('yx_usercolor', data);
    }

    /**
     * 更新 yx_usercolor 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxUserColor(data: Partial<Omit<YxUserColorData, 'id_user'>>, condition: Partial<YxUserColorData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxUserColorData>('yx_usercolor', data, condition);
    }

    /**
     * 删除 yx_usercolor 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxUserColor(condition: Partial<YxUserColorData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxUserColorData>('yx_usercolor', condition);
    }
}
