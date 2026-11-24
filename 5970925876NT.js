/* Dove – รายการสินค้า (10 รายการ)
   ใช้งานใน HTML: <script src="products.js"></script> แล้วเรียก DOVE_PRODUCTS ได้เลย
   mood = สีจุดเล็ก ๆ ที่ผูกกับแต่ละสูตร (ดู style.css)
*/

const DOVE_FORMULAS = {
  moisture: {
    name: "Moisture",
    thai: "สูตรเพิ่มความชุ่มชื้น",
    mood: "sweet",
    description: "เติมความชุ่มชื้นให้เส้นผมที่แห้งกร้าน ช่วยให้ผมนุ่มลื่น จัดทรงง่าย และดูสุขภาพดีในทุกวัน"
  },
  hairfall: {
    name: "Hair Fall Rescue",
    thai: "สูตรลดปัญหาผมขาดหลุดร่วง",
    mood: "confident",
    description: "บำรุงเส้นผมให้แข็งแรงจากรากถึงปลาย ช่วยลดการขาดหลุดร่วงที่เกิดจากความเปราะบางของเส้นผม"
  },
  repair: {
    name: "Intense Repair",
    thai: "สูตรฟื้นบำรุงผมเสีย",
    mood: "romance",
    description: "ฟื้นบำรุงผมแห้งเสียจากการทำเคมี ความร้อน และมลภาวะ ให้ผมดูเรียบลื่นและกลับมามีชีวิตชีวา"
  },
  antidandruff: {
    name: "Anti-Dandruff",
    thai: "สูตรขจัดรังแค",
    mood: "fresh",
    description: "ทำความสะอาดหนังศีรษะอย่างล้ำลึก พร้อมดูแลปัญหารังแค ให้หนังศีรษะสะอาดสบายและมั่นใจตลอดวัน"
  }
};

const DOVE_PRODUCTS = [
  /* ขนาดเล็ก 30 ml */
  {
    id: "moisture-30",
    name: "Dove Moisture",
    formula: "moisture",
    mood: "sweet",
    sizeLabel: "ขนาดเล็ก",
    volume: "30 ml",
    price: 39,
    image: "images/moisture.jpg",
    description: "ขนาดพกพาสำหรับลองสัมผัสความนุ่มลื่นชุ่มชื้นของสูตรเพิ่มความชุ่มชื้น"
  },
  {
    id: "hairfall-30",
    name: "Dove Hair Fall Rescue",
    formula: "hairfall",
    mood: "confident",
    sizeLabel: "ขนาดเล็ก",
    volume: "30 ml",
    price: 39,
    image: "images/hairfall.jpg",
    description: "ลองดูแลผมขาดหลุดร่วงด้วยขนาดทดลอง พกง่ายใช้สะดวก"
  },
  {
    id: "repair-30",
    name: "Dove Intense Repair",
    formula: "repair",
    mood: "romance",
    sizeLabel: "ขนาดเล็ก",
    volume: "30 ml",
    price: 39,
    image: "images/repair.jpg",
    description: "ทดลองฟื้นบำรุงผมเสียให้เรียบลื่น ในขนาดเล็กพกไปได้ทุกที่"
  },
  {
    id: "antidandruff-30",
    name: "Dove Anti-Dandruff",
    formula: "antidandruff",
    mood: "fresh",
    sizeLabel: "ขนาดเล็ก",
    volume: "30 ml",
    price: 39,
    image: "images/antidandruff.jpg",
    description: "ลองสัมผัสความสะอาดสบายของสูตรขจัดรังแคก่อนตัดสินใจ"
  },

  /* ขนาดปกติ 100 ml */
  {
    id: "moisture-100",
    name: "Dove Moisture",
    formula: "moisture",
    mood: "sweet",
    sizeLabel: "ขนาดปกติ",
    volume: "100 ml",
    price: 89,
    image: "images/moisture.jpg",
    description: "แชมพูสูตรชุ่มชื้นขนาดพอดี ให้ผมนุ่มลื่นไม่แห้งกร้านในการใช้ทุกวัน"
  },
  {
    id: "hairfall-100",
    name: "Dove Hair Fall Rescue",
    formula: "hairfall",
    mood: "confident",
    sizeLabel: "ขนาดปกติ",
    volume: "100 ml",
    price: 89,
    image: "images/hairfall.jpg",
    description: "แชมพูบำรุงผมให้แข็งแรง ลดการขาดหลุดร่วงจากเส้นผมเปราะบาง"
  },
  {
    id: "repair-100",
    name: "Dove Intense Repair",
    formula: "repair",
    mood: "romance",
    sizeLabel: "ขนาดปกติ",
    volume: "100 ml",
    price: 89,
    image: "images/repair.jpg",
    description: "แชมพูฟื้นบำรุงผมแห้งเสีย ให้ผมเรียบลื่นและมีชีวิตชีวาขึ้นทุกครั้งที่สระ"
  },
  {
    id: "antidandruff-100",
    name: "Dove Anti-Dandruff",
    formula: "antidandruff",
    mood: "fresh",
    sizeLabel: "ขนาดปกติ",
    volume: "100 ml",
    price: 89,
    image: "images/antidandruff.jpg",
    description: "แชมพูทำความสะอาดหนังศีรษะและดูแลปัญหารังแค สำหรับการใช้ประจำวัน"
  },

  /* ขนาดใหญ่ 200 ml */
  {
    id: "moisture-200",
    name: "Dove Moisture",
    formula: "moisture",
    mood: "sweet",
    sizeLabel: "ขนาดใหญ่",
    volume: "200 ml",
    price: 149,
    image: "images/moisture.jpg",
    description: "ขนาดใหญ่สุดคุ้ม สำหรับคนรักผมนุ่มลื่นชุ่มชื้นที่ใช้ได้ยาวนาน"
  },
  {
    id: "repair-200",
    name: "Dove Intense Repair",
    formula: "repair",
    mood: "romance",
    sizeLabel: "ขนาดใหญ่",
    volume: "200 ml",
    price: 149,
    image: "images/repair.jpg",
    description: "ขนาดใหญ่สำหรับการฟื้นบำรุงผมเสียอย่างต่อเนื่อง ให้ผมสวยเรียบลื่นคุ้มค่ายิ่งขึ้น"
  }
];

/* ตัวช่วยจัดรูปแบบราคา เช่น 39 -> "฿39" */
function formatPrice(n) {
  return "฿" + n.toLocaleString("th-TH");
}
