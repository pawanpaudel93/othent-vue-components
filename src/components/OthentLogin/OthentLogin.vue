<template>
  <div class="othent-login">
    <LoginButton
      v-if="userData === null"
      :apiid="apiid"
      :button-height="loginButtonHeight"
      :button-width="loginButtonWidth"
      :font-size="loginButtonFontSize"
      :background-color="loginButtonBackgroundColor"
      :color="loginButtonColor"
      @logged-in="onLoggedIn"
    >
      <template #logo>
        <slot name="login-button-logo">
          <Logo :height="loginButtonLogoHeight" :width="loginButtonLogoWidth" />
        </slot>
      </template>
      <template #default>
        <slot name="login-button-body">
          <LoginButtonText />
        </slot>
      </template>
    </LoginButton>

    <Modal v-else :location="location" :avatar-size="avatarSize">
      <template #avatar>
        <slot>
          <Avatar :username="userData?.name" :src="userData?.picture" :size="avatarSize" />
        </slot>
      </template>
      <div class="othent-login othent-login-modal-children">
        <UserInfo :userdata="userData" :avatar-size="userInfoAvatarSize" />
        <div class="text-center">
          <LogoutButton
            :apiid="apiid"
            :button-height="logoutButtonHeight"
            :button-width="logoutButtonWidth"
            :font-size="logoutButtonFontSize"
            :background-color="logoutButtonBackgroundColor"
            :color="logoutButtonColor"
          >
            <slot name="logout-button-body">Logout</slot>
          </LogoutButton>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import './OthentLogin.css';
import { toRefs, toRef, watch } from 'vue';
import LoginButtonText from '../Extras/LoginButtonText.vue';
import { ModalLocation } from '@/lib/types';
import { useStore } from '@/lib/store';
import Avatar from '../Avatar';
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';
import UserInfo from '../UserInfo';
import Modal from '../Modal';
import Logo from '../Logo';
import {
  LOGIN_BUTTON_HEIGHT,
  LOGIN_BUTTON_WIDTH,
  LOGOUT_BUTTON_HEIGHT,
  LOGOUT_BUTTON_WIDTH,
  LOGIN_BUTTON_FONT_SIZE,
  LOGOUT_BUTTON_FONT_SIZE,
  LOGO_HEIGHT,
  LOGO_WIDTH,
  AVATAR_SIZE,
  USER_INFO_AVATAR_SIZE,
  LOGOUT_BUTTON_BACKGROUND_COLOR,
  LOGIN_BUTTON_BACKGROUND_COLOR,
  LOGOUT_BUTTON_COLOR,
  LOGIN_BUTTON_COLOR
} from '@/lib/constants';
import { LogInReturnProps, LogOutReturnProps } from 'othent';

interface Props {
  location?: ModalLocation;
  apiid: string;
  avatarSize?: string;
  userInfoAvatarSize?: string;
  loginButtonHeight?: string;
  loginButtonWidth?: string;
  loginButtonFontSize?: string;
  loginButtonLogoHeight?: number;
  loginButtonLogoWidth?: number;
  loginButtonColor?: string;
  loginButtonBackgroundColor?: string;
  logoutButtonHeight?: string;
  logoutButtonWidth?: string;
  logoutButtonFontSize?: string;
  logoutButtonBackgroundColor?: string;
  logoutButtonColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  location: ModalLocation.bottom,
  avatarSize: AVATAR_SIZE,
  userInfoAvatarSize: USER_INFO_AVATAR_SIZE,
  loginButtonHeight: LOGIN_BUTTON_HEIGHT,
  loginButtonWidth: LOGIN_BUTTON_WIDTH,
  loginButtonFontSize: LOGIN_BUTTON_FONT_SIZE,
  loginButtonLogoHeight: LOGO_HEIGHT,
  loginButtonLogoWidth: LOGO_WIDTH,
  loginButtonColor: LOGIN_BUTTON_COLOR,
  loginButtonBackgroundColor: LOGIN_BUTTON_BACKGROUND_COLOR,
  logoutButtonHeight: LOGOUT_BUTTON_HEIGHT,
  logoutButtonWidth: LOGOUT_BUTTON_WIDTH,
  logoutButtonFontSize: LOGOUT_BUTTON_FONT_SIZE,
  logoutButtonBackgroundColor: LOGOUT_BUTTON_BACKGROUND_COLOR,
  logoutButtonColor: LOGOUT_BUTTON_COLOR
});

const {
  apiid,
  location,
  avatarSize,
  userInfoAvatarSize,
  loginButtonHeight,
  loginButtonWidth,
  loginButtonFontSize,
  loginButtonBackgroundColor,
  loginButtonColor,
  loginButtonLogoHeight,
  loginButtonLogoWidth,
  logoutButtonBackgroundColor,
  logoutButtonColor,
  logoutButtonHeight,
  logoutButtonWidth,
  logoutButtonFontSize
} = toRefs(props);

const userData = toRef(useStore(), 'userData');

watch(userData, () => {
  if (userData.value === null) onLoggedOut({ response: 'User logged out' });
});

const emitEvent = defineEmits<{
  (e: 'loggedIn', loginResponse: LogInReturnProps): void;
  (e: 'loggedOut', logoutResponse: LogOutReturnProps): void;
}>();

function onLoggedIn(loginResponse: LogInReturnProps) {
  emitEvent('loggedIn', loginResponse);
}

function onLoggedOut(logoutResponse: LogOutReturnProps) {
  emitEvent('loggedOut', logoutResponse);
}
</script>
