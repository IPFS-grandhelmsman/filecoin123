<template>
  <div :class="withFooter ? '' : 'hidden'" class="app-footer">
    <div class="main-content">
      <div class="team">
        <div class="logo-wrapper">
          <img src="@/assets/images/img_logo.png" alt="">
          <span>{{ $t('footer.title') }}</span>
        </div>
        <span>
          {{ $t('footer.copyright') }}
        </span>
        <span>
          {{ $t('footer.case_number') }}
        </span>
        <span>
          {{ $t('footer.powered_by') }}
        </span>
      </div>

      <div class="project">
        <span>
          {{ $t('footer.project_description') }}
        </span>
        <span>
          {{ $t('footer.filecoin_official_website') }}
        </span>
        <span>
          {{ $t('footer.filecoin_manual') }}
        </span>
        <span>
          {{ $t('footer.official_browser') }}
        </span>
      </div>

      <div class="blockchain">
        <span>
          {{ $t('footer.blockchain') }}
        </span>
        <span>
          {{ $t('footer.block') }}
        </span>
        <span>
          {{ $t('footer.message') }}
        </span>
        <span>
          {{ $t('footer.account') }}
        </span>
      </div>

      <div class="data">
        <span>
          {{ $t('footer.data') }}
        </span>
        <span>
          {{ $t('footer.miner_data') }}
        </span>
        <span>
          {{ $t('footer.coin_data') }}
        </span>
      </div>

      <div class="partner">
        <span>
          {{ $t('footer.partner') }}
        </span>
        <span>
          {{ $t('footer.dapponline') }}
        </span>
        <span>
          {{ $t('footer.grandhelmsman') }}
        </span>
      </div>

      <div class="contact-us">
        <span>
          {{ $t('footer.contact_us') }}
        </span>
        <span>
          {{ $t('footer.help_email') }}
        </span>
        <span>
          {{ $t('footer.email_address') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppFooter',
  props: {

  },

  data() {
    return {

    }
  },

  computed: {
    ...mapGetters([
      'immersive',
      'color',
      'opacity',
      'withFooter'
    ])
  },

  watch: {

  },

  created() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
