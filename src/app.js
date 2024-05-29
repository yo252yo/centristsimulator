
function sfx(name) {
    var audio = new Audio();
    audio.src = `../files/sfx/${name}.ogg`;

    const savedSFXVolume = localStorage.getItem('sfx_volume') || 100;
    if (savedSFXVolume !== null) {
        audio.volume = savedSFXVolume / 100;
    }
    audio.play();

    audio.onended = () => {
        audio.src = '';
        audio.load();
    };
}

var ongoing = false;
function linkSfx(destination) {
    if (ongoing) {
        return;
    }

    if (destination) {
        ongoing = true;
        setTimeout(() => {
            window.location.href = destination;
        }, 300);
    }

    sfx("Link");
}
