/* SMOKY STACK - script.js (the ONLY script; every page loads it. Code for other pages simply does nothing). */


/* ============================================================
   1. SETTINGS, MENU, DEALS, OPTIONS (edit your menu here)
   ============================================================ */
/* ===== Site settings, menu and deals. Edit here; every page uses this file. ===== */
const SITE = {
  name: 'Smoky Stack',
  address: '123 Main Street, Your City (placeholder - edit in js/data.js)',
  mapQuery: 'Karachi, Pakistan',          // map shows this area; replace with your real address
  phone: '+92 300 0000000 (placeholder)', email: 'hello@smokystack.example',
  hours: 'Mon-Thu 11am-11pm | Fri-Sun 11am-1am',
  social: { Instagram: 'https://www.instagram.com/', Facebook: 'https://www.facebook.com/', TikTok: 'https://www.tiktok.com/' },
  eta: 30,          // estimated delivery minutes shown to customers (+/- 5)
  demoSpeed: 3      // order tracking demo runs this many times faster than real time
};
/* Unsplash photo IDs: NOT verified from my environment. Broken ones fall back to a dark gradient with the name. */
const U = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=640&q=70`;
const PH = {
  burger1: U('1568901346375-23c9450c58cd'), burger2: U('1550547660-d9450f859349'), burger3: U('1571091718767-18b5b1457add'),
  pizza1: U('1513104890138-7c749659a591'), pizza2: U('1565299624946-b28f40a0ae38'), pizza3: U('1574071318508-1cdbab80d002'),
  fries: U('1573080496219-bb080dd4f877'), wings: U('1567620832903-9fc6debc209f'), sandwich: U('1528735602780-2552fd46c7af'),
  shake: U('1572490122747-3968b75cc699'), brownie: U('1606313564200-e75d5e30476c'), cola: U('1622483767028-3f66f32aef97'), ice: U('1563805042-7684c019e1cb')
};
const CATS = [['burgers', 'Burgers'], ['pizzas', 'Pizzas'], ['platters', 'Platters'], ['sides', 'Sides'], ['wraps', 'Sandwiches & Wraps'], ['drinks', 'Drinks'], ['desserts', 'Desserts']];
const PREP = { burgers: '15-20', pizzas: '20-25', platters: '25-30', sides: '10-15', wraps: '10-15', drinks: '5', desserts: '5-10', deals: '25-35' };
const BR = { 'Best Seller': 3, Popular: 2, New: 1 };
const mk = rows => rows.map(([id, cat, name, desc, price, k, badge]) => ({ id, cat, name, desc, price, img: PH[k], badge }));
const MENU = mk([
  ['b1', 'burgers', 'Classic Beef Burger', 'Flame-grilled beef, cheddar, pickles', 650, 'burger1', 'Best Seller'],
  ['b2', 'burgers', 'Double Smash Burger', 'Two smashed patties, double cheese', 950, 'burger2', 'Popular'],
  ['b3', 'burgers', 'Crispy Chicken Burger', 'Golden fried chicken, garlic mayo', 600, 'burger3'],
  ['b4', 'burgers', 'Spicy Zinger Burger', 'Extra-crispy spicy fillet, jalapeno mayo', 680, 'burger3', 'Popular'],
  ['b5', 'burgers', 'BBQ Beef Burger', 'Beef patty, smoky BBQ glaze, onion ring', 890, 'burger1'],
  ['b6', 'burgers', 'Mushroom Swiss Burger', 'Sauteed mushrooms, melted swiss', 850, 'burger2', 'New'],
  ['b7', 'burgers', 'Jalapeno Cheese Burger', 'Pepper-jack, jalapenos, chipotle sauce', 790, 'burger1'],
  ['b8', 'burgers', 'Smoky Stack Signature Burger', 'Triple stack, secret smoky sauce', 1190, 'burger2', 'Best Seller'],
  ['b9', 'burgers', 'Grilled Chicken Burger', 'Herb-grilled chicken breast, lettuce', 640, 'burger3'],
  ['b10', 'burgers', 'Mega Double Cheese Burger', 'Two patties, four slices of cheese', 1090, 'burger1', 'New'],
  ['p1', 'pizzas', 'Margherita Pizza', 'Tomato, fresh mozzarella, basil', 750, 'pizza1'],
  ['p2', 'pizzas', 'Pepperoni Pizza', 'Crispy pepperoni, mozzarella', 950, 'pizza2', 'Best Seller'],
  ['p3', 'pizzas', 'Chicken Fajita Pizza', 'Fajita chicken, peppers, olives', 1000, 'pizza3', 'Popular'],
  ['p4', 'pizzas', 'BBQ Chicken Pizza', 'BBQ sauce, grilled chicken, onion', 1000, 'pizza3'],
  ['p5', 'pizzas', 'Creamy Alfredo Pizza', 'White garlic sauce, chicken, mushrooms', 1050, 'pizza1', 'New'],
  ['p6', 'pizzas', 'Four Cheese Pizza', 'Mozzarella, cheddar, parmesan, cream cheese', 1100, 'pizza1'],
  ['p7', 'pizzas', 'Peri Peri Pizza', 'Spicy peri peri chicken, capsicum', 1000, 'pizza2'],
  ['p8', 'pizzas', 'Smoky Stack Special Pizza', 'Chicken, beef, veggies, extra cheese', 1250, 'pizza3', 'Popular'],
  ['p9', 'pizzas', 'Tandoori Chicken Pizza', 'Tandoori chicken, onion, green chilli', 1050, 'pizza2'],
  ['p10', 'pizzas', 'Mexican Pizza', 'Jalapenos, beans, spiced chicken', 1050, 'pizza3'],
  ['t1', 'platters', 'Chicken Supreme Platter', 'Fried chicken, fries, coleslaw, dips', 1650, 'wings', 'Popular'],
  ['t2', 'platters', 'Smoky Stack Special Platter', 'Burger, wings, fries, nuggets', 1850, 'burger2', 'Best Seller'],
  ['t3', 'platters', 'BBQ Chicken Platter', 'BBQ chicken, rice, grilled veggies', 1750, 'wings'],
  ['t4', 'platters', 'Family Sharing Platter', 'Wings, nuggets, fries, rings, dips', 2650, 'wings'],
  ['t5', 'platters', 'Mixed Grill Platter', 'Chicken tikka, kebab, grilled sides', 2450, 'wings'],
  ['t6', 'platters', 'Burger and Wings Platter', 'Two burgers, wings, fries', 1900, 'burger1'],
  ['t7', 'platters', 'Pizza Lovers Platter', 'Pizza, garlic bread, wings, dips', 2350, 'pizza2'],
  ['t8', 'platters', 'Ultimate Feast Platter', 'Burgers, pizza, wings and sides', 3450, 'burger3', 'New'],
  ['s1', 'sides', 'Classic French Fries', 'Crispy, salted, golden', 250, 'fries'],
  ['s2', 'sides', 'Loaded Cheese Fries', 'Cheese sauce, jalapenos, crispy chicken', 450, 'fries', 'Best Seller'],
  ['s3', 'sides', 'Masala Fries', 'Tossed in tangy desi masala', 300, 'fries'],
  ['s4', 'sides', 'Chicken Nuggets', 'Six crunchy nuggets with a dip', 450, 'wings'],
  ['s5', 'sides', 'Crispy Wings', 'Six wings, crunchy outside, juicy inside', 650, 'wings', 'Popular'],
  ['s6', 'sides', 'Garlic Bread', 'Toasted with garlic butter', 350, 'sandwich'],
  ['s7', 'sides', 'Mozzarella Sticks', 'Crumb-coated, marinara dip', 500, 'fries'],
  ['s8', 'sides', 'Onion Rings', 'Extra-crisp batter', 380, 'fries'],
  ['s9', 'sides', 'Cheese Balls', 'Molten cheese centres, crumb crust', 420, 'fries'],
  ['w1', 'wraps', 'Grilled Chicken Sandwich', 'Grilled chicken, lettuce, mayo', 550, 'sandwich'],
  ['w2', 'wraps', 'Club Sandwich', 'Triple-decker, chicken, egg, cheese', 650, 'sandwich'],
  ['w3', 'wraps', 'Crispy Chicken Wrap', 'Crispy strips, slaw, garlic sauce', 520, 'sandwich'],
  ['w4', 'wraps', 'BBQ Chicken Wrap', 'BBQ chicken, onions, cheese', 540, 'sandwich', 'New'],
  ['w5', 'wraps', 'Smoky Stack Special Sandwich', 'Beef, cheese, caramelised onion', 720, 'sandwich'],
  ['d1', 'drinks', 'Coca-Cola', 'Chilled soft drink', 120, 'cola'],
  ['d2', 'drinks', 'Sprite', 'Chilled lemon-lime soda', 120, 'cola'],
  ['d3', 'drinks', 'Fanta', 'Chilled orange soda', 120, 'cola'],
  ['d4', 'drinks', 'Lemon Mint', 'Fresh lemon, mint and soda', 220, 'cola'],
  ['d5', 'drinks', 'Fresh Lime', 'Fresh-squeezed, sweet or salted', 180, 'cola'],
  ['d6', 'drinks', 'Chocolate Milkshake', 'Thick, creamy chocolate', 480, 'shake', 'Popular'],
  ['d7', 'drinks', 'Strawberry Milkshake', 'Real strawberry and ice cream', 480, 'shake'],
  ['d8', 'drinks', 'Vanilla Milkshake', 'Classic vanilla bean', 450, 'shake'],
  ['e1', 'desserts', 'Chocolate Brownie', 'Warm, fudgy', 380, 'brownie'],
  ['e2', 'desserts', 'Chocolate Lava Cake', 'Molten centre, served warm', 450, 'brownie', 'Best Seller'],
  ['e3', 'desserts', 'Ice Cream', 'Two scoops, vanilla or chocolate', 300, 'ice'],
  ['e4', 'desserts', 'Chocolate Fudge Cake', 'Rich layered fudge cake', 420, 'brownie'],
  ['e5', 'desserts', 'Cheesecake', 'Creamy baked cheesecake slice', 520, 'ice', 'New']
]);
/* Deals: orig = price if bought separately, price = deal price. sub = filter group. */
const DEALS = [
  ['o1', 'burger', 'Burger Combo Deal', 'One burger, fries and one drink', 1150, 899, 'burger1', 'Best Seller'],
  ['o2', 'pizza', 'Pizza Family Deal', 'Large pizza, garlic bread and 2 drinks', 2500, 2099, 'pizza2', 'Popular'],
  ['o3', 'family', 'Friends Feast', '2 burgers, loaded fries, wings, 2 drinks', 3400, 2799, 'burger2'],
  ['o4', 'family', 'Family Feast', '2 large pizzas, a platter and 4 drinks', 6200, 4999, 'pizza3'],
  ['o5', 'burger', 'Double Smash Offer', 'Two double smash burgers', 1900, 1599, 'burger2'],
  ['o6', 'pizza', 'Pizza Lovers Deal', 'Two medium pizzas with extra cheese', 3100, 2599, 'pizza1'],
  ['o7', 'platters', 'Chicken Lovers Platter', 'Wings, chicken strips, fries and dips', 1900, 1549, 'wings'],
  ['o8', 'student', 'Student Deal', 'Burger, fries and a drink', 950, 749, 'burger3', 'Popular'],
  ['o9', 'family', 'Weekend Special', 'Discounted family meal for four', 4200, 3499, 'pizza2', 'New'],
  ['o10', 'platters', 'Smoky Stack Mega Box', 'Burgers, pizza slices, wings, fries, drinks', 6500, 5299, 'burger1']
].map(([id, sub, name, desc, orig, price, k, badge]) => ({ id, sub, cat: 'deals', name, desc, orig, price, img: PH[k], badge }));
const DEAL_CATS = [['burger', 'Burger Deals'], ['pizza', 'Pizza Deals'], ['family', 'Family Deals'], ['platters', 'Platters'], ['student', 'Student Deals']];

/* Customisation groups. t: 'r' pick one, 'c' pick any. o: [label, extra PKR] */
const SPICE = { k: 'Spice', t: 'r', o: [['Mild', 0], ['Medium', 0], ['Hot', 0]] };
const DRINK = { k: 'Drink', t: 'r', o: [['Coca-Cola', 0], ['Sprite', 0], ['Fanta', 0], ['Chocolate shake', 150]] };
const DIPS = { k: 'Dips', t: 'c', o: [['Garlic mayo', 40], ['BBQ', 40], ['Hot sauce', 40], ['Cheese dip', 80]] };
const OPTS = {
  burgers: [{ k: 'Patty', t: 'r', o: [['Single', 0], ['Double', 350]] }, { k: 'Meat', t: 'r', o: [['Beef', 0], ['Chicken', 0]] }, { k: 'Cheese', t: 'r', o: [['Regular', 0], ['Extra', 80]] }, SPICE,
  { k: 'Extras', t: 'c', o: [['Mushrooms', 70], ['Jalapenos', 50], ['Onions', 40], ['Sauce', 30]] }, { k: 'Remove', t: 'c', o: [['Lettuce', 0], ['Onion', 0], ['Pickles', 0], ['Sauce', 0]] }],
  pizzas: [{ k: 'Size', t: 'r', o: [['Small', 0], ['Medium', 350], ['Large', 700]] }, { k: 'Crust', t: 'r', o: [['Thin', 0], ['Classic', 0], ['Cheese Burst', 300]] },
  { k: 'Style', t: 'r', o: [['Whole pizza', 0], ['Half and half (two flavours)', 150]] },
  { k: 'Extras', t: 'c', o: [['Extra cheese', 150], ['Chicken', 200], ['Mushrooms', 100], ['Olives', 80], ['Jalapenos', 60]] }],
  platters: [{ k: 'Servings', t: 'r', o: [['Serves 2', 0], ['Serves 4', 1400]] }, { k: 'Side', t: 'r', o: [['Fries', 0], ['Onion rings', 0], ['Loaded fries', 150]] }, DIPS, DRINK],
  sides: [{ k: 'Size', t: 'r', o: [['Regular', 0], ['Large', 150]] }, { k: 'Seasoning', t: 'r', o: [['Plain', 0], ['Masala', 0], ['Peri peri', 0]] }, DIPS],
  wraps: [SPICE, { k: 'Extras', t: 'c', o: [['Extra cheese', 80], ['Extra chicken', 150], ['Sauce', 30]] }, { k: 'Remove', t: 'c', o: [['Lettuce', 0], ['Onion', 0], ['Sauce', 0]] }],
  drinks: [{ k: 'Size', t: 'r', o: [['Regular', 0], ['Large', 80]] }, { k: 'Add-ons', t: 'c', o: [['Whipped cream', 60], ['Extra scoop', 120]] }],
  desserts: [{ k: 'Add-ons', t: 'c', o: [['Ice cream scoop', 120], ['Chocolate sauce', 40]] }],
  deals: [DRINK, SPICE, { k: 'Upgrades', t: 'c', o: [['Large fries', 150], ['Extra dip', 40]] }]
};


/* ============================================================
   2. SHARED CORE: helpers, cart, product cards, customise modal
   ============================================================ */
/* ===== Shared core (loaded on every page): helpers, cart state, product cards, customise modal ===== */
const $ = (s, all) => all ? [...document.querySelectorAll(s)] : document.querySelector(s);
const money = n => 'Rs. ' + Math.round(n).toLocaleString('en-PK');
const store = {   // localStorage that never throws (private mode, quota, corrupt JSON)
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } }
};
// el() uses textContent, so customer-typed text is never parsed as HTML
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
const ALL = [...MENU, ...DEALS];
const FEE = 150, DISC_MIN = 3000, MIN_ORDER = 500;
const loadCart = () => { const c = store.get('ss_cart', []); return Array.isArray(c) ? c.filter(i => i && i.qty > 0 && i.unit >= 0 && Array.isArray(i.opts)) : []; };
let cart = loadCart();

function saveCart() { store.set('ss_cart', cart); renderBadge(); if ($('#cartPage')) renderCartPage(); }
function renderBadge() { const n = cart.reduce((s, i) => s + i.qty, 0); $('#count') && ($('#count').textContent = n); }
addEventListener('storage', e => { if (e.key === 'ss_cart') { cart = loadCart(); renderBadge(); if ($('#cartPage')) renderCartPage(); } }); // other tab changed the cart

function toast(msg) {
  let t = $('#toast'); if (!t) { t = el('div', 'toast'); t.id = 't'; t.id = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); }
  t.textContent = msg; t.classList.add('show'); clearTimeout(toast.id); toast.id = setTimeout(() => t.classList.remove('show'), 2200);
}
function pic(item, cls) {   // photo with graceful fallback if the URL fails
  const f = el('figure', cls); f.dataset.n = item.name;
  const i = new Image(); i.loading = 'lazy'; i.alt = 'Photo of ' + item.name; i.src = item.img;
  i.onerror = () => { f.classList.add('noimg'); i.remove(); }; f.append(i); return f;
}
const totals = () => {
  const sub = cart.reduce((s, i) => s + i.unit * i.qty, 0), disc = sub >= DISC_MIN ? Math.round(sub * 0.1) : 0, fee = sub ? FEE : 0;
  return { sub, disc, fee, total: sub - disc + fee };
};
function fillSum(box, t) {
  const row = (a, b, c) => { const d = el('div', c); d.append(el('span', null, a), el('span', null, b)); return d; };
  box.replaceChildren(row('Subtotal', money(t.sub)), row('Delivery fee', money(t.fee)));
  if (t.disc) box.append(row('Discount (10%)', '- ' + money(t.disc), 'dc'));
  else if (t.sub) box.append(el('small', null, `Add ${money(DISC_MIN - t.sub)} more to get 10% off`));
  box.append(row('Total', money(t.total), 'tot'));
}
const itemLines = items => {
  const ul = el('ul');
  items.forEach(i => {
    const li = el('li', null, `${i.qty} x ${i.name} - ${money(i.unit * i.qty)}`);
    if (i.opts.length) li.append(el('small', null, i.opts.join(' | '))); if (i.note) li.append(el('small', null, 'Note: ' + i.note)); ul.append(li);
  });
  return ul;
};

/* ---------- Product card (menu, offers, home) ---------- */
function dishCard(m) {
  const c = el('article', 'dish'), f = pic(m), b = el('div', 'dbody'), price = el('div', 'pr'), btns = el('div', 'btns');
  const tag = m.orig ? Math.round((m.orig - m.price) / m.orig * 100) + '% OFF' : m.badge; if (tag) f.append(el('span', 'badge', tag));
  if (m.orig) price.append(el('s', null, money(m.orig)));
  price.append(el('b', null, (m.cat === 'pizzas' ? 'From ' : '') + money(m.price)));
  const cu = el('button', 'btn btn-ghost sm', 'Customize'), ad = el('button', 'btn btn-glow sm', 'Add to Cart');
  cu.dataset.open = m.id; ad.dataset.add = m.id; btns.append(cu, ad);
  b.append(el('h3', null, m.name), el('p', null, m.desc));
  if (m.orig) b.append(el('small', 'save', 'You save ' + money(m.orig - m.price)));
  b.append(el('small', 'prep', 'Ready in about ' + PREP[m.cat] + ' min'), price, btns); c.append(f, b); return c;
}

/* ---------- Add to cart ---------- */
const groupsFor = m => (OPTS[m.cat] || []).filter(g => !(g.k === 'Meat' && /chicken|zinger/i.test(m.name)) && !(g.k === 'Add-ons' && m.cat === 'drinks' && !/shake/i.test(m.name)));
function addItem(m, opts, extra, note, qty) {
  const key = [m.id, opts.join('|'), note].join('#');   // same configuration => same key => merged
  const same = cart.find(i => i.key === key);
  if (same) same.qty = Math.min(50, same.qty + qty); else cart.push({ key, id: m.id, name: m.name, img: m.img, unit: m.price + extra, qty, opts, note });
  saveCart(); toast('Added to your cart!');
  const c = $('.cart'); if (c) { c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); }
}
function quickAdd(m) {   // default options (first choice of each pick-one group)
  let extra = 0; const opts = [];
  groupsFor(m).forEach(g => { if (g.t === 'r') { opts.push(g.k + ': ' + g.o[0][0]); extra += g.o[0][1]; } });
  addItem(m, opts, extra, '', 1);
}
document.addEventListener('click', e => {   // one delegated listener for all product buttons
  const o = e.target.closest('[data-open]'); if (o) openItem(o.dataset.open);
  const a = e.target.closest('[data-add]'); if (a) { const m = ALL.find(x => x.id === a.dataset.add); if (m) quickAdd(m); }
});

/* ---------- Customise modal with live price ---------- */
let dlg, form, cur;
function ensureDlg() {
  if (dlg) return;
  dlg = el('dialog'); dlg.setAttribute('aria-labelledby', 'itemName');
  dlg.innerHTML = `<form id="itemForm" class="form" novalidate><div id="itemPic" class="mpic"></div><button type="button" class="x" id="itemX" aria-label="Close">&#10005;</button>
    <h3 id="itemName"></h3><p id="itemDesc"></p><div id="itemOpts"></div>
    <label>Special instructions<textarea name="note" rows="2" maxlength="200" placeholder="e.g. no mayo, cut in half"></textarea></label>
    <div class="qtyrow"><div class="qty"><button type="button" id="qMinus" aria-label="Decrease quantity">&minus;</button><span id="q">1</span><button type="button" id="qPlus" aria-label="Increase quantity">+</button></div><small id="itemCalc"></small></div>
    <button class="btn btn-glow" type="submit">Add to cart &middot; <span id="itemTotal"></span></button></form>`;   // static markup only, no user text
  document.body.append(dlg); form = $('#itemForm');
  form.addEventListener('change', calc);
  $('#qMinus').onclick = () => { cur.qty = Math.max(1, cur.qty - 1); calc(); };
  $('#qPlus').onclick = () => { cur.qty = Math.min(20, cur.qty + 1); calc(); };
  $('#itemX').onclick = () => dlg.close();
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  form.addEventListener('submit', e => {
    e.preventDefault(); const { opts, extra } = picked();
    addItem(cur.m, opts, extra, form.elements.note.value.trim().slice(0, 200), cur.qty); dlg.close();
  });
}
function openItem(id) {
  const m = ALL.find(x => x.id === id); if (!m) return; ensureDlg(); cur = { m, qty: 1 };
  $('#itemName').textContent = m.name; $('#itemDesc').textContent = m.desc; $('#itemPic').replaceChildren(pic(m));
  const box = $('#itemOpts'); box.replaceChildren();
  groupsFor(m).forEach(g => {
    const fs = el('fieldset'); fs.append(el('legend', null, g.k + (g.t === 'c' ? ' (optional)' : '')));
    g.o.forEach(([label, price], i) => {
      const l = el('label', 'opt'), inp = el('input'); inp.type = g.t === 'r' ? 'radio' : 'checkbox'; inp.name = g.k; inp.value = label; inp.dataset.p = price;
      if (g.t === 'r' && i === 0) inp.checked = true; l.append(inp, el('span', null, label), el('em', null, price ? '+' + money(price) : '')); fs.append(l);
    }); box.append(fs);
  });
  form.elements.note.value = ''; calc(); dlg.showModal();
}
function picked() {
  const opts = []; let extra = 0;
  form.querySelectorAll('#itemOpts input:checked').forEach(i => { extra += +i.dataset.p; opts.push(i.type === 'radio' ? `${i.name}: ${i.value}` : (i.name === 'Remove' ? 'No ' : '+ ') + i.value); });
  return { opts, extra };
}
function calc() {
  const { extra } = picked(); $('#q').textContent = cur.qty;
  $('#itemCalc').textContent = `${money(cur.m.price)} + ${money(extra)} options x ${cur.qty}`;
  $('#itemTotal').textContent = money((cur.m.price + extra) * cur.qty);
}

/* ---------- Cart page (cart.html) ---------- */
function renderCartPage() {
  const n = cart.length; $('#cartEmpty').hidden = n > 0; $('#cartSide').hidden = n === 0; $('#cartList').hidden = n === 0;
  const btn = (txt, label, fn) => { const b = el('button', null, txt); b.type = 'button'; b.setAttribute('aria-label', label); b.onclick = fn; return b; };
  $('#cartList').replaceChildren(...cart.map((it, idx) => {
    const li = el('li', 'crow'), info = el('div'); info.append(el('b', null, it.name));
    if (it.opts.length) info.append(el('small', null, it.opts.join(' | '))); if (it.note) info.append(el('small', 'note', 'Note: ' + it.note));
    info.append(el('span', null, money(it.unit) + ' each'));
    const q = el('div', 'qty'); q.append(btn('-', 'Decrease quantity', () => { it.qty--; if (it.qty < 1) cart.splice(idx, 1); saveCart(); }), el('span', null, it.qty),
      btn('+', 'Increase quantity', () => { it.qty = Math.min(50, it.qty + 1); saveCart(); }));
    const rm = btn('\u2715', 'Remove ' + it.name, () => { cart.splice(idx, 1); saveCart(); }); rm.className = 'rm';
    li.append(pic(it, 'cthumb'), info, q, rm, el('b', 'line', money(it.unit * it.qty))); return li;
  }));
  const t = totals(); fillSum($('#cartSum'), t);
  const ok = t.sub >= MIN_ORDER, go = $('#goCheckout'); go.classList.toggle('disabled', !ok); go.setAttribute('aria-disabled', !ok);
  $('#minMsg').textContent = ok ? '' : `Minimum order is ${money(MIN_ORDER)}. Add ${money(MIN_ORDER - t.sub)} more.`;
}
if ($('#cartPage')) {
  $('#clearCart').onclick = () => { if (confirm('Remove all items from your cart?')) { cart = []; saveCart(); } };
  $('#goCheckout').addEventListener('click', e => { if (e.currentTarget.classList.contains('disabled')) e.preventDefault(); });
  renderCartPage();
}
renderBadge();

/* Filter chips used by menu, offers and orders pages */
function chipRow(box, list, onPick, active) {
  box.replaceChildren(...list.map(([k, label]) => {
    const b = el('button', k === active ? 'on' : '', label); b.type = 'button'; b.dataset.k = k;
    b.setAttribute('aria-pressed', k === active); return b;
  }));
  box.onclick = e => {
    const b = e.target.closest('button'); if (!b) return; box.querySelectorAll('button').forEach(x => { x.classList.remove('on'); x.setAttribute('aria-pressed', false); });
    b.classList.add('on'); b.setAttribute('aria-pressed', true); onPick(b.dataset.k);
  };
}


/* ============================================================
   3. NAVBAR, REVEAL, FOOTER, HERO EFFECTS, CONTACT FORM
   ============================================================ */
/* ===== Shared page behaviour: navbar, reveal, footer, hero effects, contact form ===== */
// Mobile menu: opens/closes on click, closes on link click, outside click and Escape
(function () {
  const nav = $('#nav'), btn = $('#toggle'), links = $('#links'), scrim = $('#navscrim');
  const set = open => {
    links.classList.toggle('open', open); scrim.classList.toggle('open', open); btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); document.body.classList.toggle('lock', open);
  };
  btn.addEventListener('click', () => set(!links.classList.contains('open')));
  links.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
  scrim.addEventListener('click', () => set(false));
  addEventListener('keydown', e => { if (e.key === 'Escape' && links.classList.contains('open')) { set(false); btn.focus(); } });
  addEventListener('resize', () => { if (innerWidth > 860) set(false); });
  const onScroll = () => { nav.classList.toggle('solid', scrollY > 50); $('#totop').classList.toggle('show', scrollY > 600); };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  $('#totop').onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
})();

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); } }), { threshold: .15 });
$('.reveal', true).forEach(x => io.observe(x));

// Footer + map + images from the settings in data.js
$('[data-site]', true).forEach(n => { n.textContent = SITE[n.dataset.site]; });
$('[data-social]', true).forEach(n => { n.replaceChildren(...Object.entries(SITE.social).map(([k, u]) => { const a = el('a', null, k); a.href = u; a.target = '_blank'; a.rel = 'noopener'; return a; })); });
$('.mapFrame', true).forEach(f => { f.src = 'https://www.google.com/maps?q=' + encodeURIComponent(SITE.mapQuery) + '&output=embed'; });
$('.dirLink', true).forEach(a => { a.href = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(SITE.mapQuery); a.target = '_blank'; a.rel = 'noopener'; });
$('img[data-ph]', true).forEach(i => { i.src = PH[i.dataset.ph]; i.onerror = () => { i.hidden = true; }; });

// Contact form (demo: validates, shows success, sends nowhere)
const cf = $('#contactForm');
if (cf) cf.addEventListener('submit', e => {
  e.preventDefault(); let bad = null;
  const r = { name: v => v.trim().length >= 2 || 'Please enter your name.', email: v => /^\S+@\S+\.\S+$/.test(v) || 'Enter a valid email address.', message: v => v.trim().length >= 10 || 'Message must be at least 10 characters.' };
  for (const f in r) { const x = cf.elements[f], k = r[f](x.value); $('#cerr-' + f).textContent = k === true ? '' : k; x.setAttribute('aria-invalid', k !== true); if (k !== true && !bad) bad = x; }
  if (bad) return bad.focus();
  $('#cOk').textContent = 'Thank you, ' + cf.elements.name.value.trim() + '! (Demo form: your message was not sent anywhere.)'; cf.reset();
});

// Hero effects (home page only): floating-ingredient parallax, burger tilt, blob parallax
if ($('.hero')) {
  // 5. Hero parallax: floating items move with the mouse and scroll at different depths
  const hero = $('#home');
  const layers = $('[data-depth]', true);
  let mx = 0, my = 0;
  const move = () => {
    layers.forEach(el => {
      const d = +el.dataset.depth;
      el.style.translate = `${mx * d}px ${my * d + scrollY * d * 0.004}px`;
    });
  };
  // Mouse effects only on devices with a real pointer and when motion is allowed
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mouseOK = matchMedia('(hover: hover)').matches && !calm;
  const stage = $('.stage');
  if (mouseOK) hero.addEventListener('mousemove', e => {
    mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; move();
    stage.style.setProperty('--tx', mx * 2);  // -1 to 1, used by CSS for the burger tilt
    stage.style.setProperty('--ty', my * 2);
  });
  hero.addEventListener('mouseleave', () => { stage.style.setProperty('--tx', 0); stage.style.setProperty('--ty', 0); });
  if (!calm) addEventListener('scroll', move, { passive: true });

  // Parallax for decorative blobs: each moves at its own data-speed while scrolling
  const decos = $('.deco', true);
  let ticking = false;
  if (!calm) addEventListener('scroll', () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {  // one update per frame keeps scrolling smooth
      decos.forEach(d => { const r = d.parentElement.getBoundingClientRect(); d.style.translate = `0 ${(r.top - innerHeight / 2) * d.dataset.speed}px`; });
      ticking = false;
    });
  }, { passive: true });

}


/* ============================================================
   4. MENU PAGE + HOME BEST SELLERS
   ============================================================ */
/* ===== Menu page filters/search/sort, plus home-page best sellers and deal teaser ===== */
(function () {
  const grid = $('#menuGrid');
  if (!grid) {   // home page
    const best = $('#bestGrid'), deals = $('#dealGrid');
    if (best) best.replaceChildren(...MENU.filter(m => m.badge === 'Best Seller').slice(0, 6).map(dishCard));
    if (deals) deals.replaceChildren(...DEALS.slice(0, 3).map(dishCard));
    return;
  }
  const v = { cat: new URLSearchParams(location.search).get('cat') || 'all', q: '', sort: 'feat' };
  if (v.cat !== 'all' && v.cat !== 'best' && !CATS.some(c => c[0] === v.cat)) v.cat = 'all';
  function render() {
    const list = MENU.filter(m => (v.cat === 'all' || (v.cat === 'best' ? m.badge === 'Best Seller' : m.cat === v.cat)) && (m.name + ' ' + m.desc).toLowerCase().includes(v.q));
    if (v.sort === 'lo') list.sort((a, b) => a.price - b.price); if (v.sort === 'hi') list.sort((a, b) => b.price - a.price);
    if (v.sort === 'pop') list.sort((a, b) => (BR[b.badge] || 0) - (BR[a.badge] || 0)); if (v.sort === 'az') list.sort((a, b) => a.name.localeCompare(b.name));
    grid.replaceChildren(...list.map(dishCard)); $('#noResults').hidden = list.length > 0; $('#resultCount').textContent = list.length + ' items';
  }
  chipRow($('#chips'), [['all', 'All'], ['best', 'Best Sellers'], ...CATS], k => { v.cat = k; render(); }, v.cat);
  $('#sugg').replaceChildren(...MENU.map(m => { const o = el('option'); o.value = m.name; return o; }));   // search suggestions
  $('#search').addEventListener('input', e => { v.q = e.target.value.trim().toLowerCase(); render(); });
  $('#sort').addEventListener('change', e => { v.sort = e.target.value; render(); });
  render();
})();


/* ============================================================
   5. OFFERS PAGE
   ============================================================ */
/* ===== Offers page: deal filters ===== */
(function () {
  const grid = $('#dealGrid'); if (!grid || !$('#dealChips')) return;
  const draw = k => grid.replaceChildren(...DEALS.filter(d => k === 'all' || d.sub === k).map(dishCard));
  chipRow($('#dealChips'), [['all', 'All Deals'], ...DEAL_CATS], draw, 'all'); draw('all');
})();


/* ============================================================
   6. CHECKOUT PAGE
   ============================================================ */
/* ===== Checkout page: validation, order creation, confirmation ===== */
(function () {
  const form = $('#coForm'); if (!form) return;
  if (!cart.length) { $('#coMain').hidden = true; $('#coEmpty').hidden = false; return; }
  const t = totals(); $('#coItems').replaceChildren(itemLines(cart)); fillSum($('#coSum'), t);
  const rules = {
    name: v => v.trim().length >= 3 || 'Please enter your full name.',
    phone: v => /^(\+?92|0)?3\d{9}$/.test(v.replace(/[\s-]/g, '')) || 'Enter a valid mobile number, e.g. 0300 1234567.',
    email: v => !v.trim() || /^\S+@\S+\.\S+$/.test(v) || 'Enter a valid email or leave it empty.',
    address: v => v.trim().length >= 8 || 'Please enter your full delivery address.',
    area: v => v.trim().length >= 2 || 'Please enter your area.'
  };
  form.addEventListener('submit', e => {
    e.preventDefault(); let first = null;
    for (const f in rules) { const inp = form.elements[f], r = rules[f](inp.value); $('#err-' + f).textContent = r === true ? '' : r; inp.setAttribute('aria-invalid', r !== true); if (r !== true && !first) first = inp; }
    if (first) return first.focus();
    if (t.sub < MIN_ORDER) return toast(`Minimum order is ${money(MIN_ORDER)}`);
    const d = Object.fromEntries(new FormData(form)), seq = store.get('ss_seq', 1024) + 1; store.set('ss_seq', seq);
    const o = {
      id: 'SS' + seq, at: Date.now(), eta: SITE.eta, ...t, cancelled: false, pay: d.pay, name: d.name.trim(), phone: d.phone.trim(),
      address: d.address.trim() + ', ' + d.area.trim(), instr: (d.instr || '').trim(),
      items: cart.map(({ name, qty, unit, opts, note }) => ({ name, qty, unit, opts, note }))
    };
    const orders = store.get('ss_orders', []); orders.unshift(o); store.set('ss_orders', Array.isArray(orders) ? orders : [o]);
    cart = []; saveCart(); done(o);
  });
  function done(o) {
    const box = $('#coDone'), sum = el('div', 'sum'); fillSum(sum, o);
    const a1 = el('a', 'btn btn-glow', 'Track my order'), a2 = el('a', 'btn btn-ghost', 'Back to menu'); a1.href = 'my-orders.html'; a2.href = 'menu.html';
    box.replaceChildren(el('div', 'okmark', '\u2705'), el('h2', 'title', 'Order placed (demo)'), el('div', 'oid', o.id), itemLines(o.items), sum,
      el('p', null, 'Payment: ' + o.pay), el('p', null, 'Deliver to: ' + o.address),
      el('p', 'demo', 'Frontend demo: this order is saved in your browser only. No restaurant was contacted and no delivery is scheduled.'),
      Object.assign(el('div', 'cta'), {})); box.lastChild.append(a1, a2); $('#coMain').hidden = true; box.hidden = false; scrollTo(0, 0);
  }
})();


/* ============================================================
   7. MY ORDERS PAGE
   ============================================================ */
/* ===== My Orders: history, filters, simulated tracking, cancellation ===== */
(function () {
  const list = $('#orderList'); if (!list) return;
  const STAGES = ['Order Placed', 'Order Confirmed', 'Preparing Your Food', 'Ready for Pickup', 'Out for Delivery', 'Delivered'];
  const AT = [0, .07, .2, .6, .73, 1];   // when each stage starts, as a fraction of the delivery estimate
  let orders = store.get('ss_orders', []); if (!Array.isArray(orders)) orders = [];
  let filter = 'all';
  function info(o) {   // simulated progress from order age (accelerated by SITE.demoSpeed)
    if (o.cancelled) return { st: 'Cancelled', idx: -1 };
    const eta = o.eta || SITE.eta, el_ = (Date.now() - o.at) / 60000 * SITE.demoSpeed;
    let idx = 0; AT.forEach((f, i) => { if (el_ >= f * eta) idx = i; });
    return { st: STAGES[idx], idx, left: Math.max(0, Math.ceil(eta - el_)), eta };
  }
  const kind = i => i.st === 'Cancelled' ? 'cancelled' : i.idx === 5 ? 'delivered' : 'active';
  function render() {
    const open = $('details[open]', true).map(d => d.dataset.id), rows = orders.map(o => ({ o, i: info(o) }));
    const n = k => rows.filter(r => kind(r.i) === k).length;
    $('#stats').replaceChildren(...[['Total orders', rows.length], ['Active', n('active')], ['Delivered', n('delivered')], ['Cancelled', n('cancelled')]]
      .map(([a, b]) => { const d = el('div', 'stat glass'); d.append(el('b', null, b), el('span', null, a)); return d; }));
    const shown = rows.filter(r => filter === 'all' || kind(r.i) === filter);
    if (!shown.length) { const e = el('div', 'empty', rows.length ? 'No orders in this view.' : 'No orders yet. Your demo orders will appear here.'), a = el('a', 'btn btn-glow sm', 'Browse the menu'); a.href = 'menu.html'; e.append(el('br'), a); return list.replaceChildren(e); }
    list.replaceChildren(...shown.map(({ o, i }) => {
      const c = el('article', 'ocard glass'), h = el('div', 'ohead'); h.append(el('b', null, 'Order #' + o.id), el('span', 'pill ' + kind(i), i.st));
      const meta = el('div', 'ometa'); meta.append(el('span', null, new Date(o.at).toLocaleString()), el('span', null, 'Payment: ' + o.pay), el('span', null, 'Total: ' + money(o.total)));
      c.append(h, meta);
      if (i.idx >= 0) {
        const tr = el('ol', 'track'); STAGES.forEach((s, k) => tr.append(el('li', k < i.idx ? 'done' : k === i.idx ? 'now' : '', s)));
        const bar = el('div', 'bar'), fill = el('i'); fill.style.width = (i.idx / 5 * 100) + '%'; bar.append(fill);
        const arr = new Date(o.at + (o.eta || SITE.eta) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        c.append(bar, tr, el('p', 'eta', i.idx === 5 ? 'Delivered (demo)' : `Estimated arrival: ${(o.eta || 30) - 5}-${(o.eta || 30) + 5} minutes (around ${arr}) | about ${i.left} min left`));
      }
      const det = el('details'); det.dataset.id = o.id; if (open.includes(o.id)) det.open = true;
      det.append(el('summary', null, 'View details'), itemLines(o.items), el('p', null, 'Deliver to: ' + (o.address || '-') + (o.instr ? ' (' + o.instr + ')' : '')), el('p', null, `Subtotal ${money(o.sub)} | Delivery ${money(o.fee)} | Discount ${money(o.disc)}`));
      c.append(det);
      if (i.idx >= 0 && i.idx <= 1) {
        const b = el('button', 'btn btn-ghost sm', 'Cancel order');   // only while Placed / Confirmed
        b.onclick = () => { if (confirm('Cancel order #' + o.id + '? (demo)') && !o.cancelled) { o.cancelled = true; store.set('ss_orders', orders); render(); toast('Order cancelled (demo)'); } }; c.append(b);
      }
      return c;
    }));
  }
  chipRow($('#orderChips'), [['all', 'All Orders'], ['active', 'Active'], ['delivered', 'Delivered'], ['cancelled', 'Cancelled']], k => { filter = k; render(); }, 'all');
  render(); setInterval(render, 15000);
})();
