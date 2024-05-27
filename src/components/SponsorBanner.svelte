<script>
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { slide } from "svelte/transition";

  export let sponsors = [];
  let currentSponsors = [];
  let isVisible = true;

  function toggleVisibility() {
    isVisible = !isVisible;
  }

  function getRandomElements(array, num) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  function selectSponsors() {
    currentSponsors = getRandomElements(sponsors, 3);
  }

  const opacity = tweened(1, {
    duration: 200,
    easing: cubicOut,
  });

  function updateCard() {
    opacity.set(0).then(() => {
      selectSponsors();
      opacity.set(1);
    });
  }

  onMount(() => {
    selectSponsors();
    const interval = setInterval(updateCard, 5000);
    return () => clearInterval(interval);
  });
</script>

<div class="not-content max-w-full w-full text-sm leading-6">
  {#if isVisible}
  <div transition:slide>
    {#each currentSponsors as currentSponsor}
      <a
        href={currentSponsor.link}
        class="text-current no-underline hover:no-underline w-full block mb-1"
        target="_blank"
        style="opacity: {$opacity}"
      >
        <figure
          class="border rounded-lg p-3 dark:bg-slate-800 dark:highlight-white/5"
        >
          <figcaption class="flex items-center space-x-4">
            <img
              src={currentSponsor.logo}
              alt=""
              class="flex-none w-14 h-14 object-contain"
              loading="lazy"
              decoding="async"
            />
            <div class="flex-auto">
              <div class="text-sm font-semibold dark:text-slate-200">
                {currentSponsor.title}
              </div>
              <div class="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
                {currentSponsor.description}
              </div>
            </div>
          </figcaption>
        </figure>
      </a>
    {/each}
    <div class="w-full block flex justify-between text-[11px]">
      <span>广告采取随机轮播3个方式显示</span>
      <a
        class="text-current no-underline hover:no-underline text-red-500"
        href="/resources/support/#成为赞助商"
        ><span class="with-love">♥</span>成为赞助商</a
      >
    </div>
  </div>
  {/if}

  <div class="button-container">
    <button class="toggle-button" on:click={toggleVisibility}>
      {isVisible ? "收" : "展"}
    </button>
  </div>
</div>

<style>
  .with-love {
    color: #ff6347;
    display: inline-block;
    margin-right: 2px;
    animation: icon-animate 1s ease-in-out infinite;
  }

  @keyframes icon-animate {
    0%,
    100% {
      transform: scale(1);
    } /* 在动画开始和结束时，元素保持原始大小 */
    50% {
      transform: scale(1.2);
    } /* 在动画中间，元素放大到原始大小的1.2倍 */
  }

  .button-container {
    background-color: rgba(0, 0, 0, 0.15);
    width: 100%;
    height: 1px;
    margin: 30px 0 20px 0;
    position: relative;
  }

  .toggle-button {
    border-radius: 100%;
    padding: 0;
    text-align: center;
    border: none;
    background-color: #ff3861;
    cursor: pointer;
    position: absolute;
    left: calc(50% - 15px);
    top: -15px;
    height: 30px;
    width: 30px;
    color: #fff;
  }
</style>
