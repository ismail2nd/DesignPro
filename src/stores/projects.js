import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
    currentProject: null,
    templates: [
      {
        id: 'template-1',
        name: 'Business Card',
        category: 'Business',
        thumbnail: '/templates/business-card.png',
        data: {
          version: '5.3.0',
          objects: [
            {
              type: 'rect',
              left: 0,
              top: 0,
              width: 350,
              height: 200,
              fill: '#ffffff',
              stroke: '#e5e7eb',
              strokeWidth: 1
            },
            {
              type: 'text',
              left: 20,
              top: 30,
              text: 'Your Name',
              fontSize: 24,
              fontFamily: 'Arial',
              fill: '#1f2937',
              fontWeight: 'bold'
            },
            {
              type: 'text',
              left: 20,
              top: 60,
              text: 'Your Title',
              fontSize: 16,
              fontFamily: 'Arial',
              fill: '#6b7280'
            },
            {
              type: 'text',
              left: 20,
              top: 120,
              text: 'your.email@company.com',
              fontSize: 14,
              fontFamily: 'Arial',
              fill: '#3b82f6'
            },
            {
              type: 'text',
              left: 20,
              top: 140,
              text: '+1 (555) 123-4567',
              fontSize: 14,
              fontFamily: 'Arial',
              fill: '#1f2937'
            }
          ]
        }
      },
      {
        id: 'template-2',
        name: 'Flyer',
        category: 'Marketing',
        thumbnail: '/templates/flyer.png',
        data: {
          version: '5.3.0',
          objects: [
            {
              type: 'rect',
              left: 0,
              top: 0,
              width: 600,
              height: 800,
              fill: '#3b82f6'
            },
            {
              type: 'text',
              left: 50,
              top: 100,
              text: 'AMAZING OFFER',
              fontSize: 48,
              fontFamily: 'Arial',
              fill: '#ffffff',
              fontWeight: 'bold'
            },
            {
              type: 'text',
              left: 50,
              top: 200,
              text: 'Limited Time Only',
              fontSize: 24,
              fontFamily: 'Arial',
              fill: '#fbbf24'
            }
          ]
        }
      },
      {
        id: 'template-3',
        name: 'Invoice',
        category: 'Business',
        thumbnail: '/templates/invoice.png',
        data: {
          version: '5.3.0',
          objects: [
            {
              type: 'rect',
              left: 0,
              top: 0,
              width: 600,
              height: 800,
              fill: '#ffffff',
              stroke: '#e5e7eb',
              strokeWidth: 1
            },
            {
              type: 'text',
              left: 50,
              top: 50,
              text: 'INVOICE',
              fontSize: 36,
              fontFamily: 'Arial',
              fill: '#1f2937',
              fontWeight: 'bold'
            },
            {
              type: 'text',
              left: 50,
              top: 120,
              text: 'Invoice #: 001',
              fontSize: 16,
              fontFamily: 'Arial',
              fill: '#6b7280'
            }
          ]
        }
      },
      {
        id: 'template-4',
        name: 'Social Media Post',
        category: 'Social',
        thumbnail: '/templates/social-post.png',
        data: {
          version: '5.3.0',
          objects: [
            {
              type: 'rect',
              left: 0,
              top: 0,
              width: 500,
              height: 500,
              fill: '#f59e0b'
            },
            {
              type: 'text',
              left: 50,
              top: 200,
              text: 'Follow Us',
              fontSize: 32,
              fontFamily: 'Arial',
              fill: '#ffffff',
              fontWeight: 'bold'
            }
          ]
        }
      },
      {
        id: 'template-5',
        name: 'Presentation Slide',
        category: 'Presentation',
        thumbnail: '/templates/presentation.png',
        data: {
          version: '5.3.0',
          objects: [
            {
              type: 'rect',
              left: 0,
              top: 0,
              width: 800,
              height: 600,
              fill: '#ffffff'
            },
            {
              type: 'text',
              left: 100,
              top: 200,
              text: 'Your Presentation Title',
              fontSize: 40,
              fontFamily: 'Arial',
              fill: '#1f2937',
              fontWeight: 'bold'
            }
          ]
        }
      }
    ]
  }),

  getters: {
    getProjectById: (state) => (id) => {
      return state.projects.find(project => project.id === id)
    },
    getTemplateById: (state) => (id) => {
      return state.templates.find(template => template.id === id)
    },
    getTemplatesByCategory: (state) => (category) => {
      return state.templates.filter(template => template.category === category)
    },
    recentProjects: (state) => {
      return state.projects
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 6)
    }
  },

  actions: {
    createProject(name = 'Untitled Design', templateId = null) {
      const project = {
        id: uuidv4(),
        name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        thumbnail: null,
        data: templateId ? this.getTemplateById(templateId)?.data : {
          version: '5.3.0',
          objects: []
        }
      }

      this.projects.push(project)
      this.currentProject = project
      this.saveToLocalStorage()
      
      return project
    },

    updateProject(projectId, updates) {
      const project = this.getProjectById(projectId)
      if (project) {
        Object.assign(project, {
          ...updates,
          updatedAt: new Date().toISOString()
        })
        this.saveToLocalStorage()
      }
    },

    deleteProject(projectId) {
      const index = this.projects.findIndex(p => p.id === projectId)
      if (index !== -1) {
        this.projects.splice(index, 1)
        if (this.currentProject?.id === projectId) {
          this.currentProject = null
        }
        this.saveToLocalStorage()
      }
    },

    duplicateProject(projectId) {
      const project = this.getProjectById(projectId)
      if (project) {
        const duplicate = {
          ...project,
          id: uuidv4(),
          name: `${project.name} Copy`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        this.projects.push(duplicate)
        this.saveToLocalStorage()
        return duplicate
      }
    },

    setCurrentProject(project) {
      this.currentProject = project
    },

    saveCurrentProject(canvasData, thumbnail = null) {
      if (this.currentProject) {
        this.updateProject(this.currentProject.id, {
          data: canvasData,
          thumbnail
        })
      }
    },

    loadFromLocalStorage() {
      try {
        const saved = localStorage.getItem('designpro-projects')
        if (saved) {
          const data = JSON.parse(saved)
          this.projects = data.projects || []
          this.currentProject = data.currentProject || null
        }
      } catch (error) {
        console.error('Failed to load projects from localStorage:', error)
      }
    },

    saveToLocalStorage() {
      try {
        const data = {
          projects: this.projects,
          currentProject: this.currentProject
        }
        localStorage.setItem('designpro-projects', JSON.stringify(data))
      } catch (error) {
        console.error('Failed to save projects to localStorage:', error)
      }
    }
  }
})
