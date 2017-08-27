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
            message: String
        },

        data () {
            return {
                timer: null,
                time: '',
                label: this.message ? this.message : 'Time\'s up!'
            };
        },
        
        created () {
            this.timer = new EasyTimer();

            this.timer.start({
                countdown: true,
                startValues: {
                    seconds: this.seconds
                }
            });

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