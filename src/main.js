import { createApp } from 'vue'
import Paginate from 'vuejs-paginate-next'

import App from './App.vue'
import router from './router'
import store from './store/index'

const app = createApp(App)

app.component('paginate-component', Paginate)

app.use(router)
    .use(store)
    .mount('#app')
