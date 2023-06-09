<template>
  <button
    class="othent-button-logout"
    :disabled="isLoading"
    v-bind="$attrs"
    :style="{
      width: buttonWidth,
      height: buttonHeight,
      fontSize: fontSize,
      color: color,
      border: `1px solid ${color}`,
      backgroundColor: isHovered ? hoverColor : backgroundColor
    }"
    @click.prevent="handleLogout"
    @mouseover="isHovered = true"
    @mouseout="isHovered = false"
  >
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <template v-else> Log Out </template>
  </button>
</template>

<script setup lang="ts">
import './LogoutButton.css';
import { ref, toRef, toRefs } from 'vue';
import {
  LOGOUT_BUTTON_BACKGROUND_COLOR,
  LOGOUT_BUTTON_COLOR,
  LOGOUT_BUTTON_FONT_SIZE,
  LOGOUT_BUTTON_HEIGHT,
  LOGOUT_BUTTON_WIDTH
} from '@/lib/constants';
import { getOthent } from '@/lib/utils';
import { setUserData, useStore } from '@/lib/store';
import { LogOutReturnProps } from 'othent';
import { setIsLoading } from '@/lib/store';

interface Props {
  apiid: string;
  buttonHeight?: string;
  buttonWidth?: string;
  fontSize?: string;
  backgroundColor?: string;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  buttonHeight: LOGOUT_BUTTON_HEIGHT,
  buttonWidth: LOGOUT_BUTTON_WIDTH,
  fontSize: LOGOUT_BUTTON_FONT_SIZE,
  backgroundColor: LOGOUT_BUTTON_BACKGROUND_COLOR,
  color: LOGOUT_BUTTON_COLOR
});

const { apiid, buttonHeight, buttonWidth, fontSize, backgroundColor, color } = toRefs(props);

const hoverColor = ref(`${color.value}11`);
const isHovered = ref(false);

const emitEvent = defineEmits<{
  (e: 'loggedOut', logoutResponse: LogOutReturnProps): void;
}>();

const isLoading = toRef(useStore(), 'isLoading');

async function handleLogout() {
  setIsLoading(true);
  try {
    const othent = await getOthent(apiid.value);
    const logoutResponse = await othent.logOut();
    if (logoutResponse.response) {
      emitEvent('loggedOut', logoutResponse);
      setUserData(null);
    }
  } catch (e) {
    console.log('othent.logout() failed:', e);
  } finally {
    setIsLoading(false);
  }
}
</script>
