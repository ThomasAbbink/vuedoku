<script setup lang="ts">
import { ref } from 'vue'
import Button from './Button.vue'
import GlowContainer from './GlowContainer.vue'

const dialog = ref<HTMLDialogElement>()
const isVisible = ref(false)

const showModal = () => {
  dialog.value?.showModal()
  isVisible.value = true
}

const cancel = () => {
  dialog.value?.close()
  isVisible.value = false
}

defineExpose({
  show: showModal,
  close: (returnVal: string): void => dialog.value?.close(returnVal),
  isVisible
})
</script>

<template>
  <dialog
    autofocus
    ref="dialog"
    class="flex rounded overflow-visible bg-transparent"
    @close="isVisible = false"
  >
    <Transition name="fade">
      <GlowContainer v-if="isVisible">
        <form
          method="dialog"
          class="px-32 py-10 flex items-center flex-col gap-8 bg-slate-900 rounded"
        >
          <slot></slot>
          <Button @click.prevent="cancel">cancel</Button>
        </form>
      </GlowContainer>
    </Transition>
  </dialog>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.7s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-10rem);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-3rem);
}

/* Transition the :backdrop when the dialog modal is promoted to the top layer */
dialog::backdrop {
  background-color: rgb(0 0 0 / 0);
  transition:
    display 0.7s allow-discrete,
    overlay 0.7s allow-discrete,
    background-color 0.7s;
}

dialog[open]::backdrop {
  background-color: rgb(30 41 59 / 0.95);
}

@starting-style {
  dialog[open]::backdrop {
    background-color: rgb(0 0 0 / 0);
  }
}
</style>
