(function () {
  const STORAGE_KEY = "spoon_planner_state_v1";

  const I18N = {
    zh: {
      appTitle: "Spoon Planner · 勺子电量管家",
      appSub: "面向低精力与 ADHD 的勺子电量任务系统 · 反瘫痪 5 分钟启动 · Obsidian 复盘",
      exportMd: "📝 导出 Obsidian",
      budgetTitle: "🥄 今日电量（勺子预算）",
      budgetSub: "不必每天都满血。先如实选出今天有几把勺子，系统自动隐藏超载任务并动态计算剩余电量。",
      pickOneTitle: "🎯 专治启动瘫痪 · 只做一件事",
      pickOneBtn: "帮我选一件最轻的",
      starterLbl: "5分钟温柔启动",
      markDoneBtn: "✓ 完成了！",
      rechargeTitle: "🔋 电量回充 & 4-7-8 呼吸节拍",
      resetDay: "重置今日",
      breathTitle: "🫧 4-7-8 自主神经舒缓呼吸",
      breathIdle: "脑雾、心慌或卡住时，点一下跟着呼吸 1 分钟。",
      breathStart: "开始呼吸",
      breathStop: "停止呼吸",
      chartTitle: "📈 近 7 天精力与微行动节律",
      saveSnap: "记录今日打卡",
      exportJson: "💾 导出 JSON 备份",
      importJson: "📂 导入恢复",
      tasksTitle: "⚡ 今日微行动（按电量自动过滤）",
      adaptiveLbl: "仅看当前电量可承接",
      addBtn: "添加",
      resetChecks: "重置勾选",
      dumpTitle: "🧠 杂念暂存箱（Brain Dump）",
      dumpSub: "专注时突然冒出的想法先丢进来，别打断手头动作",
      parkBtn: "暂存",
      taskPh: "新增一个微行动（尽量拆到 5-15 分钟）...",
      tagPh: "标签",
      dumpPh: "把脑子里突然跳出来的念头先停在这里...",
      stepPh: "+ 拆解一个 2 分钟极小步骤..."
    },
    en: {
      appTitle: "Spoon Planner",
      appSub: "Local-First Energy-Budget Task Manager · Anti-Paralysis 5-Min Starter · Obsidian Export",
      exportMd: "📝 Export Obsidian",
      budgetTitle: "🥄 Today's Spoon Budget",
      budgetSub: "You don't wake up at 100% every day. Pick your real spoons and let overload disappear.",
      pickOneTitle: "🎯 Just One Thing · Anti-Paralysis",
      pickOneBtn: "Pick lightest task",
      starterLbl: "5-Min Gentle Start",
      markDoneBtn: "✓ Done!",
      rechargeTitle: "🔋 Energy Recharge & 4-7-8 Breathing",
      resetDay: "Reset Today",
      breathTitle: "🫧 4-7-8 Nervous System Reset",
      breathIdle: "Stuck in brain fog or overwhelm? Breathe gently for 1 minute.",
      breathStart: "Start Pacer",
      breathStop: "Stop Pacer",
      chartTitle: "📈 7-Day Energy & Micro-Win Rhythm",
      saveSnap: "Log Today's Snapshot",
      exportJson: "💾 Export JSON",
      importJson: "📂 Import JSON",
      tasksTitle: "⚡ Adaptive Micro-Tasks",
      adaptiveLbl: "Filter by current spoons",
      addBtn: "Add",
      resetChecks: "Reset checks",
      dumpTitle: "🧠 Brain Dump Parking Lot",
      dumpSub: "Park intrusive thoughts in 1 click without derailing your focus",
      parkBtn: "Park",
      taskPh: "Add a micro-task (keep it 5–15 min)...",
      tagPh: "Tag",
      dumpPh: "Drop a stray thought here for later...",
      stepPh: "+ Add tiny 2-min sub-step..."
    }
  };

  const defaultState = {
    lang: "zh",
    theme: "warm-dark",
    spoons: 6,
    adaptiveFilter: true,
    focusTaskId: null,
    tasks: window.SPOON_PRESETS.tasks,
    recharges: window.SPOON_PRESETS.recharges,
    brainDump: [],
    history: [
      { date: "Day -5", spoons: 4, done: 2 },
      { date: "Day -4", spoons: 6, done: 3 },
      { date: "Day -3", spoons: 5, done: 2 },
      { date: "Day -2", spoons: 7, done: 4 },
      { date: "Day -1", spoons: 6, done: 3 }
    ]
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...structuredClone(defaultState), ...JSON.parse(raw) } : structuredClone(defaultState);
    } catch {
      return structuredClone(defaultState);
    }
  }

  let state = loadState();
  const saveState = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  function esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function showToast(msg) {
    const el = document.getElementById("toastMsg");
    el.textContent = msg;
    setTimeout(() => { if (el.textContent === msg) el.textContent = ""; }, 3500);
  }

  function maxTaskCostForSpoons(sp) {
    if (sp <= 3) return 1;
    if (sp <= 6) return 2;
    if (sp <= 9) return 3;
    return 4;
  }

  function applyThemeAndLang() {
    document.documentElement.setAttribute("data-theme", state.theme);
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    const dict = I18N[state.lang] || I18N.zh;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.dataset.i18n;
      if (dict[k]) el.textContent = dict[k];
    });
    document.getElementById("taskInput").placeholder = dict.taskPh;
    document.getElementById("taskTag").placeholder = dict.tagPh;
    document.getElementById("dumpInput").placeholder = dict.dumpPh;
    document.getElementById("langBtn").textContent = state.lang === "zh" ? "Switch to EN" : "切换中文";
    document.getElementById("themeBtn").textContent =
      state.theme === "warm-dark"
        ? (state.lang === "zh" ? "🌙 暖暗" : "🌙 Dark")
        : (state.lang === "zh" ? "📄 暖纸" : "📄 Paper");
  }

  function renderBudget() {
    const isZh = state.lang === "zh";
    const base = Number(state.spoons);
    const recharged = state.recharges.filter((r) => r.usedToday).reduce((a, r) => a + r.gain, 0);
    const totalBudget = base + recharged;
    const spent = state.tasks.filter((t) => t.done).reduce((a, t) => a + t.cost, 0);
    const remaining = Math.max(0, totalBudget - spent);

    document.getElementById("spoonSlider").value = base;
    document.getElementById("spoonVal").textContent = base;
    document.getElementById("remainingText").textContent = isZh
      ? `剩余可用：${remaining} / ${totalBudget} 勺（回充 +${recharged}）`
      : `Remaining: ${remaining} / ${totalBudget} spoons (+${recharged} recharged)`;
    document.getElementById("spentText").textContent = isZh ? `已消耗 ${spent} 勺` : `Spent ${spent}`;

    const pct = totalBudget > 0 ? Math.min(100, (remaining / totalBudget) * 100) : 0;
    document.getElementById("spoonBarFill").style.width = `${pct}%`;

    const badge = document.getElementById("modeBadge");
    const advice = document.getElementById("modeAdvice");
    if (base <= 3) {
      badge.className = "badge badge-low";
      badge.textContent = isZh ? "低电保底模式" : "Survival Mode";
      advice.textContent = isZh
        ? "今天处于极低电状态：只显示 1 勺保底微行动。完成 1–2 件底线动作就算赢，严禁自我苛责。"
        : "Low battery today: showing 1-spoon survival wins only. Completing 1–2 basics is a full victory.";
    } else if (base <= 6) {
      badge.className = "badge badge-mid";
      badge.textContent = isZh ? "低耗巡航模式" : "Low Cruise";
      advice.textContent = isZh
        ? "状态温和：适合推进 1 件 2 勺主线 + 若干 1 勺轻量动作，中途记得用回充项补电。"
        : "Moderate spoons: pair one 2-spoon task with gentle 1-spoon wins and take recharge breaks.";
    } else if (base <= 9) {
      badge.className = "badge badge-good";
      badge.textContent = isZh ? "平稳推进模式" : "Steady Flow";
      advice.textContent = isZh
        ? "精力平稳：可承接 1–3 勺任务。注意按 20-20-20 护眼，别在最后 2 勺透支。"
        : "Steady flow: 1–3 spoon tasks unlocked. Protect your eyes and stop before hitting zero.";
    } else {
      badge.className = "badge badge-good";
      badge.textContent = isZh ? "充沛 · 80% 留白法则" : "High · 80% Buffer Rule";
      advice.textContent = isZh
        ? "今日满血！可以攻克 1 件深度任务，但请遵守「80% 留白法则」——别把明天的勺子也透支光。"
        : "High energy! Tackle 1 deep task, but follow the 80% buffer rule so you don't borrow tomorrow's spoons.";
    }
  }

  function renderFocusBox() {
    const isZh = state.lang === "zh";
    const maxCost = maxTaskCostForSpoons(state.spoons);
    const pending = state.tasks.filter((t) => !t.done);
    let current = pending.find((t) => t.id === state.focusTaskId);
    if (!current) {
      const candidates = pending.filter((t) => t.cost <= maxCost).sort((a, b) => a.cost - b.cost);
      current = candidates[0] || pending[0] || null;
      state.focusTaskId = current ? current.id : null;
    }

    const box = document.getElementById("focusTaskText");
    if (!current) {
      box.textContent = isZh
        ? "🎉 今日列表已经清空！给自己放个假，去休息吧。"
        : "🎉 All tasks cleared! Give yourself permission to rest.";
    } else {
      box.textContent = `${current.title} (${"🥄".repeat(current.cost)})`;
    }
  }

  function renderTasks() {
    const isZh = state.lang === "zh";
    const dict = I18N[state.lang] || I18N.zh;
    const maxCost = maxTaskCostForSpoons(state.spoons);
    const list = state.adaptiveFilter
      ? state.tasks.filter((t) => t.cost <= maxCost)
      : state.tasks;

    const ul = document.getElementById("taskList");
    if (!list.length) {
      ul.innerHTML = `<li class="muted small">${isZh ? "当前电量下没有超载任务，可新增一个 1 勺微行动。" : "No tasks fit this spoon level — add a tiny 1-spoon micro-step."}</li>`;
    } else {
      ul.innerHTML = list
        .map((t) => {
          const stepsHtml = (t.steps || [])
            .map(
              (s) => `
              <div class="step-row ${s.done ? "step-done" : ""}">
                <label>
                  <input type="checkbox" class="step-cb" data-tid="${esc(t.id)}" data-sid="${esc(s.id)}" ${s.done ? "checked" : ""} />
                  <span>${esc(s.text)}</span>
                </label>
                <button type="button" class="btn btn-ghost del-step" data-tid="${esc(t.id)}" data-sid="${esc(s.id)}">✕</button>
              </div>`
            )
            .join("");

          return `
            <li class="task-card ${t.done ? "done" : ""}" data-tid="${esc(t.id)}">
              <div class="task-top">
                <label class="task-left">
                  <input type="checkbox" class="task-cb" ${t.done ? "checked" : ""} />
                  <span class="t-title">${esc(t.title)}</span>
                </label>
                <div class="task-right">
                  ${t.tag ? `<span class="pill">${esc(t.tag)}</span>` : ""}
                  <span class="pill" title="Spoon cost">${"🥄".repeat(t.cost)}</span>
                  <button type="button" class="btn btn-ghost focus-this" title="Focus">🎯</button>
                  <button type="button" class="btn btn-ghost del-task" title="Delete">✕</button>
                </div>
              </div>
              <div class="steps-box">
                ${stepsHtml}
                <div class="add-step-row">
                  <input type="text" class="step-input" placeholder="${esc(dict.stepPh)}" />
                  <button type="button" class="btn btn-soft small-btn add-step-btn">+</button>
                </div>
              </div>
            </li>`;
        })
        .join("");
    }

    const doneCount = list.filter((t) => t.done).length;
    document.getElementById("taskStats").textContent = isZh
      ? `当前视图已完成 ${doneCount} / ${list.length}（总计 ${state.tasks.length} 项）`
      : `Completed ${doneCount} / ${list.length} visible (${state.tasks.length} total)`;
    renderBudget();
    renderFocusBox();
  }

  function renderRecharges() {
    const isZh = state.lang === "zh";
    document.getElementById("rechargeList").innerHTML = state.recharges
      .map(
        (r) => `
        <label class="recharge-item ${r.usedToday ? "used" : ""}">
          <span><input type="checkbox" class="rc-cb" data-rid="${esc(r.id)}" ${r.usedToday ? "checked" : ""} /> ${esc(isZh ? r.title_zh : r.title_en)}</span>
          <span class="pill">+${r.gain} 🥄</span>
        </label>`
      )
      .join("");
  }

  function renderBrainDump() {
    const isZh = state.lang === "zh";
    const ul = document.getElementById("dumpList");
    if (!state.brainDump.length) {
      ul.innerHTML = `<li class="muted small">${isZh ? "暂存箱空空如也，头脑很清爽。" : "Parking lot is empty — enjoy the mental space."}</li>`;
      return;
    }
    ul.innerHTML = state.brainDump
      .map(
        (d) => `
        <li class="dump-item" data-did="${esc(d.id)}">
          <span>${esc(d.text)}</span>
          <div style="display:flex;gap:4px">
            <button type="button" class="btn btn-soft small-btn promote-dump">${isZh ? "转任务" : "→ Task"}</button>
            <button type="button" class="btn btn-ghost del-dump">✕</button>
          </div>
        </li>`
      )
      .join("");
  }

  function renderSparkline() {
    const isZh = state.lang === "zh";
    const data = state.history.slice(-7);
    const w = 400, h = 92, padX = 24, padY = 14;
    const stepX = data.length > 1 ? (w - padX * 2) / (data.length - 1) : 0;

    const pts = data.map((d, i) => {
      const x = padX + i * stepX;
      const y = h - padY - ((d.spoons - 1) / 11) * (h - padY * 2 - 10);
      return { x, y, ...d };
    });

    const poly = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    const circles = pts
      .map(
        (p) => `
        <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="#7db4a6" />
        <text x="${p.x.toFixed(1)}" y="${h - 2}" text-anchor="middle" fill="#98a3ad" font-size="9.5">${esc(p.date.slice(-5))}</text>
        <text x="${p.x.toFixed(1)}" y="${(p.y - 7).toFixed(1)}" text-anchor="middle" fill="#ffd08a" font-size="9.5">${p.spoons}🥄</text>`
      )
      .join("");

    document.getElementById("sparklineWrap").innerHTML = `
      <svg viewBox="0 0 ${w} ${h}" width="100%" height="96" role="img" aria-label="7-day energy chart">
        <polyline fill="none" stroke="#7db4a6" stroke-width="2.5" points="${poly}" />
        ${circles}
      </svg>
      <div class="muted small">${isZh ? "横轴：最近记录日 · 数值：当日精力勺数（点击上方按钮随时打卡记录今日）" : "Recent logged days · Values show daily spoon levels."}</div>
    `;
  }

  // === Timers: 20-20-20 Eye, 5-Min Starter, 4-7-8 Breath ===
  let eyeTimer = null, eyeSec = 1200;
  function renderEye() {
    const m = String(Math.floor(eyeSec / 60)).padStart(2, "0");
    const s = String(eyeSec % 60).padStart(2, "0");
    document.getElementById("eyeDisp").textContent = `${m}:${s}`;
  }
  document.getElementById("eyeBtn").addEventListener("click", () => {
    if (eyeTimer) {
      clearInterval(eyeTimer); eyeTimer = null; eyeSec = 1200; renderEye(); return;
    }
    eyeTimer = setInterval(() => {
      eyeSec -= 1;
      if (eyeSec <= 0) {
        clearInterval(eyeTimer); eyeTimer = null; eyeSec = 1200; renderEye();
        alert(state.lang === "zh" ? "👁️ 20-20-20 护眼提醒：远眺 6 米外 20 秒，放松眼肌！" : "👁️ 20-20-20 Eye Break: look 20 ft away for 20 seconds!");
        return;
      }
      renderEye();
    }, 1000);
  });

  let starterTimer = null, starterSec = 300;
  function renderStarter() {
    const m = String(Math.floor(starterSec / 60)).padStart(2, "0");
    const s = String(starterSec % 60).padStart(2, "0");
    document.getElementById("starterDisp").textContent = `${m}:${s}`;
  }
  document.getElementById("starterTimerBtn").addEventListener("click", () => {
    if (starterTimer) {
      clearInterval(starterTimer); starterTimer = null; starterSec = 300; renderStarter(); return;
    }
    starterTimer = setInterval(() => {
      starterSec -= 1;
      if (starterSec <= 0) {
        clearInterval(starterTimer); starterTimer = null; starterSec = 300; renderStarter();
        showToast(state.lang === "zh" ? "🎉 5 分钟温柔启动完成！你可以继续，也可以光荣停手。" : "🎉 5 minutes done! Continue if flowing, or stop guilt-free.");
        return;
      }
      renderStarter();
    }, 1000);
  });

  let breathTimer = null;
  function stopBreath() {
    if (breathTimer) clearTimeout(breathTimer);
    breathTimer = null;
    document.getElementById("breathRing").className = "ring";
    document.getElementById("breathLbl").textContent = state.lang === "zh" ? "就绪" : "Ready";
    document.getElementById("breathCue").textContent = I18N[state.lang].breathIdle;
    document.getElementById("breathBtn").textContent = I18N[state.lang].breathStart;
  }
  function stepBreath(idx = 0) {
    const isZh = state.lang === "zh";
    const phases = [
      { cls: "inhale", lbl: isZh ? "吸气 4s" : "In 4s", cue: isZh ? "用鼻轻缓吸气，放下肩膀..." : "Breathe in gently through your nose...", ms: 4000 },
      { cls: "hold", lbl: isZh ? "停留 7s" : "Hold 7s", cue: isZh ? "柔和停留，保持舒适不勉强..." : "Softly hold without tension...", ms: 7000 },
      { cls: "exhale", lbl: isZh ? "呼气 8s" : "Out 8s", cue: isZh ? "缓缓吐气，释放大脑紧绷..." : "Exhale slowly and drop your jaw...", ms: 8000 }
    ];
    const p = phases[idx % phases.length];
    document.getElementById("breathRing").className = `ring ${p.cls}`;
    document.getElementById("breathLbl").textContent = p.lbl;
    document.getElementById("breathCue").textContent = p.cue;
    breathTimer = setTimeout(() => stepBreath(idx + 1), p.ms);
  }
  document.getElementById("breathBtn").addEventListener("click", () => {
    if (breathTimer) stopBreath();
    else {
      document.getElementById("breathBtn").textContent = I18N[state.lang].breathStop;
      stepBreath(0);
    }
  });

  // === Event Handlers ===
  document.getElementById("langBtn").addEventListener("click", () => {
    state.lang = state.lang === "zh" ? "en" : "zh";
    saveState();
    renderAll();
  });

  document.getElementById("themeBtn").addEventListener("click", () => {
    state.theme = state.theme === "warm-dark" ? "warm-paper" : "warm-dark";
    saveState();
    applyThemeAndLang();
  });

  document.getElementById("spoonSlider").addEventListener("input", (e) => {
    state.spoons = Number(e.target.value);
    saveState();
    renderTasks();
  });

  document.getElementById("adaptiveFilter").addEventListener("change", (e) => {
    state.adaptiveFilter = e.target.checked;
    saveState();
    renderTasks();
  });

  document.getElementById("pickOneBtn").addEventListener("click", () => {
    const maxCost = maxTaskCostForSpoons(state.spoons);
    const pool = state.tasks.filter((t) => !t.done && t.cost <= maxCost);
    const fallback = state.tasks.filter((t) => !t.done);
    const list = pool.length ? pool : fallback;
    if (!list.length) return;
    const picked = list[Math.floor(Math.random() * list.length)];
    state.focusTaskId = picked.id;
    saveState();
    renderFocusBox();
  });

  document.getElementById("focusDoneBtn").addEventListener("click", () => {
    if (!state.focusTaskId) return;
    const t = state.tasks.find((x) => x.id === state.focusTaskId);
    if (t) t.done = true;
    state.focusTaskId = null;
    saveState();
    renderTasks();
    showToast(state.lang === "zh" ? "✨ 太棒了！又完成一件微行动！" : "✨ Nice win! One micro-task completed.");
  });

  document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("taskInput").value.trim();
    if (!title) return;
    state.tasks.unshift({
      id: "sp-" + Date.now(),
      title,
      cost: Number(document.getElementById("taskCost").value) || 1,
      tag: document.getElementById("taskTag").value.trim() || "Micro",
      done: false,
      steps: []
    });
    document.getElementById("taskInput").value = "";
    document.getElementById("taskTag").value = "";
    saveState();
    renderTasks();
  });

  document.getElementById("taskList").addEventListener("click", (e) => {
    const card = e.target.closest(".task-card");
    if (!card) return;
    const tid = card.dataset.tid;
    const task = state.tasks.find((t) => t.id === tid);
    if (!task) return;

    if (e.target.classList.contains("task-cb")) {
      task.done = e.target.checked;
      saveState();
      renderTasks();
    } else if (e.target.classList.contains("del-task")) {
      state.tasks = state.tasks.filter((t) => t.id !== tid);
      saveState();
      renderTasks();
    } else if (e.target.classList.contains("focus-this")) {
      state.focusTaskId = tid;
      saveState();
      renderFocusBox();
    } else if (e.target.classList.contains("add-step-btn")) {
      const inp = card.querySelector(".step-input");
      const text = inp.value.trim();
      if (!text) return;
      task.steps = task.steps || [];
      task.steps.push({ id: "st-" + Date.now(), text, done: false });
      saveState();
      renderTasks();
    } else if (e.target.classList.contains("step-cb")) {
      const st = (task.steps || []).find((s) => s.id === e.target.dataset.sid);
      if (st) st.done = e.target.checked;
      saveState();
      renderTasks();
    } else if (e.target.classList.contains("del-step")) {
      task.steps = (task.steps || []).filter((s) => s.id !== e.target.dataset.sid);
      saveState();
      renderTasks();
    }
  });

  document.getElementById("resetTasksBtn").addEventListener("click", () => {
    state.tasks.forEach((t) => {
      t.done = false;
      (t.steps || []).forEach((s) => (s.done = false));
    });
    saveState();
    renderTasks();
  });

  document.getElementById("rechargeList").addEventListener("change", (e) => {
    if (!e.target.classList.contains("rc-cb")) return;
    const r = state.recharges.find((x) => x.id === e.target.dataset.rid);
    if (r) r.usedToday = e.target.checked;
    saveState();
    renderRecharges();
    renderBudget();
  });

  document.getElementById("resetRechargeBtn").addEventListener("click", () => {
    state.recharges.forEach((r) => (r.usedToday = false));
    saveState();
    renderRecharges();
    renderBudget();
  });

  document.getElementById("dumpForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const inp = document.getElementById("dumpInput");
    const text = inp.value.trim();
    if (!text) return;
    state.brainDump.unshift({ id: "bd-" + Date.now(), text });
    inp.value = "";
    saveState();
    renderBrainDump();
  });

  document.getElementById("dumpList").addEventListener("click", (e) => {
    const li = e.target.closest(".dump-item");
    if (!li) return;
    const id = li.dataset.did;
    const item = state.brainDump.find((d) => d.id === id);
    if (!item) return;
    if (e.target.classList.contains("promote-dump")) {
      state.tasks.unshift({ id: "sp-" + Date.now(), title: item.text, cost: 1, tag: "BrainDump", done: false, steps: [] });
      state.brainDump = state.brainDump.filter((d) => d.id !== id);
      saveState();
      renderTasks();
      renderBrainDump();
    } else if (e.target.classList.contains("del-dump")) {
      state.brainDump = state.brainDump.filter((d) => d.id !== id);
      saveState();
      renderBrainDump();
    }
  });

  document.getElementById("saveSnapshotBtn").addEventListener("click", () => {
    const today = new Date().toISOString().slice(5, 10);
    const done = state.tasks.filter((t) => t.done).length;
    const idx = state.history.findIndex((h) => h.date === today);
    if (idx >= 0) state.history[idx] = { date: today, spoons: state.spoons, done };
    else state.history.push({ date: today, spoons: state.spoons, done });
    state.history = state.history.slice(-14);
    saveState();
    renderSparkline();
    showToast(state.lang === "zh" ? `✅ 已记录今日 (${today})：${state.spoons} 勺，完成 ${done} 项` : `✅ Logged ${today}: ${state.spoons} spoons, ${done} done`);
  });

  function downloadFile(name, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  }

  document.getElementById("exportMdBtn").addEventListener("click", () => {
    const today = new Date().toISOString().slice(0, 10);
    const lines = [
      "---",
      `date: ${today}`,
      `spoons: ${state.spoons}/12`,
      "tags: [spoon-planner, low-energy, daily-review]",
      "---",
      "",
      `# Spoon Review (${today})`,
      "",
      `- **Energy Budget:** ${state.spoons} / 12 spoons`,
      "",
      "## Tasks",
      ...state.tasks.map((t) => `- [${t.done ? "x" : " "}] ${t.title} (${"🥄".repeat(t.cost)} · #${t.tag})`),
      "",
      "## Brain Dump",
      ...(state.brainDump.length ? state.brainDump.map((d) => `- ${d.text}`) : ["- (empty)"])
    ];
    downloadFile(`Spoon-Review-${today}.md`, lines.join("\n"), "text/markdown;charset=utf-8");
    showToast(state.lang === "zh" ? "✅ 已导出 Obsidian Markdown 文件！" : "✅ Exported Obsidian Markdown!");
  });

  document.getElementById("exportJsonBtn").addEventListener("click", () => {
    const today = new Date().toISOString().slice(0, 10);
    downloadFile(`spoon-planner-backup-${today}.json`, JSON.stringify(state, null, 2), "application/json");
    showToast(state.lang === "zh" ? "✅ 已导出 JSON 本地备份！" : "✅ Exported JSON backup!");
  });

  document.getElementById("importJsonInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        state = { ...structuredClone(defaultState), ...JSON.parse(reader.result) };
        saveState();
        renderAll();
        showToast(state.lang === "zh" ? "✅ 备份恢复成功！" : "✅ Backup restored!");
      } catch {
        showToast(state.lang === "zh" ? "❌ JSON 格式错误" : "❌ Invalid JSON file");
      }
    };
    reader.readAsText(file);
  });

  function renderAll() {
    applyThemeAndLang();
    document.getElementById("adaptiveFilter").checked = state.adaptiveFilter;
    renderEye();
    renderStarter();
    renderRecharges();
    renderTasks();
    renderBrainDump();
    renderSparkline();
  }

  renderAll();
})();
