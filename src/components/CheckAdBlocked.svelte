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

    // 方法1: 检查广告容器是否被隐藏
    const adContainer = document.querySelector('.wwads-cn');
    if (adContainer && (window.getComputedStyle(adContainer).display === 'none' || !adContainer.offsetParent)) {
      adBlockDetected = true;
      return;
    }

    // 方法2: 检查广告相关变量
    if (typeof window._AdBlockInit !== 'undefined' || typeof window.__WWADS === 'undefined') {
      adBlockDetected = true;
      return;
    }

    // 方法3: 创建多个诱饵元素检测
    const baitClasses = [
      'ad-unit ad adsbox ad-space',  // 常见广告类名
      'banner_ad ad-banner',         // 横幅广告
      'adsbygoogle',                // Google Ads
      'ad-sidebar sponsorship',     // 侧边栏广告
      'pub_300x250 pub_300x250m',  // 特定尺寸广告
      'textads textads-text',      // 文字广告
      'banner-ads banner_ads',      // 另一种横幅广告
      'ad-zone ad-space',          // 广告区域
      'ad-placeholder adbadge',    // 广告占位符
      'inner-ad-space-holder'      // 内部广告占位
    ];

    const baitIds = [
      'ad-slot',
      'ad-banner-top',
      'sponsored-content',
      'advertisement',
      'google_ads_frame'
    ];

    // 创建多个诱饵 div
    const baits = [];
    
    // 使用不同类名创建诱饵
    baitClasses.forEach((className, index) => {
      const bait = document.createElement('div');
      bait.setAttribute('class', className);
      bait.style.cssText = `position:absolute;top:-${9999 + index}px;width:1px;height:1px;`;
      document.body.appendChild(bait);
      baits.push(bait);
    });

    // 使用不同 ID 创建诱饵
    baitIds.forEach((id, index) => {
      const bait = document.createElement('div');
      bait.id = id;
      bait.style.cssText = `position:absolute;top:-${8999 + index}px;width:1px;height:1px;`;
      document.body.appendChild(bait);
      baits.push(bait);
    });

    // 检查诱饵是否被屏蔽
    setTimeout(() => {
      for (const bait of baits) {
        if (bait.offsetParent === null || 
            window.getComputedStyle(bait).display === 'none' || 
            window.getComputedStyle(bait).visibility === 'hidden' ||
            window.getComputedStyle(bait).opacity === '0') {
          adBlockDetected = true;
          break;
        }
      }
      // 清理诱饵元素
      baits.forEach(bait => {
        if (bait.parentNode) {
          bait.parentNode.removeChild(bait);
        }
      });
    }, 100);

    // 方法4: 检查广告 JS 是否被拦截
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
