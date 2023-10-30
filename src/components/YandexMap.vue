<template>
    <yandex-map :settings="settings" :coords="center" :zoom="zoom">
        <ymap-marker 
            v-for="marker in mapMarkers"
            :key="marker.id"
            :coords="marker.coords" 
            :marker-id="marker.id" 
            :icon="marker.icon"
            :balloon-template="marker.baloon"
        />
        <ymap-marker 
            v-for="polygon in mapPolygons"
            :key="polygon.id"
            :marker-id="polygon.id" 
            marker-type="Polygon" 
            :coords="[ [center, center], polygon.points ]" 
            :marker-fill="{color: '#cfa36a'}"
            :marker-stroke="{color: '#cfa36a'}"
        ></ymap-marker>
    </yandex-map>
</template>

<script>
    import { yandexMap, ymapMarker } from 'vue-yandex-maps';
    
    export default {
        components: {
            yandexMap,
            ymapMarker,
        },
        props: {
            polygons: {
                type: Array,
                default: [],
            },
            markers:  {
                type: Array,
                default: [],
            },
            center:   {
                type: Array,
                default: [],
            },
            zoom:     {
                type: Number,
                default: 11,
            }
        },
        data() {
            return {
                myMarkers: [],
                settings: {
                    apiKey: 'c931e95f-6835-4672-9786-8ec02a9db87a',
                    lang: 'ru_RU',
                    version: '2.1'
                },
            }
        },
        computed: {
            mapPolygons() { return this.polygons },
            mapMarkers() { return this.markers }
        },
    }
</script>