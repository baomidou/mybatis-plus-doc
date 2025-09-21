<script>
  import { onMount } from "svelte";
  import store from "store2";

  let hasAdBlockDetected = false;
  let session = store.session;
  const key = "adBlockNoticeClosed";

  function closeNotice() {
    session.set(key, true);
    hasAdBlockDetected = false;
  }

  function checkAdBlocker() {
    let adBlockNoticeClosed = session.get(key) ?? false;
    if (adBlockNoticeClosed) {
      console.log("ADBlock notice closed...");
      return;
    }

    // check ad block init
    if (window._AdBlockInit === undefined) {
      console.log("ADBlock detected, cause window._AdBlockInit undefined");
      hasAdBlockDetected = true;
      return;
    }

    // check script banned
    checkAdScriptBanned("https://cdn.wwads.cn/js/makemoney.js");
  }

  function checkAdScriptBanned(scriptUrl) {
    fetch(scriptUrl)
      .then((response) => {
        if (!response.ok) {
          console.log("ADBlock detected, cause script can't be loaded");
          hasAdBlockDetected = true;
        }
      })
      .catch(() => {
        console.log("ADBlock detected, cause script banned");
        hasAdBlockDetected = true;
      });
  }

  onMount(() => {
    const interval = setInterval(checkAdBlocker, 15000);
    return () => clearInterval(interval);
  });
</script>

<!-- 顶部横幅通知 -->
<div
  class="{hasAdBlockDetected
    ? 'block'
    : 'hidden'} fixed top-0 left-0 right-0 bg-blue-500 text-white shadow-md z-[9999] border-b border-blue-600"
>
  <div class="max-w-6xl mx-auto px-4 py-2">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <svg class="w-4 h-4 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
        </svg>
        <p class="text-sm text-white/90">
          我们的广告服务商并不跟踪您的隐私，为了支持本站的长期运营，请将我们的网站加入广告拦截器的白名单，谢谢！
        </p>
      </div>
      
      <div class="flex items-center space-x-1">
        <a
          href="https://wwads.cn/page/end-user-privacy"
          target="_blank"
          class="hidden lg:inline-flex items-center px-2 py-1 text-xs text-blue-100 hover:text-white hover:bg-white/10 rounded transition-colors no-underline"
        >
          隐私声明
        </a>
        <a
          href="https://wwads.cn/page/whitelist-wwads"
          target="_blank"
          class="hidden lg:inline-flex items-center px-2 py-1 text-xs text-blue-100 hover:text-white hover:bg-white/10 rounded transition-colors no-underline"
        >
          白名单教程
        </a>
        <span
          class="flex items-center justify-center p-1 text-blue-200 hover:text-white transition-colors cursor-pointer"
          on:click={closeNotice}
          on:keydown={(e) => e.key === 'Enter' && closeNotice()}
          role="button"
          tabindex="0"
          aria-label="关闭通知"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </span>
      </div>
    </div>
  </div>
</div>
