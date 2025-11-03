import { DbClient } from "./DbClient";

export class YxColosseumData {
    id: number = 0;                         // 角斗场ID（主键）
    idmap: number = 0;                      // 地图ID
    name: string = '';                      // 角斗场名称
    type: number = 0;                       // 类型
    managerlook: number = 0;                // 管理员外观
    managercellx: number = 0;               // 管理员X坐标
    managercelly: number = 0;               // 管理员Y坐标
    lowlevellimit: number = 0;              // 最低等级限制
    toplevellimit: number = 1200;           // 最高等级限制
    class: number = 0;                      // 类别
}

export class YxColosseum {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_colosseum 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的角斗场数组
     */
    async findYxColosseum(condition?: Partial<YxColosseumData>): Promise<YxColosseumData[]> {
        return this.db.find<YxColosseumData>('yx_colosseum', condition);
    }

    /**
     * 新增 yx_colosseum 数据
     * @param data 新增角斗场数据（不含id）
     * @returns 新增角斗场的id
     */
    async createYxColosseum(data: Omit<YxColosseumData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['id'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxColosseumData>('yx_colosseum', data);
    }

    /**
     * 更新 yx_colosseum 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxColosseum(data: Partial<Omit<YxColosseumData, 'id'>>, condition: Partial<YxColosseumData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxColosseumData>('yx_colosseum', data, condition);
    }

    /**
     * 删除 yx_colosseum 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxColosseum(condition: Partial<YxColosseumData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxColosseumData>('yx_colosseum', condition);
    }
}
