window.onload = function () {

    var mi_home = {

        init: function () {


            // 获取页面元素
            // this.getElement();

            // 封装函数
            this.codeLess();

            // 注册事件
            this.addEvent();



            // console.dir(mi_home);
        },

        // 获取公用元素
        // getElement: function () {

        // 下载按钮及二维码
        // this.dw = document.querySelector('.zh_nav .dw');
        // this.dw_code = document.querySelector('.zh_nav_download');

        // 购物车
        // this.shop_car = document.querySelector('.zh_shop_car');
        // this.shop_car_hidden = document.querySelector('.shop_car_hidden');

        // 中部菜单
        // this.mid_m = document.getElementsByClassName('mid_m');

        // 顶部输入框
        // this.r_s_left = document.getElementsByClassName('r_s_left')[0];
        // this.zh_right_search = document.getElementsByClassName('zh_right_search')[0];

        // 轮播图部分
        // this.imgIndex = 0;
        // this.zh_points = document.getElementsByClassName('zh_points')[0];
        // this.zh_b_imgs = document.querySelector('.zh_b_imgs');
        // this.len1 = this.zh_b_imgs.children.length;

        // 楼层区域 按钮切换
        // this.temp_1 = '.right_switch span';



        // console.log(this.dw + ' ' + this.dw_code);
        // },



        // 注册事件

        addEvent: function () {
            // 保存this
            var self = this;

            // 1.设置导航栏二维码显示
            this.dw = document.querySelector('.zh_nav .dw');
            this.dw_code = document.querySelector('.zh_nav_download');
            var dw_xsj = document.querySelector('.zh_nav .dw .zh_xsj');

            this.dw.onmouseenter = function () {
                // self.dw_code.style.display = 'block';

                dw_xsj.style.display = 'block';
                self.downSlide(self.dw_code, 148);
            }
            this.dw.onmouseleave = function () {
                // self.dw_code.style.display = '';

                // self.upSlide(self.dw_code, 0 , 148, function(){
                //     // console.log('触发了');

                //     clearTimeout(timer1);
                //     var timer1 = setTimeout(function(){
                //         dw_xsj.style.display = '';
                //     },200)
                // });

                self.upSlide(self.dw_code, 0);
                dw_xsj.style.display = '';

            }

            // 2.1设置导航栏购物车下拉显示
            this.shop_car = document.querySelector('.zh_shop_car');
            var shop_car_hidden = document.querySelector('.shop_car_hidden');
            var scSpan = shop_car_hidden.firstElementChild.children;
            var scTips = shop_car_hidden.lastElementChild;
            // var random = Math.floor(Math.random() * (6 - 1) + 1);

            this.shop_car.onmouseenter = function () {
                this.style.background = '#fff';
                self.downSlide(shop_car_hidden, 97);
                shop_car_hidden.firstElementChild.style.display = 'block';

                var time = self.getTimes();

                clearInterval(this.timer);
                this.timer = setInterval(function () {


                    self.downSlide(scSpan[0], Math.floor(Math.random() * (15 - 7) + 7));
                    self.downSlide(scSpan[1], Math.floor(Math.random() * (25 - 7) + 7));
                    self.downSlide(scSpan[2], Math.floor(Math.random() * (15 - 7) + 7));

                    if (self.getTimes() - time >= 3000) {
                        shop_car_hidden.firstElementChild.style.display = 'none';
                        scTips.style.display = 'block';
                    }
                }, 200)

                // console.log(Math.floor(Math.random() * (15 - 1) + 1));
            }
            // 2.2设置导航栏购物车移出鼠标复原
            this.shop_car.onmouseleave = function () {
                this.style.background = '';
                self.upSlide(shop_car_hidden, 0);
                shop_car_hidden.firstElementChild.style.display = '';
                clearInterval(this.timer);
                scTips.style.display = '';
            }

            // 2.3购物车加载
            // this.downSlide();

            // 3.1中部菜单鼠标进入显示下拉商品
            var zh_menu_hidden = document.querySelector('.zh_menu_hidden');
            var zh_middle_menus = document.querySelector('.zh_middle_menus');
            var zh_item = document.getElementsByClassName("zh_item");
            var mid_m_no = document.querySelectorAll('.mid_m_no');
            var mid_m_a = document.querySelectorAll('.mid_m a');
            this.mid_m = document.getElementsByClassName('mid_m');

            // 鼠标进入
            zh_middle_menus.onmouseenter = function () {
                self.downSlide(zh_menu_hidden, 250); //改版调用
                var temp = document.getElementById(mid_m_a[0].dataset.menulist);
                temp.style.display = 'block';
            }
            // 鼠标移出
            zh_middle_menus.onmouseleave = function () {
                // 此处定义定时器来延迟下拉菜单收回
                clearTimeout(timer);
                var timer = setTimeout(function () {
                    self.upSlide(zh_menu_hidden, 0); //改版调用
                    mid_m_a[0].style.display = '';
                }, 100)
            }

            // 3.2菜单中最后两个不触发下拉
            this.eForArr(mid_m_no, 'onmouseenter', function () {
                self.upSlide(zh_menu_hidden, 0);
            });
            // 3.3鼠标进入更换下拉商品类型
            this.eForArr(mid_m_a, 'onmouseenter', function () {

                // 此处防止事件无法触发
                zh_middle_menus.onmouseenter();

                var mList = this.dataset.menulist;
                var product = document.getElementById(mList);
                for (var i = 0; i < mid_m_a.length; i++) {
                    zh_item[i].style.display = 'none';
                }
                product.style.display = 'block';


            });


            // 4.1顶部输入框 变量定义
            var fdj = document.querySelector('.r_s_right');
            var search_hidden = document.querySelector('.search_hidden');
            var search_a = document.querySelectorAll('.zh_right_search a');
            this.r_s_left = document.getElementsByClassName('r_s_left')[0];
            this.zh_right_search = document.getElementsByClassName('zh_right_search')[0];

            self.r_s_left.onfocus = function () {
                self.zh_right_search.style.border = '1px solid #ff6700';
                fdj.style.borderLeft = '1px solid #ff6700';
                search_hidden.style.display = 'block';
                search_a[0].style.opacity = 0;
                search_a[1].style.opacity = 0;
            }
            self.r_s_left.onblur = function () {
                self.zh_right_search.style.border = '';
                fdj.style.borderLeft = '';
                search_hidden.style.display = '';
                search_a[0].style.opacity = 1;
                search_a[1].style.opacity = 1;
            }

            // 5.1顶部logo切换
            var logo = document.querySelectorAll('.zh_left_logo img')
            var logo_area = document.querySelector('.zh_left_logo');

            logo_area.onmouseenter = function () {
                logo[0].style.left = '3px';
                logo[1].style.left = '50px';
            }
            logo_area.onmouseleave = function () {
                logo[0].style.left = '';
                logo[1].style.left = '';
            }

            // 6.1侧边固定按钮切换效果
            var fixed_sideBar = document.querySelector('.fixed_sideBar ul').children;
            var side_p = document.querySelectorAll('.fixed_sideBar ul p');
            var side_code = document.querySelector('.fixed_sideBar .side_code');
            // 鼠标进入侧边固定按钮的类hover效果
            this.eForArr(fixed_sideBar, 'onmouseenter', function () {
                var img = this.firstElementChild.firstElementChild;

                // 侧边二维码显示
                if (this.number == 0) {
                    side_code.style.display = 'block';
                }

                side_p[this.number].style.color = '#ff6700'
                self.cutURL(img, '_', './img/side-icon_', '-h.png');
            });
            // 鼠标移出
            this.eForArr(fixed_sideBar, 'onmouseleave', function () {
                var img = this.firstElementChild.firstElementChild;

                if (this.number == 0) {
                    side_code.style.display = '';
                }

                side_p[this.number].style.color = ''
                self.cutURL(img, '_', './img/side-icon_', '.png');
            });

            // 6.2侧边按钮置顶效果
            self.scro();
            window.onscroll = self.scro;
            // 6.2.1获取指定按钮
            var toTop = document.querySelector('.fixed_sideBar .to_top');
            // 6.2.2 点击置顶
            toTop.onclick = function () {
                document.documentElement.scrollTop = 0;
            }

            // 7.1banner图侧边栏目效果
            var zh_pro_list = document.querySelectorAll('.zh_pro_list li');
            var hide_div = document.querySelectorAll('.zh_sideBar_hidden>div');
            var wrapper = document.querySelector('.zh_sideBar_hidden');
            var zh_b_sideBar = document.querySelector('.zh_b_sideBar');

            // 7.2进入侧边栏
            this.eForArr(zh_pro_list, 'onmouseenter', function () {

                var id = this.dataset.proid;
                var hide = document.getElementById(id);

                wrapper.style.display = 'block';
                for (var i = 0; i < zh_pro_list.length; i++) {
                    hide_div[i].style.display = 'none';
                    zh_pro_list[i].style.backgroundColor = '';
                }
                hide.style.display = 'block';
                this.style.backgroundColor = '#ff6700';

                // console.log(banner_flag);
            });

            // 7.3鼠标移出清除所有效果
            zh_b_sideBar.onmouseleave = function () {
                // 清除隐藏区域的显示
                wrapper.style.display = 'none';

                // 清除所有li选中的样式
                for (var i = 0; i < zh_pro_list.length; i++) {
                    zh_pro_list[i].style.backgroundColor = '';
                }
            }

            //8.1播放视频
            var v1 = document.getElementById('start_play');
            var v1_p = document.querySelector('.hidden_video video');
            var v1_w = document.querySelector('.hidden_video');

            v1.onclick = function () {
                // console.log('事件触发！');

                v1_w.style.display = 'block';
                v1_p.load();
                v1_p.play();

                console.log(v1_p.autoplay);
            }

            // 8.2.1获取右侧关闭按钮
            var close = document.getElementsByClassName('close')[0];
            // 8.2.2点击关闭
            close.onclick = function () {
                v1_w.style.display = '';
                v1_p.pause();

            }

            //  9.1轮播图开始 
            this.imgIndex = 0;
            this.zh_points = document.getElementsByClassName('zh_points')[0];
            this.zh_b_imgs = document.querySelector('.zh_b_imgs');
            this.len1 = this.zh_b_imgs.children.length;

            // 9.2遍历图片数量（动态创建小圆点）
            for (var i = 0; i < this.len1; i++) {
                var p_span = document.createElement('span');

                // 添加小圆点默认选中样式
                if (i == 0) {
                    p_span.classList.add('active');
                }

                // 保存当前i的值作为索引
                p_span.spIndex = i;
                // 为当前小圆点注册点击事件
                p_span.addEventListener('click', function () {

                    // 检测小圆点选中状态
                    self.detect(this.spIndex, self.zh_points.children, 'span', 'active');
                    // 调用虚化
                    self.imgIllusory(this.spIndex);
                    // 使banner图父元素位移
                    self.zh_b_imgs.style.left = -this.spIndex * 1226 + 'px';
                })
                // 将新建的小圆点放入html结构中
                this.zh_points.appendChild(p_span);

            }

            // 9.3实现右侧按钮点击移动图片容器
            this.btn_r = document.querySelector('.zh_btn_r');
            var btn_l = document.querySelector('.zh_btn_l')
            // 右侧按钮
            this.btn_r.addEventListener('click', function () {
                // console.log('移动了');

                if (self.imgIndex == 4) {
                    self.imgIndex = 0;
                } else {
                    self.imgIndex++;
                }

                // 检测小圆点选中状态
                self.detect(self.imgIndex, self.zh_points.children, 'span', 'active');
                // zh_points.children[self.imgIndex].classList.add('active');
                // console.log(self.imgIndex);

                // 调用虚化
                self.imgIllusory(self.imgIndex);

                self.zh_b_imgs.style.left = -self.imgIndex * 1226 + 'px';

                self.autoPlay();
            })
            // 左侧按钮
            btn_l.addEventListener('click', function () {

                if (self.imgIndex == 0) {
                    self.imgIndex = 4;
                } else {
                    self.imgIndex--;
                }

                // 检测小圆点选中状态
                self.detect(self.imgIndex, self.zh_points.children, 'span', 'active');

                // 调用虚化
                self.imgIllusory(self.imgIndex);

                self.zh_b_imgs.style.left = -self.imgIndex * 1226 + 'px';

            })

            // 9.4实现自动轮播
            this.autoPlay();

            // 9.5实现鼠标进入，暂停轮播
            var zh_banner = document.querySelector('.zh_banner');
            zh_banner.onmouseenter = function () {
                // self.autoPlay = null;
                // console.log('暂停：' + self.timer);
                clearTimeout(self.timer);
            }
            // 9.6鼠标移出, 继续轮播
            zh_banner.onmouseleave = function () {
                self.autoPlay();
            }

            // 10.1楼层区域切换效果
            var tempArr = [
                '.zh_home_elect ',
                '.zh_artificial ',
                '.zh_dapei ',
                '.zh_peijian ',
                '.zh_zhoubian '
            ];
            this.temp_1 = '.right_switch span';

            // 10.2 批量获取span的父元素
            var spanParents = {}
            for (var i = 0; i < tempArr.length; i++) {
                spanParents['swSpan' + i] = document.querySelectorAll(tempArr[i] + this.temp_1);
            }
            // 10.3 批量为楼层区域的切换按钮调用切换效果
            for (var i = 0; i < tempArr.length; i++) {
                this.floorDisplay(spanParents['swSpan' + i], tempArr[i]);
            }

            // var swSpan1 = document.querySelectorAll(tempArr[0] + temp_1);
            // var swSpan2 = document.querySelectorAll(tempArr[1] + temp_1);
            // var swSpan3 = document.querySelectorAll(tempArr[2] + temp_1);
            // var swSpan4 = document.querySelectorAll(tempArr[3] + temp_1);
            // var swSpan5 = document.querySelectorAll(tempArr[4] + temp_1);

            // a(swSpan1, tempArr[0]);
            // a(swSpan2, tempArr[1]);
            // a(swSpan3, tempArr[2]);
            // a(swSpan4, tempArr[3]);
            // a(swSpan5, tempArr[4]);


            // this.eForArr(swSpan1, 'onmouseenter', function () {

            //     var he_products = document.querySelectorAll('.zh_home_elect .he_products');
            //     // var item = this.parentNode.parentNode.nextElementSibling;

            //     for (var i = 0; i < he_products.length; i++) {
            //         he_products[i].style.display = 'none';
            //     }
            //     he_products[this.number].style.display = 'block';

            //     self.detect(this.number, swSpan1, tempArr[0]+ temp_1, 'choose');
            // })

            // this.eForArr(swSpan2, 'onmouseenter', function () {
            //     var he_products = document.querySelectorAll('.zh_artificial .he_products');

            //     for (var i = 0; i < he_products.length; i++) {
            //         he_products[i].style.display = 'none';
            //     }
            //     he_products[this.number].style.display = 'block';

            //     self.detect(this.number, swSpan2, tempArr[1]+ temp_1, 'choose');
            // })

            // this.eForArr(swSpan3, 'onmouseenter', function () {
            //     var he_products = document.querySelectorAll('.zh_dapei .he_products');

            //     for (var i = 0; i < he_products.length; i++) {
            //         he_products[i].style.display = 'none';
            //     }
            //     he_products[this.number].style.display = 'block';

            //     self.detect(this.number, swSpan3, tempArr[2]+ temp_1, 'choose');
            // })

            // this.eForArr(swSpan4, 'onmouseenter', function () {
            //     var he_products = document.querySelectorAll('.zh_peijian .he_products');

            //     for (var i = 0; i < he_products.length; i++) {
            //         he_products[i].style.display = 'none';
            //     }
            //     he_products[this.number].style.display = 'block';

            //     self.detect(this.number, swSpan4, tempArr[3]+ temp_1, 'choose');
            // })

            // this.eForArr(swSpan5, 'onmouseenter', function () {
            //     var he_products = document.querySelectorAll('.zh_zhoubian .he_products');

            //     for (var i = 0; i < he_products.length; i++) {
            //         he_products[i].style.display = 'none';
            //     }
            //     he_products[this.number].style.display = 'block';

            //     self.detect(this.number, swSpan5, tempArr[4]+ temp_1, 'choose');
            // })

            // 10.1 页面刷新就开始调用秒杀
            this.fastKill();

            // 10.2清除上一次计时器并开启新的定时器
            clearInterval(timer2);
            var timer2 = setInterval(this.fastKill, 1000)




            // console.log(fixed_sideBar.children);
        },

        // 封装函数
        codeLess: function () {
            // 储存当前this
            var self = this;

            // 封装下滑效果
            this.downSlide = function (elem, origin, target, fn) {
                // 将当前元素设置为显示  （ elem, display, speed ）
                // if (!display) {
                //     elem.style.display = 'block';
                //     elem.style.overflow = 'hidden';
                // }
                // // 获取当前元素高度
                // var target = elem.offsetHeight;
                // // 将当前元素高度设置为0
                // elem.style.height = 0 + 'px'
                // var origin = 0;
                // console.log(target);

                // clearInterval(timer);
                // var timer = setInterval(function () {
                //     origin += 10;
                //     console.log('内部：' + origin);
                //     if (origin >= target) {
                //         origin = target;
                //         clearInterval(timer);
                //     }
                //     elem.style.height = origin + 'px';

                // }, (speed || 20))

                // 改版
                // elem.style.display = 'block';
                elem.style.transition = 'all .2s linear';
                elem.style.height = origin + 'px';

                // console.log('前 ' + elem.clientHeight);
                // console.log('前 ' + target);
            }

            // 封装上滑效果
            this.upSlide = function (elem, origin, target, fn) {

                // // 获取当前元素高度
                // if (!origin) {
                //     origin = elem.offsetHeight;
                // }
                // // 临时保存当前元素初始高度
                // var temp = origin;
                // // elem.style.height = 0 + 'px'    *************
                // var target = 0;
                // clearInterval(timer);
                // var timer = setInterval(function () {
                //     origin -= 10;
                //     // console.log('内部：' + origin);
                //     if (origin <= target) {
                //         origin = target;
                //         elem.style.display = '';
                //         elem.style.height = temp + 'px';
                //         clearInterval(timer);
                //     } else {
                //         elem.style.height = origin + 'px';
                //     }

                // }, 20)


                // 改版
                elem.style.height = origin + 'px';

                if (this.clientHeight = target) {
                    fn();
                }
                // console.log(elem.clientHeight);
                // console.log(origin);
            }

            // 封装伪数组批量注册事件
            this.eForArr = function (likeArray, event_type, fn) {
                for (var i = 0; i < likeArray.length; i++) {
                    likeArray[i].number = i;
                    likeArray[i][event_type] = fn;
                }

            }

            // 封装获取地址并截取关键值
            this.cutURL = function (img, cutStr, concatStr1, concatStr2) {
                // img = this.firstElementChild.firstElementChild;
                var temp = img.src;
                temp = temp.substr(temp.lastIndexOf(cutStr) + 1, 1);
                // console.log(temp);
                temp = concatStr1 + temp + concatStr2;
                // console.log(temp);
                img.src = temp;
            }

            // 封装滚动事件
            this.scro = function () {
                var left_timeBox = document.querySelector('.left_timeBox');
                var toTop = document.querySelector('.fixed_sideBar .to_top');

                // 获取浏览器滚动条滚动的距离
                var scroll = document.documentElement.scrollTop;

                // 将浏览器滚动距离和参照点和顶部的距离进行比较
                if (scroll >= left_timeBox.offsetTop) {
                    toTop.style.display = 'block';
                } else {
                    toTop.style.display = '';
                }

                //   console.dir(left_timeBox.offsetTop);
            }

            // 封装类名排它
            this.detect = function (currentIndex, likeArray, detectElem_str, className_str) {

                // 检测当前页面中是否存在目标效果
                var detectActive = document.querySelector(detectElem_str + '.' + className_str);
                if (detectActive) {
                    detectActive.classList.remove(className_str);
                }

                likeArray[currentIndex].classList.add(className_str);
            }

            // 封装自动轮播功能
            this.autoPlay = function () {

                // console.log(this.timer);

                clearTimeout(this.timer);
                // 开启定时器，实现轮播功能
                this.timer = setTimeout(function () {
                    self.btn_r.click();
                }, 3000)
            }

            // 封装图片虚化效果
            this.imgIllusory = function (currentIndex) {

                for (var i = 0; i < this.len1; i++) {
                    this.zh_b_imgs.children[i].style.opacity = '0.5';
                    // console.log(this.zh_b_imgs.children[i]);
                }
                this.zh_b_imgs.children[currentIndex].style.opacity = '1';
            }

            // 封装楼层区域切换效果
            this.floorDisplay = function (swSpan, spanParent, ) {
                self.eForArr(swSpan, 'onmouseenter', function () {

                    var he_products = document.querySelectorAll(spanParent + '.he_products');
                    // var item = this.parentNode.parentNode.nextElementSibling;

                    for (var i = 0; i < he_products.length; i++) {
                        he_products[i].style.display = 'none';
                    }
                    he_products[this.number].style.display = 'block';

                    self.detect(this.number, swSpan, spanParent + self.temp_1, 'choose');
                })
            }

            // 封装获取从 1970 年 1 月 1 日至今的毫秒数
            this.getTimes = function () {

                var time = new Date();

                return time.getTime();
            }

            // 封装获取当前时间
            this.getCurrentTime = function () {

                var time = new Date();

                var h = time.getHours();
                var m = time.getMinutes();
                var s = time.getSeconds();

                h = h >= 10 ? h : '0' + h;
                m = m >= 10 ? m : '0' + m;
                s = s >= 10 ? s : '0' + s;

                var nowTime = {
                    h: h,
                    m: m,
                    s: s
                }

                return nowTime;
            }

            // 封装小米秒杀
            this.fastKill = function () {

                var timeBox = document.querySelectorAll('.left_timeBox .time div');
                var level = document.querySelector('.left_timeBox h5');
                var timeTips = document.querySelector('.left_timeBox p');

                // console.log(timeTips.innerHTML);

                /**
                 * 规则如下：
                 * 
                 * 一天一共4场  10  14 18 22
                 * 
                 * 每一场持续时间为2小时
                 */

                var t10 = 10 * 3600;
                var t14 = 14 * 3600;
                var t18 = 18 * 3600;
                var t22 = 22 * 3600;

                // 计算当前时间转换成秒之后的值
                var h = self.getCurrentTime().h * 3600;
                var m = self.getCurrentTime().m * 60;
                var s = self.getCurrentTime().s;
                var sum = h + m + s;

                // 计算差值并取绝对值
                // sum = Math.abs(sum - t19);


                if (sum >= t10 && sum < t14) {
                    // 十点场
                    level.innerText = '10' + level.innerText.substr(2);

                    if (sum < 12 * 3600) {
                        sum = Math.abs(sum - t10)
                        timeTips.innerText = '距离本场结束时间还有';
                    } else {
                        sum = Math.abs(sum - t14)
                        timeTips.innerText = '距离下场开始时间还有';
                    }


                } else if (sum >= 14 && sum < t18) {
                    // 14点场
                    level.innerText = '14' + level.innerText.substr(2);

                    if (sum < 16 * 3600) {
                        sum = Math.abs(sum - t14)
                        timeTips.innerText = '距离本场结束时间还有';
                    } else {
                        sum = Math.abs(sum - t18)
                        timeTips.innerText = '距离下场开始时间还有';
                    }

                } else if (sum >= 18 && sum < t22) {
                    // 18点场
                    level.innerText = '18' + level.innerText.substr(2);

                    if (sum < 20 * 3600) {
                        sum = Math.abs(sum - t18)
                        timeTips.innerText = '距离本场结束时间还有';
                    } else {
                        sum = Math.abs(sum - t22)
                        timeTips.innerText = '距离下场开始时间还有';
                    }

                } else {
                    // 22点场
                    level.innerText = '20' + level.innerText.substr(2);

                    if (sum < 24 * 3600) {
                        sum = Math.abs(sum - t22)
                        timeTips.innerText = '距离本场结束时间还有';
                    } else {
                        sum = t10;
                        timeTips.innerText = '距离下场开始时间还有';
                    }
                }

                // 转换成时间格式
                h = parseInt(sum / 3600);
                m = parseInt((sum % 3600) / 60);
                s = sum % 3600 % 60;

                h = h >= 10 ? h : '0' + h;
                m = m >= 10 ? m : '0' + m;
                s = s >= 10 ? s : '0' + s;


                timeBox[0].innerText = h;
                timeBox[1].innerText = m;
                timeBox[2].innerText = s;

            }
        }






    }

    mi_home.init();
}