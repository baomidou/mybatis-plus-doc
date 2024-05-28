<script>
  import { onMount } from "svelte";
  import store from "store2";

  let adBlockDetected = false;
  let session = store.session;
  const key = "adBlockNoticeClosed";

  function checkAdBlocker() {
    let adBlockNoticeClosed = session.get(key) ?? false;
    if (adBlockNoticeClosed) {
      return;
    }

    // check ad block init
    // if (window._AdBlockInit === undefined) {
    //   adBlockDetected = true;
    // }

    // check script banned
    checkAdScriptBanned('https://cdn.wwads.cn/js/makemoney.js');
  }
  
  function checkAdScriptBanned(scriptUrl) {
    fetch(scriptUrl)
        .then(response => {
            if (!response.ok) {
              adBlockDetected = true;
            }
        })
        .catch(() => {
            adBlockDetected = true;
        });
  }

  function closeNotice() {
    adBlockDetected = false;
  }

  onMount(() => {
    const interval = setInterval(checkAdBlocker, 5000);
    return () => clearInterval(interval);
  });
</script>

<div
  class="{adBlockDetected
    ? 'flex'
    : 'hidden'} fixed inset-0 bg-black bg-opacity-90 z-[99999]"
>
  <div class="m-auto p-5 bg-white rounded-lg text-center space-y-4">
    <button
      class="absolute top-3 right-3 text-black text-white bg-transparent"
      on:click={closeNotice}>×</button
    >
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
    </div>
  </div>
</div>
