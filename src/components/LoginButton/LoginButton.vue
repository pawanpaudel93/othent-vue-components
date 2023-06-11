<template>
  <button
    class="othent-button-login"
    :disabled="isLoading"
    v-bind="$attrs"
    :style="{
      width: buttonWidth,
      height: buttonHeight,
      fontSize: fontSize,
      backgroundColor: backgroundColor,
      color: color
    }"
    @click.prevent="handleLogin"
  >
    <Spinner v-if="isLoading" :size="`calc(${buttonHeight} - 10px)`" style="margin-right: 0.3em" />
    <slot v-else name="logo">
      <Logo :height="logoHeight" :width="logoWidth" />
    </slot>
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <template v-else>
      <LoginButtonText />
    </template>
  </button>
</template>

<script setup lang="ts">
import { toRef, toRefs } from 'vue';
import './LoginButton.css';
import Logo from '../Logo';
import LoginButtonText from '../Extras/LoginButtonText.vue';
import {
  LOGIN_BUTTON_BACKGROUND_COLOR,
  LOGIN_BUTTON_COLOR,
  LOGIN_BUTTON_FONT_SIZE,
  LOGIN_BUTTON_HEIGHT,
  LOGIN_BUTTON_WIDTH,
  LOGO_HEIGHT,
  LOGO_WIDTH
} from '@/lib/constants';
import { getOthent } from '@/lib/utils';
import { setUserData, useStore } from '@/lib/store';
import { LogInReturnProps } from 'othent';
import { setIsLoading } from '@/lib/store';
import Spinner from '../Extras/Spinner.vue';

interface Props {
  apiid: string;
  buttonHeight?: string;
  buttonWidth?: string;
  fontSize?: string;
  logoHeight?: number;
  logoWidth?: number;
  backgroundColor?: string;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  buttonHeight: LOGIN_BUTTON_HEIGHT,
  buttonWidth: LOGIN_BUTTON_WIDTH,
  fontSize: LOGIN_BUTTON_FONT_SIZE,
  logoHeight: LOGO_HEIGHT,
  logoWidth: LOGO_WIDTH,
  backgroundColor: LOGIN_BUTTON_BACKGROUND_COLOR,
  color: LOGIN_BUTTON_COLOR
});

const {
  apiid,
  buttonHeight,
  buttonWidth,
  fontSize,
  logoHeight,
  logoWidth,
  backgroundColor,
  color
} = toRefs(props);

const isLoading = toRef(useStore(), 'isLoading');

const emitEvent = defineEmits<{
  (e: 'loggedIn', loginResponse: LogInReturnProps): void;
}>();

async function handleLogin() {
  setIsLoading(true);
  try {
    const othent = await getOthent(apiid.value);
    const loginResponse = await othent.logIn();
    emitEvent('loggedIn', loginResponse);
    setUserData(loginResponse);
  } catch (e) {
    console.log('othent.login() failed:', e);
  } finally {
    setIsLoading(false);
  }
}
</script>
