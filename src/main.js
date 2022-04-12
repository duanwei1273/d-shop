import { createApp } from 'vue'
import App from './App.vue'

//引入fasteclick
import FastClick from 'fastclick'
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}


const app = createApp(App)
app.mount('#app')
