const greeting: string = "Hola!";
showAlert(greeting);

document.addEventListener('DOMContentLoaded', function () {
    const linkIdentifiers = ['firstStyle', 'secondStyle', 'thirdStyle'];

    const styleLinks = linkIdentifiers.map(id => document.getElementById(id) as HTMLAnchorElement);

    initializeVisibleStyles(); // Inicjalizacja widocznych stylów na początku

    styleLinks.forEach((styleLink, index) => {
        styleLink?.addEventListener('click', function (event) {
            event.preventDefault();
            applyNewStyles(`style${index + 1}.css`);
            displayStyles(styleLink);
            const visibleStyles = initializeVisibleStyles();
            updateStylesContainer(visibleStyles);
        });
    });

    function applyNewStyles(styleSheet: string) {
        const linkElement = document.querySelector('link[rel="stylesheet"]');
        if (linkElement) {
            linkElement.setAttribute('href', `./css/${styleSheet}`);
        }
    }

    function displayStyles(activeStyle: HTMLAnchorElement) {
        styleLinks.forEach(styleLink => {
            if (styleLink !== activeStyle) {
                styleLink.style.display = 'inline-block';
            } else styleLink.style.display = 'none';
        });
    }

    function initializeVisibleStyles() {
        const visibleStyles = styleLinks.map(styleLink => `<a href="#" id="${styleLink.id}">${styleLink.innerText}</a>`)
            .join(' OR ');

        return visibleStyles;
    }

    function updateStylesContainer(styles: string) {
        const stylesContainer = document.getElementById('styles-container');
        if (stylesContainer) {
            stylesContainer.innerHTML = styles;
        }
    }
});

function showAlert(message: string): void {
    alert(message);
}
