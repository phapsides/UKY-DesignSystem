export default class Header {
    constructor($module) {
        this.$module = $module;
        
        const navbarMenu = document.getElementById('navbar');
        const burgerMenu = document.getElementById('burger');
        const closeButton = document.getElementById('close');
        const overlayMenu = document.getElementById('overlay');
        const openFlyout = document.getElementById('open-flyout');
        const closeFlyout = document.getElementById('close-flyout');
        const flyout = document.getElementById('flyout');
    
        burgerMenu.addEventListener('click', toggleMenu);
        closeButton.addEventListener('click', toggleMenu);
        overlayMenu.addEventListener('click', toggleMenu);
        openFlyout.addEventListener('click', toggleShare);
        closeFlyout.addEventListener('click', toggleShare);

        function toggleMenu() {
            navbarMenu.classList.toggle('active');
            overlayMenu.classList.toggle('active');
        }
        function toggleShare() {
            openFlyout.classList.toggle('hide');
            flyout.classList.toggle('active');
        }
        
        function collapseSubMenu() {
            const $coll = document.querySelectorAll('[data-toggle]');
            let $i;

            for ($i = 0; $i < $coll.length; $i++) {
                $coll[$i].addEventListener('click', function() {
                    this.classList.toggle('active');
                    const content = this.children[1];
                    content.classList.toggle('active');
                });
            }   
        }          

        // Fixed Resize Screen Function
        window.addEventListener('resize', () => {
            if (this.innerWidth > 1024) {
                // If navbarMenu is Open, then Close It
                if (navbarMenu.classList.contains('active')) {
                    toggleMenu();
                }
                if (flyout.classList.contains('active')) {
                    toggleShare();
                }
            }
        });

        collapseSubMenu();
        
    }
}