const slideImages = document.querySelectorAll("img");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const container = document.querySelector(".slide-container");
const dotsContainer = document.querySelector('.dots-container');

const slidesCount = slideImages.length;
const slideCount = slidesCount;

let counter = 0;
let isAnimating = false;
let deletInterval;

next.addEventListener("click", slideNext);
prev.addEventListener("click", slidePrev);

for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dotsContainer.appendChild(dot);
}

dotsContainer.children[0].classList.add('active');

const dots = document.querySelectorAll(".dot");

dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
        if (isAnimating || index === counter) return;
        slideTo(index);
    });
});

function indicators() {
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[counter].className += " active";
}

function slideNext() {
    if (isAnimating) return;
    const currentImage = slideImages[counter];
    const nextIndex = counter === slideImages.length - 1 ? 0 : counter + 1;
    const nextImage = slideImages[nextIndex];

    currentImage.style.left = "0%";
    nextImage.style.left = "100%";

    let currentLeft = 0;
    let nextLeft = 100;

    isAnimating = true;

    const animationInterval = setInterval(() => {
        currentLeft -= 2;
        nextLeft -= 2;

        currentImage.style.left = currentLeft + "%";
        nextImage.style.left = nextLeft + "%";

        if (currentLeft <= -100 && nextLeft <= 0) {
            clearInterval(animationInterval);
            isAnimating = false;
            counter = nextIndex;
            indicators();
        }
    }, 10);
}

function slidePrev() {
    if (isAnimating) return;
    const currentImage = slideImages[counter];
    const prevIndex = counter === 0 ? slideImages.length - 1 : counter - 1;
    const prevImage = slideImages[prevIndex];

    currentImage.style.left = "0%";
    prevImage.style.left = "-100%";

    let currentLeft = 0;
    let prevLeft = -100;

    isAnimating = true;

    const animationInterval = setInterval(() => {
        currentLeft += 2;
        prevLeft += 2;

        currentImage.style.left = currentLeft + "%";
        prevImage.style.left = prevLeft + "%";

        if (currentLeft >= 100 && prevLeft >= 0) {
            clearInterval(animationInterval);
            isAnimating = false;
            counter = prevIndex;
            indicators();
        }
    }, 10);
}

function slideTo(index) {
    if (isAnimating || index === counter) return;

    const currentImage = slideImages[counter];
    const targetImage = slideImages[index];

    const direction = index > counter ? 1 : -1;

    currentImage.style.left = "0%";
    targetImage.style.left = direction === 1 ? "100%" : "-100%";

    let currentLeft = 0;
    let targetLeft = direction === 1 ? 100 : -100;

    isAnimating = true;

    const animationInterval = setInterval(() => {
        currentLeft -= 2 * direction;
        targetLeft -= 2 * direction;

        currentImage.style.left = currentLeft + "%";
        targetImage.style.left = targetLeft + "%";

        if ((direction === 1 && currentLeft <= -100 && targetLeft <= 0) || 
            (direction === -1 && currentLeft >= 100 && targetLeft >= 0)) {
            clearInterval(animationInterval);
            isAnimating = false;
            counter = index;
            indicators();
        }
    }, 10);
}