<script setup lang="ts" name="DiamondParticleTrail">
import { ref, onMounted, onUnmounted, useTemplateRef, nextTick } from "vue";
import { PARTICLE_TRAIL_CONFIG } from "../config/particle-trail.config";
import { useDiamondParticleTrail } from "../composables/use-diamond-particle-trail";

const enabled = ref(false);
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");
const trail = useDiamondParticleTrail(PARTICLE_TRAIL_CONFIG);

onMounted(async () => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDesktop = window.matchMedia(`(min-width: ${PARTICLE_TRAIL_CONFIG.desktopMinWidth}px)`).matches;

  enabled.value = PARTICLE_TRAIL_CONFIG.enabled && isDesktop && !prefersReduced;

  if (!enabled.value) return;

  await nextTick();

  if (canvasRef.value) {
    trail.init(canvasRef.value);
    trail.start();
  }
});

onUnmounted(() => {
  trail.destroy();
});
</script>

<template>
  <canvas v-if="enabled" ref="canvasRef" class="diamond-particle-trail" aria-hidden="true" />
</template>

<style scoped>
.diamond-particle-trail {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: v-bind("PARTICLE_TRAIL_CONFIG.zIndex");
}
</style>
