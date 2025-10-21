import { DbClient } from "./DbClient";
export class YxUserData {
    id: number;                             // 主键
    name: string = '名字';                  // 角色名
    mate: string = '无';                    // 配偶
    monicker: string = '心动';              // 称号
    look: number = 0;                       // 外观
    face: number = 1;                       // 头像
    life: number = 30;                      // 生命值
    power: number = 20;                     // 力量
    money: number = 100;                    // 金钱
    money_saved: number = 0;                // 存款
    repute: number = 0;                     // 声望
    level: number = 1;                      // 等级
    exp: number = 0;                        // 经验
    exp_smith: number = 0;                  // 锻造经验
    exp_creative: number = 0;               // 创造经验
    exp_medicine: number = 0;               // 制药经验
    exp_steal: number = 0;                  // 偷窃经验
    physique: number = 1;                   // 体质
    stamina: number = 11;                   // 耐力
    force: number = 7;                      // 武力
    speed: number = 5;                      // 速度
    degree: number = 1;                     // 熟练度
    recordx: number = 12;                   // X坐标
    recordy: number = 15;                   // Y坐标
    recordmap_id: number = 140000;          // 地图ID
    metempsychosis: number = 0;             // 轮回次数
    deed: number = 0;                       // 事迹
    additional_point: number = 0;           // 额外点数
    task_mask: number = 0;                  // 任务掩码
    pk_enable: number = 0;                  // PK开关
    home_id: number = 0;                    // 家园ID
    syndicate_id: number = 0;               // 公会ID
    pet_count: number = 1;                  // 宠物数量
    petused_id: number = 1;                 // 当前使用宠物ID
    pet0_id: number = 1;                    // 宠物0ID
    pet1_id: number = 0;                    // 宠物1ID
    pet2_id: number = 0;                    // 宠物2ID
    pet3_id: number = 0;                    // 宠物3ID
    pet4_id: number = 0;                    // 宠物4ID
    skill_count: number = 0;                // 技能数量
    skill0_id: number = 0;                  // 技能0ID
    skill1_id: number = 0;                  // 技能1ID
    skill2_id: number = 0;                  // 技能2ID
    skill3_id: number = 0;                  // 技能3ID
    skill4_id: number = 0;                  // 技能4ID
    skill5_id: number = 0;                  // 技能5ID
    skill6_id: number = 0;                  // 技能6ID
    skill7_id: number = 0;                  // 技能7ID
    skill8_id: number = 0;                  // 技能8ID
    skill9_id: number = 0;                  // 技能9ID
    skill10_id: number = 0;                 // 技能10ID
    weapon_id: number = 0;                  // 武器ID
    armor_id: number = 0;                   // 盔甲ID
    shoes_id: number = 0;                   // 鞋子ID
    treasure0_id: number = 0;               // 宝物0ID
    treasure1_id: number = 0;               // 宝物1ID
    account_id: number = 1;                 // 账号ID
    degree_lev: number = 0;                 // 熟练度等级
    lockkey: number = 0;                    // 锁钥
    intellect: number = 0;                  // 智力
    quiz_point: number = 0;                 // 答题积分
    coin_money: number = 0;                 // 代币
    marriage: number | null = null;         // 婚姻状态（可能为NULL）
    last_login: number = 20200507           // 最后登录时间（可能为NULL，格式如20200507）
}

// 1. 定义 yx_user 表的类型接口（完全匹配字段）
export class YxUser {

    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_user 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的用户数组
     */
    async findYxUser(condition?: Partial<YxUserData>): Promise<YxUserData[]> {
        return this.db.find<YxUserData>('yx_user', condition);
    }

    /**
     * 新增 yx_user 数据
     * @param data 新增用户数据（不含id）
     * @returns 新增用户的id
     */
    async createYxUser(data: Omit<YxUserData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['name', 'account_id', 'level'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxUserData>('yx_user', data);
    }

    /**
     * 更新 yx_user 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxUser(data: Partial<Omit<YxUserData, 'id'>>, condition: Partial<YxUserData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxUserData>('yx_user', data, condition);
    }

    /**
     * 删除 yx_user 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxUser(condition: Partial<YxUserData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxUserData>('yx_user', condition);
    }
}

