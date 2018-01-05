/**
 * Created by Administrator on 2017/11/24.
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

//轮播
myApp.controller('CarouselDemoCtrl', function ($scope) {
    $scope.myInterval = 10000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var addSlide = function () {
        slides.push({
            image: '../public/imgs/index/test1.png',
            text: 'Image1',
            id: 0
        });
        slides.push({
            image: '../public/imgs/index/test2.png',
            text: 'Image2',
            id: 1
        });
        slides.push({
            image: '../public/imgs/index/test3.png',
            text: 'Image2',
            id: 2
        });
    };

    addSlide();

});


//获取列表数据
myApp.controller('indexController',function ($scope,$http,$log) {

    //基础数据获取
    var baseDataPromise= $http({
        url:baseUrl+'homepage/home/basedata',
        method:'get',
        params:{
            auth_name:'id',
            id:1,
            tx:'3f556f66353c5945a3633ae209a3e0ff'
        }
    });
    baseDataPromise.then(function (res) {
        if(res.data.error==200){
            console.log('basic resData is:',res);
            $scope.baseData=res.data.data;
            $scope.usedCategory=res.data.data.category[1].child;
            $scope.usedLocation=res.data.data.filtercity;
            $scope.category=res.data.data.category;
            $scope.urls=[
                'used.html',
                'cars.html',
                'job.html',
                'house.html',
                'service.html'
            ];

            $scope.click= function (idx) {
              var u1='6,7,8,9,10,11,12,13';
              var u2='14,15,16,17,18,19,20,';
                if(parseInt(idx)>=6 && parseInt(idx)<=13){
                    window.open('used.html?id='+idx+'')
                }else if(parseInt(idx)>=14 && parseInt(idx)<=27){
                    window.open('cars.html?id='+idx+'')
                }else if(parseInt(idx)>=28 && parseInt(idx)<=39){
                    window.open('job.html?id='+idx+'')
                }else if(parseInt(idx)>=40 && parseInt(idx)<=46){
                    window.open('house.html?id='+idx+'')
                }else if(parseInt(idx)>=47 && parseInt(idx)<=65){
                    window.open('used.html?id='+idx+'')
                }
            };
            //新旧车辆导航
            $scope.carNav=res.data.data.category[1].child.slice(0,9).reverse();
            //工作招聘
            $scope.jobNav=res.data.data.category[2].child.slice(0,9).reverse();
            //房屋租赁导航
            $scope.houseNav=res.data.data.category[3].child.slice(0,9).reverse();
            // 商家服务导航
            $scope.serviceNav=res.data.data.merchant.slice(0,9).reverse();
            //美食导航
            $scope.foodNav=res.data.data.delicacy.slice(0,9).reverse();
            //周边游
            $scope.travelNav=res.data.data.travel.slice(0,9).reverse();
            //附近优惠
            $scope.beniftlNav=res.data.data.privilege.slice(0,9).reverse();
        }
    });

    //导航菜单点击事件
    $scope.change= function (e) {
        $('.nav-list>ul>li').css({
            background:'#f8f8f8'
        }).eq(parseInt(e)).css({
            background:'#fff'
        });
        $('.nav-detail').show();
        $(".sec-item").hide().eq(parseInt(e)).show();
    };
    $('.nav-detail').mouseleave(function () {
        $(this).fadeOut()
    });


    //闲置二手
    var args={
        grand_id:1,
        type:1
    };
    loadListData(args);

    //新旧车辆
    var args={
        grand_id:2,
        type:2
    };
    loadListData(args);

    //工作招聘
    var args={
        grand_id:3,
        type:3
    };
    loadListData(args);

    //房屋租赁
    var args={
        grand_id:4,
        type:4
    };
    loadListData(args);

    //本地服务
    var args={
        grand_id:5,
        type:5
    };
    loadListData(args);

    //美食
    var args={
        grand_id:6,
        type:6
    };
    loadListData(args);

    //附近优惠
    var args={
        grand_id:7,
        type:7
    };
    loadListData(args);

    //周边游
    var args={
        grand_id:8,
        type:8
    };
    loadListData(args);

    //圈子
    var args={
        grand_id:9,
        type:9
    };
    loadListData(args);

    //新闻
    var args={
        grand_id:10,
        type:10
    };
    loadListData(args);



    //公共函数
    function loadListData(args) {
        var grand_id=args.grand_id;
        var type=args.type;
        if(type==1 || type==2 || type==3 || type==4){
            var url=''+baseUrl+''+'v2/magor/lists'
        }else if(type==5){
            var url=''+baseUrl+''+'merchant/shop/list'
        }else if(type==6){
            var url=''+baseUrl+''+'delicacy/food/list'
        }else if(type==7){
            var url=''+baseUrl+''+'merchant/shop/privilegelist'
        }else if(type==8){
            var url=''+baseUrl+''+'newtravel/travel/list'
        }else if(type==9){
            var url=''+baseUrl+''+'circle/circle/circlelist'
        }else if(type==10){
            var url=''+baseUrl+''+'circle/headline/headlinelist'
        }
        var listPromise=$http({
            url:url,
            method:'get',
            params:{
                grand_id:grand_id,
                lng:123,
                lat:32,
                auth_name:'id',
                id:1,
                tx:'3f556f66353c5945a3633ae209a3e0ff'
            }
        });
        listPromise.then(function (res) {
            if(res.data.error!=200){
                //处理异常
            }else{
                $scope.bigImg='800_600.jpg';
                switch (type){
                    case 1:
                        var data=res.data.data;
                        if(data!='' && data.length>4){
                            $scope.usedData=data.slice(0,4);
                        }
                        break;
                    case 2:
                        var data=res.data.data;
                        if(data!='' && data.length>4){
                            $scope.carData=data.slice(0,4);
                        }
                        break;
                    case 3:
                        var data=res.data.data;
                        if(data!='' && data.length>4){
                            $scope.jobData=data.slice(0,8);
                        }
                        break;
                    case 4:
                        var data=res.data.data;
                        if(data!='' && data.length>4){
                            $scope.houseData=data.slice(0,4);
                        }
                        break;
                    case 5:
                        var data=res.data.data;
                        if(data!='' && data.length>4){
                            $scope.serviceData=data.slice(0,4);
                        }
                        break;
                    case 6:
                        var data=res.data.data;
                        if(data!='' && data.length>4){
                            $scope.foodData=data.slice(0,4);
                        }
                        break;
                    case 7:
                        var data=res.data.data;
                        if(data!='' && data.length>8){
                            $scope.benifitData=data.slice(0,8);
                        }
                        break;
                    case 8:
                        var data=res.data.data;
                        if(data!='' && data.length>4){
                            $scope.travelData=data.slice(0,4);
                        }
                        break;
                    case 9:
                        var data=res.data.data;
                        if(data!='' && data.length>5){
                            $scope.circleData=data.slice(0,5);
                        }
                        break;
                    case 10:
                        var data=res.data.data;
                        if(data!='' && data.length>5){
                            $scope.newsData=data.slice(0,5);
                        }
                        break;
                }
            }
        })
    }

    //搜索数据列表
    $scope.search= function (val) {
        console.log(val)
        if(val!='undefined'){
            $scope.searchListFlag=true;
        }else{
            $scope.searchListFlag=false;
        }
        $http({
            url:baseUrl+'magor/five/fuzzy',
            method:'get',
            params:{
                key:val,
                grand_id:2,
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

});

