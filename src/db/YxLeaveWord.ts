import { DbClient } from "./DbClient";

export class YxLeaveWordData {
    id: number;                             // 留言ID（主键）
    user_id: number = 0;                    // 用户ID
    send_name: string = '未知';              // 发送者名称
    time: string = '00000000000000';         // 时间
    words: string = '无内容';               // 留言内容
}

export class YxLeaveWord {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_leaveword 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的留言数组
     */
    async findYxLeaveWord(condition?: Partial<YxLeaveWordData>): Promise<YxLeaveWordData[]> {
        return this.db.find<YxLeaveWordData>('yx_leaveword', condition);
    }

    /**
     * 新增 yx_leaveword 数据
     * @param data 新增留言数据（不含id）
     * @returns 新增留言的id
     */
    async createYxLeaveWord(data: Omit<YxLeaveWordData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['user_id', 'send_name', 'words'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxLeaveWordData>('yx_leaveword', data);
    }

    /**
     * 更新 yx_leaveword 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxLeaveWord(data: Partial<Omit<YxLeaveWordData, 'id'>>, condition: Partial<YxLeaveWordData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxLeaveWordData>('yx_leaveword', data, condition);
    }

    /**
     * 删除 yx_leaveword 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxLeaveWord(condition: Partial<YxLeaveWordData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxLeaveWordData>('yx_leaveword', condition);
    }
}
