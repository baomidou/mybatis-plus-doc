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

    // 方法2: 只检查 wwads 相关变量
    if (typeof window.__WWADS === 'undefined') {
      adBlockDetected = true;
      return;
    }

    // 方法3: 创建 wwads 相关的诱饵元素检测
    const baitClasses = [
      'wwads-cn',
      'wwads-horizontal',
      'wwads-vertical',
      'wwads-content'
    ];

    // 创建诱饵 div
    const baits = [];
    
    // 使用不同类名创建诱饵
    baitClasses.forEach((className, index) => {
      const bait = document.createElement('div');
      bait.setAttribute('class', className);
      // 添加特殊标记用于识别诱饵元素
      bait.setAttribute('data-bait', 'true');
      bait.style.cssText = `position:absolute;top:-${9999 + index}px;width:1px;height:1px;`;
      document.body.appendChild(bait);
      baits.push(bait);
    });

    // 检查诱饵是否被屏蔽
    setTimeout(() => {
      // 只检查带有特殊标记的诱饵元素
      const baitsToCheck = document.querySelectorAll('[data-bait="true"]');
      for (const bait of baitsToCheck) {
        if (bait.offsetParent === null || 
            window.getComputedStyle(bait).display === 'none' || 
            window.getComputedStyle(bait).visibility === 'hidden') {
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

    // 方法4: 检查 wwads JS 是否被拦截
    checkAdScriptBanned('https://wwads.cn/js/makemoney.js');
    checkAdScriptBanned('https://cdn.wwads.cn/js/makemoney.js');
  }
  
  function checkAdScriptBanned(scriptUrl) {
    const script = document.createElement('script');
    script.src = scriptUrl;
    // 添加一个特殊标记，用于识别检测用的脚本
    script.setAttribute('data-detect', 'true');
    script.onerror = () => {
      adBlockDetected = true;
    };
    document.head.appendChild(script);
    // 5秒后只移除带有检测标记的script标签
    setTimeout(() => {
      const scripts = document.querySelectorAll('script[data-detect="true"]');
      scripts.forEach(s => {
        if (s.parentNode) {
          s.parentNode.removeChild(s);
        }
      });
    }, 5000);
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
