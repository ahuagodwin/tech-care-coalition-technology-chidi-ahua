
import "material-icons/iconfont/material-icons.css";
import './App.scss'
import "bootstrap"
import './globals'
import "./globals/inits"


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { MotionPlugin } from '@vueuse/motion'




const app = createApp(App);
app.component('QuillEditor', QuillEditor);

const directives = require.context(
    "./directives",
    true,
    /[A-Z]\w+\.ts$/
); 
const components = require.context(
    "./components",
    true,
    /[A-Z]\w+\.vue$/
);


// Register Directives
directives.keys().forEach((fileName) => {
    const directiveConfig = directives(fileName);
    const directiveName = fileName.split('/').pop()?.replace(/\.\w+$/, '') as string;
    app.directive(directiveName.toLowerCase(), directiveConfig.default || directiveConfig);
});
// Register components
components.keys().forEach((fileName) => {
    const componentConfig = components(fileName);
    const componentName = fileName.split('/').pop()?.replace(/\.\w+$/, '') as string;
    app.component(componentName, componentConfig.default || componentConfig);
});

app.use(MotionPlugin, {
    directives: {
      'pop-bottom': {
        initial: {
          scale: 0,
          opacity: 0,
          y: 100,
        },
        visible: {
          scale: 1,
          opacity: 1,
          y: 0,
        },
      },
    },
  })
  
app.use(store).use(router).mount('#app')