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
    baseDataPromise.then(function (res) {
        if(res.data.error==200){
            $scope.usedCategory=res.data.data.category[0].child;
            $scope.usedLocation=res.data.data.filtercity;
            $scope.category=res.data.data.category;
            console.log(res)
        }
    })
    //分类筛选开始
    $scope.Category = function (cate_id,idx) {
        var args={
            cate_id:cate_id
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

    //位置筛选开始
    $scope.location = function (city_id,level,idx) {
        var args={
            city_id:city_id,
            level:level
        }
        loadListData(args);
        $('.condition-item-box-location>a').css({
            background:'#fff',
            color:'#333',
        }).eq(parseInt(idx)).css({
            background:'#ffa84b',
            color:'#fff',
            'text-decoration':'none'
        });

        $('.no-limit-location').css({
            background:'#fff',
            color:'#333',
        })
    }

    //排序
    $scope.rank= function (val) {
        switch (val){
            case 0:
                var args={type:0};
                loadListData(args);
                break;
            case 1:
                var args={type:1};
                loadListData(args);
                break;
            case 2:
                var args={type:2};
                loadListData(args);
                break;
            case 3:
                var args={type:3};
                loadListData(args);
                break;
        }
        $('.no-limit-moren').css({
            background:'#fff',
            color:'#333',
        })
    }

    //来源筛选
    $scope.from= function (val) {
        switch (val){

            case 1:
                var args={source:1};
                loadListData(args);
                break;
            case 2:
                var args={source:2};
                loadListData(args);
                break;
            case 3:
                var args={source:3};
                loadListData(args);
                break;
        }
        $('.no-limit-from').css({
            background:'#fff',
            color:'#333',
        })
    }

    //搜索数据列表
    $scope.search= function (val) {
        console.log(val)
        if(val!=undefined && val!=''){
            $scope.searchListFlag=true;
        }else{
            return;
            $scope.searchListFlag=false;

        }
        $http({
            url:baseUrl+'magor/five/fuzzy',
            method:'get',
            params:{
                key:val,
                grand_id:1,
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
    loadListData(1)

    //获取列表数据公共函数
    function loadListData(args) {
        var city_id=args.city_id;
        var level=args.level;
        var cate_id=args.cate_id;
        var type=args.type;
        var source=args.source;
        var search	=args.search;
        var listPromise=$http({
            url:baseUrl+'v2/magor/lists',
            method:'get',
            params:{
                grand_id:1,
                auth_name:'id',
                id:1,
                city_id:city_id,
                level:level,
                cate_id:cate_id,
                type:type,
                source:source,
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
            url:baseUrl+'v2/magor/lists',
            method:'get',
            params:{
                page:$scope.currentPage,
                grand_id:1,
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


myApp.controller('detailController',function ($scope,$http,$log) {
    //    详情页内容
    url = window.location.href;
    re = getQueryString(url);
    var id= re.id;


    var detailPromise=$http({
        url:baseUrl+'magor/five/details',
        method:'get',
        params:{
            id:id,
            grand_id:1,
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
            console.log(res)
           $scope.detailData= res.data.data;
           $scope.bigImg='800_600.jpg';
        }
    });


//    获取当前用户信息
    var userInfoPromise=$http({
        url:baseUrl+'newpersonal/personal/list',
        method:'get',
        params:{
            user_id:1402,
            auth_name:'name',
            name:1,
            tx:'3f556f66353c5945a3633ae209a3e0ff'
        }
    });
    userInfoPromise.then(function (res) {
        if(res.data.error!=200){
            //获取详情出错
        }else{
             if(res.data.data.length!=0){
                 $scope.totalItems=res.data.data.length;
                 $scope.personHavaData=false;
                 if(res.data.data.length>3){
                     // var all=res.data.data;
                     // var showAll=all.slice(0,3);
                     // console.log(showAll)
                     $scope.personList= res.data.data.slice(0,3);
                 }else{
                     $scope.personList=res.data.data;
                 }
                  console.log($scope.personList)
             }else{
                 $scope.personHavaData=true;
             }

        }

    });


//    评论列表
    var detailComment=$http({
        url:baseUrl+'magor/five/comments',
        method:'get',
        params:{
            id:id,
            grand_id:1,
            auth_name:'name',
            name:1,
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
    });

//    分页
    $scope.pageChangedDetail= function () {
        $log.log('Page changed to: ' + $scope.currentPage);
        var detailComment=$http({
            url:baseUrl+'magor/five/comments',
            method:'get',
            params:{
                id:id,
                grand_id:1,
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






