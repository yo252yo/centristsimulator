
- continue after end
- animate suffering fill the disaster
- onboardign with progressive interface
- unpause on clicker button
- curve strain around 100 million hardcore
- death per second
- scale suffering exchange rate
- favicon
- difficulty menu

- new font  Source Code Pro - regular and bold
- earning animating text
- reorder screen, less boxes

- load images and media in the background
- key/glossary for the hotkeys?



====================== CLicker button
better animation
better look
it doesnt change back to original color when clicked, it stays at the "hover" color so it's not as click-y

====================== Mobile rendering
- bottom of the screen is wrong somehow
- the first purchase is displayed in a different css??

====================== Death engine
Death narrative engine
ideally each death would be its own popup and make you click as many times as there are death


====================== LOOKS-related
clicker visual effect

====================== MUSIC/SFX
for music i can contact https://yearn.bandcamp.com/ from https://www.oselkasound.com/
https://yearn.bandcamp.com/track/near
https://yearn.bandcamp.com/track/jiro-dreams
https://yearn.bandcamp.com/track/always-on

if roz: @hotline.gov, interstellar capitalism, hangover

SFX
- in options for volume test 
- purchase technology 
- upgrade technology
- purchase policy 
- alert bulletin on deaths 
- defeat
- victory
- time tick (metronome?)
- clicker button 


====================== Stretch i dont think we need
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