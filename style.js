
var colors = ['#171c16', '#151a14'];
var colors_index = 0;


function changeBodyColor() {
    document.body.style.backgroundColor = colors[colors_index];
    colors_index = (colors_index + 1) % colors.length;
}

changeBodyColor();

setInterval(changeBodyColor, 100);