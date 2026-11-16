(() => {
  const PROJECTS = {
    trendych: {
      tag: 'Продукт',
      title: 'Трендыч',
      tagline: 'Telegram Mini App, который превращает фото в трендовое AI-видео 9:16',
      image: 'assets/aitrend-app.svg',
      problem: 'Трендовые видео требуют промптов, монтажа и нескольких сервисов. Пользователю нужен результат в Telegram за пару минут.',
      solution: 'Mini App с готовыми шаблонами и оплатой Stars. Backend ставит задачу в очередь, n8n вызывает провайдера генерации, результат возвращается в приложение.',
      role: 'Продукт, архитектура, backend, frontend, Telegram-интеграция, платежи, n8n-пайплайн, деплой.',
      metrics: [['23', 'REST endpoint'], ['9', 'таблиц'], ['6', 'шаблонов'], ['live', 'Telegram Stars']],
      stack: ['React 19', 'TypeScript', 'FastAPI', 'SQLAlchemy 2', 'SQLite', 'Telegram Mini Apps', 'Telegram Stars', 'n8n', 'OpenRouter', 'Docker', 'Caddy'],
      highlights: [
        'Проверка Telegram initData по HMAC-SHA256 и секрет вебхука.',
        'Атомарное списание Stars: UPDATE … WHERE balance_stars >= price.',
        'Идемпотентные миграции и очистка зависших инвойсов.',
        'Абстракция VideoProvider: mock для разработки, webhook для реальной модели.',
      ],
      links: [
        { label: 'Открыть приложение ↗', href: 'https://hansslanda.ru', external: true, primary: true },
        { label: 'PDF · стр. 2', href: 'portfolio.pdf#page=2', external: true },
      ],
    },
    'request-desk': {
      tag: 'Автоматизация',
      title: 'AI Request Desk',
      tagline: 'Сообщение из Telegram превращается в заявку с категорией, приоритетом и SLA',
      image: 'assets/request-desk-card.svg',
      problem: 'Заявки теряются в личке и общих чатах. Менеджер вручную решает, что срочно, не фиксирует SLA и не видит нагрузку.',
      solution: 'Один Telegram webhook принимает сообщения и кнопки. LLM возвращает строгий JSON, код валидирует его, PostgreSQL хранит заявку и SLA.',
      role: 'Процесс, схема данных, n8n-workflow, промпт, SQL-аналитика, UX карточек и клиентских кнопок.',
      metrics: [['26', 'нод n8n'], ['7', 'категорий'], ['12/12', 'тестовый набор'], ['$0.036', 'за 1 000']],
      stack: ['n8n', 'Telegram Bot API', 'OpenRouter', 'qwen3.7-flash', 'PostgreSQL 17', 'SQL', 'Docker', 'Caddy'],
      highlights: [
        'Строгий JSON + fallback: сбой модели не теряет заявку.',
        'Reasoning отключён, чтобы токены не уходили в размышления.',
        'Prepared statements $1…$20, enum-типы и индексы по SLA.',
        'Один webhook на message и callback_query — без конфликта Telegram.',
      ],
      links: [
        { label: 'PDF · стр. 3', href: 'portfolio.pdf#page=3', external: true, primary: true },
        { label: 'Демо по запросу', href: 'https://t.me/Danil_Andreeviches', external: true },
      ],
    },
    bot: {
      tag: 'AI',
      title: 'AI-ассистент',
      tagline: 'Один бот на четыре сценария: текст, голос, фото и генерация изображений',
      image: 'assets/telegram-bot-chat.svg',
      problem: 'Пользователю нужен один ассистент в Telegram, который понимает текст, голос и фото, но не требует отдельного приложения.',
      solution: 'Единый webhook, Switch по типу сообщения, разные модели под задачу, typing indicator и понятные fallback-ответы.',
      role: 'Сценарии, n8n, работа с медиа, выбор моделей, обработка ошибок и UX диалога.',
      metrics: [['25', 'нод n8n'], ['4', 'режима'], ['3', 'модели'], ['1', 'webhook']],
      stack: ['n8n', 'Telegram Bot API', 'OpenRouter', 'qwen3.7-flash', 'Gemini 2.5 Flash Lite', 'Gemini 3.1 Flash Image', 'Base64 media'],
      highlights: [
        'Switch по text, voice, photo и команде /image.',
        'Медиа: binary → base64 для моделей, обратно — buffer и отправка фото.',
        'Static data хранит ожидание промпта для /image на 10 минут.',
        'Пустой ответ модели превращается в понятный fallback, а не в молчание.',
      ],
      links: [
        { label: 'PDF · стр. 4', href: 'portfolio.pdf#page=4', external: true, primary: true },
        { label: 'Демо по запросу', href: 'https://t.me/Danil_Andreeviches', external: true },
      ],
    },
  };

  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  let lastTrigger = null;

  const esc = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  function renderProject(project) {
    const metrics = project.metrics
      .map(([value, label]) => `<div><b>${esc(value)}</b><span>${esc(label)}</span></div>`)
      .join('');
    const stack = project.stack.map((item) => `<span>${esc(item)}</span>`).join('');
    const highlights = project.highlights.map((item) => `<li>${esc(item)}</li>`).join('');
    const links = project.links.map((link) => {
      const external = link.external ? ' target="_blank" rel="noreferrer"' : '';
      const variant = link.primary ? 'btn-primary' : 'btn-ghost';
      return `<a class="btn btn-small ${variant}" href="${esc(link.href)}"${external}>${esc(link.label)}</a>`;
    }).join('');

    return `
      <div class="modal-head">
        <span class="project-tag">${esc(project.tag)}</span>
        <h3>${esc(project.title)}</h3>
        <p>${esc(project.tagline)}</p>
      </div>
      <img class="modal-image" src="${esc(project.image)}" alt="${esc(project.title)}">
      <div class="modal-story">
        <div><span>Проблема</span><p>${esc(project.problem)}</p></div>
        <div><span>Решение</span><p>${esc(project.solution)}</p></div>
        <div><span>Моя роль</span><p>${esc(project.role)}</p></div>
      </div>
      <div class="modal-metrics">${metrics}</div>
      <div class="modal-stack">${stack}</div>
      <ul class="modal-highlights">${highlights}</ul>
      <div class="modal-links">${links}</div>
    `;
  }

  function openProject(id, trigger) {
    const project = PROJECTS[id];
    if (!project || !modal || !modalBody) return;
    modalBody.innerHTML = renderProject(project);
    lastTrigger = trigger || null;
    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }
    document.body.style.overflow = 'hidden';
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) closeButton.focus();
  }

  function closeProject() {
    if (!modal) return;
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
      document.body.style.overflow = '';
    }
  }

  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeProject();
    });
    modal.addEventListener('close', () => {
      document.body.style.overflow = '';
      if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
    });
    modal.querySelectorAll('[data-close]').forEach((button) => {
      button.addEventListener('click', closeProject);
    });
  }

  document.querySelectorAll('.collage-item').forEach((item) => {
    item.addEventListener('click', () => openProject(item.dataset.project, item));
  });

  document.querySelectorAll('.project').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('a, button')) return;
      openProject(card.dataset.project, card);
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProject(card.dataset.project, card);
      }
    });
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });

  document.querySelectorAll('[data-open]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      openProject(button.dataset.open, button);
    });
  });

  const filters = document.querySelectorAll('.filter');
  const cards = [...document.querySelectorAll('.project')];
  filters.forEach((button) => {
    button.addEventListener('click', () => {
      filters.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });
      const filter = button.dataset.filter;
      cards.forEach((card) => {
        const visible = filter === 'all' || (card.dataset.tags || '').includes(filter);
        card.classList.toggle('is-hidden', !visible);
        if (visible) {
          card.classList.remove('is-flash');
          void card.offsetWidth;
          card.classList.add('is-flash');
        }
      });
    });
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    const counters = document.querySelectorAll('[data-count]');
    const animate = (element) => {
      const target = Number(element.dataset.count || 0);
      const start = performance.now();
      const duration = 900;
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.7 });
    counters.forEach((counter) => observer.observe(counter));
  }

  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 1800);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      area.remove();
      return ok;
    }
  }

  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const text = button.dataset.copy;
      const ok = await copyText(text);
      showToast(ok ? 'Email скопирован' : text);
    });
  });
})();
