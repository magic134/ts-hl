import { DbClient } from "./DbClient";

export class YxSynMemberData {
    id: number = 0;                         // 成员ID（主键）
    name: string = '';                      // 成员名称
    rank: number = 0;                       // 等级
    priv: number = 0;                       // 权限
    title: string = '';                     // 称号
    owner_id: number = 0;                   // 拥有者ID
    sub_id: number = 0;                     // 子ID
    intro_id: number = 0;                   // 介绍人ID
    intro_name: string = '';                // 介绍人名称
    offer_money: number = 0;                // 贡献金钱
    offer_intro: number = 0;                // 贡献介绍
    offer_fight: number = 0;                // 贡献战斗
    offer_build: number = 0;                // 贡献建设
    offer_intro_newly: number = 0;          // 新介绍贡献
    del_flag: number = 0;                   // 删除标志
    fealty: string = '无';                  // 忠诚
}

export class YxSynMember {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_synmember 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的公会成员数组
     */
    async findYxSynMember(condition?: Partial<YxSynMemberData>): Promise<YxSynMemberData[]> {
        return this.db.find<YxSynMemberData>('yx_synmember', condition);
    }

    /**
     * 新增 yx_synmember 数据
     * @param data 新增公会成员数据（不含id）
     * @returns 新增公会成员的id
     */
    async createYxSynMember(data: Omit<YxSynMemberData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['name', 'owner_id'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxSynMemberData>('yx_synmember', data);
    }

    /**
     * 更新 yx_synmember 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxSynMember(data: Partial<Omit<YxSynMemberData, 'id'>>, condition: Partial<YxSynMemberData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxSynMemberData>('yx_synmember', data, condition);
    }

    /**
     * 删除 yx_synmember 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxSynMember(condition: Partial<YxSynMemberData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxSynMemberData>('yx_synmember', condition);
    }
}
