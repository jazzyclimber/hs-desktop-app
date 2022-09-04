
<template>
  <button class="upload" @click="addFile(directoryUsage)">{{ btnText }}</button>
</template>

<script>

export default {
  name: 'UploadFile',
  props: {
    btnText: String,
    directoryUsage: String
  },
  methods: {
    addFile (usage) {
      const config = {
        usage: usage
      }
      window.ipc.send('openDialog', config)
    }
  }
}
</script>

<style >
  button.upload{
    margin-right: 5px;
  }
</style>
