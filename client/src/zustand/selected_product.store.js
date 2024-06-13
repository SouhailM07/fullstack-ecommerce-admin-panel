import { create } from "zustand"

const productStore = create((set) => ({
    selectedProduct: [],
    editSelectedProduct: (st) => set({ selectedProduct: st })
}))

export default productStore