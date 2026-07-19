<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="300"
    width="300"
    stroke="black"
    fill="none"
    stroke-linejoin="round"
    style=""
    stroke-width="3"
    stroke-linecap="butt"
    viewBox="0 0 16.3 16.3"
  >
    <defs>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        x1="8.562"
        y1="3"
        x2="8.562"
        y2="12.715"
        id="arm-left"
        gradientTransform="matrix(0.983873, -0.178868, 0.224718, 1.236062, -2.085836, 1.071233)"
      >
        <stop offset="0" style="stop-color: #96b4af" />
        <stop offset="1" style="stop-color: #8cad9e" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        x1="8.562"
        y1="3"
        x2="8.562"
        y2="12.715"
        id="arm-middle"
        gradientTransform="matrix(0.983873, -0.178868, 0.224718, 1.236062, -2.085836, 1.071233)"
      >
        <stop offset="0" style="stop-color: #678969" />
        <stop offset="1" style="stop-color: #2e4f35" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        x1="8.562"
        y1="3"
        x2="8.562"
        y2="12.715"
        id="arm-right"
        gradientTransform="matrix(0.983873, -0.178868, 0.224718, 1.236062, -2.085836, 1.071233)"
      >
        <stop offset="0" style="stop-color: #3a5c41" />
        <stop offset="1" style="stop-color: #1d3a23" />
      </linearGradient>
    </defs>
    <!-- <rect
      style="
        stroke-width: 1px;
        paint-order: fill;
        fill-rule: nonzero;
        stroke: none;
        fill: white;
      "
      x="-2"
      width="20.3"
      height="20.3"
      y="-2"
    /> -->
    <path
      d="M 5.7871 12.7155 L 3.6658 10.5942 L 4.3716 9.8858 L 5.7858 11.3 L 5.7871 12.7155 Z"
      style="
        stroke-linecap: square;
        stroke-miterlimit: 1;
        paint-order: fill;
        fill: url(#arm-left);
        stroke-width: 2px;
        stroke: url(#arm-left);
        filter: url(#inner-shadow-filter-1) url(#drop-shadow-filter-0);
      "
    />
    <path
      d="M 7 8 L 7.5 8.5 L 8 8 L 8 3 L 7 3 Z"
      style="
        stroke-linecap: square;
        stroke-miterlimit: 1;
        paint-order: fill;
        fill: url(#arm-middle);
        stroke-width: 2px;
        stroke: url(#arm-middle);
        filter: url(#inner-shadow-filter-1) url(#drop-shadow-filter-0);
      "
    />
    <path
      d="M 9.2142 11.3 L 12.7497 7.7645 L 13.4582 8.4729 L 9.2155 12.7155 Z"
      style="
        stroke-linecap: square;
        stroke-miterlimit: 1;
        paint-order: fill;
        fill: url(#arm-right);
        stroke-width: 2px;
        stroke: url(#arm-right);
        filter: url(#inner-shadow-filter-1) url(#drop-shadow-filter-0);
      "
    />
  </svg>
</template>

<style scoped></style>
