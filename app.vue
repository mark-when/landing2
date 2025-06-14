<script lang="ts" setup>
import Highlight from "./src/Highlight.vue";
import Examples from "./src/Examples.vue";
import Links from "./src/Links.vue";

const latestBinaryVersion = ref("0.2.5");
onMounted(async () => {
  try {
    const res = await fetch(
      "https://storage.googleapis.com/markwhen_binaries/Meridiem/darwin/arm64/RELEASES.json"
    );
    const json = await res.json();
    latestBinaryVersion.value = json.currentRelease;
  } catch (e) {
    console.error(e);
  }
});
</script>
<template>
  <div
    class="pt-24 lg:pt-24 flex flex-col px-4 gap-16 lg:grid lg:grid-cols-2 lg:w-[100ch] lg:mx-auto relative"
  >
    <div
      class="hidden lg:block absolute top-36 w-3/4 border-animated -left-24 h-1/2 rounded pointer-events-none"
    >
      <div class="absolute bottom-0 left-28 right-0 flex items-center"></div>
    </div>
    <div class="flex flex-col lg:pt-8 gap-2 lg:px-0 px-4 playfair">
      <div class="flex flex-col gap-1">
        <div class="gap-1 flex flex-row text-2xl">
          <h1 class="font-bold z-10 bg-zinc-100 px-2">Markwhen</h1>
        </div>
        <div class="flex flex-row gap-2 px-2">
          <span class="text-stone-400 italic">noun</span>
          <span class="text-stone-400">/mɑrk·wɛn/</span>
        </div>
        <div class="flex flex-row gap-2 px-2">
          <span class="text-stone-400">see also: </span>
          <a
            class="text-stone-500 flex items-center gap-1 decoration-dotted"
            href="https://docs.markwhen.com"
            >markwhen documentation
          </a>
        </div>
      </div>
      <ol class="list-decimal px-2">
        <li class="text-2xl leading-9">
          <!-- <span class="merriweather">Markwhen</span> -->
          <!-- <span class="sourceSerif">Markwhen</span> -->
          A markdown-like <em>journal language</em> for plainly writing
          <highlight class="bg-cyan-200">logs</highlight>,
          <highlight class="bg-slate-200">gantt charts</highlight>,
          <highlight class="bg-orange-200">blogs</highlight>,
          <highlight class="bg-red-200">feeds</highlight>,
          <highlight class="bg-lime-200">notes</highlight>,
          <highlight class="bg-indigo-200">journals</highlight>,
          <highlight class="bg-fuchsia-200">diaries</highlight>,
          <highlight class="bg-sky-200">todos</highlight>,
          <highlight class="bg-yellow-200">timelines</highlight>,
          <highlight class="bg-pink-200">calendars</highlight> or
          <span class="bg-stone-800 text-stone-100 rounded shadow"
            >&nbsp;anything that happens over time&nbsp;</span
          >.
        </li>
      </ol>
    </div>
    <Examples class="lg:mx-auto lg:w-[30rem]"> </Examples>
  </div>
  <div
    class="pt-16 pb-8 flex flex-col px-2 gap-16 lg:grid lg:grid-cols-2 lg:w-[100ch] lg:mx-auto relative"
  >
    <div
      class="hidden lg:block absolute top-0 border-animated-2 -left-full right-[14rem] h-[7.25rem] rounded pointer-events-none"
    ></div>
    <div class="flex flex-col lg:pt-8 gap-2 lg:px-0 px-4 z-0">
      <div class="flex flex-col gap-1 px-2 playfair">
        <div class="gap-1 flex flex-row text-2xl">
          <h1 class="font-bold">
            <a
              href="https://meridiem.markwhen.com"
              class="decoration-dotted px-2 bg-zinc-100"
              >Meridiem</a
            >
          </h1>
        </div>
        <div class="flex flex-row gap-2 px-2">
          <span class="text-stone-400 italic">noun</span>
          <span class="text-stone-400">/mə·ˈri·dē·əm/</span>
        </div>
        <div class="flex flex-row gap-2 px-2">
          <span class="text-stone-400">see also: </span>
          <a
            class="text-stone-500 flex items-center gap-1 decoration-dotted"
            href="https://docs.markwhen.com/meridiem"
            >meridiem documentation
          </a>
        </div>
      </div>
      <ol class="list-decimal text-2xl leading-9 playfair px-4">
        <li class="">
          <!-- <span class="merriweather">Markwhen</span> -->
          <!-- <span class="sourceSerif">Markwhen</span> -->
          Markwhen editor that supports
          <highlight class="bg-cyan-200">collaborative editing</highlight>,
          <highlight class="bg-red-200">custom commands</highlight>,
          <highlight class="bg-lime-200">snippets</highlight>,
          <highlight class="bg-indigo-200">custom visualizations</highlight>,
          <highlight class="bg-fuchsia-200">autocomplete</highlight>,
          <highlight class="bg-sky-200">event highlighting</highlight>,
          <!-- <highlight class="bg-yellow-200">timelines</highlight>, -->
          <!-- <highlight class="bg-pink-200">calendars</highlight> and -->
          and
          <span class="bg-stone-800 text-stone-100 rounded shadow"
            >&nbsp;more&nbsp;</span
          >.
        </li>
      </ol>
    </div>
    <div class="flex flex-row items-end gap-2 px-8">
      <a
        class="flex flex-row gap-4 items-center group no-underline"
        :href="`https://storage.googleapis.com/markwhen_binaries/Meridiem/darwin/arm64/Meridiem-darwin-arm64-${latestBinaryVersion}.zip`"
      >
        <img
          src="https://meridiem.markwhen.com/logo-electron.svg"
          alt=""
          class="h-12 w-12 rounded-xl shadow group-hover:shadow-lg transition"
        />
        <div class="flex flex-col">
          <span class=""> Download (macOS arm64 beta) </span>
          <span class="text-sm text-zinc-400">v{{ latestBinaryVersion }}</span>
        </div>
      </a>
    </div>
  </div>
  <div class="px-4 pb-24 pt-2 w-full flex flex-col">
    <fieldset
      class="flex flex-col w-full lg:w-[100ch] xl:w-2/3 mx-auto rounded-sm group border border-stone-400 bg-zinc-200 shadow-lg"
    >
      <legend
        class="mx-3 px-1 playfair inline-table text-white rounded bg-green-900 shadow-lg"
      >
        Meridiem Editor
      </legend>
      <a
        href="https://meridiem.markwhen.com"
        target="_blank"
        class="flex flex-col px-4 py-px mb-1 mx-auto rounded-sm decoration-dotted text-stone-900"
        >Open in new tab ->
      </a>
      <iframe
        src="https://meridiem.markwhen.com"
        height="650"
        width="100%"
      ></iframe>
    </fieldset>
  </div>
  <div
    class="pt-12 pb-48 flex flex-col px-4 lg:gap-4 gap-2 lg:grid lg:grid-cols-3 lg:w-[100ch] lg:mx-auto relative"
    style="grid-template-columns: 1fr auto 1fr"
  >
    <div class="flex flex-col lg:pt-8 gap-2 lg:px-0 px-4 col-span-1">
      <div class="flex flex-col gap-1 playfair">
        <div class="gap-1 flex flex-row text-2xl">
          <a
            class="font-bold z-10 bg-zinc-100 px-2 decoration-dotted"
            href="https://remark.ing"
            >Remark.ing</a
          >
        </div>
        <div class="flex flex-row gap-2 px-2">
          <span class="text-stone-400 italic">verb gerund</span>
          <span class="text-stone-400">/rəˈmärkˈiNG/</span>
        </div>
        <div class="flex flex-row gap-2 px-2">
          <span class="text-stone-400">see also: </span>
          <a
            class="text-stone-500 flex items-center gap-1 decoration-dotted"
            href="https://docs.markwhen.com/remarking"
            >remarking documentation
          </a>
        </div>
      </div>
      <ol class="list-decimal px-2">
        <li class="text-2xl leading-9 playfair">
          Writing with markwhen: Each entry becomes a tweet-like remark
        </li>
      </ol>
    </div>
    <div class="row-start-2 col-span-1 flex flex-col">
      <fieldset
        class="border border-zinc-400 rounded-sm flex grow flex-col gap-2"
      >
        <legend class="px-1 mx-1 playfair inline-table bg-transparent">
          <a
            href="https://meridiem.markwhen.com/bella/recipes.mw"
            class="no-underline"
          >
            <span class="text-stone-400">meridiem.markwhen.com/</span
            >bella/recipes.mw
          </a>
        </legend>
        <div class="flex grow">
          <iframe
            class="w-full grow h-full min-h-48"
            src="https://meridiem.markwhen.com/bella/recipes.mw"
          ></iframe>
        </div>
      </fieldset>
    </div>
    <div
      class="flex flex-row items-center justify-center text-zinc-400 row-start-2 col-span-1"
    >
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
        class="h-4 w-4 lg:hidden block"
      >
        <path d="M12 5v14"></path>
        <path d="m19 12-7 7-7-7"></path>
      </svg>
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
        class="lg:block h-4 w-4 hidden"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </div>
    <div class="row-start-2 col-span-1 flex flex-col">
      <fieldset class="border border-zinc-400 rounded-sm flex flex-col gap-2">
        <legend class="px-1 mx-1 playfair bg-transparent inline-table">
          <a href="https://remark.ing/bella/recipes" class="no-underline">
            <span class="text-stone-400">remark.ing/</span>bella/recipes</a
          >
        </legend>
        <blockquote data-remarking-uri="/bella/recipes"></blockquote>
      </fieldset>
    </div>
    <div class="col-span-3 row-start-3">
      <a
        href="https://remark.ing"
        class="playfair flex flex-row items-center gap-1"
        ><span
          class="px-2 bg-stone-700 text-stone-100 rounded shadow transition hover:shadow-lg"
          >Sign in with Meridiem to get started</span
        >
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
          class="h-3 w-3"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" /></svg
      ></a>
    </div>
  </div>
  <div
    class="pt-16 pb-8 flex flex-col px-2 gap-16 lg:grid lg:grid-cols-2 lg:w-[100ch] lg:mx-auto relative"
  >
    <div class="flex flex-col lg:pt-8 gap-2 lg:px-0 px-4 z-0">
      <div class="flex flex-col gap-1 px-8 playfair">
        <div class="gap-1 flex flex-row text-2xl">
          <h1 class="font-bold">
            <a
              href="https://timeline.markwhen.com/markwhen/sponsorline"
              class="decoration-dotted bg-zinc-100"
              >Markwhen Sponsorline</a
            >
          </h1>
        </div>
        <div class="">
          Like and use markwhen? Want it to get better for your use case?
          <a href="https://github.com/sponsors/kochrt"
            >Consider sponsoring the open source project.</a
          >
        </div>
        <ul class="list-disc">
          <li>
            Support the development of the Obsidian plugin, VS Code extension,
            Meridiem, the timeline, and the parser
          </li>
          <li>
            Get yourself added to the sponsorline (and add a message if you
            want)
          </li>
          <li>
            Help keep its creator from getting a job optimizing ad delivery or
            something equally depressing
          </li>
        </ul>
        <a
          class="flex flex-row items-center gap-1"
          href="https://github.com/sponsors/kochrt"
          >Sponsor on GitHub<svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4"
            data-v-inspector="app.vue:203:7"
          >
            <path d="M5 12h14" data-v-inspector="app.vue:215:9"></path>
            <path
              d="m12 5 7 7-7 7"
              data-v-inspector="app.vue:216:9"
            ></path></svg
        ></a>
      </div>
    </div>
  </div>
  <div class="w-full lg:w-[100ch] xl:w-2/3 px-4 mx-auto pb-36">
    <iframe
      src="https://timeline.markwhen.com/markwhen/sponsorline"
      class="w-full h-[70ch] border border-stone-400 rounded-sm shadow-lg"
    ></iframe>
  </div>
  <Links></Links>
</template>

<style>
td {
  @apply pr-8;
}
body {
  @apply bg-zinc-100;
}
a {
  @apply underline;
}
.worksans {
  font-family: Work Sans, sans-serif;
}
.playfair {
  font-family: Playfair Display, serif;
}

.border-animated {
  background: linear-gradient(90deg, #c1c1c8 50%, transparent 50%),
    linear-gradient(90deg, #c1c1c8 50%, transparent 50%),
    linear-gradient(0deg, #c1c1c8 50%, transparent 50%),
    linear-gradient(0deg, #c1c1c8 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 24px 1px, 24px 1px, 1px 24px, 0px 24px;
  background-position: 0% 0%, 100% 100%, 0% 100%, 100% 0px;
  animation: dash 30s linear infinite;
}

@keyframes dash {
  from {
    background-position: 100% 0%, 0% 100%, 0% 0%, 100% 100%;
  }
  to {
    background-position: 0% 0%, 100% 100%, 0% 100%, 100% 0%;
  }
}

.border-animated-2 {
  background: linear-gradient(90deg, #c1c1c8 50%, transparent 50%),
    linear-gradient(90deg, #c1c1c8 50%, transparent 50%),
    linear-gradient(0deg, #c1c1c8 50%, transparent 50%),
    linear-gradient(0deg, #c1c1c8 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 24px 0px, 24px 1px, 0px 24px, 1px 24px;
  background-position: 0% 0%, 100% 100%, 0% 100%, 100% 0px;
  animation: dash-reverse 60s linear infinite;
}

@keyframes dash-reverse {
  to {
    background-position: 100% 0%, 0% 100%, 0% 0%, 100% 100%;
  }
}
</style>
