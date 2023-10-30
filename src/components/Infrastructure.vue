<template>
    <div class="infrastructure__map-container">
        <div class="infrastructure__menu infrastructure-menu">
            <button 
                v-for="category in categoryes"
                :key="category.slug"
                class="infrastructure-menu__item" 
                :class="{'infrastructure-menu__item--active': category.slug === selectedCategory}"
                @click="selectCategory(category.slug)"
            >
                {{ category.label }}
            </button>
        </div>
        
        <div class="infrastructure__map infrastructure-map" style="height: 600px">
            <yandex-map
                ref="infrastructureMap"
                :center="center"
                :markers="filteredMarkers"
                :zoom="15"
            ></yandex-map>
        </div>
    </div>
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
            center:  {
                type: Array,
                default: [],
            },
            lang: {
                type: String,
                default: 'ru'
            },
        },
        data() {
            return {
                categoryes:       [],
                mapMarkers:       [],
                selectedCategory: 'all',
            }
        },
        mounted() {
            const findCategory = (slug) => this.categoryes.find(cat => cat.slug === slug)
            
            this.markers.forEach(marker => {
                if (!findCategory(marker.category.slug) && marker.category.slug !== 'main') {
                    marker.category.label = this.lang === 'kk' ? marker.category.kk : marker.category.ru;
                    
                    this.categoryes.push(marker.category);
                }
            });
            this.categoryes.unshift(
                {
                    slug:  'all',
                    label: this.lang === 'kk' ? 'Барлық' : 'Все',
                    ru:   'Все',
                    kk:   'Барлық',
                }
            );
        
            this.mapMarkers = this.markers.map((item, index) => {
                item.id = index;

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