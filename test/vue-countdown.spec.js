import Vue from 'vue';
import Countdown from '../src/vue-countdown';
import {getVM} from './helpers';

describe('Vue countdown component', () => {
    it('sets passed label correctly', () => {
        const vm = getVM(Countdown, {
            propsData: {
                message: 'Boom'
            }
        });

        expect(vm.$data.label).toBe('Boom');
    });

    it('initializes timer properly', () => {
        const vm = getVM(Countdown, {
            propsData: {
                seconds: 5
            }
        });

        expect(vm.$el.querySelector('.vue-countdown--time').textContent.trim()).toBe('00:00:05');
    });

    it('counts to zero', (done) => {
        const vm = getVM(Countdown, {
            propsData: {
                seconds: 1
            }
        });

        setTimeout(() => {
            expect(vm.$el.querySelector('.vue-countdown--time').textContent.trim()).toBe('Time\'s up!');

            done();
        }, 1000);
    });

    it('triggers an event when timer has finished', (done) => {
        const vm = new Vue({
            methods: {
                handleTimeExpire() {
                    // should be called
                }
            },
            render: h => h(Countdown, {
                props: {
                    seconds: 1
                },
                on: {
                    'time-expire': vm.handleTimeExpire
                }
            })
        })

        spyOn(vm, 'handleTimeExpire');

        vm.$mount();   

        setTimeout(() => {
            expect(vm.handleTimeExpire).toHaveBeenCalled();

            done();
        }, 1000);
    });

    it('uses provided date as a countdown value', () => {
        spyOn(Date, 'now').and.returnValue(Date.parse('Friday, 01-Sep-17 12:59:00'));

        const vm = getVM(Countdown, {
            propsData: {
                date: 'Friday, 01-Sep-17 13:00:00'
            }
        });

        expect(vm.$el.querySelector('.vue-countdown--time').textContent.trim()).toBe('00:01:00');
    });

    it('uses passed units to format timer', () => {
        const vm = getVM(Countdown, {
            propsData: {
                units: ['minutes', 'seconds'],
                seconds: 10
            }
        });

        expect(vm.$el.querySelector('.vue-countdown--time').textContent.trim()).toBe('00:10');
    });
});