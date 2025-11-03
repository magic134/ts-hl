import { DbClient } from "./DbClient";

export class YxGoodFriendData {
    userid: number = 0;                      // 用户ID（主键）
    friendcount: number = 0;                 // 好友数量
    friend0: number = 0;                     // 好友0
    friend1: number = 0;                     // 好友1
    friend2: number = 0;                     // 好友2
    friend3: number = 0;                     // 好友3
    friend4: number = 0;                     // 好友4
    friend5: number = 0;                     // 好友5
    friend6: number = 0;                     // 好友6
    friend7: number = 0;                     // 好友7
    friend8: number = 0;                     // 好友8
    friend9: number = 0;                     // 好友9
    friend10: number = 0;                    // 好友10
    friend11: number = 0;                    // 好友11
    friend12: number = 0;                    // 好友12
    friend13: number = 0;                    // 好友13
    friend14: number = 0;                    // 好友14
    friend15: number = 0;                    // 好友15
    friend16: number = 0;                    // 好友16
    friend17: number = 0;                    // 好友17
    friend18: number = 0;                    // 好友18
    friend19: number = 0;                    // 好友19
    friendname0: string = '';                // 好友名0
    friendname1: string = '';                // 好友名1
    friendname2: string = '';                // 好友名2
    friendname3: string = '';                // 好友名3
    friendname4: string = '';                // 好友名4
    friendname5: string = '';                // 好友名5
    friendname6: string = '';                // 好友名6
    friendname7: string = '';                // 好友名7
    friendname8: string = '';                // 好友名8
    friendname9: string = '';                // 好友名9
    friendname10: string = '';               // 好友名10
    friendname11: string = '';               // 好友名11
    friendname12: string = '';               // 好友名12
    friendname13: string = '';               // 好友名13
    friendname14: string = '';               // 好友名14
    friendname15: string = '';               // 好友名15
    friendname16: string = '';               // 好友名16
    friendname17: string = '';               // 好友名17
    friendname18: string = '';               // 好友名18
    friendname19: string = '';               // 好友名19
    // 注意：由于好友表字段很多，这里只列出主要字段
    // 实际使用时需要根据完整的SQL结构补充所有字段
}

export class YxGoodFriend {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_goodfriend 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的好友数组
     */
    async findYxGoodFriend(condition?: Partial<YxGoodFriendData>): Promise<YxGoodFriendData[]> {
        return this.db.find<YxGoodFriendData>('yx_goodfriend', condition);
    }

    /**
     * 新增 yx_goodfriend 数据
     * @param data 新增好友数据（不含userid）
     * @returns 新增好友数据的userid
     */
    async createYxGoodFriend(data: Omit<YxGoodFriendData, 'userid'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['userid'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxGoodFriendData>('yx_goodfriend', data);
    }

    /**
     * 更新 yx_goodfriend 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxGoodFriend(data: Partial<Omit<YxGoodFriendData, 'userid'>>, condition: Partial<YxGoodFriendData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxGoodFriendData>('yx_goodfriend', data, condition);
    }

    /**
     * 删除 yx_goodfriend 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxGoodFriend(condition: Partial<YxGoodFriendData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxGoodFriendData>('yx_goodfriend', condition);
    }
}
