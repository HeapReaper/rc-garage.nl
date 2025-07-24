document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("footerYear").innerHTML = (new Date()).getFullYear();

    const slider = document.querySelector('.background-slider');

    const images = [
        '/assets/img/hero/rc-cars-bg.jpg',
        '/assets/img/hero/rc-plane-bg.jpg',
        '/assets/img/hero/dji-drone-bg.jpg',
        '/assets/img/hero/rc-boat-2-bg.png',
        '/assets/img/hero/omp-heli-bg.png',
    ];

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    shuffleArray(images);

    images.forEach((src) => {
        const slide = document.createElement("div");
        slide.style.backgroundImage = `url('${src}')`;
        slider.appendChild(slide);
    });

    let index = 0;
    function slideNext() {
        index = (index + 1) % images.length;
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    setInterval(slideNext, 4000);
})
