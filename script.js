$(document).ready(function () {
  // Initialisation de Selectize pour dep-nom-select avec gestion des changements
  $('#dep-nom-select').selectize({
    sortField: 'text',
    onChange: filterVignettes // Appel de la fonction de filtrage lors d'un changement de sélection
  });

  $('#produit-select').selectize({
    sortField: 'text',
    onChange: filterVignettes
  });

  $('#strate-select').selectize({
    sortField: 'text',
    onChange: filterVignettes
  });
  
  var $select = $('#insee-select').selectize({
    valueField: 'INSEE',
    labelField: 'NOM_COUV',
    searchField: 'NOM_COUV',
    load: function(query, callback) {
        if (!query.length) return callback();
        // Supposons que vous avez déjà chargé vos données dans `selectize`
        callback();
    },
    onChange: function selectedInsee() {
      adjustAndSortVignettesData(selectedInsee);
      
    }
});

var selectize = $select[0].selectize;

// Supposons que vous avez chargé toutes vos options ici au démarrage
$.ajax({
    url: 'pertinence.json',
    type: 'GET',
    dataType: 'json',
    success: function(res) {
        // Ajoutez toutes vos options à Selectize ici
        selectize.addOption(res); // Ajoute toutes les options au démarrage
        selectize.refreshOptions(); // Rafraîchit les options affichées
    }
});

let pertinenceData = [];

// Fonction pour charger les données de pertinence.json
function loadPertinenceData() {
  return $.ajax({
    url: 'pertinence.json',
    type: 'GET',
    dataType: 'json',
    success: function(res) {
        // Ajoutez toutes vos options à Selectize ici
        selectize.addOption(res); // Ajoute toutes les options au démarrage
        selectize.refreshOptions(); // Rafraîchit les options affichées
    }
});
}

// Appel de la fonction de chargement des données et initialisation de Selectize après le chargement
loadPertinenceData().done(function(res) {
    pertinenceData = res; // Stockage des données chargées
});

function adjustAndSortVignettesData(selectedInsee) {
  vignettesData.forEach(function(vignette) {
    vignette.SCORE = 1;
});
  //COMEPCI
  const selectElement = document.getElementById('insee-select');
  const inseeLength = selectElement.selectedOptions[0].value.length;
  console.log("length.insee",inseeLength);
  //STRATE
  const inseeValue = selectElement.selectedOptions[0].value;
  const selectedData = pertinenceData.find(item => String(item.INSEE) === String(inseeValue));
  if (selectedData) {
    const strateValue = selectedData.STRATE;
    console.log('STRATE trouvée:', strateValue);
    // Ici, vous pouvez ajuster les vignettesData basé sur la STRATE trouvée
  } else {
    console.log('Aucune STRATE trouvée pour cet INSEE');
  }
  const strateValue = selectedData.STRATE;

  //GEOLOC
  const XValue = parseFloat(selectedData.X);
  const YValue = parseFloat(selectedData.Y);
  console.log("X:",XValue,"Y:",YValue)

  
  //SCORING
  vignettesData.forEach((vignette,index) => {
      vignette.SCORE = parseFloat(vignette.SCORE);

      // Appliquez la logique d'ajustement
        //COMEPCI
      if ((inseeLength > 6 && String(vignette.ID).length >= 6 && vignette.PAYS === "France") || 
      (inseeLength > 3 && inseeLength < 7 && String(vignette.ID).length > 3 && String(vignette.ID).length < 7 && vignette.PAYS === "France")) {
          vignette.SCORE += 0.5;
      }
        //STRATE
      const strateValueNum = parseFloat(strateValue);
      const vignetteStrateNum = parseFloat(vignette.STRATE2);

      // Calcule la différence absolue entre strateValue et vignette.STRATE2
      const diff = Math.abs(strateValueNum - vignetteStrateNum);

      // Applique la logique d'ajustement basée sur la différence
      if (diff < 2) {
          vignette.SCORE += 1; // Ajoute +1 à la colonne SCORE
      } else if (diff >= 2 && diff < 3) {
          vignette.SCORE += 0.7; // Ajoute +0.7 à la colonne SCORE
      } else if (diff >= 3 && diff < 4) {
          vignette.SCORE += 0.5; // Ajoute +0.5 à la colonne SCORE
      } else if (diff >= 4 && diff < 5) {
        vignette.SCORE += 0.3; // Ajoute +0.5 à la colonne SCORE
      } else if (diff >= 5 && diff < 6) {
        vignette.SCORE += 0.1; // Ajoute +0.5 à la colonne SCORE
      }
        
        //GEOLOC
        //racine de ((xb-xa)²+(yb-ya)²)
      const XBP = parseFloat(vignette.X);
      const YBP = parseFloat(vignette.Y);
      const distances = Math.sqrt(Math.pow(XBP - XValue, 2) + Math.pow(YBP - YValue, 2)); // Correction de la formule
      console.log(`Distances pour la vignette ${index + 35896}: ${distances}`);

      if (distances > 800000) {
        vignette.SCORE += 0;
      } else if (distances > 600000) {
        vignette.SCORE += 0.1;
      } else if (distances > 400000) {
        vignette.SCORE += 0.2;
      } else if (distances > 200000) {
        vignette.SCORE += 0.4;
      } else if (distances > 100000) {
        vignette.SCORE += 0.7;
      } else if (distances > 40000) {
        vignette.SCORE += 0.8;
      } else if (distances < 40001 || String(inseeValue) === String(vignette.INSEE)) {
        vignette.SCORE += 1;
      }
  });

  // Trier vignettesData par SCORE décroissant
  vignettesData.sort((a, b) => parseFloat(b.SCORE) - parseFloat(a.SCORE));

  // Afficher le tableau après le tri pour vérification
  console.log(vignettesData);
  window.location.hash = 'decouvrir';

}


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
      <h4>${details.PAYS} | ${details.TER} (${details.POP} hab.) | ${details.ANNEE} </h4>
      <div class="BP_page_content">
      <div class="BP_page_imgdownload">
      <img src="www/img/${details.IMG}" class="BP_page_img" alt="${details.INTITULE}" />
      <a href="www/pdf/Bonnes Pratiques_Partie${details.N}.pdf" download="${details.INTITULE}">Télécharger en PDF<i class="fa-solid fa-download"></i></a>
      </div>
      <span class="BP_page_description">
      <p>${details.DESCRIPTION1}</p>
      <p>${details.DESCRIPTION2}</p>
      <p>${details.DESCRIPTION3}</p>
      </span>
      <div class="BP_page_graphref">
      <span class="BP_page_ref">
      <h5>Portée par </h5>
      <p>${details.CREDIT}</p>
      <h5>Contact</h5>
      <p>${details.CONTACT}</p>
      <a href="${details.LINK}">${details.LINK}</a>
      </span>
      <img src="www/graph/${details.GRAPH}" class="BP_page_graph" alt="${details.INTITULE}" />
      </div>
      </div>
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
                <h2 class="BP_title">${item.INTITULE} - ${item.TER} (${item.DEP})</h2>
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
      const themaMatch = thema.length === 0 || [item.THEMA1, item.THEMA2, item.THEMA3, item.THEMA4].some(themaItem => thema.includes(String(themaItem)));
      return (item.DEP?.toLowerCase().includes(query) ||
              item.TER?.toLowerCase().includes(query) ||
              item.DEP_NOM?.toLowerCase().includes(query) ||
              item.INTITULE?.toLowerCase().includes(query) ||
              item.SYNONYMES1?.toLowerCase().includes(query) ||
              item.SYNONYMES2?.toLowerCase().includes(query) ||
              item.SYNONYMES3?.toLowerCase().includes(query)) &&
             (item.STRATE === strate || strate === "") &&
             (item.DEP_NOM === depnom || depnom === "") &&
             themaMatch;
    });
    displayVignettes(filteredData);
  }

  // Attachement des événements de filtrage
  $('#search-input').on('input', filterVignettes);
  $('#strate-select').on('change', filterVignettes);
  $('#produit-select').on('change', filterVignettes);
  $('#insee-select').on('change', adjustAndSortVignettesData);
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
