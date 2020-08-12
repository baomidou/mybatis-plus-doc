<template>
  <div class="adsense-content">
    <div class="adsense-title">{{ $lang === 'zh-CN' ? '赞助商' : 'Sponsors' }}</div>
    <div style="padding: 0 1.5rem;">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-4147143076931995"
           data-ad-slot="1866407052"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }
}
</script>

<style scoped>
.adsense-content {
  max-width: 740px;
  margin: 0 auto;
}

.adsense-title {
  color: #999;
  transition: color 0.15s ease;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bold;
  padding: 0 1.5rem;
  margin-top: 0;
  margin-bottom: 1rem;
}
</style>