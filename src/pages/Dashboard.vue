<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Topbar -->
    <DashboardTopbar />
    
    <div class="flex pt-16">
      <!-- Left Sidebar -->
      <DashboardLeftSidebar />
      
      <!-- Main Canvas Area -->
      <main class="flex-1 ml-64 mr-64 p-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 h-full min-h-[600px]">
          <!-- Canvas Toolbar -->
          <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <div class="flex items-center space-x-4">
              <!-- Undo/Redo -->
              <button @click="undo"
                      :disabled="!canvasStore.canUndo"
                      :class="{ 'opacity-50 cursor-not-allowed': !canvasStore.canUndo }"
                      class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                <ArrowUturnLeftIcon class="w-5 h-5" />
              </button>
              <button @click="redo"
                      :disabled="!canvasStore.canRedo"
                      :class="{ 'opacity-50 cursor-not-allowed': !canvasStore.canRedo }"
                      class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                <ArrowUturnRightIcon class="w-5 h-5" />
              </button>

              <div class="w-px h-6 bg-gray-300"></div>

              <!-- Zoom Controls -->
              <button @click="zoomOut" class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                <MagnifyingGlassMinusIcon class="w-5 h-5" />
              </button>
              <span class="text-sm text-gray-600 min-w-[60px] text-center">{{ Math.round(canvasStore.zoom) }}%</span>
              <button @click="zoomIn" class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                <MagnifyingGlassPlusIcon class="w-5 h-5" />
              </button>
              <button @click="resetZoom" class="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded">
                Fit
              </button>

              <div class="w-px h-6 bg-gray-300"></div>

              <!-- Alignment Controls -->
              <button @click="alignLeft"
                      :disabled="!canvasStore.selectedObject"
                      :class="{ 'opacity-50 cursor-not-allowed': !canvasStore.selectedObject }"
                      class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                <AlignLeftIcon class="w-4 h-4" />
              </button>
              <button @click="alignCenter"
                      :disabled="!canvasStore.selectedObject"
                      :class="{ 'opacity-50 cursor-not-allowed': !canvasStore.selectedObject }"
                      class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                <AlignCenterIcon class="w-4 h-4" />
              </button>
              <button @click="alignRight"
                      :disabled="!canvasStore.selectedObject"
                      :class="{ 'opacity-50 cursor-not-allowed': !canvasStore.selectedObject }"
                      class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                <AlignRightIcon class="w-4 h-4" />
              </button>

              <!-- Grid Toggle -->
              <button @click="toggleGrid"
                      :class="{ 'bg-blue-100 text-blue-600': canvasStore.isGridVisible }"
                      class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                <Squares2X2Icon class="w-4 h-4" />
              </button>
            </div>

            <div class="flex items-center space-x-4">
              <button @click="toggleFullscreen" class="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <ArrowsPointingOutIcon class="w-4 h-4" />
              </button>
              <button @click="preview" class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Preview
              </button>
              <button @click="showExportModal = true" class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
                Export
              </button>
            </div>
          </div>
          
          <!-- Canvas Container -->
          <div class="flex-1 p-8 flex items-center justify-center relative">
            <div class="relative">
              <canvas ref="fabricCanvas"
                      width="800"
                      height="600"
                      class="border border-gray-300 rounded-lg shadow-sm bg-white">
              </canvas>

              <!-- Grid overlay -->
              <div v-if="canvasStore.isGridVisible"
                   class="absolute inset-0 pointer-events-none"
                   :style="gridStyle">
              </div>
            </div>

            <!-- Property Toolbars -->
            <TextToolbar />
            <ImageToolbar />
          </div>

          <!-- Export Modal -->
          <ExportModal :isVisible="showExportModal" @close="showExportModal = false" />
        </div>
      </main>
      
      <!-- Right Sidebar -->
      <DashboardRightSidebar />
    </div>
  </div>
</template>

<script>
import DashboardTopbar from '@/components/DashboardTopbar.vue'
import DashboardLeftSidebar from '@/components/DashboardLeftSidebar.vue'
import DashboardRightSidebar from '@/components/DashboardRightSidebar.vue'
import TextToolbar from '@/components/TextToolbar.vue'
import ImageToolbar from '@/components/ImageToolbar.vue'
import ExportModal from '@/components/ExportModal.vue'
import { useCanvasStore } from '@/stores/canvas'
import { useProjectsStore } from '@/stores/projects'
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  PlusIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  Squares2X2Icon,
  ArrowsPointingOutIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'Dashboard',
  components: {
    DashboardTopbar,
    DashboardLeftSidebar,
    DashboardRightSidebar,
    TextToolbar,
    ImageToolbar,
    ExportModal,
    ArrowUturnLeftIcon,
    ArrowUturnRightIcon,
    MagnifyingGlassPlusIcon,
    MagnifyingGlassMinusIcon,
    PlusIcon,
    AlignLeftIcon,
    AlignCenterIcon,
    AlignRightIcon,
    Squares2X2Icon,
    ArrowsPointingOutIcon
  },
  setup() {
    const canvasStore = useCanvasStore()
    const projectsStore = useProjectsStore()

    return {
      canvasStore,
      projectsStore
    }
  },
  data() {
    return {
      zoomLevel: 100,
      showExportModal: false,
      isFullscreen: false
    }
  },
  computed: {
    gridStyle() {
      const size = this.canvasStore.gridSize
      return {
        backgroundImage: `
          linear-gradient(to right, #e5e7eb 1px, transparent 1px),
          linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`
      }
    }
  },
  mounted() {
    this.initCanvas()
    this.setupKeyboardShortcuts()
  },
  methods: {
    initCanvas() {
      this.canvasStore.initCanvas(this.$refs.fabricCanvas)

      // Load current project if exists
      if (this.projectsStore.currentProject) {
        this.loadProject(this.projectsStore.currentProject)
      }
    },
    setupKeyboardShortcuts() {
      document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

        if (e.key === 'Delete' || e.key === 'Backspace') {
          e.preventDefault()
          this.canvasStore.deleteSelected()
        } else if (e.ctrlKey || e.metaKey) {
          switch (e.key) {
            case 'z':
              e.preventDefault()
              if (e.shiftKey) {
                this.canvasStore.redo()
              } else {
                this.canvasStore.undo()
              }
              break
            case 'c':
              e.preventDefault()
              // Copy functionality would go here
              break
            case 'v':
              e.preventDefault()
              // Paste functionality would go here
              break
            case 'd':
              e.preventDefault()
              this.canvasStore.duplicateSelected()
              break
          }
        }
      })
    },
    loadProject(project) {
      if (project.data && this.canvasStore.canvas) {
        this.canvasStore.canvas.loadFromJSON(project.data, () => {
          this.canvasStore.canvas.renderAll()
        })
      }
    },
    zoomIn() {
      this.canvasStore.zoomIn()
      this.zoomLevel = this.canvasStore.zoom
    },
    zoomOut() {
      this.canvasStore.zoomOut()
      this.zoomLevel = this.canvasStore.zoom
    },
    resetZoom() {
      this.canvasStore.resetZoom()
      this.zoomLevel = this.canvasStore.zoom
    },
    undo() {
      this.canvasStore.undo()
    },
    redo() {
      this.canvasStore.redo()
    },
    alignLeft() {
      if (this.canvasStore.selectedObject && this.canvasStore.canvas) {
        this.canvasStore.selectedObject.set({ left: 0 })
        this.canvasStore.canvas.renderAll()
      }
    },
    alignCenter() {
      if (this.canvasStore.selectedObject && this.canvasStore.canvas) {
        const centerX = this.canvasStore.canvasSize.width / 2
        this.canvasStore.selectedObject.set({ left: centerX - this.canvasStore.selectedObject.width / 2 })
        this.canvasStore.canvas.renderAll()
      }
    },
    alignRight() {
      if (this.canvasStore.selectedObject && this.canvasStore.canvas) {
        const rightX = this.canvasStore.canvasSize.width - this.canvasStore.selectedObject.width
        this.canvasStore.selectedObject.set({ left: rightX })
        this.canvasStore.canvas.renderAll()
      }
    },
    toggleGrid() {
      this.canvasStore.isGridVisible = !this.canvasStore.isGridVisible
    },
    toggleFullscreen() {
      if (!this.isFullscreen) {
        document.documentElement.requestFullscreen()
        this.isFullscreen = true
      } else {
        document.exitFullscreen()
        this.isFullscreen = false
      }
    },
    preview() {
      // Hide UI elements and show canvas only
      console.log('Preview mode - would hide UI and show canvas only')
    },
    download() {
      this.showExportModal = true
    }
  },
  beforeUnmount() {
    // Save current project before leaving
    if (this.projectsStore.currentProject && this.canvasStore.canvas) {
      const canvasData = this.canvasStore.canvas.toJSON()
      const thumbnail = this.canvasStore.exportCanvas('png')
      this.projectsStore.saveCurrentProject(canvasData, thumbnail)
    }
  }
}
</script>
