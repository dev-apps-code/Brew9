module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@components': './App/Components',
            '@common': './App/Common',
            '@constants': './App/Constants',
            '@utils': './App/Utils',
            '@requests': './App/Requests',
          },
        },
      ],
    ],
  };
};
