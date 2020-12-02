const path = require("path");
const {
    MergeRuntime,
    withModuleFederation,
} = require("@module-federation/nextjs-mf");

module.exports = {
    webpack: (config, options) => {
        const { buildId, dev, isServer, defaultLoaders, webpack } = options;
        const mfConf = {
            mergeRuntime: true, //experimental
            name: "nextjsHeader",
            library: { type: config.output.libraryTarget, name: "nextjsHeader" },
            filename: "static/runtime/remoteEntry.js",
            exposes: {
                "./headerBar": "./components/HeaderBar",
            },
            remotes: {
                // next2: isServer
                //     ? path.resolve(
                //         __dirname,
                //         "../next2/.next/server/static/runtime/remoteEntry.js"
                //     )
                //     : "next2",
            },
        };
        if (!isServer) {
            config.output.publicPath = "http://localhost:3000/_next/";
        }
        withModuleFederation(config, options, mfConf);
        return config;
    },
    webpackDevMiddleware: (config) => {
        // Perform customizations to webpack dev middleware config
        // Important: return the modified config
        return config;
    },
};