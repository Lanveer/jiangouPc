/**
 * Created by Administrator on 2017/12/7.
 */
/**
 * Created by Administrator on 2017/12/5.
 */
/**
 * Created by Administrator on 2017/12/5.
 */
/**
 * Created by Administrator on 2017/12/1.
 */
/**
 * Created by Administrator on 2017/11/27.
 */

var myApp = angular.module('myApp',['ui.bootstrap']);
//top
myApp.directive('top',function(){
    return{
        restrict:"EA",
        replace:true,
        templateUrl:'../include/top.html',
        link:function ($scope) {
            $scope.topTitle='下载App';
            $scope.topTel='1820040';
            $scope.topLogin='商家登录';
        }
    }
});

//footer
myApp.directive('footer',function(){
    return{
        restrict:"EA",
        replace:true,
        templateUrl:'../include/footer.html',
        link:function ($scope) {
            $scope.footerTest='test'
        }
    }
});

//bottom
myApp.directive('bottom',function(){
    return{
        restrict:"EA",
        replace:true,
        templateUrl:'../include/bottom.html',
        link:function ($scope) {
            $scope.footerTest='test'
        }
    }
});

//nav
myApp.directive('nav',function(){
    return{
        restrict:"EACM",
        replace:true,
        templateUrl:'../include/nav.html',
        link:function ($scope,$http) {
            $('.nav-first').click(function (e) {
                e.stopPropagation();
                e.preventDefault();
                var flag=$('.nav-detail').is(':hidden');
                if(flag){
                    $('.sec-item:eq(0)').show()
                    $('.nav-first>span').css({
                        'background-image':'url(../public/imgs/basic/second_arrow_up.png)'
                    })
                    $('.nav-detail').fadeIn(300);
                    $('.nav-list').fadeIn(300);

                }else{
                    $('.nav-first>span').css({
                        'background-image':'url(../public/imgs/basic/second_arrow_down.png)'
                    })
                    $('.nav-detail').fadeOut(300);
                    $('.nav-list').fadeOut(300);
                    $('.sec-item').hide()


                }
            });
            $('.nav-list>ul>li').click(function (e) {
                e.preventDefault();
                $(this).css({
                    background:'#fff'
                })
                $(this).siblings().css({
                    background:'#f8f8f8'
                })
                var idx=$(this).index()-1;
                $(".sec-item").hide().eq(idx).show();
            });
            $scope.change= function (e) {
                $('.nav-list>ul>li').css({
                    background:'#f8f8f8'
                }).eq(parseInt(e)).css({
                    background:'#fff'
                })
                $(".sec-item").hide().eq(parseInt(e)).show();
            }
        }
    }
});



//获取列表数据
myApp.controller('ListController',function ($scope,$http,$log) {
    //基础数据获取
    var baseDataPromise= $http({
        url:baseUrl+'homepage/home/basedata',
        method:'get',
        params:{
            auth_name:'id',
            id:1,
            tx:'3f556f66353c5945a3633ae209a3e0ff'
        }
    })
    baseDataPromise.then(function (res){
        if(res.data.error==200){
            $scope.category=res.data.data.category;
            $scope.foodCategory=res.data.data.delicacy;
        }
    })
    //分类筛选
    $scope.Category = function (category_parent,idx) {
        var args={
            category_parent:category_parent
        }
        loadListData(args);
        $('.condition-item-box-cat>a').css({
            background:'#fff',
            color:'#333',
        }).eq(parseInt(idx)).css({
            background:'#ffa84b',
            color:'#fff',
            'text-decoration':'none'
        })
        $('.no-limit-cat').css({
            background:'#fff',
            color:'#333',
        })

    }

    //排序筛选
    $scope.rank= function (type) {
        var args={
            type:type
        }
        $('.no-limit-rank').css({
            background:'#fff',
            color:'#333',
        })
        loadListData(args);
    }

    //营业状态
    $scope.status= function (isOpen) {
        var args={
            isOpen:isOpen
        }
        $('.no-limit-status').css({
            background:'#fff',
            color:'#333',
        })
        loadListData(args);
    }

    //搜索数据列表
    $scope.search= function (val) {
        console.log('val is:',val)
        if(val!=undefined){
            $scope.searchListFlag=true;
        }else{
            $scope.searchListFlag=false;
        }
        $http({
            url:baseUrl+'magor/five/fuzzy',
            method:'get',
            params:{
                search:val,
                grand_id:5,
                auth_name:'id',
                id:1,
                tx:'3f556f66353c5945a3633ae209a3e0ff'
            }
        }).then(function (res) {
            if(res.data.error==200){
                setTimeout(function(){
                    console.log(res)
                    $scope.searchListData=res.data.data;
                    $scope.$apply();
                },10);
                if(res.data.data.length>0){
                    $scope.havaData=false;
                    $scope.searchListFlag=true;
                }else{
                    $scope.havaData=true;
                    $scope.searchListFlag=false;
                }

            }else{
            }
        })
    }

    //搜索数据
    $scope.searchDetail= function (val) {
        $scope.searchListFlag=false;
        var args={
            search:val
        }
        loadListData(args)
    }

    //点击搜索按钮
    $scope.searchResult= function (val) {
        $scope.searchListFlag=false;
        var args={
            search:val
        }
        loadListData(args)
    }

    //列表数据获取
    loadListData(5)



    //获取列表数据公共函数
    function loadListData(args) {
        var category_parent=args.category_parent;
        var category_child=args.category_child;
        var type=args.type;
        var isOpen=args.isOpen;
        var search=args.search;

        var listPromise=$http({
            url:baseUrl+'delicacy/food/list',
            method:'get',
            params:{
                grand_id:5,
                auth_name:'id',
                id:1,
                category_parent:category_parent,
                category_child:category_child,
                type:type,
                isOpen:isOpen,
                search:search,
                tx:'3f556f66353c5945a3633ae209a3e0ff'
            }
        })
        listPromise.then(function (res) {
            console.log(res)
            if(res.data.error!=200){
                //处理异常
            }else{
                $scope.bigImg='800_600.jpg'
                $scope.listData=res.data.data;
                //判断当前是星期几
                var openData=  $scope.listData;

                var open=[];
                angular.forEach(openData,function (a,b) {
                    open.push(a.open)
                })
                // console.log(open)
                var day = new Date().getDay();
                var hour=new Date().getHours();
                var min=new Date().getMinutes();
                var time=hour+':'+min;
                switch (day) {
                    case 0:
                        text = "星期日";
                        $scope.week=0;
                        $scope.time=time;
                        console.log('tian is:',open[0])
                        break;
                    case 1:
                        text = "星期一";
                        $scope.week=1;
                        $scope.time=time;
                        break;
                    case 2:
                        text = "星期二";
                        $scope.week=2;
                        $scope.time=time;
                        break;
                    case 3:
                        text = "星期三";
                        $scope.week=3;
                        $scope.time=time;
                        break;
                    case 4:
                        text = "星期四";
                        $scope.week=4;
                        $scope.time=time;
                        break;
                    case 5:
                        text = "星期五";
                        $scope.week=5;
                        $scope.time=time;
                        break;
                    case 6:
                        text = "星期六";
                        $scope.week=6;
                        $scope.time=time;
                        break;
                }
                //数据为空提示
                if($scope.listData.length>0){
                    $scope.havaData=false;
                    $scope.maxSize = 5;
                    $scope.currentPage = 1;
                    $scope.totalItems = Number(res.data.data[0].total_count);
                }else{
                    $scope.havaData=true;
                }
            }
        })
    }

    //分页数据
    $scope.pageChanged = function(){
        $log.log('Page changed to: ' + $scope.currentPage);
        $scope.listData = {};
        $http({
            url:baseUrl+'delicacy/food/list',
            method:'get',
            params:{
                page:$scope.currentPage,
                grand_id:5,
                auth_name:'id',
                id:1,
                tx:'3f556f66353c5945a3633ae209a3e0ff'
            }
        }).then(function (res) {
            setTimeout(function(){
                console.log(res)
                $scope.listData=res.data.data;
                $scope.$apply();
            },10);
        })
    };
})

