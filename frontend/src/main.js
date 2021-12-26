import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faGithub,
  faLinkedinIn,
  faCodepen,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons' // Brand icons
import {
  faCheckCircle,
  faTrashAlt,
  faUserEdit,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons' // Solid icons

library.add(
  faGithub,
  faLinkedinIn,
  faCodepen,
  faTwitter,
  faCheckCircle,
  faTrashAlt,
  faUserEdit,
  faExclamationTriangle
)

createApp(App)
  .use(store)
  .use(router)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .mount('#app')
