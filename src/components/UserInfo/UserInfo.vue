<template>
  <div class="othent-user-info">
    <Avatar
      :src="userdata?.picture"
      :username="userdata?.name"
      :size="avatarSize"
    />
    <div class="othent-user-info-details">
      <div class="othent-user-info-details-name">{{ userdata?.name }}</div>
      <div class="othent-user-info-details-email">{{ userdata?.email }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./UserInfo.css";
import Avatar from "../Avatar";
import type { LogInReturnProps } from "othent";
import { AVATAR_SIZE } from "@/lib/constants";
import { toRefs } from "vue";

interface Props {
  userdata: LogInReturnProps | null;
  avatarSize?: string;
}

const props = withDefaults(defineProps<Props>(), {
  userdata: null,
  avatarSize: AVATAR_SIZE,
});

const { userdata, avatarSize } = toRefs(props);
</script>
