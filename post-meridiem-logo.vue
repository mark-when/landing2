<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="300"
    width="300"
    stroke="black"
    fill="none"
    stroke-linejoin="round"
    stroke-width="3"
    stroke-linecap="butt"
    viewBox="0 0 16.3 16.3"
  >
    <defs>
      <linearGradient
        id="pm-left-gradient"
        gradientUnits="userSpaceOnUse"
        x1="8.562"
        y1="3"
        x2="8.562"
        y2="12.715"
        gradientTransform="rotate(-10 8.15 8.15)"
      >
        <stop offset="0" style="stop-color: var(--pm-left-start, #96b4af)" />
        <stop offset="1" style="stop-color: var(--pm-left-end, #8cad9e)" />
      </linearGradient>
      <linearGradient
        id="pm-middle-gradient"
        gradientUnits="userSpaceOnUse"
        x1="8.562"
        y1="3"
        x2="8.562"
        y2="12.715"
        gradientTransform="rotate(-10 8.15 8.15)"
      >
        <stop offset="0" style="stop-color: var(--pm-middle-start, #678969)" />
        <stop offset="1" style="stop-color: var(--pm-middle-end, #2e4f35)" />
      </linearGradient>
      <linearGradient
        id="pm-right-gradient"
        gradientUnits="userSpaceOnUse"
        x1="8.562"
        y1="3"
        x2="8.562"
        y2="12.715"
        gradientTransform="rotate(-10 8.15 8.15)"
      >
        <stop offset="0" style="stop-color: var(--pm-right-start, #3a5c41)" />
        <stop offset="1" style="stop-color: var(--pm-right-end, #1d3a23)" />
      </linearGradient>
    </defs>
    <path
      d="M 5.7871 12.7155 L 3.6658 10.5942 L 4.3716 9.8858 L 5.7858 11.3 L 5.7871 12.7155 Z"
      style="fill: url(#pm-left-gradient); stroke: url(#pm-left-gradient); stroke-linecap: square; stroke-miterlimit: 1; stroke-width: 2px"
    />
    <path
      d="M 7 8 L 7.5 8.5 L 8 8 L 8 3 L 7 3 Z"
      style="fill: url(#pm-middle-gradient); stroke: url(#pm-middle-gradient); stroke-linecap: square; stroke-miterlimit: 1; stroke-width: 2px"
    />
    <path
      d="M 9.2142 11.3 L 12.7497 7.7645 L 13.4582 8.4729 L 9.2155 12.7155 Z"
      style="fill: url(#pm-right-gradient); stroke: url(#pm-right-gradient); stroke-linecap: square; stroke-miterlimit: 1; stroke-width: 2px"
    />
  </svg>
</template>
