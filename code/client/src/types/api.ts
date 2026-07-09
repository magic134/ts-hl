export interface LoginRequest {
    account: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: number;
        name: string;
        account_id: number;
    };
}

export interface UserInfoRequest {
    acc_id: number;
    user_id: number;
}

export interface UserVo {
    id: number;
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
    degree_lev: number;
    metempsychosis: number;
    deed: number;
    additional_point: number;
    pet_count: number;
    petused_id: number;
    skill_count: number;
    weapon_id: number;
    armor_id: number;
    shoes_id: number;
    account_id: number;
    hongli: number;
    toutaishu: number;
    love: number;
    qq: string;
    token: string;
}

export interface UserLeaderboardRow {
    rank: number;
    name: string;
    look: number;
    level: number;
    metempsychosis: number;
    toutai: number;
    degree_lev: number;
    money: number;
    hongli?: number;
    deed?: number;
    total_money?: number;
}

export interface PetLeaderboardRow {
    rank: number;
    owner_name: string;
    pet_name: string;
    class: number;
    className: string;
    level: number;
    grow: number;
    generation: number;
}

export interface MResponse<T> {
    code: number;
    data: T;
    msg: string;
}
