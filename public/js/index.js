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
            image: '../public/imgs/html/test1.png',
            text: 'Image1',
            id: 0
        });
        slides.push({
            image: '../public/imgs/html/test2.png',
            text: 'Image2',
            id: 1
        });
        slides.push({
            image: '../public/imgs/html/test3.png',
            text: 'Image2',
            id: 2
        });
    };

    addSlide();

});



