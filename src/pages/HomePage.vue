<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Topbar -->
    <Topbar />
    
    <div class="flex">
      <!-- Left Sidebar -->
      <LeftSidebar />
      
      <!-- Main Content -->
      <main class="flex-1 ml-64">
        <!-- Hero Section -->
        <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
              <h1 class="text-4xl font-bold mb-4">Create Amazing Designs with DesignPro</h1>
              <p class="text-xl mb-8">Professional design tools for everyone</p>
              <button @click="$router.push('/dashboard')" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Designing
              </button>
            </div>
          </div>
        </section>

        <!-- Featured Templates -->
        <section class="py-16">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center mb-8">
              <h2 class="text-3xl font-bold text-gray-900">Featured Templates</h2>
              <button class="text-blue-600 hover:text-blue-700 font-medium">See more →</button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div v-for="template in featuredTemplates" :key="template.id" 
                   @click="openTemplate(template)"
                   class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                <div class="aspect-w-16 aspect-h-9 bg-gray-200">
                  <div class="flex items-center justify-center text-gray-500">
                    {{ template.name }}
                  </div>
                </div>
                <div class="p-4">
                  <h3 class="font-semibold text-gray-900">{{ template.name }}</h3>
                  <p class="text-sm text-gray-600">{{ template.category }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Testimonials -->
        <section class="bg-white py-16">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">What Our Users Say</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div v-for="testimonial in testimonials" :key="testimonial.id" 
                   class="bg-gray-50 p-6 rounded-lg">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {{ testimonial.name.charAt(0) }}
                  </div>
                  <div class="ml-4">
                    <h4 class="font-semibold text-gray-900">{{ testimonial.name }}</h4>
                    <p class="text-sm text-gray-600">{{ testimonial.role }}</p>
                  </div>
                </div>
                <p class="text-gray-700">"{{ testimonial.content }}"</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 class="text-lg font-semibold mb-4">DesignPro</h3>
                <p class="text-gray-400">Professional design tools for everyone</p>
              </div>
              
              <div>
                <h4 class="font-semibold mb-4">Quick Links</h4>
                <ul class="space-y-2 text-gray-400">
                  <li><a href="#" class="hover:text-white">Templates</a></li>
                  <li><a href="#" class="hover:text-white">FAQ</a></li>
                  <li><a href="#" class="hover:text-white">About</a></li>
                </ul>
              </div>
              
              <div>
                <h4 class="font-semibold mb-4">Support</h4>
                <ul class="space-y-2 text-gray-400">
                  <li><a href="#" class="hover:text-white">Help Center</a></li>
                  <li><a href="#" class="hover:text-white">Contact</a></li>
                  <li><a href="#" class="hover:text-white">Terms</a></li>
                  <li><a href="#" class="hover:text-white">Privacy</a></li>
                </ul>
              </div>
              
              <div>
                <h4 class="font-semibold mb-4">Follow Us</h4>
                <div class="flex space-x-4">
                  <a href="#" class="text-gray-400 hover:text-white">Facebook</a>
                  <a href="#" class="text-gray-400 hover:text-white">Twitter</a>
                  <a href="#" class="text-gray-400 hover:text-white">Instagram</a>
                  <a href="#" class="text-gray-400 hover:text-white">WhatsApp</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>

<script>
import Topbar from '@/components/Topbar.vue'
import LeftSidebar from '@/components/LeftSidebar.vue'

export default {
  name: 'HomePage',
  components: {
    Topbar,
    LeftSidebar
  },
  data() {
    return {
      featuredTemplates: [
        { id: 1, name: 'Business Card', category: 'Business' },
        { id: 2, name: 'Flyer', category: 'Marketing' },
        { id: 3, name: 'Invoice', category: 'Business' },
        { id: 4, name: 'Calendar', category: 'Productivity' },
        { id: 5, name: 'Sticker', category: 'Creative' },
        { id: 6, name: 'Letter Head', category: 'Business' },
        { id: 7, name: 'Magazine', category: 'Publishing' },
        { id: 8, name: 'Banner', category: 'Marketing' }
      ],
      testimonials: [
        {
          id: 1,
          name: 'Sarah Johnson',
          role: 'Marketing Manager',
          content: 'DesignPro has revolutionized how we create marketing materials. The templates are professional and easy to customize.'
        },
        {
          id: 2,
          name: 'Mike Chen',
          role: 'Small Business Owner',
          content: 'I can create professional designs without hiring a designer. The interface is intuitive and the results are amazing.'
        },
        {
          id: 3,
          name: 'Emily Davis',
          role: 'Freelance Designer',
          content: 'The tools are powerful yet simple to use. I can deliver high-quality designs to my clients much faster now.'
        }
      ]
    }
  },
  methods: {
    openTemplate(template) {
      // Navigate to editor with template
      this.$router.push(`/editor?template=${template.id}`)
    }
  }
}
</script>
