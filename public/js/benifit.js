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
    url = window.location.href;
    re = getQueryString(url);
    var pid= re.pid;
    //基础数据获取
    var baseDataPromise=$http({
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
            $scope.category=res.data.data.category;
            $scope.benifitMerchant= res.data.data.merchant;
            $scope.benifitfood= res.data.data.delicacy;
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

    //商家筛选
    $scope.Category= function (category_child,idx) {
        var args={
            cate:category_child
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

    //美食筛选
    $scope.food=function (cate,idx) {
        var args={
            cate:cate
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
    $scope.rank= function (val) {
        var args={
            sort:val
        }
        loadListData(args);
    }

    //来源筛选
    $scope.from= function (val) {
        var args={
            role:val
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
                search:val,
                grand_id:7,
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
    loadListData(7)



    //获取列表数据公共函数
    function loadListData(args) {
        var category_parent=args.category_parent;
        var category_child=args.category_child;
        var type=args.type;
        var search=args.search;
        var sort=args.sort;
        var role=args.role;
        var cate=args.cate;
        var listPromise=$http({
            url:baseUrl+'merchant/shop/privilegelist',
            method:'get',
            params:{
                grand_id:7,
                auth_name:'id',
                id:1,
                lng:123,
                lat:32,
                category_parent:category_parent==undefined?pid:category_parent,
                category_child:category_child==undefined?0:category_child,
                search:search,
                sort:sort,
                role:role,
                cate:cate,
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
    $scope.pageChanged = function(){
        $log.log('Page changed to: ' + $scope.currentPage);
        // $scope.listData = {};
        var args={
            page:$scope.currentPage
        }
        $http({
            url:baseUrl+'merchant/shop/privilegelist',
            method:'get',
            params:{
                page:$scope.currentPage,
                grand_id:7,
                auth_name:'id',
                lng:123,
                lat:32,
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
        url:baseUrl+'merchant/shop/privilegedetail',
        method:'get',
        params:{
            privilege_id:id,
            auth_name:'name',
            name:1,
            user_id:1402,
            tx:'3f556f66353c5945a3633ae209a3e0ff'
        }
    });
    detailPromise.then(function (res) {
        console.log('detail data is :', res);
        if(res.data.error!=200){
            //获取详情出错
        }else{
            $scope.detailData= res.data.data;
            $scope.bigImg='800_600.jpg';
        }
    });


/*附近优惠页面   推荐和评论是不存在的*/

    // 推荐获取
    var recommendPromise=$http({
        url:baseUrl+'newtravel/travel/recommend',
        method:'get',
        params:{
            id:id,
            auth_name:'name',
            name:1,
            tx:'3f556f66353c5945a3633ae209a3e0ff'
        }
    });
    recommendPromise.then(function (res) {
        // console.log('tuijian data is:',res)
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
        url:baseUrl+'newtravel/travel/comments',
        method:'get',
        params:{
            travel_id:id,
            auth_name:'name',
            name:1,
            tx:'3f556f66353c5945a3633ae209a3e0ff'
        }
    });
    detailComment.then(function (res) {
        // console.log('comment is :',res);
        if(res.data.error!=200){
            //获取详情出错
        }else{
            if(res.data.data.length!=0){
                $scope.commentList=res.data.data;
                $scope.havaComment=false;
                $scope.maxSize = 5;
                $scope.currentPage = 1;
                $scope.dtotalItems = Number(res.data.data[0].total_count);
            }else{
                $scope.dtotalItems = 0;
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



