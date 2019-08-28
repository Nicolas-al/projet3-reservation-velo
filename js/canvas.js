class CanvasObjet {
  constructor( ContainerCanvas ,canvas, BtnClear, BtnValidate) { //Paramètres du canvas
    this.canvasContainer = document.getElementById(ContainerCanvas);
    this.canvas = document.getElementById(canvas);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = "#AD0E16";
    this.ctx.lineWidth = 10;
    this.draw = false;
    this.validSign = "";
    this.mousePosition = {
      x: 0,
      y: 0
    };
    this.clearButton = document.getElementById(BtnClear);
    this.validateButton = document.getElementById(BtnValidate);
    this.canvas.width = 200;
    this.canvas.height = 110;
    this.btnResa = document.getElementById("btn_resa");
    console.log(this.canvas);
    console.log(this.ctx);
  }
  init() { 
    this.btnResa.addEventListener("click", this.displayCanvas.bind(this));
    this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.mouseMove.bind(this));
    window.addEventListener("mouseup", this.mouseUp.bind(this));
    this.clearButton.addEventListener("click", this.clearCanvas.bind(this));
  }
  // affichage de la section canvas 
  displayCanvas() {
       this.canvasContainer.style.opacity = "1";
       this.canvasContainer.style.marginTop = "0px";
       let infosStationsElt = document.getElementById("infos_marqueurs");
       let titreElt = document.getElementById("infos_station");
       titreElt.style.marginTop = "5px";
       titreElt.style.height = "15px";
       let nomElt = document.getElementById("div_nom");
       nomElt.style.marginTop = "Opx";
       let adresseElt = document.getElementById("div_adresse");
       adresseElt.style.marginTop = "5px";
       let placesDispoElt = document.getElementById("places_dispo");
       placesDispoElt.style.marginTop = "10px";
       let VeloDispoElt = document.getElementById("velos_dispo");
       VeloDispoElt.style.marginLeft = "50px";
       VeloDispoElt.style.marginRight = "40px";
       VeloDispoElt.style.marginTop = "10px";
       let titreInfosStationElt = document.getElementById("titre_resa");
       let divVeloPlacesElt = document.createElement("div");
       divVeloPlacesElt.style.display = "flex";
       let nbVelosElt = document.getElementById("nombre_velos");
       nbVelosElt.style.color = "#372F23";
       let nbPlacesElt = document.getElementById("nombre_places");
       nbPlacesElt.style.color = "#372F23";
       //nbVelosNbPlaces.style.color = "black";
       infosStationsElt.removeChild(VeloDispoElt);
       infosStationsElt.removeChild(placesDispoElt);
       infosStationsElt.removeChild(this.btnResa);
       divVeloPlacesElt.appendChild(VeloDispoElt);
       divVeloPlacesElt.appendChild(placesDispoElt);
       this.canvasContainer.insertBefore(divVeloPlacesElt, titreInfosStationElt);

       infosStationsElt.appendChild(this.canvasContainer);
console.log("nicolas");
       
  }
  mouseDown() {
    this.draw = true;
    this.mousePosition = this.getMousePos(event);
    this.ctx.beginPath();
    this.ctx.moveTo(this.mousePosition.x, this.mousePosition.y);
    if (this.mousePosition != 0) {
      this.validateButton.removeAttribute("disabled");
      console.log(this.validSign);
      console.log(this.mousePosition);
    }
  }
  mouseMove() {
    if (this.draw === true) {
    this.mousePosition = this.getMousePos(event);
    //let x = this.mousePosition.x;
    //let y = this.mousePosition.y;
    this.dessiner(this.mousePosition.x, this.mousePosition.y);
  }
};
  mouseUp() {   
    this.draw = false;
  }

  // METHODE: DESSINER
  // -----------------
  dessiner(x, y) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
//---Renvoie les coordonnées de la souris---// 
  getMousePos(event) {
      let oRect = this.canvas.getBoundingClientRect();
      console.log(oRect);
      return {
        x: event.clientX - oRect.left,
        y: event.clientY - oRect.top
      };
      
  }
  
//---fonction de netoyage du canvas---//
  clearCanvas() {
    this.ctx.clearRect(0, 0, 300, 250);
  }
}
const canvas = new CanvasObjet("canvas_container", "canvas", "clear_button", "validate_button");
canvas.init();