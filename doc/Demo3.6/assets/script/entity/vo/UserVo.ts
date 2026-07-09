export interface UserVo {
    /** 姓名 */
    name: string;
    /** 配偶 */
    mate: string;
    /** 绰号 */
    monicker: string;
    /** 人物形象 */
    look: number;
    /** face */
    face: number;
    /** 当前生命 */
    life: number;
    /** 当前内力 */
    power: number;
    /** 金钱 */
    money: number;
    /** 存款 */
    money_saved: number;
    /** 声望 */
    repute: number;
    /** 当前等级 */
    level: number;
    /** 当前经验 */
    exp: number;
    /** 炼化经验 */
    exp_smith: number;
    /** 创招经验 */
    exp_creative: number;
    /** 养宠经验 */
    exp_medicine: number;
    /** 偷窃经验 */
    exp_steal: number;
    /** 体力 */
    physique: number;
    /** 防御 */
    stamina: number;
    /** 攻击 */
    force: number;
    /** 轻功 */
    speed: number;
    /** 内功 */
    degree: number;
    /** 记录点坐标X */
    recordx: number;
    /** 记录点坐标Y */
    recordy: number;
    /** 记录点地图 */
    recordmap_id: number;
    /** 五转称号 */
    metempsychosis: number;
    /** 功德 */
    deed: number;
    /** 剩余点数 */
    additional_point: number;
    /** task_mask */
    task_mask: number;
    /** 是否入江湖，入江湖1 */
    pk_enable: number;
    /** 房子ID */
    home_id: number;
    /** 帮派ID */
    syndicate_id: number;
    /** 宠物数量 */
    pet_count: number;
    /** 出征宠物ID */
    petused_id: number;
    /** 宠物ID 1 */
    pet0_id: number;
    /** 宠物ID 2 */
    pet1_id: number;
    /** 宠物ID 3 */
    pet2_id: number;
    /** 宠物ID 4 */
    pet3_id: number;
    /** 宠物ID 5 */
    pet4_id: number;
    /** 当前武功数量 */
    skill_count: number;
    /** 武功ID 1 */
    skill0_id: number;
    /** 武功ID 2 */
    skill1_id: number;
    /** 武功ID 3 */
    skill2_id: number;
    /** 武功ID 4 */
    skill3_id: number;
    /** 武功ID 5 */
    skill4_id: number;
    /** 武功ID 6 */
    skill5_id: number;
    /** 武功ID 7 */
    skill6_id: number;
    /** 武功ID 8 */
    skill7_id: number;
    /** 武功ID 9 */
    skill8_id: number;
    /** 武功ID 9 */
    skill9_id: number;
    /** 武功ID 10 */
    skill10_id: number;
    /** 武器ID */
    weapon_id: number;
    /** 衣服ID */
    armor_id: number;
    /** 鞋子ID */
    shoes_id: number;
    /** 左饰ID */
    treasure0_id: number;
    /** 右饰ID */
    treasure1_id: number;
    /** 账号ID */
    account_id: number;
    /** 玩家ID */
    id: number;
    /** 修为 */
    degree_lev: number;
    /** 密码锁 */
    lockkey: number;
    /** 答题智力 */
    intellect: number;
    /** 测试点 */
    quiz_point: number;
    /** 元宝 */
    coin_money: number;
    /** 结婚 */
    marriage: number;
    /** 最后登录时间 */
    last_login: number;

    /** 红利 */
    hongli: number;
    /** 投胎数 */
    toutaishu: number;
    /** 爱心 */
    love: number;

    qq: string;
    token: string;

}