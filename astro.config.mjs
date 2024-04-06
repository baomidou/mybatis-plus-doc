import {defineConfig} from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: "MyBatis-Plus",
            logo: {
                src: "./src/assets/logo.svg",
            },
            customCss: ["./src/styles/tailwind.css", "./src/styles/custom.css"],
            components: {
                Footer: "./src/components/Footer.astro",
            },
            locales: {
                root: {
                    label: "简体中文",
                    lang: "zh-CN",
                },
                en: {
                    label: "English",
                    lang: "en",
                },
            },
            social: {
                github: "https://github.com/baomidou/mybatis-plus"
            },
            sidebar: [
                {
                    label: "简介",
                    link: "/introduce",
                    translations: {
                        en: "Introduce",
                    },
                },
                {
                    label: "从这里开始",
                    translations: {
                        en: "Start Here",
                    },
                    items: [
                        {
                            label: "快速开始",
                            link: "/getting-started",
                            translations: {
                                en: "Getting Started",
                            },
                        },
                        {
                            label: "安装",
                            link: "/getting-started/install",
                            translations: {
                                en: "Install",
                            },
                        },
                        {
                            label: "配置",
                            link: "/getting-started/config",
                            translations: {
                                en: "Config",
                            },
                        },
                        {
                            label: "注解",
                            link: "/getting-started/annotation",
                            translations: {
                                en: "Annotation",
                            },
                        },
                        {
                            label: "测试",
                            link: "/getting-started/test",
                            translations: {
                                en: "Test",
                            },
                        },
                    ],
                },
                {
                    label: "内置功能",
                    translations: {
                        en: "Build-ins",
                    },
                    items: [
                        {
                            label: "代码生成器",
                            link: "/guides/code-generator",
                            translations: {
                                en: "Code Generator",
                            },
                        },
                        {
                            label: "快捷数据操作",
                            link: "/guides/interface",
                            translations: {
                                en: "Data Interface",
                            },
                        },
                        {
                            label: "条件构造器",
                            link: "/guides/interface",
                            translations: {
                                en: "Condition Wrapper",
                            },
                        },
                        {
                            label: "自定义主键生成策略",
                            link: "/guides/interface",
                            translations: {
                                en: "Custom Key Generator",
                            },
                        },
                        {
                            label: "自定义ID生成器",
                            link: "/guides/interface",
                            translations: {
                                en: "Custom Id Generator",
                            },
                        },
                        {
                            label: "逻辑删除",
                            link: "/guides/interface",
                            translations: {
                                en: "Logic Delete",
                            },
                        },
                        {
                            label: "自动转换枚举",
                            link: "/guides/interface",
                            translations: {
                                en: "Auto Convert Enum",
                            },
                        },
                        {
                            label: "字段类型处理器",
                            link: "/guides/interface",
                            translations: {
                                en: "Type Handler",
                            },
                        },
                        {
                            label: "自动填充",
                            link: "/guides/interface",
                            translations: {
                                en: "Auto Fill",
                            },
                        },
                        {
                            label: "SQL分析与打印",
                            link: "/guides/interface",
                            translations: {
                                en: "Auto Fill",
                            },
                        },
                        {
                            label: "数据安全保护",
                            link: "/guides/interface",
                            translations: {
                                en: "Auto Fill",
                            },
                        },
                        {
                            label: "多数据源",
                            link: "/guides/interface",
                            translations: {
                                en: "Auto Fill",
                            },
                        },
                        {
                            label: "流式查询",
                            link: "/guides/interface",
                            translations: {
                                en: "Auto Fill",
                            },
                        },
                        {
                            label: "DDL支持",
                            link: "/guides/interface",
                            translations: {
                                en: "Auto Fill",
                            },
                        },
                        {
                            label: "批量操作",
                            link: "/guides/interface",
                            translations: {
                                en: "Auto Fill",
                            },
                        },
                        {
                            label: "MyBatisX插件",
                            link: "/guides/interface",
                            translations: {
                                en: "Auto Fill",
                            },
                        },
                        {
                            label: "企业高级特性",
                            link: "/guides/interface",
                            translations: {
                                en: "Auto Fill",
                            },
                        },
                    ],
                },
                {
                    label: "插件",
                    autogenerate: {
                        directory: "plugins",
                    },
                },
                {
                    label: "配置",
                    autogenerate: {
                        directory: "reference",
                    },
                },
                {
                    label: "资源",
                    translations: {
                        en: "Resources",
                    },
                    items: [
                        {
                            label: "常见问题",
                            translations: {
                                en: "Questions",
                            },
                            link: "/guides/components/",
                        },
                        {
                            label: "Internationalization (i18n)",
                            link: "/guides/i18n/",
                        },
                        {
                            label: "低代码平台",
                            items: [
                                {
                                    label: "数据处理模块",
                                    link: "/guides/css-and-tailwind/",
                                },
                                {
                                    label: "单体开发平台",
                                    link: "/guides/css-and-tailwind/",
                                },
                                {
                                    label: "微服务开发平台",
                                    link: "/guides/css-and-tailwind/",
                                },
                                {
                                    label: "一体化开发平台",
                                    link: "/guides/css-and-tailwind/",
                                },
                            ],
                        },
                        {
                            label: "更新日志",
                            link: "/guides/i18n/",
                        },
                    ],
                },
            ],
        }),
        tailwind({
            // 禁用默认的基础样式
            applyBaseStyles: false,
        }),
    ],
});
