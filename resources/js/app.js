/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import VueRouter from "vue-router";
import store from "./store";
import { routes } from "./routes";
require('./bootstrap');


window.Vue = require('vue').default;
Vue.use(VueRouter);
const router = new VueRouter({
    mode: "history",
    routes,
});

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('jk-gallery', require('./components/JKGalleryComponent.vue').default);
Vue.component("cart-list", require("./components/CartComponent.vue").default);
Vue.component('product-list', require('./components/ProductListComponent.vue').default);

Vue.component("product-card", require("./components/ProductCardComponent.vue").default);
Vue.component("product-section",require("./components/ProductSection.vue").default
);
Vue.component("product-row", require("./components/ProductRow.vue").default);

Vue.component(
    "centered-modal",
    require("./components/CenteredModal.vue").default
);

Vue.component(
    "prod-modal-header",
    require("./components/ModalComponent/ProductPage/ProdModalHeader").default
);
Vue.component(
    "prod-modal-body",
    require("./components/ModalComponent/ProductPage/ProdModalBody").default
);
Vue.component(
    "prod-modal-footer",
    require("./components/ModalComponent/ProductPage/ProdModalFooter").default
);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    store,
    router,
});
