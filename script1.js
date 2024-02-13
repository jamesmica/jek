$(document).ready(function () {
  let vignettesData = [];

  loadData();

  // Initialisation de Selectize pour les champs select
  initializeSelectize();

  // Gestion des changements d'onglet et d'affichage des détails
  handleNavigation();

  // Chargement des données
  Papa.parse('BDD_finale.csv', {
      download: true,
      header: true,
      complete: function (results) {
          vignettesData = results.data.map(item => ({
              ...item,
              SCORE: parseFloat(item.SCORE) || 0 // Assurez-vous que SCORE est un nombre
          }));
          checkForDetailsDisplay(); // Gestion initiale du changement de hash
      }
  });

  // Initialisation de Selectize pour tous les champs select avec une gestion unifiée des changements
  $('#dep-nom-select, #produit-select, #insee-select').selectize({
      sortField: 'text',
      onChange: filterAndAdjustVignettes
  });

  // Chargement et ajout d'options pour insee-select
  function loadInseeOptions() {
      $.ajax({
          url: 'pertinence.json',
          type: 'GET',
          dataType: 'json',
          success: function (res) {
              const inseeSelect = $('#insee-select')[0].selectize;
              inseeSelect.addOption(res); // Ajoute toutes les options
              inseeSelect.refreshOptions(false); // Rafraîchit les options sans ouvrir le dropdown
          }
      });
  }
  loadInseeOptions(); // Chargez les options pour insee-select dès que possible

  // Fonction unifiée pour filtrer et ajuster les vignettes
  function filterAndAdjustVignettes(selectedInsee) {
      if (selectedInsee) {
          window.location.hash = 'decouvrir';
          adjustAndSortVignettesData(selectedInsee);
      }
      displayVignettes(vignettesData); // Réaffiche les vignettes avec les données ajustées ou filtrées
  }

  // Fonction pour ajuster et trier les données de vignettes
  function adjustAndSortVignettesData(selectedInsee) {
      const inseeLength = String(selectedInsee).length;
      vignettesData.forEach(vignette => {
          const vignetteInseeLength = String(vignette.INSEE).length;
          vignette.SCORE = parseFloat(vignette.SCORE); // Convertit SCORE en nombre si ce n'est pas déjà le cas

          // Logique d'ajustement
          if ((inseeLength >= 4 && inseeLength <= 6 && vignetteInseeLength >= 4 && vignetteInseeLength <= 6) ||
              (inseeLength > 6 && vignetteInseeLength > 6)) {
              vignette.SCORE += 0.5;
          }
      });

      vignettesData.sort((a, b) => b.SCORE - a.SCORE); // Trier par SCORE décroissant
  }

  // Fonction pour afficher les vignettes
  function displayVignettes(data) {
      const container = $('#vignettes-container');
      container.empty();
      data.forEach(item => {
          const vignetteHTML = `
              <div class="vignette" data-motcles="${item.MOTCLES}">
                  <div class="details-link" tabindex="0">
                      <img src="www/img/${item.IMG}" alt="${item.INTITULE}" />
                      <div class="BP_text">
                          <h2>${item.THEMA1}</h2>
                          <h3 class="BP_title">${item.INTITULE} - ${item.TER} (${item.ID})</h3>
                          <p class="BP_caption">${item.DESCRIPTION1}</p>
                      </div>
                  </div>
              </div>`;
          container.append(vignetteHTML);
      });

      // Attacher des événements de clic pour afficher les détails
      $('.vignette').click(function () {
          const motcles = $(this).data('motcles');
          displayDetails(motcles);
      });
  }

  function handleNavigation() {
    // Écouteur d'événements pour les liens de navigation
    $('.nav-link').on('click', function (e) {
        e.preventDefault();
        const targetSection = $(this).attr('href');
        setActiveSection(targetSection);
    });

    // Gestion du changement de hash pour afficher les détails
    $(window).on('hashchange', function () {
        const hash = window.location.hash;
        if (hash.startsWith('#decouvrir')) {
            setActiveSection('#decouvrir');
            const id = getIdFromHash();
            if (id) displayDetails(id);
        } else {
            setActiveSection(hash);
        }
    });
}

function setActiveSection(sectionId) {
    $('.nav-link').removeClass('active');
    $(`.nav-link[href="${sectionId}"]`).addClass('active');
    $('.main-section').removeClass('active');
    $(`${sectionId}`).addClass('active');
}

// Fonction pour obtenir l'ID à partir du hash de l'URL
function getIdFromHash() {
    const hash = window.location.hash;
    const match = hash.match(/id=([^&]+)/);
    return match ? match[1] : null;
}

  // Gestion du changement de hash
  function checkForDetailsDisplay() {
    const id = getIdFromHash();
    if (id) {
        displayDetails(id);
    } else {
        // Si aucun ID n'est trouvé dans le hash, vous pourriez vouloir gérer cela différemment,
        // par exemple, en affichant un message ou en revenant à un état par défaut.
        // Cette partie est optionnelle et dépend de votre cas d'utilisation.
        console.log("Aucun ID de détail spécifié dans l'URL.");
    }
}



    // Fonction pour afficher les détails d'une vignette
    function displayDetails(motcles) {
      const details = vignettesData.find(item => item.MOTCLES === motcles);
      const detailsContainer = $('#details-container');
      if (!details) {
          detailsContainer.html('Détail non trouvé.');
          return;
      }

      const detailsHTML = `
          <div class="close-btn">✖ Fermer</div>
          <h2>${details.INTITULE}</h2>
          <img src="www/img/${details.IMG}" alt="${details.INTITULE}" />
          <p>${details.DESCRIPTION1}</p>`;
      detailsContainer.html(detailsHTML).addClass('open');
      
      $('.close-btn').click(function () {
          detailsContainer.removeClass('open');
      });
  }
});
