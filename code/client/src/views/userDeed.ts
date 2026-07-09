import { leaderboardApi } from "../api";
import { getTitle, getToutai, renderAvatar } from "../utils/format";

export async function renderUserDeed(container: HTMLElement): Promise<void> {
    try {
        const rows = await leaderboardApi.userLeaderboard("deed");
        container.innerHTML = `
            <table class="table table-bordered table-responsive leaderboard-table">
                <thead>
                    <tr>
                        <th>排名</th>
                        <th>昵称</th>
                        <th>人物</th>
                        <th>等级</th>
                        <th>称号</th>
                        <th>功德</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows.map(r => `
                        <tr>
                            <td>${r.rank}</td>
                            <td>${r.name}</td>
                            <td>${renderAvatar(r.look, r.name, 30)}</td>
                            <td>${r.level}</td>
                            <td>${getTitle(r.metempsychosis)}[${getToutai(r.metempsychosis)}]</td>
                            <td>${r.deed}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    } catch (e: any) {
        container.innerHTML = `<p class="error">${e.message}</p>`;
    }
}
