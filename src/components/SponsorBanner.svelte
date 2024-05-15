<script>
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  export let sponsors = [];
  let currentIndex = 0;
  let currentSponsor = sponsors[currentIndex];
  const opacity = tweened(1, {
    duration: 200,
    easing: cubicOut,
  });

  function updateCard() {
    opacity.set(0).then(() => {
      currentIndex = (currentIndex + 1) % sponsors.length;
      currentSponsor = sponsors[currentIndex];
      opacity.set(1);
    });
  }

  onMount(() => {
    const interval = setInterval(updateCard, 3000);
    return () => clearInterval(interval);
  });
</script>

<div class="not-content max-w-sm md:max-w-[16rem] w-full m-5 text-sm leading-6" style="opacity: {$opacity}">
    <a href={currentSponsor.link} class="w-full no-underline text-current hover:no-underline" target="_blank">
        <figure class="relative flex flex-col-reverse border-2 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5 transform transition hover:-translate-y-2.5 h-full">
            <blockquote class="mt-6 dark:text-gray-300 flex-1">
                <p>{currentSponsor.description}</p>
            </blockquote>
            <figcaption class="flex items-center space-x-4">
                <img src={currentSponsor.logo} alt="" class="flex-none w-14 h-14 object-contain" loading="lazy" decoding="async">
                <div class="flex-auto">
                    <div class="text-base font-semibold dark:text-slate-200">
                        {currentSponsor.title}
                    </div>
                    <div class="mt-0.5 dark:text-slate-300">
                        {currentSponsor.subtitle}
                    </div>
                </div>
            </figcaption>
        </figure>
    </a>
</div>

<div class="not-content max-w-sm md:max-w-[16rem] w-full m-5">
  <div class="wwads-cn wwads-horizontal wwads-sticky" data-id="135"></div>
</div>
