export default function useSiteScroll() {
    function activeMenuItem(scroll) {
        const menuItems = document.querySelectorAll('.navigate__link');
        const headerHeight = document.querySelector('header').offsetHeight;
        const checkActivation = (scrl, elTop, elBottom) => { // return Bool
            if (scrl >= elTop && scrl <= elBottom) {
                return true;
            }

            return false;
        };
        const selectElement = (element) => {
            const oldSelect = document.querySelector('.navigate__link--active');

            if (oldSelect) oldSelect.classList.remove('navigate__link--active');

            element.classList.add('navigate__link--active');
            // window.history.pushState(
            //     null,
            //     element.textContent,
            //     element.getAttribute('href'),
            // );
        };

        menuItems.forEach((item) => {
            const el = document.querySelector(item.getAttribute('href'));
            const isSelected = checkActivation(
                scroll,
                el.offsetTop - headerHeight,
                (el.offsetTop + el.offsetHeight) - headerHeight,
            );

            if (isSelected) {
                selectElement(item);
            }
        });
    }

    document.addEventListener('scroll', () => {
        activeMenuItem(window.pageYOffset);
    });
}
