'use strict';

const modal = document.querySelector('.modal');
const modalPrint = document.querySelector('.modal__print');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnLogin = document.querySelector('.btn--show-modal1');
const btnsOpenAccount = document.querySelectorAll('.btn--show-modal2');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const menu = document.querySelector('.nav__links');
const hamburger = document.querySelector('.nav__toggle');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

////////////////////////////////////////
// Hamburger Navbar
const dropdown = () => {
  hamburger.classList.toggle('change');
  menu.classList.toggle('dropdown');
};

hamburger.addEventListener('click', dropdown);
menu.addEventListener('click', dropdown);

///////////////////////////////////////
// Modal window

// Open modal
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Close modal
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Login
btnLogin.addEventListener('click', e => {
  openModal(e);
  modalPrint.innerHTML = `
      <h2 class="modal__header">Already have an account? Please log in.</h2>
      <form class="modal__form">
        <label>Username</label>
        <input type="text" placeholder="User" class="login__input--user"/>
        <label>PIN</label>
        <input type="text" placeholder="PIN" maxlength="4" class="login__input--pin"/>
        <button class="btn login__btn" id="login__btn">Login</button>
      </form>
  `;
  const btnLogin2 = document.getElementById('login__btn');
  const inputPin = document.querySelector('.login__input--pin');
  const inputUsername = document.querySelector('.login__input--user');

  btnLogin2.addEventListener('click', e => {
    e.preventDefault();
    const pin = inputPin.value;
    const username = inputUsername.value;

    window.location.href = 'page/app.html?pin=' + pin + '&username=' + username;
  });
});

// Create account
btnsOpenAccount.forEach(btn =>
  btn.addEventListener('click', e => {
    openModal(e);
    modalPrint.innerHTML = `
      <h2 class="modal__header">
        Open your bank account <br />
        in just <span class="highlight">1 minute</span>
      </h2>
      <form class="modal__form">
        <label>First Name</label>
        <input type="text" placeholder="First name" class="create__input--firstName"/>
        <label>Last Name</label>
        <input type="text" placeholder="Last name" class="create__input--lastName"/>
        <label>Username</label>
        <input type="text" placeholder="Username" class="create__input--username"/>
        <label>PIN</label>
        <input type="text" placeholder="Enter four numbers" maxlength="4" class="create__input--pin"/>
        <label>Currency</label>
        <input type="text" placeholder="EUR or USD" class="create__input--currency"/>
        <label>Locale</label>
        <input type="text" placeholder="example en-US" class="create__input--locale"/>
        <button class="btn btn__createAccount">Open Account</button>
      </form>
  `;

    const inputFirstName = document.querySelector('.create__input--firstName');
    const inputLastName = document.querySelector('.create__input--lastName');
    const inputUsername = document.querySelector('.create__input--username');
    const inputPin = document.querySelector('.create__input--pin');
    const inputCurrency = document.querySelector('.create__input--currency');
    const inputLocale = document.querySelector('.create__input--locale');
    const btnCreateAccount = document.querySelector('.btn__createAccount');

    btnCreateAccount.addEventListener('click', e => {
      e.preventDefault();
      const firstName = inputFirstName.value;
      const lastName = inputLastName.value;
      const username = inputUsername.value;
      const pin = inputPin.value;
      const currency = inputCurrency.value;
      const locale = inputLocale.value;

      window.location.href =
        'page/app.html?firstName=' +
        firstName +
        '&lastName=' +
        lastName +
        '&username=' +
        username +
        '&pin=' +
        pin +
        '&currency=' +
        currency +
        '&locale=' +
        locale;
    });
  })
);

// Close modal
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation

menu.addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link--three')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// Slider

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
