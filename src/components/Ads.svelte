<script>
import { onMount, onDestroy } from 'svelte';

let adClass = 'wwads-horizontal'; // 默认类名

function handleResize() {
    if (window.innerWidth < 1280) { // XL 断点
    adClass = 'wwads-vertical';
    } else {
    adClass = 'wwads-horizontal';
    }
}

onMount(() => {
    handleResize(); // 初始检查
    window.addEventListener('resize', handleResize); // 添加监听器
});

onDestroy(() => {
    window.removeEventListener('resize', handleResize); // 清理监听器
});
</script>

<div class="flex xl:flex-col not-content">
  <div class="w-full xl:flex-1">
    <div class="max-w-full xl:max-w-[12rem] w-full pt-4 px-4 text-sm leading-6">
      <div class={"wwads-cn " + adClass + " wwads-sticky"}  data-id="135" style="min-height: 0; margin-top: 0; border-width: 1px; border-radius: 0.5rem"></div>
    </div>
  </div>
</div>
