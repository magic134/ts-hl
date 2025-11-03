import { DbClient } from "./DbClient";

export class BallCardData {
    id: number;                             // 卡片ID（主键）
    card_id: string = '';                   // 卡片编号
    password: string = '';                  // 密码
    type: number = 1;                       // 类型
    enable: number = 1;                     // 启用状态
    server: number = 0;                     // 服务器
    bonus_action: number = 0;               // 奖励动作
    account_id: string = '';                // 账户ID
    use_date: string = '';                  // 使用日期
    txn_id: string = '0';                  // 交易ID
    ip: string = '';                        // IP地址
}

export class BallCard {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 ball_card 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的卡片数组
     */
    async findBallCard(condition?: Partial<BallCardData>): Promise<BallCardData[]> {
        return this.db.find<BallCardData>('ball_card', condition);
    }

    /**
     * 新增 ball_card 数据
     * @param data 新增卡片数据（不含id）
     * @returns 新增卡片的id
     */
    async createBallCard(data: Omit<BallCardData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['card_id', 'password'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<BallCardData>('ball_card', data);
    }

    /**
     * 更新 ball_card 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateBallCard(data: Partial<Omit<BallCardData, 'id'>>, condition: Partial<BallCardData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<BallCardData>('ball_card', data, condition);
    }

    /**
     * 删除 ball_card 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteBallCard(condition: Partial<BallCardData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<BallCardData>('ball_card', condition);
    }
}
