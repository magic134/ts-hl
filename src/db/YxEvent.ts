import { DbClient } from "./DbClient";

export class YxEventData {
    id: number;                             // 事件ID（主键）
    type: number = 0;                       // 事件类型
    data: number = 0;                        // 事件数据
    param: string = '';                      // 事件参数
}

export class YxEvent {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_event 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的事件数组
     */
    async findYxEvent(condition?: Partial<YxEventData>): Promise<YxEventData[]> {
        return this.db.find<YxEventData>('yx_event', condition);
    }

    /**
     * 新增 yx_event 数据
     * @param data 新增事件数据（不含id）
     * @returns 新增事件的id
     */
    async createYxEvent(data: Omit<YxEventData, 'id'>): Promise<number> {
        return this.db.create<YxEventData>('yx_event', data);
    }

    /**
     * 更新 yx_event 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxEvent(data: Partial<Omit<YxEventData, 'id'>>, condition: Partial<YxEventData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxEventData>('yx_event', data, condition);
    }

    /**
     * 删除 yx_event 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxEvent(condition: Partial<YxEventData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxEventData>('yx_event', condition);
    }
}
