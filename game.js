//四、游戏对象=====自调用函数
(function () {

    //1.该变量的目的：保存游戏Game的实例对象
    var that=null;//=========================

    //2.游戏的构造函数
    function Game(map) {//外面传入的document.querySelector(".map") 变成了map;用到地图参数
        this.food=new Food();//实例化食物对象,保存到food此属性中？
        this.snake=new Snake();//实例化小蛇对象
        this.map=map;
        that=this;//保存当前实例对象到that变量中，that就是this//======
    }


    //3.初始化游戏(食物、小蛇的显示)===在游戏的构造函数的原型对象中添加方法
    Game.prototype.init=function () {
        //原型中方法可以相互调用
        //初始化食物
        this.food.init(this.map);
        //初始化小蛇
        this.snake.init(this.map);
        //调用下面“小蛇自动跑起来”的方法========
        this.runSnake(this.food,this.map);
        //调用设置用户按键的方法==========
        this.bindKey();
    };


    //4.小蛇自动跑起来===添加原型对象的方法(涉及定时器、清理定时器) (初始化时调用)
    Game.prototype.runSnake=function (food,map) {
        //定时器
        var timeId=setInterval(function () {
            //这里面的this是window 因为window.setInterval();所以涉及bind方法
            //移动小蛇：移动+初始化 搭配使用；游戏构造函数中已经实例化小蛇对象，放在了 this.snake
            this.snake.move(food,map);
            this.snake.init(map);
            //不让小蛇跑出去，让他撞墙停止--根据头部位置判断
            //跑动的横坐标、纵坐标最大值
            var maxX=map.offsetWidth/this.snake.width;
            var maxY=map.offsetHeight/this.snake.height;
            //获取小蛇的头部的横、纵坐标
            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;
            //判断什么时候让他撞墙--清理定时器
            //横坐标
            if(headX<0||headX>=maxX){
                clearInterval(timeId);
                alert("游戏结束啦!");
            }
            //纵坐标
            if(headY<0||headY>=maxY){
                clearInterval(timeId);
                alert("游戏结束啦!");
            }
        }.bind(that),200);//.bind(that) 是函数调用了这个方法，bind改变了this的指向
    };


    //5.设置用户按键，改变小蛇移动的方向===添加原型对象的方法 (初始化时调用)==============
    Game.prototype.bindKey=function(){
        //为文档document注册键盘按下事件
        //获取用户所按下的键盘，以此改变小蛇的移动方向
        document.addEventListener("keydown",function (e) {
            //这里的this是触发keydown事件的对象：document
            // this==document; 所以要改变this的指向，应为Game的实例对象；用bind方法改变
            //获取按键的值，判断
            switch(e.keyCode){
                case 37:
                    this.snake.direction="left";
                    break;
                case 38:
                    this.snake.direction="top";
                    break;
                case 39:
                    this.snake.direction="right";
                    break;
                case 40:
                    this.snake.direction="bottom";
                    break;
            }
        }.bind(that),false);
    };

    //6.把Game暴露给window ,外部就可以访问Game对象
    window.Game=Game;
}());