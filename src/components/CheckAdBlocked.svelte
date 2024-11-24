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

    // 方法1: 只检查 wwads 容器是否被隐藏
    const adContainer = document.querySelector('.wwads-cn');
    if (adContainer && (window.getComputedStyle(adContainer).display === 'none' || !adContainer.offsetParent)) {
      adBlockDetected = true;
      return;
    }

    // 方法2: 只检查 AdBlockInit 相关变量
    if (typeof window._AdBlockInit === 'undefined') {
      adBlockDetected = true;
      return;
    }

    // 方法3: 创建精简的诱饵元素检测
    const baitClasses = [
      // wwads 相关
      'wwads-cn',
      'wwads-horizontal',
      // 常见广告类名（只保留最关键的几个）
      'ad-unit',
      'adsbox',
      'adsbygoogle'
    ];

    // 创建诱饵 div，使用 span 而不是 div 来避免触发延迟加载
    const baits = [];
    
    // 使用不同类名创建诱饵
    baitClasses.forEach((className, index) => {
      const bait = document.createElement('span'); // 使用 span 代替 div
      bait.setAttribute('class', className);
      bait.setAttribute('data-bait', 'true');
      bait.style.cssText = `position:fixed;top:-${index + 1}px;left:0;width:1px;height:1px;opacity:0;`;
      document.body.appendChild(bait);
      baits.push(bait);
    });

    // 检查诱饵是否被屏蔽
    setTimeout(() => {
      // 只检查带有特殊标记的诱饵元素
      const baitsToCheck = document.querySelectorAll('[data-bait="true"]');
      for (const bait of baitsToCheck) {
        const style = window.getComputedStyle(bait);
        // 只检查 display，避免其他可能触发延迟加载的属性
        if (style.display === 'none') {
          adBlockDetected = true;
          break;
        }
      }
      // 只清理带有特殊标记的诱饵元素
      baitsToCheck.forEach(bait => {
        if (bait.parentNode) {
          bait.parentNode.removeChild(bait);
        }
      });
    }, 100);

    // 方法4: 检测 wwads JS 是否被拦截
    checkAdScriptBanned('https://wwads.cn/js/makemoney.js');
    checkAdScriptBanned('https://cdn.wwads.cn/js/makemoney.js');
  }
  
  function checkAdScriptBanned(scriptUrl) {
    // 使用 fetch 检测资源是否可访问
    fetch(scriptUrl, { method: 'HEAD' })
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
    session.set(key, true);
    adBlockDetected = false;
  }

  onMount(() => {
    // 延迟 5 秒后开始第一次检测，给页面足够的加载时间
    setTimeout(() => {
      checkAdBlocker();
      // 之后每 30 秒检测一次
      const interval = setInterval(checkAdBlocker, 30000);
      return () => clearInterval(interval);
    }, 5000);
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
