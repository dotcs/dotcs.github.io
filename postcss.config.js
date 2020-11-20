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

                    // Tailwind rules that are used elsewhere, e.g. in markdown content
                    /^rounded-/,
                    /^max-w-/,

                    // Plugins
                    /^hljs-?/, // highlight.js css rules
                ],
                defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
            }
        }
    }
}
