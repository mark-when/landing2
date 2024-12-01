<script lang="ts" setup>
import Highlight from "./src/Highlight.vue";
import Examples from "./src/Examples.vue";

const latestBinaryVersion = ref("0.2.2");
onMounted(async () => {
  const res = await fetch(
    "https://storage.googleapis.com/markwhen_binaries/Meridiem/darwin/arm64/RELEASES.json"
  );
  const json = await res.json();
  latestBinaryVersion.value = json.currentRelease;
});
</script>
<template>
  <div
    class="pt-24 lg:pt-24 flex flex-col px-4 gap-16 lg:grid lg:grid-cols-2 lg:w-[100ch] lg:mx-auto relative"
  >
    <div
      class="hidden lg:block absolute top-36 w-3/4 border-animated -left-24 h-1/2 rounded pointer-events-none"
    ></div>
    <div class="flex flex-col lg:pt-8 gap-2 lg:px-0 px-4">
      <div class="flex flex-col gap-1">
        <div class="gap-1 flex flex-row playfair text-2xl">
          <h1 class="font-bold z-10 bg-zinc-100 px-2">Markwhen</h1>
        </div>
        <div class="flex flex-row gap-2 playfair px-2">
          <span class="text-stone-500 italic">noun</span>
          <span class="text-stone-500">/mɑrk·wɛn/</span>
        </div>
      </div>
      <ol class="list-decimal px-2">
        <li class="text-2xl leading-9 playfair">
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
          <span class="bg-stone-700 text-stone-100 rounded shadow"
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
      <div class="flex flex-col gap-1 px-2">
        <div class="gap-1 flex flex-row playfair text-2xl">
          <h1 class="font-bold">
            <a
              href="https://meridiem.markwhen.com"
              class="decoration-dotted px-2 bg-zinc-100"
              >Meridiem</a
            >
          </h1>
        </div>
        <div class="flex flex-row gap-2 playfair px-2">
          <span class="text-stone-500 italic">noun</span>
          <span class="text-stone-500">/mə·ˈri·dē·əm/</span>
        </div>
      </div>
      <ol class="list-decimal text-2xl leading-9 playfair px-4">
        <li class="">
          <!-- <span class="merriweather">Markwhen</span> -->
          <!-- <span class="sourceSerif">Markwhen</span> -->
          A markwhen editor that supports
          <highlight class="bg-cyan-200">collaborative editing</highlight>,
          <highlight class="bg-red-200">custom commands</highlight>,
          <highlight class="bg-lime-200">snippets</highlight>,
          <highlight class="bg-indigo-200">custom visualizations</highlight>,
          <highlight class="bg-fuchsia-200">autocomplete</highlight>,
          <highlight class="bg-sky-200">event highlighting</highlight>,
          <!-- <highlight class="bg-yellow-200">timelines</highlight>, -->
          <!-- <highlight class="bg-pink-200">calendars</highlight> and -->
          and
          <span class="bg-stone-700 text-stone-100 rounded shadow"
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
  <div class="px-4 pb-24 pt-2 w-full">
    <fieldset
      class="flex flex-col w-full lg:w-[100ch] xl:w-2/3 mx-auto rounded-sm group border border-stone-400 bg-zinc-200 shadow-lg"
    >
      <legend class="mx-3 px-1 playfair">Meridiem Editor</legend>
      <a
        href="https://meridiem.markwhen.com"
        target="_blank"
        class="flex flex-col px-4 py-px mb-1 mx-auto rounded-sm decoration-dotted"
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
    class="flex flex-col items-start gap-2 pb-48 px-4 lg:w-[100ch] lg:mx-auto playfair overflow-scroll"
  >
    <div class="flex flex-col">
      <a href="https://docs.markwhen.com/" class="underline mb-2"
        >Documentation</a
      >
      <a href="https://meridiem.markwhen.com/example">Example</a>
      <a
        href="https://marketplace.visualstudio.com/items?itemName=Markwhen.markwhen"
        >VS Code extension</a
      >
      <a href="https://obsidian.md/plugins?id=markwhen">Obsidian plugin</a>
      <a href="https://discord.com/invite/3rTpUD94ac">Discord</a>
    </div>

    <div class="flex flex-col">
      <a href="https://github.com/mark-when">Github</a>
      <table>
        <tr>
          <td>
            <a href="https://github.com/mark-when/markwhen"
              >General issue tracking</a
            >
          </td>
          <td>
            <a href="https://github.com/mark-when/markwhen"
              >mark-when/markwhen</a
            >
          </td>
          <td>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=mark-when&repo=markwhen&type=star&count=true"
              frameborder="0"
              scrolling="0"
              width="170"
              height="20"
              title="GitHub"
            >
            </iframe>
          </td>
        </tr>
        <tr>
          <td>
            <a href="https://github.com/mark-when/obsidian-plugin"
              >Obsidian Plugin</a
            >
          </td>
          <td>
            <a href="https://github.com/mark-when/obsidian-plugin"
              >mark-when/obsidian-plugin</a
            >
          </td>
          <td>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=mark-when&repo=obsidian-plugin&type=star&count=true"
              frameborder="0"
              scrolling="0"
              width="170"
              height="20"
              title="GitHub"
            >
            </iframe>
          </td>
        </tr>
        <tr>
          <td>
            <a href="https://github.com/mark-when/mw">Markwhen CLI</a>
          </td>
          <td>
            <a href="https://github.com/mark-when/mw">mark-when/mw</a>
          </td>
          <td>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=mark-when&repo=mw&type=star&count=true"
              frameborder="0"
              scrolling="0"
              width="170"
              height="20"
              title="GitHub"
            >
            </iframe>
          </td>
        </tr>
        <tr>
          <td>
            <a href="https://github.com/mark-when/timeline">Timeline</a>
          </td>
          <td>
            <a href="https://github.com/mark-when/timeline"
              >mark-when/timeline</a
            >
          </td>
          <td>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=mark-when&repo=timeline&type=star&count=true"
              frameborder="0"
              scrolling="0"
              width="170"
              height="20"
              title="GitHub"
            >
            </iframe>
          </td>
        </tr>
        <tr>
          <td><a href="https://github.com/mark-when/parser">Parser</a></td>
          <td>
            <a href="https://github.com/mark-when/parser">mark-when/parser</a>
          </td>
          <td>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=mark-when&repo=parser&type=star&count=true"
              frameborder="0"
              scrolling="0"
              width="170"
              height="20"
              title="GitHub"
            >
            </iframe>
          </td>
        </tr>
        <tr>
          <td>
            <a href="https://github.com/mark-when/vscode">VS Code Extension</a>
          </td>
          <td>
            <a href="https://github.com/mark-when/vscode">mark-when/vscode</a>
          </td>
          <td>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=mark-when&repo=vscode&type=star&count=true"
              frameborder="0"
              scrolling="0"
              width="170"
              height="20"
              title="GitHub"
            >
            </iframe>
          </td>
        </tr>
        <tr>
          <td>
            <a href="https://github.com/mark-when/view-client"
              >View client library</a
            >
          </td>
          <td>
            <a href="https://github.com/mark-when/view-client"
              >mark-when/view-client</a
            >
          </td>
          <td>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=mark-when&repo=view-client&type=star&count=true"
              frameborder="0"
              scrolling="0"
              width="170"
              height="20"
              title="GitHub"
            >
            </iframe>
          </td>
        </tr>
        <tr>
          <td>
            <a href="https://github.com/mark-when/calendar">Calendar</a>
          </td>
          <td>
            <a href="https://github.com/mark-when/calendar"
              >mark-when/calendar</a
            >
          </td>
          <td>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=mark-when&repo=calendar&type=star&count=true"
              frameborder="0"
              scrolling="0"
              width="170"
              height="20"
              title="GitHub"
            >
            </iframe>
          </td>
        </tr>
        <tr>
          <td>
            <a href="https://github.com/mark-when/c2">C2</a>
          </td>
          <td>
            <a href="https://github.com/mark-when/c2">mark-when/c2</a>
          </td>
          <td>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=mark-when&repo=c2&type=star&count=true"
              frameborder="0"
              scrolling="0"
              width="170"
              height="20"
              title="GitHub"
            >
            </iframe>
          </td>
        </tr>
        <tr>
          <td>
            <a href="https://github.com/mark-when/resume">Resume</a>
          </td>
          <td>
            <a href="https://github.com/mark-when/resume">mark-when/resume</a>
          </td>
          <td>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=mark-when&repo=resume&type=star&count=true"
              frameborder="0"
              scrolling="0"
              width="170"
              height="20"
              title="GitHub"
            >
            </iframe>
          </td>
        </tr>
      </table>
    </div>
  </div>
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
