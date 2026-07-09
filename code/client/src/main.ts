import { renderLogin } from "./views/login";
import { renderDashboard } from "./views/dashboard";
import { getSession } from "./auth";

function init(): void {
    const app = document.getElementById("app")!;
    const session = getSession();
    if (session) {
        renderDashboard(app);
    } else {
        renderLogin(app);
    }
}

init();
