import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "MyBatis-Plus",
	  logo: {
		src: './src/assets/logo.svg',
	  },
	  customCss: [
        './src/styles/custom.css',
      ],
	  components: {
        Footer: './src/components/Footer.astro',
      },
      locales: {
        root: { label: '简体中文', lang: 'zh-CN' },
        en: { label: 'English', lang: 'en' },
      },
      social: {
        github: "https://github.com/baomidou/mybatis-plus",
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", link: "/guides/example/" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
