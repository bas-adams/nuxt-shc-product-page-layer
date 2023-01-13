import { defineStore } from 'pinia'

export const useProductStore = defineStore({
    id: 'product-store',

    state: () => ({
        value: 26,
    }),

    getters: {
        valueWithName: (state) => `Value is ${state.value}`,
    },

    actions: {
        setNewValue(newValue: number) {
            this.value = newValue
        },
    },
})