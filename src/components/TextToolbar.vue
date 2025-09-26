<template>
  <div v-if="selectedObject && isTextObject" 
       class="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50"
       :style="toolbarStyle">
    <div class="flex items-center space-x-2">
      <!-- Font Family -->
      <select v-model="fontFamily" @change="updateTextProperty('fontFamily', fontFamily)"
              class="text-sm border border-gray-300 rounded px-2 py-1">
        <option value="Arial">Arial</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Georgia">Georgia</option>
        <option value="Verdana">Verdana</option>
        <option value="Courier New">Courier New</option>
      </select>

      <!-- Font Size -->
      <div class="flex items-center space-x-1">
        <button @click="decreaseFontSize" 
                class="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
          <span class="text-xs">A-</span>
        </button>
        <input v-model.number="fontSize" @change="updateTextProperty('fontSize', fontSize)"
               type="number" min="8" max="200"
               class="w-12 text-xs text-center border border-gray-300 rounded px-1 py-1">
        <button @click="increaseFontSize"
                class="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
          <span class="text-xs">A+</span>
        </button>
      </div>

      <div class="w-px h-6 bg-gray-300"></div>

      <!-- Text Formatting -->
      <button @click="toggleBold" 
              :class="{ 'bg-blue-100 text-blue-600': isBold }"
              class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
        <span class="font-bold text-sm">B</span>
      </button>

      <button @click="toggleItalic"
              :class="{ 'bg-blue-100 text-blue-600': isItalic }"
              class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
        <span class="italic text-sm">I</span>
      </button>

      <button @click="toggleUnderline"
              :class="{ 'bg-blue-100 text-blue-600': isUnderline }"
              class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
        <span class="underline text-sm">U</span>
      </button>

      <button @click="toggleStrikethrough"
              :class="{ 'bg-blue-100 text-blue-600': isStrikethrough }"
              class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
        <span class="line-through text-sm">S</span>
      </button>

      <div class="w-px h-6 bg-gray-300"></div>

      <!-- Text Alignment -->
      <button @click="setTextAlign('left')"
              :class="{ 'bg-blue-100 text-blue-600': textAlign === 'left' }"
              class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
        <AlignLeftIcon class="w-4 h-4" />
      </button>

      <button @click="setTextAlign('center')"
              :class="{ 'bg-blue-100 text-blue-600': textAlign === 'center' }"
              class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
        <AlignCenterIcon class="w-4 h-4" />
      </button>

      <button @click="setTextAlign('right')"
              :class="{ 'bg-blue-100 text-blue-600': textAlign === 'right' }"
              class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
        <AlignRightIcon class="w-4 h-4" />
      </button>

      <div class="w-px h-6 bg-gray-300"></div>

      <!-- Text Color -->
      <div class="relative">
        <button @click="showColorPicker = !showColorPicker"
                class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
          <div class="w-4 h-4 rounded border border-gray-300" :style="{ backgroundColor: textColor }"></div>
        </button>
        
        <div v-if="showColorPicker" class="absolute top-full left-0 mt-1 p-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div class="grid grid-cols-8 gap-1 mb-2">
            <button v-for="color in commonColors" :key="color"
                    @click="setTextColor(color)"
                    class="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                    :style="{ backgroundColor: color }">
            </button>
          </div>
          <input v-model="textColor" @change="setTextColor(textColor)"
                 type="color" class="w-full h-8 rounded border border-gray-300">
        </div>
      </div>

      <!-- Text Transform -->
      <select v-model="textTransform" @change="updateTextProperty('textTransform', textTransform)"
              class="text-sm border border-gray-300 rounded px-2 py-1">
        <option value="none">Normal</option>
        <option value="uppercase">UPPERCASE</option>
        <option value="lowercase">lowercase</option>
        <option value="capitalize">Capitalize</option>
      </select>
    </div>

    <!-- Second Row -->
    <div class="flex items-center space-x-2 mt-2 pt-2 border-t border-gray-200">
      <!-- Line Height -->
      <div class="flex items-center space-x-1">
        <span class="text-xs text-gray-600">Line:</span>
        <input v-model.number="lineHeight" @change="updateTextProperty('lineHeight', lineHeight)"
               type="number" min="0.5" max="3" step="0.1"
               class="w-12 text-xs text-center border border-gray-300 rounded px-1 py-1">
      </div>

      <!-- Letter Spacing -->
      <div class="flex items-center space-x-1">
        <span class="text-xs text-gray-600">Letter:</span>
        <input v-model.number="letterSpacing" @change="updateTextProperty('charSpacing', letterSpacing)"
               type="number" min="-50" max="50"
               class="w-12 text-xs text-center border border-gray-300 rounded px-1 py-1">
      </div>

      <!-- Text Shadow -->
      <button @click="toggleTextShadow"
              :class="{ 'bg-blue-100 text-blue-600': hasTextShadow }"
              class="px-2 py-1 text-xs hover:bg-gray-100 rounded">
        Shadow
      </button>
    </div>
  </div>
</template>

<script>
import { useCanvasStore } from '@/stores/canvas'
import { 
  AlignLeftIcon, 
  AlignCenterIcon, 
  AlignRightIcon 
} from '@heroicons/vue/24/outline'

export default {
  name: 'TextToolbar',
  components: {
    AlignLeftIcon,
    AlignCenterIcon,
    AlignRightIcon
  },
  data() {
    return {
      showColorPicker: false,
      commonColors: [
        '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
        '#800000', '#008000', '#000080', '#808000', '#800080', '#008080', '#c0c0c0', '#808080'
      ]
    }
  },
  computed: {
    canvasStore() {
      return useCanvasStore()
    },
    selectedObject() {
      return this.canvasStore.selectedObject
    },
    isTextObject() {
      return this.selectedObject && (
        this.selectedObject.type === 'text' || 
        this.selectedObject.type === 'i-text' ||
        this.selectedObject.type === 'textbox'
      )
    },
    toolbarStyle() {
      if (!this.selectedObject) return {}
      
      const canvas = this.canvasStore.canvas
      if (!canvas) return {}

      const obj = this.selectedObject
      const zoom = canvas.getZoom()
      const canvasOffset = canvas.getElement().getBoundingClientRect()
      
      return {
        left: `${canvasOffset.left + (obj.left + obj.width / 2) * zoom - 200}px`,
        top: `${canvasOffset.top + obj.top * zoom - 80}px`
      }
    },
    fontFamily: {
      get() { return this.selectedObject?.fontFamily || 'Arial' },
      set(value) { this.updateTextProperty('fontFamily', value) }
    },
    fontSize: {
      get() { return this.selectedObject?.fontSize || 24 },
      set(value) { this.updateTextProperty('fontSize', value) }
    },
    textColor: {
      get() { return this.selectedObject?.fill || '#000000' },
      set(value) { this.updateTextProperty('fill', value) }
    },
    textAlign: {
      get() { return this.selectedObject?.textAlign || 'left' },
      set(value) { this.updateTextProperty('textAlign', value) }
    },
    textTransform: {
      get() { return this.selectedObject?.textTransform || 'none' },
      set(value) { this.updateTextProperty('textTransform', value) }
    },
    lineHeight: {
      get() { return this.selectedObject?.lineHeight || 1.2 },
      set(value) { this.updateTextProperty('lineHeight', value) }
    },
    letterSpacing: {
      get() { return this.selectedObject?.charSpacing || 0 },
      set(value) { this.updateTextProperty('charSpacing', value) }
    },
    isBold() {
      return this.selectedObject?.fontWeight === 'bold'
    },
    isItalic() {
      return this.selectedObject?.fontStyle === 'italic'
    },
    isUnderline() {
      return this.selectedObject?.underline === true
    },
    isStrikethrough() {
      return this.selectedObject?.linethrough === true
    },
    hasTextShadow() {
      return this.selectedObject?.shadow !== null
    }
  },
  methods: {
    updateTextProperty(property, value) {
      if (!this.selectedObject || !this.canvasStore.canvas) return
      
      this.selectedObject.set(property, value)
      this.canvasStore.canvas.renderAll()
    },
    increaseFontSize() {
      const newSize = Math.min((this.fontSize || 24) + 2, 200)
      this.updateTextProperty('fontSize', newSize)
    },
    decreaseFontSize() {
      const newSize = Math.max((this.fontSize || 24) - 2, 8)
      this.updateTextProperty('fontSize', newSize)
    },
    toggleBold() {
      const newWeight = this.isBold ? 'normal' : 'bold'
      this.updateTextProperty('fontWeight', newWeight)
    },
    toggleItalic() {
      const newStyle = this.isItalic ? 'normal' : 'italic'
      this.updateTextProperty('fontStyle', newStyle)
    },
    toggleUnderline() {
      this.updateTextProperty('underline', !this.isUnderline)
    },
    toggleStrikethrough() {
      this.updateTextProperty('linethrough', !this.isStrikethrough)
    },
    setTextAlign(align) {
      this.updateTextProperty('textAlign', align)
    },
    setTextColor(color) {
      this.updateTextProperty('fill', color)
      this.showColorPicker = false
    },
    toggleTextShadow() {
      if (this.hasTextShadow) {
        this.updateTextProperty('shadow', null)
      } else {
        this.updateTextProperty('shadow', {
          color: 'rgba(0,0,0,0.3)',
          blur: 5,
          offsetX: 2,
          offsetY: 2
        })
      }
    }
  },
  mounted() {
    // Close color picker when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.showColorPicker = false
      }
    })
  }
}
</script>
