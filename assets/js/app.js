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

    async function updateStatus() {
        try {
            const res = await fetch('https://blibblop-api.rc-garage.nl/user-statussen');
            const data = await res.json();

            const users = [
                {
                    id: '632677231113666601', // HeapReaper
                    element: document.getElementById('status-indicator-1'),
                },
                {
                    id: '321272615052378113', // TheGhostOfChaos
                    element: document.getElementById('status-indicator-2'),
                },
                {
                    id: '1350816171741417563', // BlipBlop
                    element: document.getElementById('status-indicator-3'),
                },
            ];

            users.forEach(({ id, element }) => {
                if (!element || !data[id]) return;

                const status = data[id].status;
                const lastChecked = data[id].lastChecked;

                element.classList.remove('status-online', 'status-offline', 'status-idle');

                switch (status) {
                    case 'online':
                        element.classList.add('status-online');
                        break;
                    case 'idle':
                        element.classList.add('status-idle');
                        break;
                    default:
                        element.classList.add('status-offline');
                }

                element.title = `Discord status: ${status}. Last checked: ${lastChecked}`;
            });
        } catch (err) {
            console.error('Error fetching status:', err);
        }
    }

    void updateStatus();

    setInterval(updateStatus, 29 * 1000);
})
