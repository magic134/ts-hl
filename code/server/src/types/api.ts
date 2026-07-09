/**
 * 客户端请求/响应数据类型定义
 * 与 doc/Demo3.6/assets/script/entity/param/ 和 vo/ 下的接口保持一致
 */

export interface ReqLogin {
    account: string;
    password: string;
    /** 客户端接口保留字段，服务端登录逻辑不使用 */
    token?: string;
}

export interface ReqRegister {
    account: string;
    password: string;
    nickname: string;
    QQ: string;
}

export interface ReqUser {
    acc_id: number;
    user_id: number;
    token: string;
}

export interface UserVo {
    name: string;
    mate: string;
    monicker: string;
    look: number;
    face: number;
    life: number;
    power: number;
    money: number;
    money_saved: number;
    repute: number;
    level: number;
    exp: number;
    exp_smith: number;
    exp_creative: number;
    exp_medicine: number;
    exp_steal: number;
    physique: number;
    stamina: number;
    force: number;
    speed: number;
    degree: number;
    recordx: number;
    recordy: number;
    recordmap_id: number;
    metempsychosis: number;
    deed: number;
    additional_point: number;
    task_mask: number;
    pk_enable: number;
    home_id: number;
    syndicate_id: number;
    pet_count: number;
    petused_id: number;
    pet0_id: number;
    pet1_id: number;
    pet2_id: number;
    pet3_id: number;
    pet4_id: number;
    skill_count: number;
    skill0_id: number;
    skill1_id: number;
    skill2_id: number;
    skill3_id: number;
    skill4_id: number;
    skill5_id: number;
    skill6_id: number;
    skill7_id: number;
    skill8_id: number;
    skill9_id: number;
    skill10_id: number;
    weapon_id: number;
    armor_id: number;
    shoes_id: number;
    treasure0_id: number;
    treasure1_id: number;
    account_id: number;
    id: number;
    degree_lev: number;
    lockkey: number;
    intellect: number;
    quiz_point: number;
    coin_money: number;
    marriage: number;
    last_login: number;
    hongli: number;
    toutaishu: number;
    love: number;
    qq: string;
    token: string;
}

export interface PetRankBean {
    id: number;
    owner_name: string;
    prop: string;
    pet_origin_name: string;
    pet_name: string;
    grow_rate: string;
    grow_point: number;
    level: number;
    attack: number;
    defence: number;
    dexterity: number;
    life: number;
    generation: number;
    medal_attack: number;
    medal_defence: number;
    medal_dexterity: number;
    treasure_id: number;
    pet_treasure: string;
}
