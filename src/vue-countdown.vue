<template>
    <div class="vue-countdown">
        <div class="vue-countdown--time">
            {{ time }}
        </div>
    </div>
</template>

<script>
    import EasyTimer from 'easytimer';

    export default {
        props: {
            seconds: Number,
            countdown: Boolean,
            message: String,
            date: String
        },

        data () {
            return {
                timer: null,
                time: '',
                label: this.message ? this.message : 'Time\'s up!'
            };
        },

        computed: {
            parsedDate () {
                if (!this.date) {
                    return false;
                }

                return Date.parse(this.date);
            }
        },
        
        created () {
            this.timer = new EasyTimer();
        
            const parsedDate = this.parsedDate;
            const now = Date.now();

            let seconds = this.seconds;
            let timerOptions = {
                countdown: true
            };

            if (! parsedDate && this.date) {
                throw new Error('Please provide valid date');
            }

            if (now < parsedDate) {
                seconds = (parsedDate - now) / 1000;
            }

            timerOptions.startValues = {
                seconds: seconds
            };

            this.timer.start(timerOptions);

            this.time = this.timer.getTimeValues().toString();

            this.timer.addEventListener('secondsUpdated', this.onTimeChange.bind(this));
            this.timer.addEventListener('targetAchieved', this.onTimeExpire.bind(this));
        },

        methods: {
            onTimeChange () {
                this.time = this.timer.getTimeValues().toString();
            },

            onTimeExpire () {
                this.$emit('time-expire');

                this.time = this.label;
            }
        }
    };
</script>