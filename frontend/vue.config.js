module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Full Stack VFPM ⛰️⚗️🐍🐬 CRUD APP plus Bootstrap 🥾 | VFPM'
      args[0].meta = {
        description:
          'Full Stack [V]ue.js ⛰️ +  [F]lask ⚗️ + [P]ython 🐍 +  [M]ySQL 🐬 CRUD Web App + Bootstrap 🥾',
      }
      return args
    })
  },
}
