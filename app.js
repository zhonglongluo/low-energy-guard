(function () {
  const STORAGE_KEY = "low_energy_guard_v2_state";

  const I18N = {
    zh: {
      appTitle: "Low-Energy-Guard · 低精力守护工具",
      appSub: "不是效率工具，而是你的低精力状态守护工具 · 先稳住睡眠和身体，再谈成长",
      quickExport: "📝 导出 Obsidian",
      quickStep1: "① 昨晚睡眠（1 键触发睡眠修正系数）",
      quickStep2: "② 此刻体感（2 次点击完成状态记录）",
      engineTitle: "低能耗建议引擎（睡眠反向修正 · 相对精力 · 反刍信号）",
      engineDoLbl: "✅ 今天可以轻做：",
      engineRestLbl: "🛑 今天允许放过：",
      tabSpoon: "🥄 1. 相对精力管理",
      tabSleep: "🌙 2. 睡眠与休息守护",
      tabEmotion: "🫧 3. 情绪与反刍记录",
      tabObsidian: "📝 4. Obsidian 导出与备份",
      spoonCardTitle: "今日相对精力（动态上限）",
      spoonCardSub: "不设统一满分。自定义你的“满格精力基线”，前一天睡不好时，今日上限会自动乘以睡眠修正系数下调，防止透支。",
      baselineLbl: "个人满格基线",
      oneThingTitle: "🎯 低电反瘫痪 · 只做一件小事",
      pickLightBtn: "帮我选最轻的",
      starterLbl: "5分钟温柔启动",
      focusDoneBtn: "✓ 完成了",
      rechargeTitle: "🔋 休息与回充动作",
      resetToday: "重置今日",
      taskListTitle: "按能耗分级的今日小事（低 / 中 / 高耗）",
      filterLbl: "隐藏超载任务",
      addBtn: "添加",
      resetChecks: "重置勾选",
      sleepLogTitle: "昨晚睡眠记录（自动修正今日精力上限）",
      sleepLogSub: "睡眠是整体状态判断的核心指标。睡得不够或质量差时，反向修正系数（×0.60 / ×0.75 / ×0.90）会自动下调今日精力上限，提醒你不要继续透支。",
      bedtimeLbl: "入睡时间",
      waketimeLbl: "起床时间",
      sleepQualLbl: "睡眠质量 (1–5)",
      napLbl: "今日午休/补觉 (分钟)",
      sleepTargetLbl: "个人理想睡眠底线 (小时)",
      sleepNoteLbl: "睡眠体感备注（选填）",
      saveSleepBtn: "保存今日睡眠并更新上限",
      sleepTrendTitle: "近 7 天「睡眠 × 精力」双底盘节律",
      sleepLegend: "绿线：精力值 · 蓝柱：睡眠小时",
      recentSleepTitle: "近期睡眠档案",
      emoCardTitle: "此刻情绪与反刍状态",
      clearFlags: "清空标记",
      moodSelectLbl: "1. 快速点选当前情绪：",
      rumSelectLbl: "2. 是否正陷入以下内耗循环？（可多选）",
      emoNoteLbl: "把脑子里反复打转的一句话倒出来（写完就暂停）",
      saveEmoBtn: "存入今日情绪/反刍记录",
      breathCardTitle: "🫧 温和暂停 · 4-7-8 舒缓呼吸",
      breathSub: "打断思绪反刍，把注意力拉回身体",
      breathIdle: "当你发现自己停不下来地复盘、担忧或苛责自己时，先跟着呼吸 1 分钟。",
      breathStart: "开始呼吸节拍",
      breathStop: "停止呼吸节拍",
      emoLogTitle: "情绪与反刍历史记录",
      obsPreviewTitle: "Obsidian 每日健康档案预览 (.md)",
      obsPreviewSub: "自动聚合你的睡眠时长与修正系数、相对精力、情绪与反刍标记、低能耗建议和分级小事，一键同步到本地 Obsidian Vault。",
      copyMdBtn: "📋 一键复制 Markdown",
      dlDailyBtn: "⬇️ 下载今日 .md",
      dlWeeklyBtn: "📚 导出近 7 天周报 .md",
      backupTitle: "🔒 100% 本地优先 · 数据主权与备份",
      zeroCloud: "零云端上传",
      backupSub: "你的睡眠、精力与情绪记录极为私密，全部仅保存在本机浏览器 localStorage，绝不上传任何第三方服务器。建议定期导出 JSON 备份或同步至 Obsidian 文件夹。",
      exportJsonBtn: "💾 导出 JSON 全量备份",
      importJsonBtn: "📂 导入 JSON 恢复",
      philosophyTitle: "🌱 克制设计原则",
      philosophyBody: "睡眠、环境、性格、身体，才是人生最重要的底盘。没有打卡、没有连续天数、没有成就系统——工具的最高优先级，是绝不能成为你新的精力负担。",
      taskPh: "新增一件小事（尽量拆到 5–15 分钟）...",
      tagPh: "标签",
      stepPh: "+ 拆解一个 2 分钟极小步骤...",
      tiers: { 1: "🟢 低耗", 2: "🟡 中耗", 3: "🟠 高耗" }
    },
    en: {
      appTitle: "Low-Energy-Guard",
      appSub: "Not a hustle productivity app — a calm guardian for sleep, body, and low-energy pacing",
      quickExport: "📝 Export Obsidian",
      quickStep1: "① Last Night's Sleep (1 click adjusts today's cap)",
      quickStep2: "② Current State (2-click low-friction check-in)",
      engineTitle: "Low-Energy Guidance Engine (Sleep Modifier · Relative Energy · Rumination)",
      engineDoLbl: "✅ Safe to do lightly today: ",
      engineRestLbl: "🛑 Permission to skip today: ",
      tabSpoon: "🥄 1. Relative Energy",
      tabSleep: "🌙 2. Sleep Guardian",
      tabEmotion: "🫧 3. Mood & Rumination",
      tabObsidian: "📝 4. Obsidian & Backup",
      spoonCardTitle: "Today's Relative Energy (Dynamic Cap)",
      spoonCardSub: "No universal fixed scale. Customize your full-battery baseline — poor sleep automatically lowers today's energy ceiling via a reverse modifier.",
      baselineLbl: "Full-Battery Baseline",
      oneThingTitle: "🎯 Anti-Paralysis · Just One Small Thing",
      pickLightBtn: "Pick lightest",
      starterLbl: "5-Min Gentle Start",
      focusDoneBtn: "✓ Done",
      rechargeTitle: "🔋 Rest & Recharge Actions",
      resetToday: "Reset Today",
      taskListTitle: "Energy-Tiered Micro-Tasks (Light / Medium / Heavy)",
      filterLbl: "Hide overload",
      addBtn: "Add",
      resetChecks: "Reset checks",
      sleepLogTitle: "Last Night's Sleep (Auto-Adjusts Energy Cap)",
      sleepLogSub: "Sleep is the core foundation. Poor duration or quality applies a reverse modifier (×0.60 / ×0.75 / ×0.90) to lower today's energy ceiling automatically.",
      bedtimeLbl: "Bedtime",
      waketimeLbl: "Wake Time",
      sleepQualLbl: "Sleep Quality (1–5)",
      napLbl: "Daytime Nap (mins)",
      sleepTargetLbl: "Sleep Baseline Target (hrs)",
      sleepNoteLbl: "Sleep notes (optional)",
      saveSleepBtn: "Save Sleep & Update Cap",
      sleepTrendTitle: "7-Day Sleep × Energy Rhythm",
      sleepLegend: "Green line: Energy · Blue bars: Sleep hrs",
      recentSleepTitle: "Recent Sleep Archive",
      emoCardTitle: "Current Mood & Rumination Check",
      clearFlags: "Clear flags",
      moodSelectLbl: "1. Quick mood check-in:",
      rumSelectLbl: "2. Caught in any inner-friction loop? (Multi-select)",
      emoNoteLbl: "Pour out one looping thought so your brain can pause",
      saveEmoBtn: "Save Mood / Rumination Log",
      breathCardTitle: "🫧 Gentle Pause · 4-7-8 Breathing",
      breathSub: "Interrupt mental loops and return to your body",
      breathIdle: "When over-reviewing, worrying, or self-criticizing, breathe gently for 1 minute.",
      breathStart: "Start Pacer",
      breathStop: "Stop Pacer",
      emoLogTitle: "Mood & Rumination History",
      obsPreviewTitle: "Obsidian Daily Health Note Preview (.md)",
      obsPreviewSub: "Combines sleep modifier, relative energy, emotion/rumination flags, low-energy guidance, and tiered tasks into a clean local Markdown note.",
      copyMdBtn: "📋 Copy Markdown",
      dlDailyBtn: "⬇️ Download Today .md",
      dlWeeklyBtn: "📚 Export 7-Day Weekly .md",
      backupTitle: "🔒 100% Local-First Data Sovereignty",
      zeroCloud: "Zero Cloud",
      backupSub: "All sleep, energy, and emotional logs stay strictly in your browser localStorage — never uploaded anywhere. Export JSON or Obsidian Markdown anytime.",
      exportJsonBtn: "💾 Export JSON Backup",
      importJsonBtn: "📂 Import JSON",
      philosophyTitle: "🌱 Restrained Design Principles",
      philosophyBody: "Sleep, environment, temperament, and body form life's real foundation. No streaks, no badges, no guilt triggers — a tool must never become a new energy burden.",
      taskPh: "Add a small task (5–15 min)...",
      tagPh: "Tag",
      stepPh: "+ Add tiny 2-min step...",
      tiers: { 1: "🟢 Light", 2: "🟡 Medium", 3: "🟠 Heavy" }
    }
  };

  const todayStr = () => new Date().toISOString().slice(0, 10);

  const defaultState = {
    lang: "zh",
    theme: "warm-dark",
    personalMax: 10,
    spoons: 7,
    quickSleepChoice: "good",
    quickStateChoice: "steady",
    adaptiveFilter: true,
    focusTaskId: null,
    tasks: window.LEG_PRESETS.tasks,
    recharges: window.LEG_PRESETS.recharges,
    sleep: {
      bedTime: "23:30",
      wakeTime: "07:00",
      quality: 4,
      napMinutes: 0,
      targetHours: 7.5,
      note: ""
    },
    sleepHistory: [
      { date: "Day -4", hours: 6.2, quality: 3, spoons: 5, note: "入睡略晚" },
      { date: "Day -3", hours: 7.4, quality: 4, spoons: 7, note: "状态平稳" },
      { date: "Day -2", hours: 6.0, quality: 2, spoons: 4, note: "夜醒一次" },
      { date: "Day -1", hours: 7.5, quality: 4, spoons: 7, note: "恢复较好" }
    ],
    mood: "calm",
    ruminationFlags: [],
    emotionLogs: []
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(defaultState);
      const parsed = JSON.parse(raw);
      return {
        ...structuredClone(defaultState),
        ...parsed,
        personalMax: Math.min(15, Math.max(5, Number(parsed.personalMax) || 10)),
        sleep: { ...defaultState.sleep, ...(parsed.sleep || {}) }
      };
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
    if (el) {
      el.textContent = msg;
      setTimeout(() => { if (el.textContent === msg) el.textContent = ""; }, 3800);
    }
  }

  function calcSleepHours(bed, wake) {
    if (!bed || !wake) return 7.0;
    const [bh, bm] = bed.split(":").map(Number);
    const [wh, wm] = wake.split(":").map(Number);
    let diff = (wh * 60 + wm) - (bh * 60 + bm);
    if (diff <= 0) diff += 24 * 60;
    return Math.round((diff / 60) * 10) / 10;
  }

  // === CORE QUANTITATIVE MODEL: Relative Baseline × Sleep Reverse Modifier ===
  function computeSleepModifier() {
    const hours = calcSleepHours(state.sleep.bedTime, state.sleep.wakeTime);
    const quality = Number(state.sleep.quality) || 3;
    const target = Number(state.sleep.targetHours) || 7.5;
    const baseMax = Math.min(15, Math.max(5, Number(state.personalMax) || 10));

    let modifier = 1.0;
    let modReasonZh = "满格基线";
    let modReasonEn = "Full baseline";

    if (hours < 6.0 || quality === 1) {
      modifier = 0.6;
      modReasonZh = "重度缺觉下调";
      modReasonEn = "Severe sleep debt cap";
    } else if (hours < target - 1.0 || quality === 2) {
      modifier = 0.75;
      modReasonZh = "低睡保护下调";
      modReasonEn = "Sleep-debt cap";
    } else if (hours < target - 0.3 || quality === 3) {
      modifier = 0.9;
      modReasonZh = "轻度温和修正";
      modReasonEn = "Mild sleep adjustment";
    }

    const effectiveCap = Math.max(2, Math.round(baseMax * modifier));
    return { hours, quality, target, baseMax, modifier, effectiveCap, modReasonZh, modReasonEn };
  }

  // === MODULE 5: LOW-ENERGY GUIDANCE ENGINE ===
  function computeGuidance() {
    const isZh = state.lang === "zh";
    const sm = computeSleepModifier();
    // Clamp current spoons to effectiveCap so poor sleep genuinely lowers today's available ceiling
    const currentEnergy = Math.min(sm.effectiveCap, Math.max(1, Number(state.spoons) || 1));
    const ratio = currentEnergy / sm.baseMax;
    const flags = state.ruminationFlags || [];
    const mood = state.mood || "calm";

    const hasSelfAttack = flags.includes("self_attack");
    const hasRumination = flags.length > 0;
    const lowMood = mood === "tired" || mood === "low" || mood === "anxious";

    let level = "steady";
    if (sm.modifier <= 0.6 || ratio <= 0.35 || (sm.modifier <= 0.75 && hasSelfAttack)) {
      level = "deep_rest";
    } else if (sm.modifier <= 0.75 || ratio <= 0.55 || hasRumination || lowMood) {
      level = "protect";
    } else if (ratio >= 0.85 && sm.modifier === 1.0 && !hasRumination) {
      level = "high_buffer";
    }

    let badge = "", badgeCls = "badge-good", msg = "", doText = "", restText = "";

    if (level === "deep_rest") {
      badge = isZh ? "🛌 深度修复日" : "🛌 Deep Recovery Day";
      badgeCls = "badge-rest";
      msg = isZh
        ? (hasSelfAttack
            ? `昨晚睡眠 ${sm.hours}h，系统已将今日精力上限自动下调至 ${sm.effectiveCap}（基线 ${sm.baseMax} × ${sm.modifier.toFixed(2)}），且检测到自我苛责信号。请立刻停下自责——今天只做 1 件低耗小事，今晚提前补觉。`
            : `昨晚睡眠 ${sm.hours}h，今日可用上限已自动修正为 ${sm.effectiveCap}（基线 ${sm.baseMax} × ${sm.modifier.toFixed(2)}）。今天先稳住身体和睡眠，只留 1 件低耗小事就好。`)
        : `Sleep was ${sm.hours}h — today's cap automatically adjusted to ${sm.effectiveCap} (baseline ${sm.baseMax} × ${sm.modifier.toFixed(2)}). Keep it to 1 light win and prioritize early rest.`;
      doText = isZh ? "只选 1 件「🟢 低耗」底线小事 + 温水热食 + 午休 20 分钟 + 今晚提前睡" : "1 Light win + warm hydration + 20-min rest + early bedtime";
      restText = isZh ? "所有中高耗任务、重大决策、深夜复盘与自我苛责" : "Medium/heavy tasks, big decisions, late-night review, self-blame";
    } else if (level === "protect") {
      badge = isZh ? "🌿 低能耗保护日" : "🌿 Low-Energy Protection";
      badgeCls = "badge-warn";
      msg = isZh
        ? (hasRumination
            ? `今日相对精力 ${currentEnergy}/${sm.effectiveCap}（睡眠修正 ×${sm.modifier.toFixed(2)}），大脑正在内耗反刍。别在低电状态下和念头较劲——先把念头写下来暂停，今天轻做 1–2 件低耗小事即可。`
            : `今日精力上限已按睡眠修正为 ${sm.effectiveCap}（当前体感 ${currentEnergy}）。今天精力偏低，优先只做一件低耗小事建立稳态，别硬撑高耗任务。`)
        : `Today's adjusted cap is ${sm.effectiveCap} (feeling ${currentEnergy}, sleep ×${sm.modifier.toFixed(2)}). Stick to 1–2 light tasks and pause mental loops.`;
      doText = isZh ? "优先 1–2 件「🟢 低耗」小事 + 4-7-8 呼吸暂停反刍" : "1–2 Light tasks + 4-7-8 pause for rumination";
      restText = isZh ? "高耗复杂任务、多线并行、透支午休时间硬扛" : "Heavy deep work, multitasking, skipping breaks";
    } else if (level === "high_buffer") {
      badge = isZh ? "✨ 充沛 · 80% 留白法则" : "✨ High Energy · 80% Buffer";
      badgeCls = "badge-good";
      msg = isZh
        ? `昨晚睡眠达标（${sm.hours}h，满格上限 ${sm.effectiveCap}），当前体感充沛（${currentEnergy}/${sm.effectiveCap}）。适合推进 1 件高耗主线，但请遵守「80% 留白法则」，别透支明天的底盘。`
        : `Well-rested (${sm.hours}h, full cap ${sm.effectiveCap}) and energized (${currentEnergy}/${sm.effectiveCap}). Tackle 1 heavy focus block and stop at 80% to protect tomorrow.`;
      doText = isZh ? "1 件「🟠 高耗」主线 + 1–2 件低耗收尾小事" : "1 Heavy focus block + 1–2 light wins";
      restText = isZh ? "趁精力好一口气干到深夜导致次日崩盘" : "Overworking into the night and crashing tomorrow";
    } else {
      badge = isZh ? "🌤️ 温和巡航日" : "🌤️ Steady Gentle Cruise";
      badgeCls = "badge-good";
      msg = isZh
        ? `底盘状态平稳（睡眠 ${sm.hours}h · 今日上限 ${sm.effectiveCap} · 当前体感 ${currentEnergy}）。按舒服的节奏推进 1 件中耗小事即可，保持稳定比短期爆发更重要。`
        : `Steady foundation (sleep ${sm.hours}h · cap ${sm.effectiveCap} · current ${currentEnergy}). Cruise through 1 medium task and protect your evening wind-down.`;
      doText = isZh ? "1 件「🟡 中耗」任务 + 1–2 件低耗小事 + 准时护眼" : "1 Medium task + 1–2 light wins + eye breaks";
      restText = isZh ? "临时加塞高耗杂事、睡前刷高刺激内容" : "Unplanned heavy errands and late-night overstimulation";
    }

    return { level, badge, badgeCls, msg, doText, restText, currentEnergy, ...sm, flags };
  }

  function renderQuickBar() {
    document.querySelectorAll("#quickSleepRow [data-qsleep]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.qsleep === state.quickSleepChoice);
    });
    document.querySelectorAll("#quickStateRow [data-qstate]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.qstate === state.quickStateChoice);
    });
  }

  function renderGuidanceEngine() {
    const isZh = state.lang === "zh";
    const g = computeGuidance();
    const badgeEl = document.getElementById("engineBadge");
    badgeEl.textContent = g.badge;
    badgeEl.className = `badge ${g.badgeCls}`;
    document.getElementById("engineMessage").textContent = g.msg;
    document.getElementById("engineDoText").textContent = g.doText;
    document.getElementById("engineRestText").textContent = g.restText;

    const moodObj = window.LEG_PRESETS.moods.find((m) => m.id === state.mood) || window.LEG_PRESETS.moods[0];
    const signals = [
      `🌙 ${isZh ? "睡眠" : "Sleep"}: ${g.hours}h (${g.quality}/5 · ×${g.modifier.toFixed(2)})`,
      `🥄 ${isZh ? "今日精力" : "Energy"}: ${g.currentEnergy} / ${g.effectiveCap} (${isZh ? "基线" : "Base"} ${g.baseMax})`,
      `${isZh ? moodObj.zh : moodObj.en}`,
      g.flags.length
        ? `🫧 ${isZh ? `反刍信号 ${g.flags.length} 项` : `${g.flags.length} rumination flag(s)`}`
        : `✨ ${isZh ? "无明显反刍内耗" : "No rumination flags"}`
    ];
    document.getElementById("engineSignals").innerHTML = signals.map((s) => `<span class="pill">${esc(s)}</span>`).join("");
  }

  // === THEME & I18N ===
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
    document.getElementById("langBtn").textContent = state.lang === "zh" ? "Switch to EN" : "切换中文";
    document.getElementById("themeBtn").textContent =
      state.theme === "warm-dark"
        ? (state.lang === "zh" ? "🌙 暖暗" : "🌙 Dark")
        : (state.lang === "zh" ? "📄 暖纸" : "📄 Paper");
  }

  // === TAB 1: RELATIVE ENERGY & TIERED MICRO-TASKS ===
  function maxTaskTier() {
    const g = computeGuidance();
    if (g.level === "deep_rest") return 1;
    if (g.level === "protect") return 1;
    if (g.level === "steady") return 2;
    return 3;
  }

  function tierLabel(cost) {
    const c = Math.min(3, Math.max(1, Number(cost) || 1));
    return (I18N[state.lang] || I18N.zh).tiers[c];
  }

  function renderSpoonPanel() {
    const isZh = state.lang === "zh";
    const g = computeGuidance();

    // Sync slider max dynamically to effectiveCap!
    const slider = document.getElementById("spoonSlider");
    slider.max = String(g.effectiveCap);
    if (state.spoons > g.effectiveCap) {
      state.spoons = g.effectiveCap;
      saveState();
    }
    slider.value = String(state.spoons);
    document.getElementById("personalMaxInput").value = String(g.baseMax);
    document.getElementById("spoonVal").textContent = String(state.spoons);
    document.getElementById("effectiveCapDisp").textContent = String(g.effectiveCap);

    const formulaBox = document.getElementById("capFormulaBox");
    formulaBox.className = `formula-pill ${g.modifier < 1 ? "modified" : ""}`;
    formulaBox.textContent = isZh
      ? `今日上限 ${g.effectiveCap} = 基线 ${g.baseMax} × 睡眠系数 ${g.modifier.toFixed(2)}（${g.modReasonZh}）`
      : `Today's Cap ${g.effectiveCap} = Base ${g.baseMax} × Sleep ${g.modifier.toFixed(2)} (${g.modReasonEn})`;

    const recharged = state.recharges.filter((r) => r.used).reduce((a, r) => a + r.gain, 0);
    const totalAvail = Math.min(g.baseMax, state.spoons + recharged);
    const spent = state.tasks.filter((t) => t.done).reduce((a, t) => a + Math.min(3, t.cost), 0);
    const remain = Math.max(0, totalAvail - spent);

    document.getElementById("spoonRemainText").textContent = isZh
      ? `剩余体感余额：${remain} / ${totalAvail}（已回充 +${recharged}）`
      : `Remaining capacity: ${remain} / ${totalAvail} (+${recharged} recharged)`;
    document.getElementById("spoonSpentText").textContent = isZh ? `今日已轻耗 ${spent}` : `Spent ${spent}`;
    document.getElementById("spoonBarFill").style.width = `${totalAvail > 0 ? Math.min(100, (remain / totalAvail) * 100) : 0}%`;

    const mb = document.getElementById("spoonModeBadge");
    mb.textContent = g.badge;
    mb.className = `badge ${g.badgeCls}`;

    // Recharges
    document.getElementById("rechargeList").innerHTML = state.recharges
      .map(
        (r) => `
        <label class="recharge-item ${r.used ? "used" : ""}">
          <span><input type="checkbox" class="rc-cb" data-rid="${esc(r.id)}" ${r.used ? "checked" : ""} /> ${esc(isZh ? r.title_zh : r.title_en)}</span>
          <span class="pill">+${r.gain}</span>
        </label>`
      )
      .join("");

    // Tasks (graded Low / Medium / High)
    const maxT = maxTaskTier();
    const dict = I18N[state.lang] || I18N.zh;
    const visible = state.adaptiveFilter ? state.tasks.filter((t) => Math.min(3, t.cost) <= maxT) : state.tasks;
    const ul = document.getElementById("taskList");
    if (!visible.length) {
      ul.innerHTML = `<li class="muted small">${isZh ? "当前状态下无需勉强，可添加一个「🟢 低耗」保底小事或直接休息。" : "No heavy tasks shown — add a Light micro-step or rest."}</li>`;
    } else {
      ul.innerHTML = visible
        .map((t) => {
          const tier = Math.min(3, Math.max(1, Number(t.cost) || 1));
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
                  <span class="pill tier-${tier}">${esc(tierLabel(tier))}</span>
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

    const doneCount = visible.filter((t) => t.done).length;
    document.getElementById("taskStats").textContent = isZh
      ? `当前建议列表已完成 ${doneCount} / ${visible.length}（共 ${state.tasks.length} 项）`
      : `Completed ${doneCount} / ${visible.length} suggested (${state.tasks.length} total)`;

    // Focus one-thing
    const pending = state.tasks.filter((t) => !t.done);
    let cur = pending.find((t) => t.id === state.focusTaskId);
    if (!cur) {
      cur = pending.filter((t) => Math.min(3, t.cost) <= maxT).sort((a, b) => a.cost - b.cost)[0] || pending[0] || null;
      state.focusTaskId = cur ? cur.id : null;
    }
    document.getElementById("focusTaskText").textContent = cur
      ? `${cur.title} (${tierLabel(cur.cost)})`
      : (isZh ? "🎉 今日列表已清空，安心去休息吧。" : "🎉 List clear! Permission to rest.");
  }

  // === TAB 2: SLEEP & REST GUARDIAN ===
  function renderSleepPanel() {
    const isZh = state.lang === "zh";
    document.getElementById("bedTime").value = state.sleep.bedTime;
    document.getElementById("wakeTime").value = state.sleep.wakeTime;
    document.getElementById("sleepQuality").value = String(state.sleep.quality);
    document.getElementById("napMinutes").value = state.sleep.napMinutes;
    document.getElementById("sleepTarget").value = state.sleep.targetHours;
    document.getElementById("sleepNote").value = state.sleep.note || "";

    const sm = computeSleepModifier();
    const badge = document.getElementById("sleepDurationBadge");
    badge.textContent = `${sm.hours.toFixed(1)} h · ×${sm.modifier.toFixed(2)}`;

    const alertEl = document.getElementById("sleepGuardAlert");
    if (sm.modifier < 0.9) {
      badge.className = "badge badge-warn";
      alertEl.className = "callout callout-warn mt-12";
      alertEl.textContent = isZh
        ? `⚠️ 睡眠反向修正已生效（×${sm.modifier.toFixed(2)}）：昨晚睡了 ${sm.hours.toFixed(1)} 小时（质量 ${sm.quality}/5），今日精力上限已从 ${sm.baseMax} 自动下调至 ${sm.effectiveCap}。请优先安排 15–20 分钟午休并提早上床。`
        : `⚠️ Reverse Sleep Modifier active (×${sm.modifier.toFixed(2)}): ${sm.hours.toFixed(1)}h sleep (quality ${sm.quality}/5) automatically reduced today's cap from ${sm.baseMax} to ${sm.effectiveCap}. Prioritize rest tonight.`;
    } else {
      badge.className = "badge badge-good";
      alertEl.className = "callout mt-12";
      alertEl.textContent = isZh
        ? `🟢 睡眠底盘稳健（${sm.hours.toFixed(1)} 小时 · 修正系数 ×${sm.modifier.toFixed(2)} · 今日上限 ${sm.effectiveCap}）。规律睡眠就是低精力人群最好的护城河。`
        : `🟢 Solid sleep foundation (${sm.hours.toFixed(1)}h · modifier ×${sm.modifier.toFixed(2)} · cap ${sm.effectiveCap}).`;
    }

    const data = state.sleepHistory.slice(-7);
    const w = 440, h = 128, padX = 28;
    const stepX = data.length > 1 ? (w - padX * 2) / (data.length - 1) : 0;

    const bars = data.map((d, i) => {
      const cx = padX + i * stepX;
      const barH = Math.min(82, (d.hours / 10) * 82);
      const y = h - 20 - barH;
      return `
        <rect x="${(cx - 11).toFixed(1)}" y="${y.toFixed(1)}" width="22" height="${barH.toFixed(1)}" rx="4" fill="rgba(125,180,220,0.28)" stroke="rgba(125,180,220,0.55)" />
        <text x="${cx.toFixed(1)}" y="${(h - 4).toFixed(1)}" text-anchor="middle" fill="#98a3ad" font-size="9.5">${esc(d.date.slice(-5))}</text>
      `;
    }).join("");

    const pts = data.map((d, i) => {
      const x = padX + i * stepX;
      const norm = Math.min(1, (d.spoons || 5) / sm.baseMax);
      const y = h - 22 - norm * 76;
      return { x, y, ...d };
    });
    const poly = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    const dots = pts.map((p) => `
      <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="#7db4a6" />
      <text x="${p.x.toFixed(1)}" y="${(p.y - 7).toFixed(1)}" text-anchor="middle" fill="#ffd08a" font-size="9">${p.hours}h/${p.spoons}</text>
    `).join("");

    document.getElementById("sleepChartWrap").innerHTML = `
      <svg viewBox="0 0 ${w} ${h}" width="100%" height="132" role="img" aria-label="7-day sleep and energy chart">
        ${bars}
        <polyline fill="none" stroke="#7db4a6" stroke-width="2.5" points="${poly}" />
        ${dots}
      </svg>
    `;

    document.getElementById("sleepHistoryList").innerHTML = [...state.sleepHistory]
      .reverse()
      .slice(0, 7)
      .map(
        (s) => `
        <li class="log-item">
          <div><strong>${esc(s.date)}</strong> · 🌙 ${s.hours}h（质量 ${s.quality}/5）· 🥄 ${s.spoons}</div>
          ${s.note ? `<div class="muted">${esc(s.note)}</div>` : ""}
        </li>`
      )
      .join("");
  }

  // === TAB 3: EMOTION & RUMINATION ===
  function renderEmotionPanel() {
    const isZh = state.lang === "zh";
    document.getElementById("moodChips").innerHTML = window.LEG_PRESETS.moods
      .map(
        (m) => `<button type="button" class="chip ${state.mood === m.id ? "active" : ""}" data-mood="${m.id}">${esc(isZh ? m.zh : m.en)}</button>`
      )
      .join("");

    document.getElementById("ruminationChips").innerHTML = window.LEG_PRESETS.ruminationFlags
      .map((f) => {
        const active = state.ruminationFlags.includes(f.id);
        return `<button type="button" class="chip ${active ? "flag-active" : ""}" data-flag="${f.id}">${esc(isZh ? f.zh : f.en)}</button>`;
      })
      .join("");

    const pauseBox = document.getElementById("gentlePauseBox");
    if (!state.ruminationFlags.length) {
      pauseBox.innerHTML = isZh
        ? "🌿 <strong>当前未标记反刍循环：</strong>如果之后突然发现脑子开始反复纠结、担忧或苛责自己，随时回来点亮对应标签，给自己按下温柔暂停键。"
        : "🌿 <strong>No active rumination loops flagged:</strong> Whenever your mind starts looping or self-criticizing, tap a flag above for a gentle pause cue.";
    } else {
      const advices = window.LEG_PRESETS.ruminationFlags
        .filter((f) => state.ruminationFlags.includes(f.id))
        .map((f) => `<div><strong>${esc(isZh ? f.zh : f.en)}：</strong>${esc(isZh ? f.pause_zh : f.pause_en)}</div>`)
        .join("<hr style='border:0;border-top:1px dashed var(--rest-border);margin:7px 0'/>");
      pauseBox.innerHTML = advices;
    }

    document.getElementById("emoCountBadge").textContent = isZh ? `${state.emotionLogs.length} 条` : `${state.emotionLogs.length} logs`;
    const ul = document.getElementById("emotionLogList");
    if (!state.emotionLogs.length) {
      ul.innerHTML = `<li class="muted small">${isZh ? "暂无情绪/反刍记录。把脑子里打转的一句话倒出来，本身就能减少一半内耗。" : "No mood logs yet. Writing down one looping thought immediately reduces inner friction."}</li>`;
    } else {
      ul.innerHTML = state.emotionLogs
        .map((item) => {
          const moodObj = window.LEG_PRESETS.moods.find((m) => m.id === item.mood);
          const moodLbl = moodObj ? (isZh ? moodObj.zh : moodObj.en) : item.mood;
          const flagLbls = (item.flags || [])
            .map((fid) => {
              const fo = window.LEG_PRESETS.ruminationFlags.find((x) => x.id === fid);
              return fo ? (isZh ? fo.zh : fo.en) : fid;
            })
            .join(" · ");
          return `
            <li class="log-item">
              <div style="display:flex;justify-content:space-between;gap:8px">
                <strong>${esc(item.time)} · ${esc(moodLbl)}</strong>
                <button type="button" class="btn btn-ghost del-emo" data-eid="${esc(item.id)}">✕</button>
              </div>
              ${flagLbls ? `<div class="small" style="color:var(--rest-text);margin:3px 0">${esc(flagLbls)}</div>` : ""}
              <div class="muted">${esc(item.note)}</div>
            </li>`;
        })
        .join("");
    }
  }

  // === TAB 4: OBSIDIAN MARKDOWN GENERATION ===
  function buildDailyMarkdown() {
    const today = todayStr();
    const g = computeGuidance();
    const moodObj = window.LEG_PRESETS.moods.find((m) => m.id === state.mood) || window.LEG_PRESETS.moods[0];
    const flagNames = state.ruminationFlags.map((fid) => {
      const f = window.LEG_PRESETS.ruminationFlags.find((x) => x.id === fid);
      return f ? f.zh : fid;
    });

    const lines = [
      "---",
      `date: ${today}`,
      `sleep_hours: ${g.hours}`,
      `sleep_quality: ${state.sleep.quality}/5`,
      `sleep_modifier: ${g.modifier.toFixed(2)}`,
      `energy_baseline: ${g.baseMax}`,
      `energy_cap_today: ${g.effectiveCap}`,
      `energy_current: ${g.currentEnergy}`,
      `mood: "${moodObj.zh}"`,
      `rumination_flags: [${state.ruminationFlags.join(", ")}]`,
      `pace_mode: "${g.badge}"`,
      "tags: [low-energy-guard, health-archive, daily-log]",
      "---",
      "",
      `# 低精力状态守护档案 (${today})`,
      "",
      "## 🧭 低能耗建议引擎判定",
      `- **当前节奏**：${g.badge}`,
      `- **动态上限**：${g.effectiveCap}（满格基线 ${g.baseMax} × 睡眠修正 ${g.modifier.toFixed(2)}）`,
      `- **今日守护提示**：${g.msg}`,
      `- **今天可以轻做**：${g.doText}`,
      `- **今天允许放过**：${g.restText}`,
      "",
      "## 🌙 睡眠与休息底盘",
      `- 入睡 / 起床：${state.sleep.bedTime} → ${state.sleep.wakeTime}（约 **${g.hours} 小时**）`,
      `- 睡眠质量：**${state.sleep.quality} / 5** ｜ 午休补觉：${state.sleep.napMinutes || 0} 分钟`,
      ...(state.sleep.note ? [`- 睡眠体感：${state.sleep.note}`] : []),
      "",
      "## 🥄 相对精力与分级小事",
      `- 今日相对精力：**${g.currentEnergy} / ${g.effectiveCap}**`,
      ...state.tasks.map((t) => `- [${t.done ? "x" : " "}] ${t.title} (${tierLabel(t.cost)} · #${t.tag})`),
      "",
      "## 🫧 情绪与反刍记录",
      `- 当前情绪：${moodObj.zh}`,
      `- 反刍标记：${flagNames.length ? flagNames.join("、") : "无"}`,
      ...(state.emotionLogs.slice(0, 5).map((e) => `- **${e.time}**：${e.note}`))
    ];
    return lines.join("\n");
  }

  function buildWeeklyMarkdown() {
    const today = todayStr();
    const recent = state.sleepHistory.slice(-7);
    const avgSleep = recent.length ? (recent.reduce((a, x) => a + x.hours, 0) / recent.length).toFixed(1) : "0";
    const avgSpoons = recent.length ? (recent.reduce((a, x) => a + (x.spoons || 5), 0) / recent.length).toFixed(1) : "0";
    const lines = [
      "---",
      `date: ${today}`,
      `avg_sleep_hours: ${avgSleep}`,
      `avg_energy: ${avgSpoons}`,
      "tags: [low-energy-guard, weekly-review]",
      "---",
      "",
      `# 低精力 7 日底盘周报 (${today})`,
      "",
      `- **近 7 日平均睡眠**：${avgSleep} 小时`,
      `- **近 7 日平均相对精力**：${avgSpoons} / ${state.personalMax}`,
      "",
      "## 每日睡眠 × 精力记录",
      "| 日期 | 睡眠时长 | 睡眠质量 | 相对精力 | 备注 |",
      "| :--- | :--- | :--- | :--- | :--- |",
      ...recent.map((r) => `| ${r.date} | ${r.hours}h | ${r.quality}/5 | ${r.spoons} | ${r.note || "-"} |`),
      "",
      "## 近期情绪与反刍摘录",
      ...(state.emotionLogs.length
        ? state.emotionLogs.slice(0, 10).map((e) => `- **${e.time}**：${e.note}`)
        : ["- 暂无记录"])
    ];
    return lines.join("\n");
  }

  function renderObsidianPreview() {
    document.getElementById("markdownPreview").textContent = buildDailyMarkdown();
  }

  function downloadFile(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  // === TIMERS ===
  let eyeTimer = null, eyeSec = 1200;
  function renderEye() {
    document.getElementById("eyeDisp").textContent = `${String(Math.floor(eyeSec / 60)).padStart(2, "0")}:${String(eyeSec % 60).padStart(2, "0")}`;
  }
  document.getElementById("eyeBtn").addEventListener("click", () => {
    if (eyeTimer) { clearInterval(eyeTimer); eyeTimer = null; eyeSec = 1200; renderEye(); return; }
    eyeTimer = setInterval(() => {
      eyeSec -= 1;
      if (eyeSec <= 0) {
        clearInterval(eyeTimer); eyeTimer = null; eyeSec = 1200; renderEye();
        alert(state.lang === "zh" ? "👁️ 20-20-20 护眼提醒：远眺 6 米外 20 秒，轻眨眼放松。" : "👁️ 20-20-20 Eye Break: look 20 ft away for 20 seconds.");
        return;
      }
      renderEye();
    }, 1000);
  });

  let starterTimer = null, starterSec = 300;
  function renderStarter() {
    document.getElementById("starterDisp").textContent = `${String(Math.floor(starterSec / 60)).padStart(2, "0")}:${String(starterSec % 60).padStart(2, "0")}`;
  }
  document.getElementById("starterBtn").addEventListener("click", () => {
    if (starterTimer) { clearInterval(starterTimer); starterTimer = null; starterSec = 300; renderStarter(); return; }
    starterTimer = setInterval(() => {
      starterSec -= 1;
      if (starterSec <= 0) {
        clearInterval(starterTimer); starterTimer = null; starterSec = 300; renderStarter();
        showToast(state.lang === "zh" ? "🎉 5 分钟温柔启动完成！你可以继续，也可以安心停手休息。" : "🎉 5 minutes done! Continue gently or stop guilt-free.");
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
      { cls: "inhale", lbl: isZh ? "吸气 4s" : "In 4s", cue: isZh ? "用鼻缓缓吸气，放下紧绷的肩膀..." : "Inhale gently through your nose...", ms: 4000 },
      { cls: "hold", lbl: isZh ? "停留 7s" : "Hold 7s", cue: isZh ? "舒适柔和地停留，不勉强憋气..." : "Hold softly without strain...", ms: 7000 },
      { cls: "exhale", lbl: isZh ? "呼气 8s" : "Out 8s", cue: isZh ? "缓缓吐气，让打转的思绪落下来..." : "Exhale slowly and let looping thoughts settle...", ms: 8000 }
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

  // === 2-CLICK QUICK CHECK-IN EVENTS ===
  document.getElementById("quickSleepRow").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-qsleep]");
    if (!btn) return;
    const mode = btn.dataset.qsleep;
    state.quickSleepChoice = mode;
    if (mode === "poor") {
      state.sleep.bedTime = "01:30";
      state.sleep.wakeTime = "07:00";
      state.sleep.quality = 2;
    } else if (mode === "fair") {
      state.sleep.bedTime = "00:30";
      state.sleep.wakeTime = "07:00";
      state.sleep.quality = 3;
    } else {
      state.sleep.bedTime = "23:12";
      state.sleep.wakeTime = "07:00";
      state.sleep.quality = 4;
    }
    const sm = computeSleepModifier();
    if (state.spoons > sm.effectiveCap) state.spoons = sm.effectiveCap;
    saveState();
    renderAll();
  });

  document.getElementById("quickStateRow").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-qstate]");
    if (!btn) return;
    const s = btn.dataset.qstate;
    state.quickStateChoice = s;
    const sm = computeSleepModifier();
    if (s === "drained") {
      state.mood = "tired";
      state.spoons = Math.max(1, Math.round(sm.effectiveCap * 0.35));
    } else if (s === "rumination") {
      state.mood = "anxious";
      if (!state.ruminationFlags.includes("over_review")) state.ruminationFlags.push("over_review");
      state.spoons = Math.max(1, Math.round(sm.effectiveCap * 0.5));
    } else if (s === "steady") {
      state.mood = "calm";
      state.ruminationFlags = [];
      state.spoons = Math.max(1, Math.round(sm.effectiveCap * 0.72));
    } else {
      state.mood = "recovering";
      state.ruminationFlags = [];
      state.spoons = sm.effectiveCap;
    }
    saveState();
    renderAll();
  });

  // === NAVIGATION & GLOBAL EVENTS ===
  document.querySelectorAll(".tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      document.querySelectorAll(".tab").forEach((b) => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });
      document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("active", p.id === `panel-${target}`));
      if (target === "obsidian") renderObsidianPreview();
    });
  });

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

  document.getElementById("quickExportBtn").addEventListener("click", () => {
    downloadFile(`LowEnergy-Daily-${todayStr()}.md`, buildDailyMarkdown(), "text/markdown;charset=utf-8");
    showToast(state.lang === "zh" ? "✅ 已导出今日 Obsidian 档案！" : "✅ Exported today's Obsidian note!");
  });

  // Personal baseline & slider
  document.getElementById("personalMaxInput").addEventListener("input", (e) => {
    const val = Math.min(15, Math.max(5, Number(e.target.value) || 10));
    state.personalMax = val;
    const sm = computeSleepModifier();
    if (state.spoons > sm.effectiveCap) state.spoons = sm.effectiveCap;
    saveState();
    renderAll();
  });

  document.getElementById("spoonSlider").addEventListener("input", (e) => {
    state.spoons = Number(e.target.value);
    saveState();
    renderGuidanceEngine();
    renderSpoonPanel();
    renderObsidianPreview();
  });

  document.getElementById("adaptiveFilter").addEventListener("change", (e) => {
    state.adaptiveFilter = e.target.checked;
    saveState();
    renderSpoonPanel();
  });

  document.getElementById("pickLightBtn").addEventListener("click", () => {
    const maxT = maxTaskTier();
    const pool = state.tasks.filter((t) => !t.done && Math.min(3, t.cost) <= maxT);
    const list = pool.length ? pool : state.tasks.filter((t) => !t.done);
    if (!list.length) return;
    state.focusTaskId = list[Math.floor(Math.random() * list.length)].id;
    saveState();
    renderSpoonPanel();
  });

  document.getElementById("focusDoneBtn").addEventListener("click", () => {
    if (!state.focusTaskId) return;
    const t = state.tasks.find((x) => x.id === state.focusTaskId);
    if (t) t.done = true;
    state.focusTaskId = null;
    saveState();
    renderAll();
  });

  document.getElementById("rechargeList").addEventListener("change", (e) => {
    if (!e.target.classList.contains("rc-cb")) return;
    const r = state.recharges.find((x) => x.id === e.target.dataset.rid);
    if (r) r.used = e.target.checked;
    saveState();
    renderSpoonPanel();
  });

  document.getElementById("resetRechargeBtn").addEventListener("click", () => {
    state.recharges.forEach((r) => (r.used = false));
    saveState();
    renderSpoonPanel();
  });

  document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("taskInput").value.trim();
    if (!title) return;
    state.tasks.unshift({
      id: "t-" + Date.now(),
      title,
      cost: Math.min(3, Math.max(1, Number(document.getElementById("taskCost").value) || 1)),
      tag: document.getElementById("taskTag").value.trim() || "微行动",
      done: false,
      steps: []
    });
    document.getElementById("taskInput").value = "";
    document.getElementById("taskTag").value = "";
    saveState();
    renderSpoonPanel();
    renderObsidianPreview();
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
      renderSpoonPanel();
      renderObsidianPreview();
    } else if (e.target.classList.contains("del-task")) {
      state.tasks = state.tasks.filter((t) => t.id !== tid);
      saveState();
      renderSpoonPanel();
      renderObsidianPreview();
    } else if (e.target.classList.contains("focus-this")) {
      state.focusTaskId = tid;
      saveState();
      renderSpoonPanel();
    } else if (e.target.classList.contains("add-step-btn")) {
      const inp = card.querySelector(".step-input");
      const text = inp.value.trim();
      if (!text) return;
      task.steps = task.steps || [];
      task.steps.push({ id: "s-" + Date.now(), text, done: false });
      saveState();
      renderSpoonPanel();
    } else if (e.target.classList.contains("step-cb")) {
      const st = (task.steps || []).find((s) => s.id === e.target.dataset.sid);
      if (st) st.done = e.target.checked;
      saveState();
      renderSpoonPanel();
    } else if (e.target.classList.contains("del-step")) {
      task.steps = (task.steps || []).filter((s) => s.id !== e.target.dataset.sid);
      saveState();
      renderSpoonPanel();
    }
  });

  document.getElementById("resetTasksBtn").addEventListener("click", () => {
    state.tasks.forEach((t) => {
      t.done = false;
      (t.steps || []).forEach((s) => (s.done = false));
    });
    saveState();
    renderSpoonPanel();
    renderObsidianPreview();
  });

  // Sleep interactions
  ["bedTime", "wakeTime", "sleepQuality", "napMinutes", "sleepTarget"].forEach((id) => {
    document.getElementById(id).addEventListener("input", () => {
      state.sleep.bedTime = document.getElementById("bedTime").value;
      state.sleep.wakeTime = document.getElementById("wakeTime").value;
      state.sleep.quality = Number(document.getElementById("sleepQuality").value) || 3;
      state.sleep.napMinutes = Number(document.getElementById("napMinutes").value) || 0;
      state.sleep.targetHours = Number(document.getElementById("sleepTarget").value) || 7.5;
      state.quickSleepChoice = "";
      saveState();
      renderAll();
    });
  });

  document.getElementById("sleepForm").addEventListener("submit", (e) => {
    e.preventDefault();
    state.sleep.bedTime = document.getElementById("bedTime").value;
    state.sleep.wakeTime = document.getElementById("wakeTime").value;
    state.sleep.quality = Number(document.getElementById("sleepQuality").value) || 3;
    state.sleep.napMinutes = Number(document.getElementById("napMinutes").value) || 0;
    state.sleep.targetHours = Number(document.getElementById("sleepTarget").value) || 7.5;
    state.sleep.note = document.getElementById("sleepNote").value.trim();

    const today = todayStr().slice(5);
    const sm = computeSleepModifier();
    const entry = { date: today, hours: sm.hours, quality: sm.quality, spoons: Math.min(state.spoons, sm.effectiveCap), note: state.sleep.note };
    const idx = state.sleepHistory.findIndex((h) => h.date === today);
    if (idx >= 0) state.sleepHistory[idx] = entry;
    else state.sleepHistory.push(entry);
    state.sleepHistory = state.sleepHistory.slice(-14);
    saveState();
    renderAll();
    showToast(state.lang === "zh" ? `✅ 已保存今日睡眠（${sm.hours}h · 上限修正为 ${sm.effectiveCap}）` : `✅ Saved sleep (${sm.hours}h · cap adjusted to ${sm.effectiveCap})`);
  });

  // Emotion & Rumination interactions
  document.getElementById("moodChips").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-mood]");
    if (!btn) return;
    state.mood = btn.dataset.mood;
    saveState();
    renderAll();
  });

  document.getElementById("ruminationChips").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-flag]");
    if (!btn) return;
    const f = btn.dataset.flag;
    if (state.ruminationFlags.includes(f)) state.ruminationFlags = state.ruminationFlags.filter((x) => x !== f);
    else state.ruminationFlags.push(f);
    saveState();
    renderAll();
  });

  document.getElementById("clearRuminationBtn").addEventListener("click", () => {
    state.ruminationFlags = [];
    saveState();
    renderAll();
  });

  document.getElementById("emotionForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const note = document.getElementById("emotionNote").value.trim();
    if (!note) return;
    const now = new Date();
    const time = `${todayStr()} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    state.emotionLogs.unshift({
      id: "emo-" + Date.now(),
      time,
      mood: state.mood,
      flags: [...state.ruminationFlags],
      note
    });
    document.getElementById("emotionNote").value = "";
    saveState();
    renderEmotionPanel();
    renderObsidianPreview();
  });

  document.getElementById("emotionLogList").addEventListener("click", (e) => {
    if (!e.target.classList.contains("del-emo")) return;
    state.emotionLogs = state.emotionLogs.filter((x) => x.id !== e.target.dataset.eid);
    saveState();
    renderEmotionPanel();
    renderObsidianPreview();
  });

  // Obsidian & JSON backup
  document.getElementById("copyMdBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildDailyMarkdown());
      showToast(state.lang === "zh" ? "✅ 已复制到剪贴板，可直接粘贴进 Obsidian！" : "✅ Copied Markdown to clipboard!");
    } catch {
      showToast(state.lang === "zh" ? "请手动全选下方预览框复制，或直接点击下载 .md" : "Please copy from the preview box or click Download .md");
    }
  });

  document.getElementById("downloadDailyMdBtn").addEventListener("click", () => {
    downloadFile(`LowEnergy-Daily-${todayStr()}.md`, buildDailyMarkdown(), "text/markdown;charset=utf-8");
    showToast(state.lang === "zh" ? "✅ 已下载今日 Obsidian 档案 (.md)" : "✅ Downloaded today's .md");
  });

  document.getElementById("downloadWeeklyMdBtn").addEventListener("click", () => {
    downloadFile(`LowEnergy-Weekly-${todayStr()}.md`, buildWeeklyMarkdown(), "text/markdown;charset=utf-8");
    showToast(state.lang === "zh" ? "✅ 已导出近 7 天周报 (.md)" : "✅ Exported 7-day weekly .md");
  });

  document.getElementById("exportJsonBtn").addEventListener("click", () => {
    downloadFile(`low-energy-guard-backup-${todayStr()}.json`, JSON.stringify(state, null, 2), "application/json");
    showToast(state.lang === "zh" ? "✅ 已导出全量 JSON 本地备份！" : "✅ Exported JSON backup!");
  });

  document.getElementById("importJsonInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        state = {
          ...structuredClone(defaultState),
          ...parsed,
          personalMax: Math.min(15, Math.max(5, Number(parsed.personalMax) || 10)),
          sleep: { ...defaultState.sleep, ...(parsed.sleep || {}) }
        };
        saveState();
        renderAll();
        showToast(state.lang === "zh" ? "✅ 本地备份已成功恢复！" : "✅ Backup restored!");
      } catch {
        showToast(state.lang === "zh" ? "❌ JSON 文件无效" : "❌ Invalid JSON file");
      }
    };
    reader.readAsText(file);
  });

  function renderAll() {
    applyThemeAndLang();
    document.getElementById("adaptiveFilter").checked = state.adaptiveFilter;
    renderQuickBar();
    renderEye();
    renderStarter();
    renderGuidanceEngine();
    renderSpoonPanel();
    renderSleepPanel();
    renderEmotionPanel();
    renderObsidianPreview();
  }

  renderAll();
})();
