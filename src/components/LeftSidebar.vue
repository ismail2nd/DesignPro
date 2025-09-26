<template>
  <aside class="fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-40">
    <div class="flex flex-col h-full">
      <!-- Profile Section -->
      <div class="p-4 border-b border-gray-200">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span class="text-white font-semibold">JD</span>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">John Doe</h3>
            <p class="text-sm text-gray-600">Pro Plan</p>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 overflow-y-auto py-4">
        <div class="space-y-1 px-3">
          <!-- Scheduling -->
          <div class="mb-4">
            <button 
              @click="toggleSection('scheduling')"
              class="w-full flex items-center justify-between px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <CalendarIcon class="w-5 h-5" />
                <span>Scheduling</span>
              </div>
              <ChevronRightIcon class="w-4 h-4" :class="{ 'rotate-90': expandedSections.scheduling }" />
            </button>
            <div v-if="expandedSections.scheduling" class="ml-8 mt-2 space-y-1">
              <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">My Schedule</a>
              <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">Create Event</a>
            </div>
          </div>

          <!-- Templates -->
          <div class="mb-4">
            <button 
              @click="toggleSection('templates')"
              class="w-full flex items-center justify-between px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <DocumentDuplicateIcon class="w-5 h-5" />
                <span>Templates</span>
              </div>
              <ChevronRightIcon class="w-4 h-4" :class="{ 'rotate-90': expandedSections.templates }" />
            </button>
            <div v-if="expandedSections.templates" class="ml-8 mt-2 space-y-1">
              <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">Business Cards</a>
              <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">Flyers</a>
              <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">Invoices</a>
              <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">All Templates</a>
            </div>
          </div>

          <!-- Mockup -->
          <router-link to="/mockup" class="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <DevicePhoneMobileIcon class="w-5 h-5" />
            <span>Mockup</span>
          </router-link>

          <!-- Video -->
          <router-link to="/video" class="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <VideoCameraIcon class="w-5 h-5" />
            <span>Video</span>
          </router-link>

          <!-- Help Section -->
          <div class="mb-4">
            <button 
              @click="toggleSection('help')"
              class="w-full flex items-center justify-between px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <QuestionMarkCircleIcon class="w-5 h-5" />
                <span>Help</span>
              </div>
              <ChevronRightIcon class="w-4 h-4" :class="{ 'rotate-90': expandedSections.help }" />
            </button>
            <div v-if="expandedSections.help" class="ml-8 mt-2 space-y-1">
              <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">Subscription</a>
              <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">Suggest Feature</a>
              <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">Help Center</a>
              <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">Rate App</a>
            </div>
          </div>

          <!-- Legal Section -->
          <div class="mb-4">
            <button 
              @click="toggleSection('legal')"
              class="w-full flex items-center justify-between px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <ScaleIcon class="w-5 h-5" />
                <span>Legal</span>
              </div>
              <ChevronRightIcon class="w-4 h-4" :class="{ 'rotate-90': expandedSections.legal }" />
            </button>
            <div v-if="expandedSections.legal" class="ml-8 mt-2 space-y-1">
              <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">Contact Support</a>
              <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">Terms of Service</a>
              <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">Privacy Policy</a>
              <a href="#" class="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded">Privacy Settings</a>
            </div>
          </div>
        </div>
      </nav>

      <!-- Logout Button -->
      <div class="p-4 border-t border-gray-200">
        <button 
          @click="logout"
          class="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <ArrowRightOnRectangleIcon class="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
import { 
  CalendarIcon, 
  DocumentDuplicateIcon, 
  DevicePhoneMobileIcon, 
  VideoCameraIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ArrowRightOnRectangleIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'LeftSidebar',
  components: {
    CalendarIcon,
    DocumentDuplicateIcon,
    DevicePhoneMobileIcon,
    VideoCameraIcon,
    QuestionMarkCircleIcon,
    ScaleIcon,
    ArrowRightOnRectangleIcon,
    ChevronRightIcon
  },
  data() {
    return {
      expandedSections: {
        scheduling: false,
        templates: false,
        help: false,
        legal: false
      }
    }
  },
  methods: {
    toggleSection(section) {
      this.expandedSections[section] = !this.expandedSections[section]
    },
    logout() {
      // Handle logout logic
      console.log('Logging out...')
      // Redirect to login or home page
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.rotate-90 {
  transform: rotate(90deg);
}
</style>
