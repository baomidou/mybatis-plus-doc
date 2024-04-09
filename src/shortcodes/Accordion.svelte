<script>
  export let title;
  export let className = ''; // 默认为空字符串，可选参数
  let show = false;
</script>

<div class={["accordion", show ? 'active' : 'collapsed', className].join(' ')}>
  <button class="accordion-header" on:click={() => show = !show}>
    {title}
    <svg
      class="accordion-icon"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <path
        fill="currentColor"
        d="M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z"
      ></path>
    </svg>
  </button>
  <div class={["accordion-content", show ? 'active' : 'collapsed', className].join(' ')}>
    <slot></slot>
  </div>
</div>

<style>
  :global(.accordion) {
    @apply mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white;
  }
  :global(.accordion-header) {
    @apply flex w-full cursor-pointer items-center justify-between px-4 py-4 text-lg text-gray-800 text-left text-base font-medium;
  }
  :global(.accordion-icon) {
    @apply ml-auto h-5 w-5 transform rotate-[-90deg] transition-transform duration-200;
  }
  :global(.accordion-content) {
    @apply p-4 overflow-hidden transition-all duration-200 ease-out;
  }
  :global(.accordion.active .accordion-icon) {
    @apply rotate-0;
  }
  :global(.accordion.active .accordion-content) {
    @apply max-h-screen;
  }
  :global(.accordion.collapsed .accordion-content.collapsed ) {
    @apply max-h-0 py-0 my-0;
  }
</style>
