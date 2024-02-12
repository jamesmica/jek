document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const mainSections = document.querySelectorAll('.main-section');
  let vignettesData = [];

  function activateSectionAndLink(activeLink) {
    navLinks.forEach(nav => nav.classList.remove('active'));
    mainSections.forEach(section => section.classList.remove('active'));

    if (activeLink) {
      activeLink.classList.add('active');
      const activeSection = document.querySelector(activeLink.getAttribute('href'));
      if (activeSection) activeSection.classList.add('active');
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const hash = this.getAttribute('href');
      window.location.hash = hash;
      activateSectionAndLink(this);
    });
  });

  function getIdFromHash() {
    const hash = window.location.hash; // Exemple: #decouvrir?id=mangeoires
    const idMatch = hash.match(/id=([^&]+)/);
    return idMatch ? idMatch[1] : null;
  }

  function displayDetails(id) {
    const details = vignettesData.find(item => item.MOTCLES === id);
    const detailsContainer = document.getElementById('details-container');
    if (!details) {
      detailsContainer.innerHTML = 'Détail non trouvé.';
      return;
    }

    detailsContainer.innerHTML = `
      <div class="close-btn">✖ Fermer</div>
      <h2>${details.INTITULE}</h2>
      <img src="www/img/${details.IMG}" alt="${details.INTITULE}" />
      <p>${details.DESCRIPTION1}</p>
    `;
    detailsContainer.classList.add('open');

    document.querySelector('#details-container .close-btn').addEventListener('click', function() {
      detailsContainer.classList.remove('open');
      // Optionnel : réinitialiser l'URL
      window.history.pushState({}, '', window.location.pathname + window.location.hash.split('?')[0]);
    });
  }

  function displayVignettes(data) {
    const container = document.getElementById('vignettes-container');
    container.innerHTML = '';
    data.forEach(item => {
      if (item.DEP && item.INTITULE) {
        const vignette = document.createElement('div');
        vignette.className = 'vignette';
        vignette.innerHTML = `
          <div class="details-link" tabindex="0">
            <img src="www/img/${item.IMG}" alt="${item.INTITULE}"/>
            <div class="BP_text">
              <h3 class="BP_title">${item.INTITULE} - ${item.TER} (${item.ID})</h3>
              <p class="BP_caption">${item.DESCRIPTION1}</p>
            </div>
          </div>`;
        vignette.addEventListener('click', () => {
          displayDetails(item.MOTCLES);
          const newUrl = `#decouvrir?id=${item.MOTCLES}`;
          window.history.pushState({ path: newUrl }, '', newUrl);
        });
        container.appendChild(vignette);
      }
    });
  }

  function handleHashChange() {
    const hashParts = window.location.hash.split('?');
    const hash = hashParts[0];
    const id = getIdFromHash();

    // Active la section correspondante basée sur le hash
    const activeLink = document.querySelector(`.nav-link[href="${hash}"]`);
    activateSectionAndLink(activeLink);

    // Si l'ID est présent et que nous sommes dans la section #decouvrir, afficher les détails
    if (hash === '#decouvrir' && id) {
        displayVignettes(vignettesData);   
        displayDetails(id);
    } else if (hash === '#decouvrir') {
        // Si aucun ID spécifique n'est fourni mais que nous sommes dans #decouvrir, assurez-vous d'afficher toutes les vignettes
        displayVignettes(vignettesData);
    }
}

function filterVignettes() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const strate = document.getElementById('strate-select').value;
  const filteredData = vignettesData.filter(item => {
    return (item.DEP?.toLowerCase().includes(query) ||
            item.INTITULE?.toLowerCase().includes(query) ||
            item.SYNONYMES1?.toLowerCase().includes(query) ||
            item.SYNONYMES2?.toLowerCase().includes(query) ||
            item.SYNONYMES3?.toLowerCase().includes(query)) &&
           (item.STRATE === strate || strate === "");
  });
  displayVignettes(filteredData);
}

document.getElementById('search-input').addEventListener('input', filterVignettes);
document.getElementById('strate-select').addEventListener('change', filterVignettes);

fetch('BDD_finale.csv')
  .then(response => response.text())
  .then(csvText => {
    Papa.parse(csvText, {
      encoding: "utf-8",
      header: true,
      complete: function(results) {
        vignettesData = results.data;
        // Populate strate-select here if needed based on vignettesData
        handleHashChange();
      }
    });
  });

  window.addEventListener('hashchange', handleHashChange);

  // Initialisation
  handleHashChange();
});
