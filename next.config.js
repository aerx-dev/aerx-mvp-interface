const nextTranslate = require("next-translate");

module.exports = nextTranslate({
    future: {
        strictPostcssConfiguration: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    reactStrictMode: true,
    webpack: (config, { dev, isServer }) => {
        if (isServer) {
            // require("./scripts/generate-sitemap");
        }
        // required for webpack configurations
        return config;
    },
});

// the security headers should be considered
