import asyncPlugin from 'preact-cli-plugin-fast-async'

export default (config) => {
  const fileLoaders = config
    .module
    .loaders
    .filter(loader => [ 'file-loader', 'url-loader' ].includes(loader.loader))

  fileLoaders.forEach(loader => {
    loader.test = /\.(svg|woff2?|ttf|eot|jpe?g|png|gif|mp4|mp3|mov|ogg|webm)(\?.*)?$/i
  })

  asyncPlugin(config)
}
