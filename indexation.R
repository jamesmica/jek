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
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=habitat-participatif',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=mangeoires',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=chaleur',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=coloc-seniors',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=marche-ccas',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=kit-nouveaux',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=interactive',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=fabrique',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=cineseine',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=agenda',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=bons-plans',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=minibox',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=miaulants',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=librairie',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=citad-elles',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=femmes',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=femmes-hommes',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=harcelement',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=referents',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=dispositifs',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=foyer',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=alimentaire',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=nouveaux-actifs',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=alimentaire',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=cafe-creation',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=economie-circulaire',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=campus-rural',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=bistrot-pradeau',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=reconquete-agricole',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=rest-o',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=entreprendre',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=insertion',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=hub-enerco',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=locaux',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=carte-fidelite',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=tiers-lieu',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=creches',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=etudes',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=parcours-de-vie',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=kolocations',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=mediation',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=etudiants',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=kfe',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=pump-track',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=radio-sommieres',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=cafes-itinerants',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=autofinancee',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=randonnee',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=opticien',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=covoiturage',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=village-jardin',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=cantine',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=portage',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=permacole',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=mobilite',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=navette',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=co-voiturage',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=pain-communal',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=collaboratif',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=autodefense',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=magazine',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=pain-communal',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=cody',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=biodiviersite',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=algorithmes',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=non-concurrentielles',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=biodechets',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=cyber',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=vacant',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=ecotourisme',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=faitout',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=intergenerationnel',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=bistrot',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=administrative',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=arrosage',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=insertion',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=ecole',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=eclairage',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=odd',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=maji',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=drive',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=debats',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=art',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=hirondelles',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=brigade',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=cimetiere',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=medecine',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=numerique',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=eclairage',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=anti-dechets',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=saisonnier',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=handibox',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=commande-publique',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=relogement',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=ruralite',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=revitalisation',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=passerelle',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=defi-climatique',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=alimentaire',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=commission'
)

# Bouclez sur les URLs et indexez-les.
for (url in urls) {
  response_content <- index_url(url, credentials)
  print(paste("URL:", url))
  print(paste("Response:", response_content))
  # Vous pouvez ajouter Sys.sleep(n) ici pour retarder les requêtes et éviter de dépasser les quotas.
}
