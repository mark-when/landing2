<script lang="ts" setup>
import Highlight from "./src/Highlight.vue";
import Examples from "./src/Examples.vue";
import Links from "./src/Links.vue";
import Logo from "./logo.vue";
import PostMeridiemLogo from "./post-meridiem-logo.vue";

type DownloadId = "macosArm64" | "windowsX64" | "windowsArm64";

type Download = {
  id: DownloadId;
  label: string;
  version: string;
  updatedDate?: string;
  url: string;
};

const detectedOs = useDetectedOs();
const meridiemBaseUrl =
  "https://storage.googleapis.com/markwhen_binaries/Meridiem";

const downloads = reactive<Record<DownloadId, Download>>({
  macosArm64: {
    id: "macosArm64",
    label: "macOS (arm64)",
    version: "1.0.19",
    updatedDate: "2026-07-12",
    url: `${meridiemBaseUrl}/darwin/arm64/Meridiem-darwin-arm64-1.0.19.zip`,
  },
  windowsX64: {
    id: "windowsX64",
    label: "Windows (x64)",
    version: "1.0.11",
    url: `${meridiemBaseUrl}/win32/x64/Meridiem-1.0.11 Setup.exe`,
  },
  windowsArm64: {
    id: "windowsArm64",
    label: "Windows (arm64)",
    version: "1.0.11",
    url: `${meridiemBaseUrl}/win32/arm64/Meridiem-1.0.11 Setup.exe`,
  },
});

const downloadCandidates: DownloadId[] = [
  "macosArm64",
  "windowsArm64",
  "windowsX64",
];
const availableDownloadIds = ref<DownloadId[]>([]);

const downloadIdForDetectedOs = (): DownloadId => {
  if (detectedOs.value === "windows") {
    return "windowsX64";
  }

  return "macosArm64";
};

const availableDownloadIdForDetectedOs = () => {
  const detectedDownloadId = downloadIdForDetectedOs();

  return availableDownloadIds.value.includes(detectedDownloadId)
    ? detectedDownloadId
    : availableDownloadIds.value[0];
};

const selectedDownloadId = ref<DownloadId>();
const hasSelectedDownload = ref(false);
const recipesText = ref("Loading recipes…");

const compareVersions = (a: string, b: string) => {
  const aParts = a.split(".").map((part) => Number.parseInt(part, 10) || 0);
  const bParts = b.split(".").map((part) => Number.parseInt(part, 10) || 0);
  const maxLength = Math.max(aParts.length, bParts.length);

  for (let i = 0; i < maxLength; i++) {
    const diff = (aParts[i] ?? 0) - (bParts[i] ?? 0);
    if (diff !== 0) {
      return diff;
    }
  }

  return 0;
};

const latestSquirrelVersion = (releasesText: string) =>
  releasesText
    .replace(/^\uFEFF/, "")
    .split("\n")
    .map((line) => line.match(/Meridiem-([0-9]+(?:\.[0-9]+)+)-full\.nupkg/i))
    .filter((match): match is RegExpMatchArray => !!match?.[1])
    .map((match) => match[1])
    .sort(compareVersions)
    .at(-1);

const headerDate = (value: string | null) => {
  if (!value) {
    return;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? undefined
    : date.toISOString().slice(0, 10);
};

const loadMacVersion = async (): Promise<DownloadId> => {
  const res = await fetch(`${meridiemBaseUrl}/darwin/arm64/RELEASES.json`);
  const json = await res.json();
  const latestVersion = json.currentRelease as string;
  const release = json.releases?.find(
    (release: { version?: string }) => release.version === latestVersion,
  );

  downloads.macosArm64.version = latestVersion;
  downloads.macosArm64.updatedDate =
    release?.updateTo?.pub_date?.substring(0, 10) ??
    downloads.macosArm64.updatedDate;
  downloads.macosArm64.url =
    release?.updateTo?.url ??
    `${meridiemBaseUrl}/darwin/arm64/Meridiem-darwin-arm64-${latestVersion}.zip`;

  return "macosArm64";
};

const loadWindowsVersion = async (
  id: Extract<DownloadId, "windowsX64" | "windowsArm64">,
  arch: "x64" | "arm64",
): Promise<DownloadId> => {
  const res = await fetch(`${meridiemBaseUrl}/win32/${arch}/RELEASES`);
  if (!res.ok) {
    throw new Error(`Unable to load Windows releases for win32/${arch}`);
  }

  const releasesText = new TextDecoder("utf-8").decode(await res.arrayBuffer());
  const latestVersion = latestSquirrelVersion(releasesText);

  if (!latestVersion) {
    throw new Error(`No Meridiem release found for win32/${arch}`);
  }

  downloads[id].version = latestVersion;
  downloads[id].updatedDate = headerDate(res.headers.get("last-modified"));
  downloads[id].url =
    `${meridiemBaseUrl}/win32/${arch}/Meridiem-${latestVersion} Setup.exe`;

  return id;
};

const availableDownloads = computed(() =>
  availableDownloadIds.value.map((id) => downloads[id]),
);
const selectedDownload = computed(() =>
  selectedDownloadId.value ? downloads[selectedDownloadId.value] : undefined,
);

watch(detectedOs, () => {
  if (!hasSelectedDownload.value) {
    selectedDownloadId.value = availableDownloadIdForDetectedOs();
  }
});

onMounted(async () => {
  void fetch("https://meridiem.markwhen.com/bella/recipes.raw")
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`Unable to load recipes (${res.status})`);
      }
      recipesText.value = await res.text();
    })
    .catch(() => {
      recipesText.value = "Unable to load recipes.";
    });

  const releaseResults = await Promise.allSettled([
    loadMacVersion(),
    loadWindowsVersion("windowsX64", "x64"),
    loadWindowsVersion("windowsArm64", "arm64"),
  ]);

  const loadedIds = new Set(
    releaseResults
      .filter(
        (result): result is PromiseFulfilledResult<DownloadId> =>
          result.status === "fulfilled",
      )
      .map((result) => result.value),
  );

  availableDownloadIds.value = downloadCandidates.filter((id) =>
    loadedIds.has(id),
  );

  if (!hasSelectedDownload.value) {
    selectedDownloadId.value = availableDownloadIdForDetectedOs();
  } else if (
    selectedDownloadId.value &&
    !availableDownloadIds.value.includes(selectedDownloadId.value)
  ) {
    selectedDownloadId.value = availableDownloadIds.value[0];
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
          <h1 class="font-bold" id="meridiem">
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
          A markwhen and markdown editor that supports
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
    <div class="flex flex-col items-start justify-end gap-3 px-8">
      <select
        v-if="availableDownloads.length > 1"
        v-model="selectedDownloadId"
        class="rounded bg-transparent hover:bg-white"
        @change="hasSelectedDownload = true"
      >
        <option
          v-for="download in availableDownloads"
          :key="download.id"
          :value="download.id"
        >
          {{ download.label }}
        </option>
      </select>
      <a
        v-if="selectedDownload"
        class="flex flex-row gap-4 items-center group no-underline"
        :href="selectedDownload.url"
      >
        <span class="relative h-12 w-12 shrink-0 self-start">
          <Logo
            class="bg-white absolute inset-0 h-12 w-12 rounded-xl shadow transition group-hover:shadow-lg"
          ></Logo>
          <span class="absolute left-0 top-0 block h-[calc(650px+3rem)] w-12">
            <Logo
              id="movingLogo"
              class="sticky top-[calc(50vh-1.5rem)] -z-10 block h-12 w-12 rounded-xl transition"
            ></Logo>
          </span>
        </span>
        <div class="flex flex-col">
          <span class=""> Download </span>
          <div class="flex flex-row text-sm text-zinc-400 gap-4">
            <span>v{{ selectedDownload.version }}</span>
            <span v-if="selectedDownload.updatedDate">{{
              selectedDownload.updatedDate
            }}</span>
          </div>
        </div>
      </a>
    </div>
  </div>
  <div class="relative">
    <div
      class="pointer-events-none absolute inset-y-2 left-1/4 z-40 w-16 -translate-x-1/2"
    >
      <PostMeridiemLogo
        id="iframeLogo"
        class="sticky top-[calc(20vh-2rem)] block h-12 w-12 z-30"
      ></PostMeridiemLogo>
    </div>
  <div class="relative z-50 px-4 pb-24 pt-2 w-full flex flex-col">
    <fieldset
      class="flex flex-col w-full lg:w-[100ch] xl:w-2/3 mx-auto group shadow-lg rounded-lg"
    >
      <iframe
        src="https://meridiem.markwhen.com"
        height="650"
        width="100%"
        loading="lazy"
        title="Meridiem editor"
        class="rounded-lg"
      ></iframe>
    </fieldset>
  </div>
  <div
    class="pt-12 pb-48 flex flex-col px-4 lg:gap-4 gap-2 lg:grid lg:grid-cols-3 lg:w-[100ch] lg:mx-auto"
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
            href="https://meridiem.markwhen.com/bella/recipes.raw"
            class="no-underline"
          >
            <span class="text-stone-400">meridiem.markwhen.com/</span
            >bella/recipes.raw
          </a>
        </legend>
        <pre
          class="w-full grow h-full min-h-48 overflow-auto whitespace-pre-wrap p-2 font-mono text-xs"
          aria-label="Bella's recipes"
          >{{ recipesText }}</pre
        >
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
  <Links></Links>
  <div class="relative h-[9000px] w-screen">
    <div class="pointer-events-none absolute inset-0 z-30">
      <div class="sticky top-0 h-dvh overflow-hidden">
        <div class="dusk-shade absolute inset-0" />
        <div class="scroll-glow absolute inset-x-0 bottom-0 z-0 h-screen" />
      </div>
    </div>
  </div>
  </div>
</template>

<style>
.scroll-glow {
  color: rgb(255, 224, 196);
  opacity: 0.03;
  background:
    radial-gradient(ellipse 90% 65% at 50% 100%, currentColor, transparent 72%),
    linear-gradient(to top, currentColor, transparent 82%);
  animation: deepen-glow auto linear both;
  animation-timeline: scroll(root block);
  animation-range: 0% 100%;
}

.dusk-shade {
  background: rgb(20, 8, 34);
  opacity: 0;
  animation: darken-page auto linear both;
  animation-timeline: scroll(root block);
  animation-range: 0% 100%;
}

@property --pm-left-start {
  syntax: "<color>";
  inherits: true;
  initial-value: #96b4af00;
}

@property --pm-left-end {
  syntax: "<color>";
  inherits: true;
  initial-value: #8cad9e00;
}

@property --pm-middle-start {
  syntax: "<color>";
  inherits: true;
  initial-value: #67896900;
}

@property --pm-middle-end {
  syntax: "<color>";
  inherits: true;
  initial-value: #2e4f3500;
}

@property --pm-right-start {
  syntax: "<color>";
  inherits: true;
  initial-value: #3a5c4100;
}

@property --pm-right-end {
  syntax: "<color>";
  inherits: true;
  initial-value: #1d3a2300;
}

#iframeLogo {
  animation: iframe-logo-colors auto linear both;
  animation-timeline: scroll(root block);
  animation-range: 0% 100%;
}

@keyframes iframe-logo-colors {
  to {
    --pm-left-start: #d1e1d4;
    --pm-left-end: #91a79f;
    --pm-middle-start: #f4c680;
    --pm-middle-end: #e8a36e;
    --pm-right-start: #f28f88;
    --pm-right-end: #a25d70;
  }
}

@keyframes darken-page {
  0%,
  35% {
    opacity: 0;
  }

  70% {
    opacity: 0.8;
  }

  100% {
    opacity: 0.95;
  }
}

@keyframes deepen-glow {
  0% {
    color: rgb(255, 224, 196);
    opacity: 0.03;
  }

  38% {
    color: rgb(249, 115, 22);
    opacity: 0.18;
  }

  68% {
    color: rgb(220, 38, 75);
    opacity: 0.42;
  }

  100% {
    color: rgb(58, 10, 88);
    opacity: 0.78;
  }
}
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
  font-family:
    Work Sans,
    sans-serif;
}
.playfair {
  font-family:
    Playfair Display,
    serif;
}

.border-animated {
  background:
    linear-gradient(90deg, #c1c1c8 50%, transparent 50%),
    linear-gradient(90deg, #c1c1c8 50%, transparent 50%),
    linear-gradient(0deg, #c1c1c8 50%, transparent 50%),
    linear-gradient(0deg, #c1c1c8 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size:
    24px 1px,
    24px 1px,
    1px 24px,
    0px 24px;
  background-position:
    0% 0%,
    100% 100%,
    0% 100%,
    100% 0px;
  animation: dash 30s linear infinite;
}

@keyframes dash {
  from {
    background-position:
      100% 0%,
      0% 100%,
      0% 0%,
      100% 100%;
  }
  to {
    background-position:
      0% 0%,
      100% 100%,
      0% 100%,
      100% 0%;
  }
}

.border-animated-2 {
  background:
    linear-gradient(90deg, #c1c1c8 50%, transparent 50%),
    linear-gradient(90deg, #c1c1c8 50%, transparent 50%),
    linear-gradient(0deg, #c1c1c8 50%, transparent 50%),
    linear-gradient(0deg, #c1c1c8 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size:
    24px 0px,
    24px 1px,
    0px 24px,
    1px 24px;
  background-position:
    0% 0%,
    100% 100%,
    0% 100%,
    100% 0px;
  animation: dash-reverse 60s linear infinite;
}

@keyframes dash-reverse {
  to {
    background-position:
      100% 0%,
      0% 100%,
      0% 0%,
      100% 100%;
  }
}
</style>
