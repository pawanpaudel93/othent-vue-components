<template>
  <button
    class="othent-button-login"
    :disabled="clicked"
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
    <slot name="logo">
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
import { ref, toRefs } from 'vue';
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
import { setUserData } from '@/lib/store';
import { LogInReturnProps } from 'othent';

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
const clicked = ref(false);

const emitEvent = defineEmits<{
  (e: 'loggedIn', loginResponse: LogInReturnProps): void;
}>();

async function handleLogin() {
  clicked.value = true;
  try {
    const othent = await getOthent(apiid.value);
    const loginResponse = await othent.logIn();
    emitEvent('loggedIn', loginResponse);
    setUserData(loginResponse);
  } catch (e) {
    console.log('othent.login() failed:');
    console.log(e);
  } finally {
    clicked.value = false;
  }
}
</script>
