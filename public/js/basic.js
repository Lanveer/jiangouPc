/**
 * Created by Administrator on 2017/11/6.
 */

//测试服务器
baseUrl='http://106.14.56.22:9529/index.php?r=';

//正式服务器
//  baseUrl='http://54.161.25.252/index.php?r=';


//获取参数
function getQueryString(str){
    var ret = {};
    var query = str ? str.substr(str.indexOf('?')) : window.location.search.substr(1);
    query.replace(/(\w+)=(\w+)/ig, function(a, b, c, d,f){
        ret[b] = unescape(c);
    });
    return ret;
}
url = window.location.href;
str =url;
re = getQueryString(str);

//获取

// var detailUrl= baseUrl+'user/shop/seller';
// url = window.location.href;
// str =url;
// re = getQueryString(str);



$(function () {
    //回到顶部函数
    var w=parseInt(($(window).width() -1200)/2 -70);
    $('#toTop').css({
    right:w+'px'
})

//    回到顶部hover事件
    $('.toTop-up').mouseover(function () {
        $(this).css({
            'background-image':'url(../public/imgs/basic/bttt_arrow.png)'
        })
    }).mouseout(function () {
        $(this).css({
            'background-image':'url(../public/imgs/basic/bttt_arrow_gray.png)'
        })
    })

//    二维码hover事件
    $('.toTop-down').mouseover(function () {
        $(this).css({
            'background-image':'url(../public/imgs/basic/bttt_rq.png)'
        });
        $('.toTop-down-erweima').show();
    }).mouseout(function () {
        $(this).css({
            'background-image':'url(../public/imgs/basic/bttt_rq_gray.png)'
        });
        $('.toTop-down-erweima').hide();
    })



//   回到顶部

    $(".toTop-up").click(function(){
        $('body,html').animate({ scrollTop: 0 }, 800)
    });

    ///适当距离出现回到顶部按钮
    $(window).scroll(function(){
        if ($(window).scrollTop()>100){
            $("#toTop").fadeIn(1500);
        }
        else
        {
            $("#toTop").fadeOut(1500);
        }
    });


//    菜单点击事件
    $('.nav-first').click(function (e) {
        return;
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
        }
    })


//    搜索框点击下拉事件
    $('.key>span').click(function () {
        var flag=$('.key-list').is(':hidden');
        if(flag){
            $('.key-list').fadeIn(200);
            $('.key>span').css({
                'background-image':'url(../public/imgs/basic/up.png)'
            })
        }else{
            $('.key-list').fadeOut(200);
            $('.key>span').css({
                'background-image':'url(../public/imgs/basic/down.png)'
            })
        }
    })

    //导航鼠标事件
    $('.nav-list>ul>li').mouseover(function (e) {
        $('.html-nav-detail').show();
        $(this).css({
            background:'#fff'
        })
        $('.sec-item:eq(0)').hide()
        e.preventDefault()
        var idx= $(this).index();
        var idx2=$(this).index()-1
        $('.html-sec').eq(idx).show();
        $('.sec-item').eq(idx2).show();
    }).mouseout(function () {
            $('.html-nav-detail').hide();
        $(this).css({
            background:'#f8f8f8'
        })
        var idx= $(this).index();
            var idx2=$(this).index()-1
            $('.html-sec').eq(idx).hide();
            $('.sec-item').eq(idx2).hide();
    })

//    服务类型筛选条件

    $('.condition-item-box>ul>li').click(function () {
        var idx= $(this).index();
        $('.guide-info').show();

        if($('.condition-item-box>ul>li').length>8){
            if(idx<8){
                console.log('dd');
                $('.guide-info').css({
                    'top':'-43px'
                })
            }else{
                console.log('pp')
            }
        }


        var flag=$('.guide-info>div').eq(idx).is(':hidden');

        if(flag){
            $('.guide-info>div').eq(idx).show();
            $(this).css({
                'background':'url(../public/imgs/basic/up.png) 86px 15px no-repeat #f8f8f8'
            })
        }else{
            $('.guide-info>div').eq(idx).hide();
            $(this).css({
                'background':'url(../public/imgs/basic/down.png) 86px 15px no-repeat '
            })
        }
        $('.guide-info>div').eq(idx).siblings().hide();
        $('.condition-item-box>ul>li').eq(idx).siblings().css({
            'background':'url(../public/imgs/basic/down.png) 86px 15px no-repeat '
        })

    })




//    点击服务类型筛选条件状态
    $('.guide-info div a').click(function (e) {
        e.preventDefault();
        $(this).css({
            background:'#ffa84b',
            color:'#fff'
        }).siblings().css({
            background:'#f8f8f8',
            color:'#333'
        })
    })

//    点击筛选条件变色
    $('.condition-item-box>a').click(function (e) {
        e.preventDefault();
        $(this).css({
            background:'#ffa84b',
            color:'#fff',
            'text-decoration':'none'
        }).siblings().css({
            background:'#fff',
            color:'#333'
        })
    })

//    新闻导航点击变色
    $('.news-nav>a').eq(0).css({
        background:'#00d1b2',
        color:'#fff'
    })
    $('.news-nav>a').click(function (e) {
        e.preventDefault()
        $(this).css({
            background:'#00d1b2',
            color:'#fff'
        }).siblings().css({
            background:'#f8f8f8',
            color:'#333'
        })
    })


//    关于我们等等的导航点击事件
    $('#right>div').eq(0).show();
    $('#left>a').eq(0).css({
        background:'#ffffff',
        color:'#00d1b2'
    })
    $('#left>a').click(function (e) {
        e.preventDefault();
        $(this).css({
            background:'#ffffff',
            color:'#00d1b2'
        }).siblings().css({
            background:'#f8f8f8',
            color:'#666'
        });

        var idx= $(this).index();
        var flag= $('#right>div').eq(idx).is(':hidden');
        $('#right>div').eq(idx).show();
        if(flag){
            $('#right>div').eq(idx).show();
        }else{
            // $('#right>div').eq(idx).hide();
        }
        $('#right>div').eq(idx).siblings().hide();
    })


    //    底部弹出
    $('.adv-btn').click(function () {
        $('.adv').animate({
            left:0
        },120)
        $('.adv-btn').hide();
    })

    $('.hide-detail-right').click(function () {
        $('.adv').animate({
            left:-100+'%'
        },120)
        $('.adv-btn').show();
    })

})


//获取数据公共函数


var myApp = angular.module('myApp',['ui.bootstrap']);
