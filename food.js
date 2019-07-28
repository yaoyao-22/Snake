//二、食物对象======自调用函数
(function () {

    //1.声明一个数组，用来保存每个小方块食物
    var element=[];

    //2.定义构造函数，创建食物对象(横纵坐标、宽、高、颜色)
    function Food(x,y,width,height,color) {
        this.x=x||0;
        this.y=y||0;
        this.width=width||20;
        this.height=height||20;
        this.color=color||"hotPink";
    }

    //2.为该构造函数的原型对象，添加初始化方法==在页面显示食物的样式、位置（在地图上）
    //食物位置在地图map上，所以需要地图这个参数，要传进函数的形参中
    Food.prototype.init=function (map) {
        //1每次初始化，都要删除页面中残留的食物对象===========================
        //调用外部无法访问的私有函数，是调用函数
        remove();
        //2创建食物的div,追加到地图map中；并设置脱标、宽、高、颜色、随机横纵坐标样式
        var div=document.createElement("div");
        map.appendChild(div);
        //脱离文档流
        div.style.position="absolute";
        div.style.width=this.width+"px";
        div.style.height=this.height+"px";
        div.style.backgroundColor=this.color;
        //随机的横、纵坐标
        this.x=parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
        this.y=parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
        div.style.left=this.x+"px";
        div.style.top=this.y+"px";
        //创建、设置样式完食物的div后，把div推进数组element中===============
        element.push(div);
    };

    //3.针对若该食物对象再调用这个初始化方法，则会出现多个食物对象在地图上的问题=============
    //设置私有的函数(仅内部使用)---用来删除食物
    function remove(){
        //遍历element数组,目的是找到里面的元素，以便找到该元素的父级元素
        for(var i=0;i<element.length;i++){
            var ele=element[i];
            //1.用食物的父亲-地图，来亲手消灭自己的儿子-地图
            ele.parentNode.removeChild(ele);
            //2.element数组中保存的这个地图元素也要删除
            element.splice(i,1);//从第i个元素开始，删除1个
        }
    }

    //4.把食物Food这个函数暴露给window，表示外部可以使用
    window.Food=Food;
}());