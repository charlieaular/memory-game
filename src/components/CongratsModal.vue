<template>
  <CustomModal ref="modal">
    <template #title>
      <h5>You win</h5>
    </template>
    <template #body>
      <h5>Congrats, {{ userName }} wins the memory game</h5>
    </template>
    <template #footer>
      <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </template>
  </CustomModal>
</template>

<script setup lang="ts">
import { ref } from "vue"

import { getUsername } from "../service/user-service"

import CustomModal from "./commons/CustomModal.vue"

const modal = ref<InstanceType<typeof CustomModal>>()

const userName = ref<string>()


const _show = () => {
  const savedUserName = getUsername()
  userName.value = savedUserName!
  modal?.value?.show()
}

defineExpose({ show: _show })
</script>

<style scoped></style>