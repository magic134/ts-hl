import mysql from 'mysql';


// 2. 数据库配置（保持不变）
const DB_CONFIG = {
    host: '192.168.171.128',
    user: 'root',
    password: 'root',
    database: 'hlyx',
    port: 3306,
    insecureAuth: true,
    connectTimeout: 10000,
    charset: 'gbk', // 与数据库字段编码一致
    flags: ['NO_CHARSET_CONVERSION'] // 禁用模块的自动编码转换
};

// 3. 核心数据库客户端类（修复编码逻辑）
export class DbClient {
    connection: mysql.Connection;

    constructor() {
        this.connection = mysql.createConnection({
            ...DB_CONFIG,

        });
    }

    // 连接数据库
    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) {
                    reject(new Error(`连接失败: ${err.message}`));
                    return;
                }
                console.log('数据库连接成功');
                resolve();
            });
        });
    }

    // 关闭连接
    close(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) {
                    reject(new Error(`关闭连接失败: ${err.message}`));
                    return;
                }
                console.log('连接已关闭');
                resolve();
            });
        });
    }


    // ------------------------------ 通用 CRUD 方法（内部使用）------------------------------
    async find<T>(table: string, condition?: Partial<T>): Promise<T[]> {
        let sql = `SELECT * FROM ${table}`;
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
                    reject(new Error(`查询失败: ${err.message}`));
                    return;
                }
                resolve(results as T[]);
            });
        });
    }

    async create<T>(table: string, data: Omit<T, 'id'>): Promise<number> {
        const keys = Object.keys(data);
        const placeholders = keys.map(() => '?').join(', ');
        const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
        const params = Object.values(data);
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, result: mysql.OkPacket) => {
                if (err) {
                    reject(new Error(`新增失败: ${err.message}`));
                    return;
                }
                resolve(result.insertId);
            });
        });
    }

    async update<T>(table: string, data: Partial<Omit<T, 'id'>>, condition: Partial<T>): Promise<number> {
        const setStr = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const whereStr = Object.keys(condition).map(key => `${key} = ?`).join(' AND ');
        const sql = `UPDATE ${table} SET ${setStr} WHERE ${whereStr}`;

        const dataParams = Object.values(data);
        const conditionParams = Object.values(condition);
        const params = [...dataParams, ...conditionParams];

        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, result: mysql.OkPacket) => {
                if (err) {
                    reject(new Error(`更新失败: ${err.message}`));
                    return;
                }
                resolve(result.affectedRows);
            });
        });
    }

    async delete<T>(table: string, condition: Partial<T>): Promise<number> {
        const whereStr = Object.keys(condition).map(key => `${key} = ?`).join(' AND ');
        const sql = `DELETE FROM ${table} WHERE ${whereStr}`;
        const params = Object.values(condition);

        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (err, result: mysql.OkPacket) => {
                if (err) {
                    reject(new Error(`删除失败: ${err.message}`));
                    return;
                }
                resolve(result.affectedRows);
            });
        });
    }


}
