<template>
  <header class="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
    <div class="flex items-center justify-between px-4 py-3">
      <!-- Left Section: Logo -->
      <div class="flex items-center space-x-4">
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">DP</span>
          </div>
          <span class="text-xl font-bold text-gray-900">DesignPro</span>
        </router-link>
      </div>

      <!-- Center Section: Auto-Design Dropdown & Navigation -->
      <div class="flex items-center space-x-6">
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

        <!-- Page Editor Link -->
        <router-link to="/dashboard" class="text-gray-700 hover:text-gray-900 font-medium">
          Page Editor
        </router-link>
      </div>

      <!-- Right Section: Search, Token, Profile, Notifications -->
      <div class="flex items-center space-x-4">
        <!-- Search Bar -->
        <div class="relative">
          <input 
            type="text" 
            placeholder="Search templates..."
            class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            v-model="searchQuery"
          >
          <MagnifyingGlassIcon class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <!-- Token Balance -->
        <div class="flex items-center space-x-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div class="w-4 h-4 bg-yellow-400 rounded-full"></div>
          <span class="text-sm font-medium text-yellow-800">{{ tokenBalance }} tokens</span>
        </div>

        <!-- Notifications -->
        <button class="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
          <BellIcon class="w-6 h-6" />
          <span v-if="notificationCount > 0" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {{ notificationCount }}
          </span>
        </button>

        <!-- Profile Dropdown -->
        <div class="relative" ref="profileDropdown">
          <button 
            @click="toggleProfile"
            class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
          >
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-semibold">{{ userInitials }}</span>
            </div>
            <ChevronDownIcon class="w-4 h-4 text-gray-600" />
          </button>
          
          <div v-if="showProfile" class="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile Settings</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Projects</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Billing</a>
            <hr class="my-2">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ChevronDownIcon, MagnifyingGlassIcon, BellIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'Topbar',
  components: {
    ChevronDownIcon,
    MagnifyingGlassIcon,
    BellIcon
  },
  data() {
    return {
      showAutoDesign: false,
      showProfile: false,
      searchQuery: '',
      tokenBalance: 150,
      notificationCount: 3,
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
    selectCategory(category) {
      console.log('Selected category:', category)
      this.showAutoDesign = false
      // Navigate to category or open design flow
    }
  },
  mounted() {
    // Close dropdowns when clicking outside
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
