<div align="center">

# 🥄 Spoon Planner（勺子电量管家）

**面向低精力人群与 ADHD 的 Local-First 勺子电量任务系统**

*无焦虑红点 · 无云端账号 · 每天先选今日电量（1–12 勺），自动隐藏超载任务，用 5 分钟温柔启动打破瘫痪，一键导出 Obsidian 复盘。*

[English README](./README.md) · [在线免安装体验](https://zhonglongluo.github.io/spoon-planner/) · [核心功能](#-核心功能) · [参与贡献](./CONTRIBUTING.md)

<br/>

<img src="./assets/preview.svg" alt="Spoon Planner 预览" width="900" />

</div>

---

## 💡 为什么做 Spoon Planner？

传统待办软件默认你每天都是满电状态——清单越长，对低精力或 ADHD 人群越容易引发**执行瘫痪与自我苛责**。

**Spoon Planner** 引入 **「勺子理论（Spoon Theory）」**：
- 管理的不是时间，而是每天有限的**精力预算**；
- 低电日自动切入「低电保底模式」，隐藏高耗任务，完成 1–2 件极小微行动就算赢；
- 纯前端零依赖、100% 本地优先，支持 **Obsidian Markdown 导出**与 **JSON 备份**。

---

## ✨ 核心功能

1. **🥄 1–12 勺动态电量预算 & 电量回充**
   - 自动匹配四档模式：**低电保底（1–3） / 低耗巡航（4–6） / 平稳推进（7–9） / 充沛 80% 留白法则（10–12）**。
   - 完成任务扣减勺数，勾选**回充动作**（小睡 15 分钟、呼吸放松、晒太阳等）可实时回充 +1/+2 勺。
2. **🎯 专治启动瘫痪：只做一件事 + 5 分钟温柔启动**
   - 一键 **「帮我选一件最轻的」** 消除选择困难，配合 **5 分钟倒计时**（只做 5 分钟，到点允许光荣停手）。
3. **🪜 任务内联拆解（Micro-Steps）+ 🧠 杂念暂存箱（Brain Dump）**
   - 任何大任务都能直接在卡片内拆成 2 分钟极小步骤；
   - 专注时突然跳出的想法先丢进**杂念暂存箱**，事后一键转为正式微行动。
4. **🫧 自主神经调节 & 7 天节律图**
   - 内置 **4-7-8 呼吸节拍器**、顶部 **20-20-20 护眼计时**、**近 7 天精力 SVG 折线图**。
   - **中英双语一键切换** + **护眼暖暗 / 暖纸日间** 双低刺激主题 + **Obsidian `.md` 导出**。

---

## 🚀 快速启动

```bash
git clone https://github.com/zhonglongluo/spoon-planner.git
cd spoon-planner
open index.html
```

或直接使用在线静态版：**https://zhonglongluo.github.io/spoon-planner/**

---

## 🔗 更多 Local-First 开源工具
- 🚦 **[Med × Alcohol Guard](https://github.com/zhonglongluo/med-alcohol-guard)** — 离线药物×酒精禁忌红绿灯速查与多杯代谢估算器。

## 📄 License
[MIT](./LICENSE)
