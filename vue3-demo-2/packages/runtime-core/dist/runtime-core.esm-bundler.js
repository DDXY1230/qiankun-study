function createRenderer(rendererOption) {
    return {
        createApp(rootComponent, rootProps) {
            const app = {
                mount(container) {
                    console.log('渲染的参数', container, rootComponent, rootProps, rendererOption);
                }
            };
            return app;
        }
    };
}

export { createRenderer };
//# sourceMappingURL=runtime-core.esm-bundler.js.map
