<script>
  import { onMount } from "svelte";
  import store from "store2";

  let adBlockDetected = false;
  let session = store.session;
  const key = "adBlockNoticeClosed";

  // 常见广告相关JS资源列表
  const adJsResources = [
    // 百度广告
    'https://cpro.baidustatic.com/cpro/ui/c.js',
    'https://cpro.baidustatic.com/cpro/ui/rt.js',
    // Google广告
    'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    'https://www.googletagservices.com/tag/js/gpt.js',
  ];

  // 常见广告类名
  const baitClasses = [
    // wwads 相关
    'wwads-cn',
    'wwads-horizontal',
    // 常见广告类名
    'ad-unit',
    'adsbox',
    'adsbygoogle'
  ];

  // 方法1: 诱饵元素检测
  function checkBaitElements() {
    return new Promise((resolve) => {
      const baits = [];
      
      // 创建诱饵元素
      baitClasses.forEach((className, index) => {
        const bait = document.createElement('span');
        bait.setAttribute('class', className);
        bait.setAttribute('data-bait', 'true');
        bait.style.cssText = `position:fixed;top:-${index + 1}px;left:0;width:1px;height:1px;opacity:0;`;
        document.body.appendChild(bait);
        baits.push(bait);
      });

      // 延迟检查
      setTimeout(() => {
        const baitsToCheck = document.querySelectorAll('[data-bait="true"]');
        let isBlocked = false;

        // 检查诱饵是否被屏蔽
        for (const bait of baitsToCheck) {
          const style = window.getComputedStyle(bait);
          if (style.display === 'none') {
            isBlocked = true;
            break;
          }
        }

        // 清理诱饵元素
        baitsToCheck.forEach(bait => {
          if (bait.parentNode) {
            bait.parentNode.removeChild(bait);
          }
        });

        resolve(isBlocked);
      }, 100);
    });
  }

  // 方法2: JS资源检测
  async function checkAdScripts() {
    const resourcesToCheck = getRandomAdResources();
    const results = await Promise.all(
      resourcesToCheck.map(url => checkAdScript(url))
    );
    return results.every(result => !result);
  }

  // 方法3: wwads容器检测
  function checkWwadsContainer() {
    const adContainer = document.querySelector('.wwads-cn');
    if (!adContainer) return false;

    const style = window.getComputedStyle(adContainer);
    
    // 检查容器是否被隐藏
    const isHidden = style.display === 'none' || !adContainer.offsetParent;
    
    // 检查容器高度是否异常
    const height = adContainer.offsetHeight;
    const isHeightAbnormal = height === 0 || height < 10; // 正常广告容器高度应该大于10px
    
    // 检查容器是否被折叠
    const isCollapsed = style.visibility === 'collapse' || style.maxHeight === '0px';
    
    // 检查容器是否被缩小到不可见
    const isScaledDown = style.transform.includes('scale(0)') || style.zoom === '0';
    
    // 检查容器是否被移出视口
    const rect = adContainer.getBoundingClientRect();
    const isOutOfView = rect.width === 0 || rect.height === 0;

    return isHidden || isHeightAbnormal || isCollapsed || isScaledDown || isOutOfView;
  }

  // 方法4: AdBlockInit检测
  function checkAdBlockInit() {
    return typeof window._AdBlockInit === 'undefined';
  }

  // 辅助函数: 随机获取JS资源
  function getRandomAdResources(count = 3) {
    const shuffled = [...adJsResources].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // 辅助函数: 检测单个JS资源
  async function checkAdScript(url) {
    try {
      const response = await fetch(url, { 
        method: 'HEAD',
        mode: 'no-cors'
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // 主检测函数
  async function checkAdBlocker() {
    let adBlockNoticeClosed = session.get(key) ?? false;
    if (adBlockNoticeClosed) {
      return;
    }

    // 按优先级顺序执行检测
    const [baitBlocked, scriptsBlocked] = await Promise.all([
      checkBaitElements(),
      checkAdScripts()
    ]);

    if (baitBlocked || scriptsBlocked) {
      adBlockDetected = true;
      return;
    }

    // 检查 wwads 容器
    if (checkWwadsContainer()) {
      adBlockDetected = true;
      return;
    }

    // 检查 AdBlockInit
    if (checkAdBlockInit()) {
      adBlockDetected = true;
      return;
    }
  }

  function closeNotice() {
    session.set(key, true);
    adBlockDetected = false;
  }

  onMount(() => {
    // 延迟 5 秒后开始第一次检测，给页面足够的加载时间
    setTimeout(() => {
      checkAdBlocker();
      // 之后每 10 秒检测一次
      const interval = setInterval(checkAdBlocker, 10000);
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
