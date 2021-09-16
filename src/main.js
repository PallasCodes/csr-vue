import { createApp } from 'vue'
import App from './App.vue'

import axios from 'axios'

axios.defaults.baseURL = 'https://csr-xatal.herokuapp.com'

createApp(App).mount('#app')
