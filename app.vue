<script lang="ts" setup>
import Highlight from "./src/Highlight.vue";
import Examples from "./src/Examples.vue";
</script>
<template>
  <div
    class="pt-12 lg:pt-48 flex flex-col px-4 gap-16 lg:grid lg:grid-cols-2 lg:w-[100ch] lg:mx-auto"
  >
    <div class="flex flex-col lg:pt-8 gap-2">
      <!-- <div class="text-2xl">
        Markwhen is a plain text, markdown-like
        <strong>journal language</strong>.<sup>*</sup>
      </div> -->
      <!-- <p>
          *<em><strong>Journal language</strong></em
          >: A series of dates with accompanying text.
        </p> -->
      <div class="flex flex-col gap-1">
        <div class="gap-1 flex flex-row playfair text-2xl">
          <h1 class="font-bold">Markwhen</h1>
        </div>
        <div class="flex flex-row gap-2 playfair">
          <span class="text-stone-500 italic">noun</span>
          <span class="text-stone-500">/mɑrk·wɛn/</span>
        </div>
      </div>
      <ol class="list-decimal">
        <li class="text-2xl leading-9 playfair">
          <!-- <span class="merriweather">Markwhen</span> -->
          <!-- <span class="sourceSerif">Markwhen</span> -->
          A markdown-like language for plainly writing
          <highlight class="bg-cyan-200">logs</highlight>,
          <highlight class="bg-orange-200">blogs</highlight>,
          <highlight class="bg-red-200">feeds</highlight>,
          <highlight class="bg-lime-200">notes</highlight>,
          <highlight class="bg-indigo-200">journals</highlight>,
          <highlight class="bg-fuchsia-200">diaries</highlight>,
          <highlight class="bg-sky-200">todos</highlight>,
          <highlight class="bg-yellow-200">timelines</highlight>,
          <highlight class="bg-pink-200">calendars</highlight> or
          <span class="bg-stone-700 text-stone-100 rounded shadow"
            >&nbsp;anything that happens over time&nbsp;</span
          >.
        </li>
      </ol>
    </div>
    <Examples class="lg:mx-auto lg:w-[30rem]"> </Examples>
  </div>
  <div class="flex flex-col items-start gap-2 py-4">
    <div class="flex flex-col">
      <a href="https://meridiem.markwhen.com/example">Example</a>
      <a href="https://docs.markwhen.com/" class="underline">Documentation</a>
      <a
        href="https://marketplace.visualstudio.com/items?itemName=Markwhen.markwhen"
        >VS Code extension</a
      >
      <a href="https://obsidian.md/plugins?id=markwhen">Obsidian plugin</a>
    </div>
    <div class="flex flex-col">
      <a href="https://github.com/mark-when">Github</a>
      <ul class="list-inside list-disc">
        <li>
          <a href="https://github.com/mark-when/markwhen"
            >mark-when/markwhen (general issue tracking)</a
          >
        </li>
        <li>
          <a href="https://github.com/mark-when/parser">mark-when/parser</a>
        </li>
        <li>
          <a href="https://github.com/mark-when/vscode"
            >mark-when/vscode (VS Code extension)</a
          >
        </li>
        <li>
          <a href="https://github.com/mark-when/mw">mark-when/mw (CLI)</a>
        </li>
        <li>
          <a href="https://github.com/mark-when/obsidian-plugin"
            >mark-when/obsidian-plugin</a
          >
        </li>
      </ul>
    </div>
    <div class="flex flex-col">
      <a href="https://docs.markwhen.com/visualizations.html">Visualizations</a>
      <ul class="list-inside list-disc">
        <li>
          <a href="https://github.com/mark-when/view-client"
            >mark-when/view-client</a
          >
        </li>
        <li>
          <a href="https://github.com/mark-when/timeline">mark-when/timeline</a>
        </li>
        <li>
          <a href="https://github.com/mark-when/calendar">mark-when/calendar</a>
        </li>
        <li>
          <a href="https://github.com/mark-when/c2">mark-when/c2</a>
        </li>
        <li>
          <a href="https://github.com/mark-when/resume">mark-when/resume</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="lg:mx-auto lg:min-w-[30rem] flex flex-col gap-2">
    <div class="flex flex-row items-center gap-2">
      <img
        src="https://meridiem.markwhen.com/icon_192.png"
        class="h-5 w-5 rounded"
      />
      <h1 class="text-2xl">
        <a href="https://meridiem.markwhen.com">Meridiem</a> is the
        <span class="font-bold">editor</span>
      </h1>
    </div>
    <div class="flex flex-row items-center gap-2">
      <img
        src="https://meridiem.markwhen.com/logo-electron.svg"
        alt=""
        class="h-5 w-5 rounded"
      />
      <a
        href="https://storage.googleapis.com/markwhen_binaries/Meridiem/darwin/arm64/Meridiem-darwin-arm64-0.0.1.zip"
        >Download (macOS arm64 beta)</a
      >
    </div>
  </div>
  <div class="px-4 pb-24 pt-2 w-full">
    <div
      class="flex flex-col w-full lg:w-2/3 mx-auto group border rounded-xl border-stone-400 bg-zinc-200"
    >
      <a
        href="https://meridiem.markwhen.com"
        target="_blank"
        class="flex flex-col py-1"
      >
        <div class="flex flex-row md:mx-auto md:min-w-[30rem] px-4 md:px-0">
          <p class="">Open in new tab -></p>
        </div>
      </a>
      <iframe
        src="https://meridiem.markwhen.com"
        height="650"
        width="100%"
        class="rounded-xl bg-white"
      ></iframe>
    </div>
  </div>
</template>

<style>
body {
  @apply bg-zinc-200;
}
a {
  @apply underline;
}
.merriweather {
  font-family: Merriweather, serif;
}
.sourceSerif {
  font-family: Source Serif Pro, serif;
}
.playfair {
  font-family: Playfair Display, serif;
}
</style>
