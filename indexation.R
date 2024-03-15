library(httr)
library(jsonlite)

# Définissez le chemin vers votre fichier JSON de service_account.
json_key_file <- "phrasal-chiller-414914-f71474aed209.json"

# Lisez le fichier de service_account.
service_account_info <- fromJSON(txt = json_key_file)

# Préparez le jeton d'accès en utilisant la bibliothèque httr.
scope <- "https://www.googleapis.com/auth/indexing"
credentials <- oauth_service_token(
  endpoint = oauth_endpoints("google"),
  secrets = service_account_info,
  scope = scope
)

# URL de l'API d'indexation Google.
endpoint <- "https://indexing.googleapis.com/v3/urlNotifications:publish"

# Fonction pour soumettre une URL à l'API d'indexation.
index_url <- function(url, token) {
  # Assurez-vous que le contenu est bien un objet JSON et non une liste
  content <- toJSON(list(url = url, type = "URL_UPDATED"), auto_unbox = TRUE)
  response <- POST(
    url = endpoint,
    add_headers(Authorization = sprintf("Bearer %s", token$credentials$access_token), `Content-Type` = "application/json"),
    body = content,
    encode = "json"
  )
  return(content(response))
}

# Liste des URLs à indexer.
urls <- c(
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=video-maternelle',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=photographie-exposition-maternelle',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=maternelle-assistante-metier',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=info-roule-route',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=jeunesse-rock-fete-musique',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=pã´le-enfance',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=monoparent-monoparentalite',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=cent-fleurs-offrir',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=restaurant-scolaire-responsable',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=energie-positive-collectivite',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=cafe-associatif',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=faire-compagnie',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=parentalite-accueil-ressource',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=covoiturage-senior-plateforme',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=ville-chã´mage-conciergerie',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=vieillissement-ecole',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=odd',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=environnement-ecole-nature',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=participation-citoyenne',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=chantier-ouvert-participatif',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=ecran-sensibilisation-parents-enfants',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=patrimoine-monuments-qrcode',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=citoyen-participation-journee',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=cloud-donnees-prive',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=village-vieillesse-centre',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=police-violence-theatre',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=territoire-ccas-dynamisme',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=creche-prison-garde',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=capteur-fuite-eau',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=preau-champetre-fete',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=poulailler-poule',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=tombe-cimetiere',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=art-depression-bien-etre',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=epicerie-solidaire-gratuit',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=territoire-portrait-donnees',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=campus-rural',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=projet-citoyen',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=velo-gratuit-jeune-etudiant',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=couleur-peinture',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=aeration-capteur-co2',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=audit-transparence-citoyen',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=nutrition-guide',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=commissariat-police-population',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=minimum-argent',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=s-cool-bus',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=logement-surface',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=patrimoine-architecture',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=service-public-camping',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=logiciel-libre',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=service-isolement',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=potager-urbain',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=ecole-parent-langue',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=habitat-logement',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=territoire-cooperation-jeunesse',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=eau-reutilisation-laver-rue',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=compost-borne',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=video-question-jeunes',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=recuperation-design',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=mediation-numerique-fracture',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=tricot-urbain',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=boutique-argent',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=creche-garde',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=biosource-materiaux',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=energie-taxe-renovation',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=interactive-cimetiere-borne',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=numerique-technologie',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=dispositif-argent-poche',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=tarif-age-senior',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=forum-acces-droit',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=entraide-solidarite',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=assistance-reseau',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=maison-service-public',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=maison-parent-parentalite',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=proximite-maison',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=transport-senior',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=dimanches-bonheur',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=borne-migrant-sans-abris',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=locaux-moteurs',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=credit-personnel',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=action-departmental-metier',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=creation-artistique-metier',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=soin-aines-vieux',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=emploi-aide-domicile',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=metier-aide-atelier',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=assistante-maternelle-metier',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=coulisse-femme-egalite',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=metier-autonomie-plateforme',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=animateur-jeunesse-metier',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=departement-assistant',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=communication-innovant-recrutement',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=creche-garde',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=territoire-non-recours-droit',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=tiers-lieux-l-ecrin',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=mobilite-alternative',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=une-journee-citoyenne',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=un-agent-d-animation-aupres-des-personnes-isolees',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=reenchanter-l-animation',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=un-pã´le-de-services-de-proximite',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=garde-parentalite-famille',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=violence-conjugale-logement'
  
)

# Bouclez sur les URLs et indexez-les.
for (url in urls) {
  response_content <- index_url(url, credentials)
  print(paste("URL:", url))
  print(paste("Response:", response_content))
  # Vous pouvez ajouter Sys.sleep(n) ici pour retarder les requêtes et éviter de dépasser les quotas.
}
