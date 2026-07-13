import mysql from 'mysql';
import { formatQuery } from "../utils/query";

// 目标数据库配置（同步写入用），请根据实际环境修改
const TARGET_DB_CONFIG = {
    host: '43.136.28.68',
    user: 'root',
    password: 'Zhang3@li4',
    database: 'hl_rank',
    port: 3306,
    insecureAuth: true,
    connectTimeout: 10000,
    charset: 'gbk', // 与数据库字段编码一致
    flags: ['NO_CHARSET_CONVERSION'] // 禁用模块的自动编码转换
};

/**
 * 目标库数据库客户端，API 与 DbClient 完全一致
 */
export class TargetDbClient {
    connection: mysql.Connection;

    constructor() {
        this.connection = mysql.createConnection({
            ...TARGET_DB_CONFIG,
        });
    }

    // 连接数据库
    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) {
                    reject(new Error(`目标库连接失败: ${err.message}`));
                    return;
                }
                resolve();
            });
        });
    }

    // 关闭连接
    close(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) {
                    reject(new Error(`目标库关闭连接失败: ${err.message}`));
                    return;
                }
                resolve();
            });
        });
    }

    // ------------------------------ 通用 CRUD 方法 ------------------------------
    async find<T>(table: string, condition?: Partial<T>): Promise<T[]> {
        let sql = formatQuery("DB_FIND", { table });
        const params: any[] = [];

        if (condition) {
            const keys = Object.keys(condition);
            if (keys.length > 0) {
                sql += ` WHERE ${keys.map(key => `${key} = ?`).join(' AND ')}`;
                params.push(...Object.values(condition));
            }
        }

        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, results) => {
                if (err) {
                    reject(new Error(`目标库查询失败: ${err.message}`));
                    return;
                }
                resolve(results as T[]);
            });
        });
    }

    async create<T>(table: string, data: Omit<T, 'id'>): Promise<number> {
        const keys = Object.keys(data);
        const placeholders = keys.map(() => '?').join(', ');
        const sql = formatQuery("DB_CREATE", { table, columns: keys.join(', '), placeholders });
        const params = Object.values(data);
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, result: mysql.OkPacket) => {
                if (err) {
                    reject(new Error(`目标库新增失败: ${err.message}`));
                    return;
                }
                resolve(result.insertId);
            });
        });
    }

    async update<T>(table: string, data: Partial<Omit<T, 'id'>>, condition: Partial<T>): Promise<number> {
        const setStr = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const whereStr = Object.keys(condition).map(key => `${key} = ?`).join(' AND ');
        const sql = formatQuery("DB_UPDATE", { table, set: setStr, where: whereStr });

        const dataParams = Object.values(data);
        const conditionParams = Object.values(condition);
        const params = [...dataParams, ...conditionParams];

        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, result: mysql.OkPacket) => {
                if (err) {
                    reject(new Error(`目标库更新失败: ${err.message}`));
                    return;
                }
                resolve(result.affectedRows);
            });
        });
    }

    async delete<T>(table: string, condition: Partial<T>): Promise<number> {
        const whereStr = Object.keys(condition).map(key => `${key} = ?`).join(' AND ');
        const sql = formatQuery("DB_DELETE", { table, where: whereStr });
        const params = Object.values(condition);

        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, result: mysql.OkPacket) => {
                if (err) {
                    reject(new Error(`目标库删除失败: ${err.message}`));
                    return;
                }
                resolve(result.affectedRows);
            });
        });
    }

    /**
     * 执行任意 SQL 查询并返回结果数组
     * @param sql SQL 字符串
     * @param params 可选参数数组
     */
    async query(sql: string, params?: any[]): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params || [], (err, results) => {
                if (err) {
                    reject(new Error(`目标库查询失败: ${err.message}`));
                    return;
                }
                resolve(results as any[]);
            });
        });
    }
}
