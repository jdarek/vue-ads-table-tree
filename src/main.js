import Vue from 'vue';
import App from './TableContainerApp';
import VueExcelXlsx from '@ihsaneddin/vue-excel-xlsx';

Vue.config.productionTip = false;
Vue.use(VueExcelXlsx);

new Vue({
    render: h => h(App),
}).$mount('#app');
