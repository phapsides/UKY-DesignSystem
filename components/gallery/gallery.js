export default class Gallery {
	constructor($module) {
		this.$module = $module;

		const activeImage = document.querySelector(
			".bc-gallery__product-image .active"
		);
		const productImages = document.querySelectorAll(
			".bc-gallery__image-list img"
		);

		function changeImage(e) {
			activeImage.src = e.target.src;
		}

		productImages.forEach((image) =>
			image.addEventListener("click", changeImage)
		);
	}
}
