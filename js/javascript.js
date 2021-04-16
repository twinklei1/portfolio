
$(function(){
    new WOW().init()
});

$(function(){
    const $mnu = $('header>nav>.gnb>li>a');//메뉴셀렉팅
    let nowIdx = 0;

    let arrSectionTop = [];//각 아티클요소의 top 값을 저장
    
    for(let i=0;i<4;i++){
        arrSectionTop[i] = $('#main~section').eq(i).offset().top;
    }
    console.log(arrSectionTop);

    //메뉴에 대한 클릭이벤트 구문
    $mnu.on('click', function(evt){
        evt.preventDefault();

        nowIdx = $mnu.index(this);

        $('html, body').stop().animate({
            scrollTop : arrSectionTop[nowIdx]-69
        });
    });

    //scrollTop 값에 따른 메뉴활성화
    $(window).on('scroll', function(){
        //현재 스크롤바의 top값을 변수에 저장
        let scrollTop = $(window).scrollTop();

        for(let k=0;k<4;k++){
            if(scrollTop>=arrSectionTop[k]-200){//69
                $mnu.eq(k).parent().addClass('on').siblings().removeClass('on');
            }else if(scrollTop<arrSectionTop[0]-69){
                $mnu.parent().removeClass('on')
            }
        }
    
       let view = (scrollTop+$(window).height())-$('footer').offset().top
    
       if(view>0){//푸터가 화면에 노출된 상태
           $('aside').css({marginBottom:view});
       }else{
           $('aside').css({marginBottom:0});
       }
    });

    //로고에 대한 클릭이벤트
    $('.logo>a, aside').on('click', function(evt){
        evt.preventDefault();
        $mnu.parent().removeClass('on');
        //애니메이트
        $('html, body').stop().animate({
            scrollTop : 0
        });
    });
    //window에 대한 load클릭이벤트
    $(window).on('load', function(){
        //trigger로 .logo>a 를 click 한다.
        //이벤트 강제발생
        $('.logo>a').trigger('click');

    });
});

$(function(){

    const $slides = $("#aboutme>.about-container>.visual>div");
    const $tit = $slides.find("h3");
    const $desc = $tit.next();
    let nowIdx = 0;

    $slides.on('mouseenter', function(){
        nowIdx = $slides.index(this);

        $tit.eq(nowIdx).css({top:300,opacity:0}).stop().animate({
            top:360,opacity:1
        },400,"easeInOutCubic");

        $desc.eq(nowIdx).css({top:470,opacity:0}).stop().animate({
            top:420,opacity:1
        },400,"easeInOutCubic");
    });
});


// 웹포폴 슬라이드
$(function(){
    const $pofolPrev = $('#webpofol>.slide>.pofol-prev');
    const $pofolNext = $('#webpofol>.slide>.pofol-next');
    const $pofolSlide = $('#webpofol>.slide>.slide-container>li');
    nowIdx = 0;
    oldIdx = nowIdx;

    $pofolNext.on('click', function(evt){
        evt.preventDefault();

        if(nowIdx<2){
            nowIdx++;
        }else{
            nowIdx=0;
        }

        oldIdx = nowIdx;

        $pofolSlide.eq(oldIdx).stop().fadeOut(1000);
        $pofolSlide.eq(nowIdx).stop().fadeIn(1000).siblings().hide();
    });

    $pofolPrev.on('click', function(evt){
        evt.preventDefault();

        if(nowIdx>0){
            nowIdx--;
        }else{
            nowIdx=2;
        }

        oldIdx = nowIdx;

        $pofolSlide.eq(oldIdx).stop().fadeOut(1000);
        $pofolSlide.eq(nowIdx).stop().fadeIn(1000).siblings().hide();
    });
});




