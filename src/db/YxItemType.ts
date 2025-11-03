import { DbClient } from "./DbClient";

export class YxItemTypeData {
    id: number;                             // 物品类型ID（主键）
    name: string = '';                      // 物品类型名称
    cost: number = 0;                       // 价格
    look: number = 0;                        // 外观
    item_sort: number = 0;                   // 物品分类
    level_required: number = 0;              // 等级要求
    life: number = 0;                        // 生命
    power: number = 0;                       // 力量
    attack: number = 0;                      // 攻击
    defence: number = 0;                     // 防御
    dexterity: number = 0;                   // 敏捷
    anti_poison: number = 0;                 // 抗毒
    anti_freeze: number = 0;                 // 抗冻
    anti_sleep: number = 0;                  // 抗睡
    anti_chaos: number = 0;                  // 抗混乱
    inventer_name: string = '';              // 发明者名称
    id_action: number = 0;                   // 动作ID
    exp: number = 0;                         // 经验
    class: number = 0;                       // 类别
    sacrifice: number = 0;                  // 牺牲
}

export class YxItemType {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_itemtype 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的物品类型数组
     */
    async findYxItemType(condition?: Partial<YxItemTypeData>): Promise<YxItemTypeData[]> {
        return this.db.find<YxItemTypeData>('yx_itemtype', condition);
    }

    /**
     * 新增 yx_itemtype 数据
     * @param data 新增物品类型数据（不含id）
     * @returns 新增物品类型的id
     */
    async createYxItemType(data: Omit<YxItemTypeData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['name'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxItemTypeData>('yx_itemtype', data);
    }

    /**
     * 更新 yx_itemtype 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxItemType(data: Partial<Omit<YxItemTypeData, 'id'>>, condition: Partial<YxItemTypeData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxItemTypeData>('yx_itemtype', data, condition);
    }

    /**
     * 删除 yx_itemtype 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxItemType(condition: Partial<YxItemTypeData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxItemTypeData>('yx_itemtype', condition);
    }
}
