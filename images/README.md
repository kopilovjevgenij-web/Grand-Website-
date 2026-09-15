# /images — фото для замены плейсхолдеров

Сейчас на сайте вместо фотографий используются CSS-заглушки (тёмно-золотой градиент с иконкой).
Чтобы подключить реальные фото, добавьте файлы с указанными ниже именами в эту папку —
верстка и `object-fit` уже настроены, ничего в HTML/CSS менять не нужно, кроме замены
блока `<div class="ph">…</div>` на `<img src="/images/ИМЯ.jpg" alt="…" loading="lazy">`.

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
- `hotel-room-1.jpg`, `hotel-room-2.jpg` — номера отеля (сейчас в отеле 2 номера)
- `hotel-lobby.jpg`, `hotel-exterior.jpg` — лобби и фасад отеля
- `kids-area.jpg` — детская зона / батут
- `gallery-1.jpg` … `gallery-8.jpg` — фото для общей галереи

Эта папка (кроме `README.md`) отслеживается через `.gitkeep`, чтобы структура
сохранилась в репозитории и до появления реальных фото.
