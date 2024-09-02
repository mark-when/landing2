<script setup lang="ts">
import ExampleButton from "./ExampleButton.vue";
import { ref } from "vue";
import { parse } from "@markwhen/parser";

const examples = [
  [
    "Basic Syntax",
    `2025-04-09: Single date
2025-01-22 / 2025-01-24: Date range

Dec 1 2025: Supports multiple date formats
And longer descriptions
`,
  ],
  [
    "Groups",
    `group Part one
2024-12-24: Christmas Eve
2024-12-25: Christmas
endGroup

group Part two
2024-12-31: New Year's Eve
2025-01-01: New Year's Day
endGroup
`,
  ],
  [
    "Tags",
    `#holiday: red

2025-01-01: New Year's Day #holiday`,
  ],
  ["Checklists", ``],
];
const exampleSelected = ref<string>(examples[0][0]);

const outputs = ["JSON", "Timeline", "Oneview", "iCal"];
const outputSelected = ref<string>(outputs[1]);
</script>

<template>
  <div class="flex flex-col gap-1">
    <fieldset class="border border-zinc-400 p-3 rounded-sm flex flex-col gap-2">
      <legend class="px-1 mx-1 playfair">Markwhen input</legend>
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
        class="bg-zinc-50 rounded-s h-48 font-mono text-sm p-2 whitespace-pre"
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
      <legend class="px-1 mx-1 playfair">Output</legend>
      <div class="flex flex-row gap-2">
        <ExampleButton
          v-for="output in outputs"
          :selected="outputSelected === output"
          @click="outputSelected = output"
          >{{ output }}</ExampleButton
        >
      </div>
      <div
        class="bg-zinc-50 rounded-s h-64 font-mono text-xs p-2 whitespace-pre overflow-y-scroll"
      >
        {{ parse("") }}
      </div>
    </fieldset>
    <span class="text-xs text-zinc-400 italic ml-auto"
      >If you like playing with this you should try the
      <a href="https://meridiem.markwhen.com">editor</a
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-3 w-3 inline ml-px"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 6h6a3 3 0 0 1 3 3v10l-4 -4m8 0l-4 4" /></svg
    ></span>
  </div>
</template>

<style scoped></style>
