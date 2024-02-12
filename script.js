$(document).ready(function () {
  // Initialisation de Selectize pour dep-nom-select avec gestion des changements
  $('#dep-nom-select').selectize({
    sortField: 'text',
    onChange: filterVignettes // Appel de la fonction de filtrage lors d'un changement de sélection
  });

  $('#produit-select').selectize({
    sortField: 'text',
    onChange: function(value) {
      // Vous pouvez placer ici votre logique spécifique pour gérer le changement de sélection de categorie-select
      // Par exemple, une fonction de filtrage différente ou la même que pour dep-nom-select
      console.log("Categorie sélectionnée :", value);
      // Supposons que vous vouliez appeler la même fonction filterVignettes
      filterVignettes(); // Vous pouvez appeler une fonction différente si nécessaire
    }
  });

    // Écoute du clic sur le document entier
    $(document).mouseup(function(e) {
        var container = $("#details-container"); // Sélection du conteneur des détails

        // Si le clic est en dehors du conteneur et que le conteneur est ouvert
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.removeClass('open'); // Fermer le conteneur en retirant la classe 'open'
        }
    });



  // Variables globales pour stocker les données
  let vignettesData = [];

  // Fonction pour activer la section et le lien correspondants
  function activateSectionAndLink(activeLink) {
    $('.nav-link').removeClass('active');
    $('.main-section').removeClass('active');

    if (activeLink) {
      $(activeLink).addClass('active');
      const activeSection = $($(activeLink).attr('href'));
      if (activeSection) $(activeSection).addClass('active');
    }
  }

  // Écouteurs d'événements pour les liens de navigation
  $('.nav-link').on('click', function (event) {
    event.preventDefault();
    const hash = $(this).attr('href');
    window.location.hash = hash;
    activateSectionAndLink(this);
  });

  // Fonction pour extraire l'ID à partir du hash
  function getIdFromHash() {
    const hash = window.location.hash;
    const idMatch = hash.match(/id=([^&]+)/);
    return idMatch ? idMatch[1] : null;
  }

  // Fonction pour afficher les détails d'une vignette
  function displayDetails(id) {
    const details = vignettesData.find(item => item.MOTCLES === id);
    const detailsContainer = $('#details-container');
    if (!details) {
      detailsContainer.html('Détail non trouvé.');
      return;
    }

    const detailsMarkup = `
      <div class="close-btn">✖ Fermer</div>
      <h2>${details.INTITULE}</h2>
      <img src="www/img/${details.IMG}" alt="${details.INTITULE}" />
      <p>${details.DESCRIPTION1}</p>
    `;
    detailsContainer.html(detailsMarkup).addClass('open');

    $('.close-btn').on('click', function () {
      detailsContainer.removeClass('open');
      window.history.pushState({}, '', window.location.pathname + window.location.hash.split('?')[0]);
    });
  }

  // Fonction pour afficher les vignettes
  function displayVignettes(data) {
    const container = $('#vignettes-container');
    container.empty();
    data.forEach(item => {
      if (item.DEP && item.INTITULE) {
        const vignette = $(`
          <div class="vignette">
            <div class="details-link" tabindex="0">
              <img src="www/img/${item.IMG}" alt="${item.INTITULE}"/>
              <div class="BP_text">
                <h2> ${item.THEMA1} </h2>
                <h3 class="BP_title">${item.INTITULE} - ${item.TER} (${item.ID})</h3>
                <p class="BP_caption">${item.DESCRIPTION1}</p>
              </div>
            </div>
          </div>
        `).on('click', () => {
          displayDetails(item.MOTCLES);
          const newUrl = `#decouvrir?id=${item.MOTCLES}`;
          window.history.pushState({ path: newUrl }, '', newUrl);
        });
        container.append(vignette);
      }
    });
  }

  // Gestion du changement de hash
  function handleHashChange() {
    const id = getIdFromHash();
    const hashParts = window.location.hash.split('?');
    const hash = hashParts[0];

    const activeLink = $(`.nav-link[href="${hash}"]`);
    activateSectionAndLink(activeLink);

    if (hash === '#decouvrir' && id) {
      displayVignettes(vignettesData);
      displayDetails(id);
    } else if (hash === '#decouvrir') {
      displayVignettes(vignettesData);
    }
  }

  // Fonction de filtrage des vignettes
  function filterVignettes() {
    const query = $('#search-input').val().toLowerCase();
    const strate = $('#strate-select').val();
    const depnom = $('#dep-nom-select').val();
    const thema = $('#produit-select').val();
    const filteredData = vignettesData.filter(item => {
      return (item.DEP?.toLowerCase().includes(query) ||
              item.INTITULE?.toLowerCase().includes(query) ||
              item.SYNONYMES1?.toLowerCase().includes(query) ||
              item.SYNONYMES2?.toLowerCase().includes(query) ||
              item.SYNONYMES3?.toLowerCase().includes(query)) &&
             (item.STRATE === strate || strate === "") &&
             (item.DEP_NOM === depnom || depnom === "") &&
             (item.THEMA1 === thema || thema === "" || 
             item.THEMA2 === thema || item.THEMA3 === thema ||
             item.THEMA4 === thema);
    });
    displayVignettes(filteredData);
  }

  // Attachement des événements de filtrage
  $('#search-input').on('input', filterVignettes);
  $('#strate-select').on('change', filterVignettes);
  $(window).on('hashchange', handleHashChange);

  // Chargement initial des données
  fetch('BDD_finale.csv')
    .then(response => response.text())
    .then(csvText => {
      Papa.parse(csvText, {
        header: true,
        complete: function (results) {
          vignettesData = results.data;
          handleHashChange();
        }
      });
    });

  // Appel initial pour gérer le changement de hash
  handleHashChange();
});
