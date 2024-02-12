document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link'); // Sélectionne tous les liens de navigation
    const mainSections = document.querySelectorAll('.main-section'); // Sélectionne toutes les sections principales
  
    navLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault(); // Empêche le comportement par défaut des liens
        
        // Retire la classe 'active' de tous les liens et sections
        navLinks.forEach(nav => {
          nav.classList.remove('active');
        });
        mainSections.forEach(section => {
          section.classList.remove('active');
        });
  
        // Ajoute la classe 'active' au lien et à la section correspondante
        this.classList.add('active');
        const activeSection = document.querySelector(this.getAttribute('href'));
        if (activeSection) {
          activeSection.classList.add('active');
        }
      });
    });
  
    // Optionnel : déclenche un clic sur le premier lien de navigation pour afficher la première section au chargement de la page
    if (navLinks.length > 0) {
      navLinks[0].click();
    }
  });


  function voirDetails(button) {
    var idBonnePratique = button.getAttribute('data-id');
    // Redirige vers la page de détails avec l'identifiant de la bonne pratique
    window.location.href = 'details.html?id=' + idBonnePratique;
  }
  
  



document.addEventListener('DOMContentLoaded', function() {
    fetch('BDD_final.csv')
        .then(response => response.text())
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                complete: function(results) {
                    window.vignettesData = results.data;
                    displayVignettes(vignettesData); // Affiche toutes les données initialement
                }
            });
        });

    document.getElementById('search-input').addEventListener('input', function(event) {
        const query = event.target.value;
        filterVignettes(query);
    });
});

function displayVignettes(data) {
    const container = document.getElementById('vignettes-container');
    container.innerHTML = ''; // Effacer les vignettes précédentes

    data.forEach(item => {
        if(item.DEP && item.INTITULE) { // S'assurer que les deux champs existent
            const vignette = document.createElement('div');
            vignette.innerHTML = `<div class="BP" data-id=${item.N}> <a href="details.html?id=${item.N}" class="details-link"><img src="www/img/${item.IMG}"/><span class="BP_text"><h3 class="BP_title">${item.INTITULE} - ${item.TER} (${item.ID})</h3>
            <p class="BP_caption">${item.DESCRIPTION1}</p>
            </span>
            </a>
            </div>`;
            container.appendChild(vignette);
        }
    });
}

function filterVignettes(query) {
    const filteredData = vignettesData.filter(item => {
        // Assurez-vous que DEP est une chaîne avant d'appeler includes
        const depAsString = String(item.DEP); // Convertit DEP en chaîne, peu importe le type original
        return depAsString.toLowerCase().includes(query.toLowerCase());
    });
    displayVignettes(filteredData);
}
