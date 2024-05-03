

let start_year = (new Date()).getFullYear();
let start_ts = (new Date()).getTime();

let s_points = 10;
let s_points_per_year = 1;

let c_points = 0;

let year = 0;
let ms_in_year = 1000;

let difficulty = 1;


let pop_rate_initial = 1000000000 / ((new Date("2024/01/01")).getTime() - (new Date("2013/01/01")).getTime());
let pop = Math.floor(8106672020 + ((new Date()).getTime() - (new Date("2024/05/02")).getTime()) * pop_rate_initial);



function updateHtml() {
    document.getElementById("date").innerHTML = `Year: ${start_year + year}`;
    document.getElementById("s_points").innerHTML = `Sustainability points: ${s_points}$, ${s_points_per_year}$/yr  `;
    document.getElementById("c_points").innerHTML = `Crisis points: ${c_points}`;

    document.getElementById("differencial").innerHTML = `Differential: ${s_points - c_points}`;
    document.getElementById("population").innerHTML = `Population: ${pop}`;

}
setInterval(updateHtml, 500);


function updateValues() {
    year++;
    s_points += s_points_per_year;
    c_points = Math.floor(difficulty * Math.pow(year, 4));
    pop += s_points - c_points;

    if (pop <= 0) {
        alert("LOST");
        location.href = "difficulty.html";
    }
}
setInterval(updateValues, ms_in_year);
