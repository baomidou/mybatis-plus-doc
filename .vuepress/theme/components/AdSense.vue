<template>
  <div class="adsense-content">
    <div class="adsense-title">{{$lang === 'zh-CN' ? '赞助商' : 'Sponsors'}}</div>
    <div style="padding: 0 1.5rem;">
      <Adsense
        data-ad-client="ca-pub-4147143076931995"
        data-ad-slot="1234567890">
      </Adsense>
    </div>
  </div>
</template>

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