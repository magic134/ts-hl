import jwt from "jsonwebtoken";
import { DbClient } from "../dbClient/DbClient";
import { Account, AccountData } from "../db/Account";
import { YxUser, YxUserData } from "../db/YxUser";
import { YxPet, YxPetData } from "../db/YxPet";
import { ReqLogin, ReqRegister, ReqUser, UserVo } from "../types/api";
import { JWT_SECRET } from "../config";
import { getQuery } from "../utils/query";
import { UserRankService } from "./UserRankService";

/**
 * 登录、注册、用户信息查询服务
 */
export class AuthService {
    private userRankService = new UserRankService();

    async login(req: ReqLogin): Promise<{ token: string; user: UserVo }> {
        const db = new DbClient();
        await db.connect();
        try {
            const accountModel = new Account(db);
            const accounts = await accountModel.findAccount({ name: req.account });
            if (accounts.length === 0) {
                throw new Error("账号不存在");
            }
            const account = accounts[0];
            if (account.password !== req.password) {
                throw new Error("密码错误");
            }

            const userModel = new YxUser(db);
            const users = await userModel.findYxUser({ account_id: account.id });
            if (users.length === 0) {
                throw new Error("用户不存在");
            }
            const user = users[0];
            const token = this.generateToken(account.id, user.id);
            const qq = await this.fetchQQ(db, account.id);
            return { token, user: this.userRankService.toUserVo({ ...user, qq }, token) };
        } finally {
            await db.close();
        }
    }

    async register(req: ReqRegister): Promise<{ token: string; user: UserVo }> {
        const db = new DbClient();
        await db.connect();
        try {
            const accountModel = new Account(db);
            const existing = await accountModel.findAccount({ name: req.account });
            if (existing.length > 0) {
                throw new Error("账号已存在");
            }

            const accountData = new AccountData();
            accountData.name = req.account;
            accountData.password = req.password;
            accountData.ip_mask = req.QQ;
            const accountId = await accountModel.createAccount(accountData);

            const userData = new YxUserData();
            userData.name = req.nickname;
            userData.account_id = accountId;
            const userModel = new YxUser(db);
            const userId = await userModel.createYxUser(userData);

            const petData = new YxPetData();
            petData.owner_id = userId;
            const petModel = new YxPet(db);
            const petId = await petModel.createYxPet(petData);

            await userModel.updateYxUser(
                { petused_id: petId, pet0_id: petId },
                { id: userId }
            );

            const users = await userModel.findYxUser({ id: userId });
            const user = users[0];
            const token = this.generateToken(accountId, userId);
            return { token, user: this.userRankService.toUserVo({ ...user, qq: req.QQ }, token) };
        } finally {
            await db.close();
        }
    }

    async info(req: ReqUser): Promise<UserVo> {
        const db = new DbClient();
        await db.connect();
        try {
            const userModel = new YxUser(db);
            const users = await userModel.findYxUser({ id: req.user_id });
            if (users.length === 0) {
                throw new Error("用户不存在");
            }
            const user = users[0];
            const qq = await this.fetchQQ(db, user.account_id);
            return this.userRankService.toUserVo({ ...user, qq });
        } finally {
            await db.close();
        }
    }

    generateToken(accountId: number, userId: number): string {
        return jwt.sign({ account_id: accountId, user_id: userId }, JWT_SECRET, { expiresIn: "7d" });
    }

    private async fetchQQ(db: DbClient, accountId: number): Promise<string> {
        const rows = await db.query(getQuery("AUTH_FETCH_QQ"), [accountId]);
        return rows[0]?.ip_mask || "";
    }
}
