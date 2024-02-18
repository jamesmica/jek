document.addEventListener("DOMContentLoaded", function () {
TH1 = function() {
    var selectize = $('#produit-select')[0].selectize;
    selectize.clear(); // Efface les sélections actuelles
  
    // Sélectionne les trois premières options réelles

    var options = Object.keys(selectize.options).slice(0, 4);
    selectize.setValue(options); // Sélectionne les trois premières options
  
    // Ajoute une option factice et la sélectionne
    var dummyOptionValue = "dummy-option"; // Assurez-vous que cette valeur soit unique et non présente dans vos options réelles
    selectize.addOption({value: dummyOptionValue, text: "Option Factice"});
    selectize.addItem(dummyOptionValue);
  
    // Simule la suppression de l'option factice avec la touche backspace
    setTimeout(function() {
      selectize.removeItem(dummyOptionValue);
      selectize.blur(); // Defocus le champ selectize pour simuler la fin de l'interaction utilisateur
  
      // Vous pouvez insérer ici d'autres appels de fonction qui doivent être exécutés après cette manipulation
    }, 100);

  };

  $('#TH1').on('click', function(e) {
      e.preventDefault();
      TH1();
      window.location.hash = "decouvrir"
  });


  TH2 = function() {
    var selectize = $('#produit-select')[0].selectize;
    selectize.clear(); // Efface les sélections actuelles
  
    // Sélectionne les trois premières options réelles

    var options = Object.keys(selectize.options).slice(4, 7);
    selectize.setValue(options); // Sélectionne les trois premières options
  
    // Ajoute une option factice et la sélectionne
    var dummyOptionValue = "dummy-option"; // Assurez-vous que cette valeur soit unique et non présente dans vos options réelles
    selectize.addOption({value: dummyOptionValue, text: "Option Factice"});
    selectize.addItem(dummyOptionValue);
  
    // Simule la suppression de l'option factice avec la touche backspace
    setTimeout(function() {
      selectize.removeItem(dummyOptionValue);
      selectize.blur(); // Defocus le champ selectize pour simuler la fin de l'interaction utilisateur
  
      // Vous pouvez insérer ici d'autres appels de fonction qui doivent être exécutés après cette manipulation
    }, 100);

  };

  $('#TH2').on('click', function(e) {
      e.preventDefault();
      TH2();
      window.location.hash = "decouvrir"
  });


  TH3 = function() {
    var selectize = $('#produit-select')[0].selectize;
    selectize.clear(); // Efface les sélections actuelles
  
    // Sélectionne les trois premières options réelles

    var options = Object.keys(selectize.options).slice(7, 12);
    selectize.setValue(options); // Sélectionne les trois premières options
  
    // Ajoute une option factice et la sélectionne
    var dummyOptionValue = "dummy-option"; // Assurez-vous que cette valeur soit unique et non présente dans vos options réelles
    selectize.addOption({value: dummyOptionValue, text: "Option Factice"});
    selectize.addItem(dummyOptionValue);
  
    // Simule la suppression de l'option factice avec la touche backspace
    setTimeout(function() {
      selectize.removeItem(dummyOptionValue);
      selectize.blur(); // Defocus le champ selectize pour simuler la fin de l'interaction utilisateur
  
      // Vous pouvez insérer ici d'autres appels de fonction qui doivent être exécutés après cette manipulation
    }, 100);

  };

  $('#TH3').on('click', function(e) {
      e.preventDefault();
      TH3();
      window.location.hash = "decouvrir"
  });



  TH4 = function() {
    var selectize = $('#produit-select')[0].selectize;
    selectize.clear(); // Efface les sélections actuelles
  
    // Sélectionne les trois premières options réelles

    var options = Object.keys(selectize.options).slice(12, 16);
    selectize.setValue(options); // Sélectionne les trois premières options
  
    // Ajoute une option factice et la sélectionne
    var dummyOptionValue = "dummy-option"; // Assurez-vous que cette valeur soit unique et non présente dans vos options réelles
    selectize.addOption({value: dummyOptionValue, text: "Option Factice"});
    selectize.addItem(dummyOptionValue);
  
    // Simule la suppression de l'option factice avec la touche backspace
    setTimeout(function() {
      selectize.removeItem(dummyOptionValue);
      selectize.blur(); // Defocus le champ selectize pour simuler la fin de l'interaction utilisateur
  
      // Vous pouvez insérer ici d'autres appels de fonction qui doivent être exécutés après cette manipulation
    }, 100);

  };

  $('#TH4').on('click', function(e) {
      e.preventDefault();
      TH4();
      window.location.hash = "decouvrir"
  });


  TH5 = function() {
    var selectize = $('#produit-select')[0].selectize;
    selectize.clear(); // Efface les sélections actuelles
  
    // Sélectionne les trois premières options réelles

    var options = Object.keys(selectize.options).slice(16, 24);
    selectize.setValue(options); // Sélectionne les trois premières options
  
    // Ajoute une option factice et la sélectionne
    var dummyOptionValue = "dummy-option"; // Assurez-vous que cette valeur soit unique et non présente dans vos options réelles
    selectize.addOption({value: dummyOptionValue, text: "Option Factice"});
    selectize.addItem(dummyOptionValue);
  
    // Simule la suppression de l'option factice avec la touche backspace
    setTimeout(function() {
      selectize.removeItem(dummyOptionValue);
      selectize.blur(); // Defocus le champ selectize pour simuler la fin de l'interaction utilisateur
  
      // Vous pouvez insérer ici d'autres appels de fonction qui doivent être exécutés après cette manipulation
    }, 100);

  };

  $('#TH5').on('click', function(e) {
      e.preventDefault();
      TH5();
      window.location.hash = "decouvrir"
  });


  TH6 = function() {
    var selectize = $('#produit-select')[0].selectize;
    selectize.clear(); // Efface les sélections actuelles
  
    // Sélectionne les trois premières options réelles

    var options = Object.keys(selectize.options).slice(24, 30);
    selectize.setValue(options); // Sélectionne les trois premières options
  
    // Ajoute une option factice et la sélectionne
    var dummyOptionValue = "dummy-option"; // Assurez-vous que cette valeur soit unique et non présente dans vos options réelles
    selectize.addOption({value: dummyOptionValue, text: "Option Factice"});
    selectize.addItem(dummyOptionValue);
  
    // Simule la suppression de l'option factice avec la touche backspace
    setTimeout(function() {
      selectize.removeItem(dummyOptionValue);
      selectize.blur(); // Defocus le champ selectize pour simuler la fin de l'interaction utilisateur
  
      // Vous pouvez insérer ici d'autres appels de fonction qui doivent être exécutés après cette manipulation
    }, 100);

  };

  $('#TH6').on('click', function(e) {
      e.preventDefault();
      TH6();
      window.location.hash = "decouvrir"
  });



  TH7 = function() {
    var selectize = $('#produit-select')[0].selectize;
    selectize.clear(); // Efface les sélections actuelles
  
    // Sélectionne les trois premières options réelles

    var options = Object.keys(selectize.options).slice(30, 35);
    selectize.setValue(options); // Sélectionne les trois premières options
  
    // Ajoute une option factice et la sélectionne
    var dummyOptionValue = "dummy-option"; // Assurez-vous que cette valeur soit unique et non présente dans vos options réelles
    selectize.addOption({value: dummyOptionValue, text: "Option Factice"});
    selectize.addItem(dummyOptionValue);
  
    // Simule la suppression de l'option factice avec la touche backspace
    setTimeout(function() {
      selectize.removeItem(dummyOptionValue);
      selectize.blur(); // Defocus le champ selectize pour simuler la fin de l'interaction utilisateur
  
      // Vous pouvez insérer ici d'autres appels de fonction qui doivent être exécutés après cette manipulation
    }, 100);

  };

  $('#TH7').on('click', function(e) {
      e.preventDefault();
      TH7();
      window.location.hash = "decouvrir"
  });


  TH8 = function() {
    var selectize = $('#produit-select')[0].selectize;
    selectize.clear(); // Efface les sélections actuelles
  
    // Sélectionne les trois premières options réelles

    var options = Object.keys(selectize.options).slice(35, 41);
    selectize.setValue(options); // Sélectionne les trois premières options
  
    // Ajoute une option factice et la sélectionne
    var dummyOptionValue = "dummy-option"; // Assurez-vous que cette valeur soit unique et non présente dans vos options réelles
    selectize.addOption({value: dummyOptionValue, text: "Option Factice"});
    selectize.addItem(dummyOptionValue);
  
    // Simule la suppression de l'option factice avec la touche backspace
    setTimeout(function() {
      selectize.removeItem(dummyOptionValue);
      selectize.blur(); // Defocus le champ selectize pour simuler la fin de l'interaction utilisateur
  
      // Vous pouvez insérer ici d'autres appels de fonction qui doivent être exécutés après cette manipulation
    }, 100);

  };

  $('#TH8').on('click', function(e) {
      e.preventDefault();
      TH8();
      window.location.hash = "decouvrir"
  });



  TH9 = function() {
    var selectize = $('#produit-select')[0].selectize;
    selectize.clear(); // Efface les sélections actuelles
  
    // Sélectionne les trois premières options réelles

    var options = Object.keys(selectize.options).slice(41, 44);
    selectize.setValue(options); // Sélectionne les trois premières options
  
    // Ajoute une option factice et la sélectionne
    var dummyOptionValue = "dummy-option"; // Assurez-vous que cette valeur soit unique et non présente dans vos options réelles
    selectize.addOption({value: dummyOptionValue, text: "Option Factice"});
    selectize.addItem(dummyOptionValue);
  
    // Simule la suppression de l'option factice avec la touche backspace
    setTimeout(function() {
      selectize.removeItem(dummyOptionValue);
      selectize.blur(); // Defocus le champ selectize pour simuler la fin de l'interaction utilisateur
  
      // Vous pouvez insérer ici d'autres appels de fonction qui doivent être exécutés après cette manipulation
    }, 100);

  };

  $('#TH9').on('click', function(e) {
      e.preventDefault();
      TH9();
      window.location.hash = "decouvrir"
  });



  TH10 = function() {
    var selectize = $('#produit-select')[0].selectize;
    selectize.clear(); // Efface les sélections actuelles
  
    // Sélectionne les trois premières options réelles

    var options = Object.keys(selectize.options).slice(44, 49);
    selectize.setValue(options); // Sélectionne les trois premières options
  
    // Ajoute une option factice et la sélectionne
    var dummyOptionValue = "dummy-option"; // Assurez-vous que cette valeur soit unique et non présente dans vos options réelles
    selectize.addOption({value: dummyOptionValue, text: "Option Factice"});
    selectize.addItem(dummyOptionValue);
  
    // Simule la suppression de l'option factice avec la touche backspace
    setTimeout(function() {
      selectize.removeItem(dummyOptionValue);
      selectize.blur(); // Defocus le champ selectize pour simuler la fin de l'interaction utilisateur
  
      // Vous pouvez insérer ici d'autres appels de fonction qui doivent être exécutés après cette manipulation
    }, 100);

  };

  $('#TH10').on('click', function(e) {
      e.preventDefault();
      TH10();
      window.location.hash = "decouvrir"
  });


  TH11 = function() {
    var selectize = $('#produit-select')[0].selectize;
    selectize.clear(); // Efface les sélections actuelles
  
    // Sélectionne les trois premières options réelles

    var options = Object.keys(selectize.options).slice(49, 53);
    selectize.setValue(options); // Sélectionne les trois premières options
  
    // Ajoute une option factice et la sélectionne
    var dummyOptionValue = "dummy-option"; // Assurez-vous que cette valeur soit unique et non présente dans vos options réelles
    selectize.addOption({value: dummyOptionValue, text: "Option Factice"});
    selectize.addItem(dummyOptionValue);
  
    // Simule la suppression de l'option factice avec la touche backspace
    setTimeout(function() {
      selectize.removeItem(dummyOptionValue);
      selectize.blur(); // Defocus le champ selectize pour simuler la fin de l'interaction utilisateur
  
      // Vous pouvez insérer ici d'autres appels de fonction qui doivent être exécutés après cette manipulation
    }, 100);

  };

  $('#TH11').on('click', function(e) {
      e.preventDefault();
      TH11();
      window.location.hash = "decouvrir"
  });


  TH12 = function() {
    var selectize = $('#produit-select')[0].selectize;
    selectize.clear(); // Efface les sélections actuelles
  
    // Sélectionne les trois premières options réelles

    var options = Object.keys(selectize.options).slice(53, 58);
    selectize.setValue(options); // Sélectionne les trois premières options
  
    // Ajoute une option factice et la sélectionne
    var dummyOptionValue = "dummy-option"; // Assurez-vous que cette valeur soit unique et non présente dans vos options réelles
    selectize.addOption({value: dummyOptionValue, text: "Option Factice"});
    selectize.addItem(dummyOptionValue);
  
    // Simule la suppression de l'option factice avec la touche backspace
    setTimeout(function() {
      selectize.removeItem(dummyOptionValue);
      selectize.blur(); // Defocus le champ selectize pour simuler la fin de l'interaction utilisateur
  
      // Vous pouvez insérer ici d'autres appels de fonction qui doivent être exécutés après cette manipulation
    }, 100);

  };

  $('#TH12').on('click', function(e) {
      e.preventDefault();
      TH12();
      window.location.hash = "decouvrir"
  });


  TH13 = function() {
    var selectize = $('#produit-select')[0].selectize;
    selectize.clear(); // Efface les sélections actuelles
  
    // Sélectionne les trois premières options réelles

    var options = Object.keys(selectize.options).slice(58, 61);
    selectize.setValue(options); // Sélectionne les trois premières options
  
    // Ajoute une option factice et la sélectionne
    var dummyOptionValue = "dummy-option"; // Assurez-vous que cette valeur soit unique et non présente dans vos options réelles
    selectize.addOption({value: dummyOptionValue, text: "Option Factice"});
    selectize.addItem(dummyOptionValue);
  
    // Simule la suppression de l'option factice avec la touche backspace
    setTimeout(function() {
      selectize.removeItem(dummyOptionValue);
      selectize.blur(); // Defocus le champ selectize pour simuler la fin de l'interaction utilisateur
  
      // Vous pouvez insérer ici d'autres appels de fonction qui doivent être exécutés après cette manipulation
    }, 100);

  };

  $('#TH13').on('click', function(e) {
      e.preventDefault();
      TH13();
      window.location.hash = "decouvrir"
  });


  TH14 = function() {
    var selectize = $('#produit-select')[0].selectize;
    selectize.clear(); // Efface les sélections actuelles
  
    // Sélectionne les trois premières options réelles

    var options = Object.keys(selectize.options).slice(61, 68);
    selectize.setValue(options); // Sélectionne les trois premières options
  
    // Ajoute une option factice et la sélectionne
    var dummyOptionValue = "dummy-option"; // Assurez-vous que cette valeur soit unique et non présente dans vos options réelles
    selectize.addOption({value: dummyOptionValue, text: "Option Factice"});
    selectize.addItem(dummyOptionValue);
  
    // Simule la suppression de l'option factice avec la touche backspace
    setTimeout(function() {
      selectize.removeItem(dummyOptionValue);
      selectize.blur(); // Defocus le champ selectize pour simuler la fin de l'interaction utilisateur
  
      // Vous pouvez insérer ici d'autres appels de fonction qui doivent être exécutés après cette manipulation
    }, 100);

  };

  $('#TH14').on('click', function(e) {
      e.preventDefault();
      TH14();
      window.location.hash = "decouvrir"
  });



  TH15 = function() {
    var selectize = $('#produit-select')[0].selectize;
    selectize.clear(); // Efface les sélections actuelles
  
    // Sélectionne les trois premières options réelles

    var options = Object.keys(selectize.options).slice(68, 70);
    selectize.setValue(options); // Sélectionne les trois premières options
  
    // Ajoute une option factice et la sélectionne
    var dummyOptionValue = "dummy-option"; // Assurez-vous que cette valeur soit unique et non présente dans vos options réelles
    selectize.addOption({value: dummyOptionValue, text: "Option Factice"});
    selectize.addItem(dummyOptionValue);
  
    // Simule la suppression de l'option factice avec la touche backspace
    setTimeout(function() {
      selectize.removeItem(dummyOptionValue);
      selectize.blur(); // Defocus le champ selectize pour simuler la fin de l'interaction utilisateur
  
      // Vous pouvez insérer ici d'autres appels de fonction qui doivent être exécutés après cette manipulation
    }, 100);

  };

  $('#TH15').on('click', function(e) {
      e.preventDefault();
      TH15();
      window.location.hash = "decouvrir"
  });
});