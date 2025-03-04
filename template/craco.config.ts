const config = {
  webpack: {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    configure: (webpackConfig: any) => {
      /* https://github.com/facebook/create-react-app/issues/10356#issuecomment-1890981780 but for both .msj and .cjs */
      webpackConfig.module.rules.push({
        test: /\.[cm]js$/,
          include: /node_modules/,
          type: "javascript/auto"
        });
      return webpackConfig;
    },
  },
};
export default config;