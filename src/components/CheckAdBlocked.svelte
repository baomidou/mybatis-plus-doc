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

<div
  class="{hasAdBlockDetected
    ? 'flex'
    : 'hidden'} fixed inset-0 bg-black bg-opacity-90 z-[99999]"
>
  <div class="m-auto p-5 bg-white rounded-lg text-center space-y-4">
    <p class="text-center text-lg text-gray-700">
      我们的广告服务商并不跟踪您的隐私，为了支持本站的长期运营，请将我们的网站加入广告拦截器的白名单，谢谢！
    </p>
    <div class="flex justify-center gap-4">
      <a
        href="https://wwads.cn/page/end-user-privacy"
        target="_blank"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 text-current no-underline hover:no-underline"
      >
        查看隐私声明
      </a>
      <a
        href="https://wwads.cn/page/whitelist-wwads"
        target="_blank"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 text-current no-underline hover:no-underline"
      >
        查看加入白名单教程
      </a>
      <button
        class="px-4 py-2 bg-neutral-300 text-white rounded hover:bg-neutral-400 transition duration-300 text-current no-underline hover:no-underline"
        on:click={closeNotice}
      >
        关闭
      </button>
    </div>
  </div>
</div>
