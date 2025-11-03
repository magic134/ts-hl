import { DbClient } from "./DbClient";

export class YxNpcData {
    id: number = 0;                         // NPC ID
    name: string = '未命名';                 // NPC名称
    type: number = 0;                       // NPC类型
    look: number = 0;                       // 外观
    idmap: number = 0;                      // 地图ID
    cellx: number = 0;                      // X坐标
    celly: number = 0;                      // Y坐标
    jobtrinum: number = 0;                  // 职业数量
    job0: number = 0;                        // 职业0
    job1: number = 0;                        // 职业1
    job2: number = 0;                        // 职业2
    job3: number = 0;                        // 职业3
    job4: number = 0;                        // 职业4
    job5: number = 0;                        // 职业5
    job6: number = 0;                        // 职业6
    job7: number = 0;                        // 职业7
    face: number = 0;                       // 头像
    idxserver: number = -1;                 // 服务器索引
    owner_id: number = 0;                    // 拥有者ID
    data0: number = 0;                       // 数据0
    data1: number = 0;                       // 数据1
    data2: number = 0;                       // 数据2
    data3: number = 0;                       // 数据3
    hue0: number = 0;                        // 色调0
    saturation0: number = 0;                // 饱和度0
    bright0: number = 0;                    // 亮度0
    // 注意：由于NPC表字段很多，这里只列出主要字段
    // 实际使用时需要根据完整的SQL结构补充所有字段
}

export class YxNpc {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_npc 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的NPC数组
     */
    async findYxNpc(condition?: Partial<YxNpcData>): Promise<YxNpcData[]> {
        return this.db.find<YxNpcData>('yx_npc', condition);
    }

    /**
     * 新增 yx_npc 数据
     * @param data 新增NPC数据（不含id）
     * @returns 新增NPC的id
     */
    async createYxNpc(data: Omit<YxNpcData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['name'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxNpcData>('yx_npc', data);
    }

    /**
     * 更新 yx_npc 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxNpc(data: Partial<Omit<YxNpcData, 'id'>>, condition: Partial<YxNpcData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxNpcData>('yx_npc', data, condition);
    }

    /**
     * 删除 yx_npc 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxNpc(condition: Partial<YxNpcData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxNpcData>('yx_npc', condition);
    }
}
