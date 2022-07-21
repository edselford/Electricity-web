<template>
  <div class="w-screen h-screen dark:text-white dark:bg-almostblack">
    <div class="flex justify-center items-center h-screen">
      <div class="w-full max-w-xs">
        <div class="text-center">
          <h1 class="text-4xl font-bold">404</h1>
          <p class="text-lg">Page not found</p>
          <router-link :to="{ name: 'Dashboard' }" class="text-xs font-bold"
            >Go back to dashboard</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
