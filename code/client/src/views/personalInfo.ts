import { userApi } from "../api";
import { getSession } from "../auth";
import { getTitle, getToutai, renderAvatar } from "../utils/format";

function renderModal(title: string, content: string): string {
    return `
        <div id="item-modal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button id="modal-close" class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        </div>
    `;
}

function showModal(title: string, content: string): void {
    let modal = document.getElementById("item-modal");
    if (!modal) {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = renderModal(title, content);
        document.body.appendChild(wrapper.firstElementChild!);
    } else {
        modal.querySelector(".modal-header h3")!.textContent = title;
        modal.querySelector(".modal-body")!.innerHTML = content;
    }

    modal = document.getElementById("item-modal")!;
    const closeBtn = document.getElementById("modal-close")!;
    const closeModal = () => modal?.remove();

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function renderEquipmentTable(items: import("../types/api").EquippedItem[]): string {
    if (items.length === 0) {
        return "<p>暂无装备</p>";
    }
    const slotMap: Record<string, string> = {
        weapon: "武器",
        armor: "衣服",
        shoes: "鞋子",
        treasure0: "饰品1",
        treasure1: "饰品2"
    };
    return `
        <table class="table table-bordered table-responsive item-table">
            <thead>
                <tr>
                    <th>部位</th>
                    <th>名字</th>
                    <th>血量</th>
                    <th>内力</th>
                    <th>攻击</th>
                    <th>防御</th>
                    <th>敏捷</th>
                </tr>
            </thead>
            <tbody>
                ${items.map(item => `
                    <tr>
                        <td>${slotMap[item.slot] || item.slot}</td>
                        <td>${item.name}</td>
                        <td>${item.life}</td>
                        <td>${item.power}</td>
                        <td>${item.attack}</td>
                        <td>${item.defence}</td>
                        <td>${item.dexterity}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}

function renderBackpackTable(items: import("../types/api").BackpackItem[]): string {
    if (items.length === 0) {
        return "<p>背包为空</p>";
    }
    return `
        <table class="table table-bordered table-responsive item-table">
            <thead>
                <tr>
                    <th>名字</th>
                    <th>血量</th>
                    <th>内力</th>
                    <th>攻击</th>
                    <th>防御</th>
                    <th>敏捷</th>
                    <th>作者</th>
                </tr>
            </thead>
            <tbody>
                ${items.map(item => `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.life}</td>
                        <td>${item.power}</td>
                        <td>${item.attack}</td>
                        <td>${item.defence}</td>
                        <td>${item.dexterity}</td>
                        <td>${item.inventer_name || "-"}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}

function renderPetTable(items: import("../types/api").UserPet[]): string {
    if (items.length === 0) {
        return "<p>暂无宠物</p>";
    }
    return `
        <table class="table table-bordered table-responsive item-table">
            <thead>
                <tr>
                    <th>名字</th>
                    <th>等级</th>
                    <th>生命</th>
                    <th>攻击</th>
                    <th>防御</th>
                    <th>敏捷</th>
                    <th>成长率</th>
                    <th>状态</th>
                </tr>
            </thead>
            <tbody>
                ${items.map(item => `
                    <tr style="${item.isActive ? 'background: rgba(240, 173, 78, 0.15);' : ''}">
                        <td>${item.name}</td>
                        <td>${item.level}</td>
                        <td>${item.life}</td>
                        <td>${item.attack}</td>
                        <td>${item.defence}</td>
                        <td>${item.dexterity}</td>
                        <td>${item.grow_rate}</td>
                        <td>${item.isActive ? "⭐ 出征" : "-"}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}

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
                <div class="btn-group item-actions three-col">
                    <button id="btn-equipment" class="btn btn-primary">装备</button>
                    <button id="btn-backpack" class="btn btn-primary">背包物品</button>
                    <button id="btn-pets" class="btn btn-primary">宠物</button>
                </div>
                <table class="table table-bordered info-table two-col">
                    <tbody>
                        <tr>
                            <td>角色ID</td><td>${user.id}</td>
                            <td>账号ID</td><td>${user.account_id}</td>
                        </tr>
                        <tr>
                            <td>等级</td><td>${user.level}</td>
                            <td>生命值</td><td>${user.life}</td>
                        </tr>
                        <tr>
                            <td>内力</td><td>${user.power}</td>
                            <td>幻币</td><td>${user.money}</td>
                        </tr>
                        <tr>
                            <td>存款</td><td>${user.money_saved}</td>
                            <td>声望</td><td>${user.repute}</td>
                        </tr>
                        <tr>
                            <td>修为</td><td>${user.degree_lev}</td>
                            <td>经验</td><td>${user.exp}</td>
                        </tr>
                        <tr>
                            <td>称号</td><td>${user.monicker}</td>
                            <td>配偶</td><td>${user.mate}</td>
                        </tr>
                        <tr>
                            <td>宠物数量</td><td>${user.pet_count}</td>
                            <td>技能数量</td><td>${user.skill_count}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById("btn-equipment")!.addEventListener("click", async () => {
            showModal("装备", "<p>加载中...</p>");
            try {
                const items = await userApi.equipment(session.userId);
                showModal("装备", renderEquipmentTable(items));
            } catch (e: any) {
                showModal("装备", `<p class="error">${e.message}</p>`);
            }
        });

        document.getElementById("btn-backpack")!.addEventListener("click", async () => {
            showModal("背包物品", "<p>加载中...</p>");
            try {
                const items = await userApi.backpack(session.userId);
                showModal("背包物品", renderBackpackTable(items));
            } catch (e: any) {
                showModal("背包物品", `<p class="error">${e.message}</p>`);
            }
        });

        document.getElementById("btn-pets")!.addEventListener("click", async () => {
            showModal("宠物", "<p>加载中...</p>");
            try {
                const items = await userApi.pets(session.userId);
                showModal("宠物", renderPetTable(items));
            } catch (e: any) {
                showModal("宠物", `<p class="error">${e.message}</p>`);
            }
        });
    } catch (e: any) {
        container.innerHTML = `<p class="error">${e.message}</p>`;
    }
}
