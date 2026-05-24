// ===== State =====
const State = {
  currentView: "home",
  currentScenarioId: null,
  currentModuleKey: "tagline",
  flashcard: {
    scenarioId: null,
    cards: [],
    index: 0,
    flipped: false,
    mastered: new Set(),
    again: new Set(),
  },
  quiz: {
    scenarioId: null,
    questions: [],
    index: 0,
    answers: [],
    submitted: false,
  },
  progress: loadProgress(),
  edit: {
    scenarioId: null,
    form: null,
  },
};

// ===== Progress Storage =====
function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem("slc_progress") || "{}");
  } catch { return {}; }
}
function saveProgress() {
  localStorage.setItem("slc_progress", JSON.stringify(State.progress));
}
function markCardMastered(cardId) {
  if (!State.progress.mastered) State.progress.mastered = {};
  State.progress.mastered[cardId] = true;
  saveProgress();
}
function getScenarioProgress(scenarioId) {
  const mastered = State.progress.mastered || {};
  const cards = generateFlashcards(getScenarios().find(s => s.id === scenarioId));
  const masteredCount = cards.filter(c => mastered[c.id]).length;
  return { total: cards.length, mastered: masteredCount, pct: Math.round((masteredCount / cards.length) * 100) };
}
function getOverallProgress() {
  let total = 0, mastered = 0;
  getScenarios().forEach(s => {
    const p = getScenarioProgress(s.id);
    total += p.total;
    mastered += p.mastered;
  });
  return { total, mastered, pct: total > 0 ? Math.round((mastered / total) * 100) : 0 };
}

// ===== Router =====
function navigate(view, params = {}) {
  State.currentView = view;
  Object.assign(State, params);
  render();
  window.scrollTo(0, 0);
}

// ===== Main Render =====
function render() {
  const app = document.getElementById("app");
  switch (State.currentView) {
    case "home":              app.innerHTML = renderHome(); break;
    case "scenario":          app.innerHTML = renderScenarioDetail(); break;
    case "flashcard":         app.innerHTML = renderFlashcard(); break;
    case "flashcard-result":  app.innerHTML = renderFlashcardResult(); break;
    case "quiz":              app.innerHTML = renderQuiz(); break;
    case "quiz-result":       app.innerHTML = renderQuizResult(); break;
    case "progress":          app.innerHTML = renderProgress(); break;
    case "mode-select":       app.innerHTML = renderModeSelect(); break;
    case "manage":            app.innerHTML = renderManage(); break;
    case "scenario-edit":     app.innerHTML = renderScenarioEdit(); break;
    default:                  app.innerHTML = renderHome();
  }
  bindEvents();
}

// ===== Home Screen =====
function renderHome() {
  const overall = getOverallProgress();
  return `
  <div class="app-shell">
    ${renderHeader({ title: "销售场景战卡", subtitle: "碎片时间，持续成长", showBack: false })}
    <div class="main-content has-bottom-nav">
      <div class="home-hero">
        <div class="home-hero-title">⚡ 六大销售场景</div>
        <div class="home-hero-sub">掌握场景话术，成为行业解决方案专家</div>
        <div class="home-stats">
          <div class="stat-item">
            <div class="stat-num">${getScenarios().length}</div>
            <div class="stat-label">销售场景</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">${overall.mastered}</div>
            <div class="stat-label">已掌握知识点</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">${overall.pct}%</div>
            <div class="stat-label">整体进度</div>
          </div>
        </div>
      </div>

      <div class="section-title">📋 选择场景学习</div>
      <div class="scenario-grid">
        ${getScenarios().map(s => renderScenarioCard(s)).join("")}
      </div>

      <div class="section-title">⚡ 快速练习</div>
      <div class="quick-actions">
        <button class="quick-action-btn" data-action="all-flashcards">
          <span class="qa-icon">🃏</span>
          <div class="qa-text">
            <div class="qa-title">全场景闪卡</div>
            <div class="qa-desc">随机抽取，巩固记忆</div>
          </div>
        </button>
        <button class="quick-action-btn" data-action="all-quiz">
          <span class="qa-icon">📝</span>
          <div class="qa-text">
            <div class="qa-title">综合测验</div>
            <div class="qa-desc">检验学习效果</div>
          </div>
        </button>
        <button class="quick-action-btn" data-action="scripts-review">
          <span class="qa-icon">💬</span>
          <div class="qa-text">
            <div class="qa-title">话术速查</div>
            <div class="qa-desc">六大场景开场话术</div>
          </div>
        </button>
        <button class="quick-action-btn" data-action="progress-view">
          <span class="qa-icon">📊</span>
          <div class="qa-text">
            <div class="qa-title">学习进度</div>
            <div class="qa-desc">${overall.pct}% 完成</div>
          </div>
        </button>
      </div>
    </div>
    ${renderBottomNav("home")}
  </div>`;
}

function renderScenarioCard(scenario) {
  const prog = getScenarioProgress(scenario.id);
  return `
  <div class="scenario-card ${prog.pct === 100 ? 'completed' : ''}" data-scenario-id="${scenario.id}">
    <div class="scenario-card-accent" style="background:${scenario.color}"></div>
    <span class="scenario-icon">${scenario.icon}</span>
    <div class="scenario-name">${scenario.name}</div>
    <div class="scenario-summary">${scenario.summary}</div>
    <div class="scenario-progress">
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill theme-${scenario.theme}" style="width:${prog.pct}%"></div>
      </div>
      <div class="progress-label">${prog.mastered}/${prog.total} 已掌握</div>
    </div>
  </div>`;
}

// ===== Scenario Detail =====
function renderScenarioDetail() {
  const scenario = getScenarios().find(s => s.id === State.currentScenarioId);
  if (!scenario) return renderHome();
  const m = scenario.modules;
  const activeKey = State.currentModuleKey || "tagline";

  return `
  <div class="app-shell">
    ${renderHeader({
      title: scenario.name,
      subtitle: scenario.summary,
      showBack: true,
      backView: "home",
      accent: scenario.color,
      actions: `<button class="header-btn" data-action="scenario-flashcard" data-scenario-id="${scenario.id}">🃏 练习</button>`
    })}

    <div class="scenario-detail-hero" style="background:linear-gradient(180deg, ${scenario.color} 0%, var(--bg) 100%)">
      <div class="scenario-detail-icon">${scenario.icon}</div>
      <div class="scenario-detail-name">${scenario.name}</div>
      <div class="scenario-detail-tagline">${m.tagline}</div>
    </div>

    <div class="module-tabs-wrap">
      <div class="module-tabs" id="moduleTabs">
        ${MODULE_CONFIG.map(mod => `
          <div class="module-tab ${activeKey === mod.key ? 'active' : ''}" data-module="${mod.key}">
            ${mod.icon} ${mod.label}
          </div>
        `).join("")}
      </div>
    </div>

    <div class="main-content has-bottom-nav" style="padding-top:8px">
      ${MODULE_CONFIG.map(mod => `
        <div class="module-content ${activeKey === mod.key ? 'active' : ''}" id="module-${mod.key}">
          ${renderModuleContent(mod.key, m, scenario)}
        </div>
      `).join("")}

      <div class="module-cta">
        <button class="btn btn-primary" data-action="scenario-flashcard" data-scenario-id="${scenario.id}">
          🃏 闪卡练习
        </button>
        <button class="btn btn-secondary" data-action="scenario-quiz" data-scenario-id="${scenario.id}">
          📝 知识测验
        </button>
      </div>
    </div>
    ${renderBottomNav("")}
  </div>`;
}

function renderModuleContent(key, m, scenario) {
  switch (key) {
    case "tagline":
      return `
        <div class="module-section">
          <div class="module-section-title"><span class="dot" style="background:#f59e0b"></span>场景核心定位</div>
          <div class="script-box">${m.tagline}</div>
        </div>`;

    case "targetCustomers": {
      const tc = m.targetCustomers;
      return `
        <div class="module-section">
          <div class="module-section-title"><span class="dot" style="background:#2563eb"></span>单位类型</div>
          <div class="tag-list">${tc.unitTypes.map(t => `<span class="tag blue">${t}</span>`).join("")}</div>
        </div>
        <div class="module-section">
          <div class="module-section-title"><span class="dot" style="background:#7c3aed"></span>关键决策人</div>
          <div class="tag-list">${tc.decisionMakers.map(t => `<span class="tag purple">${t}</span>`).join("")}</div>
        </div>
        <div class="module-section">
          <div class="module-section-title"><span class="dot" style="background:#0d9488"></span>接触角色</div>
          <div class="tag-list">${tc.roles.map(t => `<span class="tag green">${t}</span>`).join("")}</div>
        </div>
        <div class="module-section">
          <div class="module-section-title"><span class="dot" style="background:#ea580c"></span>终端用户 & 影响人</div>
          <div class="tag-list">
            ${tc.users.map(t => `<span class="tag orange">${t}</span>`).join("")}
            ${tc.influencers.map(t => `<span class="tag">${t}</span>`).join("")}
          </div>
        </div>`;
    }

    case "businessConcerns":
      return `
        <div class="module-section">
          <div class="module-section-title"><span class="dot" style="background:#dc2626"></span>客户核心痛点</div>
          <div class="concern-list">
            ${m.businessConcerns.map(c => `
              <div class="concern-item">
                <div class="concern-bullet"></div>
                <span>${c}</span>
              </div>`).join("")}
          </div>
        </div>`;

    case "recommendedSolutions": {
      const rs = m.recommendedSolutions;
      return `
        <div class="module-section">
          <div class="module-section-title"><span class="dot" style="background:#059669"></span>方案组合</div>
          <div class="solution-grid">
            <div class="solution-item">
              <div class="solution-item-title">🖥️ 平台</div>
              <div class="solution-tags">${rs.platform.map(t => `<span class="solution-tag">${t}</span>`).join("")}</div>
            </div>
            <div class="solution-item">
              <div class="solution-item-title">📷 设备</div>
              <div class="solution-tags">${rs.equipment.map(t => `<span class="solution-tag">${t}</span>`).join("")}</div>
            </div>
            <div class="solution-item">
              <div class="solution-item-title">📡 通信</div>
              <div class="solution-tags">${rs.communication.map(t => `<span class="solution-tag">${t}</span>`).join("")}</div>
            </div>
            <div class="solution-item">
              <div class="solution-item-title">🧠 感知/算法</div>
              <div class="solution-tags">${rs.perception.map(t => `<span class="solution-tag">${t}</span>`).join("")}</div>
            </div>
          </div>
          <div class="mt-8 solution-item" style="width:100%">
            <div class="solution-item-title">🛠️ 服务</div>
            <div class="solution-tags">${rs.services.map(t => `<span class="solution-tag">${t}</span>`).join("")}</div>
          </div>
        </div>`;
    }

    case "firstVisitScript":
      return `
        <div class="module-section">
          <div class="module-section-title"><span class="dot" style="background:#f59e0b"></span>首次拜访开场话术</div>
          <div class="script-box">${m.firstVisitScript}</div>
        </div>
        <div class="module-section">
          <div class="module-section-title">💡 话术要点</div>
          <div class="concern-list">
            <div class="concern-item"><div class="concern-bullet"></div><span>以参考案例开场，增加可信度</span></div>
            <div class="concern-item"><div class="concern-bullet"></div><span>用数字量化成果，让客户感受价值</span></div>
            <div class="concern-item"><div class="concern-bullet"></div><span>结尾引导客户说出自身痛点，而非推销产品</span></div>
          </div>
        </div>`;

    case "keyQuestions":
      return `
        <div class="module-section">
          <div class="module-section-title"><span class="dot" style="background:#7c3aed"></span>必须问出的关键问题</div>
          <div class="question-list">
            ${m.keyQuestions.map((q, i) => `
              <div class="question-item">
                <div class="q-num">${i+1}</div>
                <div class="q-text">${q}</div>
              </div>`).join("")}
          </div>
        </div>`;

    case "pilotSuggestions":
      return `
        <div class="module-section">
          <div class="module-section-title"><span class="dot" style="background:#059669"></span>第一步试点落地建议</div>
          <div class="pilot-list">
            ${m.pilotSuggestions.map(p => `<div class="pilot-item">${p}</div>`).join("")}
          </div>
        </div>`;

    case "boundaries": {
      const b = m.boundaries;
      const boundaryTypes = [
        { label: "技术边界", items: b.technical, icon: "⚙️" },
        { label: "交付边界", items: b.delivery, icon: "📅" },
        { label: "报价边界", items: b.pricing, icon: "💰" },
        { label: "政策边界", items: b.policy, icon: "📋" },
      ];
      return `
        <div class="module-section">
          <div class="module-section-title"><span class="dot" style="background:#dc2626"></span>禁止过度承诺的四条边界</div>
          ${boundaryTypes.map(bt => `
            <div class="boundary-group">
              <div class="boundary-type">${bt.icon} ${bt.label}</div>
              <div class="boundary-items">
                ${bt.items.map(item => `<div class="boundary-item">${item}</div>`).join("")}
              </div>
            </div>`).join("")}
        </div>`;
    }

    default:
      return `<div class="empty-state"><div class="empty-text">内容准备中...</div></div>`;
  }
}

// ===== Flashcard Screen =====
function renderFlashcard() {
  const fc = State.flashcard;
  if (!fc.cards || fc.cards.length === 0) return renderHome();

  const card = fc.cards[fc.index];
  const total = fc.cards.length;
  const pct = Math.round(((fc.index) / total) * 100);
  const masteredCount = fc.mastered.size;
  const scenarioName = fc.scenarioId
    ? getScenarios().find(s => s.id === fc.scenarioId)?.name
    : "全场景";

  return `
  <div class="app-shell flashcard-screen">
    ${renderHeader({
      title: "闪卡练习",
      subtitle: `${scenarioName} · ${fc.index + 1}/${total}`,
      showBack: true,
      backView: fc.scenarioId ? "scenario" : "home",
    })}

    <div class="fc-progress-wrap">
      <div class="fc-progress-info">
        <span class="fc-progress-text">第 ${fc.index + 1} 张，共 ${total} 张</span>
        <span class="fc-progress-score">✅ 已掌握 ${masteredCount}</span>
      </div>
      <div class="fc-progress-bar">
        <div class="fc-progress-fill" style="width:${pct}%"></div>
      </div>
    </div>

    <div class="fc-card-wrap">
      <div class="fc-card ${fc.flipped ? 'flipped' : ''}" id="fcCard" data-action="flip-card">
        <div class="fc-face fc-front">
          <div class="fc-category">${card.category}</div>
          <div class="fc-question">${card.question}</div>
          <div class="fc-hint">点击翻转查看答案</div>
        </div>
        <div class="fc-face fc-back">
          <div class="fc-answer-label">参考答案</div>
          <div class="fc-answer">${card.answer.replace(/\n/g, "<br>")}</div>
        </div>
      </div>
    </div>

    ${fc.flipped ? `
      <div class="fc-flip-hint">判断一下，你掌握了吗？</div>
      <div class="fc-actions">
        <button class="fc-action-btn fc-again" data-action="fc-again">🔁 再练一次</button>
        <button class="fc-action-btn fc-got-it" data-action="fc-gotit">✅ 已掌握</button>
      </div>
    ` : `
      <div class="fc-flip-hint">点击卡片查看答案</div>
      <div class="fc-actions">
        <button class="fc-action-btn" style="background:var(--bg2);color:var(--text-2)" data-action="fc-skip">跳过</button>
      </div>
    `}
  </div>`;
}

// ===== Flashcard Result Screen =====
function renderFlashcardResult() {
  const fc = State.flashcard;
  const masteredCount = fc.mastered.size;
  const total = fc.cards.length;
  const pct = Math.round((masteredCount / total) * 100);
  const againCount = fc.again.size;
  const scenarioName = fc.scenarioId
    ? getScenarios().find(s => s.id === fc.scenarioId)?.name
    : "全场景";

  let title, desc;
  if (pct === 100) {
    title = "完美！全部掌握 🎉";
    desc = "所有卡片均已掌握，继续保持！";
  } else if (pct >= 60) {
    title = "不错！继续加油 💪";
    desc = `还有 ${againCount} 张需要继续练习，趁热打铁！`;
  } else {
    title = "继续努力 📚";
    desc = `还有 ${againCount} 张需要练习，多练几遍会更熟悉！`;
  }

  return `
  <div class="app-shell">
    ${renderHeader({ title: "练习完成", showBack: false })}
    <div class="main-content result-screen has-bottom-nav">
      <div class="result-score-ring" style="--score-pct:${pct * 3.6}deg">
        <div class="result-score-inner">
          <div class="result-score-num">${pct}%</div>
          <div class="result-score-label">掌握率</div>
        </div>
      </div>
      <div class="result-title">${title}</div>
      <div class="result-desc">${scenarioName} · 已掌握 ${masteredCount}/${total} 张卡片<br>${desc}</div>

      <div class="module-cta" style="flex-direction:column;gap:10px">
        ${againCount > 0 ? `
          <button class="btn btn-primary" data-action="fc-practice-again">🔁 继续练习 ${againCount} 张</button>
        ` : ""}
        ${fc.scenarioId ? `
          <button class="btn btn-secondary" data-action="back-to-scenario">← 返回战卡</button>
        ` : `
          <button class="btn btn-secondary" data-action="go-home">← 返回首页</button>
        `}
      </div>
    </div>
    ${renderBottomNav("")}
  </div>`;
}

// ===== Quiz Screen =====
function renderQuiz() {
  const quiz = State.quiz;
  if (!quiz.questions || quiz.questions.length === 0) return renderHome();

  const q = quiz.questions[quiz.index];
  const total = quiz.questions.length;
  const pct = Math.round(((quiz.index) / total) * 100);
  const answer = quiz.answers[quiz.index];
  const scenarioName = quiz.scenarioId
    ? getScenarios().find(s => s.id === quiz.scenarioId)?.name
    : "综合测验";

  return `
  <div class="app-shell">
    ${renderHeader({
      title: "知识测验",
      subtitle: `${scenarioName} · ${quiz.index + 1}/${total}`,
      showBack: true,
      backView: quiz.scenarioId ? "scenario" : "home",
    })}

    <div class="main-content quiz-screen has-bottom-nav">
      <div class="fc-progress-bar" style="margin-bottom:16px">
        <div class="fc-progress-fill" style="width:${pct}%;height:6px;background:var(--primary-light);border-radius:3px"></div>
      </div>

      <div class="quiz-question-card">
        <div class="quiz-q-label">第 ${quiz.index + 1} 题 / 共 ${total} 题</div>
        <div class="quiz-q-text">${q.question}</div>
      </div>

      <div class="quiz-options">
        ${q.options.map((opt, i) => {
          let cls = "";
          if (answer) {
            if (opt.correct) cls = "correct";
            else if (i === answer.selectedIndex && !opt.correct) cls = "wrong";
          }
          return `
          <button class="quiz-option ${cls}" data-action="quiz-answer" data-index="${i}" ${answer ? "disabled" : ""}>
            <div class="quiz-option-letter">${String.fromCharCode(65+i)}</div>
            <div>${opt.text}</div>
          </button>`;
        }).join("")}
      </div>

      <div class="quiz-explanation ${answer ? 'show' : ''}">
        💡 ${q.explanation}
      </div>

      ${answer ? `
        <button class="btn btn-primary" data-action="quiz-next">
          ${quiz.index < total - 1 ? "下一题 →" : "查看结果 🎉"}
        </button>
      ` : ""}
    </div>
    ${renderBottomNav("")}
  </div>`;
}

// ===== Quiz Result =====
function renderQuizResult() {
  const quiz = State.quiz;
  const correct = quiz.answers.filter(a => a && a.correct).length;
  const total = quiz.answers.length;
  const pct = Math.round((correct / total) * 100);

  let title, desc;
  if (pct >= 90) { title = "太棒了！🎉"; desc = "你对这个场景掌握得非常好，可以挑战其他场景了！"; }
  else if (pct >= 70) { title = "不错！继续加油 💪"; desc = "基础掌握良好，建议重点复习答错的题目，再做一次巩固。"; }
  else { title = "加油！多练几次 📚"; desc = "建议先重新浏览战卡内容，再来做测验，相信会有提升！"; }

  return `
  <div class="app-shell">
    ${renderHeader({ title: "测验结果", showBack: false })}
    <div class="main-content result-screen has-bottom-nav">
      <div class="result-score-ring" style="--score-pct:${pct * 3.6}deg">
        <div class="result-score-inner">
          <div class="result-score-num">${pct}%</div>
          <div class="result-score-label">正确率</div>
        </div>
      </div>
      <div class="result-title">${title}</div>
      <div class="result-desc">${correct}/${total} 题答对<br>${desc}</div>

      <div class="module-cta" style="flex-direction:column;gap:10px">
        <button class="btn btn-primary" data-action="retry-quiz">🔁 再做一次</button>
        ${quiz.scenarioId ? `
          <button class="btn btn-secondary" data-action="back-to-scenario">← 返回战卡</button>
        ` : `
          <button class="btn btn-secondary" data-action="go-home">← 返回首页</button>
        `}
      </div>
    </div>
    ${renderBottomNav("")}
  </div>`;
}

// ===== Progress Screen =====
function renderProgress() {
  const overall = getOverallProgress();
  return `
  <div class="app-shell">
    ${renderHeader({ title: "学习进度", showBack: false })}
    <div class="main-content progress-screen has-bottom-nav">
      <div class="overall-card">
        <div class="overall-pct">${overall.pct}%</div>
        <div class="overall-label">整体掌握度 · ${overall.mastered}/${overall.total} 个知识点</div>
      </div>

      <div class="section-title">各场景进度</div>
      <div class="progress-detail-list">
        ${getScenarios().map(s => {
          const prog = getScenarioProgress(s.id);
          return `
          <div class="progress-detail-item" data-scenario-id="${s.id}">
            <div class="pd-icon">${s.icon}</div>
            <div class="pd-info">
              <div class="pd-name">${s.name}</div>
              <div class="pd-bar-wrap">
                <div class="pd-bar-fill theme-${s.theme}" style="width:${prog.pct}%"></div>
              </div>
            </div>
            <div class="pd-pct" style="color:${s.color}">${prog.pct}%</div>
          </div>`;
        }).join("")}
      </div>

      <div class="mt-16">
        <button class="btn btn-secondary" style="width:100%" data-action="reset-progress">重置学习进度</button>
      </div>
    </div>
    ${renderBottomNav("progress")}
  </div>`;
}

// ===== Mode Select (Scripts Review) =====
function renderModeSelect() {
  return `
  <div class="app-shell">
    ${renderHeader({ title: "话术速查", showBack: true, backView: "home" })}
    <div class="main-content mode-select-screen has-bottom-nav">
      <div class="section-title" style="margin-bottom:16px">选择场景，查看首次拜访话术</div>
      ${getScenarios().map(s => `
        <div class="mode-card" data-action="view-script" data-scenario-id="${s.id}">
          <div class="mode-icon">${s.icon}</div>
          <div class="mode-info">
            <div class="mode-title">${s.name}</div>
            <div class="mode-desc">${s.modules.firstVisitScript.substring(0, 40)}...</div>
          </div>
          <div class="mode-arrow">›</div>
        </div>`).join("")}
    </div>
    ${renderBottomNav("")}
  </div>`;
}

// ===== Management Screen =====
function renderManage() {
  const scenarios = getScenarios();
  return `
  <div class="app-shell">
    ${renderHeader({ title: "场景管理", showBack: false })}
    <div class="main-content has-bottom-nav">
      <button class="btn btn-primary" style="width:100%;margin-bottom:20px" data-action="add-scenario">
        + 新增战卡场景
      </button>
      <div class="section-title">📋 所有场景（${scenarios.length} 个）</div>
      <div class="manage-list">
        ${scenarios.map(s => `
          <div class="manage-card">
            <div class="manage-icon" style="background:${s.colorLight || '#f0f4f8'}">${s.icon}</div>
            <div class="manage-info">
              <div class="manage-name">${escHtml(s.name)}</div>
              <span class="manage-badge ${isBuiltInScenario(s.id) ? 'builtin' : 'custom'}">${isBuiltInScenario(s.id) ? '内置' : '自定义'}</span>
            </div>
            <div class="manage-actions">
              <button class="manage-btn edit" data-action="edit-scenario" data-scenario-id="${s.id}">编辑</button>
              <button class="manage-btn delete" data-action="delete-scenario" data-scenario-id="${s.id}">删除</button>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="mt-16">
        <button class="btn btn-secondary" style="width:100%" data-action="manage-reset-all">重置所有自定义数据</button>
      </div>
    </div>
    ${renderBottomNav("manage")}
  </div>`;
}

// ===== Scenario Edit Screen =====
function renderScenarioEdit() {
  const form = State.edit.form;
  if (!form) { navigate('manage'); return ''; }
  const title = State.edit.scenarioId === null ? '新增战卡' : '编辑战卡';
  const m = form.modules;

  const COLORS = [
    { color: '#1d4ed8', light: '#dbeafe', theme: 'blue' },
    { color: '#0369a1', light: '#e0f2fe', theme: 'teal' },
    { color: '#059669', light: '#d1fae5', theme: 'green' },
    { color: '#7c3aed', light: '#ede9fe', theme: 'purple' },
    { color: '#c2410c', light: '#ffedd5', theme: 'orange' },
    { color: '#e11d48', light: '#ffe4e6', theme: 'rose' },
  ];
  const ICONS = ['⚓','🛢️','📡','🚢','⛵','🐟','🌊','🏗️','🚀','💡','📋','🎯','💼','📊','🔧','🛡️','⚡','🌐','🏭','🔬','📱','🤝','💰','🎓'];

  function listEditor(path, items, placeholder) {
    return `
      <div class="list-editor">
        ${(items || []).map((item, i) => `
          <div class="list-row">
            <textarea class="list-textarea" data-path="${path}" data-index="${i}" rows="2" placeholder="${placeholder || '请输入内容'}">${escHtml(item)}</textarea>
            <button class="list-del" data-action="list-delete" data-path="${path}" data-index="${i}">×</button>
          </div>
        `).join('')}
        <button class="list-add" data-action="list-add" data-path="${path}">+ 添加</button>
      </div>`;
  }

  return `
  <div class="app-shell">
    ${renderHeader({ title, showBack: true, backView: 'manage', actions: `<button class="header-btn" data-action="save-scenario">💾 保存</button>` })}
    <div class="main-content has-bottom-nav" style="padding-top:12px">

      <div class="edit-section">
        <div class="edit-section-title">📝 基本信息</div>
        <div class="form-group">
          <label>场景名称</label>
          <input type="text" class="form-input" data-path="name" value="${escHtml(form.name)}" placeholder="场景名称">
        </div>
        <div class="form-group">
          <label>简称</label>
          <input type="text" class="form-input" data-path="shortName" value="${escHtml(form.shortName)}" placeholder="简称（如：港口）">
        </div>
        <div class="form-group">
          <label>场景摘要</label>
          <textarea class="form-input" data-path="summary" rows="2" placeholder="一句话描述场景">${escHtml(form.summary)}</textarea>
        </div>
        <div class="form-group">
          <label>图标（点击选择）</label>
          <div class="icon-picker">
            ${ICONS.map(icon => `<button class="icon-opt ${form.icon === icon ? 'selected' : ''}" data-action="pick-icon" data-icon="${icon}">${icon}</button>`).join('')}
          </div>
          <input type="hidden" data-path="icon" value="${escHtml(form.icon)}">
        </div>
        <div class="form-group">
          <label>主题色（点击选择）</label>
          <div class="color-picker">
            ${COLORS.map(c => `<button class="color-opt ${form.color === c.color ? 'selected' : ''}" data-action="pick-color" data-color="${c.color}" data-light="${c.light}" data-theme="${c.theme}" style="background:${c.color}"></button>`).join('')}
          </div>
          <input type="hidden" data-path="color" value="${escHtml(form.color)}">
          <input type="hidden" data-path="colorLight" value="${escHtml(form.colorLight)}">
          <input type="hidden" data-path="theme" value="${escHtml(form.theme || 'blue')}">
        </div>
      </div>

      <div class="edit-section">
        <div class="edit-section-title">💡 场景一句话定位</div>
        <textarea class="form-input" data-path="modules.tagline" rows="4" placeholder="用一句话说清楚这个场景卖的是什么">${escHtml(m.tagline)}</textarea>
      </div>

      <div class="edit-section">
        <div class="edit-section-title">👥 目标客户</div>
        <div class="form-group"><label>单位类型</label>${listEditor('modules.targetCustomers.unitTypes', m.targetCustomers.unitTypes, '如：港口集团、引航站...')}</div>
        <div class="form-group"><label>接触角色</label>${listEditor('modules.targetCustomers.roles', m.targetCustomers.roles, '如：信息化负责人...')}</div>
        <div class="form-group"><label>关键决策人</label>${listEditor('modules.targetCustomers.decisionMakers', m.targetCustomers.decisionMakers, '如：副总/IT总监...')}</div>
        <div class="form-group"><label>终端用户</label>${listEditor('modules.targetCustomers.users', m.targetCustomers.users, '如：调度员、值班员...')}</div>
        <div class="form-group"><label>影响人</label>${listEditor('modules.targetCustomers.influencers', m.targetCustomers.influencers, '如：主管部门、集成商...')}</div>
      </div>

      <div class="edit-section">
        <div class="edit-section-title">🎯 客户痛点</div>
        ${listEditor('modules.businessConcerns', m.businessConcerns, '如：通信覆盖不足：...')}
      </div>

      <div class="edit-section">
        <div class="edit-section-title">📦 推荐方案</div>
        <div class="form-group"><label>平台</label>${listEditor('modules.recommendedSolutions.platform', m.recommendedSolutions.platform, '平台/系统名称')}</div>
        <div class="form-group"><label>设备</label>${listEditor('modules.recommendedSolutions.equipment', m.recommendedSolutions.equipment, '设备名称')}</div>
        <div class="form-group"><label>通信</label>${listEditor('modules.recommendedSolutions.communication', m.recommendedSolutions.communication, '通信方案')}</div>
        <div class="form-group"><label>感知/算法</label>${listEditor('modules.recommendedSolutions.perception', m.recommendedSolutions.perception, '感知/算法能力')}</div>
        <div class="form-group"><label>服务</label>${listEditor('modules.recommendedSolutions.services', m.recommendedSolutions.services, '服务内容')}</div>
      </div>

      <div class="edit-section">
        <div class="edit-section-title">💬 首次拜访话术</div>
        <textarea class="form-input" data-path="modules.firstVisitScript" rows="8" placeholder="首次拜访开场话术...">${escHtml(m.firstVisitScript)}</textarea>
      </div>

      <div class="edit-section">
        <div class="edit-section-title">❓ 必问问题</div>
        ${listEditor('modules.keyQuestions', m.keyQuestions, '需要向客户提问的关键问题')}
      </div>

      <div class="edit-section">
        <div class="edit-section-title">🚀 试点落地建议</div>
        ${listEditor('modules.pilotSuggestions', m.pilotSuggestions, '第一步试点如何切入')}
      </div>

      <div class="edit-section">
        <div class="edit-section-title">🚫 禁止承诺（边界）</div>
        <div class="form-group"><label>技术边界</label>${listEditor('modules.boundaries.technical', m.boundaries.technical, '技术层面不能承诺的事项')}</div>
        <div class="form-group"><label>交付边界</label>${listEditor('modules.boundaries.delivery', m.boundaries.delivery, '交付层面不能承诺的事项')}</div>
        <div class="form-group"><label>报价边界</label>${listEditor('modules.boundaries.pricing', m.boundaries.pricing, '报价层面不能承诺的事项')}</div>
        <div class="form-group"><label>政策边界</label>${listEditor('modules.boundaries.policy', m.boundaries.policy, '政策层面不能承诺的事项')}</div>
      </div>

      <div style="padding:0 0 16px">
        <button class="btn btn-primary" style="width:100%" data-action="save-scenario">💾 保存战卡</button>
      </div>
    </div>
    ${renderBottomNav("manage")}
  </div>`;
}

// ===== Header Component =====
function renderHeader({ title, subtitle, showBack, backView, accent, actions }) {
  return `
  <header class="app-header" ${accent ? `style="background:${accent}"` : ""}>
    ${showBack ? `<button class="header-back" data-action="back" data-view="${backView || 'home'}">←</button>` : ""}
    <div style="flex:1;min-width:0">
      <div class="header-title">${title}</div>
      ${subtitle ? `<div class="header-subtitle">${subtitle}</div>` : ""}
    </div>
    ${actions ? `<div class="header-actions">${actions}</div>` : ""}
  </header>`;
}

// ===== Bottom Nav =====
function renderBottomNav(active) {
  const items = [
    { key: "home",     icon: "🏠", label: "首页",   action: "go-home" },
    { key: "flash",    icon: "🃏", label: "闪卡",   action: "all-flashcards" },
    { key: "quiz",     icon: "📝", label: "测验",   action: "all-quiz" },
    { key: "manage",   icon: "✏️", label: "管理",   action: "go-manage" },
    { key: "progress", icon: "📊", label: "进度",   action: "progress-view" },
  ];
  return `
  <nav class="bottom-nav">
    ${items.map(item => `
      <button class="bottom-nav-item ${active === item.key ? 'active' : ''}" data-action="${item.action}">
        <span class="nav-icon">${item.icon}</span>
        <span class="nav-label">${item.label}</span>
      </button>`).join("")}
  </nav>`;
}

// ===== Event Binding =====
function bindEvents() {
  document.removeEventListener("click", handleClick);
  document.addEventListener("click", handleClick);
}

function handleClick(e) {
  const target = e.target.closest("[data-action], [data-scenario-id], [data-module]");
  if (!target) return;

  const action = target.dataset.action;
  const scenarioId = target.dataset.scenarioId ? parseInt(target.dataset.scenarioId) : null;

  switch (action) {
    case "back":
      navigate(target.dataset.view || "home");
      break;

    case "go-home":
      navigate("home");
      break;

    case "all-flashcards":
      startFlashcards(null);
      break;

    case "all-quiz":
      startQuiz(null);
      break;

    case "progress-view":
      navigate("progress");
      break;

    case "scripts-review":
      navigate("mode-select");
      break;

    case "scenario-flashcard":
      startFlashcards(scenarioId || State.currentScenarioId);
      break;

    case "scenario-quiz":
      startQuiz(scenarioId || State.currentScenarioId);
      break;

    case "view-script":
      State.currentScenarioId = scenarioId;
      State.currentModuleKey = "firstVisitScript";
      navigate("scenario", { currentScenarioId: scenarioId, currentModuleKey: "firstVisitScript" });
      break;

    case "flip-card":
      State.flashcard.flipped = !State.flashcard.flipped;
      render();
      break;

    case "fc-again":
      State.flashcard.again.add(State.flashcard.cards[State.flashcard.index].id);
      advanceFlashcard();
      break;

    case "fc-gotit": {
      const cardId = State.flashcard.cards[State.flashcard.index].id;
      State.flashcard.mastered.add(cardId);
      markCardMastered(cardId);
      advanceFlashcard();
      break;
    }

    case "fc-skip":
      advanceFlashcard();
      break;

    case "fc-practice-again": {
      const fc = State.flashcard;
      const againCards = fc.cards.filter(c => fc.again.has(c.id));
      State.flashcard = {
        scenarioId: fc.scenarioId,
        cards: shuffle(againCards),
        index: 0,
        flipped: false,
        mastered: new Set([...fc.mastered]),
        again: new Set(),
      };
      navigate("flashcard");
      break;
    }

    case "quiz-answer": {
      if (State.quiz.answers[State.quiz.index]) break;
      const optIdx = parseInt(target.dataset.index);
      const isCorrect = State.quiz.questions[State.quiz.index].options[optIdx].correct;
      State.quiz.answers[State.quiz.index] = { selectedIndex: optIdx, correct: isCorrect };
      render();
      break;
    }

    case "quiz-next":
      if (State.quiz.index < State.quiz.questions.length - 1) {
        State.quiz.index++;
        render();
      } else {
        navigate("quiz-result");
      }
      break;

    case "retry-quiz":
      startQuiz(State.quiz.scenarioId);
      break;

    case "back-to-scenario": {
      const sid = State.quiz.scenarioId ?? State.flashcard.scenarioId;
      navigate("scenario", { currentScenarioId: sid, currentModuleKey: "tagline" });
      break;
    }

    case "go-manage":
      navigate("manage");
      break;

    case "add-scenario":
      State.edit = {
        scenarioId: null,
        form: {
          id: nextScenarioId(),
          name: "新场景",
          shortName: "新场景",
          icon: "📋",
          color: "#1d4ed8",
          colorLight: "#dbeafe",
          theme: "blue",
          summary: "场景摘要",
          modules: {
            tagline: "",
            targetCustomers: { unitTypes: [], roles: [], decisionMakers: [], users: [], influencers: [] },
            businessConcerns: [],
            recommendedSolutions: { platform: [], equipment: [], communication: [], perception: [], services: [] },
            firstVisitScript: "",
            keyQuestions: [],
            pilotSuggestions: [],
            boundaries: { technical: [], delivery: [], pricing: [], policy: [] }
          }
        }
      };
      navigate("scenario-edit");
      break;

    case "edit-scenario": {
      const sid = parseInt(target.dataset.scenarioId);
      const scen = getScenarios().find(s => s.id === sid);
      if (!scen) break;
      State.edit = { scenarioId: sid, form: JSON.parse(JSON.stringify(scen)) };
      navigate("scenario-edit");
      break;
    }

    case "delete-scenario": {
      const sid = parseInt(target.dataset.scenarioId);
      const scen = getScenarios().find(s => s.id === sid);
      if (!scen) break;
      if (confirm(`确定删除「${scen.name}」吗？${isBuiltInScenario(sid) ? '（内置场景可通过重置自定义数据恢复）' : ''}`)) {
        deleteScenario(sid);
        render();
      }
      break;
    }

    case "save-scenario": {
      readEditForm();
      const form = State.edit.form;
      if (!form || !form.name.trim()) { alert('请填写场景名称'); break; }
      saveScenario(form);
      State.edit = { scenarioId: null, form: null };
      navigate("manage");
      break;
    }

    case "list-add": {
      readEditForm();
      const path = target.dataset.path;
      const arr = getNestedValue(State.edit.form, path);
      if (Array.isArray(arr)) arr.push('');
      render();
      setTimeout(() => {
        const all = document.querySelectorAll(`[data-path="${path}"]`);
        if (all.length) all[all.length - 1].focus();
      }, 50);
      break;
    }

    case "list-delete": {
      readEditForm();
      const path = target.dataset.path;
      const idx = parseInt(target.dataset.index);
      const arr = getNestedValue(State.edit.form, path);
      if (Array.isArray(arr)) arr.splice(idx, 1);
      render();
      break;
    }

    case "pick-icon":
      State.edit.form.icon = target.dataset.icon;
      document.querySelectorAll('.icon-opt').forEach(b => b.classList.toggle('selected', b.dataset.icon === target.dataset.icon));
      document.querySelector('[data-path="icon"]') && (document.querySelector('[data-path="icon"]').value = target.dataset.icon);
      break;

    case "pick-color": {
      const { color, light, theme } = target.dataset;
      State.edit.form.color = color;
      State.edit.form.colorLight = light;
      State.edit.form.theme = theme;
      document.querySelectorAll('.color-opt').forEach(b => b.classList.toggle('selected', b.dataset.color === color));
      const hc = document.querySelector('[data-path="color"]');
      const hl = document.querySelector('[data-path="colorLight"]');
      const ht = document.querySelector('[data-path="theme"]');
      if (hc) hc.value = color;
      if (hl) hl.value = light;
      if (ht) ht.value = theme;
      break;
    }

    case "manage-reset-all":
      if (confirm('确定重置所有自定义数据？（自定义场景和对内置场景的修改将全部清除，此操作不可恢复）')) {
        localStorage.removeItem('slc_custom');
        localStorage.removeItem('slc_modified');
        localStorage.removeItem('slc_deleted');
        navigate("manage");
      }
      break;

    case "reset-progress":
      if (confirm("确定重置所有学习进度吗？")) {
        State.progress = {};
        saveProgress();
        navigate("progress");
      }
      break;

    default:
      // Module tab switch or scenario card click (no data-action)
      if (target.dataset.module) {
        State.currentModuleKey = target.dataset.module;
        render();
      } else if (scenarioId) {
        State.currentScenarioId = scenarioId;
        State.currentModuleKey = "tagline";
        navigate("scenario", { currentScenarioId: scenarioId });
      }
  }
}

// ===== Flashcard Logic =====
function startFlashcards(scenarioId) {
  let cards;
  if (scenarioId) {
    const scenario = getScenarios().find(s => s.id === scenarioId);
    cards = generateFlashcards(scenario);
  } else {
    cards = getScenarios().flatMap(s => generateFlashcards(s));
    cards = shuffle(cards);
  }
  State.flashcard = {
    scenarioId,
    cards,
    index: 0,
    flipped: false,
    mastered: new Set(),
    again: new Set(),
  };
  navigate("flashcard");
}

function advanceFlashcard() {
  const fc = State.flashcard;
  fc.flipped = false;
  if (fc.index < fc.cards.length - 1) {
    fc.index++;
    render();
  } else {
    navigate("flashcard-result");
  }
}

// ===== Quiz Logic =====
function startQuiz(scenarioId) {
  let questions;
  if (scenarioId) {
    const scenario = getScenarios().find(s => s.id === scenarioId);
    questions = generateQuizQuestions(scenario);
  } else {
    questions = getScenarios().flatMap(s => generateQuizQuestions(s));
    questions = shuffle(questions).slice(0, 12);
  }
  State.quiz = {
    scenarioId,
    questions,
    index: 0,
    answers: new Array(questions.length).fill(null),
    submitted: false,
  };
  navigate("quiz");
}

// ===== Edit Form Reader =====
function readEditForm() {
  if (!State.edit.form) return;
  document.querySelectorAll('[data-path]').forEach(el => {
    if (el.type === 'hidden') return;
    const path = el.dataset.path;
    const value = el.value;
    if (el.dataset.index !== undefined) {
      const arr = getNestedValue(State.edit.form, path);
      if (arr && Array.isArray(arr)) arr[parseInt(el.dataset.index)] = value;
    } else {
      setNestedValue(State.edit.form, path, value);
    }
  });
}

// ===== Init =====
function init() {
  render();
}

document.addEventListener("DOMContentLoaded", init);
