import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useManagersStore = defineStore('managers', {
  state: () => ({
    managers: useStorage('managers', [])
  }),
  actions: {
    async getManagers() {
      this.managers = await fetch('/data/managers.json').then((res) => (res.ok ? res.json() : []))
    },
    removeManager(id) {
      const index = this.managers.findIndex((manager) => manager.id === id)

      if (index !== -1) {
        this.managers.splice(index, 1)
      }
    },
    updateManager(id, manager) {
      this.managers[id] = manager
    },
    createManager(manager) {
      this.managers.push({ ...manager, id: crypto.randomUUID() })
    }
  }
})
