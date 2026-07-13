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

export interface EquippedItem {
    id: number;
    name: string;
    cost: number;
    look: number;
    item_sort: number;
    level_required: number;
    life: number;
    power: number;
    attack: number;
    defence: number;
    dexterity: number;
    anti_poison: number;
    anti_freeze: number;
    anti_sleep: number;
    anti_chaos: number;
    inventer_name: string;
    id_action: number;
    exp: number;
    class: number;
    sacrifice: number;
    slot: "weapon" | "armor" | "shoes" | "treasure0" | "treasure1";
}

export interface BackpackItem {
    id: number;
    name: string;
    cost: number;
    look: number;
    item_sort: number;
    level_required: number;
    life: number;
    power: number;
    attack: number;
    defence: number;
    dexterity: number;
    anti_poison: number;
    anti_freeze: number;
    anti_sleep: number;
    anti_chaos: number;
    inventer_name: string;
    id_action: number;
    exp: number;
    class: number;
    sacrifice: number;
    isEquip: boolean;
}

export interface UserPet {
    id: number;
    name: string;
    look: number;
    attack: number;
    defence: number;
    dexterity: number;
    base_attack: number;
    base_defence: number;
    base_dexterity: number;
    level: number;
    exp: number;
    life: number;
    grow_rate: number;
    generation: number;
    posx: number;
    posy: number;
    sp_atk_count: number;
    sp_atk0: number;
    sp_atk1: number;
    sp_atk2: number;
    sp_atk3: number;
    sp_atk4: number;
    cap_lev: number;
    owner_id: number;
    treasure_id: number;
    medal_attack: number;
    medal_defence: number;
    medal_dexterity: number;
    base_life: number;
    max_life: number;
    class: number;
    fidelity: number;
    life_rise: number;
    attack_rate: number;
    defence_rate: number;
    dexterity_rate: number;
    state: number;
    hue0: number;
    saturation0: number;
    bright0: number;
    hue1: number;
    saturation1: number;
    bright1: number;
    hue2: number;
    saturation2: number;
    bright2: number;
    org_growrate: number;
    isActive: boolean;
}

export interface MResponse<T> {
    code: number;
    data: T;
    msg: string;
}

export interface QianKunDaiPetSlot {
    slot: number;
    pet: any | null;
}

export interface QianKunDaiBag {
    bagId: number;
    itemId: number;
    items: QianKunDaiPetSlot[];
}

export interface BaoBaoNangItemSlot {
    slot: number;
    item: any | null;
}

export interface BaoBaoNangBag {
    bagId: number;
    itemId: number;
    items: BaoBaoNangItemSlot[];
}
