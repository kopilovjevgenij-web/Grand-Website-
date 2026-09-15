# /images — фото для замены плейсхолдеров

Большинство фото на сайте пока — CSS-заглушки (тёмно-золотой градиент с иконкой).
Чтобы подключить реальное фото, добавьте файл с нужным именем в эту папку и замените
блок `<div class="ph ...">…</div>` на:
```html
<div class="ph ph-photo ...><img src="/images/ИМЯ.jpg" alt="…" loading="lazy"></div>
```
(добавьте класс `ph-photo` к тем же классам, что были у заглушки — `ph-wide`/`ph-tall`/
`ph-square` и т.д. остаются). Так уже сделано для `hotel-room-1-1.jpg` и т.д. — можно
смотреть на этот блок в `index.html`/`hotel.html` как на образец.

Рекомендуемый формат: JPG/WebP, широкая сторона 1600–2000px, тёмно-золотая цветокоррекция.

## Список файлов

- `hero-bg.jpg` — фон героя на главной странице
- `og-cover.jpg` — обложка для соцсетей (Open Graph), 1200×630
- `restaurant-hall-1.jpg` — основной зал
- `bar-1.jpg` — бар
- `banquet-hall.jpg` — банкетный/розовый зал
- `terrace-1.jpg` — терраса
- `dish-salmon.jpg` — филе лосося
- `dish-pork-skewer.jpg` — свиной шашлык
- `dish-chicken-skewer.jpg` — куриный шашлык
- `dish-pasta-shrimp.jpg` — паста с креветками
- `dish-schnitzel.jpg` — горячий шницель в блине
- `dish-caesar-shrimp.jpg` — Caesar с креветками
- `lunch-set.jpg` — комплексный обед
- `bar-cocktails.jpg` — коктейли бара
- ✅ `hotel-room-1-1.jpg`, `hotel-room-1-2.jpg`, `hotel-room-1-3.jpg` — **уже реальные фото** (номер 1, галерея из 3 фото)
- ✅ `hotel-room-2-1.jpg`, `hotel-room-2-2.jpg`, `hotel-room-2-3.jpg` — **уже реальные фото** (номер 2, галерея из 3 фото)
- `hotel-exterior.jpg` — фасад отеля
- `kids-area.jpg` — детская зона / батут
- `gallery-1.jpg` … `gallery-8.jpg` — фото для общей галереи

Эта папка (кроме `README.md`) отслеживается через `.gitkeep`, чтобы структура
сохранилась в репозитории и до появления реальных фото.
