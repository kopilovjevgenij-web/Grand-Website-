/* =========================================================
   GRAND — reviews.js
   Отзывы для секции "Отзывы" на главной странице.

   Реальные отзывы, скопированные с Google Maps (Grand Restaurant).
   Даты — как их показывает сам Google (относительное время вида
   "2 месяца назад"), точных календарных дат Google Maps не даёт.

   КАК ОТРЕДАКТИРОВАТЬ/ДОБАВИТЬ ЕЩЁ: просто добавьте новый объект
   {author, rating, text, date} в массив ниже — карточка появится
   на сайте автоматически, разметку/CSS трогать не нужно.
   ========================================================= */

var reviews = [
  {
    author: "Vbbb G",
    rating: 5,
    text: "Отличный ресторан! Очень приятная атмосфера, красивый интерьер и вежливый персонал. Блюда были вкусными, свежими и красиво поданы, обслуживание быстрое и внимательное. Особенно понравилась уютная обстановка и отношение к гостям. Отличное место как для семейного ужина, так и для праздников. Обязательно вернусь снова и с удовольствием рекомендую!",
    date: "2 месяца назад",
  },
  {
    author: "Karina",
    rating: 5,
    text: "Мне и моей семье очень нравится сервис: заботливые и отзывчивые работники, особенно девушки Мария и Ксюша (взяли во внимание, что мы пришли с двухлеткой и предложили маленькую тарелку и вилку). Нравятся комплексные обеды - всегда вкусно и сытно по приемлемой цене. Обслуживают быстро. Есть детский уголок, что для нас тоже очень важно.",
    date: "2 месяца назад",
  },
  {
    author: "Anastasija Kaškure",
    rating: 5,
    text: "Очень хорошее место, остались довольны. Понравилась атмосфера, музыка, караоке вообще супер. Стол был большой, удобно сидеть компанией. Еды много, выбор хороший и всё было очень вкусно. Персонал приветливый и позитивный, видно что стараются для гостей. Если возникали какие-то моменты — всё быстро и красиво решали, за это отдельный плюс. Сам ресторан тоже классный, много залов, просторно и уютно. С удовольствием придём ещё!",
    date: "4 месяца назад",
  },
  {
    author: "Jelena Kaskure",
    rating: 5,
    text: "Отмечали юбилей в Grand Restaurant и остались очень довольны 😊 Очень понравилась атмосфера, вкусная еда, красивая сервировка, хорошее обслуживание и музыка 🎶 Все гости остались довольны и прекрасно провели вечер. Отдельное спасибо владельцу — очень приятный, отзывчивый молодой человек, который помог создать действительно тёплую и спокойную атмосферу праздника. Спасибо за хороший вечер и приятные впечатления! 🎉",
    date: "4 месяца назад",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  var track = document.querySelector("[data-reviews-track]");
  if (!track) return;

  reviews.forEach(function (review) {
    var card = document.createElement("article");
    card.className = "review-card";

    var stars = document.createElement("div");
    stars.className = "review-stars";
    var rating = Math.max(0, Math.min(5, Math.round(review.rating || 0)));
    stars.textContent = "★".repeat(rating) + "☆".repeat(5 - rating);
    stars.setAttribute("aria-label", "Оценка " + rating + " из 5");

    var text = document.createElement("p");
    text.className = "review-text";
    text.textContent = review.text || "";

    var meta = document.createElement("div");
    meta.className = "review-meta";

    var author = document.createElement("span");
    author.className = "review-author";
    author.textContent = review.author || "";
    meta.appendChild(author);

    if (review.date) {
      var date = document.createElement("span");
      date.className = "review-date";
      date.textContent = review.date;
      meta.appendChild(date);
    }

    card.appendChild(stars);
    card.appendChild(text);
    card.appendChild(meta);
    track.appendChild(card);
  });
});
