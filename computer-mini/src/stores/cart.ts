import { defineStore } from 'pinia'

export type CartItem = {
  id: number
  title: string
  image: string
  price: number
  qty: number
  selected: boolean
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    totalCount: (s) => s.items.reduce((n, i) => n + i.qty, 0),
    selectedCount: (s) => s.items.filter((i) => i.selected).reduce((n, i) => n + i.qty, 0),
    totalPrice: (s) => s.items.reduce((n, i) => n + i.qty * i.price, 0).toFixed(2),
    selectedPrice: (s) => s.items.filter((i) => i.selected).reduce((n, i) => n + i.qty * i.price, 0).toFixed(2),
    allSelected: (s) => s.items.length > 0 && s.items.every((i) => i.selected),
  },
  actions: {
    add(product: { id: number; title: string; image: string; price: number }, qty = 1) {
      const existing = this.items.find((i) => i.id === product.id)
      if (existing) {
        existing.qty += qty
      } else {
        this.items.push({ ...product, qty, selected: true })
      }
    },
    setQty(id: number, qty: number) {
      const it = this.items.find((i) => i.id === id)
      if (!it) return
      it.qty = Math.max(1, qty)
    },
    inc(id: number) {
      const it = this.items.find((i) => i.id === id)
      if (it) it.qty += 1
    },
    dec(id: number) {
      const it = this.items.find((i) => i.id === id)
      if (!it) return
      it.qty -= 1
      if (it.qty <= 0) this.remove(id)
    },
    toggle(id: number) {
      const it = this.items.find((i) => i.id === id)
      if (it) it.selected = !it.selected
    },
    selectAll(val: boolean) {
      this.items.forEach((i) => (i.selected = val))
    },
    remove(id: number) {
      this.items = this.items.filter((i) => i.id !== id)
    },
    clear() {
      this.items = []
    },
  },
})