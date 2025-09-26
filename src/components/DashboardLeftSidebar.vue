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
          <h3 class="font-medium text-gray-900">Template Categories</h3>
          <div class="grid grid-cols-2 gap-2">
            <button v-for="category in templateCategories" :key="category"
                    class="p-2 text-xs text-gray-700 bg-white hover:bg-gray-100 rounded border">
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Backgrounds Panel -->
        <div v-if="selectedTool === 'backgrounds'" class="space-y-3">
          <h3 class="font-medium text-gray-900">Background Types</h3>
          <div class="space-y-2">
            <button class="w-full p-2 text-sm text-left text-gray-700 bg-white hover:bg-gray-100 rounded border">
              Solid Colors
            </button>
            <button class="w-full p-2 text-sm text-left text-gray-700 bg-white hover:bg-gray-100 rounded border">
              Gradients
            </button>
            <button class="w-full p-2 text-sm text-left text-gray-700 bg-white hover:bg-gray-100 rounded border">
              Patterns
            </button>
            <button class="w-full p-2 text-sm text-left text-gray-700 bg-white hover:bg-gray-100 rounded border">
              Upload Image
            </button>
          </div>
        </div>

        <!-- Text Panel -->
        <div v-if="selectedTool === 'text'" class="space-y-3">
          <h3 class="font-medium text-gray-900">Text Options</h3>
          <div class="space-y-2">
            <button class="w-full p-2 text-sm text-left text-gray-700 bg-white hover:bg-gray-100 rounded border">
              Add Heading
            </button>
            <button class="w-full p-2 text-sm text-left text-gray-700 bg-white hover:bg-gray-100 rounded border">
              Add Subheading
            </button>
            <button class="w-full p-2 text-sm text-left text-gray-700 bg-white hover:bg-gray-100 rounded border">
              Add Body Text
            </button>
          </div>
        </div>

        <!-- Elements Panel -->
        <div v-if="selectedTool === 'elements'" class="space-y-3">
          <h3 class="font-medium text-gray-900">Shapes & Icons</h3>
          <div class="grid grid-cols-3 gap-2">
            <button class="aspect-square p-2 text-gray-700 bg-white hover:bg-gray-100 rounded border flex items-center justify-center">
              ⬜
            </button>
            <button class="aspect-square p-2 text-gray-700 bg-white hover:bg-gray-100 rounded border flex items-center justify-center">
              ⭕
            </button>
            <button class="aspect-square p-2 text-gray-700 bg-white hover:bg-gray-100 rounded border flex items-center justify-center">
              ▲
            </button>
          </div>
        </div>

        <!-- Other panels -->
        <div v-if="selectedTool === 'uploads'" class="space-y-3">
          <h3 class="font-medium text-gray-900">Upload Files</h3>
          <button class="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-600 hover:border-gray-400">
            Drop files here or click to upload
          </button>
        </div>

        <div v-if="selectedTool === 'bgremover'" class="space-y-3">
          <h3 class="font-medium text-gray-900">Background Remover</h3>
          <p class="text-sm text-gray-600">Select an image to remove its background automatically.</p>
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
  data() {
    return {
      selectedTool: 'templates',
      templateCategories: [
        'Business', 'Marketing', 'Social', 'Print', 'Web', 'Mobile'
      ]
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
    }
  }
}
</script>
