window.onload = function () {
    // 获取元素
    var push = document.getElementsByClassName('push')[0];
    var introduce = document.querySelector('.introduce');

    var count = 0;
    var num = 1;

    var flag = true;

    push.onclick = function () {

        if (num == 500) {
            this.onclick = null;
        }

        if (introduce.classList.contains('getSkip6')) {
            flag = false;
        }

        introduce.classList.add('getSkip');
        // console.dir(introduce.clientHeight);
        clearTimeout(timer);
        count++;
        // console.log('第' + count + '次触发点击');
        if (flag) {
            clearTimeout(timer);
            var timer = setTimeout(function () {
                sk2();
            }, 0.5)
        }

        if (introduce.classList.contains('getSkip6')) {
            this.click = null;
        }
    }

    function sk2() {
        push.click();
        // console.log('sk2已启动！');

        // if (introduce.classList.contains('getSkip1')) {

        // }

        // if (add(introduce) === 9999) {
        //     return (flag = false);
        // }

        add(introduce);


        if (introduce.offsetHeight == 400) {
            introduce.classList.add('getSkip1');
        }

    }

    function add(elem) {

        // if (num >= 7) {
        //     return 9999;
        // }

        console.log('getSkip' + num);

        if (elem.classList.contains('getSkip' + num)) {
            elem.classList.add('getSkip' + ++num);
            num--;

            console.log(elem.className);
        }
        num++;


    }
}