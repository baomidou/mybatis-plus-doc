<script>
    import { onMount } from 'svelte';
  
    let adBlockDetected = false;
  
    function checkAdBlocker() {
      setTimeout(() => {
        if (window._AdBlockInit === undefined) {
          adBlockDetected = true;
        }
      }, 2000);
    }
  
    onMount(() => {
      checkAdBlocker();
    });
  </script>
  
  <div class="{adBlockDetected ? 'flex' : 'hidden'} fixed inset-0 bg-black bg-opacity-90 z-[99999]">
    <div class="m-auto p-5 bg-white rounded-lg text-center space-y-4">
      <p class="text-center text-lg text-gray-700">
        我们的广告服务商并不跟踪您的隐私，为了支持本站的长期运营，请将我们的网站加入广告拦截器的白名单。
      </p>
      <div class="flex justify-center gap-4">
        <a href="https://wwads.cn/page/end-user-privacy" target="_blank"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 text-current no-underline hover:no-underline">
          隐私声明
        </a>
        <a href="https://wwads.cn/page/whitelist-wwads" target="_blank"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 text-current no-underline hover:no-underline">
          加入白名单
        </a>
      </div>
    </div>
  </div>
  