<template>
  <div class="othent-login">
    <template v-if="userData === null">
      <LoginButton
        :apiid="apiid"
        :button-height="loginButtonHeight"
        :button-width="loginButtonWidth"
        :font-size="loginButtonfontSize"
        :background-color="loginButtonBackgroundColor"
        :color="loginButtonColor"
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
    </template>
    <template v-else>
      <Modal :location="location" :avatar-size="avatarSize">
        <template #avatar>
          <slot>
            <Avatar :username="userData.name" :src="userData.picture" :size="avatarSize" />
          </slot>
        </template>
        <div class="othent-login othent-login-modal-children">
          <UserInfo :userdata="userData" :avatar-size="userInfoAvatarSize" />
          <div class="text-center">
            <LogoutButton
              :apiid="apiid"
              :button-height="logoutButtonHeight"
              :button-width="logoutButtonWidth"
              :font-size="logoutButtonfontSize"
              :background-color="logoutButtonBackgroundColor"
              :color="logoutButtonColor"
            >
              <slot name="logout-button-body">Logout</slot>
            </LogoutButton>
          </div>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script setup lang="ts">
import './OthentLogin.css';
import { toRefs, toRef } from 'vue';
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

interface Props {
  location?: ModalLocation;
  apiid: string;
  avatarSize?: string;
  userInfoAvatarSize?: string;
  loginButtonHeight?: string;
  loginButtonWidth?: string;
  loginButtonfontSize?: string;
  loginButtonLogoHeight?: number;
  loginButtonLogoWidth?: number;
  loginButtonColor?: string;
  loginButtonBackgroundColor?: string;
  logoutButtonHeight?: string;
  logoutButtonWidth?: string;
  logoutButtonfontSize?: string;
  logoutButtonBackgroundColor?: string;
  logoutButtonColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  location: ModalLocation.bottom,
  avatarSize: AVATAR_SIZE,
  userInfoAvatarSize: USER_INFO_AVATAR_SIZE,
  loginButtonHeight: LOGIN_BUTTON_HEIGHT,
  loginButtonWidth: LOGIN_BUTTON_WIDTH,
  loginButtonfontSize: LOGIN_BUTTON_FONT_SIZE,
  loginButtonLogoHeight: LOGO_HEIGHT,
  loginButtonLogoWidth: LOGO_WIDTH,
  loginButtonColor: LOGIN_BUTTON_COLOR,
  loginButtonBackgroundColor: LOGIN_BUTTON_BACKGROUND_COLOR,
  logoutButtonHeight: LOGOUT_BUTTON_HEIGHT,
  logoutButtonWidth: LOGOUT_BUTTON_WIDTH,
  logoutButtonfontSize: LOGOUT_BUTTON_FONT_SIZE,
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
  loginButtonfontSize,
  loginButtonBackgroundColor,
  loginButtonColor,
  loginButtonLogoHeight,
  loginButtonLogoWidth,
  logoutButtonBackgroundColor,
  logoutButtonColor,
  logoutButtonHeight,
  logoutButtonWidth,
  logoutButtonfontSize
} = toRefs(props);

const userData = toRef(useStore(), 'userData');
</script>
