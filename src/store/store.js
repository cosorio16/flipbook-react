import { create } from "zustand";

export const storeGlobal = create((set) => ({
  carrito: [],
  addToCart: (producto) =>
    set((state) => {
      const existingItemIndex = state.carrito.findIndex(
        (item) => item.codigo === producto.codigo
      );

      if (existingItemIndex !== -1) {
        const updatedCarrito = [...state.carrito];
        updatedCarrito[existingItemIndex].cantidad += producto.cantidad;
        return {
          carrito: updatedCarrito,
        };
      }

      return {
        carrito: [...state.carrito, producto],
      };
    }),
  deleteToCart: (producto) =>
    set((state) => ({
      carrito: state.carrito.filter((item) => item.codigo !== producto.codigo),
    })),
  viewStatus: false,
  cartStatus: false,
  showView: () => set((state) => ({ viewStatus: true })),
  hideView: () => set((state) => ({ viewStatus: false })),
  handleCart: () => set((state) => ({ cartStatus: !state.cartStatus })),
  hideCart: () => set((state) => ({ cartStatus: false })),
  currentPage: 0,
  nextPageZustand: () =>
    set((state) => ({ currentPage: state.currentPage + 1 })),
  prevPageZustand: () =>
    set((state) => ({ currentPage: state.currentPage - 1 })),
  goToPageZustand: (e) => set((state) => ({ currentPage: e })),
  handleAmount: (index, cantidad) => {
    set((state) => {
      const updatedCarrito = [...state.carrito];
      updatedCarrito[index].cantidad = cantidad;
      return { carrito: updatedCarrito };
    });
  },
}));
