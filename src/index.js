import {map} from 'lodash';

//import template from './list.hbs';

const square = n => n * n;
const cube = n => n * n * n;

const numbers = map([1, 2, 3, 4, 5, 6], square);

console.log(numbers);
//console.log(template({numbers}));

setTimeout(() => {
    require(['./list.hbs'], template => {
        document.querySelector('#app-container').innerHTML = template({numbers});
    });
}, 2000);

