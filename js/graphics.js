
//그래픽 작품 상세보기(라이트박스)
$(function(){
    const $body = $("body");
    const $mnu = $('header>nav>.gnb>li>a');
    const $works = $("#graphic .works");
    let nowIdx = 0;

    const $aside = $("aside");
    const asideML = parseInt($aside.css("margin-left"));


    //스크롤바 너비 계산
    const scrollBarWidth = function(){

      document.body.style.overflow = 'hidden'; 
      let width = document.body.clientWidth;
      
      document.body.style.overflow = 'scroll'; 
      width -= document.body.clientWidth; 
      
      if(!width) {
         width=document.body.offsetWidth - document.body.clientWidth;
      }
      
      document.body.style.overflow = ''; 

        return width;
    };

    const scrollBarWidthVal = scrollBarWidth();


    //라이트 박스 닫기 함수
    const hideShadow = function(){

        //body 스크롤바 복구
        $body.css({
            "overflow-y":"scroll",
            marginLeft : 0
        });

        //탑버튼 원래위치로 복구
        $aside.css({
            marginLeft : asideML
        });

        $("#graphic .shadow").hide();

    };


    //작품별 클릭이벤트 구문
    $works.find("ul>li").on("click", function(){
        nowIdx = $(this).index();

        //스크롤바 처리
        if($body.css("overflow-y")=="scroll"){
            
            $body.css({
                overflow:"hidden",
                marginLeft : -scrollBarWidthVal/2
            });
            
            //탑버튼 이동
            $aside.css({
                marginLeft : asideML-scrollBarWidthVal/2
            })
        }

        //라이트박스 보기
        $(this).children(".shadow").show();
        $mnu.eq(2).parent().addClass('on').siblings().removeClass('on');
    });


    $works.find("ul>li>a").on('click', function(evt){
        evt.preventDefault();
    });


    $works.find(".detail").on('click', function(evt){
        evt.stopPropagation();
    });


    // 라이트박스 닫기
    $("#graphic .clse").on('click', function(evt){       
        hideShadow();
        evt.stopPropagation();
    });

    //그림자영역 클릭시 닫기
    $("#graphic .shadow").on('click', function(evt){
        hideShadow();
        evt.stopPropagation();
    });


    //ESC키 누르면 닫기
    $(document).on("keyup", function(evt){        
        if(evt.which==27){
            hideShadow();
        }
    });

});
