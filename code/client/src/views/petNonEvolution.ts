import { leaderboardApi } from "../api";

export async function renderPetNonEvolution(container: HTMLElement): Promise<void> {
    try {
        const rows = await leaderboardApi.petLeaderboard("nonEvolution");
        container.innerHTML = `
            <table class="table table-bordered table-responsive leaderboard-table">
                <thead>
                    <tr>
                        <th>排名</th>
                        <th>主人</th>
                        <th>昵称</th>
                        <th>类型</th>
                        <th>等级</th>
                        <th>成长</th>
                        <th>幻化</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows.map(r => `
                        <tr>
                            <td>${r.rank}</td>
                            <td>${r.owner_name}</td>
                            <td>${r.pet_name}</td>
                            <td>${r.className}</td>
                            <td>${r.level}</td>
                            <td>${r.grow.toFixed(2)}</td>
                            <td>${r.generation}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    } catch (e: any) {
        container.innerHTML = `<p class="error">${e.message}</p>`;
    }
}
