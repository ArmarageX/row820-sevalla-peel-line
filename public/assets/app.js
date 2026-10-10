/* Local navigation only: no fetch, forms, cookies or browser storage. */
(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('#site-nav');
  const guideButton = document.querySelector('.guide-toggle');
  const guidePanel = document.querySelector('#guide-panel');
  if (!menuButton || !siteNav || !guideButton || !guidePanel) return;
  const mobile = window.matchMedia('(max-width: 800px)');
  const closeGuides = () => {
    guideButton.setAttribute('aria-expanded', 'false');
    guidePanel.hidden = !mobile.matches;
  };
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
    closeGuides();
  };
  const syncViewport = () => {
    closeMenu();
    guidePanel.hidden = !mobile.matches;
  };
  menuButton.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(opening));
    siteNav.classList.toggle('is-open', opening);
    closeGuides();
  });
  guideButton.addEventListener('click', () => {
    if (mobile.matches) return;
    const opening = guideButton.getAttribute('aria-expanded') !== 'true';
    guideButton.setAttribute('aria-expanded', String(opening));
    guidePanel.hidden = !opening;
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const wasOpen = mobile.matches
      ? menuButton.getAttribute('aria-expanded') === 'true'
      : guideButton.getAttribute('aria-expanded') === 'true';
    closeMenu();
    if (wasOpen) (mobile.matches ? menuButton : guideButton).focus();
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.guide-dropdown') && !mobile.matches) closeGuides();
    if (mobile.matches && !event.target.closest('.masthead')) closeMenu();
    if (event.target.closest('#site-nav a')) closeMenu();
  });
  siteNav.addEventListener('focusout', event => {
    if (!siteNav.contains(event.relatedTarget) && !mobile.matches) closeGuides();
  });
  mobile.addEventListener('change', syncViewport);
  syncViewport();
  for (const wrapper of document.querySelectorAll('.table-wrap')) {
    wrapper.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'Home') wrapper.scrollLeft = 0;
      else if (event.key === 'End') wrapper.scrollLeft = wrapper.scrollWidth;
      else wrapper.scrollLeft += event.key === 'ArrowRight' ? 120 : -120;
    });
  }
})();
