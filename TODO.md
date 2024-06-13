- indicate that youre not expected to win on your first try
- color dollars signs, green for signaling red for strain

======================





- wikidata narrative engine
- Can I get a list of alive ppl from Wikipedia? Not even sure it'd be worth it 


this is jobs


function getOccupations() {
    const url = 'https://query.wikidata.org/sparql?query=' +
        encodeURIComponent(`
        SELECT ?item ?itemLabel WHERE {
          ?item wdt:P31 wd:Q28640;  # Instances of occupation (Q28640)
                wdt:P279* wd:Q12737077.  # Subclasses of profession (Q12737077)
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        } LIMIT 10000
    `) + '&format=json';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                const occupations = data.results.bindings.map(binding => binding.itemLabel.value);

                console.log('Potential occupations:', occupations);
            } catch (error) {
                console.error('Error parsing response:', error);
            }
        } else if (xhr.readyState === 4) {
            console.error('Error fetching occupations from Wikidata:', xhr.statusText);
        }
    };

    xhr.send();
}

getOccupations();




function getActivities() {
    const url = 'https://query.wikidata.org/sparql?query=' +
        encodeURIComponent(`
        SELECT ?item ?itemLabel WHERE {
          ?item wdt:P3095 ?person.
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        } LIMIT 100
    `) + '&format=json';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                const activities = data.results.bindings.map(binding => binding.itemLabel.value);

                console.log('Potential activities:', activities);
            } catch (error) {
                console.error('Error parsing response:', error);
            }
        } else if (xhr.readyState === 4) {
            console.error('Error fetching activities from Wikidata:', xhr.statusText);
        }
    };

    xhr.send();
}

getActivities();


====================== Stretch i dont think we need
difficulty, choice and title could look better
load images and media in the background

save/load system for the game
change options during the game

====================== Stylize tooltips??

    <Script>

        document.addEventListener('DOMContentLoaded', () => {
            const elementsWithTitle = document.querySelectorAll('[title]');

            elementsWithTitle.forEach(element => {
                const titleText = element.getAttribute('title');
                element.removeAttribute('title'); // Remove native title to avoid default browser tooltip

                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.innerText = titleText;
                document.body.appendChild(tooltip);

                element.addEventListener('mouseover', () => {
                    const rect = element.getBoundingClientRect();
                    tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
                    tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight}px`;
                    tooltip.style.visibility = 'visible';
                    tooltip.style.opacity = '1';
                });

                element.addEventListener('mouseout', () => {
                    tooltip.style.visibility = 'hidden';
                    tooltip.style.opacity = '0';
                });

                element.addEventListener('mousemove', (event) => {
                    const rect = element.getBoundingClientRect();
                    tooltip.style.left = `${event.pageX}px`;
                    tooltip.style.top = `${event.pageY - tooltip.offsetHeight - 10}px`;
                });
            });
        });

    </Script>

    <style>
        .tooltip {
            position: absolute;
            background-color: black;
            color: white;
            padding: 5px;
            border-radius: 5px;
            white-space: nowrap;
            z-index: 1000;
            visibility: hidden;
            opacity: 0;
            transition: opacity 0.3s;
        }

        .tooltip::after {
            content: '';
            position: absolute;
            border-width: 5px;
            border-style: solid;
            border-color: black transparent transparent transparent;
        }
    </style>
