import { DbClient } from "../db/DbClient";

export class YxGetUsers {
    constructor() {}

    /**
     * 根据 QQ 值查询对应的 account.name 和 yx_user.name
     * 如果 user 表不存在数据，则 userName 返回 '空用户'
     *
     * 返回数组：{ accountId, accountName, userId|null, userName }
     */
    async getByQQ(qq: string) {
        const db = new DbClient();
        await db.connect();
        try {
            // 第一步：从 qq 表查询获取 account_id1, account_id2, account_id3
            const qqParam = Number.isNaN(Number(qq)) ? qq : Number(qq);
            const qqRows = await db.query(
                `SELECT account_id1, account_id2, account_id3 FROM qq WHERE qq = ?`,
                [qqParam]
            );

            if (!qqRows || qqRows.length === 0) {
                return [];
            }

            // 收集所有有效的 account_id
            const accountIds: number[] = [];
            for (const row of qqRows) {
                if (row.account_id1) accountIds.push(row.account_id1);
                if (row.account_id2) accountIds.push(row.account_id2);
                if (row.account_id3) accountIds.push(row.account_id3);
            }

            if (accountIds.length === 0) {
                return [];
            }

            // 第二步：根据 account_id 列表查询 account 表
            const placeholders = accountIds.map(() => '?').join(',');
            const accountRows = await db.query(
                `SELECT id, name FROM account WHERE id IN (${placeholders})`,
                accountIds
            );

            if (!accountRows || accountRows.length === 0) {
                return [];
            }

            // 第三步：根据 account_id 列表查询 yx_user 表
            const userRows = await db.query(
                `SELECT id, account_id, name FROM yx_user WHERE account_id IN (${placeholders})`,
                accountIds
            );

            // 创建 userMap 以便快速查找
            const userMap = new Map<number, { id: number; name: string }>();
            for (const user of userRows || []) {
                if (user.account_id) {
                    userMap.set(user.account_id, { id: user.id, name: user.name });
                }
            }

            // 组装结果
            const results: Array<{
                accountId: number;
                accountName: string;
                userId: number | null;
                userName: string;
            }> = [];

            for (const account of accountRows) {
                const userInfo = userMap.get(account.id);
                results.push({
                    accountId: account.id,
                    accountName: account.name,
                    userId: userInfo?.id ?? null,
                    userName: userInfo?.name ?? '空用户',
                });
            }

            return results;
        } finally {
            await db.close();
        }
    }
}

export default new YxGetUsers();
