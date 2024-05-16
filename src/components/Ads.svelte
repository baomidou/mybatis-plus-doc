<script>
    import { onMount } from 'svelte';

    // 这个函数将在组件挂载后执行
    onMount(() => {
        const targetNode = document.querySelector('.page-wwads'); // 目标节点

        // MutationObserver 的配置，监视子元素的变化
        const config = { childList: true, subtree: true };

        // 当 DOM 变化时调用的回调函数
        const callback = function(mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    // 当新的广告内容被插入时，执行样式修改
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) { // 确保是元素节点
                            const img = node.querySelector('.wwads-img img');
                            if (img) {
                                img.style.width = '80px';
                            }
                            const text = node.querySelector('.wwads-text');
                            if (text) {
                                text.style.fontSize = '12px';
                                text.style.lineHeight = '1';
                            }
                            const poweredBy = node.querySelector('.wwads-poweredby');
                            if (poweredBy) {
                                poweredBy.style.marginTop = '0';
                            }
                        }
                    });
                }
            }
        };

        // 创建 MutationObserver 实例
        const observer = new MutationObserver(callback);

        // 开始监听目标节点
        if (targetNode) {
            observer.observe(targetNode, config);
        }

        // 组件销毁时，断开监听
        return () => {
            observer.disconnect();
        };
    });
</script>


<div class="flex xl:flex-col not-content">
    <div class="w-full xl:flex-1">
        <div class="max-w-full xl:max-w-[22rem] w-full pt-4 px-4 text-sm leading-6">
            <div class="wwads-cn wwads-horizontal page-wwads border rounded-lg bg-transparent" data-id="135" style="min-height: 0; margin-top: 0;"></div>
        </div>
    </div>
</div>
