import { create } from "zustand"

const confirmStore = create((set) => ({
    confirmation: false,
    productId: "",
    setProductId: (st) => set({ productId: st }),
    setConfirmation: (st) => set({ confirmation: st })
}))

export default confirmStore