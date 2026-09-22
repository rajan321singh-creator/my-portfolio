/**
 * RAJAN SINGH PORTFOLIO - MAIN INTERACTIVE LOGIC
 * Real-time filtering, instant search, metric counters
 */

document.addEventListener('DOMContentLoaded', () => {
  initDeptFilter();
  initAppSearch();
  initMetricCounters();
  initSmoothScroll();
});

// Department Tab Filtering
function initDeptFilter() {
  const pills = document.querySelectorAll('.dept-pill');
  const cards = document.querySelectorAll('.app-card');
  const searchInput = document.getElementById('appSearchInput');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Toggle active state
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const selectedDept = pill.getAttribute('data-dept');
      filterApps(selectedDept, searchInput ? searchInput.value.trim().toLowerCase() : '');
    });
  });
}

// Search Filtering
function initAppSearch() {
  const searchInput = document.getElementById('appSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    const activePill = document.querySelector('.dept-pill.active');
    const activeDept = activePill ? activePill.getAttribute('data-dept') : 'all';
    
    filterApps(activeDept, query);
  });
}

// Unified Filter Logic
function filterApps(dept, query) {
  const cards = document.querySelectorAll('.app-card');
  let matchCount = 0;

  cards.forEach(card => {
    const cardDept = card.getAttribute('data-dept');
    const title = card.querySelector('.app-title')?.textContent.toLowerCase() || '';
    const desc = card.querySelector('.app-desc')?.textContent.toLowerCase() || '';
    const tags = Array.from(card.querySelectorAll('.tech-tag')).map(t => t.textContent.toLowerCase()).join(' ');

    const matchesDept = (dept === 'all' || cardDept === dept);
    const matchesQuery = query === '' || 
      title.includes(query) || 
      desc.includes(query) || 
      tags.includes(query);

    if (matchesDept && matchesQuery) {
      card.style.display = 'flex';
      matchCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // No results state
  const noResultsEl = document.getElementById('noResultsMessage');
  if (noResultsEl) {
    noResultsEl.style.display = matchCount === 0 ? 'block' : 'none';
  }
}

// Animated Metric Counters
function initMetricCounters() {
  const statNumbers = document.querySelectorAll('.stat-count');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'), 10);
    const suffix = stat.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;

    let count = 0;
    const speed = 25;
    const increment = Math.ceil(target / (1000 / speed));

    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        stat.textContent = target + suffix;
        clearInterval(timer);
      } else {
        stat.textContent = count + suffix;
      }
    }, speed);
  });
}

// Smooth scrolling for jump links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
