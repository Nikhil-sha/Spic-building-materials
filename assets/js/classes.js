import EmblaCarousel from './libs/embla/embla-carousel.esm.js';
import { addPrevNextBtnsClickHandlers } from './libs/embla/EmblaCarouselArrowButtons.js';
import { addDotBtnsAndClickHandlers } from './libs/embla/EmblaCarouselDotButton.js';


class Toggler {
  constructor(selector, { show, hide, states }) {
    this.element = document.getElementById(selector);
    this.showClasses = [].concat(show);
    this.hideClasses = [].concat(hide);
    this.states = states;
    this.state = "idle";
  }
  
  show() {
    if (this.hideClasses.every(cls => this.element.classList.contains(cls))) {
      this.element.classList.replace(...this.hideClasses, ...this.showClasses);
      this.state = this.states.show;
    }
  }
  
  hide() {
    if (this.showClasses.every(cls => this.element.classList.contains(cls))) {
      this.element.classList.replace(...this.showClasses, ...this.hideClasses);
      this.state = this.states.hide;
    }
  }
}


class Popup {
  constructor({ title, iconClass, contentHTML, actions }) {
    const template = document.getElementById('popup_template');
    const clone = template.content.cloneNode(true);
    this.dialog = clone.querySelector('dialog');
    this.form = clone.querySelector('form');
    this.titleEl = clone.querySelector('.popup_title');
    this.iconEl = clone.querySelector('.popup_icon');
    this.contentEl = clone.querySelector('.popup_content');
    this.actionsEl = clone.querySelector('.popup_actions');
    
    this.titleEl.textContent = title || 'Popup';
    if (iconClass) this.iconEl.className = `popup_icon ${iconClass}`;
    this.contentEl.innerHTML = contentHTML || '';
    
    this.actionsEl.innerHTML = '';
    if (Array.isArray(actions)) {
      actions.forEach(({ label, class: className, value }) => {
        const button = document.createElement('button');
        button.type = 'submit';
        button.value = value;
        button.innerHTML = label;
        button.className = className;
        this.actionsEl.appendChild(button);
      });
    }
    
    document.body.appendChild(this.dialog);
    
    this.dialog.addEventListener('close', () => {
      document.body.style.overflow = 'auto';
      this._onClose && this._onClose(this.dialog.returnValue);
      this.dialog.remove();
    });
  }
  
  show() {
    this.dialog.showModal();
    document.body.style.overflow = 'hidden';
  }
  
  onClose(callback) {
    this._onClose = callback;
  }
}


class CanvasCarousel {
  constructor(canvas, imageUrls) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.imageUrls = imageUrls;
    this.images = [];
    this.currentIndex = 0;
    this.nextIndex = 1;
    this.opacity = 0;
    this.fadeSpeed = 0.06;
    this.interval = 2500;
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;
    
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    this.loadImages();
    
    window.addEventListener("resize", () => {
      this.width = canvas.clientWidth;
      this.height = canvas.clientHeight;
      canvas.width = this.width;
      canvas.height = this.height;
    });
  }
  
  loadImages() {
    let loaded = 0;
    this.imageUrls.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        this.images[i] = img;
        loaded++;
        if (loaded === this.imageUrls.length) {
          this.start();
        }
      };
    });
  }
  
  start() {
    this.loop();
    setInterval(() => this.prepareNextImage(), this.interval);
  }
  
  prepareNextImage() {
    this.currentIndex = this.nextIndex;
    this.nextIndex = (this.nextIndex + 1) % this.images.length;
    this.opacity = 0;
  }
  
  drawCoverImage(img) {
    const imgRatio = img.width / img.height;
    const canvasRatio = this.width / this.height;
    
    let drawWidth, drawHeight;
    
    if (imgRatio > canvasRatio) {
      drawHeight = this.height;
      drawWidth = img.width * (this.height / img.height);
    } else {
      drawWidth = this.width;
      drawHeight = img.height * (this.width / img.width);
    }
    
    const offsetX = (this.width - drawWidth) / 2;
    const offsetY = (this.height - drawHeight) / 2;
    
    this.ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }
  
  loop() {
    requestAnimationFrame(() => this.loop());
    
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    if (this.opacity < 1) {
      this.ctx.globalAlpha = 1;
      this.drawCoverImage(this.images[this.currentIndex]);
      
      this.ctx.globalAlpha = this.opacity;
      this.drawCoverImage(this.images[this.nextIndex]);
      
      this.opacity += this.fadeSpeed;
    } else {
      this.ctx.globalAlpha = 1;
      this.drawCoverImage(this.images[this.nextIndex]);
    }
  }
}


class EmblaCarouselComponent {
  constructor(node, options = {}) {
    this.node = node;
    this.options = {
      loop: true,
      speed: 15,
      autoplayInterval: 2000,
      ...options
    };
    
    this.emblaApi = null;
    this.cleanupFunctions = [];
    
    this.init();
  }
  
  init() {
    const viewportNode = this.node.querySelector('._carousel_viewport');
    const prevBtnNode = this.node.querySelector('._carousel_btn_prev');
    const nextBtnNode = this.node.querySelector('._carousel_btn_next');
    const dotsNode = this.node.querySelector('._carousel_dots');
    
    if (!viewportNode) return;
    
    this.emblaApi = EmblaCarousel(viewportNode, {
      loop: this.options.loop,
      speed: this.options.speed
    });
    
    if (prevBtnNode && nextBtnNode) {
      const removePrevNextHandlers = addPrevNextBtnsClickHandlers(
        this.emblaApi, prevBtnNode, nextBtnNode
      );
      this.cleanupFunctions.push(removePrevNextHandlers);
    }
    
    if (dotsNode) {
      const removeDotHandlers = addDotBtnsAndClickHandlers(
        this.emblaApi, dotsNode
      );
      this.cleanupFunctions.push(removeDotHandlers);
    }
    
    if (this.options.autoplay) {
      const cleanupAutoplay = this.setupAutoplay(this.options.autoplayInterval);
      this.cleanupFunctions.push(cleanupAutoplay);
    }
    
    this.emblaApi.on('destroy', () => {
      this.cleanupFunctions.forEach(cleanup => cleanup());
      this.cleanupFunctions = [];
    });
  }
  
  setupAutoplay(interval = 3000) {
    if (!this.emblaApi) return () => {};
    
    let timer = 0;
    
    const play = () => {
      this.emblaApi.canScrollNext() ?
        this.emblaApi.scrollNext() :
        this.emblaApi.scrollTo(0);
    };
    
    const start = () => {
      if (!timer) timer = setInterval(play, interval);
    };
    
    const stop = () => {
      clearInterval(timer);
      timer = 0;
    };
    
    start();
    
    const eventListeners = [
      { event: 'mouseenter', handler: stop },
      { event: 'mouseleave', handler: start },
      { event: 'focusin', handler: stop },
      { event: 'focusout', handler: start }
    ];
    
    eventListeners.forEach(({ event, handler }) => {
      this.node.addEventListener(event, handler);
    });
    
    return () => {
      stop();
      eventListeners.forEach(({ event, handler }) => {
        this.node.removeEventListener(event, handler);
      });
    };
  }
  
  destroy() {
    if (this.emblaApi) {
      this.emblaApi.destroy();
    }
  }
}


class DeckCarousel {
  constructor(container, nodes, interval = 5000) {
    this.container = container;
    this.nodes = nodes;
    this.interval = interval;
    this.timer = null;
    this.currentIndex = 0;
    this.slides = [];
    
    this.init();
  }
  
  init() {
    this.container.innerHTML = "";
    
    this.nodes.forEach((node, i) => {
      node.classList.add("testimonial-card");
      if (i === 0) {
        node.classList.add("z-[2]");
      } else {
        node.classList.add("z-[1]", "transform", "scale-[0.5]", "translate-y-[12px]");
      }
      this.container.appendChild(node);
      this.slides.push(node);
    });
    
    this.updateContainerHeight();
    this.start();
  }
  
  start() {
    this.stop();
    this.timer = setInterval(() => this.next(), this.interval);
  }
  
  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }
  
  next() {
    const current = this.slides[this.currentIndex];
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    const next = this.slides[nextIndex];
    
    current.classList.remove("z-[2]");
    current.classList.add("z-[3]", "opacity-0", "transform", "rotate-45", "translate-x-[120%]", "scale-[1.1]");
    
    next.classList.remove("z-[1]", "transform", "scale-[0.5]", "translate-y-[12px]");
    next.classList.add("z-[2]");
    
    setTimeout(() => {
      current.classList.remove("z-[3]", "opacity-0", "transform", "rotate-45", "translate-x-[120%]", "scale-[1.1]");
      current.classList.add("z-[1]", "transform", "scale-[0.5]", "translate-y-[12px]");
    }, 1100);
    
    this.currentIndex = nextIndex;
    this.updateContainerHeight();
  }
  
  updateContainerHeight() {
    const active = this.slides[this.currentIndex];
    requestAnimationFrame(() => {
      this.container.style.height = active.offsetHeight + "px";
    });
  }
}


class HashRouter {
  constructor({ offset = 0, callback = null } = {}) {
    this.offset = offset;
    this.callback = callback;
    
    this._bindLinks();
    window.addEventListener('hashchange', () => this._scrollToHash());
    window.addEventListener('DOMContentLoaded', () => {
      this._scrollToHash();
    });
  }
  
  _bindLinks() {
    document.querySelectorAll('[data-route]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const hash = anchor.getAttribute('data-route');
        if (hash) {
          e.preventDefault();
          location.hash = `/${hash}`;
          this._scrollToElement(hash);
        }
      });
    });
  }
  
  _scrollToHash() {
    const hash = window.location.hash.replace("#/", "");
    if (hash && document.getElementById(hash)) {
      this._scrollToElement(hash);
      if (this.callback && typeof this.callback === "function") {
        this.callback();
      }
    }
  }
  
  _scrollToElement(selector) {
    const target = document.getElementById(selector);
    if (!target) return;
    
    const top = target.getBoundingClientRect().top + window.scrollY - this.offset;
    
    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  }
}


class Toast {
  static icons = {
    success: 'ri-check-line',
    error: 'ri-close-line',
    info: 'ri-information-line',
    warning: 'ri-error-warning-line'
  };
  
  static colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  };
  
  constructor(type, message, duration = 4000) {
    this.type = type;
    this.message = message;
    this.duration = duration;
    
    const template = document.getElementById('toast_template');
    const clone = template.content.cloneNode(true).firstElementChild;
    
    this.toast = clone;
    this.icon = this.toast.querySelector('.toast_icon i');
    this.messageEl = this.toast.querySelector('.toast_message');
    this.closeBtn = this.toast.querySelector('.toast_close');
    this.progressBar = this.toast.querySelector('.toast_progress_bar');
  }
  
  create() {
    // Set text and icon
    this.messageEl.textContent = this.message;
    this.icon.classList.add(Toast.icons[this.type]);
    this.toast.querySelector('.toast_icon').classList.add(Toast.colors[this.type]);
    
    // Add to DOM
    document.getElementById('toast_container').appendChild(this.toast);
    
    // Set animation
    this.progressBar.style.animationDuration = `${this.duration}ms`;
    
    // Close handler
    this.closeBtn.addEventListener('click', () => this.close());
    
    // Trigger animations
    setTimeout(() => {
      this.toast.classList.remove('translate-x-full', 'opacity-0');
      this.toast.classList.add('translate-x-0', 'opacity-100');
    }, 5);
    
    // Auto-close
    this.timeout = setTimeout(() => this.close(), this.duration);
  }
  
  close() {
    this.toast.classList.remove('translate-x-0', 'opacity-1');
    this.toast.classList.add('translate-x-full', 'opacity-0');
    
    setTimeout(() => this.toast.remove(), 505);
    
    if (this.timeout) clearTimeout(this.timeout);
  }
}


class ContactForm {
  constructor(formId, resultId, endpoint, headers, additional = {}) {
    this.form = document.getElementById(formId);
    this.result = document.getElementById(resultId);
    this.endpoint = endpoint;
    this.headers = headers;
    this.additional = additional;
    
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submit();
    });
  }
  
  extractData() {
    const data = {};
    new FormData(this.form).forEach((value, key) => {
      data[key] = value;
    });
    return {
      ...data,
      ...this.additional
    };
  }
  
  reset() {
    this.form.reset();
    this.result.innerText = "Form has been reset.";
  }
  
  async submit() {
    const data = this.extractData();
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data)
      });
      const resultData = await response.json();
      this.result.innerText = `Success: ${JSON.stringify(resultData)}`;
    } catch (error) {
      this.result.innerText = `Error: ${error.message}`;
    }
  }
}


export {
  Toast,
  Popup,
  Toggler,
  HashRouter,
  ContactForm,
  DeckCarousel,
  CanvasCarousel,
  EmblaCarouselComponent
};