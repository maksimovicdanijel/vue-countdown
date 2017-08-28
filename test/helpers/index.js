import Vue from 'vue';

export function getVM(component, options) {
    const Constructor = Vue.extend(component);

    return new Constructor(options).$mount();
}