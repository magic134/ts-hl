import { authApi } from "../api";
import { setSession } from "../auth";
import { renderDashboard } from "./dashboard";

export function renderLogin(container: HTMLElement): void {
    container.innerHTML = `
        <div class="login-box">
            <h2>幻灵游戏登录</h2>
            <form id="login-form">
                <div class="form-group">
                    <label>账号</label>
                    <input type="text" id="account" required />
                </div>
                <div class="form-group">
                    <label>密码</label>
                    <input type="password" id="password" required />
                </div>
                <button type="submit" class="btn btn-primary">登录</button>
                <div id="login-error" class="error"></div>
            </form>
        </div>
    `;

    const form = document.getElementById("login-form") as HTMLFormElement;
    const errorEl = document.getElementById("login-error")!;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const account = (document.getElementById("account") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        try {
            const res = await authApi.login({ account, password });
            setSession({
                token: res.token,
                userId: res.user.id,
                accountId: res.user.account_id,
                name: res.user.name
            });
            renderDashboard(container);
        } catch (err: any) {
            errorEl.textContent = err.message;
        }
    });
}
