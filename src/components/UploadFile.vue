
<template>
  <button class="upload btn-primary mr-2" @click="addFile(directoryUsage)">{{ btnText }}</button>
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

