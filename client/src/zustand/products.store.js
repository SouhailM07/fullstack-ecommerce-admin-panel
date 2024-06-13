import { create } from "zustand"

const productsStore = create((set) => ({
    products: [],
    setProducts: (st) => set({ products: st })
}))

export default productsStore