<template>
  <div class="flex flex-wrap">
    <input
      v-model="url"
      type="text"
      placeholder="Enter a valid URL: https://www.examble.com/"
      :class="[
        'flex-grow',
        'text-center',
        'rounded',
        'placeholder-gray-600',
        error ? 'bg-red-200' : 'bg-gray-200',
        'focus:outline-none',
      ]"
    />
    <button
      class="ml-2 p-2 text-gray-100 rounded bg-red-800"
      @click="onClick()"
    >
      Add
    </button>
    <div :class="{ 'lds-ellipsis': waiting }">
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
      error: false,
    }
  },
  computed: {
    ...mapState(['waiting']),
  },
  watch: {
    url() {
      this.error = !isUrl(this.url, { require_protocol: true }) && this.url
    },
  },
  methods: {
    ...mapActions(['addItem']),
    onClick() {
      if (!this.error && this.url) {
        this.addItem(this.url)
        this.url = ''
      }
    },
  },
}
</script>

<style scoped>
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ellipsis div {
  position: absolute;
  top: 27px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 6px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 6px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 26px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 45px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}
</style>
