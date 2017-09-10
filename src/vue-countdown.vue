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
            date: String,
            units: Array,
            start: {
                type: Boolean,
                default: true
            }
        },

        data () {
            return {
                timer: null,
                time: '',
                label: this.message ? this.message : 'Time\'s up!',
                timerUnits: this.units ? this.units : ['hours', 'minutes', 'seconds'],
                timerOptions: {}
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
            this.timerOptions = {
                countdown: true
            };

            if (! parsedDate && this.date) {
                throw new Error('Please provide valid date');
            }

            if (now < parsedDate) {
                seconds = (parsedDate - now) / 1000;
            }

            this.timerOptions.startValues = {
                seconds: seconds
            };

            if (this.start) {
                this.timer.start(this.timerOptions);
            }

            this.time = this.timer.getTimeValues().toString(this.timerUnits);

            this.timer.addEventListener('secondsUpdated', this.onTimeChange.bind(this));
            this.timer.addEventListener('targetAchieved', this.onTimeExpire.bind(this));
        },

        methods: {
            onTimeChange () {
                this.time = this.timer.getTimeValues().toString(this.timerUnits);
            },

            onTimeExpire () {
                this.$emit('time-expire');

                this.time = this.label;
            }
        },

        watch: {
            start (newValue) {
                if (newValue) {
                    this.timer.start(this.timerOptions);
                } else {
                    this.timer.stop();
                }
            }
        }
    };
</script>