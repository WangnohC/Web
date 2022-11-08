const vue = new Vue({
    el: "#app",
    data: {
        tabArray: [ // tab标签
            {
                name: "自然风光",
                active: false
            },
            {
                name: "植物",
                active: false
            }
        ],
        activeTabIndex: 0,
        contentArray: [ // tab标签下所展示的内容
            {
                bannerList: [
                    {
                        name: "自然风光1",
                        image: "img/banner/banner_01.jpg"
                    },
                    {
                        name: "自然风光2",
                        image: "img/banner/banner_02.jpg"
                    },
                    {
                        name: "自然风光3",
                        image: "img/banner/banner_03.jpg"
                    }
                ]
            },
            {
                bannerList: [
                    {
                        name: "植物1",
                        image: "img/banner/banner_04.jpg"
                    },
                    {
                        name: "植物2",
                        image: "img/banner/banner_05.jpg"
                    },
                    {
                        name: "植物3",
                        image: "img/banner/banner_06.jpg"
                    }
                ]
            }
        ],
        bannerIndex: 0,
        scheduledTaskId: "",
        timeout: 3000,
        slidesPerView: 3
    },
    mounted() {
        this.activateTab(0);
        this.initSwiper();
    },
    methods: {
        // 激活tab
        activateTab(index) {
            this.bannerIndex = 0;
            this.tabArray[this.activeTabIndex].active = false;
            this.tabArray[index].active = true;
            this.activeTabIndex = index;
            if (this.scheduledTaskId) {
                clearInterval(this.scheduledTaskId);
            }
            this.scheduledTaskId = setInterval(this.getNextBanner, this.timeout);
        },
        // 获取上一个轮播页
        getPrevBanner() {
            this.bannerIndex--;
            if (this.bannerIndex < 0) {
                this.bannerIndex = this.contentArray[this.activeTabIndex].bannerList.length - 1;
            }
        },
        // 获取下一个轮播页
        getNextBanner() {
            this.bannerIndex++;
            let length = this.contentArray[this.activeTabIndex].bannerList.length;
            if (this.bannerIndex >= length) {
                this.bannerIndex = 0;
            }
        },
        // 鼠标移入
        onMouseEnter() {
            if (this.scheduledTaskId) {
                clearInterval(this.scheduledTaskId);
            }
        },
        // 鼠标移出
        onMouseLeave() {
            this.scheduledTaskId = setInterval(this.getNextBanner, this.timeout);
        },
        // 初始化swiper
        initSwiper() {
            const swiper = new Swiper(
                ".swiper-container",
                {
                    slidesPerView: this.slidesPerView,
                    loop: true,
                    centeredSlides: true,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                    autoplay: {
                        delay: this.timeout
                    }
                }
            );
            swiper.el.onmouseenter = function () {
                swiper.autoplay.stop();
            };
            swiper.el.onmouseleave = function () {
                swiper.autoplay.start();
            };
        }
    }
});
