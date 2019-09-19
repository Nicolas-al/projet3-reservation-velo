class Slider {
    constructor() {
        this.slides = document.getElementsByClassName("slides");
        this.slider = document.getElementsByClassName("slider");
        this.arrowLeft = document.getElementById("fa-angle-left");
        this.arrowRight = document.getElementById("fa-angle-right");
        this.pause = document.getElementById("pause");
        this.play = document.getElementById("play");
        this.index = 0;
        this.duration = 4000;
        this.lectureAuto = "";
    };
    init() { 
    this.lectureAuto = setInterval(this.scrollSlides.bind(this), this.duration);  
    this.clickNextImage = this.arrowRight.addEventListener("click", this.goNextImage.bind(this));
    this.clickPreviousImage = this.arrowLeft.addEventListener("click", this.goPreviousImage.bind(this));
    this.clickPlay = this.play.addEventListener("click", this.startSlides.bind(this));
    this.clickPause = this.pause.addEventListener("click", this.stopSlides.bind(this));
    document.addEventListener("keydown", this.clavier.bind(this));
};
    //---délilement des slides---//
    scrollSlides() {
           this.slides[this.index].style.opacity = 0;
           this.index;
           if (this.index < this.slides.length - 1){
               this.index++;
               }
           else {
                this.index = 0;
                }
             this.slides[this.index].style.opacity = 1;
        }
    //---Image suivante---//    
    goNextImage() {
        clearInterval(this.lectureAuto);
        this.slides[this.index].style.opacity = 0;
        this.index++;
        if (this.index > 4){
            this.index = 0;  
        }
        this.slides[this.index].style.opacity = 1;
        this.lectureAuto = setInterval(this.scrollSlides.bind(this), this.duration);
    }
    //---Image précédente---//
    goPreviousImage() {
        clearInterval(this.lectureAuto);
        this.slides[this.index].style.opacity = 0;
        this.index--;
        if (this.index < 0){
            this.index = 4;  
        }
        this.slides[this.index].style.opacity = 1;
        this.lectureAuto = setInterval(this.scrollSlides.bind(this), this.duration);
    }
    //---pause du défilement des slides---//
    stopSlides() {
        clearInterval(this.lectureAuto);
    }
    //---demarrer défilement des slides--//
    startSlides() {
        clearInterval(this.lectureAuto);
        this.lectureAuto = setInterval(this.scrollSlides.bind(this), this.duration);
    }
    //---activer les fonction de slide suivant et précédent avec les touches clavier---//
    clavier(e) {   
        if (e.keyCode === 39){
            this.nextImage(); 
        }
        else if (e.keyCode === 37) {
            this.previousImage();
        };
    };
};   

const monSlider = new Slider();
monSlider.init();

