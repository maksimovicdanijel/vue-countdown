[![Build Status](https://travis-ci.org/maksimovicdanijel/vue-countdown.svg?branch=master)](https://travis-ci.org/maksimovicdanijel/vue-countdown)
[![Coverage Status](https://coveralls.io/repos/github/maksimovicdanijel/vue-countdown/badge.svg?branch=development)](https://coveralls.io/github/maksimovicdanijel/vue-countdown?branch=development)

## Countdown component for VueJS

Component that creates countdown based on provided number of seconds or date in future. Install it by running:

```
npm install @dmaksimovic/vue-countdown --save
```
### Example usage

Component.vue
```
<template>
    <div>
        <vue-countdown v-on:time-expire="handleTimeExpire" :seconds="10" :start="start"></vue-countdown>

        <button v-on:click="startTimer">Start timer</button>
    </div>
</template>

<script>
import VueCountdown from '@dmaksimovic/vue-countdown';

export default {
    name: 'my-component',
    data () {
        return {
            start: false
        };
    },
    components: {
        'vue-countdown': VueCountdown
    },
    methods () {
        handleTimeExpire () {
            alert('Time is up!');
        },
        startTimer () {
            this.start = true;
        }
    }
}

</script>
```
This will create a simple component that will output countdown that starts from 10 and counts until 0.

### Options

**seconds** - number of seconds to start counter from (type number)

**date** - date in future as a string. Any string that can be parsed by Date.parse() is considered valid. Takes precedence over seconds parameter

**message** - message to display when counter finishes

**units** - array that represents units which will form the counter. Possible values are 'hours', 'minutes', 'seconds'

**start** - boolean value whether to start timer or not

### Events

**time-expire** - triggered when timer finishes

### Contributing

**Building**

```
npm run build
```

**Testing**

```
npm test
```

### Licence

[MIT](https://github.com/maksimovicdanijel/vue-countdown/blob/master/LICENSE)