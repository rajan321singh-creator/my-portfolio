/**
 * PRODUCT SHOWCASE - INTERACTIVE LOGIC
 * Lightbox screenshot zoom, scroll spy, code copy
 */

document.addEventListener('DOMContentLoaded', () => {
  initLightbox();
  initScrollSpy();
  initCopyCode();
  initAppTabs();
});

// Lightbox Modal for Screenshots
function initLightbox() {
  const frames = document.querySelectorAll('.screenshot-frame');
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');

  if (!modal) return;

  frames.forEach(frame => {
    frame.addEventListener('click', () => {
      const img = frame.querySelector('img');
      const caption = frame.closest('.screenshot-card')?.querySelector('.screenshot-caption h5')?.textContent || '';
      
      if (img) {
        modalImg.src = img.src;
        modalCaption.textContent = caption;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Scroll Spy for In-Page Sticky Nav
function initScrollSpy() {
  const navItems = document.querySelectorAll('.page-nav-item');
  const sections = document.querySelectorAll('.product-section');

  if (navItems.length === 0 || sections.length === 0) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
}

// Copy Code Snippets
function initCopyCode() {
  const copyBtns = document.querySelectorAll('.btn-copy-code');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      navigator.clipboard.writeText(targetEl.textContent).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
      });
    });
  });
}

// Universal Interactive UI Tab Switcher
function initAppTabs() {
  document.querySelectorAll('.app-tab-btn, [data-tab-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-tab-target');
      const container = btn.closest('.ui-mockup-frame') || btn.closest('.product-section');
      if (!container || !targetId) return;

      // Update button styles in this container
      container.querySelectorAll('.app-tab-btn, [data-tab-target]').forEach(b => {
        b.classList.remove('active');
        b.style.removeProperty('background');
        b.style.removeProperty('color');
        b.style.removeProperty('font-weight');
        b.style.removeProperty('border-color');
      });

      btn.classList.add('active');

      // Switch panels
      container.querySelectorAll('.app-tab-panel').forEach(panel => {
        panel.classList.remove('active');
        panel.style.display = 'none';
      });

      const targetPanel = container.querySelector(`#${targetId}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.style.display = 'block';
      }
    });
  });
}

