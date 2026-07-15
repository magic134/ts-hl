export interface QueryConfig {
    sql: string;
    description: string;
}

export const QUERIES: Record<string, QueryConfig> = {
    // 通用 CRUD
    DB_FIND: {
        sql: "SELECT * FROM {{table}}",
        description: "根据可选条件查询表数据"
    },
    DB_CREATE: {
        sql: "INSERT INTO {{table}} ({{columns}}) VALUES ({{placeholders}})",
        description: "向指定表插入一条数据"
    },
    DB_UPDATE: {
        sql: "UPDATE {{table}} SET {{set}} WHERE {{where}}",
        description: "根据条件更新指定表数据"
    },
    DB_DELETE: {
        sql: "DELETE FROM {{table}} WHERE {{where}}",
        description: "根据条件删除指定表数据"
    },

    // Auth
    AUTH_FETCH_QQ: {
        sql: "SELECT ip_mask FROM account WHERE id = ?",
        description: "根据 account.id 获取 ip_mask（作为 QQ 使用）"
    },

    // 百宝囊
    BAOBAONANG_FIND_STORAGE: {
        sql: "SELECT * FROM yx_storage WHERE id_user IN ({{placeholders}}) AND type = ?",
        description: "根据 yx_item.id 列表查询百宝囊（type=6）storage 记录"
    },
    BAOBAONANG_FIND_USERITEMS: {
        sql: "SELECT * FROM yx_useritem WHERE id IN ({{placeholders}})",
        description: "根据槽位 id 列表查询 yx_useritem 数据"
    },

    // 乾坤袋
    QIANKUNDAI_FIND_STORAGE: {
        sql: "SELECT * FROM yx_storage WHERE id_user IN ({{placeholders}}) AND type = ?",
        description: "根据 yx_item.id 列表查询乾坤袋（type=5）storage 记录"
    },
    QIANKUNDAI_FIND_PETS: {
        sql: "SELECT * FROM yx_pet WHERE id IN ({{placeholders}})",
        description: "根据槽位 id 列表查询 yx_pet 数据"
    },

    // 当铺
    DANGPU_FIND_STORAGE: {
        sql: "SELECT * FROM yx_storage WHERE id_user = ? AND type = 4",
        description: "根据 yx_user.id 查询当铺（type=4）storage 记录"
    },
    DANGPU_FIND_USERITEMS: {
        sql: "SELECT * FROM yx_useritem WHERE id IN ({{placeholders}})",
        description: "根据槽位 id 列表查询 yx_useritem 数据"
    },

    // 宠物店
    PETSHOP_FIND_STORAGE: {
        sql: "SELECT * FROM yx_storage WHERE id_user = ? AND type = 1",
        description: "根据 yx_user.id 查询宠物店（type=1）storage 记录"
    },
    PETSHOP_FIND_PETS: {
        sql: "SELECT * FROM yx_pet WHERE id IN ({{placeholders}})",
        description: "根据槽位 id 列表查询 yx_pet 数据"
    },

    // 储物柜
    CHUWUGUI_FIND_PLAYERNPC: {
        sql: "SELECT id FROM yx_playernpc WHERE owner_id = ? AND type = 201",
        description: "根据 yx_user.id 查询该玩家的储物柜房子 NPC id"
    },
    CHUWUGUI_FIND_STORAGE: {
        sql: "SELECT * FROM yx_storage WHERE id_map IN ({{placeholders}}) AND type = 2",
        description: "根据 yx_playernpc.id 列表查询储物柜（type=2）storage 记录"
    },
    CHUWUGUI_FIND_USERITEMS: {
        sql: "SELECT * FROM yx_useritem WHERE id IN ({{placeholders}})",
        description: "根据槽位 id 列表查询 yx_useritem 数据"
    },

    // 帮派
    GANG_FIND_SYNMEMBER: {
        sql: "SELECT owner_id FROM yx_synmember WHERE id = ? AND rank >= 90",
        description: "根据 yx_user.id 查询其所属帮派且职位 rank >= 90"
    },
    GANG_CHECK_MEMBER: {
        sql: "SELECT 1 FROM yx_synmember WHERE id = ? AND rank >= 90 LIMIT 1",
        description: "判断玩家是否有所属帮派且职位 rank >= 90"
    },

    // 帮派箱子
    GANG_XIANGZI_FIND_PLAYERNPC: {
        sql: "SELECT id FROM yx_playernpc WHERE owner_id = ? AND type = 201",
        description: "根据帮派 id 查询帮派箱子 NPC id"
    },
    GANG_XIANGZI_FIND_STORAGE: {
        sql: "SELECT * FROM yx_storage WHERE id_map IN ({{placeholders}}) AND type = 2",
        description: "根据帮派箱子 NPC id 列表查询 storage（type=2）记录"
    },
    GANG_XIANGZI_FIND_USERITEMS: {
        sql: "SELECT * FROM yx_useritem WHERE id IN ({{placeholders}})",
        description: "根据槽位 id 列表查询 yx_useritem 数据"
    },

    // 帮派驯兽师
    GANG_XUNSHOUSHI_FIND_PLAYERNPC: {
        sql: "SELECT id FROM yx_playernpc WHERE owner_id = ? AND type = 202",
        description: "根据帮派 id 查询帮派驯兽师 NPC id"
    },
    GANG_XUNSHOUSHI_FIND_STORAGE: {
        sql: "SELECT * FROM yx_storage WHERE id_map IN ({{placeholders}}) AND type = 3",
        description: "根据帮派驯兽师 NPC id 列表查询 storage（type=3）记录"
    },
    GANG_XUNSHOUSHI_FIND_PETS: {
        sql: "SELECT * FROM yx_pet WHERE id IN ({{placeholders}})",
        description: "根据槽位 id 列表查询 yx_pet 数据"
    },

    // 玩家物品
    USER_ITEM_FIND_EQUIPPED: {
        sql: `
            SELECT
                i.*,
                CASE i.id
                    WHEN u.weapon_id THEN 'weapon'
                    WHEN u.armor_id THEN 'armor'
                    WHEN u.shoes_id THEN 'shoes'
                    WHEN u.treasure0_id THEN 'treasure0'
                    WHEN u.treasure1_id THEN 'treasure1'
                END AS slot
            FROM yx_item i, yx_user u
            WHERE u.id = ?
              AND i.id IN (u.weapon_id, u.armor_id, u.shoes_id, u.treasure0_id, u.treasure1_id)
            ORDER BY i.id
        `,
        description: "查询玩家当前穿戴的装备，并标记装备部位"
    },
    USER_ITEM_FIND_BACKPACK: {
        sql: `
            SELECT i.*
            FROM yx_item i, yx_user u
            WHERE u.id = ?
              AND TRIM(LEADING '0' FROM SUBSTRING(LEFT(i.id, LENGTH(i.id) - 2), 2)) + 0 = u.id
              AND i.id NOT IN (u.weapon_id, u.armor_id, u.shoes_id, u.treasure0_id, u.treasure1_id)
            ORDER BY i.id
        `,
        description: "查询玩家背包物品（排除身上穿戴的装备），通过 yx_item.id 解码归属用户"
    },

    // 玩家宠物
    USER_PET_FIND_PETS: {
        sql: `
            SELECT
                p.*,
                CASE WHEN p.id = u.petused_id THEN 1 ELSE 0 END AS is_active
            FROM yx_user u, yx_pet p
            WHERE u.id = ?
              AND p.id IN (u.pet0_id, u.pet1_id, u.pet2_id, u.pet3_id, u.pet4_id)
            ORDER BY p.id
        `,
        description: "查询玩家宠物列表，并标记当前出征宠物"
    },

    // 人物排行榜
    USER_RANK_FIND: {
        sql: `
            SELECT u.*, a.ip_mask AS qq
            FROM yx_user u
            LEFT JOIN account a ON u.account_id = a.id
            ORDER BY u.{{sortColumn}} DESC
            LIMIT 100
        `,
        description: "按指定排序列查询人物排行榜前 100 名"
    },

    // WWW 风格人物排行榜
    USER_LEADERBOARD_FIND_HONGLI: {
        sql: `
            SELECT
                name,
                FLOOR(level) AS level,
                metempsychosis,
                look,
                degree_lev,
                money,
                FLOOR((metempsychosis % 1000) / 10) AS toutai,
                FLOOR(additional_point / 100000) AS hongli
            FROM yx_user
            WHERE account_id BETWEEN 1 AND 9999
            ORDER BY hongli DESC, degree_lev DESC
            LIMIT 100
        `,
        description: "查询人物红利排行榜前 100 名"
    },
    USER_LEADERBOARD_FIND_DEED: {
        sql: `
            SELECT
                name,
                FLOOR(level) AS level,
                metempsychosis,
                look,
                degree_lev,
                deed,
                money,
                FLOOR((metempsychosis % 1000) / 10) AS toutai,
                FLOOR(additional_point / 100000) AS hongli
            FROM yx_user
            WHERE account_id BETWEEN 1 AND 9999
            ORDER BY deed DESC
            LIMIT 100
        `,
        description: "查询人物功德排行榜前 100 名"
    },
    USER_LEADERBOARD_FIND_MONEY: {
        sql: `
            SELECT
                name,
                FLOOR(level) AS level,
                metempsychosis,
                look,
                degree_lev,
                money,
                money_saved,
                (money + money_saved) AS total_money,
                FLOOR((metempsychosis % 1000) / 10) AS toutai,
                FLOOR(additional_point / 100000) AS hongli
            FROM yx_user
            WHERE account_id BETWEEN 1 AND 9999
            ORDER BY total_money DESC
            LIMIT 100
        `,
        description: "查询人物幻币排行榜前 100 名"
    },

    // 宠物等级排行榜
    PET_RANK_FIND: {
        sql: `
            SELECT
                p.id,
                u.name AS owner_name,
                p.name AS pet_origin_name,
                p.name AS pet_name,
                p.grow_rate,
                p.grow_rate AS grow_point,
                p.level,
                p.attack,
                p.defence,
                p.dexterity,
                p.life,
                p.generation,
                p.medal_attack,
                p.medal_defence,
                p.medal_dexterity,
                p.treasure_id
            FROM yx_pet p
            LEFT JOIN yx_user u ON p.owner_id = u.id
            {{whereSql}}
            ORDER BY p.level DESC, p.grow_rate DESC
            LIMIT 100
        `,
        description: "根据属性/进化条件查询宠物等级排行榜前 100 名"
    },

    // 宠物 WWW 排行榜
    PET_LEADERBOARD_FIND: {
        sql: `
            SELECT
                p.class,
                p.name AS pet_name,
                p.attack,
                p.defence,
                p.dexterity,
                p.base_attack,
                p.base_defence,
                p.base_dexterity,
                FLOOR(p.generation) AS generation,
                p.grow_rate,
                FLOOR(p.level) AS level,
                p.max_life,
                (p.attack + p.defence + p.dexterity - p.base_attack - p.base_defence - p.base_dexterity) / (p.level - 1) AS grow,
                u.name AS owner_name,
                m.name AS monster_name
            FROM yx_pet p
            LEFT JOIN yx_user u ON p.owner_id = u.id
            LEFT JOIN yx_monster m ON p.class = m.class
            WHERE p.level > 1 AND {{classFilter}}
            ORDER BY grow DESC
            LIMIT 100
        `,
        description: "查询宠物成长排行榜前 100 名，可按是否进化过滤"
    },

    // 快照查询
    SNAPSHOT_USER_INFO_FIND: {
        sql: "SELECT * FROM sync_user_full WHERE id = ? ORDER BY snapshot_time DESC LIMIT 1",
        description: "从目标库查询最新的角色完整信息快照"
    },
    SNAPSHOT_USER_RANK_FIND: {
        sql: "SELECT * FROM sync_user_rank WHERE rank_type = ? ORDER BY rank ASC",
        description: "从目标库查询人物通用排行榜快照"
    },
    SNAPSHOT_USER_LEADERBOARD_FIND: {
        sql: "SELECT * FROM sync_user_leaderboard WHERE type = ? ORDER BY rank ASC",
        description: "从目标库查询 WWW 风格人物排行榜快照"
    },
    SNAPSHOT_PET_RANK_FIND: {
        sql: "SELECT * FROM sync_pet_rank WHERE filter_catena = ? AND filter_is_evolution = ? ORDER BY rank ASC",
        description: "从目标库查询宠物等级排行榜快照"
    },
    SNAPSHOT_PET_LEADERBOARD_FIND: {
        sql: "SELECT * FROM sync_pet_leaderboard WHERE type = ? ORDER BY rank ASC",
        description: "从目标库查询宠物 WWW 排行榜快照"
    },

    // 同步任务
    SYNC_USER_RANK_TRUNCATE: {
        sql: "TRUNCATE TABLE sync_user_rank",
        description: "清空人物通用排行榜快照表"
    },
    SYNC_USER_LEADERBOARD_TRUNCATE: {
        sql: "TRUNCATE TABLE sync_user_leaderboard",
        description: "清空 WWW 风格人物排行榜快照表"
    },
    SYNC_PET_RANK_TRUNCATE: {
        sql: "TRUNCATE TABLE sync_pet_rank",
        description: "清空宠物等级排行榜快照表"
    },
    SYNC_PET_LEADERBOARD_TRUNCATE: {
        sql: "TRUNCATE TABLE sync_pet_leaderboard",
        description: "清空宠物 WWW 排行榜快照表"
    },
    SYNC_USER_FULL_SELECT: {
        sql: "SELECT * FROM yx_user",
        description: "从源库读取全部 yx_user 角色信息"
    },
    SYNC_USER_FULL_DELETE: {
        sql: "DELETE FROM sync_user_full",
        description: "清空角色完整信息快照表"
    }
};
