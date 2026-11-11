// ============================================================
//  RESUME.JS — Самодостаточный сайт-резюме
//  Петрова Вероника Павловна · Ведущий разработчик-аналитик 1С
// ============================================================

(() => {
    'use strict';

    // ===== 1. СТИЛИ (встраиваются в <head>) =====
    const css = `
        :root {
            --bg-primary: #f5f7fb;
            --text-primary: #0f172a;
            --text-secondary: #475569;
            --text-muted: #64748b;
            --accent: #6366f1;
            --accent-hover: #4f46e5;
            --accent-soft: rgba(99, 102, 241, 0.1);
            --border: rgba(15, 23, 42, 0.08);
            --glass-bg: rgba(255, 255, 255, 0.7);
            --glass-border: rgba(255, 255, 255, 0.8);
            --shadow-sm: 0 2px 8px rgba(15, 23, 42, 0.04);
            --shadow-md: 0 8px 24px rgba(15, 23, 42, 0.06);
            --shadow-lg: 0 20px 60px rgba(15, 23, 42, 0.08);
            --radius: 16px;
            --radius-sm: 10px;
            --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        [data-theme="dark"] {
            --bg-primary: #0a0e1a;
            --text-primary: #f1f5f9;
            --text-secondary: #cbd5e1;
            --text-muted: #94a3b8;
            --accent: #818cf8;
            --accent-hover: #a5b4fc;
            --accent-soft: rgba(129, 140, 248, 0.15);
            --border: rgba(255, 255, 255, 0.08);
            --glass-bg: rgba(17, 24, 39, 0.6);
            --glass-border: rgba(255, 255, 255, 0.1);
            --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
            --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.4);
            --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 16px;
            line-height: 1.6;
            color: var(--text-primary);
            background: var(--bg-primary);
            min-height: 100vh;
            overflow-x: hidden;
            transition: background var(--transition), color var(--transition);
            -webkit-font-smoothing: antialiased;
        }

        a { color: var(--accent); text-decoration: none; transition: color var(--transition); }
        a:hover { color: var(--accent-hover); }

        .bg-decoration {
            position: fixed; inset: 0; z-index: -1;
            overflow: hidden; pointer-events: none;
        }

        .blob {
            position: absolute; border-radius: 50%;
            filter: blur(80px); opacity: 0.5;
            animation: float 20s ease-in-out infinite;
        }

        .blob-1 {
            width: 500px; height: 500px;
            background: radial-gradient(circle, #6366f1, transparent 70%);
            top: -100px; left: -100px;
        }
        .blob-2 {
            width: 400px; height: 400px;
            background: radial-gradient(circle, #8b5cf6, transparent 70%);
            top: 40%; right: -100px;
            animation-delay: -7s;
        }
        .blob-3 {
            width: 450px; height: 450px;
            background: radial-gradient(circle, #ec4899, transparent 70%);
            bottom: -100px; left: 30%;
            animation-delay: -14s; opacity: 0.3;
        }
        [data-theme="dark"] .blob { opacity: 0.25; }

        @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(40px, -40px) scale(1.05); }
            66% { transform: translate(-30px, 30px) scale(0.95); }
        }

        .theme-toggle {
            position: fixed; top: 24px; right: 24px; z-index: 100;
            width: 48px; height: 48px;
            border: 1px solid var(--glass-border);
            border-radius: 50%;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            color: var(--text-primary);
            transition: all var(--transition);
            box-shadow: var(--shadow-md);
        }
        .theme-toggle:hover { transform: scale(1.1) rotate(15deg); box-shadow: var(--shadow-lg); }
        .theme-toggle .icon-moon { display: none; }
        [data-theme="dark"] .theme-toggle .icon-sun { display: none; }
        [data-theme="dark"] .theme-toggle .icon-moon { display: block; }

        .container { max-width: 1100px; margin: 0 auto; padding: 80px 24px 40px; }

        .hero { text-align: center; padding: 60px 20px 80px; margin-bottom: 40px; }

        .hero-badge {
            display: inline-block;
            padding: 8px 20px;
            background: var(--accent-soft);
            color: var(--accent);
            border-radius: 100px;
            font-size: 14px; font-weight: 500;
            margin-bottom: 24px;
            border: 1px solid var(--accent-soft);
            animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
            0%, 100% { box-shadow: 0 0 0 0 var(--accent-soft); }
            50% { box-shadow: 0 0 0 12px transparent; }
        }

        .hero-name {
            font-size: clamp(2.2rem, 5vw, 3.5rem);
            font-weight: 800;
            letter-spacing: -0.02em;
            line-height: 1.1;
            margin-bottom: 16px;
            background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .hero-title {
            font-size: clamp(1.2rem, 2.5vw, 1.6rem);
            font-weight: 500;
            color: var(--text-secondary);
            margin-bottom: 8px;
        }
        .hero-title .accent { color: var(--accent); font-weight: 700; }

        .hero-subtitle {
            font-size: 1rem;
            color: var(--text-muted);
            margin-bottom: 40px;
        }

        .hero-meta {
            display: flex; flex-wrap: wrap;
            justify-content: center;
            gap: 20px 32px;
            margin-bottom: 48px;
        }
        .meta-item {
            display: flex; align-items: center; gap: 8px;
            color: var(--text-secondary); font-size: 15px;
        }
        .meta-item svg { color: var(--accent); flex-shrink: 0; }

        .hero-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 16px;
            max-width: 700px;
            margin: 0 auto;
        }
        .stat {
            padding: 24px 16px;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius);
            box-shadow: var(--shadow-sm);
            transition: transform var(--transition), box-shadow var(--transition);
        }
        .stat:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
        .stat-value {
            font-size: 2.5rem; font-weight: 800;
            color: var(--accent);
            line-height: 1; margin-bottom: 8px;
            font-family: 'JetBrains Mono', monospace;
        }
        .stat-label {
            font-size: 13px; color: var(--text-muted);
            text-transform: uppercase; letter-spacing: 0.05em;
        }

        .section { margin-bottom: 80px; }
        .section-title {
            font-size: clamp(1.6rem, 3vw, 2.2rem);
            font-weight: 700;
            letter-spacing: -0.02em;
            margin-bottom: 32px;
            position: relative;
            display: inline-block;
        }
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -8px; left: 0;
            width: 50px; height: 3px;
            background: linear-gradient(90deg, var(--accent), transparent);
            border-radius: 2px;
        }

        .glass-card {
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius);
            padding: 28px;
            box-shadow: var(--shadow-sm);
            transition: all var(--transition);
        }
        .glass-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }

        .lead { font-size: 1.1rem; color: var(--text-primary); margin-bottom: 16px; line-height: 1.7; }
        .highlight {
            margin-top: 20px;
            padding: 16px 20px;
            background: var(--accent-soft);
            border-left: 3px solid var(--accent);
            border-radius: var(--radius-sm);
            font-style: italic;
            color: var(--text-primary);
            font-weight: 500;
        }

        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }
        .skill-card {
            padding: 28px;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius);
            transition: all var(--transition);
            cursor: default;
        }
        .skill-card:hover {
            transform: translateY(-6px);
            box-shadow: var(--shadow-md);
            border-color: var(--accent);
        }
        .skill-icon {
            font-size: 2rem; margin-bottom: 12px;
            display: inline-block;
            transition: transform var(--transition);
        }
        .skill-card:hover .skill-icon { transform: scale(1.2) rotate(-5deg); }
        .skill-card h3 { font-size: 1.15rem; font-weight: 600; margin-bottom: 10px; }
        .skill-card p { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; }

        .timeline { position: relative; padding-left: 32px; }
        .timeline::before {
            content: '';
            position: absolute;
            left: 8px; top: 8px; bottom: 8px;
            width: 2px;
            background: linear-gradient(to bottom, var(--accent), transparent);
        }
        .timeline-item { position: relative; margin-bottom: 24px; }
        .timeline-marker {
            position: absolute;
            left: -32px; top: 32px;
            width: 18px; height: 18px;
            border-radius: 50%;
            background: var(--bg-primary);
            border: 3px solid var(--accent);
            transition: all var(--transition);
            z-index: 1;
        }
        .timeline-item:hover .timeline-marker {
            background: var(--accent);
            transform: scale(1.3);
            box-shadow: 0 0 0 6px var(--accent-soft);
        }
        .timeline-content { padding: 24px 28px; }
        .timeline-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 16px;
        }
        .timeline-header h3 { font-size: 1.2rem; font-weight: 600; margin-bottom: 4px; }
        .company { color: var(--accent); font-weight: 500; font-size: 0.95rem; }
        .timeline-date {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85rem;
            color: var(--text-muted);
            background: var(--accent-soft);
            padding: 4px 12px;
            border-radius: 100px;
            white-space: nowrap;
        }
        .responsibilities { list-style: none; margin-bottom: 16px; }
        .responsibilities li {
            position: relative;
            padding-left: 20px;
            margin-bottom: 8px;
            color: var(--text-secondary);
            font-size: 0.95rem;
        }
        .responsibilities li::before {
            content: '';
            position: absolute;
            left: 0; top: 10px;
            width: 6px; height: 6px;
            background: var(--accent);
            border-radius: 50%;
        }
        .achievements {
            padding-top: 16px;
            border-top: 1px dashed var(--border);
            font-size: 0.95rem;
            color: var(--text-secondary);
        }
        .achievements strong { color: var(--text-primary); display: block; margin-bottom: 8px; }
        .achievements ul { list-style: none; margin-top: 8px; }
        .achievements li { padding-left: 20px; position: relative; margin-bottom: 6px; }
        .achievements li::before {
            content: '✓';
            position: absolute; left: 0;
            color: var(--accent); font-weight: bold;
        }

        .education-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 20px;
        }
        .edu-card { padding: 28px; position: relative; overflow: hidden; }
        .edu-card.featured {
            border-color: var(--accent);
            background: linear-gradient(135deg, var(--accent-soft), transparent);
        }
        .edu-card.featured::before {
            content: '★';
            position: absolute;
            top: 16px; right: 16px;
            color: var(--accent);
            font-size: 1.2rem;
        }
        .edu-year {
            font-family: 'JetBrains Mono', monospace;
            font-size: 2rem; font-weight: 700;
            color: var(--accent);
            margin-bottom: 8px;
        }
        .edu-card h3 { font-size: 1.15rem; font-weight: 600; margin-bottom: 8px; }
        .edu-degree {
            color: var(--text-muted);
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 8px;
        }
        .edu-card p:last-child { color: var(--text-secondary); font-size: 0.95rem; }

        .contact-card { text-align: center; padding: 48px 32px; }
        .contact-card p { font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 28px; }
        .contact-buttons {
            display: flex; flex-wrap: wrap;
            justify-content: center; gap: 16px;
        }
        .btn {
            display: inline-flex; align-items: center; gap: 10px;
            padding: 14px 28px;
            border-radius: 100px;
            font-weight: 500; font-size: 15px;
            transition: all var(--transition);
            cursor: pointer;
            border: 1px solid transparent;
        }
        .btn-primary {
            background: var(--accent);
            color: white;
            box-shadow: 0 4px 16px var(--accent-soft);
        }
        .btn-primary:hover {
            background: var(--accent-hover);
            transform: translateY(-2px);
            box-shadow: 0 8px 24px var(--accent-soft);
            color: white;
        }
        .btn-secondary {
            background: var(--glass-bg);
            color: var(--text-primary);
            border-color: var(--border);
        }
        .btn-secondary:hover {
            background: var(--accent-soft);
            color: var(--accent);
            transform: translateY(-2px);
        }

        .footer {
            text-align: center;
            padding: 40px 20px;
            color: var(--text-muted);
            font-size: 0.9rem;
            border-top: 1px solid var(--border);
            margin-top: 40px;
        }

        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        @media (max-width: 768px) {
            .container { padding: 60px 16px 20px; }
            .hero { padding: 40px 10px 60px; }
            .hero-meta { flex-direction: column; gap: 12px; }
            .timeline { padding-left: 24px; }
            .timeline::before { left: 4px; }
            .timeline-marker { left: -24px; width: 14px; height: 14px; }
            .timeline-header { flex-direction: column; }
            .glass-card, .skill-card, .edu-card { padding: 20px; }
            .theme-toggle { top: 16px; right: 16px; width: 42px; height: 42px; }
        }
        @media (max-width: 480px) {
            .hero-stats { grid-template-columns: repeat(2, 1fr); }
            .stat-value { font-size: 2rem; }
        }
    `;

    // ===== 2. РАЗМЕТКА =====
    const html = `
        <div class="bg-decoration">
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
            <div class="blob blob-3"></div>
        </div>

        <button class="theme-toggle" id="themeToggle" aria-label="Переключить тему">
            <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
            </svg>
            <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        </button>

        <main class="container">
            <section class="hero reveal">
                <div class="hero-badge">Открыта к предложениям</div>
                <h1 class="hero-name">Петрова Вероника Павловна</h1>
                <p class="hero-title">Ведущий разработчик-аналитик <span class="accent">1С</span></p>
                <p class="hero-subtitle">Эксперт по автоматизации бухгалтерского учёта · Сертификат «1С:Специалист»</p>

                <div class="hero-meta">
                    <div class="meta-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <span>Тула · Рязань · Remote</span>
                    </div>
                    <div class="meta-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        <a href="tel:+79106554433">+7 (910) 655-44-33</a>
                    </div>
                    <div class="meta-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        <a href="mailto:v.petrova@yandex.ru">v.petrova@yandex.ru</a>
                    </div>
                </div>

                <div class="hero-stats">
                    <div class="stat"><div class="stat-value" data-target="15">0</div><div class="stat-label">лет в учёте</div></div>
                    <div class="stat"><div class="stat-value" data-target="10">0</div><div class="stat-label">лет в аналитике</div></div>
                    <div class="stat"><div class="stat-value" data-target="5">0</div><div class="stat-label">компаний на аутсорсе</div></div>
                    <div class="stat"><div class="stat-value" data-target="4">0</div><div class="stat-label">системы налогообложения</div></div>
                </div>
            </section>

            <section class="section reveal">
                <h2 class="section-title">О себе</h2>
                <div class="glass-card">
                    <p class="lead">
                        Сертифицированный специалист <strong>«1С:Специалист»</strong> с уникальным сочетанием компетенций:
                        глубокое знание методологии бухгалтерского и налогового учёта (ОСНО, УСН, Патент, ФСБУ)
                        и подтверждённые навыки разработки на платформе <strong>1С:Предприятие 8.3</strong>.
                    </p>
                    <p>
                        Более 15 лет опыта в финансово-учётной сфере (в т.ч. в роли главного бухгалтера) и 10 лет
                        опыта в системном анализе бизнес-процессов. С 2022 года применяю навыки программирования
                        для создания методологически выверенных, высокопроизводительных решений в 1С.
                    </p>
                    <p class="highlight">«Умею говорить с бизнесом на языке учёта, а с разработчиками — на языке архитектуры».</p>
                </div>
            </section>

            <section class="section reveal">
                <h2 class="section-title">Ключевые компетенции</h2>
                <div class="skills-grid">
                    <div class="skill-card"><div class="skill-icon">⚙️</div><h3>Платформа 1С</h3><p>1С:Бухгалтерия 3.0, 1С:ERP 2.5, 1С:ЗУП 3.1, 1С:УТ 11. Управляемые формы, СКД, БСП, расширения конфигурации.</p></div>
                    <div class="skill-card"><div class="skill-icon">🔗</div><h3>Интеграции</h3><p>HTTP/REST-сервисы, EnterpriseData, API банков, ЭДО (Диадок, СБИС), ФГИС «Честный ЗНАК», Меркурий, маркетплейсы.</p></div>
                    <div class="skill-card"><div class="skill-icon">📊</div><h3>Бухгалтерия и учёт</h3><p>Полный цикл закрытия периода, НДС, регламентированная отчётность, ФСБУ 6/2020, 14/2020, 25/2018.</p></div>
                    <div class="skill-card"><div class="skill-icon">🎯</div><h3>Системный анализ</h3><p>Сбор требований, ТЗ по ГОСТ, моделирование BPMN, прототипирование, приёмочное тестирование.</p></div>
                    <div class="skill-card"><div class="skill-icon">🚀</div><h3>Производительность</h3><p>Оптимизация запросов, работа с индексами, устранение блокировок, ускорение закрытия периода.</p></div>
                    <div class="skill-card"><div class="skill-icon">🛠️</div><h3>Инструменты</h3><p>1С:EDT, Git (GitLab/GitHub), CI/CD, Vanessa-Automation, PostgreSQL, MS SQL.</p></div>
                </div>
            </section>

            <section class="section reveal">
                <h2 class="section-title">Опыт работы</h2>
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content glass-card">
                            <div class="timeline-header">
                                <div>
                                    <h3>Ведущий разработчик-аналитик 1С</h3>
                                    <p class="company">ООО «НТЦ Спектр»</p>
                                </div>
                                <span class="timeline-date">2022 — наст. время</span>
                            </div>
                            <ul class="responsibilities">
                                <li>Проектирование и разработка доработок 1С:Бухгалтерия 3.0 и 1С:ERP под требования ФСБУ и НК РФ.</li>
                                <li>Разработка сложных отчётов на СКД и внешних обработок для закрытия месяца.</li>
                                <li>Настройка интеграций с банком, ЭДО и маркетплейсами.</li>
                                <li>Аудит баз данных, оптимизация запросов, ускорение закрытия периода.</li>
                                <li>Ревью кода на предмет корректности проводок и регистров.</li>
                            </ul>
                            <div class="achievements">
                                <strong>Достижения:</strong>
                                <ul>
                                    <li>Внедрена подсистема контроля ФСБУ 6/2020 и 14/2020 — ошибки при закрытии снижены на 90%.</li>
                                    <li>Получен сертификат «1С:Специалист».</li>
                                    <li>Время формирования отчётности сокращено с 4 часов до 15 минут.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="timeline-item">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content glass-card">
                            <div class="timeline-header">
                                <div>
                                    <h3>Системный аналитик</h3>
                                    <p class="company">ООО «НТЦ Спектр»</p>
                                </div>
                                <span class="timeline-date">2016 — 2021</span>
                            </div>
                            <ul class="responsibilities">
                                <li>Обследование финансово-хозяйственной деятельности заказчиков.</li>
                                <li>Формализация требований и разработка ТЗ для команды 1С.</li>
                                <li>Моделирование процессов «AS IS» / «TO BE», инструкции для пользователей.</li>
                                <li>Приёмочное тестирование на соответствие методологии учёта.</li>
                            </ul>
                            <div class="achievements">
                                <strong>Достижения:</strong>
                                <ul>
                                    <li>Проведено обследование и подготовлены ТЗ для миграции 3 крупных производственных предприятий на 1С:ERP.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="timeline-item">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content glass-card">
                            <div class="timeline-header">
                                <div>
                                    <h3>Главный бухгалтер</h3>
                                    <p class="company">ООО «Вектор» + аутсорсинг</p>
                                </div>
                                <span class="timeline-date">2007 — 2016</span>
                            </div>
                            <ul class="responsibilities">
                                <li>Организация и ведение бухгалтерского и налогового учёта компании с нуля.</li>
                                <li>Внедрение учётной политики, настройка рабочего места в 1С.</li>
                                <li>Прохождение камеральных и выездных налоговых проверок.</li>
                            </ul>
                            <div class="achievements">
                                <strong>Параллельно (2010–2021):</strong>
                                <p>Главный бухгалтер на аутсорсинге для 5 организаций с ОСНО, УСН, Патент. Глубокое погружение в типовые и нетиповые сценарии учёта в 1С.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section reveal">
                <h2 class="section-title">Образование и сертификация</h2>
                <div class="education-grid">
                    <div class="edu-card glass-card">
                        <div class="edu-year">2006</div>
                        <h3>РГРТА (Рязань)</h3>
                        <p class="edu-degree">Специалитет · Инженер АСУ</p>
                        <p>Автоматизированные системы управления</p>
                    </div>
                    <div class="edu-card glass-card">
                        <div class="edu-year">2022</div>
                        <h3>Академия TOP</h3>
                        <p class="edu-degree">Профпереподготовка</p>
                        <p>Разработчик 1С:Предприятие 8</p>
                    </div>
                    <div class="edu-card glass-card featured">
                        <div class="edu-year">2023</div>
                        <h3>1С:Специалист</h3>
                        <p class="edu-degree">Профессиональный сертификат</p>
                        <p>Фирма «1С» · Аттестационный центр</p>
                    </div>
                </div>
            </section>

            <section class="section reveal">
                <h2 class="section-title">Связаться со мной</h2>
                <div class="contact-card glass-card">
                    <p>Готова обсудить проекты по автоматизации учёта, разработке и аналитике 1С.</p>
                    <div class="contact-buttons">
                        <a href="tel:+79106554433" class="btn btn-primary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            Позвонить
                        </a>
                        <a href="mailto:v.petrova@yandex.ru" class="btn btn-secondary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            Написать на почту
                        </a>
                    </div>
                </div>
            </section>

            <footer class="footer">
                <p>© 2026 Петрова В.П. · Резюме сгенерировано для поиска работы</p>
            </footer>
        </main>
    `;

    // ===== 3. ВНЕДРЕНИЕ СТИЛЕЙ И РАЗМЕТКИ =====
    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // Подключаем шрифты
    const fontsLink = document.createElement('link');
    fontsLink.rel = 'stylesheet';
    fontsLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(fontsLink);

    // Заголовок страницы
    document.title = 'Петрова Вероника Павловна — Ведущий разработчик-аналитик 1С';

    // Заполняем body
    document.body.innerHTML = html;

    // ===== 4. ИНТЕРАКТИВНОСТЬ =====

    // --- Тема ---
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // --- Анимация появления ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // --- Счётчики ---
    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 1500;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target;
        };
        requestAnimationFrame(update);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-value').forEach(el => statsObserver.observe(el));

    // --- Параллакс фоновых blob ---
    const blobs = document.querySelectorAll('.blob');
    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
    });

    const animateBlobs = () => {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        blobs.forEach((blob, i) => {
            const f = (i + 1) * 0.5;
            blob.style.transform = `translate(${currentX * f}px, ${currentY * f}px)`;
        });
        requestAnimationFrame(animateBlobs);
    };
    animateBlobs();

    // --- 3D Tilt для карточек ---
    document.querySelectorAll('.skill-card, .stat').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y - rect.height / 2) / rect.height) * -4;
            const rotateY = ((x - rect.width / 2) / rect.width) * 4;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // --- Typewriter для badge ---
    const badge = document.querySelector('.hero-badge');
    if (badge) {
        const text = badge.textContent;
        badge.textContent = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                badge.textContent += text.charAt(i);
                i++;
                setTimeout(type, 60);
            }
        };
        setTimeout(type, 500);
    }

    // --- Приветствие в консоли ---
    console.log('%c👋 Здравствуйте! Это резюме Вероники Петровой.',
        'font-size: 16px; font-weight: bold; color: #6366f1;');
    console.log('%cРазработчик-аналитик 1С · Сертификат 1С:Специалист',
        'font-size: 13px; color: #64748b;');
    console.log('%c📞 +7 (910) 655-44-33 · ✉️ v.petrova@yandex.ru',
        'font-size: 13px; color: #64748b;');

})();