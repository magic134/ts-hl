import { DbClient } from "./DbClient";

export class YxTaskData {
    taskid: number = 0;                     // 任务ID
    tasktype: number = 0;                   // 任务类型
    npcid: number = 0;                      // NPC ID
    trigerwords: string = '';               // 触发词
    accepttaskwords: string = '';           // 接受任务词
    refucetaskwords: string = '';          // 拒绝任务词
    itemname1: string = '';                 // 物品名1
    iteminventer1: string = '';             // 物品发明者1
    itemname2: string = '';                 // 物品名2
    iteminventer2: string = '';             // 物品发明者2
    toplevel: number = 0;                   // 最高等级
    lowlevel: number = 0;                    // 最低等级
    toprepute: number = 0;                   // 最高声望
    lowrepute: number = 0;                  // 最低声望
    lowrealrepute: number = 0;              // 最低真实声望
    lowphysique: number = 0;                 // 最低体质
    lowforce: number = 0;                    // 最低武力
    lowstamina: number = 0;                 // 最低耐力
    lowspeed: number = 0;                    // 最低速度
    lowdegree: number = 0;                   // 最低熟练度
    marriage: number = 0;                    // 婚姻状态
    team: number = 0;                        // 队伍
    syndicate: number = 0;                   // 公会
    syndicatedegree: number = 0;             // 公会等级
    idnext0: number = 0;                     // 下一个任务ID0
    idnext1: number = 0;                     // 下一个任务ID1
    // 注意：由于任务表字段很多，这里只列出主要字段
    // 实际使用时需要根据完整的SQL结构补充所有字段
}

export class YxTask {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_task 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的任务数组
     */
    async findYxTask(condition?: Partial<YxTaskData>): Promise<YxTaskData[]> {
        return this.db.find<YxTaskData>('yx_task', condition);
    }

    /**
     * 新增 yx_task 数据
     * @param data 新增任务数据（不含id）
     * @returns 新增任务的id
     */
    async createYxTask(data:YxTaskData): Promise<number> {
        // 校验必填字段
        const requiredFields = ['taskid'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxTaskData>('yx_task', data);
    }

    /**
     * 更新 yx_task 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxTask(data: Partial<Omit<YxTaskData, 'taskid'>>, condition: Partial<YxTaskData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxTaskData>('yx_task', data, condition);
    }

    /**
     * 删除 yx_task 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxTask(condition: Partial<YxTaskData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxTaskData>('yx_task', condition);
    }
}
