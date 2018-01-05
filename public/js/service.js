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

    url = window.location.href;
    re = getQueryString(url);
    var parentId= re.pid;
    var childId= re.cid;
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
    baseDataPromise.then(function (res){
        if(res.data.error==200){
            $scope.usedCategory=res.data.data.category[2].child;
            $scope.usedLocation=res.data.data.filtercity;
            $scope.category=res.data.data.category;
            $scope.serviceCategory=res.data.data.merchant;
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
        }
    });
    //展示下拉菜单
    $scope.showMenu= function (val) {
       var flag=  $('#'+val+'').is(':hidden');
       if(flag){
           $('#'+val+'').show();
           $('.s-b[name!='+val+']').hide();
           $('.test[name!='+val+']').css({
               'background':'url(../public/imgs/basic/down.png) 60px 20px no-repeat '
           })
           $('#test'+val+'').css({
               'background':'url(../public/imgs/basic/up.png) 60px 20px no-repeat '
           })
       }else{
           $('#'+val+'').hide();
           $('#test'+val+'').css({
               'background':'url(../public/imgs/basic/down.png) 60px 20px no-repeat '
           });
       }

    }

    //分类筛选
    $scope.Category= function (category_parent,category_child,idx) {
        var args={
            category_parent:category_parent,
            category_child:category_child
        }
        loadListData(args);

        $('.s-b span').css({
            background:'#ccc',
            color:'#333',
        }).eq(idx). css({
            background:'#ffa84b',
            color:'#fff'
        })
        $('.no-limit-cat').css({
            background:'#fff',
            color:'#333',
        })
        console.log('category_parent:',category_parent)
        console.log('category_child:',category_child)
    }

    //距离筛选
    $scope.distance= function (type) {
        var args={
            type:type
        }
        loadListData(args);
    }

    //评分筛选
    $scope.distance= function (type) {
        var args={
            type:type
        }
        loadListData(args);
    }

    //状态筛选
    $scope.status= function (isOpen) {
        var args={
            isOpen:isOpen
        }
        loadListData(args);
    }

    //搜索数据列表
    $scope.search= function (val) {
        if(val!=undefined){
            $scope.searchListFlag=true;
        }else{
            $scope.searchListFlag=false;
        }
        $http({
            url:baseUrl+'magor/five/fuzzy',
            method:'get',
            params:{
                name:val,
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
            name:val
        }
        loadListData(args)
    }

    //点击搜索按钮
    $scope.searchResult= function (val) {
        $scope.searchListFlag=false;
        var args={
            name:val
        }
        loadListData(args)
    }

    //列表数据获取
    loadListData(5);


    //获取列表数据公共函数
    function loadListData(args) {
        var category_parent=args.category_parent;
        var category_child=args.category_child;
        var type=args.type;
        var isOpen=args.isOpen;
        var name=args.name;
        var listPromise=$http({
            url:baseUrl+'merchant/shop/list',
            method:'get',
            params:{
                grand_id:5,
                auth_name:'id',
                id:1,
                category_parent:category_parent==undefined?parentId:category_parent,
                category_child:category_child==undefined? 0 : category_child,
                type:type,
                isOpen:isOpen,
                name:name,
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
            url:baseUrl+'merchant/shop/list',
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
});

myApp.controller('detailController',function ($scope,$http,$log) {
    //    详情页内容
    url = window.location.href;
    re = getQueryString(url);
    var id= re.id;
    var merchant_id= re.merchant_id;


    var detailPromise=$http({
        url:baseUrl+'merchant/shop/shopinfo',
        method:'get',
        params:{
            shop_id:id,
            auth_name:'name',
            name:1,
            user_id:1402,
            tx:'3f556f66353c5945a3633ae209a3e0ff'
        }
    });
    detailPromise.then(function (res) {
        if(res.data.error!=200){
            //获取详情出错
        }else{
            console.log(res);
            $scope.detailData= res.data.data;
            $scope.bigImg='800_600.jpg';
        }
    });


//    获取当前用户信息
    var userInfoPromise=$http({
        url:baseUrl+'merchant/shop/merchant',
        method:'get',
        params:{
            merchant_id:merchant_id,
            auth_name:'name',
            name:1,
            tx:'3f556f66353c5945a3633ae209a3e0ff'
        }
    });
    userInfoPromise.then(function (res) {
     console.log(res)
        if(res.data.error!=200){
            //获取详情出错
        }else{
            console.log(res)
            $scope.person=res.data.data;
        }

    });

 //获取图片信息
    var picturePromise=$http({
        url:baseUrl+'merchant/shop/images',
        method:'get',
        params:{
            shop_id:id,
            auth_name:'name',
            name:1,
            tx:'3f556f66353c5945a3633ae209a3e0ff'
        }
    });
    picturePromise.then(function (res) {
        console.log(res)
        if(res.data.error!=200){
        }else{
            var imgs=res.data.data;
            if(imgs.length>1){
                var imgData=res.data.data;
                imgData.shift();
                $scope.imgs=imgData;
            }else{
            }
        }
    });


 // 门店展示列表
    var storePromise=$http({
        url:baseUrl+'merchant/shop/stores',
        method:'get',
        params:{
            merchant_id:merchant_id,
            auth_name:'name',
            name:1,
            tx:'3f556f66353c5945a3633ae209a3e0ff'
        }
    });
    storePromise.then(function (res) {
        if(res.data.error!=200){
        }else{
            var store= res.data.data;
            if(store.length!=0){
                $scope.store=res.data.data;
                $scope.haveStore=false;
            }else{
                $scope.haveStore=true;
            }
        }
    });


    // 推荐获取
    var recommendPromise=$http({
        url:baseUrl+'merchant/shop/recommend',
        method:'get',
        params:{
            shop_id:id,
            auth_name:'name',
            name:1,
            tx:'3f556f66353c5945a3633ae209a3e0ff'
        }
    });
    recommendPromise.then(function (res) {
        if(res.data.error!=200){
        }else{
            var recommend= res.data.data;
            if(recommend.length!=0){
                $scope.recommend=res.data.data;
                $scope.haveRecommend=false;
            }else{
                $scope.haveRecommend=true;
            }
        }
    });


//    评论列表
    var detailComment=$http({
        url:baseUrl+'merchant/shop/commentlist',
        method:'get',
        params:{
            merchant_id:merchant_id,
            shop_id:id,
            auth_name:'name',
            name:1,
            tx:'3f556f66353c5945a3633ae209a3e0ff'
        }
    });
    detailComment.then(function (res) {
        console.log('comment is :',res)
        if(res.data.error!=200){
            //获取详情出错
        }else{
            if(res.data.data.length!=0){
                $scope.commentList=res.data.data;
                $scope.havaComment=false;
                $scope.maxSize = 5;
                $scope.currentPage = 1;
                $scope.totalItems = Number(res.data.data[0].total_count);
            }else{
                $scope.havaComment=true;
            }
        }
    });


//    分页
    $scope.pageChangedDetail= function () {
        $log.log('Page changed to: ' + $scope.currentPage);
        var detailComment=$http({
            url:baseUrl+'magor/five/comments',
            method:'get',
            params:{
                id:id,
                grand_id:2,
                auth_name:'name',
                name:1,
                page:$scope.currentPage,
                tx:'3f556f66353c5945a3633ae209a3e0ff'
            }
        });
        detailComment.then(function (res) {
            if(res.data.error!=200){
                //获取详情出错
            }else{
                $scope.commentList=res.data.data
                if(res.data.data.length!=0){
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
});






