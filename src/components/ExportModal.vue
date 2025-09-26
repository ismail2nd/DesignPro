<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-medium text-gray-900">Export & Share</h3>
        <button @click="close" class="text-gray-400 hover:text-gray-600">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- Export Options -->
      <div class="space-y-4">
        <!-- Format Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
          <div class="grid grid-cols-3 gap-2">
            <button v-for="format in exportFormats" :key="format.value"
                    @click="selectedFormat = format.value"
                    :class="{ 'bg-blue-50 border-blue-500 text-blue-700': selectedFormat === format.value }"
                    class="p-3 border border-gray-300 rounded-lg text-center hover:bg-gray-50 transition-colors">
              <div class="font-medium">{{ format.label }}</div>
              <div class="text-xs text-gray-500">{{ format.description }}</div>
            </button>
          </div>
        </div>

        <!-- Quality Settings (for JPEG) -->
        <div v-if="selectedFormat === 'jpeg'">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Quality: {{ quality }}%
          </label>
          <input v-model.number="quality" 
                 type="range" 
                 min="10" 
                 max="100" 
                 step="10"
                 class="w-full">
        </div>

        <!-- Size Options -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Export Size</label>
          <div class="space-y-2">
            <label v-for="size in exportSizes" :key="size.value" 
                   class="flex items-center space-x-3 p-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input v-model="selectedSize" 
                     :value="size.value" 
                     type="radio" 
                     class="text-blue-600 focus:ring-blue-500">
              <div class="flex-1">
                <div class="font-medium">{{ size.label }}</div>
                <div class="text-sm text-gray-500">{{ size.dimensions }}</div>
              </div>
            </label>
          </div>
        </div>

        <!-- Custom Size -->
        <div v-if="selectedSize === 'custom'" class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Width</label>
            <input v-model.number="customWidth" 
                   type="number" 
                   min="100" 
                   max="5000"
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Height</label>
            <input v-model.number="customHeight" 
                   type="number" 
                   min="100" 
                   max="5000"
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          </div>
        </div>

        <!-- Export Actions -->
        <div class="flex space-x-3 pt-4">
          <button @click="exportDesign" 
                  :disabled="isExporting"
                  class="flex-1 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 rounded-lg font-medium flex items-center justify-center space-x-2">
            <ArrowDownTrayIcon v-if="!isExporting" class="w-4 h-4" />
            <div v-else class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>{{ isExporting ? 'Exporting...' : 'Download' }}</span>
          </button>
          
          <button @click="shareDesign" 
                  class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium flex items-center justify-center space-x-2">
            <ShareIcon class="w-4 h-4" />
            <span>Share Link</span>
          </button>
        </div>

        <!-- Share Link (if generated) -->
        <div v-if="shareLink" class="p-3 bg-gray-50 rounded-lg">
          <label class="block text-sm font-medium text-gray-700 mb-2">Share Link</label>
          <div class="flex space-x-2">
            <input :value="shareLink" 
                   readonly 
                   class="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm">
            <button @click="copyShareLink" 
                    class="px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
              <ClipboardIcon class="w-4 h-4" />
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-1">Link expires in 30 days</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCanvasStore } from '@/stores/canvas'
import { useProjectsStore } from '@/stores/projects'
import { 
  XMarkIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  ClipboardIcon
} from '@heroicons/vue/24/outline'
import { saveAs } from 'file-saver'
import jsPDF from 'jspdf'

export default {
  name: 'ExportModal',
  components: {
    XMarkIcon,
    ArrowDownTrayIcon,
    ShareIcon,
    ClipboardIcon
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
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
      selectedFormat: 'png',
      selectedSize: 'original',
      quality: 90,
      customWidth: 800,
      customHeight: 600,
      isExporting: false,
      shareLink: null,
      exportFormats: [
        { value: 'png', label: 'PNG', description: 'High quality' },
        { value: 'jpeg', label: 'JPEG', description: 'Smaller size' },
        { value: 'pdf', label: 'PDF', description: 'Print ready' }
      ],
      exportSizes: [
        { value: 'original', label: 'Original Size', dimensions: '800 × 600 px' },
        { value: 'hd', label: 'HD', dimensions: '1920 × 1080 px' },
        { value: '4k', label: '4K', dimensions: '3840 × 2160 px' },
        { value: 'print', label: 'Print (300 DPI)', dimensions: '2400 × 1800 px' },
        { value: 'custom', label: 'Custom Size', dimensions: 'Set your own' }
      ]
    }
  },
  methods: {
    close() {
      this.$emit('close')
      this.shareLink = null
    },
    async exportDesign() {
      if (!this.canvasStore.canvas) return
      
      this.isExporting = true
      
      try {
        const canvas = this.canvasStore.canvas
        const originalZoom = canvas.getZoom()
        
        // Calculate export dimensions
        let { width, height } = this.getExportDimensions()
        
        // Set canvas size for export
        const multiplier = this.selectedSize === 'print' ? 3 : 
                          this.selectedSize === '4k' ? 4.8 : 
                          this.selectedSize === 'hd' ? 2.4 : 1
        
        canvas.setZoom(multiplier)
        canvas.setDimensions({ width: width * multiplier, height: height * multiplier })
        
        if (this.selectedFormat === 'pdf') {
          await this.exportToPDF(width, height)
        } else {
          const dataURL = canvas.toDataURL(`image/${this.selectedFormat}`, 
                                          this.selectedFormat === 'jpeg' ? this.quality / 100 : 1)
          
          const fileName = `${this.projectsStore.currentProject?.name || 'design'}.${this.selectedFormat}`
          
          // Convert data URL to blob and download
          const response = await fetch(dataURL)
          const blob = await response.blob()
          saveAs(blob, fileName)
        }
        
        // Restore original canvas settings
        canvas.setZoom(originalZoom)
        canvas.setDimensions({ 
          width: this.canvasStore.canvasSize.width, 
          height: this.canvasStore.canvasSize.height 
        })
        
        this.close()
      } catch (error) {
        console.error('Export failed:', error)
        alert('Export failed. Please try again.')
      } finally {
        this.isExporting = false
      }
    },
    async exportToPDF(width, height) {
      const canvas = this.canvasStore.canvas
      const dataURL = canvas.toDataURL('image/png')
      
      // Create PDF with appropriate dimensions
      const pdf = new jsPDF({
        orientation: width > height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [width, height]
      })
      
      pdf.addImage(dataURL, 'PNG', 0, 0, width, height)
      
      const fileName = `${this.projectsStore.currentProject?.name || 'design'}.pdf`
      pdf.save(fileName)
    },
    getExportDimensions() {
      switch (this.selectedSize) {
        case 'hd':
          return { width: 1920, height: 1080 }
        case '4k':
          return { width: 3840, height: 2160 }
        case 'print':
          return { width: 2400, height: 1800 }
        case 'custom':
          return { width: this.customWidth, height: this.customHeight }
        case 'original':
        default:
          return { 
            width: this.canvasStore.canvasSize.width, 
            height: this.canvasStore.canvasSize.height 
          }
      }
    },
    shareDesign() {
      // Generate a shareable link (placeholder implementation)
      const projectId = this.projectsStore.currentProject?.id
      if (projectId) {
        this.shareLink = `${window.location.origin}/shared/${projectId}`
        
        // In a real app, you would:
        // 1. Upload the design to a cloud service
        // 2. Generate a unique share ID
        // 3. Create a public URL
        console.log('Share functionality would upload design and generate public link')
      }
    },
    async copyShareLink() {
      if (this.shareLink) {
        try {
          await navigator.clipboard.writeText(this.shareLink)
          // Show success feedback
          console.log('Link copied to clipboard')
        } catch (error) {
          console.error('Failed to copy link:', error)
        }
      }
    }
  }
}
</script>
