import { clearSession } from "../auth";
import { renderLogin } from "./login";
import { renderUserHongli } from "./userHongli";
import { renderUserDeed } from "./userDeed";
import { renderUserMoney } from "./userMoney";
import { renderPetAll } from "./petAll";
import { renderPetNonEvolution } from "./petNonEvolution";

import { renderPersonalInfo } from "./personalInfo";

type View = "personal" | "hongli" | "deed" | "money" | "petAll" | "petNonEvolution";

const TABS: { key: View; label: string }[] = [
    { key: "personal", label: "个人信息" },
    { key: "hongli", label: "人物红利榜" },
    { key: "deed", label: "人物功德榜" },
    { key: "money", label: "人物幻币榜" },
    { key: "petAll", label: "所有宠物总榜" },
    { key: "petNonEvolution", label: "不可进化宠榜" }
];

export function renderDashboard(container: HTMLElement): void {
    container.innerHTML = `
        <div class="dashboard">
            <div class="dashboard-header">
                <h2>幻灵排行榜</h2>
                <button id="logout-btn" class="btn btn-warning">退出登录</button>
            </div>
            <div class="btn-group">
                ${TABS.map(t => `<button class="btn btn-warning tab-btn" data-view="${t.key}">${t.label}</button>
                `).join("")}
            </div>
            <div id="content" class="content"></div>
        </div>
    `;

    const content = document.getElementById("content")!;

    document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const view = (btn as HTMLElement).dataset.view as View;
            switchView(view, content);
        });
    });

    document.getElementById("logout-btn")!.addEventListener("click", () => {
        clearSession();
        renderLogin(container);
    });

    switchView("personal", content);
}

function switchView(view: View, container: HTMLElement): void {
    document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.classList.toggle("active", (btn as HTMLElement).dataset.view === view);
    });
    container.innerHTML = "<p>加载中...</p>";
    switch (view) {
        case "personal":
            renderPersonalInfo(container);
            break;
        case "hongli":
            renderUserHongli(container);
            break;
        case "deed":
            renderUserDeed(container);
            break;
        case "money":
            renderUserMoney(container);
            break;
        case "petAll":
            renderPetAll(container);
            break;
        case "petNonEvolution":
            renderPetNonEvolution(container);
            break;
    }
}
