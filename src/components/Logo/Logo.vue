<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="othent-logo"
  >
    <rect :width="width" :height="height" :rx="height / 2" fill="#2375EF" />
    <circle
      :cx="width - height / 2"
      :cy="height / 2"
      :r="(height / 2) * 0.93273"
      fill="#F7F7FA"
    />
  </svg>
</template>

<script setup lang="ts">
import "./Logo.css";
import { toRefs } from "vue";
import { LOGO_HEIGHT, LOGO_WIDTH } from "@/lib/constants";

interface Props {
  width?: number;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  height: LOGO_HEIGHT,
  width: LOGO_WIDTH,
});

const { height, width } = toRefs(props);
</script>
