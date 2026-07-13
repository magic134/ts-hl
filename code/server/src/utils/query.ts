import { QUERIES } from "../config/queries";

/**
 * 根据 key 获取 SQL 配置中的 SQL 字符串
 * @param key QUERIES 中的键
 */
export function getQuery(key: string): string {
    const config = QUERIES[key];
    if (!config) {
        throw new Error(`未找到 SQL 配置: ${key}`);
    }
    return config.sql;
}

/**
 * 获取 SQL 配置（包含 SQL 和描述）
 * @param key QUERIES 中的键
 */
export function getQueryConfig(key: string) {
    const config = QUERIES[key];
    if (!config) {
        throw new Error(`未找到 SQL 配置: ${key}`);
    }
    return config;
}

/**
 * 格式化 SQL，替换 {{token}} 占位符
 * @param key QUERIES 中的键
 * @param tokens token 替换映射
 */
export function formatQuery(key: string, tokens: Record<string, string>): string {
    let sql = getQuery(key);
    for (const [token, value] of Object.entries(tokens)) {
        sql = sql.split(`{{${token}}}`).join(value);
    }
    return sql;
}
