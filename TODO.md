


options menu for audio and to deactivate death and have a centrist mode etc...
tooltip on mouseover

== > balance check

====================== Death engine
Death narrative engine
ideally each death would be its own popup and make you click as many times as there are death


====================== LOOKS-related
look overhaul
tutorial/onboarding
mb add scroll to markets?
mobile version


====================== MUSIC/SFX
for music i can contact https://yearn.bandcamp.com/ from https://www.oselkasound.com/
https://yearn.bandcamp.com/track/near
https://yearn.bandcamp.com/track/jiro-dreams
https://yearn.bandcamp.com/track/always-on

if roz: @hotline.gov, interstellar capitalism, hangover


====================== Stretch i dont think we need
save/load system for the game
change options during the game


====================== Stylize tooltips:"

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