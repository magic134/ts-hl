(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))o(d);new MutationObserver(d=>{for(const n of d)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(d){const n={};return d.integrity&&(n.integrity=d.integrity),d.referrerPolicy&&(n.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?n.credentials="include":d.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(d){if(d.ep)return;d.ep=!0;const n=t(d);fetch(d.href,n)}})();const $="/api";async function l(e,r={}){const t=localStorage.getItem("hlyx_token")||"",d=await(await fetch($+e,{...r,headers:{"Content-Type":"application/json",Authorization:t,...r.headers}})).json();if(d.code!==0)throw new Error(d.msg||"请求失败");return d.data}const f={login(e){return l("/auth/login",{method:"POST",body:JSON.stringify(e)})}},s={userLeaderboard(e){return l("/user/leaderboard",{method:"POST",body:JSON.stringify({type:e})})},petLeaderboard(e){return l("/pet/leaderboard",{method:"POST",body:JSON.stringify({type:e})})}},g={info(e){return l("/user/info",{method:"POST",body:JSON.stringify(e)})}},b="hlyx_session";function m(){const e=localStorage.getItem(b);return e?JSON.parse(e):null}function v(e){localStorage.setItem(b,JSON.stringify(e)),localStorage.setItem("hlyx_token",e.token)}function w(){localStorage.removeItem(b),localStorage.removeItem("hlyx_token")}const L={0:{0:"凡人",1:"散仙"},1:{0:"凡人",1:"散仙",2:"地仙",3:"天仙",4:"大罗金仙",15:"通灵天神",25:"巡游天神",35:"功德天神",45:"火淬天神",55:"尚武天神"},2:{0:"凡人",1:"散仙",2:"夜叉",3:"阿修罗",4:"魔神",15:"摄魂魔尊",25:"堕天魔尊",35:"泯灭魔尊",65:"幻变魔尊",75:"嗜血魔尊"}};function i(e){var o;const r=e%10,t=Math.floor(e/1e3);return((o=L[r])==null?void 0:o[t])||"未知"}function c(e){return Math.floor(e%1e3/10)}function M(e){return e<18?`Man0${Math.floor(e/3+1)}`:e<36&&e>17?`Woman0${Math.floor(e/3-5)}`:e===190?"Man07":e===191?"Man08":e===192?"Woman07":e===193?"Woman08":""}function h(e,r,t){const o=M(e),d=r?r[0]:"?";return`
        <span class="avatar" style="width:${t}px;height:${t}px;line-height:${t}px;" data-initial="${d}">
            <img src="/img/${o}.bmp" width="${t}" onerror="this.style.display='none'" />
        </span>
    `}async function T(e){try{const r=await s.userLeaderboard("hongli");e.innerHTML=`
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
                    ${r.map(t=>`
                        <tr>
                            <td>${t.rank}</td>
                            <td>${t.name}</td>
                            <td>${h(t.look,t.name,45)}</td>
                            <td>${t.level}</td>
                            <td>${i(t.metempsychosis)}[${c(t.metempsychosis)}]</td>
                            <td>${t.hongli}</td>
                            <td>${t.degree_lev}</td>
                            <td>${t.money}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `}catch(r){e.innerHTML=`<p class="error">${r.message}</p>`}}async function E(e){try{const r=await s.userLeaderboard("deed");e.innerHTML=`
            <table class="table table-bordered table-responsive leaderboard-table">
                <thead>
                    <tr>
                        <th>排名</th>
                        <th>昵称</th>
                        <th>头像</th>
                        <th>等级</th>
                        <th>称号</th>
                        <th>功德</th>
                    </tr>
                </thead>
                <tbody>
                    ${r.map(t=>`
                        <tr>
                            <td>${t.rank}</td>
                            <td>${t.name}</td>
                            <td>${h(t.look,t.name,45)}</td>
                            <td>${t.level}</td>
                            <td>${i(t.metempsychosis)}[${c(t.metempsychosis)}]</td>
                            <td>${t.deed}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `}catch(r){e.innerHTML=`<p class="error">${r.message}</p>`}}async function S(e){try{const r=await s.userLeaderboard("money");e.innerHTML=`
            <table class="table table-bordered table-responsive leaderboard-table">
                <thead>
                    <tr>
                        <th>排名</th>
                        <th>昵称</th>
                        <th>头像</th>
                        <th>等级</th>
                        <th>称号</th>
                        <th>幻币</th>
                    </tr>
                </thead>
                <tbody>
                    ${r.map(t=>`
                        <tr>
                            <td>${t.rank}</td>
                            <td>${t.name}</td>
                            <td>${h(t.look,t.name,45)}</td>
                            <td>${t.level}</td>
                            <td>${i(t.metempsychosis)}[${c(t.metempsychosis)}]</td>
                            <td>${t.total_money}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `}catch(r){e.innerHTML=`<p class="error">${r.message}</p>`}}async function k(e){try{const r=await s.petLeaderboard("all");e.innerHTML=`
            <table class="table table-bordered table-responsive leaderboard-table">
                <thead>
                    <tr>
                        <th>排名</th>
                        <th>主人</th>
                        <th>昵称</th>
                        <th>种类</th>
                        <th>等级</th>
                        <th>成长</th>
                        <th>幻化</th>
                    </tr>
                </thead>
                <tbody>
                    ${r.map(t=>`
                        <tr>
                            <td>${t.rank}</td>
                            <td>${t.owner_name}</td>
                            <td>${t.pet_name}</td>
                            <td>${t.className}</td>
                            <td>${t.level}</td>
                            <td>${t.grow.toFixed(2)}</td>
                            <td>${t.generation}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `}catch(r){e.innerHTML=`<p class="error">${r.message}</p>`}}async function I(e){try{const r=await s.petLeaderboard("nonEvolution");e.innerHTML=`
            <table class="table table-bordered table-responsive leaderboard-table">
                <thead>
                    <tr>
                        <th>排名</th>
                        <th>主人</th>
                        <th>昵称</th>
                        <th>种类</th>
                        <th>等级</th>
                        <th>成长</th>
                        <th>幻化</th>
                    </tr>
                </thead>
                <tbody>
                    ${r.map(t=>`
                        <tr>
                            <td>${t.rank}</td>
                            <td>${t.owner_name}</td>
                            <td>${t.pet_name}</td>
                            <td>${t.className}</td>
                            <td>${t.level}</td>
                            <td>${t.grow.toFixed(2)}</td>
                            <td>${t.generation}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `}catch(r){e.innerHTML=`<p class="error">${r.message}</p>`}}async function _(e){try{const r=m();if(!r){e.innerHTML='<p class="error">未登录</p>';return}const t=await g.info({acc_id:r.accountId,user_id:r.userId});e.innerHTML=`
            <div class="personal-info">
                <div class="info-header">
                    ${h(t.look,t.name,80)}
                    <div class="info-title">
                        <h3>${t.name}</h3>
                        <p>${i(t.metempsychosis)}[${c(t.metempsychosis)}]</p>
                    </div>
                </div>
                <table class="table table-bordered info-table">
                    <tbody>
                        <tr><td>角色ID</td><td>${t.id}</td></tr>
                        <tr><td>账号ID</td><td>${t.account_id}</td></tr>
                        <tr><td>等级</td><td>${t.level}</td></tr>
                        <tr><td>生命值</td><td>${t.life}</td></tr>
                        <tr><td>内力</td><td>${t.power}</td></tr>
                        <tr><td>幻币</td><td>${t.money}</td></tr>
                        <tr><td>存款</td><td>${t.money_saved}</td></tr>
                        <tr><td>声望</td><td>${t.repute}</td></tr>
                        <tr><td>修为</td><td>${t.degree_lev}</td></tr>
                        <tr><td>经验</td><td>${t.exp}</td></tr>
                        <tr><td>称号</td><td>${t.monicker}</td></tr>
                        <tr><td>配偶</td><td>${t.mate}</td></tr>
                        <tr><td>宠物数量</td><td>${t.pet_count}</td></tr>
                        <tr><td>技能数量</td><td>${t.skill_count}</td></tr>
                    </tbody>
                </table>
            </div>
        `}catch(r){e.innerHTML=`<p class="error">${r.message}</p>`}}async function H(e){try{const r=await s.petLeaderboard("evolution");e.innerHTML=`
            <table class="table table-bordered table-responsive leaderboard-table">
                <thead>
                    <tr>
                        <th>排名</th>
                        <th>主人</th>
                        <th>昵称</th>
                        <th>种类</th>
                        <th>等级</th>
                        <th>成长</th>
                        <th>幻化</th>
                    </tr>
                </thead>
                <tbody>
                    ${r.map(t=>`
                        <tr>
                            <td>${t.rank}</td>
                            <td>${t.owner_name}</td>
                            <td>${t.pet_name}</td>
                            <td>${t.className}</td>
                            <td>${t.level}</td>
                            <td>${t.grow.toFixed(2)}</td>
                            <td>${t.generation}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `}catch(r){e.innerHTML=`<p class="error">${r.message}</p>`}}const O=[{key:"personal",label:"个人信息"},{key:"hongli",label:"人物红利榜"},{key:"deed",label:"人物功德榜"},{key:"money",label:"人物幻币榜"},{key:"petAll",label:"所有宠物总榜"},{key:"petEvolution",label:"可进化宠榜"},{key:"petNonEvolution",label:"不可进化宠榜"}];function p(e){e.innerHTML=`
        <div class="dashboard">
            <div class="dashboard-header">
                <h2>幻灵排行榜</h2>
                <button id="logout-btn" class="btn btn-warning">退出登录</button>
            </div>
            <div class="btn-group">
                ${O.map(t=>`<button class="btn btn-warning tab-btn" data-view="${t.key}">${t.label}</button>
                `).join("")}
            </div>
            <div id="content" class="content"></div>
        </div>
    `;const r=document.getElementById("content");document.querySelectorAll(".tab-btn").forEach(t=>{t.addEventListener("click",()=>{const o=t.dataset.view;u(o,r)})}),document.getElementById("logout-btn").addEventListener("click",()=>{w(),y(e)}),u("personal",r)}function u(e,r){switch(document.querySelectorAll(".tab-btn").forEach(t=>{t.classList.toggle("active",t.dataset.view===e)}),r.innerHTML="<p>加载中...</p>",e){case"personal":_(r);break;case"hongli":T(r);break;case"deed":E(r);break;case"money":S(r);break;case"petAll":k(r);break;case"petEvolution":H(r);break;case"petNonEvolution":I(r);break}}function y(e){e.innerHTML=`
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
    `;const r=document.getElementById("login-form"),t=document.getElementById("login-error");r.addEventListener("submit",async o=>{o.preventDefault();const d=document.getElementById("account").value,n=document.getElementById("password").value;try{const a=await f.login({account:d,password:n});v({token:a.token,userId:a.user.id,accountId:a.user.account_id,name:a.user.name}),p(e)}catch(a){t.textContent=a.message}})}function x(){const e=document.getElementById("app");m()?p(e):y(e)}x();
