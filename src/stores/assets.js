import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useAssetsStore = defineStore('assets', {
  state: () => ({
    uploads: [],
    backgrounds: {
      colors: [
        '#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8',
        '#64748b', '#475569', '#334155', '#1e293b', '#0f172a', '#000000',
        '#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444',
        '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d', '#450a0a', '#fef7ec',
        '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#dc2626',
        '#c2410c', '#9a3412', '#7c2d12', '#431407', '#fffbeb', '#fef3c7',
        '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309',
        '#92400e', '#78350f', '#451a03', '#f0fdf4', '#dcfce7', '#bbf7d0',
        '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534',
        '#14532d', '#052e16', '#ecfdf5', '#d1fae5', '#a7f3d0', '#6ee7b7',
        '#34d399', '#10b981', '#059669', '#047857', '#065f46', '#064e3b',
        '#022c22', '#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf',
        '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a', '#042f2e'
      ],
      gradients: [
        'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(45deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(45deg, #ff9a9e 0%, #fecfef 100%)',
        'linear-gradient(45deg, #ffecd2 0%, #fcb69f 100%)',
        'linear-gradient(45deg, #ff8a80 0%, #ea6100 100%)',
        'linear-gradient(45deg, #667db6 0%, #0082c8 100%)',
        'linear-gradient(45deg, #f8cdda 0%, #1d2b64 100%)',
        'linear-gradient(45deg, #89f7fe 0%, #66a6ff 100%)'
      ]
    },
    shapes: [
      { id: 'rectangle', name: 'Rectangle', type: 'rectangle' },
      { id: 'circle', name: 'Circle', type: 'circle' },
      { id: 'triangle', name: 'Triangle', type: 'triangle' },
      { id: 'line', name: 'Line', type: 'line' }
    ],
    icons: [
      { id: 'heart', name: 'Heart', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>' },
      { id: 'star', name: 'Star', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' },
      { id: 'arrow-right', name: 'Arrow Right', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' },
      { id: 'check', name: 'Check', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>' },
      { id: 'x', name: 'X', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>' },
      { id: 'plus', name: 'Plus', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>' }
    ]
  }),

  getters: {
    getUploadById: (state) => (id) => {
      return state.uploads.find(upload => upload.id === id)
    },
    getUploadsByType: (state) => (type) => {
      return state.uploads.filter(upload => upload.type === type)
    },
    recentUploads: (state) => {
      return state.uploads
        .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
        .slice(0, 12)
    }
  },

  actions: {
    addUpload(file, dataUrl) {
      const upload = {
        id: uuidv4(),
        name: file.name,
        type: file.type,
        size: file.size,
        dataUrl,
        uploadedAt: new Date().toISOString()
      }

      this.uploads.push(upload)
      this.saveToLocalStorage()
      
      return upload
    },

    deleteUpload(uploadId) {
      const index = this.uploads.findIndex(u => u.id === uploadId)
      if (index !== -1) {
        this.uploads.splice(index, 1)
        this.saveToLocalStorage()
      }
    },

    duplicateUpload(uploadId) {
      const upload = this.getUploadById(uploadId)
      if (upload) {
        const duplicate = {
          ...upload,
          id: uuidv4(),
          name: `${upload.name} Copy`,
          uploadedAt: new Date().toISOString()
        }
        this.uploads.push(duplicate)
        this.saveToLocalStorage()
        return duplicate
      }
    },

    renameUpload(uploadId, newName) {
      const upload = this.getUploadById(uploadId)
      if (upload) {
        upload.name = newName
        this.saveToLocalStorage()
      }
    },

    async handleFileUpload(file) {
      return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
          reject(new Error('Only image files are supported'))
          return
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          reject(new Error('File size must be less than 10MB'))
          return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
          const upload = this.addUpload(file, e.target.result)
          resolve(upload)
        }
        reader.onerror = () => {
          reject(new Error('Failed to read file'))
        }
        reader.readAsDataURL(file)
      })
    },

    loadFromLocalStorage() {
      try {
        const saved = localStorage.getItem('designpro-assets')
        if (saved) {
          const data = JSON.parse(saved)
          this.uploads = data.uploads || []
        }
      } catch (error) {
        console.error('Failed to load assets from localStorage:', error)
      }
    },

    saveToLocalStorage() {
      try {
        const data = {
          uploads: this.uploads
        }
        localStorage.setItem('designpro-assets', JSON.stringify(data))
      } catch (error) {
        console.error('Failed to save assets to localStorage:', error)
      }
    }
  }
})
