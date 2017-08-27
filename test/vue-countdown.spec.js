import Vue from 'vue';
import Component from '../src/vue-countdown';

describe('Vue countdown component', () => {
    it('should set passed label correctly', () => {
        const Constructor = Vue.extend(Component);

        const vm = new Constructor({
            propsData: {
                message: 'Boom'
            }
        }).$mount();

        expect(vm.$data.label).toBe('Boom');
    });

    it('should initialize timer properly', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: createElement => createElement(Component, {
                props: {
                    seconds: 5
                }
            })
        }).$mount();

        expect(vm.$el.querySelector('.vue-countdown--time').textContent.trim()).toBe('00:00:05');
    });

    it('should count to zero', (done) => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: createElement => createElement(Component, {
                props: {
                    seconds: 1
                }
            })
        }).$mount();

        setTimeout(() => {
            expect(vm.$el.querySelector('.vue-countdown--time').textContent.trim()).toBe('Time\'s up!');

            done();
        }, 1000);
    });
});