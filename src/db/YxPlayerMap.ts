import { DbClient } from "./DbClient";

export class YxPlayerMapData {
    id: number;                             // 玩家地图ID（主键）
    name: string = '未命名';                 // 地图名称
    describe_text: string = '';             // 描述文本
    mapdoc: number = 0;                     // 地图文档
    type: number = 0;                       // 类型
    max_monster: number = 0;                // 最大怪物数
    monster_type0: number = 0;               // 怪物类型0
    monster_type1: number = 0;               // 怪物类型1
    monster_level0: number = 0;              // 怪物等级0
    monster_level1: number = 0;              // 怪物等级1
    org_monster_rate: number = 0;           // 原始怪物率
    award0: number = 0;                      // 奖励0
    award1: number = 0;                      // 奖励1
    area0_x: number = 0;                     // 区域0X坐标
    area0_y: number = 0;                     // 区域0Y坐标
    area0_range: number = 0;                  // 区域0范围
    monster0_area0: number = 0;              // 怪物0区域0
    monsterlev0_area0: number = 0;           // 怪物等级0区域0
    monster1_area0: number = 0;              // 怪物1区域0
    monsterlev1_area0: number = 0;           // 怪物等级1区域0
    org_rate_area0: number = 0;              // 原始率区域0
    area0_award0: number = 0;                // 区域0奖励0
    area0_award1: number = 0;                // 区域0奖励1
    area1_x: number = 0;                     // 区域1X坐标
    area1_y: number = 0;                     // 区域1Y坐标
    area1_range: number = 0;                 // 区域1范围
    // 注意：由于玩家地图表字段很多，这里只列出主要字段
    // 实际使用时需要根据完整的SQL结构补充所有字段
}

export class YxPlayerMap {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_playermap 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的玩家地图数组
     */
    async findYxPlayerMap(condition?: Partial<YxPlayerMapData>): Promise<YxPlayerMapData[]> {
        return this.db.find<YxPlayerMapData>('yx_playermap', condition);
    }

    /**
     * 新增 yx_playermap 数据
     * @param data 新增玩家地图数据（不含id）
     * @returns 新增玩家地图的id
     */
    async createYxPlayerMap(data: Omit<YxPlayerMapData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['name', 'mapdoc'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxPlayerMapData>('yx_playermap', data);
    }

    /**
     * 更新 yx_playermap 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxPlayerMap(data: Partial<Omit<YxPlayerMapData, 'id'>>, condition: Partial<YxPlayerMapData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxPlayerMapData>('yx_playermap', data, condition);
    }

    /**
     * 删除 yx_playermap 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxPlayerMap(condition: Partial<YxPlayerMapData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxPlayerMapData>('yx_playermap', condition);
    }
}
