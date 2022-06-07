import Vue from 'vue';
import moment from 'moment';

Vue.filter('date', (date, format = 'll') => {
    if (!date) return '';
    return moment(date).format(format);
});