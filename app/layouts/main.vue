<template>
  <div class="min-h-screen flex flex-col bg-white shadow">
    <header class="fixed top-0 left-0 right-0 z-50 bg-white">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <h1 class="text-primary text-2xl font-bold">Blabla</h1>
          </div>
        </div>
      </nav>
    </header>

    <main
      class="flex-1 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 bg-gray-100 mt-16"
    >
      <slot />
    </main>

    <footer class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-gray-400">
          <p>&copy; 2026 Caillou</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>
@
<style scoped></style>
