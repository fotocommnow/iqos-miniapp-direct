/**
 * IQOS Telegram Mini App
 * Official Brand Experience & Smart Bot Gateway
 */

// Initialize Telegram WebApp SDK if available
const tg = window.Telegram ? window.Telegram.WebApp : null;

if (tg) {
  try {
    tg.ready();
    tg.expand();
    tg.setHeaderColor('#0a0c10');
    tg.setBackgroundColor('#0a0c10');
  } catch (e) {
    console.warn('Telegram SDK initialization:', e);
  }
}

// 1. DYNAMIC HD VIDEO / VISUAL PARTICLE CANVAS GENERATOR FOR 10-SEC INTRO
class SplashVideoCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.lasers = [];
    this.width = (this.canvas.width = window.innerWidth);
    this.height = (this.canvas.height = window.innerHeight);
    this.animationFrame = null;
    this.startTime = Date.now();
    this.duration = 10000; // 10 seconds

    this.init();
    this.animate();
  }

  init() {
    // Generate luxury luminous vapor particles
    for (let i = 0; i < 70; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        r: Math.random() * 4 + 1.5,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 1.5 - 0.5,
        alpha: Math.random() * 0.6 + 0.2,
        hue: Math.random() > 0.4 ? 190 : 38 // IQOS Cyan & Bronze
      });
    }

    // Induction laser rays
    for (let j = 0; j < 5; j++) {
      this.lasers.push({
        y: Math.random() * this.height,
        speed: Math.random() * 2 + 1,
        width: Math.random() * 3 + 1,
        opacity: Math.random() * 0.7 + 0.3
      });
    }
  }

  animate() {
    const elapsed = Date.now() - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    
    // Update progress bar & countdown timer
    const progressBar = document.getElementById('splashProgress');
    const timerLabel = document.getElementById('splashTimer');
    if (progressBar) progressBar.style.width = `${progress * 100}%`;
    if (timerLabel) {
      const remaining = Math.max(0, Math.ceil((this.duration - elapsed) / 1000));
      timerLabel.innerHTML = `HQ INTRO &bull; 00:0${remaining}`;
    }

    // Clear and draw gradient motion
    this.ctx.fillStyle = 'rgba(5, 7, 11, 0.25)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Dynamic central induction energy rings
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const pulse = Math.sin(elapsed * 0.004) * 35;

    const ringGrad = this.ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 180 + pulse);
    ringGrad.addColorStop(0, 'rgba(0, 210, 255, 0.25)');
    ringGrad.addColorStop(0.5, 'rgba(0, 210, 255, 0.05)');
    ringGrad.addColorStop(1, 'transparent');
    
    this.ctx.fillStyle = ringGrad;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, 200 + pulse, 0, Math.PI * 2);
    this.ctx.fill();

    // Render Laser Scanlines
    this.lasers.forEach(laser => {
      laser.y += laser.speed;
      if (laser.y > this.height) laser.y = -20;

      const grad = this.ctx.createLinearGradient(0, laser.y, this.width, laser.y);
      grad.addColorStop(0, 'rgba(0, 210, 255, 0)');
      grad.addColorStop(0.5, `rgba(0, 210, 255, ${laser.opacity})`);
      grad.addColorStop(1, 'rgba(0, 210, 255, 0)');

      this.ctx.fillStyle = grad;
      this.ctx.fillRect(0, laser.y, this.width, laser.width);
    });

    // Render floating vapor particles
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < 0) {
        p.y = this.height + 10;
        p.x = Math.random() * this.width;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.alpha})`;
      this.ctx.shadowBlur = 12;
      this.ctx.shadowColor = `hsla(${p.hue}, 100%, 50%, 0.8)`;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });

    if (elapsed < this.duration) {
      this.animationFrame = requestAnimationFrame(() => this.animate());
    } else {
      app.finishSplash();
    }
  }

  stop() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
  }
}

// 2. PRODUCT REPOSITORY (IQOS OFFICIAL CATALOG)
const IQOS_PRODUCTS = [
  {
    id: 'iluma-prime-bronze',
    name: 'IQOS ILUMA PRIME Bronze',
    category: 'devices',
    tag: 'ФЛАГМАН',
    desc: 'Анодированный титановый корпус, магнитная кожаная обложка. Технология SMARTCORE INDUCTION™.',
    price: 6490,
    img: 'assets/images/iluma_prime.jpg'
  },
  {
    id: 'iluma-one-pebble',
    name: 'IQOS ILUMA ONE Pebble Grey',
    category: 'devices',
    tag: 'ВСЁ В ОДНОМ',
    desc: '20 последовательных сеансов без подзарядки в компактном металлическом моноблоке.',
    price: 3490,
    img: 'assets/images/iluma_one.jpg'
  },
  {
    id: 'terea-amber',
    name: 'TEREA Amber Selection',
    category: 'terea',
    tag: 'ХИТ',
    desc: 'Классический богатый табачный бленд со сбалансированным глубоким ароматом и древесными нотами.',
    price: 240,
    img: 'assets/images/terea_sticks.jpg'
  },
  {
    id: 'terea-turquoise',
    name: 'TEREA Green Zing Selection',
    category: 'terea',
    tag: 'СВЕЖЕСТЬ',
    desc: 'Тонкий табачный бленд с бодрящей ментоловой свежестью и легкими цитрусово-травяными акцентами.',
    price: 240,
    img: 'assets/images/terea_sticks.jpg'
  },
  {
    id: 'terea-mauve',
    name: 'TEREA Mauve Wave',
    category: 'terea',
    tag: 'АРОМАТ',
    desc: 'Свежий лесной бриз, спелая черника и прохладный ментоловый шлейф с деликатным табаком.',
    price: 240,
    img: 'assets/images/terea_sticks.jpg'
  },
  {
    id: 'wrap-leather-emerald',
    name: 'Кожаная накладка ILUMA Prime',
    category: 'accessories',
    tag: 'PREMIUM',
    desc: 'Итальянская фактурная кожа изумрудного оттенка с магнитным фиксатором.',
    price: 1590,
    img: 'assets/images/iluma_prime.jpg'
  }
];

// FLAVOR BLENDS DATABASE FOR QUIZ
const FLAVOR_BLENDS = {
  highTobacco: {
    title: 'TEREA Amber & Bronze Selection',
    desc: 'Насыщенный, плотный и бархатный вкус табака для истинных ценителей классического профиля.'
  },
  freshMenthol: {
    title: 'TEREA Green Zing & Blue Selection',
    desc: 'Интенсивный ледяной ментол с глубоким бодрящим послевкусием.'
  },
  fruityBerry: {
    title: 'TEREA Mauve Wave & Ruby Blend',
    desc: 'Изысканное сочетание спелых лесных ягод, освежающего холодка и мягкого табачного пара.'
  },
  balanced: {
    title: 'TEREA Yellow Selection',
    desc: 'Мягкий, легкий и утонченный табачный бленд с нежными пряными нотами на каждый день.'
  }
};

// 3. MAIN APPLICATION CONTROLLER
class AppController {
  constructor() {
    this.cart = [];
    this.splashPlayer = null;
    this.init();
  }

  init() {
    // Start Splash Canvas Video
    this.splashPlayer = new SplashVideoCanvas('splashCanvas');

    // Skip Splash Button
    const skipBtn = document.getElementById('skipSplashBtn');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => this.finishSplash());
    }

    // Telegram User Info Injection
    this.setupTelegramProfile();

    // Populate Catalog
    this.renderCatalog('all');

    // Setup Category Tabs
    document.querySelectorAll('.cat-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const cat = e.currentTarget.getAttribute('data-category');
        this.renderCatalog(cat);
      });
    });

    // Setup Navigation Tabs
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const targetView = e.currentTarget.getAttribute('data-view');
        this.switchView(targetView);
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.vibrateFeedback('selection');
      });
    });

    // Cart Sheet triggers
    document.getElementById('openCartBtn')?.addEventListener('click', () => this.toggleCart(true));
    document.getElementById('closeCartBtn')?.addEventListener('click', () => this.toggleCart(false));
    document.getElementById('closeCartBackdrop')?.addEventListener('click', () => this.toggleCart(false));
    document.getElementById('sendOrderToBotBtn')?.addEventListener('click', () => this.submitOrderToBot());

    // Setup Flavor Sliders
    this.setupFlavorSliders();
  }

  finishSplash() {
    if (this.splashPlayer) this.splashPlayer.stop();
    const splash = document.getElementById('splashScreen');
    if (splash) {
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.style.display = 'none';
      }, 800);
    }
    this.vibrateFeedback('heavy');
  }

  setupTelegramProfile() {
    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
      const user = tg.initDataUnsafe.user;
      const userNameDisplay = document.getElementById('userNameDisplay');
      const userInitials = document.getElementById('userInitials');

      const name = `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username || 'IQOS Member';
      if (userNameDisplay) userNameDisplay.textContent = name;
      if (userInitials) {
        userInitials.textContent = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'IQ';
      }
    }
  }

  switchTab(tabKey) {
    if (tabKey === 'flavorLab') {
      this.switchView('viewFlavorLab');
      document.querySelectorAll('.nav-item').forEach(b => {
        if (b.getAttribute('data-view') === 'viewFlavorLab') b.classList.add('active');
        else b.classList.remove('active');
      });
    }
  }

  switchView(viewId) {
    document.querySelectorAll('.app-view').forEach(view => {
      view.classList.remove('active');
    });
    const target = document.getElementById(viewId);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  renderCatalog(category) {
    const grid = document.getElementById('catalogGrid');
    if (!grid) return;

    const filtered = category === 'all' 
      ? IQOS_PRODUCTS 
      : IQOS_PRODUCTS.filter(p => p.category === category);

    grid.innerHTML = filtered.map(item => `
      <div class="product-card">
        <div class="product-thumb-wrap">
          <img src="${item.img}" alt="${item.name}" class="product-thumb">
          <span class="prod-tag">${item.tag}</span>
        </div>
        <div class="product-info">
          <h4 class="product-title">${item.name}</h4>
          <p class="product-desc">${item.desc}</p>
          <div class="product-bottom-row">
            <span class="product-price">${item.price.toLocaleString('ru-RU')} ₽</span>
            <button class="btn-add-cart" onclick="app.addToCart('${item.id}')">+</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  addToCart(productId) {
    const prod = IQOS_PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    const existing = this.cart.find(c => c.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({ ...prod, quantity: 1 });
    }

    this.updateCartUI();
    this.vibrateFeedback('medium');
    this.showToast(`«${prod.name}» в корзине`);
  }

  quickOrder(productName, price) {
    this.cart.push({ id: 'quick-order', name: productName, price: price, quantity: 1 });
    this.updateCartUI();
    this.toggleCart(true);
    this.vibrateFeedback('medium');
  }

  removeFromCart(index) {
    this.cart.splice(index, 1);
    this.updateCartUI();
    this.vibrateFeedback('light');
  }

  updateCartUI() {
    const countEl = document.getElementById('cartCount');
    const totalEl = document.getElementById('cartTotalPrice');
    const container = document.getElementById('cartItemsContainer');

    const totalCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (countEl) countEl.textContent = totalCount;
    if (totalEl) totalEl.textContent = `${totalPrice.toLocaleString('ru-RU')} ₽`;

    if (container) {
      if (this.cart.length === 0) {
        container.innerHTML = `
          <div style="text-align: center; color: var(--text-muted); padding: 30px 10px;">
            <p>Ваша корзина пуста</p>
            <span style="font-size: 0.78rem;">Выберите девайсы или стики TEREA в каталоге</span>
          </div>
        `;
      } else {
        container.innerHTML = this.cart.map((item, idx) => `
          <div class="cart-item-row">
            <div>
              <div class="cart-item-title">${item.name}</div>
              <div class="cart-item-price">${item.quantity} x ${item.price} ₽</div>
            </div>
            <button class="cart-item-remove" onclick="app.removeFromCart(${idx})">&times;</button>
          </div>
        `).join('');
      }
    }
  }

  toggleCart(open) {
    const drawer = document.getElementById('cartDrawer');
    if (drawer) {
      if (open) drawer.classList.add('open');
      else drawer.classList.remove('open');
    }
  }

  submitOrderToBot() {
    if (this.cart.length === 0) {
      this.showToast('Добавьте товары в корзину');
      return;
    }

    const totalPrice = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderData = {
      event: 'IQOS_MINIAPP_ORDER',
      total: totalPrice,
      currency: 'RUB',
      items: this.cart.map(i => ({ name: i.name, qty: i.quantity, price: i.price })),
      timestamp: new Date().toISOString()
    };

    if (tg && tg.sendData) {
      // Send directly to Telegram Bot conversation
      this.vibrateFeedback('heavy');
      tg.sendData(JSON.stringify(orderData));
      this.toggleCart(false);
    } else {
      // Browser preview demo mode
      this.showToast('Заказ сформирован! Передан в Telegram-бот.');
      console.log('TG SendData Payload:', orderData);
      setTimeout(() => {
        this.cart = [];
        this.updateCartUI();
        this.toggleCart(false);
      }, 1200);
    }
  }

  // Flavor Quiz Logic
  setupFlavorSliders() {
    const intRange = document.getElementById('intensityRange');
    const menRange = document.getElementById('mentholRange');
    const aroRange = document.getElementById('aromaRange');

    const updateRec = () => {
      const iVal = parseInt(intRange.value);
      const mVal = parseInt(menRange.value);
      const aVal = parseInt(aroRange.value);

      document.getElementById('intensityVal').textContent = `${iVal}/5`;
      document.getElementById('mentholVal').textContent = `${mVal}/5`;
      document.getElementById('aromaVal').textContent = `${aVal}/5`;

      let pick = FLAVOR_BLENDS.balanced;
      if (mVal >= 4) {
        pick = FLAVOR_BLENDS.freshMenthol;
      } else if (aVal >= 3) {
        pick = FLAVOR_BLENDS.fruityBerry;
      } else if (iVal >= 4) {
        pick = FLAVOR_BLENDS.highTobacco;
      }

      document.getElementById('recTitle').textContent = pick.title;
      document.getElementById('recDesc').textContent = pick.desc;
    };

    [intRange, menRange, aroRange].forEach(input => {
      if (input) input.addEventListener('input', updateRec);
    });

    document.getElementById('addRecommendedBtn')?.addEventListener('click', () => {
      const recTitle = document.getElementById('recTitle').textContent;
      this.quickOrder(recTitle, 240);
    });
  }

  // Device actions
  triggerAutoClean() {
    this.showToast('Диагностика индукции: Все 4 сенсора в норме (100%)');
  }

  openReplacementModal() {
    this.showToast('Гарантийный статус активен. Обращение передано оператору.');
  }

  findNearestLounge() {
    this.showToast('Ближайший бутик: ТРЦ Европейский, 1 этаж (240м)');
  }

  claimBonus() {
    this.showToast('1 450 баллов активированы для скидки в боте');
  }

  vibrateFeedback(type = 'light') {
    if (tg && tg.HapticFeedback) {
      if (type === 'light') tg.HapticFeedback.impactOccurred('light');
      if (type === 'medium') tg.HapticFeedback.impactOccurred('medium');
      if (type === 'heavy') tg.HapticFeedback.impactOccurred('heavy');
      if (type === 'selection') tg.HapticFeedback.selectionChanged();
    }
  }

  showToast(msg) {
    const toast = document.getElementById('toastNotification');
    const msgEl = document.getElementById('toastMsg');
    if (!toast || !msgEl) return;

    msgEl.textContent = msg;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 2400);
  }
}

// Instantiate global app instance
const app = new AppController();
