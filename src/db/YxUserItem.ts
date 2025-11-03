import { DbClient } from "./DbClient";

export class YxUserItemData {
    id: number;                             // 主键
    name: string = '';                      // 物品名
    cost: number = 0;                        // 价格
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

export class YxUserItem {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_useritem 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的用户物品数组
     */
    async findYxUserItem(condition?: Partial<YxUserItemData>): Promise<YxUserItemData[]> {
        return this.db.find<YxUserItemData>('yx_useritem', condition);
    }

    /**
     * 新增 yx_useritem 数据
     * @param data 新增用户物品数据（不含id）
     * @returns 新增用户物品的id
     */
    async createYxUserItem(data: Omit<YxUserItemData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['name'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxUserItemData>('yx_useritem', data);
    }

    /**
     * 更新 yx_useritem 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxUserItem(data: Partial<Omit<YxUserItemData, 'id'>>, condition: Partial<YxUserItemData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxUserItemData>('yx_useritem', data, condition);
    }

    /**
     * 删除 yx_useritem 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxUserItem(condition: Partial<YxUserItemData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxUserItemData>('yx_useritem', condition);
    }
}
