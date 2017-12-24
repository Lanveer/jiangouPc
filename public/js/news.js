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
    var baseDataPromise=$http({
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
        }
    })

    //新闻类型获取
    var newsTypePromise=$http({
        url:baseUrl+'circle/headline/typelist',
        method:'get',
        params:{
            auth_name:'id',
            id:1,
            tx:'3f556f66353c5945a3633ae209a3e0ff'
        }
    })
    newsTypePromise.then(function (res){
        if(res.data.error==200){
           $scope.newsType=res.data.data;
          $scope.defaultType=$scope.newsType[0].type_id;
        }
    })


    //新闻导航点击
    $scope.newsNav = function (val,idx) {
        loadListData(val);
        $('.news-nav>a').css({
            background:'#f8f8f8',
            color:'#333'
        }).eq(idx).css({
            background:'#00d1b2',
            color:'#fff'
        })

    }

    //列表数据获取
    loadListData($scope.defaultType)

    //获取列表数据公共函数
    function loadListData(type) {
        var listPromise=$http({
            url:baseUrl+'circle/headline/headlinelist',
            method:'get',
            params:{
                grand_id:10,
                auth_name:'id',
                id:1,
                type:type,
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
    $scope.pageChanged = function(type){
        $log.log('Page changed to: ' + $scope.currentPage);
        var args={
            page:$scope.currentPage
        }
        $http({
            url:baseUrl+'circle/headline/headlinelist',
            method:'get',
            params:{
                page:$scope.currentPage,
                grand_id:10,
                auth_name:'id',
                id:1,
                type:type,
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

