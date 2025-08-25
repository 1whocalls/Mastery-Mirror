import pluginVite from "@11ty/eleventy-plugin-vite";

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(pluginVite, {
        // There are the vite setting used when running "npm run dev"
        viteOptions: {
            build: {
                rollupOptions: {
                    input: {
                        main: './src/main.ts',
                    },
                }
            },
            server: {
                middlewareMode: true
            },
        }
    });

    return {
        dir: {
            input: "src",
            includes: "_includes",
            output: "_site",
        },
    };
}
