<script>
  export let title;
  export let width = 500;
  export let height = "auto";
  export let src;
  export let restProps = {}; // 用于收集所有额外的props
</script>

<video
  class="video overflow-hidden rounded-lg"
  {width}
  height={height === "auto" ? undefined : height}
  controls
  {...restProps}
>
  <source src={src.match(/^http/) ? src : `/videos/${src}`} type="video/mp4" />
  <span>{title}</span>
</video>

<style>
  .video {
    @apply overflow-hidden rounded-lg;
  }
</style>
