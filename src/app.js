
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

function checkSettings() {
    const savedFlicker = localStorage.getItem('setting_flicker');
    if (savedFlicker == undefined) {
        return; //default state
    } else if (savedFlicker == "true") {
        if (document.getElementsByClassName("screenflicker_unpaused").length + document.getElementsByClassName("screenflicker_paused").length > 0) {
            return;
        }
        for (var e of document.getElementsByClassName("screenfilter_unpaused")) {
            e.classList.add("screenflicker_unpaused");
        }
        for (var e of document.getElementsByClassName("screenfilter_paused")) {
            e.classList.add("screenflicker_paused");
        }
    } else {
        for (var e of document.getElementsByClassName("screenflicker_unpaused")) {
            e.classList.remove("screenflicker_unpaused");
        }
        for (var e of document.getElementsByClassName("screenflicker_paused")) {
            e.classList.remove("screenflicker_paused");
        }
    }
}
checkSettings();
setInterval(checkSettings, 350);