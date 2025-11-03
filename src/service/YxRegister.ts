import { Account, AccountData } from "../db/Account";
import { DbClient } from "../db/DbClient";
import { YxPet, YxPetData } from "../db/YxPet";
import { YxUser, YxUserData } from "../db/YxUser";

export class YxRegister {
    constructor() {

    }

    async register(name: string, password: string, qq: string, nick_name: string) {
        const db = new DbClient();
        await db.connect();
        // 1. 插入账户信息
        const accountData = new AccountData();
        accountData.name = name;
        accountData.password = password;
        accountData.ip_mask = qq;
        const account = new Account(db);
        const accountId = await account.createAccount(accountData);

        // 2. 插入用户信息
        const userData = new YxUserData();
        userData.name = nick_name;
        userData.account_id = accountId;
        const user = new YxUser(db);
        const userId = await user.createYxUser(userData);

        // 3.插入宠物信息
        const petData = new YxPetData();
        petData.owner_id = userId;
        const pet = new YxPet(db);
        const petId = await pet.createYxPet(petData);

        // 4. 更新玩家出征宠物
        let updateRows = await user.updateYxUser({ petused_id: petId, pet0_id: petId }, { id: userId });
        if (updateRows <= 0) {
            throw new Error('注册失败，更新出征宠物失败');
        }
        console.log(`注册成功，账号ID: ${accountId}, 用户ID: ${userId}, 宠物ID: ${petId}`);
        // 5. 关闭数据库连接
        await db.close();

    }

}