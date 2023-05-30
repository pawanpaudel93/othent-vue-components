<template>
  <button
    class="othent-button-logout"
    :disabled="clicked"
    @click.prevent="handleLogout"
    v-bind="$attrs"
    :style="{
      width: buttonWidth,
      height: buttonHeight,
      fontSize: fontSize,
      color: color,
      border: `1px solid ${color}`,
      backgroundColor: isHovered ? hoverColor : backgroundColor,
    }"
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
import "./LogoutButton.css";
import { ref, toRefs } from "vue";
import { eventBus } from "@/lib/utils";
// @ts-ignore
import type { LogOutReturnProps } from "othent";
import {
  LOGOUT_BUTTON_BACKGROUND_COLOR,
  LOGOUT_BUTTON_COLOR,
  LOGOUT_BUTTON_FONT_SIZE,
  LOGOUT_BUTTON_HEIGHT,
  LOGOUT_BUTTON_WIDTH,
} from "@/lib/constants";
import { othentLogout } from "@/lib/utils";

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
  color: LOGOUT_BUTTON_COLOR,
});

const { apiid, buttonHeight, buttonWidth, fontSize, backgroundColor, color } =
  toRefs(props);

const hoverColor = ref(`${color.value}11`);
const isHovered = ref(false);
const clicked = ref(false);

async function handleLogout() {
  clicked.value = true;
  try {
    const logoutResponse = await othentLogout(apiid.value);
    eventBus.emit("logout", logoutResponse);
  } catch (e) {
    console.log("othent.logout() failed:");
    console.log(e);
  } finally {
    clicked.value = false;
  }
}
</script>
