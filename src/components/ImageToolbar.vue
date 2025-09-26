<template>
  <div v-if="selectedObject && isImageObject" 
       class="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50"
       :style="toolbarStyle">
    <div class="flex items-center space-x-2">
      <!-- Replace Image -->
      <button @click="replaceImage" 
              class="px-3 py-1 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded">
        Replace
      </button>

      <!-- Crop -->
      <button @click="cropImage"
              class="px-3 py-1 text-sm border border-gray-300 hover:bg-gray-100 rounded">
        Crop
      </button>

      <div class="w-px h-6 bg-gray-300"></div>

      <!-- Dimensions -->
      <div class="flex items-center space-x-1">
        <span class="text-xs text-gray-600">W:</span>
        <input v-model.number="imageWidth" @change="updateImageSize"
               type="number" min="10" max="2000"
               class="w-16 text-xs text-center border border-gray-300 rounded px-1 py-1">
      </div>

      <div class="flex items-center space-x-1">
        <span class="text-xs text-gray-600">H:</span>
        <input v-model.number="imageHeight" @change="updateImageSize"
               type="number" min="10" max="2000"
               class="w-16 text-xs text-center border border-gray-300 rounded px-1 py-1">
      </div>

      <!-- Lock Aspect Ratio -->
      <button @click="toggleAspectRatio"
              :class="{ 'bg-blue-100 text-blue-600': lockAspectRatio }"
              class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
        <LockClosedIcon v-if="lockAspectRatio" class="w-4 h-4" />
        <LockOpenIcon v-else class="w-4 h-4" />
      </button>

      <div class="w-px h-6 bg-gray-300"></div>

      <!-- Rotation -->
      <button @click="rotateLeft"
              class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
        <ArrowPathIcon class="w-4 h-4 transform -scale-x-100" />
      </button>

      <button @click="rotateRight"
              class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
        <ArrowPathIcon class="w-4 h-4" />
      </button>

      <!-- Flip -->
      <button @click="flipHorizontal"
              class="px-2 py-1 text-xs hover:bg-gray-100 rounded">
        Flip H
      </button>

      <button @click="flipVertical"
              class="px-2 py-1 text-xs hover:bg-gray-100 rounded">
        Flip V
      </button>

      <div class="w-px h-6 bg-gray-300"></div>

      <!-- Opacity -->
      <div class="flex items-center space-x-1">
        <span class="text-xs text-gray-600">Opacity:</span>
        <input v-model.number="opacity" @input="updateOpacity"
               type="range" min="0" max="100" step="1"
               class="w-16">
        <span class="text-xs text-gray-600 w-8">{{ opacity }}%</span>
      </div>
    </div>

    <!-- Second Row -->
    <div class="flex items-center space-x-2 mt-2 pt-2 border-t border-gray-200">
      <!-- Filters -->
      <div class="flex items-center space-x-1">
        <span class="text-xs text-gray-600">Filter:</span>
        <select v-model="selectedFilter" @change="applyFilter"
                class="text-xs border border-gray-300 rounded px-2 py-1">
          <option value="none">None</option>
          <option value="grayscale">Grayscale</option>
          <option value="sepia">Sepia</option>
          <option value="blur">Blur</option>
          <option value="brightness">Brightness</option>
          <option value="contrast">Contrast</option>
        </select>
      </div>

      <!-- BG Remover -->
      <button @click="removeBackground"
              class="px-3 py-1 text-xs bg-purple-600 text-white hover:bg-purple-700 rounded">
        Remove BG
      </button>

      <div class="w-px h-6 bg-gray-300"></div>

      <!-- Layer Controls -->
      <button @click="bringToFront"
              class="px-2 py-1 text-xs hover:bg-gray-100 rounded">
        Front
      </button>

      <button @click="sendToBack"
              class="px-2 py-1 text-xs hover:bg-gray-100 rounded">
        Back
      </button>

      <button @click="duplicateImage"
              class="px-2 py-1 text-xs hover:bg-gray-100 rounded">
        Duplicate
      </button>

      <button @click="deleteImage"
              class="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded">
        Delete
      </button>
    </div>

    <!-- Hidden file input for image replacement -->
    <input ref="fileInput" type="file" accept="image/*" @change="handleImageReplace" class="hidden">
  </div>
</template>

<script>
import { useCanvasStore } from '@/stores/canvas'
import { 
  LockClosedIcon, 
  LockOpenIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'
import { fabric } from 'fabric'

export default {
  name: 'ImageToolbar',
  components: {
    LockClosedIcon,
    LockOpenIcon,
    ArrowPathIcon
  },
  data() {
    return {
      lockAspectRatio: true,
      selectedFilter: 'none',
      originalAspectRatio: 1
    }
  },
  computed: {
    canvasStore() {
      return useCanvasStore()
    },
    selectedObject() {
      return this.canvasStore.selectedObject
    },
    isImageObject() {
      return this.selectedObject && this.selectedObject.type === 'image'
    },
    toolbarStyle() {
      if (!this.selectedObject) return {}
      
      const canvas = this.canvasStore.canvas
      if (!canvas) return {}

      const obj = this.selectedObject
      const zoom = canvas.getZoom()
      const canvasOffset = canvas.getElement().getBoundingClientRect()
      
      return {
        left: `${canvasOffset.left + (obj.left + obj.width * obj.scaleX / 2) * zoom - 250}px`,
        top: `${canvasOffset.top + obj.top * zoom - 80}px`
      }
    },
    imageWidth: {
      get() { 
        return this.selectedObject ? Math.round(this.selectedObject.width * this.selectedObject.scaleX) : 0 
      },
      set(value) { 
        if (this.lockAspectRatio) {
          const scale = value / this.selectedObject.width
          this.selectedObject.set({ scaleX: scale, scaleY: scale })
        } else {
          this.selectedObject.set({ scaleX: value / this.selectedObject.width })
        }
        this.canvasStore.canvas.renderAll()
      }
    },
    imageHeight: {
      get() { 
        return this.selectedObject ? Math.round(this.selectedObject.height * this.selectedObject.scaleY) : 0 
      },
      set(value) { 
        if (this.lockAspectRatio) {
          const scale = value / this.selectedObject.height
          this.selectedObject.set({ scaleX: scale, scaleY: scale })
        } else {
          this.selectedObject.set({ scaleY: value / this.selectedObject.height })
        }
        this.canvasStore.canvas.renderAll()
      }
    },
    opacity: {
      get() { 
        return this.selectedObject ? Math.round(this.selectedObject.opacity * 100) : 100 
      },
      set(value) { 
        this.selectedObject.set({ opacity: value / 100 })
        this.canvasStore.canvas.renderAll()
      }
    }
  },
  watch: {
    selectedObject: {
      handler(newObj) {
        if (newObj && newObj.type === 'image') {
          this.originalAspectRatio = newObj.width / newObj.height
        }
      },
      immediate: true
    }
  },
  methods: {
    updateImageSize() {
      if (!this.selectedObject) return
      this.canvasStore.canvas.renderAll()
    },
    updateOpacity() {
      if (!this.selectedObject) return
      this.selectedObject.set({ opacity: this.opacity / 100 })
      this.canvasStore.canvas.renderAll()
    },
    toggleAspectRatio() {
      this.lockAspectRatio = !this.lockAspectRatio
    },
    rotateLeft() {
      if (!this.selectedObject) return
      const currentAngle = this.selectedObject.angle || 0
      this.selectedObject.set({ angle: currentAngle - 90 })
      this.canvasStore.canvas.renderAll()
    },
    rotateRight() {
      if (!this.selectedObject) return
      const currentAngle = this.selectedObject.angle || 0
      this.selectedObject.set({ angle: currentAngle + 90 })
      this.canvasStore.canvas.renderAll()
    },
    flipHorizontal() {
      if (!this.selectedObject) return
      this.selectedObject.set({ flipX: !this.selectedObject.flipX })
      this.canvasStore.canvas.renderAll()
    },
    flipVertical() {
      if (!this.selectedObject) return
      this.selectedObject.set({ flipY: !this.selectedObject.flipY })
      this.canvasStore.canvas.renderAll()
    },
    applyFilter() {
      if (!this.selectedObject) return

      // Remove existing filters
      this.selectedObject.filters = []

      if (this.selectedFilter !== 'none') {
        let filter
        switch (this.selectedFilter) {
          case 'grayscale':
            filter = new fabric.Image.filters.Grayscale()
            break
          case 'sepia':
            filter = new fabric.Image.filters.Sepia()
            break
          case 'blur':
            filter = new fabric.Image.filters.Blur({ blur: 0.1 })
            break
          case 'brightness':
            filter = new fabric.Image.filters.Brightness({ brightness: 0.2 })
            break
          case 'contrast':
            filter = new fabric.Image.filters.Contrast({ contrast: 0.2 })
            break
        }
        
        if (filter) {
          this.selectedObject.filters.push(filter)
        }
      }

      this.selectedObject.applyFilters()
      this.canvasStore.canvas.renderAll()
    },
    replaceImage() {
      this.$refs.fileInput.click()
    },
    handleImageReplace(event) {
      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        fabric.Image.fromURL(e.target.result, (img) => {
          // Preserve position and scaling
          const left = this.selectedObject.left
          const top = this.selectedObject.top
          const scaleX = this.selectedObject.scaleX
          const scaleY = this.selectedObject.scaleY
          const angle = this.selectedObject.angle

          // Remove old image
          this.canvasStore.canvas.remove(this.selectedObject)

          // Add new image with same properties
          img.set({
            left,
            top,
            scaleX,
            scaleY,
            angle
          })

          this.canvasStore.canvas.add(img)
          this.canvasStore.canvas.setActiveObject(img)
          this.canvasStore.canvas.renderAll()
        })
      }
      reader.readAsDataURL(file)
    },
    cropImage() {
      // Placeholder for crop functionality
      console.log('Crop image functionality would be implemented here')
    },
    removeBackground() {
      // Placeholder for background removal
      console.log('Background removal functionality would be implemented here')
    },
    bringToFront() {
      this.canvasStore.bringToFront()
    },
    sendToBack() {
      this.canvasStore.sendToBack()
    },
    duplicateImage() {
      this.canvasStore.duplicateSelected()
    },
    deleteImage() {
      this.canvasStore.deleteSelected()
    }
  }
}
</script>
