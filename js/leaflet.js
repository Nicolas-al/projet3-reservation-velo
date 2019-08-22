class leafletMap {
    constructor() {
        this.lat = 47.21832;
        this.lon = -1.55883;
        this.maCarte = null;
        //this.icon = "icones/icons8-marqueur-100 (1).png";

    }
    // Fonction d'initialisation de la carte
    initMap() {
        // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
        this.maCarte = L.map('map').setView([this.lat, this.lon], 11);
        // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            // Il est toujours bien de laisser le lien vers la source des données
            attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
            minZoom: 13,
            maxZoom: 20
        }).addTo(this.maCarte);
        //window.onload(this.initMap());
        const url = "https://api.jcdecaux.com/vls/v3/stations?contract=Nantes&apiKey=bba69c33611110542c58cebdf773a1f681f70ea3";
        ajaxGet( url, this.addMarker.bind(this));
        
    }

    // Fonction d'ajout des marqueurs de stations    
    addMarker(reponse) {
        let stations = JSON.parse(reponse);
        
        //console.log(iconStationValid);
        
        for (let i=0; i < stations.length; i++){
            // Nous ajoutons un marqueur
            let marker = L.marker([stations[i].position.latitude, stations[i].position.longitude]);
            if (stations[i].status === "OPEN" && stations[i].totalStands.availabilities.bikes > 2){
                let iconStationValid = L.icon({
                    iconUrl : "icones/marqueur_green.png",
                    iconSize: [45, 40],

                });
            marker = L.marker([stations[i].position.latitude, stations[i].position.longitude], {icon: iconStationValid}).addTo(this.maCarte)
            } 
            else if (stations[i].status === "OPEN" && stations[i].totalStands.availabilities.bikes <= 2) {
                let iconStationNotBike = L.icon({
                    iconUrl : "icones/marqueur_yellow.png",
                    iconSize: [45, 40],
                });  
                console.log(stations[i].totalStands.availabilities.bikes);

            marker = L.marker([stations[i].position.latitude, stations[i].position.longitude], {icon: iconStationNotBike}).addTo(this.maCarte)
    
            }
            else if (stations[i].status = "CLOSED") {
                let iconStationClosed = L.icon({
                    iconUrl : "icones/marqueur_red.png",
                    iconSize: [45, 40],                    
                });  
            marker = L.marker([stations[i].position.latitude, stations[i].position.longitude], {icon: iconStationClosed}).addTo(this.maCarte)
            }  
            // ajout des informations des stations au clique sur un marqueur
            marker.addEventListener("click", function(){
                // création des éléments qui contiennent les informations des stations

                //let infosMarqueurElt = document.getElementById("infos_marqueurs");
                //let divVelosDispo = document.getElementById("velos_dispo");
                //let divPlacesDispo = document.getElementById("places_dispo")
                let spanNomElt = document.getElementById("span_nom");
                let spanAdresseElt = document.getElementById("span_adresse");
                let nomElt = document.getElementById("nom");
                let adresseElt = document.getElementById("adresse");
                let velosElt = document.getElementById("nombre_velos");
                let placesElt = document.getElementById("nombre_places");
                console.log(spanNomElt);
                spanNomElt.textContent = "Nom : ";
                spanAdresseElt.textContent = "Adresse : ";
                nomElt.textContent = stations[i].name;
                adresseElt.textContent = stations[i].address;
                velosElt.textContent = " :    " + stations[i].totalStands.availabilities.bikes;
                placesElt.textContent = " :    " + stations[i].totalStands.availabilities.stands;
                console.log(nomElt);
                

                //infosMarqueurElt.appendChild(nomElt);
                //infosMarqueurElt.appendChild(adresseElt)
                //divVelosDispo.appendChild(velosElt);
                //divPlacesDispo.appendChild(placesElt);
                      
                });
        }
    }
         
            
         
};
        


let monLeafletMap = new leafletMap;
monLeafletMap.initMap();