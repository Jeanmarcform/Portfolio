document.getElementById("clear-search").addEventListener('click', function() {
  const searchBar = document.getElementById("search-bar");
  searchBar.value = '';
  searchBar.dispatchEvent(new Event('input')); // Trigger input event to update UI
});

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function searchPage() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const sections = document.querySelectorAll('section');
  const elements = document.querySelectorAll('section, p, h1, h2, h3, a');

  let found = false;

  clearHighlights();

  if (query.trim() === '') {
    sections.forEach(section => {
      section.style.display = 'block';
    });
    window.location.reload(true);
    return;
  }

  sections.forEach(section => {
    section.style.display = 'none';
  });

  elements.forEach(element => {
    const textContent = element.textContent.toLowerCase();
    if (textContent.includes(query)) {
      let parentSection = element.closest('section');
      if (parentSection) {
        parentSection.style.display = 'block';
        found = true;
      }

      const regex = new RegExp(`(${query})`, 'gi');
      element.innerHTML = element.textContent.replace(regex, '<span class="highlight">$1</span>');
    }
  });

  if (!found) {
    alert('No results found');
  }
}

function clearHighlights() {
  document.querySelectorAll('.highlight').forEach((el) => {
    el.outerHTML = el.innerHTML;
  });
}

document.getElementById("search-bar").addEventListener('input', function() {
  const clearButton = document.getElementById("clear-search");
  if (this.value.trim() === '') {
    clearHighlights();
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.display = 'block';
    });
    window.location.reload(true);
    clearButton.style.display = 'none';
  } else {
    clearButton.style.display = 'inline';
  }
});

document.addEventListener('click', function(event) {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const isClickInsideMenu = menu.contains(event.target);
  const isClickInsideIcon = icon.contains(event.target);

  if (!isClickInsideMenu && !isClickInsideIcon) {
    menu.classList.remove("open");
    icon.classList.remove("open");
  }
});

window.addEventListener('scroll', function() {
  const aboutSection = document.getElementById('about');
  const aboutPic = document.querySelector('.about-pic');

  const distanceToTop = aboutSection.getBoundingClientRect().top;

  if (distanceToTop < window.innerHeight * 0.75) {
    aboutPic.classList.add('fade-in');
  }
});
function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock(); // initial call to display the time immediately
