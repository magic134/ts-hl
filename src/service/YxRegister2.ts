import { Account, AccountData } from "../db/Account";
import { DbClient } from "../db/DbClient";

export class YxRegister2 {
    constructor() {

    }

    async register2(name1: string, name2: string, name3: string, password: string, qq: string, nick_name: string) {
        const db = new DbClient();
        await db.connect();
        try {
            // 1. 生成3个account
            const account = new Account(db);
            const accountIds: number[] = [];
            const accountNames = [name1, name2, name3];

            for (let i = 0; i < 3; i++) {
                const accountData = new AccountData();
                accountData.name = accountNames[i];
                accountData.password = password;
                accountData.ip_mask = qq;
                
                const accountId = await account.createAccount(accountData);
                accountIds.push(accountId);
                console.log(`创建账户${i + 1}成功，名称: ${accountNames[i]}, ID: ${accountId}`);
            }

            // 2. 将3个account的id存储到qq表中
            const qqData = {
                qq: parseInt(qq) || 0, // 将字符串转换为数字
                account_id1: accountIds[0],
                account_id2: accountIds[1],
                account_id3: accountIds[2],
                reg_date: new Date().toISOString().split('T')[0] // 格式：YYYY-MM-DD
            };

            const qqId = await db.create('qq', qqData);
            console.log(`QQ表记录创建成功，ID: ${qqId}`);
            console.log(`QQ号: ${qq}, 账号ID列表: ${accountIds.join(', ')}`);
            console.log(`昵称: ${nick_name}`);

            return {
                qqId,
                accountIds,
                accountNames
            };
        } finally {
            // 3. 关闭数据库连接
            await db.close();
        }
    }
}

