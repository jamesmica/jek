document.addEventListener('DOMContentLoaded', function() {
    var navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // Enlever la classe 'active' des autres onglets et sections
            document.querySelectorAll('.nav-link, .content-section').forEach(function(element) {
                element.classList.remove('active');
            });

            // Ajouter la classe 'active' à l'onglet sélectionné et à la section correspondante
            link.classList.add('active');
            var targetSection = document.querySelector(link.getAttribute('href'));
            targetSection.classList.add('active');
        });
    });
});


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
            vignette.innerHTML = `<h3>${item.DEP}</h3><p>${item.INTITULE}</p>`;
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
