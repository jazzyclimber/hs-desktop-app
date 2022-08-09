
<template>
  <div class="nav-bar">
    <div :class="'upload'">
      <button @click="addFile()">Open Modules Directory</button>
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
