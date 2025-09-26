<template>
  <aside class="fixed right-0 top-16 h-full w-64 bg-white border-l border-gray-200 shadow-sm z-40">
    <div class="flex flex-col h-full">
      <!-- Tabs -->
      <div class="flex border-b border-gray-200">
        <button 
          @click="activeTab = 'pages'"
          :class="tabClass('pages')"
          class="flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors"
        >
          Pages
        </button>
        <button 
          @click="activeTab = 'layers'"
          :class="tabClass('layers')"
          class="flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors"
        >
          Layers
        </button>
      </div>

      <!-- Pages Panel -->
      <div v-if="activeTab === 'pages'" class="flex-1 overflow-y-auto p-4">
        <div class="space-y-4">
          <!-- Add Page Button -->
          <button 
            @click="addPage"
            class="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
          >
            <PlusIcon class="w-5 h-5 mx-auto mb-1" />
            <span class="text-sm">Add Page</span>
          </button>

          <!-- Page List -->
          <div class="space-y-2">
            <div v-for="page in pages" :key="page.id" 
                 @click="selectPage(page.id)"
                 :class="pageItemClass(page.id)"
                 class="relative group p-3 border rounded-lg cursor-pointer transition-colors">
              
              <!-- Page Thumbnail -->
              <div class="aspect-[4/3] bg-gray-100 rounded mb-2 flex items-center justify-center">
                <span class="text-xs text-gray-500">Page {{ page.id }}</span>
              </div>
              
              <!-- Page Info -->
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-900">Page {{ page.id }}</span>
                
                <!-- Page Actions -->
                <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click.stop="duplicatePage(page.id)" class="p-1 text-gray-400 hover:text-gray-600">
                    <DocumentDuplicateIcon class="w-4 h-4" />
                  </button>
                  <button @click.stop="deletePage(page.id)" class="p-1 text-gray-400 hover:text-red-600">
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Layers Panel -->
      <div v-if="activeTab === 'layers'" class="flex-1 overflow-y-auto p-4">
        <div class="space-y-2">
          <!-- Layer List -->
          <div v-if="layers.length === 0" class="text-center py-8 text-gray-500">
            <Squares2X2Icon class="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p class="text-sm">No layers yet</p>
            <p class="text-xs text-gray-400">Add elements to see layers</p>
          </div>
          
          <div v-else class="space-y-1">
            <div v-for="layer in layers" :key="layer.id"
                 @click="selectLayer(layer.id)"
                 :class="layerItemClass(layer.id)"
                 class="flex items-center space-x-3 p-2 rounded-lg cursor-pointer group transition-colors">
              
              <!-- Visibility Toggle -->
              <button @click.stop="toggleLayerVisibility(layer.id)" class="text-gray-400 hover:text-gray-600">
                <EyeIcon v-if="layer.visible" class="w-4 h-4" />
                <EyeSlashIcon v-else class="w-4 h-4" />
              </button>
              
              <!-- Layer Icon -->
              <div class="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                <component :is="getLayerIcon(layer.type)" class="w-3 h-3 text-gray-600" />
              </div>
              
              <!-- Layer Name -->
              <div class="flex-1 min-w-0">
                <input 
                  v-if="editingLayer === layer.id"
                  v-model="layer.name"
                  @blur="stopEditingLayer"
                  @keyup.enter="stopEditingLayer"
                  class="w-full text-sm bg-transparent border-none focus:outline-none"
                  :ref="`layerInput-${layer.id}`"
                >
                <span v-else @dblclick="startEditingLayer(layer.id)" class="text-sm text-gray-900 truncate">
                  {{ layer.name }}
                </span>
              </div>
              
              <!-- Lock Toggle -->
              <button @click.stop="toggleLayerLock(layer.id)" class="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <LockClosedIcon v-if="layer.locked" class="w-4 h-4" />
                <LockOpenIcon v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { 
  PlusIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  Squares2X2Icon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  LockOpenIcon,
  DocumentTextIcon,
  PhotoIcon,
  Square3Stack3DIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'DashboardRightSidebar',
  components: {
    PlusIcon,
    DocumentDuplicateIcon,
    TrashIcon,
    Squares2X2Icon,
    EyeIcon,
    EyeSlashIcon,
    LockClosedIcon,
    LockOpenIcon,
    DocumentTextIcon,
    PhotoIcon,
    Square3Stack3DIcon
  },
  data() {
    return {
      activeTab: 'pages',
      selectedPageId: 1,
      selectedLayerId: null,
      editingLayer: null,
      pages: [
        { id: 1, name: 'Page 1' }
      ],
      layers: [
        { id: 1, name: 'Background', type: 'background', visible: true, locked: false },
        { id: 2, name: 'Text Layer', type: 'text', visible: true, locked: false },
        { id: 3, name: 'Image Layer', type: 'image', visible: true, locked: false }
      ]
    }
  },
  methods: {
    tabClass(tab) {
      return this.activeTab === tab 
        ? 'text-blue-600 border-blue-600' 
        : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
    },
    pageItemClass(pageId) {
      return this.selectedPageId === pageId 
        ? 'border-blue-500 bg-blue-50' 
        : 'border-gray-200 hover:border-gray-300'
    },
    layerItemClass(layerId) {
      return this.selectedLayerId === layerId 
        ? 'bg-blue-50 text-blue-900' 
        : 'hover:bg-gray-50'
    },
    addPage() {
      const newId = Math.max(...this.pages.map(p => p.id)) + 1
      this.pages.push({ id: newId, name: `Page ${newId}` })
    },
    selectPage(pageId) {
      this.selectedPageId = pageId
    },
    duplicatePage(pageId) {
      const page = this.pages.find(p => p.id === pageId)
      if (page) {
        const newId = Math.max(...this.pages.map(p => p.id)) + 1
        this.pages.push({ ...page, id: newId, name: `${page.name} Copy` })
      }
    },
    deletePage(pageId) {
      if (this.pages.length > 1) {
        this.pages = this.pages.filter(p => p.id !== pageId)
        if (this.selectedPageId === pageId) {
          this.selectedPageId = this.pages[0].id
        }
      }
    },
    selectLayer(layerId) {
      this.selectedLayerId = layerId
    },
    toggleLayerVisibility(layerId) {
      const layer = this.layers.find(l => l.id === layerId)
      if (layer) {
        layer.visible = !layer.visible
      }
    },
    toggleLayerLock(layerId) {
      const layer = this.layers.find(l => l.id === layerId)
      if (layer) {
        layer.locked = !layer.locked
      }
    },
    startEditingLayer(layerId) {
      this.editingLayer = layerId
      this.$nextTick(() => {
        const input = this.$refs[`layerInput-${layerId}`]?.[0]
        if (input) {
          input.focus()
          input.select()
        }
      })
    },
    stopEditingLayer() {
      this.editingLayer = null
    },
    getLayerIcon(type) {
      const icons = {
        text: DocumentTextIcon,
        image: PhotoIcon,
        background: Square3Stack3DIcon,
        shape: Squares2X2Icon
      }
      return icons[type] || Squares2X2Icon
    }
  }
}
</script>
