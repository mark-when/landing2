<script setup lang="ts">
import ExampleButton from "./ExampleButton.vue";
import { ref } from "vue";

const examples = [
  [
    "Syntax basics",
    `title: Basic syntax
2025-04-09: Susan's birthday
`,
  ],
  ["Groups", ""],
];
const exampleSelected = ref<string>(examples[0][0]);

const outputs = ["JSON", "Timeline", "Oneview", "iCal"];
const outputSelected = ref<string>(outputs[0]);
</script>

<template>
  <div class="flex flex-col gap-1">
    <fieldset class="border border-zinc-400 p-3 rounded-sm flex flex-col gap-2">
      <legend class="px-1 mx-1">Input</legend>
      <div class="flex flex-row gap-2">
        <ExampleButton
          v-for="example in examples"
          :selected="exampleSelected === example[0]"
          @click="exampleSelected = example[0]"
          >{{ example[0] }}</ExampleButton
        >
      </div>
      <div
        contenteditable="true"
        class="bg-zinc-50 rounded-s h-36 font-mono text-xs p-2 whitespace-pre"
        v-for="example in examples"
        v-show="exampleSelected === example[0]"
      >
        {{ example[1] }}
      </div>
    </fieldset>
    <div class="flex flex-row items-center justify-center text-zinc-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4 mt-2"
      >
        <path d="M12 5v14" />
        <path d="m19 12-7 7-7-7" />
      </svg>
    </div>
    <fieldset class="border border-zinc-400 p-3 rounded-sm flex flex-col gap-2">
      <legend class="px-1 mx-1">Output</legend>
      <div class="flex flex-row gap-2">
        <ExampleButton
          v-for="output in outputs"
          :selected="outputSelected === output"
          @click="outputSelected = output"
          >{{ output }}</ExampleButton
        >
      </div>
      <div
        class="bg-zinc-50 rounded-s h-36 font-mono text-xs p-2 whitespace-pre"
      ></div>
    </fieldset>
    <span class="text-xs text-zinc-400 italic ml-auto"
      >If you like playing with this you should try the
      <a href="https://meridiem.markwhen.com">editor</a></span
    >
  </div>
</template>

<style scoped></style>
