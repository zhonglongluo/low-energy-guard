// Default bilingual tasks & recharge presets for Spoon Planner
window.SPOON_PRESETS = {
  tasks: [
    {
      id: "sp-1",
      title: "喝 300ml 温水 + 活动颈肩 1 分钟 / Drink warm water & stretch",
      cost: 1,
      tag: "Baseline",
      done: false,
      steps: []
    },
    {
      id: "sp-2",
      title: "清理收件箱或回复 1 条积压消息 / Clear 1 pending message",
      cost: 1,
      tag: "Light Admin",
      done: false,
      steps: [
        { id: "st-1", text: "打开应用并选中最简单的一条", done: false },
        { id: "st-2", text: "写两句话发送即可，不追求完美", done: false }
      ]
    },
    {
      id: "sp-3",
      title: "用 15 分钟推进 1 项主线阅读或笔记 / 15-min focused reading",
      cost: 2,
      tag: "Learning",
      done: false,
      steps: [
        { id: "st-3", text: "只打开目标文档并关掉多余标签页", done: false },
        { id: "st-4", text: "记下 3 条核心要点后立刻停笔", done: false }
      ]
    },
    {
      id: "sp-4",
      title: "攻克 1 项深度工作或复杂规划 / 1 Deep-Work Block",
      cost: 3,
      tag: "Deep Work",
      done: false,
      steps: [
        { id: "st-5", text: "先写 3 行粗糙大纲，破除空白页恐惧", done: false },
        { id: "st-6", text: "完成第一版草稿即收工", done: false }
      ]
    }
  ],

  recharges: [
    { id: "rc-1", title_zh: "闭眼静休 / 小睡 15 分钟", title_en: "15-min quiet rest or power nap", gain: 2, usedToday: false },
    { id: "rc-2", title_zh: "做 3 轮 4-7-8 舒缓呼吸", title_en: "3 rounds of 4-7-8 breathing", gain: 1, usedToday: false },
    { id: "rc-3", title_zh: "出门晒太阳 / 轻走 10 分钟", title_en: "10-min daylight walk outside", gain: 1, usedToday: false },
    { id: "rc-4", title_zh: "补充电解质水与温热食物", title_en: "Hydrate + warm nourishing snack", gain: 1, usedToday: false }
  ]
};
