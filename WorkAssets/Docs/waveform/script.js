document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.querySelector('.play-btn');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');

    let isPlaying = false;

    playBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;

        if (isPlaying) {
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        } else {
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        }
    });
});