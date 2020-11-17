const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    plugins: {
        'tailwindcss': {},
        'postcss-preset-env': {},
        ...isProduction && {
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
}
