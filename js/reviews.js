/* =========================================================
   GRAND — reviews.js
   Отзывы для секции "Отзывы" на главной странице.

   КАК ОТРЕДАКТИРОВАТЬ: просто замените значения в массиве reviews[]
   ниже на реальные отзывы, скопированные из Google Maps (имя автора,
   оценка от 1 до 5, текст отзыва, дата в любом читаемом формате,
   например "март 2026"). Разметку/CSS трогать не нужно — карточки
   строятся автоматически на основе этого массива.
   ========================================================= */

var reviews = [
  { author: "Имя Фамилия 1", rating: 5, text: "[ОТЗЫВ 1] — вставьте сюда текст реального отзыва из Google", date: "[ДАТА 1]" },
  { author: "Имя Фамилия 2", rating: 5, text: "[ОТЗЫВ 2] — вставьте сюда текст реального отзыва из Google", date: "[ДАТА 2]" },
  { author: "Имя Фамилия 3", rating: 4, text: "[ОТЗЫВ 3] — вставьте сюда текст реального отзыва из Google", date: "[ДАТА 3]" },
  { author: "Имя Фамилия 4", rating: 5, text: "[ОТЗЫВ 4] — вставьте сюда текст реального отзыва из Google", date: "[ДАТА 4]" },
  { author: "Имя Фамилия 5", rating: 5, text: "[ОТЗЫВ 5] — вставьте сюда текст реального отзыва из Google", date: "[ДАТА 5]" },
  { author: "Имя Фамилия 6", rating: 5, text: "[ОТЗЫВ 6] — вставьте сюда текст реального отзыва из Google", date: "[ДАТА 6]" },
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
