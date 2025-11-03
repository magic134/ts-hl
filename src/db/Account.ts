import { DbClient } from "./DbClient";

export class AccountData {
    id: number;                             // 账户ID（主键）
    name: string = '';                      // 账户名称
    password: string = '';                  // 密码
    type: number = 2;                       // 类型
    point: number = 100000;                 // 点数
    pointtime: number = 23001231;           // 点数时间
    online: number = 0;                     // 在线状态
    licence: number = 0;                    // 许可证
    netbar_ip: string = '127.0.0.1';       // 网吧IP
    ip_mask: string = '255.255.255.255';   // IP掩码
    reg_date: string = '';                  // 注册日期
    reg_flag: number = 3;                   // 注册标志
}

export class Account {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 account 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的账户数组
     */
    async findAccount(condition?: Partial<AccountData>): Promise<AccountData[]> {
        return this.db.find<AccountData>('account', condition);
    }

    /**
     * 新增 account 数据
     * @param data 新增账户数据（不含id）
     * @returns 新增账户的id
     */
    async createAccount(data: Omit<AccountData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['name', 'password'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<AccountData>('account', data);
    }

    /**
     * 更新 account 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateAccount(data: Partial<Omit<AccountData, 'id'>>, condition: Partial<AccountData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<AccountData>('account', data, condition);
    }

    /**
     * 删除 account 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteAccount(condition: Partial<AccountData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<AccountData>('account', condition);
    }
}
