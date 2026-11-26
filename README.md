<div align="center">

# 🛡️ Low-Energy-Guard

> **Low-Energy-Guard is not a hustle productivity app — it is your low-energy state guardian. It helps you keep a steady rhythm during low days, reduce inner friction, and stabilize sleep and body before chasing growth.**

*Built for low-energy, highly sensitive, and easily drained minds. 100% Local-First, zero cloud, zero dependencies.*

[简体中文](./README_CN.md) · [Live Demo](https://zhonglongluo.github.io/low-energy-guard/) · [Core Modules](#-5-core-modules) · [Quick Start](#-quick-start) · [Contributing](./CONTRIBUTING.md)

![Zero Dependencies](https://img.shields.io/badge/dependencies-0-7db4a6?style=flat-square)
![Local First](https://img.shields.io/badge/privacy-100%25%20local--first-5a9b8b?style=flat-square)
![Bilingual](https://img.shields.io/badge/i18n-EN%20%2F%20%E4%B8%AD%E6%96%87-7db4a6?style=flat-square)
![Obsidian Ready](https://img.shields.io/badge/export-Obsidian%20.md-8b6cef?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

<br/>

<img src="./assets/preview.svg" alt="Low-Energy-Guard Preview" width="900" />

</div>

---

## 🌱 Core Philosophy

**Sleep, environment, temperament, and body are the true foundation of life.**

Most productivity apps push relentless self-discipline, turning low-battery days into guilt spirals. **Low-Energy-Guard** does the opposite: it checks your sleep, energy spoons, and emotional rumination first — then gently tells you what is safe to do lightly today, and what you have full permission to skip.

---

## 🧩 5 Core Modules

### 1. 🥄 Spoon Energy Management
- Log your real daily energy budget (`1–12 spoons`) plus recharge actions (`+1 / +2` for naps, walks, breathing, warm food).
- Grade tasks by energy cost (`1–4 spoons`) and auto-hide overload on low days.
- Includes a **"Just One Small Thing" picker** + **5-minute gentle starter** to break paralysis without pressure.

### 2. 🌙 Sleep & Rest Guardian
- Log bedtime, wake time (automatic duration calculation across midnight), sleep quality (`1–5`), and daytime naps.
- Serves as the **primary foundation metric** feeding the Guidance Engine, triggering gentle overdraft protection whenever sleep falls below your baseline.
- Dual-metric **7-Day Sleep × Energy SVG Rhythm Chart**.

### 3. 🫧 Emotion & Rumination Record
- 1-click mood check-in + instant rumination loop flags (**over-reviewing the past, future worry loops, self-attack, guilt while resting**).
- Displays non-preachy **Gentle Pause Prescriptions** alongside a **4-7-8 breathing pacer** and a private thought-parking log.

### 4. 📝 Obsidian Export & Local Health Archive
- Live Markdown preview with clean **YAML Frontmatter** (`sleep_hours`, `sleep_quality`, `spoons`, `mood`, `rumination_flags`, `pace_mode`).
- 1-click **Copy Markdown**, **Daily `.md` Download**, **7-Day Weekly Summary `.md`**, and full **JSON Backup/Restore** ([JSON Schema](./schema/state.schema.json)).
- Zero cloud servers — your personal health archive stays 100% on your own device.

### 5. 🧭 Low-Energy Guidance Engine
- Zero hustle slogans. Zero toxic positivity.
- Combines **Sleep + Spoons + Rumination Signals** in real time to output a calm daily pacing recommendation (e.g., *"Low energy today — do just one tiny 1-spoon thing and prioritize early rest."*).

---

## 🚀 Quick Start

```bash
git clone https://github.com/zhonglongluo/low-energy-guard.git
cd low-energy-guard
open index.html   # runs 100% offline with zero build tools
```

Or open the hosted static app directly: **https://zhonglongluo.github.io/low-energy-guard/**

---

## 🔗 More Local-First Tools
- 🚦 **[Med × Alcohol Guard](https://github.com/zhonglongluo/med-alcohol-guard)** — Offline medication × alcohol interaction traffic-light checker & multi-drink BAC estimator.

## 📄 License
[MIT](./LICENSE)
