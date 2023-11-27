/**
 * This file provides an `initAll` function that will trawl through the page,
 * pick up any modules it knows have associated JS, and will initialise the JS
 * class on that component. It will only do this if the component is explicitly
 * listed here, and only if it finds the component on the page, however it
 * loads the JS for *ALL* components, as they're all imported at once.
 *
 * You can keep JS filesizes small by creating different entry files that only
 * include the components needed for a page or section.
 *
 * This file also exports all component classes so that they can be initialized
 * individually, if necessary.
 *
 * `window.theNamespace.initAll()` (where `theNamespace` is the configured name
 * of the npm package.)
 */

 import "what-input";

 import FontAwesome from "@fortawesome/fontawesome-pro/js/all.js";
 
 import DetailsGroup from "../../components/details-group/details-group";
 import Gallery from "../../components/gallery/gallery";
 import Header from "../../components/header/header";
 import FileUpload from "../../components/file-upload/file-upload";
 import Filters from "../../components/filters/filters";
 import Stepper from "../../components/stepper/stepper";
 import Tab from "../../components/tab/tab";
 import Tooltip from "../../components/tooltip/tooltip";
 
 
 function initAll(options) {
	 options = typeof options !== "undefined" ? options : {};
 
	 // Scope initialization to only certain parts of the page
	 // Defaults to entire document if not set
	 const scope = typeof options.scope !== "undefined" ? options.scope : document;
 
	 scope
		 .querySelectorAll('[data-module="bc-details-group"]')
		 .forEach((module) => {
			 new DetailsGroup(module);
		 });
	 scope
		 .querySelectorAll('[data-module="bc-gallery"]')
		 .forEach((module) => {
			 new Gallery(module);
		 });
	 scope
		 .querySelectorAll('[data-module="bc-header"]')
		 .forEach((module) => {
			 new Header(module);
		 });
	 scope
		 .querySelectorAll('[data-module="bc-filters"]')
		 .forEach((module) => {
			 new Filters(module);
		 });
	 scope
		 .querySelectorAll('[data-module="bc-file-upload"]')
		 .forEach((module) => {
			 new FileUpload(module);
		 });
	 scope
		 .querySelectorAll('[data-module="bc-stepper"]')
		 .forEach((module) => {
			 new Stepper(module);
		 });
	 scope
		 .querySelectorAll('[data-module="bc-tab"]')
		 .forEach((module) => {
			 new Tab(module);
		 });
	 scope
		 .querySelectorAll('[data-module="bc-tooltip"]')
		 .forEach((module) => {
			 new Tooltip(module);
		 });
 }
 
 export { 
	 initAll, 
	 /* Pass-through vendors */
	 FontAwesome,
	 /* Components */
	 DetailsGroup,
	 FileUpload,
	 Filters,
	 Gallery,
	 Header,
	 Stepper,
	 Tab,
	 Tooltip 
 };
 
