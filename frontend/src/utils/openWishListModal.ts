import * as bootstrap from "bootstrap";

export const openWishlistModal = (): void => {
  const modalElements = document.querySelectorAll(".modal.show");
  modalElements.forEach((modal) => {
    const modalInstance = bootstrap.Modal.getInstance(modal as HTMLElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  });

  // Close any open offcanvas
  const offcanvasElements = document.querySelectorAll(".offcanvas.show");
  offcanvasElements.forEach((offcanvas) => {
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(
      offcanvas as HTMLElement
    );
    if (offcanvasInstance) {
      offcanvasInstance.hide();
    }
  });

  const wishlistElement = document.getElementById("wishlist");
  if (!wishlistElement) return;

  const myModal = new bootstrap.Modal(wishlistElement, {
    keyboard: false,
  });

  myModal.show();

  wishlistElement.addEventListener("hidden.bs.modal", () => {
    myModal.hide();
  });
};
