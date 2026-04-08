document.addEventListener("DOMContentLoaded", () => {
    // 1. Loader Logic
    const loader = document.querySelector('.loader');
    
    // Fallback: hide loader after 3s max just in case window.load doesn't fire fast
    const loaderTimeout = setTimeout(() => {
        if(loader) loader.classList.add('hidden');
    }, 3000);

    window.addEventListener('load', () => {
        clearTimeout(loaderTimeout);
        if(loader) loader.classList.add('hidden');
    });

    // 2. Intersection Observer for Scroll Animations (Fade-in UP)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% is visible
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animating once
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach((el) => {
        observer.observe(el);
    });

    // 3. Scroll Down Arrow Logic
    const scrollBtn = document.querySelector('.scroll-down');
    if(scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            const detailsSection = document.getElementById('details');
            if(detailsSection) {
                detailsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 4. Music Play/Pause Logic
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    if(musicToggle && bgMusic) {
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
                // Switch back to music note
                musicToggle.querySelector('.icon').textContent = '🎵'; 
            } else {
                // Attempt to play (browser policies might require this inside user gesture)
                bgMusic.play().then(() => {
                    musicToggle.classList.add('playing');
                    // Switch to pause icon
                    musicToggle.querySelector('.icon').innerHTML = '&#10074;&#10074;'; 
                }).catch(err => {
                    console.log("Audio play failed. Ensure a valid audio file is in 'music/wedding_theme.mp3'. Error: ", err);
                    alert("Please add an audio file to 'music/wedding_theme.mp3' first to use the music feature!");
                });
            }
            isPlaying = !isPlaying;
        });
    }
});
