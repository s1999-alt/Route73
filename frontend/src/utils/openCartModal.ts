export const openCartModal = (): void => {
    const bootstrap = require("bootstrap"); // Dynamically import Bootstrap
  
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
  
    const shoppingCartElement = document.getElementById("shoppingCart");
    if (!shoppingCartElement) return;
  
    const myModal = new bootstrap.Modal(shoppingCartElement, {
      keyboard: false,
    });
  
    myModal.show();
  
    shoppingCartElement.addEventListener("hidden.bs.modal", () => {
      myModal.hide();
    });
  };
  