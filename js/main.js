/* =========================================================
   GRAND — main.js
   Navigation, scroll reveal, forms (validation + submission)
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- header scroll state ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mobile nav toggle ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- forms ---------- */
  document.querySelectorAll("form[data-grand-form]").forEach(initForm);
});

/**
 * ПРИЁМ ЗАЯВОК НА ПОЧТУ — сайт статический, без бэкенда, поэтому письма
 * отправляет сторонний бесплатный сервис. Выберите ОДИН из двух вариантов:
 *
 * Вариант A — Web3Forms (быстрее всего, ~2 минуты, регистрация не нужна):
 *   1. Откройте https://web3forms.com
 *   2. Введите e-mail ресторана (grandrestaurathoteldpils@gmail.com) и
 *      нажмите "Create Access Key"
 *   3. В этот же e-mail придёт письмо с access key — скопируйте его и
 *      вставьте в WEB3FORMS_ACCESS_KEY ниже (между кавычками)
 *   Всё, больше ничего менять не нужно — FORM_ENDPOINT подключится сам.
 *
 * Вариант B — Formspree (https://formspree.io): зарегистрируйтесь, создайте
 *   форму на тот же e-mail, скопируйте её endpoint вида
 *   "https://formspree.io/f/xxxxxxx" и вставьте его в FORM_ENDPOINT ниже
 *   (тогда WEB3FORMS_ACCESS_KEY оставьте пустым).
 *
 * Пока ни один вариант не настроен — заявки не теряются: форма показывает
 * сообщение и предлагает отправить их через WhatsApp (кнопка уже с данными).
 */
var WEB3FORMS_ACCESS_KEY = ""; // сюда — access key с web3forms.com
var FORM_ENDPOINT = WEB3FORMS_ACCESS_KEY
  ? "https://api.web3forms.com/submit"
  : ""; // или вставьте сюда endpoint Formspree, например "https://formspree.io/f/xxxxxxx"

/**
 * Номер WhatsApp сформирован из опубликованного телефона ресторана (+371 22033449).
 * TODO: перед запуском проверьте, что этот номер подключён к WhatsApp Business —
 * если WhatsApp работает на другом номере, замените значение ниже.
 */
var WHATSAPP_NUMBER = "37122033449";

/**
 * Тексты форм на трёх языках сайта. Язык страницы берётся из <html lang="...">.
 */
var I18N = {
  lv: {
    fieldError: "Pārbaudiet šo lauku",
    requiredFields: "Lūdzu, aizpildiet obligātos laukus.",
    formSoon:
      "Pieteikumu pieņemšanas forma drīzumā sāks darboties. Lūdzu, nosūtiet pieteikumu caur WhatsApp — poga zemāk jau ir aizpildīta ar jūsu datiem.",
    sending: "Nosūtām pieteikumu…",
    sent: "Paldies! Pieteikums nosūtīts, mēs sazināsimies ar jums tuvākajā laikā.",
    sendFailed: "Neizdevās nosūtīt formu automātiski. Lūdzu, izmantojiet WhatsApp pogu zemāk.",
    whatsappTitleFallback: "Pieteikums no GRAND mājaslapas",
  },
  ru: {
    fieldError: "Проверьте это поле",
    requiredFields: "Пожалуйста, заполните обязательные поля.",
    formSoon:
      "Форма приёма заявок скоро заработает. Пожалуйста, отправьте заявку через WhatsApp — кнопка ниже уже заполнена вашими данными.",
    sending: "Отправляем заявку…",
    sent: "Спасибо! Заявка отправлена, мы свяжемся с вами в ближайшее время.",
    sendFailed: "Не удалось отправить форму автоматически. Пожалуйста, воспользуйтесь кнопкой WhatsApp ниже.",
    whatsappTitleFallback: "Заявка с сайта GRAND",
  },
  en: {
    fieldError: "Please check this field",
    requiredFields: "Please fill in the required fields.",
    formSoon:
      "The request form will be live soon. Please send your request via WhatsApp — the button below is already filled in with your details.",
    sending: "Sending your request…",
    sent: "Thank you! Your request has been sent, we'll be in touch shortly.",
    sendFailed: "Couldn't send the form automatically. Please use the WhatsApp button below.",
    whatsappTitleFallback: "Request from the GRAND website",
  },
};
var LANG = I18N[document.documentElement.lang] ? document.documentElement.lang : "ru";
var T = I18N[LANG];

function initForm(form) {
  var statusEl = form.querySelector("[data-form-status]");
  var whatsappBtn = form.querySelector("[data-whatsapp-fallback]");

  // Рабочая ссылка на WhatsApp сразу при загрузке страницы (ещё без данных формы),
  // чтобы кнопка не была "мёртвой", если её нажали до отправки формы.
  if (whatsappBtn) {
    whatsappBtn.setAttribute("href", buildWhatsAppLink(form, {}));
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var isValid = validateForm(form);
    if (!isValid) {
      setStatus(statusEl, T.requiredFields, true);
      return;
    }

    var data = collectFormData(form);
    var waLink = buildWhatsAppLink(form, data);
    if (whatsappBtn) whatsappBtn.setAttribute("href", waLink);

    if (!FORM_ENDPOINT) {
      setStatus(statusEl, T.formSoon, false);
      return;
    }

    var payload = data;
    if (WEB3FORMS_ACCESS_KEY) {
      payload = Object.assign({}, data, {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: form.dataset.whatsappTitle || T.whatsappTitleFallback,
        from_name: "GRAND — сайт",
      });
    }

    setStatus(statusEl, T.sending, false);
    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        if (res.ok) {
          setStatus(statusEl, T.sent, false);
          form.reset();
        } else {
          throw new Error("network");
        }
      })
      .catch(function () {
        setStatus(statusEl, T.sendFailed, true);
      });
  });
}

function setStatus(el, text, isError) {
  if (!el) return;
  el.textContent = text;
  el.style.color = isError ? "#e08585" : "";
}

function validateForm(form) {
  var valid = true;
  form.querySelectorAll("[required]").forEach(function (field) {
    var group = field.closest(".form-group");
    var errorEl = group ? group.querySelector(".form-error") : null;
    var fieldValid = field.checkValidity();

    if (field.type === "date" && field.value) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      var chosen = new Date(field.value);
      if (chosen < today) fieldValid = false;
    }

    if (!fieldValid) {
      valid = false;
      if (group) group.classList.add("has-error");
      if (errorEl) errorEl.textContent = field.dataset.errorMessage || T.fieldError;
    } else {
      if (group) group.classList.remove("has-error");
      if (errorEl) errorEl.textContent = "";
    }
  });
  return valid;
}

function collectFormData(form) {
  var data = {};
  new FormData(form).forEach(function (value, key) {
    data[key] = value;
  });
  data.form_name = form.dataset.grandForm || "grand-form";
  return data;
}

function buildWhatsAppLink(form, data) {
  var lines = [];
  var title = form.dataset.whatsappTitle || T.whatsappTitleFallback;
  lines.push(title + ":");
  form.querySelectorAll("[name]").forEach(function (field) {
    var label = field.closest(".form-group")
      ? field.closest(".form-group").querySelector("label")
      : null;
    var labelText = label ? label.textContent.replace(/\s*\*\s*$/, "").trim() : field.name;
    var value = data[field.name];
    if (value) lines.push(labelText + ": " + value);
  });
  var text = encodeURIComponent(lines.join("\n"));
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;
}
