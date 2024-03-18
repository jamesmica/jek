library(httr)
library(jsonlite)

# Définissez le chemin vers votre fichier JSON de service_account.
json_key_file <- "phrasal-chiller-414914-69972bfd1520.json"

# Lisez le fichier de service_account.
service_account_info <- fromJSON(txt = file(json_key_file))

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
  if (status_code(response) == 200) {
    return(content(response))
  } else {
    return(paste("Error:", status_code(response), content(response)))
  }
}

# Liste des URLs à indexer.
urls <- c(
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=defis-collegues',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=securite-routiere',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=nettoyer',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=eclairage-public',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=developpement-verdure',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=arbres-naissances',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=autoproduction-nourriture',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=grains-participation',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=compost-quartier',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=habitation-solidale',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=meubles-publics',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=travail-femmes',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=biomethane',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=recyclage-construction',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=defis-durables',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=jeunesse-rock-fete-musique',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=recyclage-stade-materiaux',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=eau-gratuite',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=actions-durables',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=bus-pied',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=eau-aã®nes-ccas-livreurs-seniors',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=supermarche-pauvres',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=affichage-violences-femmes-campagne',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=informations-etrangers',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=employe-municipal',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=energie-taxe-renovation',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=batiments-virtuels',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=les-jardins-partages',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=accueil-mineurs',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=grandparent',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=ateliers-ecritures',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=harcelement',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=boite-aã®nes-pompiers-medicaments',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=informations-efficience',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=cours-sante',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=soutien-suicide',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=batiments-associations',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=isolement-seniors',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=journees-participation',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=precarite-logement',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=produits-bio',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=magasin-vert',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=jardins-toits',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=assistant-fragiles',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=velos',
  'https://bonnes-pratiques.ithea-conseil.fr/?page=decouvrir&id=bourse-permis'
)

# Bouclez sur les URLs et indexez-les.
for (url in urls) {
  response_content <- index_url(url, credentials)
  print(paste("URL:", url))
  print(paste("Response:", response_content))
  Sys.sleep(1) # Exemple : attendre 1 seconde entre chaque requête
}
