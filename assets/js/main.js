/**
 * Template Name: FlexStart - v1.9.0
 * Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  ("use strict");

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach((e) => e.addEventListener(type, listener));
    } else {
      select(el, all).addEventListener(type, listener);
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Spinner
   */

  let loader = select(".loader");
  setTimeout(() => {
    loader.classList.add("d-none");
  }, 2000);

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 10;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
        selectHeader.classList.add("fixed-top");
      } else {
        selectHeader.classList.remove("header-scrolled");
        selectHeader.classList.remove("fixed-top");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#mobileMenu").classList.add("active");
  });

  on("click", ".close-btn", function (e) {
    select(".navbar-mobile").classList.remove("active");
  });

  /**
   * Search Area
   */
  on(
    "click",
    ".search",
    function () {
      select(".search-area").classList.add("search-active");
    },
    true
  );

  on("click", ".search-area .close-btn", function () {
    select(".search-area").classList.remove("search-active");
    console.log("cliked");
  });

  /**
   * hero slider
   */
  let heroSlider = new Swiper(".hero-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "1",
    spaceBetween: 40,
    navigation: {
      nextEl: ".hero .btn-next",
      prevEl: ".hero .btn-prev",
    },
  });

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Clients Slider
   */
  new Swiper(".clients-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80,
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120,
      },
    },
  });

  /**
   * Product isotope and filter
   */
  window.addEventListener("load", () => {
    let productSliderContainer = select(".product-slider");
    if (productSliderContainer) {
      // let portfolioIsotope = new Isotope(productSliderContainer, {
      //   itemSelector: ".product-item",
      //   layoutMode: "fitRows",
      // });

      let portfolioFilters = select("#product-filter li", true);

      on(
        "click",
        "#product-filter li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          aos_init();
        },
        true
      );
    }
  });

  /**
   * product details slider
   */
  new Swiper(".product-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40,
      },

      991: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 3,
      },
      540: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 5,
      },
    },
  });
  /**
   * timer countdown slider
   */

  function bannerCountDown() {
    let countDown = new Date(
      Date.parse(select(".time-countdown").getAttribute("data-countdown"))
    );
    let countDownFunc = setInterval(function () {
      let currentDate = new Date().getTime();
      let timeLeft = countDown - currentDate;
      // calcue
      let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      if (timeLeft > 0) {
        select(".day").innerHTML = days;
        select(".hours").innerHTML = hours;
        select(".minutes").innerHTML = minutes;
        select(".seconds").innerHTML = seconds;
      } else {
        select(".day").innerHTML = 0;
        select(".hours").innerHTML = 0;
        select(".minutes").innerHTML = 0;
        select(".seconds").innerHTML = 0;
      }
    }, 1000);
    console.log(countDown);
  }

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40,
      },

      1200: {
        slidesPerView: 3,
      },
    },
  });

  /**
   * Animation on scroll
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", () => {
    aos_init();
    bannerCountDown();
  });
})();
