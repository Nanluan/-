window.addEventListener('load',function(){
    // alert(1);
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var box = this.document.querySelector('.box');
    var ul = this.document.querySelector('ul');
    var ol = this.document.querySelector('.circle');
    var img = this.document.querySelector('.img');
    var imgWidth = img.offsetWidth;

    function animate(obj,target,callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if(obj.offsetLeft == target){
                clearInterval(obj.timer);
                // obj.style.left = 0;
                // 方法一
                if(callback){
                    callback();
                }
                // 方法二
                //  callback && callback();
            }
            obj.style.left = obj.offsetLeft + step + 'px';
    
    },30);
    }

    box.addEventListener('mouseenter',function(){
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    box.addEventListener('mouseleave',function(){
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function(){
            // 手动调用点击事件
            arrow_r.click();
        },2000);
    })
    console.log(ul.children.length);
    for(var i = 0; i < ul.children.length; i++){

        var li = this.document.createElement('li');
        // 记录小圆圈的索引号 通过自定义的属性
        li.setAttribute('index',i);
        ol.appendChild(li);
        li.addEventListener('mouseover',function(){
            // 1 干掉所让人
            for(var i = 0;i < ol.children.length;i++){
                ol.children[i].className = '';
            }
            // 2 留下我自己
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul,-index*imgWidth);
        })
        
    }
    ol.children[0].className = 'current';
    var pic1 = ul.children[0].cloneNode(true);
    ul.appendChild(pic1);
    var num = 0;
    var circle = 0;
    // 节流阀
    var flag = true;

    arrow_r.addEventListener('click',function(){
        // alert(1);
        if(flag){
            flag = false;
            if(num == ul.children.length-1){
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul,-num*imgWidth,function(){
                flag = true;
            });  
            circle++;
            if(circle == ol.children.length){
                circle = 0;
            }
            next_circle();
        }
        
    });

    arrow_l.addEventListener('click',function(){
        // alert(1);
        if(flag){
            flag = false;
            if(num == 0){
                num = ul.children.length-1;
                ul.style.left = -num * imgWidth + 'px';
                
            }
            num--;
            animate(ul,-num*imgWidth,function(){
                flag = true;
            });  
            circle--;
            if(circle < 0){
                circle = ol.children.length-1;
            }
            next_circle();
        }
        
    });

    function next_circle() {
        for(var i = 0;i < ol.children.length;i++){
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    var timer = setInterval(function(){
        // 手动调用点击事件
        arrow_r.click();
    },2000);
})