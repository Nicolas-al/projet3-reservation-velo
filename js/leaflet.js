class leafletMap {
    constructor(marker) {
        this.lat = 47.21832;
        this.lon = -1.55883;
        this.maCarte = null;
        this.marker = marker;
        this.stations = "";
        this.index = "";
    }
    //---initialisation de la carte---//
    initMap() {
        /*--on créer la carte OpenstreetMap et on l'insèrer dans l'élément HTML qui a l'ID "map"--*/
        this.maCarte = L.map('map').setView([this.lat, this.lon], 11);
        /*--on récupère la carte sur openstreetmap.fr--*/
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
            minZoom: 13,
            maxZoom: 20
        }).addTo(this.maCarte);
        const url = "https://api.jcdecaux.com/vls/v3/stations?contract=Nantes&apiKey=bba69c33611110542c58cebdf773a1f681f70ea3";
        ajaxGet(url, this.displayInfosStations.bind(this));
    }

    displayInfosStations(station) {
        this.stations = JSON.parse(station);
        for (this.index = 0; this.index < this.stations.length; this.index++) {
            this.marker = L.marker([this.stations[this.index].position.latitude, this.stations[this.index].position.longitude]);
            this.addMarker();
            this.addBtnResa();
            //---ajout des informations des stations au clique sur un marqueur---//
            this.marker.addEventListener("click", this.recoversInfosStations.bind(this, this.stations[this.index].name, this.stations[this.index].address, this.stations[this.index].totalStands.availabilities.bikes, this.stations[this.index].totalStands.availabilities.stands));
        }
    }

    addMarker() {
        //---marqueurs Verts pour stations ouverte---//
        if (this.stations[this.index].status === "OPEN" && this.stations[this.index].totalStands.availabilities.bikes > 2) {
            let iconStationValid = L.icon({
                iconUrl: "icones/marqueur_green.png",
                iconSize: [45, 40],
            });
            this.marker = L.marker([this.stations[this.index].position.latitude, this.stations[this.index].position.longitude], {
                icon: iconStationValid
            }).addTo(this.maCarte)
        }
        //---marqueurs orange pour stations ouverte avec moins de 3 velos disponible---//
        else if (this.stations[this.index].status === "OPEN" && this.stations[this.index].totalStands.availabilities.bikes <= 2) {
            let iconStationNotBike = L.icon({
                iconUrl: "icones/marqueur_yellow.png",
                iconSize: [45, 40],
            });
            this.marker = L.marker([this.stations[this.index].position.latitude, this.stations[this.index].position.longitude], {
                icon: iconStationNotBike
            }).addTo(this.maCarte)
        }
        //---marqueurs rouge pour stations fermées---//
        else if (this.stations[i].status = "CLOSED") {
            let iconStationClosed = L.icon({
                iconUrl: "icones/marqueur_red.png",
                iconSize: [45, 40],
            });
            this.marker = L.marker([this.stations[this.index].position.latitude, this.stations[this.index].position.longitude], {
                icon: iconStationClosed
            }).addTo(this.maCarte)
        };
    }

    recoversInfosStations(name, address, velo, places) {
        /*--création des éléments qui contiennent les informations des station--*/
        let spanNomElt = document.getElementById("span_nom");
        let spanAdresseElt = document.getElementById("span_adresse");
        let nomElt = document.getElementById("nom");
        let adresseElt = document.getElementById("adresse");
        let velosElt = document.getElementById("nombre_velos");
        let placesElt = document.getElementById("nombre_places");
        spanNomElt.textContent = "Nom : ";
        spanAdresseElt.textContent = "Adresse : ";
        nomElt.textContent = name;
        adresseElt.textContent = address;
        velosElt.textContent = " :    " + velo;
        placesElt.textContent = " :    " + places;
    }
    addBtnResa() {
        this.marker.addEventListener("click", function () {
            /*--on affiche le bouton réserver quand on clique sur un marqueur--*/
            let btnResa = document.getElementById("btn_resa");
            let btnCancelResa = document.getElementById("btn_cancel_resa")
            let validResa = sessionStorage.getItem("validResa");
            let canvasContainer = sessionStorage.getItem("canvasContainer");
            /*--si aucune resa n'est en cours, on affiche le btn réserver--*/
            if (validResa === null && canvasContainer === null) {
                btnResa.style.opacity = "1";
                btnCancelResa.style.opacity = "0";
            }
            /*--sinon on affiche le btn annuler resa--*/
            else {
                btnResa.style.opacity = "0";
                btnCancelResa.style.right = "6%";
            }
        });
    }
};
let monLeafletMap = new leafletMap;
monLeafletMap.initMap();