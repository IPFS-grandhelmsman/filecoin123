<template>
  <div class="app-wrapper">
    <app-header/>
    <app-main/>
    <app-footer/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { AppHeader, AppMain, AppFooter } from './components'

export default {
  name: 'Layout',

  components: {
    AppHeader,
    AppMain,
    AppFooter
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapGetters([
      'language',
      'token'
    ])
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
