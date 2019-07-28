//三、小蛇对象=====自调用函数
(function () {

    //1.声明数组element，存放小蛇的每个（三）身体部分
    var elements=[];

    //2.小蛇的构造函数(对 宽、高、方向，小蛇的三个部分都是一样的；只有横纵坐标、颜色要单独设置)
    function Snake(width,height,direction) {
        this.width=width||20;
        this.height=height||20;
        //小蛇的身体：头、一身、二身
        this.body=[
            {x:3,y:2,color:"red"},//头
            {x:2,y:2,color:"orange"},//身体
            {x:1,y:2,color:"orange"}//身体
        ];
        //移动方向
        this.direction=direction||"right";
    }

    //3.初始化小蛇的方法，显示样式、位置--为该构造函数添加原型对象的方法
    Snake.prototype.init=function (map){
        //1初始化前，先删除页面残留的小蛇;调用私有函数====================
        remove();
        //2根据this.body数组，循环遍历，确定数目来创建div--都是在遍历过程中执行
        for(var i=0;i<this.body.length;i++){
            //数组中每个元素都当成一个对象
            var obj=this.body[i];
            //创建div,追加到地图中
            var div=document.createElement("div");
            map.appendChild(div);
            //设置div小蛇的样式
            div.style.position="absolute";
            div.style.width=this.width+"px";
            div.style.height=this.height+"px";
            //横纵坐标
            div.style.left=obj.x*this.width+"px";//==== *this.width
            div.style.top=obj.y*this.height+"px";//==== *this.height
            //背景颜色
            div.style.backgroundColor=obj.color;
            //把遍历出来的这三个div,推进element数组中--目的是联合私有函数来删除小蛇（初始化时）
            elements.push(div);
        }
    };


    //4.小蛇动起来----在该构造数的原型对象中添加方法
    Snake.prototype.move=function (food,map) {
        //1改变小蛇的身体的坐标位置，so数组长度为2--- 2 1 0
        var i=this.body.length-1; //i=2
        for(;i>0;i--){ // i>0则不包括头部，此循环是倒序，从最后尾部开始
            this.body[i].x=this.body[i-1].x;
            this.body[i].y=this.body[i-1].y;
        }
        //2改变小蛇的头部坐标位置---判断方向
        switch(this.direction){
            case "right":
                this.body[0].x+=1;
                break;
            case "left":
                this.body[0].x-=1;
                break;
            case "top":
                this.body[0].y-=1;
                break;
            case "bottom":
                this.body[0].y+=1;
                break;
        }
        //3小蛇是否变长===判断有没有吃到食物
        //判断小蛇头部的坐标和食物的坐标是否一致？
        var headX=this.body[0].x*this.width;
        var headY=this.body[0].y*this.height;
        if(headX==food.x&&headY==food.y){//传入food、map形参的作用======
            //获取小蛇最后的尾巴
            var last=this.body[this.body.length-1];
            //把获取到的最后的尾巴，推进小蛇身体中body(变长效果)
            //（头部位置压在了食物上..最后一个的位置自然就空，那就增加一个一样的==制造了变长的假象）
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            });
            //吃了之后，删除食物--重新初始化食物（里面有删除残留食物的调用函数方法）
            food.init(map);
        }
    };


    //5.(移动小蛇后),删除上次残留的小蛇--初始化调用该函数=========
    //删除小蛇的私有函数
    function remove(){
        //从蛇尾-蛇头方向删除div（倒序）,删除map中的小蛇的三个div、同时删element数组中每个div
        var i=elements.length-1;//=====
        //倒序遍历；i>=0表示小蛇头部的div也要删除
        for(;i>=0;i--){
            //获取当前子元素，以找到其父级元素，大义灭亲
            var ele=elements[i];
            //地图map删小蛇div
            ele.parentNode.removeChild(ele);
            //element数组中删除
            elements.splice(i,1);
        }
    }

    //6.把小蛇的函数暴露给 window ,外部调用
    window.Snake=Snake;
}());