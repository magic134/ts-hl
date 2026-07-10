import { leaderboardApi } from "../api";
import { getTitle, getToutai, renderAvatar } from "../utils/format";

export async function renderUserHongli(container: HTMLElement): Promise<void> {
    try {
        const rows = await leaderboardApi.userLeaderboard("hongli");
        container.innerHTML = `
            <table class="table table-bordered table-responsive leaderboard-table">
                <thead>
                    <tr>
                        <th>排名</th>
                        <th>昵称</th>
                        <th>头像</th>
                        <th>等级</th>
                        <th>称号</th>
                        <th>红利</th>
                        <th>修为</th>
                        <th>幻币</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows.map(r => `
                        <tr>
                            <td>${r.rank}</td>
                            <td>${r.name}</td>
                            <td>${renderAvatar(r.look, r.name, 45)}</td>
                            <td>${r.level}</td>
                            <td>${getTitle(r.metempsychosis)}[${getToutai(r.metempsychosis)}]</td>
                            <td>${r.hongli}</td>
                            <td>${r.degree_lev}</td>
                            <td>${r.money}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    } catch (e: any) {
        container.innerHTML = `<p class="error">${e.message}</p>`;
    }
}
