<template>
    <div class="flex appartaments__flex">
        <div class="flex__6 filter-flats filter-flats__left">
            <div class="section__title-block filter-flats__title">
                <h2 class="section__title"> 
                    {{ title }}
                </h2>
            </div>
            <div class="filter-block">
                <div class="filter-item">
                    <span class="filter-item__caption">
                        {{ roomsCap }}:
                    </span>
                    <div class="filter-item__buttons">
                        <button 
                            v-for="room in sortedRooms" 
                            :key="room"
                            class="filter-button" 
                            :class="{'filter-button--active': room == selectedRoom}"
                            @click="selectRoom(room)"
                        >{{ room }} {{ roomItem }}</button>
                    </div>
                </div>
                <div class="filter-item">
                    <span class="filter-item__caption">
                        {{ squareCap }}:
                    </span>
                    <div class="filter-item__buttons">
                        <button 
                            v-for="square in sortedSquares" 
                            :key = "square"
                            class="filter-button"
                            :class="{'filter-button--active': square == selectedSquare}"
                            @click="selectSquare(square)"
                        >{{ square }} м<sup>2</sup></button>
                    </div>
                </div>
            </div>
            <slot></slot>
        </div>
        <div class="flex__6 filter-flats__right">
            <div class="filter-content">
                <iframe 
                    class="widget-iframe" 
                    scrolling="no" 
                    allowfullscreen
                    :src="activeFlat"
                    ref="widgetIframe"
                    :height="iframeHeight"
                    lang="ru"
                ></iframe>
            </div>
        </div>
    </div>
</template>

<script>
    const flats = [
        {
            rooms: 1,
            square: 45.88,
            widget: 'https://widget.planoplan.com/82b0605cd14546493996bef7463994d3'
        },
        {
            rooms: 2,
            square: 54.92,
            widget: 'https://widget.planoplan.com/c680555d5e9be6ef17140fd7b9b04608'
        },
        {
            rooms: 2,
            square: 57.87,
            widget: 'https://widget.planoplan.com/2e958ed92d53def026e468302ec8e640'
        },
        {
            rooms: 3,
            square: 71.24,
            widget: 'https://widget.planoplan.com/199318e6619ccb05e995666e83df4251'
        },
    ];

    export default {
        data() {
            return {
                flats:          flats,
                rooms:          flats.map(flat => {
                    return flat.rooms
                }),
                selectedRoom:   null,
                selectedSquare: null,
                iframeHeight:   590
            }    
        },
        props: {
            title: String,
            roomsCap: String,
            squareCap: String,
            roomItem: String,
        },
        computed: {
            sortedRooms: function () {
                return new Set(this.rooms.sort());
            },
            sortedSquares: function () {
                const filteredFlats = this.flats.filter(item => item.rooms === this.selectedRoom);

                return new Set(filteredFlats.map(flat => {
                    return flat.square
                }));
            },
            activeFlat: function () {
                return this.flats.find(
                    item => item.rooms == this.selectedRoom && 
                        item.square == this.selectedSquare)?.widget
            }
        },
        mounted() {
            this.selectedRoom   = Array.from(this.sortedRooms)[0];
            this.selectedSquare = Array.from(this.sortedSquares)[0];
        
            this.iframeHeight = this.$refs['widgetIframe'].offsetWidth;

            console.log(this.translate);
        },
        methods: {
            selectRoom(room) {
                this.selectedRoom = room;
                this.selectedSquare = Array.from(this.sortedSquares)[0]
            },
            selectSquare(square) {
                this.selectedSquare = square;
            },
        }
    }
</script>