const vue = new Vue({
    el: "#app",
    data: {
        tabArray: [ // tab标签
            {
                name: "ID. 系列",
                isActive: true
            },
            {
                name: "SUV系列",
                isActive: false
            },
            {
                name: "轿车系列",
                isActive: false
            }
        ],
        activeClass: "active",
        activeTabIndex: 0,
        contentArray: [ // tab标签下所展示的内容
            {
                bannerList: [
                    {
                        img: "./images/policy-img/policy_01.png",
                        name: "ID.4 CORZZ"
                    },
                    {
                        img: "./images/policy-img/policy_02.png",
                        name: "ID.6 CORZZ"
                    },
                    {
                        img: "./images/policy-img/policy_03.png",
                        name: "ID.纯享版"
                    }
                ]
            },
            {
                bannerList: [
                    {
                        img: "./images/policy-img/policy_05.png",
                        name: "全新探岳"
                    },
                    {
                        img: "./images/policy-img/policy_06.png",
                        name: "全新探岳X"
                    },
                    {
                        img: "./images/policy-img/policy_07.png",
                        name: "全新探岳GTE"
                    },
                    {
                        img: "./images/policy-img/policy_04.png",
                        name: "揽境Talagon"
                    },
                    {
                        img: "./images/policy-img/policy_08.png",
                        name: "探歌"
                    },
                    {
                        img: "./images/policy-img/policy_09.png",
                        name: "探影"
                    }
                ]
            },
            {
                bannerList: [
                    {
                        img: "./images/policy-img/policy_12.png",
                        name: "全新速腾"
                    },
                    {
                        img: "./images/policy-img/policy_13.png",
                        name: "全新宝来"
                    },
                    {
                        img: "./images/policy-img/policy_10.png",
                        name: "迈腾"
                    },
                    {
                        img: "./images/policy-img/policy_11.png",
                        name: "迈腾GTE"
                    },
                    {
                        img: "./images/policy-img/policy_14.png",
                        name: "全新数字高尔夫"
                    }
                ]
            }
        ],
        bannerIndex: 0,
        taskId: ""
    },
    mounted() {
        this.activeTab(0);
    },
    methods: {
        // 激活tab
        activeTab(index) {
            this.bannerIndex = 0;
            this.tabArray[this.activeTabIndex].isActive = false;
            this.tabArray[index].isActive = true;
            this.activeTabIndex = index;
            if (this.taskId) {
                clearInterval(this.taskId);
            }
            this.taskId = setInterval(this.getNextBannerIndex, 5000, false);
        },
        // 获取前一个轮播页的id
        getPrevBannerIndex() {
            this.bannerIndex--;
            if (this.bannerIndex < 0) {
                this.bannerIndex = this.contentArray[this.activeTabIndex].bannerList.length - 1;
            }
        },
        // 获取后一个轮播页的id
        getNextBannerIndex() {
            this.bannerIndex++;
            let length = this.contentArray[this.activeTabIndex].bannerList.length;
            if (this.bannerIndex >= length) {
                this.bannerIndex = 0;
            }
        },
        // 鼠标移入
        onMouseOver() {
            if (this.taskId) {
                clearInterval(this.taskId);
            }
        },
        // 鼠标移出
        onMouseOut() {
            this.taskId = setInterval(this.getNextBannerIndex, 5000, this.activeTabIndex);
        }
    }
});
