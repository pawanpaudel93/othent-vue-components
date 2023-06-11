<template>
  <div
    class="othent-login-button othent-modal"
    :style="{ width: avatarSize, height: avatarSize }"
    :this="modalRef"
    v-bind="$attrs"
    @click="() => setShowModal(!showModal)"
  >
    <div class="avatar-wrapper">
      <div v-if="isLoading" class="overlay">
        <div class="avatar-loading-border">
          <div class="loading-border" />
        </div>
      </div>

      <slot name="avatar">Show Modal</slot>
    </div>
    <template v-if="showModal">
      <div class="othent-modal-children" :class="`othent-modal-children-${LOCATIONS[location]}`">
        <slot>Modal Content</slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import './Modal.css';
import { onMounted, ref, toRef, toRefs } from 'vue';
import { ModalLocation } from '@/lib/types';
import { AVATAR_SIZE } from '@/lib/constants';
import { useStore } from '@/lib/store';

const LOCATIONS = [
  'top',
  'right',
  'bottom',
  'left',
  'top-right',
  'top-left',
  'bottom-right',
  'bottom-left'
];

interface Props {
  location?: ModalLocation;
  avatarSize?: string;
}

const props = withDefaults(defineProps<Props>(), {
  location: ModalLocation['bottom-left'],
  avatarSize: AVATAR_SIZE
});

const { location, avatarSize } = toRefs(props);

const showModal = ref<boolean>(false);
const modalRef = ref<HTMLDivElement | null>(null);
const isLoading = toRef(useStore(), 'isLoading');

onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.value && !modalRef.value.contains(event.target as Node)) {
      setShowModal(false);
    }
  };
  window.addEventListener('mousedown', handleClickOutside);
  return () => {
    window.removeEventListener('mousedown', handleClickOutside);
  };
});

function setShowModal(show: boolean) {
  showModal.value = show;
}
</script>
