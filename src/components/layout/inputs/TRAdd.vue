<template>
  <div class="flex flex-col lg:flex-row w-11/12 lg:w-4/5 mx-auto">
    <div class="flex lg:flex-grow mb-2">
      <input
        v-model="url"
        type="text"
        :aria-label="
          failStatus !== ''
            ? failStatus
            : 'Enter a valid URL: https://www.example.com/'
        "
        :placeholder="
          failStatus !== ''
            ? failStatus
            : 'Enter a valid URL: https://www.example.com/'
        "
        :class="[
          'flex-grow mr-1 p-2 rounded shadow',
          wrongUrl || failStatus != '' ? errorStyle : 'inputArea',
        ]"
      />
      <button class="p-2 btn rounded shadow" @click="onAdd()">
        Add Item
      </button>
    </div>
    <div class="flex mb-2">
      <input
        v-model="dirName"
        type="text"
        aria-label="Enter a Directory name"
        placeholder="Enter a Directory Name"
        :class="[
          { 'lg:hidden': !createDir },
          'lg:order-1 flex-grow mr-1 lg:mr-0 lg:ml-1 p-2 inputArea rounded shadow',
        ]"
      />
      <button
        class="lg:order-0 lg:ml-1 p-2 btn rounded shadow"
        @click="onCreateDir()"
      >
        {{ dirName ? 'Add Directory' : createDirDisplayText }}
      </button>
    </div>
    <div :class="waiting ? waitingStyle : ''">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import isUrl from 'validator/lib/isURL'

export default {
  data() {
    return {
      url: '',
      dirName: '',
      createDir: false,
      createDirDisplayText: 'Create Directory',
      wrongUrl: false,
      errorStyle: [
        'bg-red-300',
        'focus:bg-red-400',
        'text-center',
        'outline-none',
        'placeholder-gray-700',
      ],
      waitingStyle: ['lds-ellipsis mb-10 self-center'],
    }
  },
  computed: {
    ...mapState(['waiting', 'failStatus']),
  },
  watch: {
    url() {
      this.wrongUrl = !isUrl(this.url, { require_protocol: true }) && this.url
    },
  },
  methods: {
    ...mapActions(['addItem', 'addDirectory']),
    onAdd() {
      if (!this.wrongUrl && this.url) {
        this.addItem(this.url)
        this.url = ''
      }
    },
    onCreateDir() {
      this.createDir = this.createDir ? false : true
      if (this.dirName) {
        this.addDirectory(this.dirName)
        this.dirName = ''
      }
    },
  },
}
</script>

<style scoped></style>
