import { SyncService } from "./SyncService";
import { SYNC_ENABLED, LEADERBOARD_SYNC_INTERVAL_MS, USER_SYNC_INTERVAL_MS } from "../config";

/**
 * 数据同步调度器
 * 按配置间隔定时将源库数据同步到目标库
 */
export class SyncScheduler {
    private syncService = new SyncService();
    private leaderboardTimer: ReturnType<typeof setInterval> | null = null;
    private userTimer: ReturnType<typeof setInterval> | null = null;
    private isSyncingLeaderboards = false;
    private isSyncingUsers = false;

    start(): void {
        if (!SYNC_ENABLED) {
            console.log("[SyncScheduler] 同步功能已关闭，跳过启动");
            return;
        }

        console.log("[SyncScheduler] 启动数据同步调度");
        console.log(`[SyncScheduler] 排行榜同步间隔: ${LEADERBOARD_SYNC_INTERVAL_MS}ms`);
        console.log(`[SyncScheduler] 角色信息同步间隔: ${USER_SYNC_INTERVAL_MS}ms`);

        // 启动时立即执行一次
        this.runSyncLeaderboards().catch(err => console.error("[SyncScheduler] 初始排行榜同步失败:", err));
        this.runSyncUsers().catch(err => console.error("[SyncScheduler] 初始角色信息同步失败:", err));

        this.leaderboardTimer = setInterval(() => {
            this.runSyncLeaderboards().catch(err => console.error("[SyncScheduler] 排行榜同步失败:", err));
        }, LEADERBOARD_SYNC_INTERVAL_MS);

        this.userTimer = setInterval(() => {
            this.runSyncUsers().catch(err => console.error("[SyncScheduler] 角色信息同步失败:", err));
        }, USER_SYNC_INTERVAL_MS);
    }

    stop(): void {
        if (this.leaderboardTimer) {
            clearInterval(this.leaderboardTimer);
            this.leaderboardTimer = null;
        }
        if (this.userTimer) {
            clearInterval(this.userTimer);
            this.userTimer = null;
        }
        console.log("[SyncScheduler] 数据同步调度已停止");
    }

    private async runSyncLeaderboards(): Promise<void> {
        if (this.isSyncingLeaderboards) {
            console.log("[SyncScheduler] 上一次排行榜同步尚未完成，跳过本次");
            return;
        }
        this.isSyncingLeaderboards = true;
        try {
            console.log("[SyncScheduler] 开始同步排行榜...");
            await this.syncService.syncLeaderboards();
        } finally {
            this.isSyncingLeaderboards = false;
        }
    }

    private async runSyncUsers(): Promise<void> {
        if (this.isSyncingUsers) {
            console.log("[SyncScheduler] 上一次角色信息同步尚未完成，跳过本次");
            return;
        }
        this.isSyncingUsers = true;
        try {
            console.log("[SyncScheduler] 开始同步角色信息...");
            await this.syncService.syncUsers();
        } finally {
            this.isSyncingUsers = false;
        }
    }
}
