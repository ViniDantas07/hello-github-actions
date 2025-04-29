let slideIndex = 0;  
let intervalo;       
function mostrarSlide() {
    let slides = document.querySelectorAll('.carrossel-imagem'); 

    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    let container = document.querySelector('.carrossel-principal');
    container.style.transform = `translateX(-${slideIndex * 100}%)`;

}

function mudarSlide() {
    slideIndex++; 
    mostrarSlide();  
}

function playCarrossel() {
    intervalo = setInterval(mudarSlide, 1500);  
}

function pauseCarrossel() {
    clearInterval(intervalo); 
}

playCarrossel();

let carrosselElement = document.getElementById("carrossel");
carrosselElement.addEventListener("mouseover", pauseCarrossel); 
carrosselElement.addEventListener("mouseout", playCarrossel);  

const btnMobile = document.getElementById('btn-mobile');

function toggleMenu() {
  const nav = document.getElementById('nav'); 
  nav.classList.toggle('active');
}

btnMobile.addEventListener('click', toggleMenu);
