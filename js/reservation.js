class Resa {
    constructor(){
        this.min = 0;
        this.sec = 0;
        this.validateButton = document.getElementById("validate_button");
        this.validResa = false;
        this.nomStationElt = document.getElementById("nom");
        this.adresseElt = document.getElementById("adresse");
        this.heure = new Date();
        this.finResaSec = "";
        this.finResaSec1 = new Date().getSeconds() + 20;
        this.finResaSec2 = new Date().getSeconds() - 40;
        this.finResaMin = "";
        this.finResaMin1 = new Date().getMinutes() + 20;
        this.finResaMin2 = new Date().getMinutes() - 40;
        this.finResaMin3 = new Date().getMinutes() + 1;
        this.finResaHours = "";
        this.finResaHours1 = new Date().getHours() + 1;
        this.finResaHours2 = new Date().getHours() - 24;
        this.sectionResaElt = document.getElementById("resa");
        this.infosResaElt = document.getElementById("infos_resa");
        this.heureElt = document.getElementById("heure");
    }
    init() {
        console.log(sessionStorage.getItem("finResaMin2"));
        this.validateButton.addEventListener("click",  this.saveInfosResa.bind(this));           
        this.validateButton.addEventListener("click", this.displayInfosResa.bind(this));    
        let displayHeure = setInterval(this.displayHeure.bind(this), 1000);               
    }
    // enregistre les informations de reservation d'un velo
    saveInfosResa() {
            sessionStorage.setItem("adresse", this.adresseElt.textContent);
            sessionStorage.setItem("nom", this.nomStationElt.textContent);
        if (sessionStorage.length !== 0) { 
     console.log("nicolas");               
        }   
    }
    // fonction d'affichage des information de resa
    displayInfosResa() {
        //définition de l'heure et de l'heure de fin de réservation
        this.heure = new Date();
        this.finResaHours1 = new Date().getHours() + 1;
        this.finResaHours2 = new Date().getHours() - 24;
        this.finResaMin1 = new Date().getMinutes() + 20;
        this.finResaMin2 = new Date().getMinutes() - 40;
        this.finResaMin3 = new Date().getMinutes() + 1;
        this.finResaSec = new Date().getSeconds();
        this.sectionResaElt.style.opacity = 1;
        let dataNom = sessionStorage.getItem("nom");
        let dataAdresse = sessionStorage.getItem("adresse");
        console.log(dataAdresse);
        //on enregistre les infos du dessus dans la session
        sessionStorage.setItem("heure", this.heure);
        sessionStorage.setItem("finResaSec", this.finResaSec);
        sessionStorage.setItem("finResaMin", this.finResaMin);
        sessionStorage.setItem("finResaMin1", this.finResaMin1);
        sessionStorage.setItem("finResaMin2", this.finResaMin2);
        sessionStorage.setItem("finResaMin3", this.finResaMin3);
        sessionStorage.setItem("finResaHours", this.finResaHours);
        sessionStorage.setItem("finResaHours1", this.finResaHours1);
        sessionStorage.setItem("finResaHours2", this.finResaHours2);
        //on récupère les infos enrigistrer dans la session
        let heure = sessionStorage.getItem("heure");
        this.finResaSec = sessionStorage.getItem("finResaSec");
        this.finResaMin = sessionStorage.getItem("finResaMin");
        this.finResaMin1 = sessionStorage.getItem("finResaMin1");
        this.finResaMin2 = sessionStorage.getItem("finResaMin2");
        this.finResaMin3 = sessionStorage.getItem("finResaMin3");
        this.finResaHours = sessionStorage.getItem("finResaHours");
        this.finResaHours1 = sessionStorage.getItem("finResaHours1");
        this.finResaHours2 = sessionStorage.getItem("finResaHours2");
        //conditions pour établir l'heure de fin de réservation
        if (this.heure.getMinutes() > 39) {
            this.finResaMin = this.finResaMin2;
            this.finResaHours = this.finResaHours1;
        }
        else {
            this.finResaMin = this.finResaMin1
        }
        if (this.heure.getHours() > 23 && this.heure.getMinutes() > 39) {
            this.finResaHours = this.finResaHours2;
        }
        else {
            this.finResaHours = new Date().getHours();
        } 
        if (this.heure.getMinutes() === this.finResaMin3 && this.heure.getSeconds() === this.finResaSec){
            console.log("nicolas");
        }
        sessionStorage.setItem("secondes", this.finResa);
        sessionStorage.setItem("minutes", this.heure.getMinutes());
        sessionStorage.setItem("infosResa", this.infosResaElt);
        //récupère l'heure actuelle
        let minutesTimer = sessionStorage.getItem("minutes");
        this.infosResaElt.textContent = "vous avez réservé un velo à la station " + dataNom + " : veuillez vous rendre a(u)" + dataAdresse + " avant " + this.finResaHours + " h " + this.finResaMin + " min " + this.finResaSec + " s !! " + "il sera réservé pendant les 20 prochaines minutes..";
        // affiche l'heure de fin de la réservation        
};

    displayHeure() {
        //affichage de l'heure
        let heureTotal = new Date();
        let secondes = heureTotal.getSeconds();
        let minutes = heureTotal.getMinutes();
        let heures = heureTotal.getHours();
        let heureGMT = heureTotal.toUTCString();
        console.log(this.finResaMin3);
        // fin de la réservation si 20 min se passent
        if (minutes === this.finResaMin3 && secondes === this.finResaSec ) {
            console.log("nicolas");
            sessionStorage.clear();
        }
        if (secondes < 10) {
            secondes = "0" + secondes;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (heures < 10) {
            heures = "0" + heures;
        }
        this.heureElt.textContent = heures + ":" + minutes + ":" + secondes;
    }    
}

 
let maResa = new Resa();
maResa.init();
