<template>
  <CustomModal ref="modal">
      <template #title>
        <h5>Please type your name</h5>
      </template>
      <template #body>
        <div class="form-floating mb-3">
          <input class="form-control" id="inputName" placeholder="Name" v-model="inputUsername"
            @keypress.enter="onSubmit()">
          <label for="inputName">Name</label>
        </div>
      </template>
      <template #footer>
        <button class="btn btn-primary" @click="onSubmit()">Submit</button>
      </template>
    </CustomModal>
</template>

<script setup lang="ts">

import { onMounted, ref } from "vue"
import { getUsername, setUsername } from "../service/user-service"

import CustomModal from "./commons/CustomModal.vue"

const inputUsername = ref<string>()
const modal = ref<InstanceType<typeof CustomModal>>()

onMounted(() => {
  fetchUserName()
})

const fetchUserName = () => {
  const username = getUsername()
  if (!username) {
    modal?.value?.show()
  }
}

const onSubmit = (): void => {
  if (!inputUsername.value) return
  setUsername(inputUsername.value)
  modal?.value?.hide()
}

</script>

<style scoped>

</style>