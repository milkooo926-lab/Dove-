/* Dove – script.js
   ไฟล์เดียวใช้ร่วมทุกหน้า: ตรวจ element ในหน้าแล้วรันเฉพาะส่วนที่เกี่ยวข้อง
   - product.html : #product-list, #filter-bar
   - order.html   : #orderForm, #items, #total
   - admin.html   : #ordersTable
*/

const ORDERS_KEY = "bodyScentOrders";

const MOODS = [
  { key: "all", label: "ทั้งหมด" },
  { key: "fresh", label: "Fresh" },
  { key: "sweet", label: "Sweet" },
  { key: "confident", label: "Confident" },
  { key: "romance", label: "Romance" }
];

/* ---------- Helpers ---------- */

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function formatBaht(n) {
  return Number(n).toLocaleString("th-TH") + " บาท";
}

/* เติมค่าลง element ได้ทั้ง input/textarea และ span/div/td */
function setFieldValue(el, value) {
  if (!el) return;
  if ("value" in el) {
    el.value = value;
  } else {
    el.textContent = value;
  }
}

function getFieldValue(el) {
  if (!el) return "";
  return ("value" in el ? el.value : el.textContent).trim();
}

/* ดึงช่องฟอร์มด้วย name หรือ id */
function getFormField(form, name) {
  return form.elements[name] || document.getElementById(name);
}

function readOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("อ่านข้อมูลคำสั่งซื้อไม่สำเร็จ:", err);
    return [];
  }
}

/* ==========================================================
   product.html
   ========================================================== */

function initProductPage() {
  const list = document.getElementById("product-list");
  const filterBar = document.getElementById("filter-bar");
  if (!list) return;

  let products = [];
  let activeMood = "all";

  function normalizeMood(mood) {
    const m = (mood || "").toLowerCase();
    return MOODS.some(function (x) { return x.key === m; }) ? m : "all";
  }

  function buildCard(p) {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.mood = p.mood;

    /* รูป */
    const media = document.createElement("div");
    media.className = "product-card__media";
    const img = document.createElement("img");
    img.src = p.image;
    img.alt = p.name + " " + p.volume;
    img.loading = "lazy";
    media.appendChild(img);

    /* เนื้อหา */
    const body = document.createElement("div");
    body.className = "product-card__body";

    const formula = document.createElement("div");
    formula.className = "product-card__formula";
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.setAttribute("aria-hidden", "true");
    const moodLabel = document.createElement("span");
    const moodInfo = MOODS.find(function (m) { return m.key === p.mood; });
    moodLabel.textContent = moodInfo ? moodInfo.label : p.mood;
    formula.append(dot, moodLabel);

    const title = document.createElement("h3");
    title.className = "product-card__title";
    title.textContent = p.name;

    const size = document.createElement("p");
    size.className = "product-card__size";
    size.textContent = p.sizeLabel + " " + p.volume;

    const desc = document.createElement("p");
    desc.className = "product-card__desc";
    desc.textContent = p.description;

    /* ราคา + ปุ่มสั่งซื้อ */
    const footer = document.createElement("div");
    footer.className = "product-card__footer";

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = "฿" + Number(p.price).toLocaleString("th-TH");

    const itemName = p.name + " " + p.volume;
    const buy = document.createElement("a");
    buy.className = "btn btn--small";
    buy.textContent = "สั่งซื้อ";
    buy.href =
      "order.html?item=" + encodeURIComponent(itemName) +
      "&price=" + encodeURIComponent(p.price);

    footer.append(price, buy);
    body.append(formula, title, size, desc, footer);
    card.append(media, body);
    return card;
  }

  function render() {
    const shown = activeMood === "all"
      ? products
      : products.filter(function (p) { return p.mood === activeMood; });

    list.replaceChildren();

    if (shown.length === 0) {
      const empty = document.createElement("p");
      empty.textContent = "ยังไม่มีสินค้าในหมวดนี้";
      list.appendChild(empty);
      return;
    }
    shown.forEach(function (p) { list.appendChild(buildCard(p)); });
  }

  function updateFilterButtons() {
    if (!filterBar) return;
    filterBar.querySelectorAll("[data-mood]").forEach(function (btn) {
      const on = btn.dataset.mood === activeMood;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", String(on));
    });
  }

  function setMood(mood, updateUrl) {
    activeMood = normalizeMood(mood);
    updateFilterButtons();
    render();

    if (updateUrl) {
      const url = new URL(window.location.href);
      if (activeMood === "all") {
        url.searchParams.delete("mood");
      } else {
        url.searchParams.set("mood", activeMood);
      }
      history.replaceState(null, "", url);
    }
  }

  function initFilterBar() {
    if (!filterBar) return;

    /* ถ้า HTML ยังไม่มีปุ่ม ให้สร้างให้ */
    if (!filterBar.querySelector("[data-mood]")) {
      MOODS.forEach(function (m) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "filter";
        btn.dataset.mood = m.key;
        btn.textContent = m.label;
        filterBar.appendChild(btn);
      });
    }

    filterBar.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-mood]");
      if (btn) setMood(btn.dataset.mood, true);
    });
  }

  initFilterBar();

  fetch("products.json")
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(function (data) {
      products = Array.isArray(data) ? data : [];
      /* อ่าน ?mood=xxx แล้วกรองอัตโนมัติ */
      setMood(getParam("mood"), false);
    })
    .catch(function (err) {
      console.error("โหลด products.json ไม่สำเร็จ:", err);
      list.textContent = "โหลดรายการสินค้าไม่สำเร็จ กรุณาลองใหม่อีกครั้ง";
    });
}

/* ==========================================================
   order.html
   ========================================================== */

function initOrderPage() {
  const form = document.getElementById("orderForm");
  const itemsEl = document.getElementById("items");
  const totalEl = document.getElementById("total");
  if (!form && !itemsEl && !totalEl) return;

  /* เติม #items และ #total เสมอ (มีค่าสำรองเมื่อไม่มี parameter) */
  const item = getParam("item");
  const priceParam = getParam("price");
  const price = Number(priceParam);
  const hasPrice = priceParam !== null && priceParam.trim() !== "" && Number.isFinite(price);

  setFieldValue(itemsEl, item && item.trim() ? item.trim() : "ไม่ระบุสินค้า");

  if (totalEl) {
    if (totalEl.type === "number") {
      totalEl.value = hasPrice ? price : 0;
    } else {
      setFieldValue(totalEl, formatBaht(hasPrice ? price : 0));
    }
  }

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const payload = {
      customerName: getFieldValue(getFormField(form, "customerName")),
      contact: getFieldValue(getFormField(form, "contact")),
      items: getFieldValue(itemsEl),
      total: getFieldValue(totalEl),
      note: getFieldValue(getFormField(form, "note")),
      timestamp: new Date().toISOString()
    };

    try {
      const orders = readOrders();
      orders.push(payload);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (err) {
      console.error("บันทึกคำสั่งซื้อไม่สำเร็จ:", err);
      alert("บันทึกคำสั่งซื้อไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      return;
    }

    window.location.href = "thankyou.html";
  });
}

/* ==========================================================
   admin.html
   ========================================================== */

function initAdminPage() {
  const table = document.getElementById("ordersTable");
  if (!table) return;

  let tbody = table.querySelector("tbody");
  if (!tbody) {
    tbody = document.createElement("tbody");
    table.appendChild(tbody);
  }

  const columnCount = table.querySelectorAll("thead th").length || 6;
  const orders = readOrders().sort(function (a, b) {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  tbody.replaceChildren();

  if (orders.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = columnCount;
    td.textContent = "ยังไม่มีคำสั่งซื้อ";
    td.style.textAlign = "center";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  orders.forEach(function (o) {
    const date = new Date(o.timestamp);
    const dateText = isNaN(date) ? "-" : date.toLocaleString("th-TH");

    const cells = [
      dateText,
      o.customerName || "-",
      o.contact || "-",
      o.items || "-",
      o.total || "-",
      o.note || "-"
    ];

    const tr = document.createElement("tr");
    cells.forEach(function (text) {
      const td = document.createElement("td");
      td.textContent = text;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

/* ---------- Init ---------- */

document.addEventListener("DOMContentLoaded", function () {
  initProductPage();
  initOrderPage();
  initAdminPage();
});
