const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    plugins: {
        'tailwindcss': {},
        'postcss-preset-env': {},
        ...isProduction && {
            '@fullhuman/postcss-purgecss': {
                content: [
                    './src/**/*.{ts,tsx}',
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
