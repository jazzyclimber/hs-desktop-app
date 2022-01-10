
<template>
  <div :class="'wrapper'">
    <div :class="'upload'">
      <button @click="addFile()">Open Dialog</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UploadFile',
  methods: {
    addFile () {
      window.ipc.send('openDialog', 'open file')
    }
  }
}
</script>
