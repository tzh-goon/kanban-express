import configLite from 'config-lite'

export const config = configLite({
  config_basedir: __dirname,
  config_dir: 'config'
})

export default config
