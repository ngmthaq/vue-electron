<script setup lang="ts">
import { onBeforeMount, onUnmounted, ref } from "vue";
import { EVENT_BUS_EVENTS } from "@/configs/constants/event.const";
import { useEventBus } from "@/renderer/hooks/common/useEventBus";

const eventBus = useEventBus();

const isLoading = ref<boolean>(false);

function handleOpenLoading(open: boolean) {
  isLoading.value = open;
}

onBeforeMount(() => {
  eventBus.on(EVENT_BUS_EVENTS.openCircularLoading, handleOpenLoading);
});

onUnmounted(() => {
  eventBus.off(EVENT_BUS_EVENTS.openCircularLoading, handleOpenLoading);
});
</script>

<template>
  <Transition>
    <section id="circular-loading" class="circular-loading" v-show="isLoading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </section>
  </Transition>
</template>

<style scoped lang="scss">
.circular-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: $zindex-common-loading;
  background-color: rgba($color: $black, $alpha: 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s linear;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
