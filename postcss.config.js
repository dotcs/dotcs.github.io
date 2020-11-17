module.exports = {
    plugins: {
        'tailwindcss': {},
        'postcss-preset-env': {},
        '@fullhuman/postcss-purgecss': {
            content: [
                './components/*.{ts,tsx}',
                './components/**/*.{ts,tsx}',
                './pages/*.{ts,tsx}',
                './pages/**/*.{ts,tsx}',
            ],
            safelist: [
                // Custom component definitions
                /^x-/,

                // Plugins
                /^hljs-?/, // highlight.js css rules
            ],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
        }
    }
}
