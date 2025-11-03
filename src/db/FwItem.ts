import { DbClient } from "./DbClient";

export class FwItemData {
    ownerid: number = 0;                     // 拥有者ID（主键）
    name: string = '';                      // 物品名称
    ownername: string = '';                 // 拥有者名称
    type: string = '兵刃';                  // 类型（兵刃、暗器、毒药、补药、宝物）
    power: number = 0;                       // 力量
    life: number = 0;                        // 生命
    attack: number = 0;                      // 攻击
    defence: number = 0;                     // 防御
    cost: number = 0;                        // 价格
    equiped: string = '否';                 // 是否装备（是、否）
}

export class FwItem {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 fw_item 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的物品数组
     */
    async findFwItem(condition?: Partial<FwItemData>): Promise<FwItemData[]> {
        return this.db.find<FwItemData>('fw_item', condition);
    }

    /**
     * 新增 fw_item 数据
     * @param data 新增物品数据（不含ownerid）
     * @returns 新增物品的ownerid
     */
    async createFwItem(data: FwItemData): Promise<number> {
        // 校验必填字段
        const requiredFields = ['ownerid', 'name', 'ownername'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<FwItemData>('fw_item', data);
    }

    /**
     * 更新 fw_item 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateFwItem(data: FwItemData, condition: Partial<FwItemData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<FwItemData>('fw_item', data, condition);
    }

    /**
     * 删除 fw_item 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteFwItem(condition: Partial<FwItemData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<FwItemData>('fw_item', condition);
    }
}
