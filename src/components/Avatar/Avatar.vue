<template>
  <img
    v-if="!error && src"
    :src="src"
    class="othent-avatar"
    :style="{ width: size, height: size }"
    :alt="`${username}'s` + 'avatar'"
    referrerpolicy="no-referrer"
    @error="handleError"
  />

  <div v-else class="othent-avatar" :style="{ width: size, height: size }">
    <template v-if="username">
      {{ username.charAt(0).toUpperCase() }}
    </template>
    <template v-else>&nbsp;</template>
  </div>
</template>

<script setup lang="ts">
import './Avatar.css';
import { ref, toRefs } from 'vue';
import { AVATAR_SIZE } from '@/lib/constants';

interface Props {
  username?: string;
  src?: string;
  size?: string;
}

const props = withDefaults(defineProps<Props>(), {
  username: '',
  src: '',
  size: AVATAR_SIZE
});

const { username, src, size } = toRefs(props);
const error = ref(false);

function handleError() {
  error.value = true;
}
</script>
