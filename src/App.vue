<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Ensure proper spacing for fixed topbar */
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Inter', system-ui, sans-serif;
}
</style>
