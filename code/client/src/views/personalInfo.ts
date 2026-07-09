import { userApi } from "../api";
import { getSession } from "../auth";
import { getTitle, getToutai, renderAvatar } from "../utils/format";

export async function renderPersonalInfo(container: HTMLElement): Promise<void> {
    try {
        const session = getSession();
        if (!session) {
            container.innerHTML = `<p class="error">未登录</p>`;
            return;
        }

        const user = await userApi.info({ acc_id: session.accountId, user_id: session.userId });
        container.innerHTML = `
            <div class="personal-info">
                <div class="info-header">
                    ${renderAvatar(user.look, user.name, 80)}
                    <div class="info-title">
                        <h3>${user.name}</h3>
                        <p>${getTitle(user.metempsychosis)}[${getToutai(user.metempsychosis)}]</p>
                    </div>
                </div>
                <table class="table table-bordered info-table">
                    <tbody>
                        <tr><td>角色ID</td><td>${user.id}</td></tr>
                        <tr><td>账号ID</td><td>${user.account_id}</td></tr>
                        <tr><td>等级</td><td>${user.level}</td></tr>
                        <tr><td>生命值</td><td>${user.life}</td></tr>
                        <tr><td>内力</td><td>${user.power}</td></tr>
                        <tr><td>幻币</td><td>${user.money}</td></tr>
                        <tr><td>存款</td><td>${user.money_saved}</td></tr>
                        <tr><td>声望</td><td>${user.repute}</td></tr>
                        <tr><td>修为</td><td>${user.degree_lev}</td></tr>
                        <tr><td>经验</td><td>${user.exp}</td></tr>
                        <tr><td>称号</td><td>${user.monicker}</td></tr>
                        <tr><td>配偶</td><td>${user.mate}</td></tr>
                        <tr><td>宠物数量</td><td>${user.pet_count}</td></tr>
                        <tr><td>技能数量</td><td>${user.skill_count}</td></tr>
                    </tbody>
                </table>
            </div>
        `;
    } catch (e: any) {
        container.innerHTML = `<p class="error">${e.message}</p>`;
    }
}
