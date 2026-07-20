<script setup lang="ts">
const STAR_COUNT = 150;

const pseudoRandom = (star: number, channel: number) => {
  let value = Math.imul(star, 374761393) + Math.imul(channel, 668265263);
  value = (value ^ (value >>> 13)) >>> 0;
  value = Math.imul(value, 1274126177) >>> 0;

  return ((value ^ (value >>> 16)) >>> 0) / 0x100000000;
};

const stars = Array.from({ length: STAR_COUNT }, (_, index) => {
  const star = index + 1;

  return {
    id: star,
    left: pseudoRandom(star, 1) * 100,
    top: pseudoRandom(star, 2) * 82,
    size: pseudoRandom(star, 3),
    duration: 2 + pseudoRandom(star, 4) * 20,
    delay: -pseudoRandom(star, 5) * 5,
  };
});
</script>

<template>
  <div class="night-sky" aria-hidden="true">
    <span
      v-for="star in stars"
      :key="star.id"
      class="star"
      :style="{
        '--star-left': `${star.left}%`,
        '--star-top': `${star.top}%`,
        '--star-size': `${star.size}px`,
        '--star-duration': `${star.duration}s`,
        '--star-delay': `${star.delay}s`,
      }"
    />
  </div>
</template>

<style scoped>
.night-sky {
  opacity: 0;
  background: radial-gradient(
    ellipse at 50% 20%,
    rgb(26 29 58 / 0.4),
    transparent 68%
  );
  animation: reveal-stars auto linear both;
  animation-timeline: scroll(root block);
  animation-range: 0% 100%;
}

.star {
  position: absolute;
  top: var(--star-top);
  left: var(--star-left);
  width: var(--star-size);
  height: var(--star-size);
  border-radius: 9999px;
  background: #fff;
  box-shadow: 0 0 2px 0px #bcd4ff;
  animation: twinkle var(--star-duration) ease-in-out var(--star-delay) infinite;
}

@keyframes reveal-stars {
  0%,
  48% {
    opacity: 0;
  }

  72% {
    opacity: 0.5;
  }

  100% {
    opacity: 0.8;
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(0.8);
  }

  50% {
    opacity: 1;
    transform: scale(1.15);
  }
}

@media (prefers-reduced-motion: reduce) {
  .star {
    animation: none;
  }
}
</style>
