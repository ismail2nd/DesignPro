<template>
  <aside class="fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-40">
    <div class="flex flex-col h-full">
      <!-- Sidebar Header -->
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">Design Tools</h2>
      </div>

      <!-- Tool Sections -->
      <nav class="flex-1 overflow-y-auto py-4">
        <div class="space-y-2 px-3">
          
          <!-- Templates -->
          <button 
            @click="selectTool('templates')"
            :class="toolButtonClass('templates')"
            class="w-full flex items-center space-x-3 px-3 py-3 text-left rounded-lg transition-colors"
          >
            <DocumentDuplicateIcon class="w-5 h-5" />
            <span>Templates</span>
          </button>

          <!-- Backgrounds -->
          <button 
            @click="selectTool('backgrounds')"
            :class="toolButtonClass('backgrounds')"
            class="w-full flex items-center space-x-3 px-3 py-3 text-left rounded-lg transition-colors"
          >
            <PhotoIcon class="w-5 h-5" />
            <span>Backgrounds</span>
          </button>

          <!-- Uploads -->
          <button 
            @click="selectTool('uploads')"
            :class="toolButtonClass('uploads')"
            class="w-full flex items-center space-x-3 px-3 py-3 text-left rounded-lg transition-colors"
          >
            <CloudArrowUpIcon class="w-5 h-5" />
            <span>Uploads</span>
          </button>

          <!-- Text -->
          <button 
            @click="selectTool('text')"
            :class="toolButtonClass('text')"
            class="w-full flex items-center space-x-3 px-3 py-3 text-left rounded-lg transition-colors"
          >
            <DocumentTextIcon class="w-5 h-5" />
            <span>Text</span>
          </button>

          <!-- Elements -->
          <button 
            @click="selectTool('elements')"
            :class="toolButtonClass('elements')"
            class="w-full flex items-center space-x-3 px-3 py-3 text-left rounded-lg transition-colors"
          >
            <Squares2X2Icon class="w-5 h-5" />
            <span>Elements</span>
          </button>

          <!-- BG Remover -->
          <button 
            @click="selectTool('bgremover')"
            :class="toolButtonClass('bgremover')"
            class="w-full flex items-center space-x-3 px-3 py-3 text-left rounded-lg transition-colors"
          >
            <ScissorsIcon class="w-5 h-5" />
            <span>BG Remover</span>
          </button>
        </div>
      </nav>

      <!-- Tool Content Panel -->
      <div v-if="selectedTool" class="border-t border-gray-200 bg-gray-50 p-4">
        <!-- Templates Panel -->
        <div v-if="selectedTool === 'templates'" class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="font-medium text-gray-900">Templates</h3>
            <input v-model="templateSearch"
                   placeholder="Search..."
                   class="text-xs px-2 py-1 border border-gray-300 rounded w-20">
          </div>

          <div class="space-y-2">
            <button v-for="category in templateCategories" :key="category"
                    @click="filterTemplatesByCategory(category)"
                    :class="{ 'bg-blue-50 text-blue-700': selectedTemplateCategory === category }"
                    class="w-full p-2 text-xs text-left text-gray-700 hover:bg-gray-100 rounded border">
              {{ category }}
            </button>
          </div>

          <div class="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            <div v-for="template in filteredTemplates" :key="template.id"
                 @click="loadTemplate(template)"
                 class="aspect-square bg-gray-100 rounded border-2 border-dashed border-gray-300 hover:border-blue-400 cursor-pointer flex items-center justify-center">
              <span class="text-xs text-gray-600 text-center p-1">{{ template.name }}</span>
            </div>
          </div>
        </div>

        <!-- Backgrounds Panel -->
        <div v-if="selectedTool === 'backgrounds'" class="space-y-3">
          <h3 class="font-medium text-gray-900">Backgrounds</h3>

          <div class="space-y-2">
            <button @click="backgroundType = 'colors'"
                    :class="{ 'bg-blue-50 text-blue-700': backgroundType === 'colors' }"
                    class="w-full p-2 text-sm text-left text-gray-700 hover:bg-gray-100 rounded border">
              Solid Colors
            </button>
            <button @click="backgroundType = 'gradients'"
                    :class="{ 'bg-blue-50 text-blue-700': backgroundType === 'gradients' }"
                    class="w-full p-2 text-sm text-left text-gray-700 hover:bg-gray-100 rounded border">
              Gradients
            </button>
            <button @click="backgroundType = 'upload'"
                    :class="{ 'bg-blue-50 text-blue-700': backgroundType === 'upload' }"
                    class="w-full p-2 text-sm text-left text-gray-700 hover:bg-gray-100 rounded border">
              Upload Image
            </button>
          </div>

          <!-- Colors Grid -->
          <div v-if="backgroundType === 'colors'" class="grid grid-cols-6 gap-1 max-h-32 overflow-y-auto">
            <button v-for="color in assetsStore.backgrounds.colors" :key="color"
                    @click="setCanvasBackground(color)"
                    class="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                    :style="{ backgroundColor: color }">
            </button>
          </div>

          <!-- Gradients Grid -->
          <div v-if="backgroundType === 'gradients'" class="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
            <button v-for="(gradient, index) in assetsStore.backgrounds.gradients" :key="index"
                    @click="setCanvasBackground(gradient)"
                    class="w-full h-8 rounded border border-gray-300 hover:scale-105 transition-transform"
                    :style="{ background: gradient }">
            </button>
          </div>

          <!-- Upload Background -->
          <div v-if="backgroundType === 'upload'">
            <input ref="backgroundUpload" type="file" accept="image/*" @change="handleBackgroundUpload" class="hidden">
            <button @click="$refs.backgroundUpload.click()"
                    class="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-600 hover:border-gray-400">
              Click to upload background
            </button>
          </div>
        </div>

        <!-- Text Panel -->
        <div v-if="selectedTool === 'text'" class="space-y-3">
          <h3 class="font-medium text-gray-900">Text Options</h3>
          <div class="space-y-2">
            <button @click="addText('Your Heading', { fontSize: 32, fontWeight: 'bold' })"
                    class="w-full p-2 text-sm text-left text-gray-700 bg-white hover:bg-gray-100 rounded border">
              Add Heading
            </button>
            <button @click="addText('Your Subheading', { fontSize: 24, fontWeight: '600' })"
                    class="w-full p-2 text-sm text-left text-gray-700 bg-white hover:bg-gray-100 rounded border">
              Add Subheading
            </button>
            <button @click="addText('Your body text goes here', { fontSize: 16 })"
                    class="w-full p-2 text-sm text-left text-gray-700 bg-white hover:bg-gray-100 rounded border">
              Add Body Text
            </button>
            <button @click="addText('Click to edit', { fontSize: 14, fontStyle: 'italic' })"
                    class="w-full p-2 text-sm text-left text-gray-700 bg-white hover:bg-gray-100 rounded border">
              Add Caption
            </button>
          </div>
        </div>

        <!-- Elements Panel -->
        <div v-if="selectedTool === 'elements'" class="space-y-3">
          <h3 class="font-medium text-gray-900">Shapes & Icons</h3>

          <!-- Shapes -->
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-2">Basic Shapes</h4>
            <div class="grid grid-cols-4 gap-2">
              <button v-for="shape in assetsStore.shapes" :key="shape.id"
                      @click="addShape(shape.type)"
                      class="aspect-square p-2 text-gray-700 bg-white hover:bg-gray-100 rounded border flex items-center justify-center">
                <div v-if="shape.type === 'rectangle'" class="w-4 h-3 border border-current"></div>
                <div v-else-if="shape.type === 'circle'" class="w-4 h-4 border border-current rounded-full"></div>
                <div v-else-if="shape.type === 'triangle'" class="w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-current"></div>
                <div v-else-if="shape.type === 'line'" class="w-4 h-px bg-current"></div>
              </button>
            </div>
          </div>

          <!-- Icons -->
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-2">Icons</h4>
            <div class="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
              <button v-for="icon in assetsStore.icons" :key="icon.id"
                      @click="addIcon(icon)"
                      class="aspect-square p-2 text-gray-700 bg-white hover:bg-gray-100 rounded border flex items-center justify-center">
                <div class="w-4 h-4" v-html="icon.svg"></div>
              </button>
            </div>
          </div>
        </div>

        <!-- Uploads Panel -->
        <div v-if="selectedTool === 'uploads'" class="space-y-3">
          <h3 class="font-medium text-gray-900">My Uploads</h3>

          <input ref="fileUpload" type="file" accept="image/*" multiple @change="handleFileUpload" class="hidden">
          <button @click="$refs.fileUpload.click()"
                  class="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-600 hover:border-gray-400">
            Drop files here or click to upload
          </button>

          <div v-if="assetsStore.uploads.length > 0" class="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            <div v-for="upload in assetsStore.recentUploads" :key="upload.id"
                 @click="addUploadToCanvas(upload)"
                 class="relative aspect-square bg-gray-100 rounded border hover:border-blue-400 cursor-pointer overflow-hidden">
              <img :src="upload.dataUrl" :alt="upload.name" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all"></div>
            </div>
          </div>

          <div v-else class="text-center py-4 text-gray-500 text-sm">
            No uploads yet
          </div>
        </div>

        <!-- BG Remover Panel -->
        <div v-if="selectedTool === 'bgremover'" class="space-y-3">
          <h3 class="font-medium text-gray-900">Background Remover</h3>
          <p class="text-sm text-gray-600 mb-4">Select an image on the canvas to remove its background automatically.</p>

          <button v-if="canvasStore.isImageSelected"
                  @click="removeBackground"
                  class="w-full px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg">
            Remove Background
          </button>

          <div v-else class="text-center py-4 text-gray-500 text-sm">
            Select an image first
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import {
  DocumentDuplicateIcon,
  PhotoIcon,
  CloudArrowUpIcon,
  DocumentTextIcon,
  Squares2X2Icon,
  ScissorsIcon
} from '@heroicons/vue/24/outline'
import { useCanvasStore } from '@/stores/canvas'
import { useAssetsStore } from '@/stores/assets'
import { useProjectsStore } from '@/stores/projects'
import { fabric } from 'fabric'

export default {
  name: 'DashboardLeftSidebar',
  components: {
    DocumentDuplicateIcon,
    PhotoIcon,
    CloudArrowUpIcon,
    DocumentTextIcon,
    Squares2X2Icon,
    ScissorsIcon
  },
  setup() {
    const canvasStore = useCanvasStore()
    const assetsStore = useAssetsStore()
    const projectsStore = useProjectsStore()

    return {
      canvasStore,
      assetsStore,
      projectsStore
    }
  },
  data() {
    return {
      selectedTool: 'templates',
      backgroundType: 'colors',
      templateSearch: '',
      selectedTemplateCategory: 'All',
      templateCategories: [
        'All', 'Business', 'Marketing', 'Social', 'Print', 'Web', 'Mobile'
      ]
    }
  },
  computed: {
    filteredTemplates() {
      let templates = this.projectsStore.templates

      if (this.selectedTemplateCategory !== 'All') {
        templates = templates.filter(t => t.category === this.selectedTemplateCategory)
      }

      if (this.templateSearch) {
        templates = templates.filter(t =>
          t.name.toLowerCase().includes(this.templateSearch.toLowerCase())
        )
      }

      return templates
    }
  },
  methods: {
    selectTool(tool) {
      this.selectedTool = this.selectedTool === tool ? null : tool
    },
    toolButtonClass(tool) {
      return this.selectedTool === tool
        ? 'bg-blue-50 text-blue-700 border-blue-200'
        : 'text-gray-700 hover:bg-gray-100'
    },
    filterTemplatesByCategory(category) {
      this.selectedTemplateCategory = category
    },
    loadTemplate(template) {
      if (this.canvasStore.canvas && template.data) {
        this.canvasStore.canvas.loadFromJSON(template.data, () => {
          this.canvasStore.canvas.renderAll()
          this.canvasStore.saveState()
        })
      }
    },
    setCanvasBackground(background) {
      if (!this.canvasStore.canvas) return

      if (background.startsWith('linear-gradient')) {
        // Handle gradient backgrounds
        this.canvasStore.canvas.setBackgroundColor(background, () => {
          this.canvasStore.canvas.renderAll()
        })
      } else {
        // Handle solid colors
        this.canvasStore.canvas.backgroundColor = background
        this.canvasStore.canvas.renderAll()
      }
    },
    handleBackgroundUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        fabric.Image.fromURL(e.target.result, (img) => {
          this.canvasStore.canvas.setBackgroundImage(img, () => {
            this.canvasStore.canvas.renderAll()
          }, {
            scaleX: this.canvasStore.canvasSize.width / img.width,
            scaleY: this.canvasStore.canvasSize.height / img.height
          })
        })
      }
      reader.readAsDataURL(file)
    },
    addText(text, options = {}) {
      this.canvasStore.addText(text, options)
    },
    addShape(shapeType) {
      this.canvasStore.addShape(shapeType)
    },
    addIcon(icon) {
      // Convert SVG to fabric object
      fabric.loadSVGFromString(icon.svg, (objects, options) => {
        const obj = fabric.util.groupSVGElements(objects, options)
        obj.set({
          left: 100,
          top: 100,
          scaleX: 2,
          scaleY: 2,
          fill: '#3b82f6'
        })
        this.canvasStore.canvas.add(obj)
        this.canvasStore.canvas.setActiveObject(obj)
        this.canvasStore.canvas.renderAll()
      })
    },
    async handleFileUpload(event) {
      const files = Array.from(event.target.files)

      for (const file of files) {
        try {
          await this.assetsStore.handleFileUpload(file)
        } catch (error) {
          console.error('Upload failed:', error.message)
        }
      }
    },
    addUploadToCanvas(upload) {
      this.canvasStore.addImage(upload.dataUrl)
    },
    removeBackground() {
      // Placeholder for background removal functionality
      console.log('Background removal would be implemented here')
      // In a real app, this would call an AI service like remove.bg
    }
  },
  mounted() {
    this.assetsStore.loadFromLocalStorage()
  }
}
</script>
