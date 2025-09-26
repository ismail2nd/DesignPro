<template>
  <header class="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
    <div class="flex items-center justify-between px-4 py-3">
      <!-- Left Section: Logo & Auto-Design -->
      <div class="flex items-center space-x-6">
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">DP</span>
          </div>
          <span class="text-xl font-bold text-gray-900">DesignPro</span>
        </router-link>
        
        <!-- Auto-Design Dropdown -->
        <div class="relative" ref="autoDesignDropdown">
          <button 
            @click="toggleAutoDesign"
            class="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span>Auto-Design</span>
            <ChevronDownIcon class="w-4 h-4" />
          </button>
          
          <div v-if="showAutoDesign" class="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <div class="grid grid-cols-2 gap-1 p-2">
              <button v-for="category in autoDesignCategories" :key="category"
                      @click="selectCategory(category)"
                      class="text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                {{ category }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Center Section: Canvas Controls -->
      <div class="flex items-center space-x-4">
        <button @click="undo" class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg" title="Undo">
          <ArrowUturnLeftIcon class="w-5 h-5" />
        </button>
        <button @click="redo" class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg" title="Redo">
          <ArrowUturnRightIcon class="w-5 h-5" />
        </button>
        
        <div class="w-px h-6 bg-gray-300"></div>
        
        <!-- Dark Mode Toggle -->
        <button @click="toggleDarkMode" class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg" title="Toggle Dark Mode">
          <SunIcon v-if="isDarkMode" class="w-5 h-5" />
          <MoonIcon v-else class="w-5 h-5" />
        </button>
      </div>

      <!-- Right Section: Project Name & User -->
      <div class="flex items-center space-x-4">
        <!-- Project Name -->
        <div class="flex items-center space-x-2">
          <input 
            v-model="projectName" 
            @blur="saveProjectName"
            class="text-sm font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
            placeholder="Untitled Design"
          >
          <button class="p-1 text-gray-400 hover:text-gray-600">
            <PencilIcon class="w-4 h-4" />
          </button>
        </div>

        <!-- User Profile -->
        <div class="relative" ref="profileDropdown">
          <button 
            @click="toggleProfile"
            class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
          >
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-semibold">{{ userInitials }}</span>
            </div>
          </button>
          
          <div v-if="showProfile" class="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <router-link to="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Back to Home</router-link>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Projects</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
            <hr class="my-2">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { 
  ChevronDownIcon, 
  ArrowUturnLeftIcon, 
  ArrowUturnRightIcon,
  SunIcon,
  MoonIcon,
  PencilIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'DashboardTopbar',
  components: {
    ChevronDownIcon,
    ArrowUturnLeftIcon,
    ArrowUturnRightIcon,
    SunIcon,
    MoonIcon,
    PencilIcon
  },
  data() {
    return {
      showAutoDesign: false,
      showProfile: false,
      isDarkMode: false,
      projectName: 'Untitled Design',
      userInitials: 'JD',
      autoDesignCategories: [
        'Sticker', 'Receipt', 'Invoice', 'Letter Head', 'Exercise Book', 'Calendar',
        'Flyer', 'Flex/Banner', 'Jotter', 'Branding', 'Table Calendar', 'Roll-up Stand',
        'Business Card', 'Tag', 'Magazine', 'Journal', 'Book', 'Register/Diary',
        'Forms', 'Clock Design', 'Label', 'Cloth', 'Status Design'
      ]
    }
  },
  methods: {
    toggleAutoDesign() {
      this.showAutoDesign = !this.showAutoDesign
      this.showProfile = false
    },
    toggleProfile() {
      this.showProfile = !this.showProfile
      this.showAutoDesign = false
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      // Implement dark mode logic
    },
    selectCategory(category) {
      console.log('Selected category:', category)
      this.showAutoDesign = false
    },
    undo() {
      this.$emit('undo')
    },
    redo() {
      this.$emit('redo')
    },
    saveProjectName() {
      console.log('Saving project name:', this.projectName)
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if (!this.$refs.autoDesignDropdown?.contains(e.target)) {
        this.showAutoDesign = false
      }
      if (!this.$refs.profileDropdown?.contains(e.target)) {
        this.showProfile = false
      }
    })
  }
}
</script>
