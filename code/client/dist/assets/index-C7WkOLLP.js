(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))r(d);new MutationObserver(d=>{for(const a of d)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function e(d){const a={};return d.integrity&&(a.integrity=d.integrity),d.referrerPolicy&&(a.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?a.credentials="include":d.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(d){if(d.ep)return;d.ep=!0;const a=e(d);fetch(d.href,a)}})();const B="/api";async function l(t,n={}){const e=localStorage.getItem("hlyx_token")||"",d=await(await fetch(B+t,{...n,headers:{"Content-Type":"application/json",Authorization:e,...n.headers}})).json();if(d.code!==0)throw new Error(d.msg||"请求失败");return d.data}const j={login(t){return l("/auth/login",{method:"POST",body:JSON.stringify(t)})}},m={userLeaderboard(t){return l("/user/leaderboard",{method:"POST",body:JSON.stringify({type:t})})},petLeaderboard(t){return l("/pet/leaderboard",{method:"POST",body:JSON.stringify({type:t})})}},c={info(t){return l("/user/info",{method:"POST",body:JSON.stringify(t)})},equipment(t){return l("/user/equipment",{method:"POST",body:JSON.stringify({user_id:t})})},backpack(t){return l("/user/backpack",{method:"POST",body:JSON.stringify({user_id:t})})},pets(t){return l("/user/pets",{method:"POST",body:JSON.stringify({user_id:t})})},baobaonang(t){return l("/user/baobaonang",{method:"POST",body:JSON.stringify({item_ids:t})})},qiankundai(t){return l("/user/qiankundai",{method:"POST",body:JSON.stringify({item_ids:t})})},dangpu(t){return l("/user/dangpu",{method:"POST",body:JSON.stringify({user_id:t})})},chuwugui(t){return l("/user/chuwugui",{method:"POST",body:JSON.stringify({user_id:t})})},gangstatus(t){return l("/user/gangstatus",{method:"POST",body:JSON.stringify({user_id:t})})},gangxiangzi(t){return l("/user/gangxiangzi",{method:"POST",body:JSON.stringify({user_id:t})})},gangxunshoushi(t){return l("/user/gangxunshoushi",{method:"POST",body:JSON.stringify({user_id:t})})},petshop(t){return l("/user/petshop",{method:"POST",body:JSON.stringify({user_id:t})})}},k="hlyx_session";function E(){const t=localStorage.getItem(k);return t?JSON.parse(t):null}function q(t){localStorage.setItem(k,JSON.stringify(t)),localStorage.setItem("hlyx_token",t.token)}function P(){localStorage.removeItem(k),localStorage.removeItem("hlyx_token")}const A={0:{0:"凡人",1:"散仙"},1:{0:"凡人",1:"散仙",2:"地仙",3:"天仙",4:"大罗金仙",15:"通灵天神",25:"巡游天神",35:"功德天神",45:"火淬天神",55:"尚武天神"},2:{0:"凡人",1:"散仙",2:"夜叉",3:"阿修罗",4:"魔神",15:"摄魂魔尊",25:"堕天魔尊",35:"泯灭魔尊",65:"幻变魔尊",75:"嗜血魔尊"}};function g(t){var r;const n=t%10,e=Math.floor(t/1e3);return((r=A[n])==null?void 0:r[e])||"未知"}function y(t){return Math.floor(t%1e3/10)}function H(t){return t<18?`Man0${Math.floor(t/3+1)}`:t<36&&t>17?`Woman0${Math.floor(t/3-5)}`:t===190?"Man07":t===191?"Man08":t===192?"Woman07":t===193?"Woman08":""}function $(t,n,e){const r=H(t),d=n?n[0]:"?";return`
        <span class="avatar" style="width:${e}px;height:${e}px;line-height:${e}px;" data-initial="${d}">
            <img src="/img/${r}.bmp" width="${e}" onerror="this.style.display='none'" />
        </span>
    `}async function J(t){try{const n=await m.userLeaderboard("hongli");t.innerHTML=`
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
                    ${n.map(e=>`
                        <tr>
                            <td>${e.rank}</td>
                            <td>${e.name}</td>
                            <td>${$(e.look,e.name,45)}</td>
                            <td>${e.level}</td>
                            <td>${g(e.metempsychosis)}[${y(e.metempsychosis)}]</td>
                            <td>${e.hongli}</td>
                            <td>${e.degree_lev}</td>
                            <td>${e.money}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `}catch(n){t.innerHTML=`<p class="error">${n.message}</p>`}}async function C(t){try{const n=await m.userLeaderboard("deed");t.innerHTML=`
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
                    ${n.map(e=>`
                        <tr>
                            <td>${e.rank}</td>
                            <td>${e.name}</td>
                            <td>${$(e.look,e.name,45)}</td>
                            <td>${e.level}</td>
                            <td>${g(e.metempsychosis)}[${y(e.metempsychosis)}]</td>
                            <td>${e.deed}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `}catch(n){t.innerHTML=`<p class="error">${n.message}</p>`}}async function D(t){try{const n=await m.userLeaderboard("money");t.innerHTML=`
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
                    ${n.map(e=>`
                        <tr>
                            <td>${e.rank}</td>
                            <td>${e.name}</td>
                            <td>${$(e.look,e.name,45)}</td>
                            <td>${e.level}</td>
                            <td>${g(e.metempsychosis)}[${y(e.metempsychosis)}]</td>
                            <td>${e.total_money}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `}catch(n){t.innerHTML=`<p class="error">${n.message}</p>`}}async function K(t){try{const n=await m.petLeaderboard("all");t.innerHTML=`
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
                    ${n.map(e=>`
                        <tr>
                            <td>${e.rank}</td>
                            <td>${e.owner_name}</td>
                            <td>${e.pet_name}</td>
                            <td>${e.className}</td>
                            <td>${e.level}</td>
                            <td>${e.grow.toFixed(2)}</td>
                            <td>${e.generation}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `}catch(n){t.innerHTML=`<p class="error">${n.message}</p>`}}async function R(t){try{const n=await m.petLeaderboard("nonEvolution");t.innerHTML=`
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
                    ${n.map(e=>`
                        <tr>
                            <td>${e.rank}</td>
                            <td>${e.owner_name}</td>
                            <td>${e.pet_name}</td>
                            <td>${e.className}</td>
                            <td>${e.level}</td>
                            <td>${e.grow.toFixed(2)}</td>
                            <td>${e.generation}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `}catch(n){t.innerHTML=`<p class="error">${n.message}</p>`}}function G(t,n){return`
        <div id="item-modal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${t}</h3>
                    <button id="modal-close" class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    ${n}
                </div>
            </div>
        </div>
    `}function s(t,n){let e=document.getElementById("item-modal");if(e)e.querySelector(".modal-header h3").textContent=t,e.querySelector(".modal-body").innerHTML=n;else{const a=document.createElement("div");a.innerHTML=G(t,n),document.body.appendChild(a.firstElementChild)}e=document.getElementById("item-modal");const r=document.getElementById("modal-close"),d=()=>e==null?void 0:e.remove();r.addEventListener("click",d),e.addEventListener("click",a=>{a.target===e&&d()})}function F(t){if(t.length===0)return"<p>暂无装备</p>";const n={weapon:"武器",armor:"衣服",shoes:"鞋子",treasure0:"饰品1",treasure1:"饰品2"};return`
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
                ${t.map(e=>`
                    <tr>
                        <td>${n[e.slot]||e.slot}</td>
                        <td>${e.name}</td>
                        <td>${e.life}</td>
                        <td>${e.power}</td>
                        <td>${e.attack}</td>
                        <td>${e.defence}</td>
                        <td>${e.dexterity}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `}function U(t){return t.length===0?"<p>背包为空</p>":`
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
                ${t.map(n=>`
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
    `}function W(t){return t.length===0?"<p>暂无宠物</p>":`
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
                ${t.map(n=>`
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
    `}function z(t){return t.length===0?"<p>没有百宝囊数据</p>":t.map((n,e)=>{const r=n.items.filter(a=>a.item),d=r.length===0;return`
            <div class="baobaonang-section">
                <h4>百宝囊${e+1}</h4>
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
                            ${r.map(a=>`
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
        `}).join("")}function V(t){return t.length===0?"<p>没有乾坤袋数据</p>":t.map((n,e)=>{const r=n.items.filter(a=>a.pet),d=r.length===0;return`
            <div class="baobaonang-section">
                <h4>乾坤袋${e+1}</h4>
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
                            ${r.map(a=>`
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
        `}).join("")}function Y(t){return t.length===0?"<p>没有当铺数据</p>":t.map((n,e)=>{const r=n.items.filter(a=>a.item),d=r.length===0;return`
            <div class="baobaonang-section">
                <h4>当铺${e+1}</h4>
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
                            ${r.map(a=>`
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
        `}).join("")}function Q(t){return t.length===0?"<p>没有储物柜数据</p>":t.map((n,e)=>{const r=n.items.filter(a=>a.item),d=r.length===0;return`
            <div class="baobaonang-section">
                <h4>储物柜${e+1}</h4>
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
                            ${r.map(a=>`
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
        `}).join("")}function X(t){return t.length===0?"<p>没有帮派箱子数据</p>":t.map((n,e)=>{const r=n.items.filter(a=>a.item),d=r.length===0;return`
            <div class="baobaonang-section">
                <h4>帮派箱子${e+1}</h4>
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
                            ${r.map(a=>`
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
        `}).join("")}function Z(t){return t.length===0?"<p>没有帮派驯兽师数据</p>":t.map((n,e)=>{const r=n.items.filter(a=>a.pet),d=r.length===0;return`
            <div class="baobaonang-section">
                <h4>帮派驯兽师${e+1}</h4>
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
                            ${r.map(a=>`
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
        `}).join("")}function tt(t){return t.length===0?"<p>没有宠物店数据</p>":t.map((n,e)=>{const r=n.items.filter(a=>a.pet),d=r.length===0;return`
            <div class="baobaonang-section">
                <h4>宠物店${e+1}</h4>
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
                            ${r.map(a=>`
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
        `}).join("")}async function et(t){try{const n=E();if(!n){t.innerHTML='<p class="error">未登录</p>';return}const[e,r,d]=await Promise.all([c.info({acc_id:n.accountId,user_id:n.userId}),c.backpack(n.userId),c.gangstatus(n.userId)]),a=d.hasGang,u=r.filter(o=>(o.name||"").trim()==="※百宝囊").map(o=>o.id),b=u.length>0,p=r.filter(o=>(o.name||"").trim()==="※乾坤袋").map(o=>o.id),h=p.length>0,v=['<button id="btn-dangpu" class="btn btn-primary">当铺</button>','<button id="btn-chuwugui" class="btn btn-primary">储物柜</button>','<button id="btn-petshop" class="btn btn-primary">宠物店</button>'];b&&v.push('<button id="btn-baobaonang" class="btn btn-primary">百宝囊</button>'),h&&v.push('<button id="btn-qiankundai" class="btn btn-primary">乾坤袋</button>');const N=`<div class="btn-group item-actions three-col">
            ${v.join(`
`)}
           </div>`,I=a?['<button id="btn-gangxiangzi" class="btn btn-primary">帮派箱子</button>','<button id="btn-gangxunshoushi" class="btn btn-primary">帮派驯兽师</button>']:[],_=I.length>0?`<div class="btn-group item-actions three-col">
            ${I.join(`
`)}
           </div>`:"";t.innerHTML=`
            <div class="personal-info">
                <div class="info-header">
                    ${$(e.look,e.name,80)}
                    <div class="info-title">
                        <h3>${e.name}</h3>
                        <p>${g(e.metempsychosis)}[${y(e.metempsychosis)}]</p>
                    </div>
                </div>
                <div class="btn-group item-actions three-col">
                    <button id="btn-equipment" class="btn btn-primary">装备</button>
                    <button id="btn-backpack" class="btn btn-primary">背包物品</button>
                    <button id="btn-pets" class="btn btn-primary">宠物</button>
                </div>
                ${N}
                ${_}
                <table class="table table-bordered info-table two-col">
                    <tbody>
                        <tr>
                            <td>角色ID</td><td>${e.id}</td>
                            <td>账号ID</td><td>${e.account_id}</td>
                        </tr>
                        <tr>
                            <td>等级</td><td>${e.level}</td>
                            <td>生命值</td><td>${e.life}</td>
                        </tr>
                        <tr>
                            <td>内力</td><td>${e.power}</td>
                            <td>幻币</td><td>${e.money}</td>
                        </tr>
                        <tr>
                            <td>存款</td><td>${e.money_saved}</td>
                            <td>声望</td><td>${e.repute}</td>
                        </tr>
                        <tr>
                            <td>修为</td><td>${e.degree_lev}</td>
                            <td>经验</td><td>${e.exp}</td>
                        </tr>
                        <tr>
                            <td>称号</td><td>${e.monicker}</td>
                            <td>配偶</td><td>${e.mate}</td>
                        </tr>
                        <tr>
                            <td>宠物数量</td><td>${e.pet_count}</td>
                            <td>技能数量</td><td>${e.skill_count}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `,document.getElementById("btn-equipment").addEventListener("click",async()=>{s("装备","<p>加载中...</p>");try{const o=await c.equipment(n.userId);s("装备",F(o))}catch(o){s("装备",`<p class="error">${o.message}</p>`)}}),document.getElementById("btn-backpack").addEventListener("click",async()=>{s("背包物品","<p>加载中...</p>");try{const o=await c.backpack(n.userId);s("背包物品",U(o))}catch(o){s("背包物品",`<p class="error">${o.message}</p>`)}}),document.getElementById("btn-pets").addEventListener("click",async()=>{s("宠物","<p>加载中...</p>");try{const o=await c.pets(n.userId);s("宠物",W(o))}catch(o){s("宠物",`<p class="error">${o.message}</p>`)}}),b&&document.getElementById("btn-baobaonang").addEventListener("click",async()=>{s("百宝囊","<p>加载中...</p>");try{const o=await c.baobaonang(u);s("百宝囊",z(o))}catch(o){s("百宝囊",`<p class="error">${o.message}</p>`)}}),h&&document.getElementById("btn-qiankundai").addEventListener("click",async()=>{s("乾坤袋","<p>加载中...</p>");try{const o=await c.qiankundai(p);s("乾坤袋",V(o))}catch(o){s("乾坤袋",`<p class="error">${o.message}</p>`)}}),document.getElementById("btn-dangpu").addEventListener("click",async()=>{s("当铺","<p>加载中...</p>");try{const o=await c.dangpu(n.userId);s("当铺",Y(o))}catch(o){s("当铺",`<p class="error">${o.message}</p>`)}}),document.getElementById("btn-chuwugui").addEventListener("click",async()=>{s("储物柜","<p>加载中...</p>");try{const o=await c.chuwugui(n.userId);s("储物柜",Q(o))}catch(o){s("储物柜",`<p class="error">${o.message}</p>`)}}),document.getElementById("btn-petshop").addEventListener("click",async()=>{s("宠物店","<p>加载中...</p>");try{const o=await c.petshop(n.userId);s("宠物店",tt(o))}catch(o){s("宠物店",`<p class="error">${o.message}</p>`)}}),a&&(document.getElementById("btn-gangxiangzi").addEventListener("click",async()=>{s("帮派箱子","<p>加载中...</p>");try{const o=await c.gangxiangzi(n.userId);s("帮派箱子",X(o))}catch(o){s("帮派箱子",`<p class="error">${o.message}</p>`)}}),document.getElementById("btn-gangxunshoushi").addEventListener("click",async()=>{s("帮派驯兽师","<p>加载中...</p>");try{const o=await c.gangxunshoushi(n.userId);s("帮派驯兽师",Z(o))}catch(o){s("帮派驯兽师",`<p class="error">${o.message}</p>`)}}))}catch(n){t.innerHTML=`<p class="error">${n.message}</p>`}}function L(t){return"children"in t}const T=[{key:"personal",label:"个人信息",icon:"👤"},{label:"人物排行榜",icon:"📊",children:[{key:"hongli",label:"人物红利榜"},{key:"deed",label:"人物功德榜"},{key:"money",label:"人物幻币榜"}]},{label:"宠物排行榜",icon:"🐾",children:[{key:"petAll",label:"宠物总榜"},{key:"petNonEvolution",label:"不可进化宠榜"}]}];function nt(t){for(const n of T)if(L(n)){const e=n.children.find(r=>r.key===t);if(e)return e.label}else if(n.key===t)return n.label;return""}function at(){return T.map(t=>L(t)?`
                <div class="menu-group" data-expanded="true">
                    <button class="menu-group-header">
                        <span class="menu-icon">${t.icon}</span>
                        <span class="menu-text">${t.label}</span>
                        <span class="menu-arrow">▼</span>
                    </button>
                    <div class="submenu">
                        ${t.children.map(n=>`
                            <button class="submenu-item" data-view="${n.key}" data-label="${n.label}">
                                ${n.label}
                            </button>
                        `).join("")}
                    </div>
                </div>
            `:`
            <button class="menu-item" data-view="${t.key}" data-label="${t.label}">
                <span class="menu-icon">${t.icon}</span>
                <span class="menu-text">${t.label}</span>
            </button>
        `).join("")}function x(t){const n=E(),e=(n==null?void 0:n.name)||"管理员";t.innerHTML=`
        <div class="admin-layout">
            <header class="admin-header">
                <div class="header-left">
                    <span class="admin-logo">🎮</span>
                    <span class="system-name">幻灵管理后台</span>
                </div>
                <div class="header-right">
                    <span class="current-user">${e}</span>
                    <button id="logout-btn" class="btn btn-logout">退出登录</button>
                </div>
            </header>
            <div class="admin-body">
                <aside class="admin-sidebar">
                    <nav class="admin-menu">
                        ${at()}
                    </nav>
                </aside>
                <main class="admin-main">
                    <div class="admin-main-header">
                        <h3 id="page-title">个人信息</h3>
                    </div>
                    <div id="content" class="admin-content"></div>
                </main>
            </div>
            <footer class="admin-footer">
                <span>幻灵管理后台 v1.0</span>
            </footer>
        </div>
    `;const r=document.getElementById("content"),d=document.getElementById("page-title");document.querySelectorAll(".menu-item[data-view]").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.view;w(i,r,d)})}),document.querySelectorAll(".menu-group-header").forEach(a=>{a.addEventListener("click",()=>{const i=a.closest(".menu-group"),u=i.dataset.expanded==="true";i.dataset.expanded=String(!u)})}),document.querySelectorAll(".submenu-item[data-view]").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.view;w(i,r,d)})}),document.getElementById("logout-btn").addEventListener("click",()=>{P(),M(t)}),w("personal",r,d)}function w(t,n,e){const r=nt(t);switch(e.textContent=r,document.querySelectorAll(".menu-item[data-view], .submenu-item[data-view]").forEach(d=>{const a=d.dataset.view===t;d.classList.toggle("active",a)}),document.querySelectorAll(".menu-group").forEach(d=>{const a=d.querySelector(".submenu-item.active")!==null,i=d.querySelector(".menu-group-header");i==null||i.classList.toggle("active",a)}),n.innerHTML="<p>加载中...</p>",t){case"personal":et(n);break;case"hongli":J(n);break;case"deed":C(n);break;case"money":D(n);break;case"petAll":K(n);break;case"petNonEvolution":R(n);break}}const O="hlyx_remember",S="hlyx_credentials";function dt(){try{const t=localStorage.getItem(S);if(!t)return null;const n=atob(t),[e,r]=n.split(":");return e!==void 0&&r!==void 0?{account:e,password:r}:null}catch{return null}}function rt(t,n){localStorage.setItem(S,btoa(`${t}:${n}`)),localStorage.setItem(O,"1")}function ot(){localStorage.removeItem(S),localStorage.removeItem(O)}function M(t){const n=dt(),e=n?n.account:"",r=n?n.password:"",d=n?"checked":"";t.innerHTML=`
        <div class="login-box">
            <h2>幻灵游戏登录</h2>
            <form id="login-form">
                <div class="form-group">
                    <label>账号</label>
                    <input type="text" id="account" value="${e}" required />
                </div>
                <div class="form-group">
                    <label>密码</label>
                    <input type="password" id="password" value="${r}" required />
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
    `;const a=document.getElementById("login-form"),i=document.getElementById("login-error");a.addEventListener("submit",async u=>{u.preventDefault();const b=document.getElementById("account").value,f=document.getElementById("password").value,p=document.getElementById("remember").checked;try{const h=await j.login({account:b,password:f});q({token:h.token,userId:h.user.id,accountId:h.user.account_id,name:h.user.name}),p?rt(b,f):ot(),x(t)}catch(h){i.textContent=h.message}})}function st(){const t=document.getElementById("app");E()?x(t):M(t)}st();
