(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();const S="/api";async function s(e,d={}){const t=localStorage.getItem("hlyx_token")||"",n=await(await fetch(S+e,{...d,headers:{"Content-Type":"application/json",Authorization:t,...d.headers}})).json();if(n.code!==0)throw new Error(n.msg||"请求失败");return n.data}const T={login(e){return s("/auth/login",{method:"POST",body:JSON.stringify(e)})}},i={userLeaderboard(e){return s("/user/leaderboard",{method:"POST",body:JSON.stringify({type:e})})},petLeaderboard(e){return s("/pet/leaderboard",{method:"POST",body:JSON.stringify({type:e})})}},h={info(e){return s("/user/info",{method:"POST",body:JSON.stringify(e)})},equipment(e){return s("/user/equipment",{method:"POST",body:JSON.stringify({user_id:e})})},backpack(e){return s("/user/backpack",{method:"POST",body:JSON.stringify({user_id:e})})},pets(e){return s("/user/pets",{method:"POST",body:JSON.stringify({user_id:e})})}},p="hlyx_session";function v(){const e=localStorage.getItem(p);return e?JSON.parse(e):null}function M(e){localStorage.setItem(p,JSON.stringify(e)),localStorage.setItem("hlyx_token",e.token)}function _(){localStorage.removeItem(p),localStorage.removeItem("hlyx_token")}const O={0:{0:"凡人",1:"散仙"},1:{0:"凡人",1:"散仙",2:"地仙",3:"天仙",4:"大罗金仙",15:"通灵天神",25:"巡游天神",35:"功德天神",45:"火淬天神",55:"尚武天神"},2:{0:"凡人",1:"散仙",2:"夜叉",3:"阿修罗",4:"魔神",15:"摄魂魔尊",25:"堕天魔尊",35:"泯灭魔尊",65:"幻变魔尊",75:"嗜血魔尊"}};function b(e){var r;const d=e%10,t=Math.floor(e/1e3);return((r=O[d])==null?void 0:r[t])||"未知"}function u(e){return Math.floor(e%1e3/10)}function x(e){return e<18?`Man0${Math.floor(e/3+1)}`:e<36&&e>17?`Woman0${Math.floor(e/3-5)}`:e===190?"Man07":e===191?"Man08":e===192?"Woman07":e===193?"Woman08":""}function m(e,d,t){const r=x(e),n=d?d[0]:"?";return`
        <span class="avatar" style="width:${t}px;height:${t}px;line-height:${t}px;" data-initial="${n}">
            <img src="/img/${r}.bmp" width="${t}" onerror="this.style.display='none'" />
        </span>
    `}async function A(e){try{const d=await i.userLeaderboard("hongli");e.innerHTML=`
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
                    ${d.map(t=>`
                        <tr>
                            <td>${t.rank}</td>
                            <td>${t.name}</td>
                            <td>${m(t.look,t.name,45)}</td>
                            <td>${t.level}</td>
                            <td>${b(t.metempsychosis)}[${u(t.metempsychosis)}]</td>
                            <td>${t.hongli}</td>
                            <td>${t.degree_lev}</td>
                            <td>${t.money}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `}catch(d){e.innerHTML=`<p class="error">${d.message}</p>`}}async function B(e){try{const d=await i.userLeaderboard("deed");e.innerHTML=`
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
                    ${d.map(t=>`
                        <tr>
                            <td>${t.rank}</td>
                            <td>${t.name}</td>
                            <td>${m(t.look,t.name,45)}</td>
                            <td>${t.level}</td>
                            <td>${b(t.metempsychosis)}[${u(t.metempsychosis)}]</td>
                            <td>${t.deed}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `}catch(d){e.innerHTML=`<p class="error">${d.message}</p>`}}async function H(e){try{const d=await i.userLeaderboard("money");e.innerHTML=`
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
                    ${d.map(t=>`
                        <tr>
                            <td>${t.rank}</td>
                            <td>${t.name}</td>
                            <td>${m(t.look,t.name,45)}</td>
                            <td>${t.level}</td>
                            <td>${b(t.metempsychosis)}[${u(t.metempsychosis)}]</td>
                            <td>${t.total_money}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `}catch(d){e.innerHTML=`<p class="error">${d.message}</p>`}}async function N(e){try{const d=await i.petLeaderboard("all");e.innerHTML=`
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
                    ${d.map(t=>`
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
        `}catch(d){e.innerHTML=`<p class="error">${d.message}</p>`}}async function P(e){try{const d=await i.petLeaderboard("nonEvolution");e.innerHTML=`
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
                    ${d.map(t=>`
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
        `}catch(d){e.innerHTML=`<p class="error">${d.message}</p>`}}function q(e,d){return`
        <div id="item-modal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${e}</h3>
                    <button id="modal-close" class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    ${d}
                </div>
            </div>
        </div>
    `}function o(e,d){let t=document.getElementById("item-modal");if(t)t.querySelector(".modal-header h3").textContent=e,t.querySelector(".modal-body").innerHTML=d;else{const a=document.createElement("div");a.innerHTML=q(e,d),document.body.appendChild(a.firstElementChild)}t=document.getElementById("item-modal");const r=document.getElementById("modal-close"),n=()=>t==null?void 0:t.remove();r.addEventListener("click",n),t.addEventListener("click",a=>{a.target===t&&n()})}function j(e){if(e.length===0)return"<p>暂无装备</p>";const d={weapon:"武器",armor:"衣服",shoes:"鞋子",treasure0:"饰品1",treasure1:"饰品2"};return`
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
                ${e.map(t=>`
                    <tr>
                        <td>${d[t.slot]||t.slot}</td>
                        <td>${t.name}</td>
                        <td>${t.life}</td>
                        <td>${t.power}</td>
                        <td>${t.attack}</td>
                        <td>${t.defence}</td>
                        <td>${t.dexterity}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `}function C(e){return e.length===0?"<p>背包为空</p>":`
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
                ${e.map(d=>`
                    <tr>
                        <td>${d.name}</td>
                        <td>${d.life}</td>
                        <td>${d.power}</td>
                        <td>${d.attack}</td>
                        <td>${d.defence}</td>
                        <td>${d.dexterity}</td>
                        <td>${d.inventer_name||"-"}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `}function J(e){return e.length===0?"<p>暂无宠物</p>":`
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
                ${e.map(d=>`
                    <tr style="${d.isActive?"background: rgba(240, 173, 78, 0.15);":""}">
                        <td>${d.name}</td>
                        <td>${d.level}</td>
                        <td>${d.life}</td>
                        <td>${d.attack}</td>
                        <td>${d.defence}</td>
                        <td>${d.dexterity}</td>
                        <td>${d.grow_rate}</td>
                        <td>${d.isActive?"⭐ 出征":"-"}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `}async function D(e){try{const d=v();if(!d){e.innerHTML='<p class="error">未登录</p>';return}const t=await h.info({acc_id:d.accountId,user_id:d.userId});e.innerHTML=`
            <div class="personal-info">
                <div class="info-header">
                    ${m(t.look,t.name,80)}
                    <div class="info-title">
                        <h3>${t.name}</h3>
                        <p>${b(t.metempsychosis)}[${u(t.metempsychosis)}]</p>
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
                            <td>角色ID</td><td>${t.id}</td>
                            <td>账号ID</td><td>${t.account_id}</td>
                        </tr>
                        <tr>
                            <td>等级</td><td>${t.level}</td>
                            <td>生命值</td><td>${t.life}</td>
                        </tr>
                        <tr>
                            <td>内力</td><td>${t.power}</td>
                            <td>幻币</td><td>${t.money}</td>
                        </tr>
                        <tr>
                            <td>存款</td><td>${t.money_saved}</td>
                            <td>声望</td><td>${t.repute}</td>
                        </tr>
                        <tr>
                            <td>修为</td><td>${t.degree_lev}</td>
                            <td>经验</td><td>${t.exp}</td>
                        </tr>
                        <tr>
                            <td>称号</td><td>${t.monicker}</td>
                            <td>配偶</td><td>${t.mate}</td>
                        </tr>
                        <tr>
                            <td>宠物数量</td><td>${t.pet_count}</td>
                            <td>技能数量</td><td>${t.skill_count}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `,document.getElementById("btn-equipment").addEventListener("click",async()=>{o("装备","<p>加载中...</p>");try{const r=await h.equipment(d.userId);o("装备",j(r))}catch(r){o("装备",`<p class="error">${r.message}</p>`)}}),document.getElementById("btn-backpack").addEventListener("click",async()=>{o("背包物品","<p>加载中...</p>");try{const r=await h.backpack(d.userId);o("背包物品",C(r))}catch(r){o("背包物品",`<p class="error">${r.message}</p>`)}}),document.getElementById("btn-pets").addEventListener("click",async()=>{o("宠物","<p>加载中...</p>");try{const r=await h.pets(d.userId);o("宠物",J(r))}catch(r){o("宠物",`<p class="error">${r.message}</p>`)}})}catch(d){e.innerHTML=`<p class="error">${d.message}</p>`}}const F=[{key:"personal",label:"个人信息"},{key:"hongli",label:"人物红利榜"},{key:"deed",label:"人物功德榜"},{key:"money",label:"人物幻币榜"},{key:"petAll",label:"所有宠物总榜"},{key:"petNonEvolution",label:"不可进化宠榜"}];function w(e){e.innerHTML=`
        <div class="dashboard">
            <div class="dashboard-header">
                <h2>幻灵排行榜</h2>
                <button id="logout-btn" class="btn btn-warning">退出登录</button>
            </div>
            <div class="btn-group">
                ${F.map(t=>`<button class="btn btn-warning tab-btn" data-view="${t.key}">${t.label}</button>
                `).join("")}
            </div>
            <div id="content" class="content"></div>
        </div>
    `;const d=document.getElementById("content");document.querySelectorAll(".tab-btn").forEach(t=>{t.addEventListener("click",()=>{const r=t.dataset.view;g(r,d)})}),document.getElementById("logout-btn").addEventListener("click",()=>{_(),E(e)}),g("personal",d)}function g(e,d){switch(document.querySelectorAll(".tab-btn").forEach(t=>{t.classList.toggle("active",t.dataset.view===e)}),d.innerHTML="<p>加载中...</p>",e){case"personal":D(d);break;case"hongli":A(d);break;case"deed":B(d);break;case"money":H(d);break;case"petAll":N(d);break;case"petNonEvolution":P(d);break}}const k="hlyx_remember",y="hlyx_credentials";function K(){try{const e=localStorage.getItem(y);if(!e)return null;const d=atob(e),[t,r]=d.split(":");return t!==void 0&&r!==void 0?{account:t,password:r}:null}catch{return null}}function R(e,d){localStorage.setItem(y,btoa(`${e}:${d}`)),localStorage.setItem(k,"1")}function U(){localStorage.removeItem(y),localStorage.removeItem(k)}function E(e){const d=K(),t=d?d.account:"",r=d?d.password:"",n=d?"checked":"";e.innerHTML=`
        <div class="login-box">
            <h2>幻灵游戏登录</h2>
            <form id="login-form">
                <div class="form-group">
                    <label>账号</label>
                    <input type="text" id="account" value="${t}" required />
                </div>
                <div class="form-group">
                    <label>密码</label>
                    <input type="password" id="password" value="${r}" required />
                </div>
                <div class="form-group remember-group">
                    <label class="remember-label">
                        <input type="checkbox" id="remember" ${n} />
                        记住密码
                    </label>
                </div>
                <button type="submit" class="btn btn-primary">登录</button>
                <div id="login-error" class="error"></div>
            </form>
        </div>
    `;const a=document.getElementById("login-form"),c=document.getElementById("login-error");a.addEventListener("submit",async L=>{L.preventDefault();const $=document.getElementById("account").value,f=document.getElementById("password").value,I=document.getElementById("remember").checked;try{const l=await T.login({account:$,password:f});M({token:l.token,userId:l.user.id,accountId:l.user.account_id,name:l.user.name}),I?R($,f):U(),w(e)}catch(l){c.textContent=l.message}})}function V(){const e=document.getElementById("app");v()?w(e):E(e)}V();
