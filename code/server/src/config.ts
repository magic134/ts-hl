export const PORT = process.env.PORT || 8081;
export const JWT_SECRET = process.env.JWT_SECRET || "hlyx-dev-secret";

/** 宠物属性（catena）映射 */
export const PROP_MAP: Record<string, string> = {
    "2": "水",
    "3": "火",
    "4": "金",
    "5": "木",
    "6": "土",
    "7": "无属性"
};

/** 人物排行榜类型映射 */
export const RANK_TYPE_MAP: Record<string, { title: string; column: string; note?: string }> = {
    "0": { title: "人物红利排行榜", column: "additional_point" },
    "2": { title: "人物修为排行榜", column: "degree_lev" },
    "3": { title: "人物金钱排行榜", column: "money" },
    "4": { title: "人物爱心排行榜", column: "id", note: "数据库暂无 love 字段，临时按 id 排序" },
    "5": { title: "人物功德排行榜", column: "deed" },
    "6": { title: "人物养宠排行榜", column: "exp_medicine" },
    "7": { title: "人物创招排行榜", column: "exp_creative" },
    "8": { title: "人物声望排行榜", column: "repute" },
    "9": { title: "人物炼化排行榜", column: "exp_smith" },
    "10": { title: "人物偷窃排行榜", column: "exp_steal" }
};

/** 数据同步总开关 */
export const SYNC_ENABLED = process.env.SYNC_ENABLED !== "false";

/** 排行榜数据同步间隔，默认 5 分钟 */
export const LEADERBOARD_SYNC_INTERVAL_MS = Number(
    process.env.LEADERBOARD_SYNC_INTERVAL_MS || 5 * 60 * 1000
);

/** 角色完整信息同步间隔，默认 1 分钟 */
export const USER_SYNC_INTERVAL_MS = Number(
    process.env.USER_SYNC_INTERVAL_MS || 60 * 1000
);

/** 宠物等级排行榜快照过滤组合，覆盖 findPetRank 常见参数 */
export const PET_RANK_FILTERS: { catena: string; isEvolution: string }[] = [
    { catena: "", isEvolution: "" },
    { catena: "", isEvolution: "1" },
    { catena: "", isEvolution: "0" },
    { catena: "2", isEvolution: "" },
    { catena: "2", isEvolution: "1" },
    { catena: "2", isEvolution: "0" },
    { catena: "3", isEvolution: "" },
    { catena: "3", isEvolution: "1" },
    { catena: "3", isEvolution: "0" },
    { catena: "4", isEvolution: "" },
    { catena: "4", isEvolution: "1" },
    { catena: "4", isEvolution: "0" },
    { catena: "5", isEvolution: "" },
    { catena: "5", isEvolution: "1" },
    { catena: "5", isEvolution: "0" },
    { catena: "6", isEvolution: "" },
    { catena: "6", isEvolution: "1" },
    { catena: "6", isEvolution: "0" },
    { catena: "7", isEvolution: "" },
    { catena: "7", isEvolution: "1" },
    { catena: "7", isEvolution: "0" },
];
