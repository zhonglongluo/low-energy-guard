// Universal, low-friction defaults for Low-Energy-Guard (bilingual EN/ZH)
window.LEG_PRESETS = {
  tasks: [
    {
      id: "t-1",
      title: "喝一杯温水，简单伸展肩颈 / Drink warm water & stretch",
      cost: 1,
      tag: "身体底盘",
      done: false,
      steps: []
    },
    {
      id: "t-2",
      title: "回复 1 条最重要或最轻的消息 / Reply to 1 light message",
      cost: 1,
      tag: "极小动作",
      done: false,
      steps: [
        { id: "s-1", text: "只打开对话框，用两句话回复即可", done: false }
      ]
    },
    {
      id: "t-3",
      title: "用 15 分钟推进 1 项日常阅读或文档整理 / 15-min calm focus",
      cost: 2,
      tag: "温和推进",
      done: false,
      steps: [
        { id: "s-2", text: "只开 1 个文档，关掉多余标签页", done: false },
        { id: "s-3", text: "写下 3 行要点就允许停手", done: false }
      ]
    },
    {
      id: "t-4",
      title: "精力平稳时再处理 1 项复杂任务 / 1 deep task (only if rested)",
      cost: 3,
      tag: "高耗主线",
      done: false,
      steps: []
    }
  ],

  recharges: [
    { id: "r-1", title_zh: "闭眼平躺 / 小睡 15–20 分钟", title_en: "15–20 min quiet rest or nap", gain: 2, used: false },
    { id: "r-2", title_zh: "做 3 轮 4-7-8 呼吸，放下手机", title_en: "3 rounds of 4-7-8 breathing (phone away)", gain: 1, used: false },
    { id: "r-3", title_zh: "出门晒太阳或慢走 10 分钟", title_en: "10-min daylight slow walk", gain: 1, used: false },
    { id: "r-4", title_zh: "吃一顿温热好消化的食物 + 补水", title_en: "Warm nourishing meal + hydration", gain: 1, used: false }
  ],

  moods: [
    { id: "calm", zh: "🌿 平静平稳", en: "🌿 Calm" },
    { id: "tired", zh: "🪫 疲惫发沉", en: "🪫 Drained" },
    { id: "sensitive", zh: "🌊 敏感易累", en: "🌊 Sensitive" },
    { id: "anxious", zh: "☁️ 紧绷焦虑", en: "☁️ Tense" },
    { id: "low", zh: "🌧️ 低落提不起劲", en: "🌧️ Low" },
    { id: "recovering", zh: "🌤️ 略有回暖", en: "🌤️ Recovering" }
  ],

  ruminationFlags: [
    {
      id: "over_review",
      zh: "🔁 反复复盘过去",
      en: "🔁 Over-reviewing past",
      pause_zh: "大脑在低电状态下复盘，很容易把小事放大成失败。给复盘设一个 20 分钟休止符：先写下一句话，等睡饱后再看。",
      pause_en: "Reviewing on low battery magnifies flaws. Write one line to park it and revisit only after proper sleep."
    },
    {
      id: "worry",
      zh: "☁️ 过度担忧未来",
      en: "☁️ Future worry loop",
      pause_zh: "担忧无法提前解决明天的不确定性，却会立刻烧光今天的电量。把视角拉回未来 2 小时：此刻只需要照顾好身体。",
      pause_en: "Worrying drains today's spoons without solving tomorrow. Shrink your horizon to the next 2 hours only."
    },
    {
      id: "self_attack",
      zh: "🪞 自我攻击 / 苛责",
      en: "🪞 Self-attack / harsh inner critic",
      pause_zh: "请立刻按下暂停键：精力低不是品格缺陷，也不是懒惰，只是身体的保护机制在提示你“该充电了”。像对待疲惫的朋友一样对待自己。",
      pause_en: "Press pause immediately: low energy is a biological signal, not a character flaw. Speak to yourself like a tired friend."
    },
    {
      id: "guilt_rest",
      zh: "🧊 休息时充满愧疚",
      en: "🧊 Guilt while resting",
      pause_zh: "带着愧疚躺着并不能真正回血。现在正式批给自己 30 分钟“无愧疚合法休息”——不刷焦虑信息、不列计划。",
      pause_en: "Guilty rest doesn't recharge. Grant yourself 30 minutes of guilt-free, screen-light recovery right now."
    }
  ]
};
