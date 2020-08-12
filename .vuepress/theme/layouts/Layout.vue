<template>
  <ParentLayout>
    <AdSense slot="sidebar-bottom"/>
    <AdSense slot="page-bottom"/>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'
import AdSense from '../components/AdSense.vue'
export default {
  components: {
    ParentLayout,
    AdSense
  }
}
</script>