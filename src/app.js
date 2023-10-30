/* eslint-disable import/no-unresolved */
import { createApp, ref } from 'vue';
import { SwiperSlide } from 'swiper/vue';
import FsLightbox from 'fslightbox-vue/v3';
import 'swiper/css';
import 'swiper/css/lazy';

// components
import DiscountSwiper from './components/DiscountSwiper.vue';
import CarouselSwiper from './components/CarouselSwiper.vue';
import BenefitsSwiper from './components/BenefitsSwiper.vue';
import CallbackForm from './components/CallbackForm.vue';
import FormModal from './components/FormModal.vue';
import Appartaments from './components/Appartaments.vue';
import FooterMap from './components/FooterMap.vue';
import Modal from './components/base-components/Modal.vue';
import FsSource from './components/base-components/FsSource.vue';
import Infrastructure from './components/Infrastructure.vue';

import useInitParalax from './hooks/initParalax';
import useSiteScroll from './hooks/siteScroll';
import callButton from './hooks/callButton';

window.onload = () => {
    const app = createApp({
        components: {
            DiscountSwiper,
            SwiperSlide,
            CarouselSwiper,
            BenefitsSwiper,
            FsLightbox,
            CallbackForm,
            Appartaments,
            FooterMap,
            Modal,
            FormModal,
            FsSource,
            Infrastructure,
        },
        data() {
            return {
                paralaxEffect:      {},
                callbackModalShow:  false,
                callbackResultShow: false,
                airMenuShow:        false,
                payInfoShow:        false,
                payInfoId:          '',
            };
        },
        mounted() {
            this.paralaxEffect = useInitParalax(this.$refs);

            useSiteScroll();
        },
        unmounted() {
            this.paralaxEffect.destroy();
        },
        computed: {
            headerIsSticky() {
                return this.paralaxEffect.offset > 60;
            },
        },
        setup() {
            const isLightbox = ref(false);
            const sourcesLightbox = ref([]);

            const isBuildingStepBox = ref(false);
            const buildingStepSource = ref(null);

            let lightboxKey = Math.floor(Math.random() * 24223421);

            const showLightBox = (sources, isPanorama = false) => {
                lightboxKey = Math.floor(Math.random() * 24223421);

                if (isPanorama) {
                    app.provide('buildingStepUrl', sources);

                    buildingStepSource.value = [FsSource];
                    isBuildingStepBox.value = !isBuildingStepBox.value;
                } else {
                    sourcesLightbox.value = sources;
                    isLightbox.value = !isLightbox.value;
                }
            };

            return {
                isLightbox,
                sourcesLightbox,
                isBuildingStepBox,
                buildingStepSource,
                lightboxKey,
                showLightBox,
                callButton,
            };
        },
    });

    app.mount('#app');
};
