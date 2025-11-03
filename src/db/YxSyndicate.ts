import { DbClient } from "./DbClient";

export class YxSyndicateData {
    id: number;                             // 主键
    name: string = '未命名';                 // 公会名
    title: string = '未命名';               // 标题
    tenet: string = '';                     // 宗旨
    level: number = 1;                      // 等级
    leader_title: string = '帮主';          // 帮主称号
    member_title: string = '弟子';          // 成员称号
    server_name: string = 'test';            // 服务器名
    race_type: number = 0;                  // 种族类型
    moral_type: number = 0;                 // 道德类型
    money: number = 300000;                 // 金钱
    mapenter_id: number = 0;                // 地图入口ID
    mapenter_x: number = 0;                 // 地图入口X坐标
    mapenter_y: number = 0;                 // 地图入口Y坐标
    mapenter_npc: number = 0;               // 地图入口NPC
    map_type: number = 0;                   // 地图类型
    map_id: number = 0;                     // 地图ID
    ally1: number = 0;                      // 盟友1
    ally2: number = 0;                      // 盟友2
    ally3: number = 0;                      // 盟友3
    ally4: number = 0;                      // 盟友4
    ally5: number = 0;                      // 盟友5
    enemy1: number = 0;                      // 敌人1
    enemy2: number = 0;                      // 敌人2
    enemy3: number = 0;                      // 敌人3
    enemy4: number = 0;                      // 敌人4
    enemy5: number = 0;                      // 敌人5
    original_leader_name: string = '';        // 原始帮主名称
    del_flag: number = 0;                    // 删除标志
    member_count: number = 0;                // 成员数量
}

export class YxSyndicate {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_syndicate 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的公会数组
     */
    async findYxSyndicate(condition?: Partial<YxSyndicateData>): Promise<YxSyndicateData[]> {
        return this.db.find<YxSyndicateData>('yx_syndicate', condition);
    }

    /**
     * 新增 yx_syndicate 数据
     * @param data 新增公会数据（不含id）
     * @returns 新增公会的id
     */
    async createYxSyndicate(data: Omit<YxSyndicateData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['name'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxSyndicateData>('yx_syndicate', data);
    }

    /**
     * 更新 yx_syndicate 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxSyndicate(data: Partial<Omit<YxSyndicateData, 'id'>>, condition: Partial<YxSyndicateData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxSyndicateData>('yx_syndicate', data, condition);
    }

    /**
     * 删除 yx_syndicate 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxSyndicate(condition: Partial<YxSyndicateData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxSyndicateData>('yx_syndicate', condition);
    }
}
