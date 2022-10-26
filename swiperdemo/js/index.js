const vue = new Vue({
    el: "#app",
    data: {
        tabArray: [ // tab标签
            {
                name: "SUV",
                active: false
            },
            {
                name: "轿车",
                active: false
            }
        ],
        activeTabIndex: 0,
        contentArray: [ // tab标签下所展示的内容
            {
                bannerList: [
                    {
                        name: "全新探岳",
                        image: "img/banner/banner_01.png"
                    },
                    {
                        name: "全新探岳X",
                        image: "img/banner/banner_02.png"
                    },
                    {
                        name: "全新探岳GTE",
                        image: "img/banner/banner_03.png"
                    }
                ]
            },
            {
                bannerList: [
                    {
                        name: "全新速腾",
                        image: "img/banner/banner_04.png"
                    },
                    {
                        name: "全新宝来",
                        image: "img/banner/banner_05.png"
                    },
                    {
                        name: "全新数字高尔夫",
                        image: "img/banner/banner_06.png"
                    }
                ]
            }
        ],
        bannerIndex: 0,
        scheduledTaskId: "",
        timeout: 3000
    },
    mounted() {
        this.activeTab(0);
    },
    methods: {
        // 激活tab
        activeTab(index) {
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
        }
    }
});
