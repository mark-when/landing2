<script setup lang="ts">
const model = defineModel<string>();
</script>

<template>
  <div
    contenteditable="true"
    class="bg-zinc-50 rounded-s h-48 font-mono text-sm p-2 whitespace-pre-wrap"
    @keyup="model = ($event.target as HTMLDivElement).textContent || ''"
  >
    {{ model }}
  </div>
</template>

<style scoped></style>
