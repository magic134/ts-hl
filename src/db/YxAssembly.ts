import { DbClient } from "./DbClient";

export class YxAssemblyData {
    id: number;                             // 组装ID（主键）
    part0: number = 0;                       // 部件0
    param0: string = '';                     // 参数0
    part1: number = 0;                       // 部件1
    param1: string = '';                     // 参数1
    part2: number = 0;                       // 部件2
    param2: string = '';                     // 参数2
    part3: number = 0;                       // 部件3
    param3: string = '';                     // 参数3
    part4: number = 0;                       // 部件4
    param4: string = '';                     // 参数4
    part5: number = 0;                       // 部件5
    param5: string = '';                     // 参数5
    part6: number = 0;                       // 部件6
    param6: string = '';                     // 参数6
    part7: number = 0;                       // 部件7
    param7: string = '';                     // 参数7
    index_main: number = 0;                  // 主索引
    product_type: number = 0;                // 产品类型
    product_data: number = 0;                // 产品数据
    map: number = 0;                         // 地图
    exp: number = 0;                         // 经验
    chance: number = 0;                      // 几率
}

export class YxAssembly {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_assembly 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的组装数组
     */
    async findYxAssembly(condition?: Partial<YxAssemblyData>): Promise<YxAssemblyData[]> {
        return this.db.find<YxAssemblyData>('yx_assembly', condition);
    }

    /**
     * 新增 yx_assembly 数据
     * @param data 新增组装数据（不含id）
     * @returns 新增组装的id
     */
    async createYxAssembly(data: Omit<YxAssemblyData, 'id'>): Promise<number> {
        return this.db.create<YxAssemblyData>('yx_assembly', data);
    }

    /**
     * 更新 yx_assembly 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxAssembly(data: Partial<Omit<YxAssemblyData, 'id'>>, condition: Partial<YxAssemblyData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxAssemblyData>('yx_assembly', data, condition);
    }

    /**
     * 删除 yx_assembly 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxAssembly(condition: Partial<YxAssemblyData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxAssemblyData>('yx_assembly', condition);
    }
}
