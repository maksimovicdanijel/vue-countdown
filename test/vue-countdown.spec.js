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
});