Vue.use(vant.Lazyload, { loading: '../static/images/loding.gif', error: '../static/images/405.jpg' });
new Vue({
    el: '#app',
    data: {
        active: 0,
        currentPage: 1,
        limt: 30,
        count: 35,
        show: false,
        show2: false,
        loading: false,
        finished: false,
        model_show: false,
        model_text: '',
        active_type: '亚洲色图',
        active_item_title: '',
        active_item_time: '',
        imageList: [],
        now_page: 1,
        navbar: {
            title: '看图片'
        },
        notice: {
            text: ''
        },
        list: [],
        actions: [{
                id: 'yse',
                name: '亚洲色图'
            },
            {
                id: 'tse',
                name: '偷拍自拍'
            },
            {
                id: 'ose',
                name: '欧美色图'
            },
            {
                id: 'qse',
                name: '清纯唯美'
            },
            {
                id: 'mse',
                name: '美腿丝袜'
            },
            {
                id: 'sse',
                name: '少妇熟女'
            },
            {
                id: 'mxse',
                name: '明星淫乱'
            },
            {
                id: 'kse',
                name: '卡通动漫'
            },

        ]
    },
    mounted: function() {
        this.pagination_change(this.now_page);
    },
    methods: {
        onClickRight() {
            // 类别选择菜单状态切换
            this.show = !this.show;;
        },
        onSelect(item) {
            // 点击选项时默认不会关闭菜单，可以手动关闭
            this.show = false;
            this.now_page = 1;
            this.active_type = item.name;
            this.list = [];
            this.$toast(item.name);
            var _this = this;
            this.pagination_change(this.now_page);
        },
        open_model(item_title, item_id, item_time) {
            var _this = this;
            _this.$toast('正在加载' + item_title + '内容');
            _this.$notify(item_title + item_time);
            _this.show2 = true;
            _this.active_item_title = item_title;
            _this.active_item_time = item_time;
            _this.imageList = [];
            $.ajax({
                url: '/get_items_pics',
                type: "post",
                data: {
                    "item_id": item_id,
                },
                success: function(data) {
                    _this.imageList = data;
                }
            });

        },
        pagination_change(page_num) {
            var _this = this;
            _this.list = [];
            _this.now_page = page_num;
            _this.navbar['title'] = '看图片  ' + _this.active_type + ' 第' + page_num + '页';
            this.$toast('正在加载' + this.active_type + page_num + '内容');
            $.ajax({
                type: "post",
                url: "/get_item_list",
                data: {
                    "item_type": _this.active_type,
                    "page_num": _this.now_page,
                    "limt": _this.limt
                },
                success: function(data) {
                    _this.notice['text'] = '网站通知：' + data.msg;
                    _this.count = data.count;
                    _this.list = [];
                    for (var i = 0; i < data.data.length; i++) {
                        _this.list.push(data.data[i]);
                    };

                }
            });
        },
    }
})
