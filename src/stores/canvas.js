import { defineStore } from 'pinia'
import { fabric } from 'fabric'

export const useCanvasStore = defineStore('canvas', {
  state: () => ({
    canvas: null,
    selectedObject: null,
    history: {
      states: [],
      currentIndex: -1,
      maxStates: 50
    },
    zoom: 1,
    canvasSize: {
      width: 800,
      height: 600
    },
    isGridVisible: false,
    snapToGrid: true,
    gridSize: 20
  }),

  getters: {
    canUndo: (state) => state.history.currentIndex > 0,
    canRedo: (state) => state.history.currentIndex < state.history.states.length - 1,
    selectedObjectType: (state) => {
      if (!state.selectedObject) return null
      return state.selectedObject.type
    },
    isTextSelected: (state) => {
      return state.selectedObject && (
        state.selectedObject.type === 'text' || 
        state.selectedObject.type === 'i-text' ||
        state.selectedObject.type === 'textbox'
      )
    },
    isImageSelected: (state) => {
      return state.selectedObject && state.selectedObject.type === 'image'
    }
  },

  actions: {
    initCanvas(canvasElement) {
      this.canvas = new fabric.Canvas(canvasElement, {
        width: this.canvasSize.width,
        height: this.canvasSize.height,
        backgroundColor: '#ffffff',
        selection: true,
        preserveObjectStacking: true
      })

      // Set up event listeners
      this.setupEventListeners()
      
      // Save initial state
      this.saveState()
    },

    setupEventListeners() {
      if (!this.canvas) return

      // Selection events
      this.canvas.on('selection:created', (e) => {
        this.selectedObject = e.selected[0]
      })

      this.canvas.on('selection:updated', (e) => {
        this.selectedObject = e.selected[0]
      })

      this.canvas.on('selection:cleared', () => {
        this.selectedObject = null
      })

      // Object modification events
      this.canvas.on('object:modified', () => {
        this.saveState()
      })

      this.canvas.on('object:added', () => {
        this.saveState()
      })

      this.canvas.on('object:removed', () => {
        this.saveState()
      })
    },

    saveState() {
      if (!this.canvas) return

      const state = JSON.stringify(this.canvas.toJSON())
      
      // Remove states after current index
      this.history.states = this.history.states.slice(0, this.history.currentIndex + 1)
      
      // Add new state
      this.history.states.push(state)
      this.history.currentIndex++
      
      // Limit history size
      if (this.history.states.length > this.history.maxStates) {
        this.history.states.shift()
        this.history.currentIndex--
      }
    },

    undo() {
      if (!this.canUndo || !this.canvas) return

      this.history.currentIndex--
      const state = this.history.states[this.history.currentIndex]
      
      this.canvas.loadFromJSON(state, () => {
        this.canvas.renderAll()
        this.selectedObject = null
      })
    },

    redo() {
      if (!this.canRedo || !this.canvas) return

      this.history.currentIndex++
      const state = this.history.states[this.history.currentIndex]
      
      this.canvas.loadFromJSON(state, () => {
        this.canvas.renderAll()
        this.selectedObject = null
      })
    },

    setZoom(zoomLevel) {
      if (!this.canvas) return
      
      this.zoom = zoomLevel
      this.canvas.setZoom(zoomLevel / 100)
      this.canvas.renderAll()
    },

    zoomIn() {
      const newZoom = Math.min(this.zoom + 25, 400)
      this.setZoom(newZoom)
    },

    zoomOut() {
      const newZoom = Math.max(this.zoom - 25, 25)
      this.setZoom(newZoom)
    },

    resetZoom() {
      this.setZoom(100)
    },

    addText(text = 'Add your text here', options = {}) {
      if (!this.canvas) return

      const textObj = new fabric.IText(text, {
        left: 100,
        top: 100,
        fontFamily: 'Arial',
        fontSize: 24,
        fill: '#000000',
        ...options
      })

      this.canvas.add(textObj)
      this.canvas.setActiveObject(textObj)
      this.canvas.renderAll()
    },

    addImage(imageUrl, options = {}) {
      if (!this.canvas) return

      fabric.Image.fromURL(imageUrl, (img) => {
        img.set({
          left: 100,
          top: 100,
          scaleX: 0.5,
          scaleY: 0.5,
          ...options
        })

        this.canvas.add(img)
        this.canvas.setActiveObject(img)
        this.canvas.renderAll()
      })
    },

    addShape(shapeType, options = {}) {
      if (!this.canvas) return

      let shape
      const defaultOptions = {
        left: 100,
        top: 100,
        fill: '#3b82f6',
        stroke: '#1e40af',
        strokeWidth: 2,
        ...options
      }

      switch (shapeType) {
        case 'rectangle':
          shape = new fabric.Rect({
            width: 100,
            height: 80,
            ...defaultOptions
          })
          break
        case 'circle':
          shape = new fabric.Circle({
            radius: 50,
            ...defaultOptions
          })
          break
        case 'triangle':
          shape = new fabric.Triangle({
            width: 100,
            height: 100,
            ...defaultOptions
          })
          break
        case 'line':
          shape = new fabric.Line([0, 0, 100, 0], {
            stroke: '#000000',
            strokeWidth: 2,
            ...defaultOptions
          })
          break
      }

      if (shape) {
        this.canvas.add(shape)
        this.canvas.setActiveObject(shape)
        this.canvas.renderAll()
      }
    },

    deleteSelected() {
      if (!this.canvas || !this.selectedObject) return

      this.canvas.remove(this.selectedObject)
      this.selectedObject = null
      this.canvas.renderAll()
    },

    duplicateSelected() {
      if (!this.canvas || !this.selectedObject) return

      this.selectedObject.clone((cloned) => {
        cloned.set({
          left: cloned.left + 20,
          top: cloned.top + 20
        })
        this.canvas.add(cloned)
        this.canvas.setActiveObject(cloned)
        this.canvas.renderAll()
      })
    },

    bringToFront() {
      if (!this.canvas || !this.selectedObject) return
      this.canvas.bringToFront(this.selectedObject)
      this.canvas.renderAll()
    },

    sendToBack() {
      if (!this.canvas || !this.selectedObject) return
      this.canvas.sendToBack(this.selectedObject)
      this.canvas.renderAll()
    },

    clearCanvas() {
      if (!this.canvas) return
      this.canvas.clear()
      this.canvas.backgroundColor = '#ffffff'
      this.selectedObject = null
      this.saveState()
    },

    exportCanvas(format = 'png', quality = 1) {
      if (!this.canvas) return null

      switch (format.toLowerCase()) {
        case 'png':
          return this.canvas.toDataURL('image/png')
        case 'jpeg':
        case 'jpg':
          return this.canvas.toDataURL('image/jpeg', quality)
        case 'svg':
          return this.canvas.toSVG()
        default:
          return this.canvas.toDataURL('image/png')
      }
    }
  }
})
