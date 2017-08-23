var Vue = require('vue');
var Component = require('../src/vue-countdown.vue').default;

describe('Vue countdown', function () {
    it('should have correct default label', function () {
        expect(Component.data().label).toBe('Time\'s up!');
    });
});
