<template>
  <div ref="modalRef" class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="title" />
        </div>
        <div class="modal-body">
          <slot name="body" />
        </div>
        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Modal } from "bootstrap";
import { Modal as BootstrapModal } from "bootstrap";

let modalInstance: Modal

const modalRef = ref<Element>()

onMounted(() => {
  modalInstance = new BootstrapModal(modalRef.value!);
})

const _show = () => {
  modalInstance.show()
}

const _hide = () => {
  modalInstance.hide()
}

defineExpose({ show: _show, hide: _hide });

</script>

<style scoped></style>