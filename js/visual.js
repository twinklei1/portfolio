$(function(){
    
    const $visual = $("#main>.visual");
    const $slides = $("#main>.visual>.visual-container>li");
    const $indicator = $("#main>.visual>.visual-pagination>li>a");

    const $btnPrev = $("#main>.visual>.visual-prev");
    const $btnNext = $("#main>.visual>.visual-next");

    const $btnAuto = $("#main>.visual>.visual-auto");//자동재생 버튼

    let intervalID = null;

    let nowIdx = 0;
    let oldIdx = nowIdx;

    let aniChk = false;//true이면 현재 움직이는 중

    let noEventTime = 0;//이벤트가 없는 시간을 체크하는 변수
    
    //10초간격의 시간체크  함수
    const timeCheck = function(){
        setInterval(function(){
            noEventTime++;

           //console.log("noEventTime=",noEventTime);

            if(noEventTime>10 && !$btnAuto.hasClass('pause')){
                $btnAuto.trigger("click");
            }

        },1000);
    }

    //현재 슬라이드가 아닌 모든 슬라이드를 오른쪽으로 이동
    $slides.eq(nowIdx).siblings().css({
        left:"100%",
        display:"block",
        opacity:0
    });


    //이전 인덱스번호 추출
    const prevIdx = function(){
        oldIdx = nowIdx;

        if(nowIdx<1){
            nowIdx = 3
        }else{
            nowIdx--;
        }
    };


    //다음 인덱스번호 추출
    const nextIdx = function(){
        oldIdx = nowIdx;

        if(nowIdx<3){
            nowIdx++;
        }else{
            nowIdx=0;
        }
    };

    
    //인디케이터 활성화표시 함수
    const setIndicator = function(idx){
        $indicator.eq(idx).parent().addClass('on')
                  .siblings().removeClass('on');
    };


    //공지보드 안에 있는 요소를 애니메이트
    const aniBoard = function(idx){

        const $nowSlide = $slides.eq(idx);
        const $board = $nowSlide.find('.board');

        const $bar = $nowSlide.find('.bar');
        const $tit1 = $nowSlide.find('.tit1');
        const $tit2 = $nowSlide.find('.tit2');
        const $strength = $nowSlide.find('.strength');
        const $mind = $nowSlide.find('.mind');

        $board.fadeIn(250, function(){
            $tit1.stop().animate({left:0,opacity:1});
            $tit2.delay(300).stop().animate({left:0,opacity:1});
            $strength.delay(600).stop().animate({left:0,opacity:1});
            $mind.delay(900).stop().animate({left:0,opacity:1});
            $bar.delay(1200).stop().animate({top:-25,opacity:1},function(){
                aniChk=false;
            });
        });


    };


    //공지보드 안에 있는 요소를 애니메이트 준비상태로 세팅
    const resetBoard = function(idx){

        const $nowSlide = $slides.eq(idx);
        const $board = $nowSlide.find('.board');

        const $bar = $nowSlide.find('.bar');
        const $tit1 = $nowSlide.find('.tit1');
        const $tit2 = $nowSlide.find('.tit2');
        const $strength = $nowSlide.find('.strength');
        const $mind = $nowSlide.find('.mind');

        $board.hide();
        $tit1.css({left:-50,opacity:0});
        $tit2.css({left:50,opacity:0});
        $strength.css({left:50,opacity:0});
        $mind.css({left:-50,opacity:0});
        $bar.css({top:-50,opacity:0});
    };


    //슬라이드 이동함수
    const moveSlide = function(){

        aniChk = true;
        resetBoard(nowIdx);

        $slides.eq(oldIdx).stop().animate({
            opacity:0
        },1500,function(){
            $slides.eq(oldIdx).css({
                left:"100%"
            });
        });

        $slides.eq(nowIdx).stop().animate({
            left:0,
            opacity:1
        },1000, function(){
            aniBoard(nowIdx);
        });

        setIndicator(nowIdx);//인디케이터 활성화표시 함수 호출
    };


    //자동재생 함수
    const autoPlay = function(){
        $btnAuto.addClass('pause').text("재생정지");
        intervalID = setInterval(function(){
            if(!aniChk){
                nextIdx();
                moveSlide();
            }
        },5000);
    };


    const autoStop = function(){
        clearInterval(intervalID);
        $btnAuto.removeClass('pause').text("자동재생");
    };


    //슬라이드 영역전체에 대한 이벤트 구문
    $visual.on("mouseenter mousemove", function(){
        autoStop();//자동재생 상태변환 함수 호출
        noEventTime = 0;//이벤트 시간체크 변수 초기화   
    });//


    //자동재생 버튼에 대한 이벤트
    $btnAuto.on('click', function(evt){
        evt.preventDefault();
        noEventTime = 0;//이벤트 시간체크 변수 초기화

        if($(this).hasClass('pause')){//재생중 상태
            autoStop();//재생멈춤  
        }else{
            autoPlay();
            $visual.unbind('mousemove');
        }
    });

    
    //인디케이터에 대한 이벤트
    $indicator.on('click', function(evt){
        evt.preventDefault();
        
        noEventTime = 0;//이벤트 시간체크 변수 초기화   
        const temIdx = $indicator.index(this);

        //!aniChek 와 같음
        if(temIdx!=nowIdx && aniChk==false){
            
            autoStop();
            
            oldIdx = nowIdx;
            nowIdx = temIdx;
    
            if(oldIdx > nowIdx){
                $slides.eq(nowIdx).css({left:"-100%"});
            }
            
            moveSlide();
        }

    });


    //이전버튼에 대한 이벤트
    $btnPrev.on('click', function(evt){
        evt.preventDefault();
        noEventTime = 0;//이벤트 시간체크 변수 초기화   

        if(!aniChk){    
            autoStop();

            prevIdx();
    
            if(oldIdx > nowIdx){
                $slides.eq(nowIdx).css({left:"-100%"});
            }
    
            if(oldIdx==0 && nowIdx==3){
                $slides.eq(nowIdx).css({left:"-100%"});
            }        
    
            moveSlide();
        }
    });


    //다음버튼에 대한 이벤트
    $btnNext.on('click', function(evt){
        evt.preventDefault();
        noEventTime = 0;//이벤트 시간체크 변수 초기화   

        if(!aniChk){
            autoStop();

            nextIdx();
    
            if(oldIdx==3 && nowIdx==0){
                $slides.eq(nowIdx).css({
                    left:"100%"
                });
            }
    
            moveSlide();
        }
    });   
    
    
    $(window).on('load', function(){
        autoPlay();//자동재생 함수호출
        timeCheck();//10초 간격의 시간체크기
    });
});