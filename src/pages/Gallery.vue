<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Topbar -->
    <Topbar />
    
    <div class="flex">
      <!-- Left Sidebar -->
      <LeftSidebar />
      
      <!-- Main Content -->
      <main class="flex-1 ml-64 pt-16 p-8">
        <div class="max-w-7xl mx-auto">
          <!-- Header -->
          <div class="flex items-center justify-between mb-8">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">My Gallery</h1>
              <p class="text-gray-600 mt-1">Manage your design projects</p>
            </div>
            
            <button @click="createNewProject" 
                    class="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium flex items-center space-x-2">
              <PlusIcon class="w-5 h-5" />
              <span>New Design</span>
            </button>
          </div>

          <!-- Search and Filter -->
          <div class="flex items-center space-x-4 mb-6">
            <div class="relative flex-1 max-w-md">
              <MagnifyingGlassIcon class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input v-model="searchQuery" 
                     placeholder="Search projects..." 
                     class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            </div>
            
            <select v-model="sortBy" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="updatedAt">Recently Modified</option>
              <option value="createdAt">Recently Created</option>
              <option value="name">Name</option>
            </select>
          </div>

          <!-- Projects Grid -->
          <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="project in filteredProjects" :key="project.id" 
                 class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
              
              <!-- Project Thumbnail -->
              <div class="aspect-[4/3] bg-gray-100 rounded-t-lg overflow-hidden relative">
                <img v-if="project.thumbnail" 
                     :src="project.thumbnail" 
                     :alt="project.name"
                     class="w-full h-full object-cover">
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                  <DocumentIcon class="w-12 h-12" />
                </div>
                
                <!-- Hover Actions -->
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div class="flex space-x-2">
                    <button @click="openProject(project)"
                            class="px-3 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 font-medium">
                      Open
                    </button>
                    <button @click="duplicateProject(project)"
                            class="px-3 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100">
                      <DocumentDuplicateIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Project Info -->
              <div class="p-4">
                <div class="flex items-start justify-between">
                  <div class="flex-1 min-w-0">
                    <h3 class="font-medium text-gray-900 truncate">{{ project.name }}</h3>
                    <p class="text-sm text-gray-500 mt-1">{{ formatDate(project.updatedAt) }}</p>
                  </div>
                  
                  <!-- Actions Menu -->
                  <div class="relative ml-2">
                    <button @click="toggleProjectMenu(project.id)"
                            class="p-1 text-gray-400 hover:text-gray-600 rounded">
                      <EllipsisVerticalIcon class="w-5 h-5" />
                    </button>
                    
                    <div v-if="activeProjectMenu === project.id" 
                         class="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <button @click="renameProject(project)" 
                              class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                        Rename
                      </button>
                      <button @click="duplicateProject(project)" 
                              class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                        Duplicate
                      </button>
                      <button @click="downloadProject(project)" 
                              class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                        Download
                      </button>
                      <hr class="my-2">
                      <button @click="deleteProject(project)" 
                              class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <DocumentIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p class="text-gray-600 mb-6">
              {{ searchQuery ? 'Try adjusting your search terms' : 'Create your first design to get started' }}
            </p>
            <button v-if="!searchQuery" @click="createNewProject" 
                    class="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium">
              Create New Design
            </button>
          </div>
        </div>
      </main>
    </div>

    <!-- Rename Modal -->
    <div v-if="renamingProject" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Rename Project</h3>
        <input v-model="newProjectName" 
               @keyup.enter="confirmRename"
               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               placeholder="Enter project name">
        <div class="flex justify-end space-x-3 mt-6">
          <button @click="cancelRename" 
                  class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            Cancel
          </button>
          <button @click="confirmRename" 
                  class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
            Rename
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Topbar from '@/components/Topbar.vue'
import LeftSidebar from '@/components/LeftSidebar.vue'
import { useProjectsStore } from '@/stores/projects'
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  DocumentIcon,
  DocumentDuplicateIcon,
  EllipsisVerticalIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'Gallery',
  components: {
    Topbar,
    LeftSidebar,
    PlusIcon,
    MagnifyingGlassIcon,
    DocumentIcon,
    DocumentDuplicateIcon,
    EllipsisVerticalIcon
  },
  setup() {
    const projectsStore = useProjectsStore()
    return { projectsStore }
  },
  data() {
    return {
      searchQuery: '',
      sortBy: 'updatedAt',
      activeProjectMenu: null,
      renamingProject: null,
      newProjectName: ''
    }
  },
  computed: {
    filteredProjects() {
      let projects = [...this.projectsStore.projects]
      
      // Filter by search query
      if (this.searchQuery) {
        projects = projects.filter(project => 
          project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      }
      
      // Sort projects
      projects.sort((a, b) => {
        switch (this.sortBy) {
          case 'name':
            return a.name.localeCompare(b.name)
          case 'createdAt':
            return new Date(b.createdAt) - new Date(a.createdAt)
          case 'updatedAt':
          default:
            return new Date(b.updatedAt) - new Date(a.updatedAt)
        }
      })
      
      return projects
    }
  },
  methods: {
    createNewProject() {
      const project = this.projectsStore.createProject()
      this.$router.push('/dashboard')
    },
    openProject(project) {
      this.projectsStore.setCurrentProject(project)
      this.$router.push('/dashboard')
    },
    duplicateProject(project) {
      this.projectsStore.duplicateProject(project.id)
      this.activeProjectMenu = null
    },
    renameProject(project) {
      this.renamingProject = project
      this.newProjectName = project.name
      this.activeProjectMenu = null
    },
    confirmRename() {
      if (this.renamingProject && this.newProjectName.trim()) {
        this.projectsStore.updateProject(this.renamingProject.id, {
          name: this.newProjectName.trim()
        })
      }
      this.cancelRename()
    },
    cancelRename() {
      this.renamingProject = null
      this.newProjectName = ''
    },
    downloadProject(project) {
      // Create a temporary canvas to render the project
      const canvas = document.createElement('canvas')
      canvas.width = 800
      canvas.height = 600
      
      // This would render the project data to canvas and download
      // For now, just show a placeholder
      console.log('Download project:', project.name)
      this.activeProjectMenu = null
    },
    deleteProject(project) {
      if (confirm(`Are you sure you want to delete "${project.name}"?`)) {
        this.projectsStore.deleteProject(project.id)
      }
      this.activeProjectMenu = null
    },
    toggleProjectMenu(projectId) {
      this.activeProjectMenu = this.activeProjectMenu === projectId ? null : projectId
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = Math.abs(now - date)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) return 'Yesterday'
      if (diffDays < 7) return `${diffDays} days ago`
      if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
      if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`
      return `${Math.ceil(diffDays / 365)} years ago`
    }
  },
  mounted() {
    this.projectsStore.loadFromLocalStorage()
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.relative')) {
        this.activeProjectMenu = null
      }
    })
  }
}
</script>
