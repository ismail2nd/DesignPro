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
              <button class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                <ArrowUturnLeftIcon class="w-5 h-5" />
              </button>
              <button class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                <ArrowUturnRightIcon class="w-5 h-5" />
              </button>
              <div class="w-px h-6 bg-gray-300"></div>
              <button class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                <MagnifyingGlassPlusIcon class="w-5 h-5" />
              </button>
              <button class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                <MagnifyingGlassMinusIcon class="w-5 h-5" />
              </button>
              <span class="text-sm text-gray-600">100%</span>
            </div>
            
            <div class="flex items-center space-x-4">
              <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Preview
              </button>
              <button class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
                Download
              </button>
            </div>
          </div>
          
          <!-- Canvas Container -->
          <div class="flex-1 p-8 flex items-center justify-center">
            <div class="w-full max-w-4xl aspect-[4/3] bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <div class="text-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PlusIcon class="w-8 h-8 text-gray-400" />
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Start Creating</h3>
                <p class="text-gray-600 mb-4">Add elements from the sidebar or choose a template</p>
                <button class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
                  Choose Template
                </button>
              </div>
            </div>
          </div>
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
import { 
  ArrowUturnLeftIcon, 
  ArrowUturnRightIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  PlusIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'Dashboard',
  components: {
    DashboardTopbar,
    DashboardLeftSidebar,
    DashboardRightSidebar,
    ArrowUturnLeftIcon,
    ArrowUturnRightIcon,
    MagnifyingGlassPlusIcon,
    MagnifyingGlassMinusIcon,
    PlusIcon
  },
  data() {
    return {
      zoomLevel: 100
    }
  },
  methods: {
    zoomIn() {
      this.zoomLevel = Math.min(this.zoomLevel + 25, 400)
    },
    zoomOut() {
      this.zoomLevel = Math.max(this.zoomLevel - 25, 25)
    },
    undo() {
      console.log('Undo action')
    },
    redo() {
      console.log('Redo action')
    },
    preview() {
      console.log('Preview mode')
    },
    download() {
      console.log('Download design')
    }
  }
}
</script>
