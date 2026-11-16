# Интерактивный лендинг

**Живая версия:** https://dated-cpu.github.io/portfolio/

![Превью](preview-hero.png)

Компактная версия портфолио: hero, три проекта, фильтры, модальные окна с деталями,
стек и контакты. Один экран — быстрый обзор, клик по проекту — подробности и ссылки.

## Файлы

```text
landing/
├── index.html          # лендинг
├── styles.css          # дизайн, адаптив, модалка
├── app.js              # данные проектов, фильтры, модалки, копирование email
├── portfolio.pdf       # подробное портфолио на 6 страниц
├── assets/             # локальные SVG-превью
├── preview-hero.png
├── preview-projects.png
├── preview-modal.png
├── preview-mobile.png
└── README.md
```

## Ссылки

- Лендинг: https://dated-cpu.github.io/portfolio/
- PDF: https://dated-cpu.github.io/portfolio/portfolio.pdf
- AI-видео «Трендыч»: https://t.me/Trendych_bot
- Заявки с AI-триажем: https://t.me/zayavka_assist_bot
- AI-ассистент: https://t.me/danil_agent_ai_bot
- Живое приложение: https://hansslanda.ru
- Vlada_BROWS (production): https://beauty-master-platform.vercel.app
- BookFlow AI (backend/SQL): https://github.com/Dated-cpu/BookFlow
- Digital Love Experience (frontend): https://github.com/Dated-cpu/love-experience
- BarberPro (booking SaaS): https://github.com/Dated-cpu/barberpro
- NostalgiaOS (retro games): https://github.com/Dated-cpu/old-game
- GitHub профиль: https://github.com/Dated-cpu
- GitHub репозиторий лендинга: https://github.com/Dated-cpu/portfolio

## Как посмотреть

```bash
cd /root/landing
python3 -m http.server 8081
```

Откройте <http://localhost:8081>.

## Что интерактивного

- **Фильтры проектов**: Все / Продукт / Автоматизация / AI.
- **Клик по проекту** открывает модалку с проблемой, решением, ролью, метриками,
  стеком и инженерными деталями.
- **Ссылки на проекты**: живое приложение и страницы PDF (`portfolio.pdf#page=2` и т.д.).
- **Hero-коллаж**: три проекта, клик открывает подробности.
- **Копирование email** с toast-уведомлением.
- **Анимированные счётчики** и подсветка карточек за курсором.

## Как отправить работодателю

1. **PDF** — прикрепить `portfolio.pdf` к отклику.
2. **Ссылка** — задеплоить папку `landing/` на GitHub Pages / Netlify / Vercel
   и вставить ссылку в резюме или сопроводительное.
3. **Текст** — готовые формулировки лежат в `../portfolio/resume-blurb.md`
   и `resume-blurb.txt`.

## Где менять контент

- Тексты проектов, метрики, стек и ссылки: объект `PROJECTS` в `app.js`.
- Карточки в списке: `index.html`, блоки `<article class="project">`.
- Контакты и имя: шапка, hero и блок `#contact` в `index.html`.
- Цвета и типографика: `:root` в `styles.css`.
- PDF: замените `portfolio.pdf`, если пересобрали основное портфолио.

## Деплой

### GitHub Pages

1. Создайте репозиторий `portfolio`.
2. Загрузите содержимое папки `landing/` в корень.
3. Settings → Pages → Deploy from a branch → `main` / `(root)`.

### Netlify

Перетащите папку `landing/` в Netlify Drop. Сборка не нужна.

## Важно

- Ссылки `portfolio.pdf#page=2` работают в браузерах, которые открывают PDF
  с поддержкой page-якорей (Chrome, Edge). На мобильных PDF может скачаться.
- Если публикуете только лендинг, `portfolio.pdf` должен лежать рядом с `index.html`.
- Если меняете имя/контакты, проверьте их в шапке, hero, модалках и блоке контактов.
