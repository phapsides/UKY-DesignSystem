export default class Filters {
    constructor($module) {
        this.$module = $module;

        const filterBody = document.getElementById('filters');
        const filterHeader = document.getElementById('filters-title');

        filterHeader.addEventListener('click', toggleFilters);
        
        function toggleFilters() {
            filterBody.classList.toggle('active');
        }

        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        if (viewportWidth > 1024) {
            filterBody.classList.add("active");
        } 
    
        // Fixed Resize Screen Function
        window.addEventListener('resize', () => {
            if (this.innerWidth > 1024) {
                if (filterBody.classList.contains('active')) {
                    toggleFilters();
                }
            }
        });
    }
}

