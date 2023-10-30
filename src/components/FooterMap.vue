<template>
    <yandex-map
        ref="infrastructureMap"
        :center="center"
        :markers="mapMarkers"
        :polygons="mapPolygons"
        :zoom="12"
    ></yandex-map>
</template>

<script>
    import YandexMap from './YandexMap.vue';
    
    export default {
        components: {
            YandexMap
        },
        props: {
            markers: {
                type: Array,
                default: [],
            },
            polygons: {
                type: Array,
                default: [],
            },
            center:  {
                type: Array,
                default: [],
            },
        },
        data() {
            return {
                mapMarkers:  [],
                mapPolygons: [],
            }
        },
        mounted() {
            this.mapPolygons = this.polygons.map((item, index) => {
                item.id = index;

                return item;
            });
            
            this.mapMarkers = this.markers.map((item, index) => {
                item.id = index + this.mapPolygons.length;

                return item;
            });
        },
        methods: {
            selectCategory(category = 'all') {
                this.selectedCategory = category;
            }
        },
        computed: {
            filteredMarkers() {
                return this.selectedCategory === 'all' ? 
                    this.mapMarkers : 
                    this.mapMarkers.filter(item => ((item.category.slug === this.selectedCategory) || (item.category.slug === 'main')));
            }
        },  
    }
</script>