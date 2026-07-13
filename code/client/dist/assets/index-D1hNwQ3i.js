(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))o(d);new MutationObserver(d=>{for(const a of d)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function t(d){const a={};return d.integrity&&(a.integrity=d.integrity),d.referrerPolicy&&(a.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?a.credentials="include":d.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(d){if(d.ep)return;d.ep=!0;const a=t(d);fetch(d.href,a)}})();const T="/api";async function l(e,n={}){const t=localStorage.getItem("hlyx_token")||"",d=await(await fetch(T+e,{...n,headers:{"Content-Type":"application/json",Authorization:t,...n.headers}})).json();if(d.code!==0)throw new Error(d.msg||"请求失败");return d.data}const M={login(e){return l("/auth/login",{method:"POST",body:JSON.stringify(e)})}},p={userLeaderboard(e){return l("/user/leaderboard",{method:"POST",body:JSON.stringify({type:e})})},petLeaderboard(e){return l("/pet/leaderboard",{method:"POST",body:JSON.stringify({type:e})})}},h={info(e){return l("/user/info",{method:"POST",body:JSON.stringify(e)})},equipment(e){return l("/user/equipment",{method:"POST",body:JSON.stringify({user_id:e})})},backpack(e){return l("/user/backpack",{method:"POST",body:JSON.stringify({user_id:e})})},pets(e){return l("/user/pets",{method:"POST",body:JSON.stringify({user_id:e})})},baobaonang(e){return l("/user/baobaonang",{method:"POST",body:JSON.stringify({item_ids:e})})},qiankundai(e){return l("/user/qiankundai",{method:"POST",body:JSON.stringify({item_ids:e})})}},f="hlyx_session";function E(){const e=localStorage.getItem(f);return e?JSON.parse(e):null}function _(e){localStorage.setItem(f,JSON.stringify(e)),localStorage.setItem("hlyx_token",e.token)}function O(){localStorage.removeItem(f),localStorage.removeItem("hlyx_token")}const B={0:{0:"凡人",1:"散仙"},1:{0:"凡人",1:"散仙",2:"地仙",3:"天仙",4:"大罗金仙",15:"通灵天神",25:"巡游天神",35:"功德天神",45:"火淬天神",55:"尚武天神"},2:{0:"凡人",1:"散仙",2:"夜叉",3:"阿修罗",4:"魔神",15:"摄魂魔尊",25:"堕天魔尊",35:"泯灭魔尊",65:"幻变魔尊",75:"嗜血魔尊"}};function y(e){var o;const n=e%10,t=Math.floor(e/1e3);return((o=B[n])==null?void 0:o[t])||"未知"}function $(e){return Math.floor(e%1e3/10)}function N(e){return e<18?`Man0${Math.floor(e/3+1)}`:e<36&&e>17?`Woman0${Math.floor(e/3-5)}`:e===190?"Man07":e===191?"Man08":e===192?"Woman07":e===193?"Woman08":""}function g(e,n,t){const o=N(e),d=n?n[0]:"?";return`
        <span class="avatar" style="width:${t}px;height:${t}px;line-height:${t}px;" data-initial="${d}">
            <img src="/img/${o}.bmp" width="${t}" onerror="this.style.display='none'" />
        </span>
    `}async function x(e){try{const n=await p.userLeaderboard("hongli");e.innerHTML=`
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
                    ${n.map(t=>`
                        <tr>
                            <td>${t.rank}</td>
                            <td>${t.name}</td>
                            <td>${g(t.look,t.name,45)}</td>
                            <td>${t.level}</td>
                            <td>${y(t.metempsychosis)}[${$(t.metempsychosis)}]</td>
                            <td>${t.hongli}</td>
                            <td>${t.degree_lev}</td>
                            <td>${t.money}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `}catch(n){e.innerHTML=`<p class="error">${n.message}</p>`}}async function q(e){try{const n=await p.userLeaderboard("deed");e.innerHTML=`
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
                    ${n.map(t=>`
                        <tr>
                            <td>${t.rank}</td>
                            <td>${t.name}</td>
                            <td>${g(t.look,t.name,45)}</td>
                            <td>${t.level}</td>
                            <td>${y(t.metempsychosis)}[${$(t.metempsychosis)}]</td>
                            <td>${t.deed}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `}catch(n){e.innerHTML=`<p class="error">${n.message}</p>`}}async function A(e){try{const n=await p.userLeaderboard("money");e.innerHTML=`
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
                    ${n.map(t=>`
                        <tr>
                            <td>${t.rank}</td>
                            <td>${t.name}</td>
                            <td>${g(t.look,t.name,45)}</td>
                            <td>${t.level}</td>
                            <td>${y(t.metempsychosis)}[${$(t.metempsychosis)}]</td>
                            <td>${t.total_money}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `}catch(n){e.innerHTML=`<p class="error">${n.message}</p>`}}async function H(e){try{const n=await p.petLeaderboard("all");e.innerHTML=`
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
                    ${n.map(t=>`
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
        `}catch(n){e.innerHTML=`<p class="error">${n.message}</p>`}}async function P(e){try{const n=await p.petLeaderboard("nonEvolution");e.innerHTML=`
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
                    ${n.map(t=>`
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
        `}catch(n){e.innerHTML=`<p class="error">${n.message}</p>`}}function j(e,n){return`
        <div id="item-modal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${e}</h3>
                    <button id="modal-close" class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    ${n}
                </div>
            </div>
        </div>
    `}function s(e,n){let t=document.getElementById("item-modal");if(t)t.querySelector(".modal-header h3").textContent=e,t.querySelector(".modal-body").innerHTML=n;else{const a=document.createElement("div");a.innerHTML=j(e,n),document.body.appendChild(a.firstElementChild)}t=document.getElementById("item-modal");const o=document.getElementById("modal-close"),d=()=>t==null?void 0:t.remove();o.addEventListener("click",d),t.addEventListener("click",a=>{a.target===t&&d()})}function D(e){if(e.length===0)return"<p>暂无装备</p>";const n={weapon:"武器",armor:"衣服",shoes:"鞋子",treasure0:"饰品1",treasure1:"饰品2"};return`
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
                        <td>${n[t.slot]||t.slot}</td>
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
    `}function J(e){return e.length===0?"<p>背包为空</p>":`
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
                ${e.map(n=>`
                    <tr>
                        <td>${n.name}</td>
                        <td>${n.life}</td>
                        <td>${n.power}</td>
                        <td>${n.attack}</td>
                        <td>${n.defence}</td>
                        <td>${n.dexterity}</td>
                        <td>${n.inventer_name||"-"}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `}function C(e){return e.length===0?"<p>暂无宠物</p>":`
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
                ${e.map(n=>`
                    <tr style="${n.isActive?"background: rgba(240, 173, 78, 0.15);":""}">
                        <td>${n.name}</td>
                        <td>${n.level}</td>
                        <td>${n.life}</td>
                        <td>${n.attack}</td>
                        <td>${n.defence}</td>
                        <td>${n.dexterity}</td>
                        <td>${n.grow_rate}</td>
                        <td>${n.isActive?"⭐ 出征":"-"}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `}function K(e){return e.length===0?"<p>没有百宝囊数据</p>":e.map((n,t)=>{const o=n.items.filter(a=>a.item),d=o.length===0;return`
            <div class="baobaonang-section">
                <h4>百宝囊${t+1}</h4>
                ${d?"<p>空</p>":`
                    <table class="table table-bordered table-responsive item-table">
                        <thead>
                            <tr>
                                <th>槽位</th>
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
                            ${o.map(a=>`
                                <tr>
                                    <td>${a.slot+1}</td>
                                    <td>${a.item.name||"-"}</td>
                                    <td>${a.item.life||0}</td>
                                    <td>${a.item.power||0}</td>
                                    <td>${a.item.attack||0}</td>
                                    <td>${a.item.defence||0}</td>
                                    <td>${a.item.dexterity||0}</td>
                                    <td>${a.item.inventer_name||"-"}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                `}
            </div>
        `}).join("")}function R(e){return e.length===0?"<p>没有乾坤袋数据</p>":e.map((n,t)=>{const o=n.items.filter(a=>a.pet),d=o.length===0;return`
            <div class="baobaonang-section">
                <h4>乾坤袋${t+1}</h4>
                ${d?"<p>空</p>":`
                    <table class="table table-bordered table-responsive item-table">
                        <thead>
                            <tr>
                                <th>槽位</th>
                                <th>名字</th>
                                <th>等级</th>
                                <th>生命</th>
                                <th>攻击</th>
                                <th>防御</th>
                                <th>敏捷</th>
                                <th>成长率</th>
                                <th>幻化</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${o.map(a=>`
                                <tr>
                                    <td>${a.slot+1}</td>
                                    <td>${a.pet.name||"-"}</td>
                                    <td>${a.pet.level||0}</td>
                                    <td>${a.pet.life||0}</td>
                                    <td>${a.pet.attack||0}</td>
                                    <td>${a.pet.defence||0}</td>
                                    <td>${a.pet.dexterity||0}</td>
                                    <td>${a.pet.grow_rate||0}</td>
                                    <td>${a.pet.generation||0}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                `}
            </div>
        `}).join("")}async function F(e){try{const n=E();if(!n){e.innerHTML='<p class="error">未登录</p>';return}const[t,o]=await Promise.all([h.info({acc_id:n.accountId,user_id:n.userId}),h.backpack(n.userId)]),a=o.filter(r=>(r.name||"").trim()==="※百宝囊").map(r=>r.id),i=a.length>0,u=o.filter(r=>(r.name||"").trim()==="※乾坤袋").map(r=>r.id),m=u.length>0,b=[];i&&b.push('<button id="btn-baobaonang" class="btn btn-primary">百宝囊</button>'),m&&b.push('<button id="btn-qiankundai" class="btn btn-primary">乾坤袋</button>');const c=b.length>0?`<div class="btn-group item-actions three-col">
                ${b.join(`
`)}
               </div>`:"";e.innerHTML=`
            <div class="personal-info">
                <div class="info-header">
                    ${g(t.look,t.name,80)}
                    <div class="info-title">
                        <h3>${t.name}</h3>
                        <p>${y(t.metempsychosis)}[${$(t.metempsychosis)}]</p>
                    </div>
                </div>
                <div class="btn-group item-actions three-col">
                    <button id="btn-equipment" class="btn btn-primary">装备</button>
                    <button id="btn-backpack" class="btn btn-primary">背包物品</button>
                    <button id="btn-pets" class="btn btn-primary">宠物</button>
                </div>
                ${c}
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
        `,document.getElementById("btn-equipment").addEventListener("click",async()=>{s("装备","<p>加载中...</p>");try{const r=await h.equipment(n.userId);s("装备",D(r))}catch(r){s("装备",`<p class="error">${r.message}</p>`)}}),document.getElementById("btn-backpack").addEventListener("click",async()=>{s("背包物品","<p>加载中...</p>");try{const r=await h.backpack(n.userId);s("背包物品",J(r))}catch(r){s("背包物品",`<p class="error">${r.message}</p>`)}}),document.getElementById("btn-pets").addEventListener("click",async()=>{s("宠物","<p>加载中...</p>");try{const r=await h.pets(n.userId);s("宠物",C(r))}catch(r){s("宠物",`<p class="error">${r.message}</p>`)}}),i&&document.getElementById("btn-baobaonang").addEventListener("click",async()=>{s("百宝囊","<p>加载中...</p>");try{const r=await h.baobaonang(a);s("百宝囊",K(r))}catch(r){s("百宝囊",`<p class="error">${r.message}</p>`)}}),m&&document.getElementById("btn-qiankundai").addEventListener("click",async()=>{s("乾坤袋","<p>加载中...</p>");try{const r=await h.qiankundai(u);s("乾坤袋",R(r))}catch(r){s("乾坤袋",`<p class="error">${r.message}</p>`)}})}catch(n){e.innerHTML=`<p class="error">${n.message}</p>`}}const U=[{key:"personal",label:"个人信息"},{key:"hongli",label:"人物红利榜"},{key:"deed",label:"人物功德榜"},{key:"money",label:"人物幻币榜"},{key:"petAll",label:"所有宠物总榜"},{key:"petNonEvolution",label:"不可进化宠榜"}];function I(e){e.innerHTML=`
        <div class="dashboard">
            <div class="dashboard-header">
                <h2>幻灵排行榜</h2>
                <button id="logout-btn" class="btn btn-warning">退出登录</button>
            </div>
            <div class="btn-group">
                ${U.map(t=>`<button class="btn btn-warning tab-btn" data-view="${t.key}">${t.label}</button>
                `).join("")}
            </div>
            <div id="content" class="content"></div>
        </div>
    `;const n=document.getElementById("content");document.querySelectorAll(".tab-btn").forEach(t=>{t.addEventListener("click",()=>{const o=t.dataset.view;w(o,n)})}),document.getElementById("logout-btn").addEventListener("click",()=>{O(),S(e)}),w("personal",n)}function w(e,n){switch(document.querySelectorAll(".tab-btn").forEach(t=>{t.classList.toggle("active",t.dataset.view===e)}),n.innerHTML="<p>加载中...</p>",e){case"personal":F(n);break;case"hongli":x(n);break;case"deed":q(n);break;case"money":A(n);break;case"petAll":H(n);break;case"petNonEvolution":P(n);break}}const L="hlyx_remember",v="hlyx_credentials";function V(){try{const e=localStorage.getItem(v);if(!e)return null;const n=atob(e),[t,o]=n.split(":");return t!==void 0&&o!==void 0?{account:t,password:o}:null}catch{return null}}function W(e,n){localStorage.setItem(v,btoa(`${e}:${n}`)),localStorage.setItem(L,"1")}function Y(){localStorage.removeItem(v),localStorage.removeItem(L)}function S(e){const n=V(),t=n?n.account:"",o=n?n.password:"",d=n?"checked":"";e.innerHTML=`
        <div class="login-box">
            <h2>幻灵游戏登录</h2>
            <form id="login-form">
                <div class="form-group">
                    <label>账号</label>
                    <input type="text" id="account" value="${t}" required />
                </div>
                <div class="form-group">
                    <label>密码</label>
                    <input type="password" id="password" value="${o}" required />
                </div>
                <div class="form-group remember-group">
                    <label class="remember-label">
                        <input type="checkbox" id="remember" ${d} />
                        记住密码
                    </label>
                </div>
                <button type="submit" class="btn btn-primary">登录</button>
                <div id="login-error" class="error"></div>
            </form>
        </div>
    `;const a=document.getElementById("login-form"),i=document.getElementById("login-error");a.addEventListener("submit",async k=>{k.preventDefault();const u=document.getElementById("account").value,m=document.getElementById("password").value,b=document.getElementById("remember").checked;try{const c=await M.login({account:u,password:m});_({token:c.token,userId:c.user.id,accountId:c.user.account_id,name:c.user.name}),b?W(u,m):Y(),I(e)}catch(c){i.textContent=c.message}})}function Q(){const e=document.getElementById("app");E()?I(e):S(e)}Q();
