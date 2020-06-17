import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import testData from './data';
import Velocity from 'velocity-animate';
import $ from 'jquery';
import { ReactComponent as Q1svg } from './img/quest/Q1svg.svg';
import { ReactComponent as Q2svg } from './img/quest/Q2svg.svg';
import { ReactComponent as Q3svg } from './img/quest/Q3svg.svg';
import { ReactComponent as Q4svg } from './img/quest/Q4svg.svg';
import { ReactComponent as Q5svg } from './img/quest/Q5svg.svg';
import { ReactComponent as Q6svg } from './img/quest/Q6svg.svg';
import { ReactComponent as SvgQ7 } from './img/quest/quest7/MHW_Q7.svg';
import { ReactComponent as Q8svg } from './img/quest/Q8svg.svg';
import { ReactComponent as Q9svg } from './img/quest/Q9svg.svg';
import { ReactComponent as Q10svg } from './img/quest/Q10svg.svg';
import { ReactComponent as EnterBG } from './img/enterBG.svg';
import { ReactComponent as LoadingSvg } from './img/loading.svg';
import card1 from './img/card/card1.png';
import card2 from './img/card/card2.png';
import card3 from './img/card/card3.png';
import card4 from './img/card/card4.png';
import card5 from './img/card/card5.png';
import card6 from './img/card/card6.png';
import card7 from './img/card/card7.png';
import card8 from './img/card/card8.png';
import card9 from './img/card/card9.png';
import card10 from './img/card/card10.png';
import card11 from './img/card/card11.png';
import card12 from './img/card/card12.png';
import card13 from './img/card/card13.png';
import card14 from './img/card/card14.png';
import card15 from './img/card/card15.png';
import card16 from './img/card/card16.png';
import card17 from './img/card/card17.png';
import card18 from './img/card/card18.png';
import card19 from './img/card/card19.png';
import card20 from './img/card/card20.png';
import card21 from './img/card/card21.png';
import card22 from './img/card/card22.png';
import card23 from './img/card/card23.png';
import card24 from './img/card/card24.png';
import card25 from './img/card/card25.png';
import card26 from './img/card/card26.png';
import card27 from './img/card/card27.png';
import cardBack from './img/card/cardBack.png';

let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

$(window).resize(()=>{
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
})
let cardRowForRandom = [
    card1,card2,card3,card4,card5,
    card6,card7,card8,card9,card10,
    card11,card12,card13,card14,card15,
    card16,card17,card18,card19,card20,
    card21,card22,card23,card24,card25,
    card26,card27
];

var justforUQ8 = 1;
var justforUQ9 = 1;
var justforUQ10 = 1;
var justforUQ3 = 1;
var Q10S;//給Q10判斷使用
var Q10Q;//給Q10判斷使用

var questNumber = 10;
var weaponNumber = 27;

const mydata = testData;//承接GoogleSheet的資料
let quest = {};
for (var x = 1; x < questNumber+1; x++) {//生成quest的物件 10題共20個
quest['A'+x] = [];
quest['B'+x] = [];
quest['AnsA'+x] = [];
quest['AnsB'+x] = [];
quest['Q'+x] = [];
quest['F'+x] = [];

mydata.feed.entry.forEach(function(item, index, array){    
    if(item.gs$cell.row ==x*2 && item.gs$cell.col >3){//選出答案A分數的資料
        quest['A'+x].push(item.gs$cell.$t);
    }
    if(item.gs$cell.row ==x*2+1 && item.gs$cell.col >3){//選出答案B分數的資料
        quest['B'+x].push(item.gs$cell.$t);
    }
    if(item.gs$cell.row ==x*2 && item.gs$cell.col ==3){//選出答案A的資料
        quest['AnsA'+x].push(item.gs$cell.$t);
    }
    if(item.gs$cell.row ==x*2+1 && item.gs$cell.col ==3){//選出答案B的資料
        quest['AnsB'+x].push(item.gs$cell.$t);
    }
    if(item.gs$cell.row ==x*2 && item.gs$cell.col ==1){//選出問題
        quest['Q'+x].push(item.gs$cell.$t);
    }
    if(item.gs$cell.row ==x*2 && item.gs$cell.col ==2){//選出題目的倍率
        quest['F'+x].push(item.gs$cell.$t);
    }

});
}
for (var x = 1; x < weaponNumber+1; x++) {
    quest['N'+x] = [];
    quest['E'+x] = [];
    mydata.feed.entry.forEach(function(item, index, array){
        if(item.gs$cell.row ==1 && item.gs$cell.col ==x+3){//挑出武器名
            quest['N'+x].push(item.gs$cell.$t);
        }
        if(item.gs$cell.row ==22 && item.gs$cell.col ==x+3){//挑出武器的說明內容
            quest['E'+x].push(item.gs$cell.$t);
        }
    });

}
class Quest1 extends React.Component{
    constructor(props){
    super(props);
    }
    componentDidMount(){
        //all ans mouseClick animate function
        function ansClickAnimate(ans,notAns,during){
            Velocity($('.title'),{'opacity': 0},{duration: 0});
            Velocity($(ans+'text'),{'opacity': 0},{duration: 0})
            Velocity($(notAns+'text'),{'opacity': 0},{duration: 200});
            Velocity($(ans+'cover'),{top:"-100%",backgroundColor:'#7DCCC4'},{
                duration:during,
                complete:function(){
                    $(ans+'cover').css("top","100%");
                    Velocity($('.title'),{'opacity': 1},{duration: 200});
                    Velocity($(ans+'text'),{'opacity': 1},{duration: 100});
                    Velocity($(notAns+'text'),{'opacity': 1},{duration: 100});
                }
            });       
        };
        //ans1 mouseClick animation
        $('.ans1').click(function() {
            let QuestInnerWidth = window.innerWidth;
            if(QuestInnerWidth<1025){
                ansClickAnimate('.ans1','.ans2',1500);
            }else{
                ansClickAnimate('.ans1','.ans2',550);
            }
            
            });
        //ans2 mouseClick animation
        $('.ans2').click(function() {
            let QuestInnerWidth = window.innerWidth;
            if(QuestInnerWidth<1025){
                ansClickAnimate('.ans2','.ans1',1500);
            }else{
                ansClickAnimate('.ans2','.ans1',550);
            }
            });
        //取消手機板的hover色
        if(window.innerWidth<1025){
            $('.ans1').css('backgroundColor','transparent');
            $('.ans1').css('border','2px solid #7DCCC4');
            $('.ans1').css('boxShadow','3px 3px #7DCCC4');
            $('.ans2').css('backgroundColor','transparent');
            $('.ans2').css('border','2px solid #7DCCC4');
            $('.ans2').css('boxShadow','3px 3px #7DCCC4');
        }

        $(window).resize(function(){
            if(window.innerWidth>window.innerHeight && window.innerWidth<800){
                Velocity.hook($('.test'), 'flex-grow','1');
            }else{
                Velocity.hook($('.test'), 'flex-grow','0.65');
            }
        })


        //Q1 ans1 mouse enter animation
        $('.ans1').mouseenter(function() {
            Velocity($('#questionMark'),{'opacity': 0},{duration:100});
            Velocity($('#route1'),{'stroke-dashoffset': 0},600);
            Velocity($('#arrow'),{'opacity': 1},{duration:100,delay:200});
          }).mouseleave(function() {
              Velocity($('#route1'),"stop");
              Velocity($('#arrow'),"stop");
              Velocity($('#arrow'),{'opacity': 0},{duration: 10});
              Velocity($('#route1'),"reverse",{duration: 10})
          });
        //Q1 ans2 mouse enter animation
        $('.ans2').mouseenter(function() {
            Velocity($('#questionMark'),{'opacity': 0},{duration:100});
            Velocity($('#route2'),{'stroke-dashoffset': 0},{duration: 2000,easing:[0.42, 0, 0.58, 1.0]});
            Velocity($('#Q1a'),{'opacity': 1},{duration: 500});
            Velocity($('#Q1b'),{'opacity': 1},{duration: 500,delay:100});
            Velocity($('#Q1c'),{'opacity': 1},{duration: 100,delay:200});
            Velocity($('#Q1d'),{'opacity': 1},{duration: 100,delay:250});
            Velocity($('#Q1e'),{'opacity': 1},{duration: 100,delay:320});
            Velocity($('#Q1f'),{'opacity': 1},{duration: 100,delay:400});
            Velocity($('#arrow'),{'opacity': 1},{duration:100,delay:500});
        }).mouseleave(function() {
            Velocity($('#slow g'),"stop");
            Velocity($('#slow circle'),"stop");
            Velocity($('#route2'),"stop");
            Velocity($('#arrow'),"stop");
            Velocity($('#arrow'),{'opacity': 0},{duration: 10});
            Velocity($('#route2'),"reverse",{duration: 10})
            Velocity($('#slow g'),"reverse",{duration: 10})
            Velocity($('#slow circle'),"reverse",{duration: 10})
        });
    }
    render(){
        return(            
            <div className='questAnimate'>
                <Q1svg />
            </div>
        )
    }
}

class Quest2 extends React.Component{
    constructor(props){
    super(props);
    }
    componentDidMount(){
        function Q2BGgo(Q2BGfristname,Q2BGcount,Q2BGfactor){
            for (let i = 0; i < Q2BGcount; i++) {
                let Q2i = i+1;
                Velocity($(Q2BGfristname+Q2i),{'opacity': 1},{duration: 300,delay:Q2i*Q2BGfactor-Q2i*50});      
            }
        }
        function Q2BGstop(Q2BGfristname,Q2BGcount){
            for (let i = 0; i < Q2BGcount; i++) {
                let Q2i = i+1;
                Velocity($(Q2BGfristname+Q2i),'stop');      
                Velocity($(Q2BGfristname+Q2i),{'opacity': 0},{duration: 0});
            }
            
        }
        function Q2damageIn(){
            Velocity($('#Q2damage'),{opacity:1 },{duration: 100});
            Velocity($('#Q2D1'),{translateY:30 },{duration: 400,easing:'spring'});
            Velocity($('#Q2D2'),{translateY:30 },{duration: 450,easing:'spring',delay:50});
            Velocity($('#Q2D3'),{translateY:30 },{duration: 550,easing:'spring'});
            Velocity($('#Q2D4'),{translateY:30 },{duration: 400,easing:'spring',delay:50});
        }
        
        function Q2damageOut(){
            $('#Q2damage').css('opacity',0);
            Velocity($('#Q2damage'),'stop');
            Velocity($('#Q2D1'),'stop');
            Velocity($('#Q2D2'),'stop');
            Velocity($('#Q2D3'),'stop');
            Velocity($('#Q2D4'),'stop');
            Velocity($('#Q2D1'),{translateY:0 },0);
            Velocity($('#Q2D2'),{translateY:0 },0);
            Velocity($('#Q2D3'),{translateY:0 },0);
            Velocity($('#Q2D4'),{translateY:0 },0);
        }

        function Q2HealIn(){
            Velocity($('#Q2heal1'),{"stroke-dashoffset":0 },{duration: 300});
            Velocity($('#Q2heal2'),{"stroke-dashoffset":0 },{duration: 300});
        }
        function Q2HealOut(){
            Velocity($('#Q2heal1'),'stop');
            Velocity($('#Q2heal2'),'stop');
            Velocity($('#Q2heal1'),{"stroke-dashoffset":300 },{duration: 0});
            Velocity($('#Q2heal2'),{"stroke-dashoffset":300 },{duration: 0});
        }

        if($('.ans2').css('backgroundColor')=="rgb(131, 183, 121)"){
            Q2BGstop('#BD',7);
            Q2damageOut();
            Q2BGgo('#HB',4,100);
            Q2BGgo('#HA',6,140);
            Q2BGgo('#HC',6,160);
            Q2HealIn();
        }else if($('.ans1').css('backgroundColor')=="rgb(131, 183, 121)"){
            Q2BGstop('#HB',4);
            Q2BGstop('#HA',6);
            Q2BGstop('#HC',6);
            Q2BGgo('#BD',7,100);
            Q2damageIn();
            Q2HealOut();
        }

        $('.ans1').click(function(){
            Q2BGstop('#HB',4);
            Q2BGstop('#HA',6);
            Q2BGstop('#HC',6);
            Q2BGgo('#BD',7,100);
            Q2damageIn();
            Q2HealOut();
        })
        $('.ans2').click(function(){
            Q2BGstop('#BD',7);
            Q2damageOut();
            Q2BGgo('#HB',4,100);
            Q2BGgo('#HA',6,140);
            Q2BGgo('#HC',6,160);
            Q2HealIn();
        })


        $('.ans2').mouseenter(function() {
            Q2BGstop('#BD',7);
            Q2damageOut();
            Q2BGgo('#HB',4,100);
            Q2BGgo('#HA',6,140);
            Q2BGgo('#HC',6,160);
            Q2HealIn();
        })
        $('.ans1').mouseenter(function() {
            Q2BGstop('#HB',4);
            Q2BGstop('#HA',6);
            Q2BGstop('#HC',6);
            Q2BGgo('#BD',7,100);
            Q2damageIn();
            Q2HealOut();
        })
    }
    render(){
        return(
            <div className='questAnimate'>
                <Q2svg />
            </div>
        );
    }
}

class Quest3 extends React.Component{
    constructor(props){
    super(props);
    }
    componentDidMount(){
        let Q3i1 = 0;
        function Q3far(){
            Velocity($('#Q3hunter'),"stop");
            Velocity($('#Q3right'),"stop");
            Velocity($('#Q3D'),"stop");
            Velocity($('#Q3Sward'),"stop");
            Velocity($('#Q3Bow'),"stop");
            //stop end
            Velocity($('#Q3hunter'),{translateX: 0},{duration: 800});
            Velocity($('#Q3Bow'),{translateX: 0},{duration: 800});
            Velocity($('#Q3right'),{translateX: 0},{duration: 800});
            Velocity($('#Q3Sward'),{translateX: 0},{duration: 800});
            Velocity($('#Q3D'),{x2:577.5 },{duration: 800});
            Velocity($('#Q3Sward'),{"stroke-dashoffset":250 },{duration: 400,queue: false});
            Velocity($('#Q3Sward'),{translateY:-10 },{duration: 800,queue: false});
            Velocity($('#Q3Bow'),{"opacity":1 },{duration: 400,queue: false});
            //hand move
            if(Q3i1 == 1 && justforUQ3==1){
            $('.Q3playFar .Q3moveHand-far')[0].beginElement();
            $('.Q3play').removeClass('Q3playFar');
            $('.Q3play').addClass('Q3playClose');
            Q3i1=0;
            }
            
        }
        function Q3close(){
            Velocity($('#Q3hunter'),"stop");
            Velocity($('#Q3right'),"stop");
            Velocity($('#Q3D'),"stop");
            Velocity($('#Q3Sward'),"stop");
            Velocity($('#Q3Bow'),"stop");
            //stop end
            Velocity($('#Q3hunter'),{translateX: -250},{duration: 800});
            Velocity($('#Q3right'),{translateX: -250},{duration: 800});
            Velocity($('#Q3Bow'),{translateX: -250},{duration: 800});
            Velocity($('#Q3Sward'),{translateX: -250},{duration: 800});
            Velocity($('#Q3D'),{x2:327.5},{duration: 800});
            Velocity($('#Q3Sward'),{"stroke-dashoffset":0 },{duration: 800,queue: false});
            Velocity($('#Q3Sward'),{translateY:0 },{duration: 800,queue: false});
            Velocity($('#Q3Bow'),{"opacity":0 },{duration: 400,queue: false});
            //hand move
            if(Q3i1 == 0 && justforUQ3==1){
            $('.Q3playClose .Q3moveHand-close')[0].beginElement();
            $('.Q3play').removeClass('Q3playClose');
            $('.Q3play').addClass('Q3playFar');
            Q3i1=1;
            }
        }

        if($('.ans2').css('backgroundColor')=="rgb(131, 183, 121)"){
            Q3close();
        }else if($('.ans1').css('backgroundColor')=="rgb(131, 183, 121)"){
            Q3far();
        }

        $('.ans1').click(function(){
            Q3far();
        })
        $('.ans2').click(function(){
            Q3close();
        })

        $('.ans1').mouseenter(function() {
            Q3far();
        })
        $('.ans2').mouseenter(function() {
            Q3close();
        })
    }
    render(){
        return(
            <div className='questAnimate'>
                <Q3svg />
            </div>
        )
    }

}

class Quest4 extends React.Component{
    componentDidMount(){
        Velocity.hook($('#Q4HandGroup'), "transformOriginX",'398px');
        Velocity.hook($('#Q4HandGroup'), "transformOriginY",'100px');
        Velocity.hook($('#Q4Telescope'), "transformOriginX",'316px');
        Velocity.hook($('#Q4Telescope'), "transformOriginY",'86px');
        Velocity.hook($('#Q4Frog'), "transformOriginX",'50%');
        Velocity.hook($('#Q4Frog'), "transformOriginY",'100%');
        Velocity.hook($('#Q4FrogGroup'), "translateY",'150px');
        Velocity.hook($('#Q4FrogGroup'), "opacity",'0');
        Velocity.hook($('#Q4Sward'), "translateY",'2px');
        function Q4blind(){
            //tele stop
            Velocity($('#Q4Telescope'),'stop');
            Velocity($('#Q4TelescopeGroup'),'stop');
            Velocity($('#Q4HandGroup'),'stop');
            Velocity($('#Q4EyeMask'),'stop');
            //tele return
            Velocity($('#Q4Telescope'),{rotateZ:0},{duration: 0});
            Velocity($('#Q4TelescopeGroup'),{"stroke-dashoffset":250 },{duration: 0});
            //Blind start
            Velocity($('#Q4HandGroup'),{rotateZ:0},{duration: 800});
            Velocity($('#Q4Sward'),{"stroke-dashoffset":0 },{duration: 400,delay:500});
            Velocity($('#Q4FrogGroup'),{translateY:0,opacity:1},{duration: 400,easing:[150,20]});
            Velocity($('#Q4Frog'),{scaleY:1.1},{duration: 200,delay:100,
                complete:function(){
                    Velocity($('#Q4Frog'),{scaleY:1},{duration: 200})
                }
            });
            Velocity($('#Q4EyeMask'),{opacity:1},{duration: 400});
        }
        function Q4telescope(){
            //blind stop
            Velocity($('#Q4EyeMask'),'stop');
            Velocity($('#Q4Frog'),'stop');
            Velocity($('#Q4FrogGroup'),'stop');
            Velocity($('#Q4Sward'),'stop');
            Velocity($('#Q4HandGroup'),'stop');

            // blind return
            Velocity($('#Q4HandGroup'),{rotateZ:60},{duration: 800});
            Velocity($('#Q4Sward'),{"stroke-dashoffset":250 },{duration: 100});
            Velocity($('#Q4FrogGroup'),{translateY:150,opacity:0},{duration: 200});
            //tele start
            Velocity($('#Q4TelescopeGroup'),{"stroke-dashoffset":0 },{duration: 400});
            Velocity($('#Q4Telescope'),{rotateZ:8},{duration: 400});
            Velocity($('#Q4EyeMask'),{opacity:0},{duration: 200});
        }
        if($('.ans1').css('backgroundColor')=="rgb(131, 183, 121)"){
            Q4telescope();
        }else if($('.ans2').css('backgroundColor')=="rgb(131, 183, 121)"){
            Q4blind();
        }
        //click
        $('.ans1').click(function(){
            Q4telescope();
        })
        $('.ans2').click(function(){
            Q4blind();
        })
        //for hover
        $('.ans1').mouseenter(function() {
            Q4telescope();
        })
        $('.ans2').mouseenter(function() {
            Q4blind();
        })
    }
    render(){
        return(
            <div className='questAnimate'>
                <Q4svg />
            </div>
        );
    }
}

class Quest5 extends React.Component{
    componentDidMount(){
        //set function
        function Q5SwardSet(){
            Velocity.hook($('#Q5s1'), "translateY",'-20px');
            Velocity.hook($('#Q5s1'), "translateX",'-20px');
            Velocity.hook($('#Q5s2'), "translateY",'-20px');
            Velocity.hook($('#Q5s2'), "translateX",'20px');
            Velocity.hook($('#Q5s3'), "translateY",'-20px');
            Velocity.hook($('#Q5s3'), "translateX",'20px');
            Velocity.hook($('#Q5s4'), "translateY",'-20px');
            Velocity.hook($('#Q5s4'), "translateX",'-20px');
            Velocity.hook($('#Q5s1'),"stroke-dashoffset", `400`);
            Velocity.hook($('#Q5s2'),"stroke-dashoffset", `400`);
            Velocity.hook($('#Q5s3'),"stroke-dashoffset", `400`);
            Velocity.hook($('#Q5s4'),"stroke-dashoffset", `400`);
        }
        Q5SwardSet();
        //reuse function
        function Q5SwardReuse(Q5name,Q5delay,Q5count,Q5duration){
            Velocity($('#Q5s'+Q5name),{"stroke-dashoffset":Q5count},{duration: Q5duration});
            Velocity($('#Q5s'+Q5name),{translateX:0},{duration: Q5duration,queue:false,easing:[200,20],delay:Q5delay});
            Velocity($('#Q5s'+Q5name),{translateY:0},{duration: Q5duration,queue:false,easing:[200,20],delay:Q5delay});
        }
        function Q5stop(){
            Velocity($('#Q5s1'),"stop");
            Velocity($('#Q5s2'),"stop");
            Velocity($('#Q5s3'),"stop");
            Velocity($('#Q5s4'),"stop");
        }
        //start
        if($('.ans1').css('backgroundColor')=="rgb(131, 183, 121)"){
            Q5SwardReuse(2,0,0,400);
        }else if($('.ans2').css('backgroundColor')=="rgb(131, 183, 121)"){
            Q5SwardReuse(1,0,0,250);
            Q5SwardReuse(2,100,0,320);
            Q5SwardReuse(3,80,0,300);
            Q5SwardReuse(4,50,0,420);
        }
        //hover

        $('.ans1').click(function(){
            Q5stop();
            Q5SwardSet();
            Q5SwardReuse(2,0,0,400);
        })
        $('.ans2').click(function(){
            Q5stop();
            Q5SwardSet();
            Q5SwardReuse(1,0,0,250);
            Q5SwardReuse(2,100,0,320);
            Q5SwardReuse(3,80,0,300);
            Q5SwardReuse(4,50,0,420);
        })

        $('.ans1').mouseenter(function() {
            Q5stop();
            Q5SwardSet();
            Q5SwardReuse(2,0,0,400);
        })
        $('.ans2').mouseenter(function() {
            Q5stop();
            Q5SwardSet();
            Q5SwardReuse(1,0,0,250);
            Q5SwardReuse(2,100,0,320);
            Q5SwardReuse(3,80,0,300);
            Q5SwardReuse(4,50,0,420);
        })

        

    }
    render(){
        return(
            <div className='questAnimate'>
                <Q5svg />
            </div>
        )
    }
}

class Quest6 extends React.Component{
    componentDidMount(){
        let Q6i=0;
        let Q6choose=0;
        Velocity.hook($('#Q6hand'), "transformOriginX",'394.5px');
        Velocity.hook($('#Q6hand'), "transformOriginY",'95.5px');
        Velocity.hook($('#Q6can1A'), "transformOriginX",'345px');
        Velocity.hook($('#Q6can1A'), "transformOriginY",'97px');
        Velocity.hook($('#Q6can1B'), "transformOriginX",'345px');
        Velocity.hook($('#Q6can1B'), "transformOriginY",'124px');
        Velocity.hook($('#Q6effect1'), "transformOriginX",'238px');
        Velocity.hook($('#Q6effect1'), "transformOriginY",'108px');
        Velocity.hook($('#Q6effect2'), "transformOriginX",'238px');
        Velocity.hook($('#Q6effect2'), "transformOriginY",'108px');
        //set function
        function Q6quickSet(){
            Velocity($('#Q6hand'),'stop');
            Velocity($('#Q6spear'),'stop');
            Velocity($('#Q6effect2'),'stop');
            Velocity($('#Q6effect1'),'stop');
            Velocity($('#Q6spear'),{opacity:0},{duration:0});
            Velocity($('#Q6hand'),{rotateZ:0},{duration:0});
            Velocity($('#Q6effect1'),{scaleY:1,"stroke-dashoffset":40},{duration:0});
            Velocity($('#Q6effect2'),{scaleY:1,"stroke-dashoffset":40},{duration:0});
        }
       function Q6slowSet(){
        Velocity($('#Q6hand'),'stop');
        Velocity($('#Q6can1'),'stop');
        Velocity($('#Q6can2'),'stop');
        Velocity($('#Q6can3'),'stop');
        Velocity($('#Q6can4'),'stop');
        // Velocity($('#Q6rain'),'stop');
        Velocity($('#Q6can1A'),'stop');
        Velocity($('#Q6can1B'),'stop');
        Velocity($('.Q6can1C'),'stop');
        Velocity.hook($('#Q6can1'), "opacity",'0');
        Velocity.hook($('#Q6can2'), "opacity",'0');
        Velocity.hook($('#Q6can3'), "opacity",'0');
        Velocity.hook($('#Q6can4'), "opacity",'0');
        Velocity.hook($('#Q6rain'), "translateY",'-20px');
        Velocity($('#Q6hand'),{rotateZ:0},{duration:0});
        Velocity($('#Q6can1B'),{scaleY:0},{duration:0});
        Velocity($('#Q6can1A'),{scaleY:0},{duration:0});
        Velocity($('#Q6can1B'),{fill:'#CCCCCC'},{duration:0});
        Velocity($('.Q6can1C'),{stroke:'#CCCCCC'},{duration:0});
        Velocity($('#Q6effect1'),{scaleY:1,"stroke-dashoffset":40},{duration:0});
        Velocity($('#Q6effect2'),{scaleY:1,"stroke-dashoffset":40},{duration:0});

        }
        //slow and quick function
       function Q6slow(){
        Velocity($('#Q6hand'),{rotateZ:70},{duration:600});
        Velocity($('#Q6can1'),{opacity:1},{duration:500,delay:200});
        Velocity($('#Q6can2'),{opacity:1},{duration:500,delay:150});
        Velocity($('#Q6can3'),{opacity:1},{duration:500,delay:100});
        Velocity($('#Q6can4'),{opacity:1},{duration:500,delay:50});
        //瓶蓋start
        Velocity($('#Q6can1B'),{scaleY:1},{duration:2500,
            complete:function(){
                Velocity($('#Q6can1A'),{scaleY:1,fill:"#D44A49"},{duration:500});
                Velocity($('#Q6can1B'),{fill:"#D44A49"},{duration:500});
                Velocity($('.Q6can1C'),{stroke:"#D44A49"},{duration:500});
            }
        });
        Velocity($('.Q6can1C'),{stroke:"#E5B36A"},{duration:200,delay:1250,queue:false});
        Velocity($('#Q6can1B'),{fill:"#E5B36A"},{duration:200,delay:1250,queue:false});
       }
        function Q6quickLoop(){
            Velocity($('#Q6effect1'),{scaleY:1.2,'stroke-dashoffset':-40},{duration:300,delay:600,queue:false});
            Velocity($('#Q6effect2'),{scaleY:1.2,'stroke-dashoffset':-40},{duration:300,delay:600,queue:false});
            Velocity($('#Q6hand'),{rotateZ:-10},{duration:500,queue:false,
                complete:function(){
                    Velocity($('#Q6hand'),{rotateZ:10},{duration:200,
                        complete:function(){
                            Velocity($('#Q6hand'),{rotateZ:0},{duration:500,
                                complete:function(){
                                    Velocity($('#Q6effect1'),{scaleY:1,'stroke-dashoffset':40},0);
                                    Velocity($('#Q6effect2'),{scaleY:1,'stroke-dashoffset':40},0);
                                    Q6quickLoop();
                                }
                            });

                        }
                    });
                }
            });
            
        }
        Q6quickSet();
        Q6slowSet();

        if($('.ans1').css('backgroundColor')=="rgb(131, 183, 121)"){
            Q6choose = 1;
            Q6slow();
        }else if($('.ans2').css('backgroundColor')=="rgb(131, 183, 121)"){
            Q6choose = 0;
            Velocity($('#Q6spear'),{opacity:1},{duration:300});
            Q6quickLoop();
        }
        
        $('.ans1').click(function(){
                Q6quickSet();
                Q6slowSet();
                Q6slow();
        })
        $('.ans2').click(function(){
            Q6quickSet();
            Q6slowSet();
            Velocity($('#Q6spear'),{opacity:1},{duration:300});
            Q6quickLoop();
        })
        $('.ans1').mouseenter(function() {
            if(Q6choose == 0 ){
            Q6quickSet();
            Q6slowSet();
            Q6slow();
        }
            Q6choose = 1;
        })
        $('.ans2').mouseenter(function() {
            if(Q6choose == 1 ){
                Q6quickSet();
                Q6slowSet();
                Velocity($('#Q6spear'),{opacity:1},{duration:300});
                Q6quickLoop();
            }
            Q6choose = 0;
        })
    }
    render(){
        return(
            <div className='questAnimate'>
                <Q6svg />
            </div>
        )
    }

}

class Quest7 extends React.Component{
    constructor(props){
    super(props);
    }
    componentDidMount(){
        //RWD設定
        if(window.innerWidth<400){
            Velocity.hook($('.Q7svg'),'height','102px');
        }
        $(window).resize(function (){
            if(window.innerWidth<400){
                Velocity.hook($('.Q7svg'),'height','102px');
            }
        })
        //R12 stone moving animate
        function Rmoving12(stone,crab,distance,delayTime){
            Velocity($(stone),{translateY: 0},{//R12下降
                duration: 1000,
                easing:'easeInQuart',
                // loop: true,
                delay:delayTime,
                complete:function(){
                    Velocity($(stone),{translateX: distance/1.5},{
                        easing:'linear',//R12左移
                        duration: 2267,
                        complete:function(){
                            Velocity($(crab),{translateY: 60},{duration: 800});//R12手臂下降
                            Velocity($(stone),{translateX: distance},{
                                easing:'linear',//R12左移
                                duration: 1133,
                                complete:function(){
                                    Velocity($(crab),{translateY: -150},{duration: 1050,easing:'linear'});//R12手臂上升
                                    Velocity($(stone),{translateY: -200},{//R12上升
                                        duration: 1000,
                                        easing:'linear',
                                        complete:function(){//歸位
                                            Velocity($(crab),{translateY: -150},{duration: 0});
                                            Velocity($(stone),{translateY: -200,translateX: 0},{duration: 0});
                                        }
                                    });
                                }
                            });
                        }
                    })
                }
            })
        }
        //R9 stone moving animate
        function Rmoving9(stone,crab,distance,delayTime){
            Velocity($(stone),{translateY: 0},{//R12下降
                duration: 1000,
                easing:'easeInQuart',
                // loop: true,
                delay:delayTime,
                complete:function(){
                    Velocity($(stone),{translateX: distance/1.5},{
                        easing:'linear',//R12左移
                        duration: 720,
                        complete:function(){
                            Velocity($(crab),{translateY: 60},{duration: 360});//R12手臂下降
                            Velocity($(stone),{translateX: distance},{
                                easing:'linear',//R12左移
                                duration: 360,
                                complete:function(){
                                    Velocity($(crab),{translateY: -150},{duration: 1050,easing:'linear'});//R12手臂上升
                                    Velocity($(stone),{translateY: -200},{//R12上升
                                        duration: 1000,
                                        easing:'linear',
                                        complete:function(){//歸位
                                            Velocity($(crab),{translateY: -150},{duration: 0});
                                            Velocity($(stone),{translateY: -200,translateX: 0},{duration: 0});
                                        }
                                    });
                                }
                            });
                        }
                    })
                }
            })
        }
        function Rhome(stone,crab){
            Velocity($(crab),"stop");
            Velocity($(stone),"stop");
            Velocity($(crab),{translateY: -150},{duration: 0});
            Velocity($(stone),{translateY: -200,translateX: 0},{duration: 0});
        };
        function Rhome12(){
            Rhome('#R12_x5F_2','#R12_x5F_hand');
            Rhome('#R12_x5F_3','#R12_x5F_hand');
            Rhome('#R12_x5F_4','#R12_x5F_hand');
            Rhome('#R12_x5F_5','#R12_x5F_hand');
            Rhome('#R12_x5F_6','#R12_x5F_hand');
            Rhome('#R12_x5F_7','#R12_x5F_hand');
        }
        function Rhome9(){
            Rhome('#R9_x5F_2','#R9_x5F_hand');
            Rhome('#R9_x5F_3','#R9_x5F_hand');
            Rhome('#R9_x5F_4','#R9_x5F_hand');
            Rhome('#R9_x5F_5','#R9_x5F_hand');
            Rhome('#R9_x5F_6','#R9_x5F_hand');
            Rhome('#R9_x5F_7','#R9_x5F_hand');
        }
        function RmovingAll9(){
            Rmoving9('#R9_x5F_2','#R9_x5F_hand',-140,0);
            Rmoving9('#R9_x5F_3','#R9_x5F_hand',-140,2500);
            Rmoving9('#R9_x5F_4','#R9_x5F_hand',-140,5000);
            Rmoving9('#R9_x5F_5','#R9_x5F_hand',-140,7500);
            Rmoving9('#R9_x5F_6','#R9_x5F_hand',-140,10000);
            Rmoving9('#R9_x5F_7','#R9_x5F_hand',-140,12500);
        }
        function RmovingAll12(){
            Rmoving12('#R12_x5F_2','#R12_x5F_hand',-440,100);
            Rmoving12('#R12_x5F_3','#R12_x5F_hand',-440,2500);
            Rmoving12('#R12_x5F_4','#R12_x5F_hand',-440,5000);
            Rmoving12('#R12_x5F_5','#R12_x5F_hand',-440,7500);
            Rmoving12('#R12_x5F_6','#R12_x5F_hand',-440,10000);
            Rmoving12('#R12_x5F_7','#R12_x5F_hand',-440,12500);
        }
        //animate start
        Velocity($('.Q7moving'),{'stroke-dashoffset': 13000},{duration: 100000,easing:'linear'});
        // $('#R12_x5F_box').css("translateX",'150');
        $('#R9_x5F_box_1_').css("transform", `translateX(40px)`);
        $('#R12_x5F_box').css("transform", `translateX(40px)`);
        $('#R12_x5F_tube').css("transform", `translateX(40px)`);
        $('#R9_x5F_tube').css("transform", `translateX(40px)`);
        // Velocity($('R12_x5F_box'),{translateX: 150},{duration: 0});
        Rhome9();
        Rhome12();
        //進入動畫判定
        if($('.ans1').css('backgroundColor')=="rgb(131, 183, 121)"){
                RmovingAll12();
            }else if($('.ans2').css('backgroundColor')=="rgb(131, 183, 121)"){
                RmovingAll9();
            }        
        $('.ans1').mouseenter(function() {
                Rhome12();
                RmovingAll12();
                }).mouseleave(function() {
                    Rhome12();
                });
        $('.ans2').mouseenter(function() {
            Rhome9();
            RmovingAll9();
            }).mouseleave(function() {
                Rhome9();
            });
    }
    render(){
        return(
            <div className='questAnimate'>
                <SvgQ7 />
            </div>
            )
    }
}

class Quest8 extends React.Component{
    constructor(props){
    super(props);
    }
    componentDidMount(){
        Velocity.hook($('#Q8r1'), "transformOriginX",'457.5px');
        Velocity.hook($('#Q8r1'), "transformOriginY",'59.5px');
        Velocity.hook($('#Q8r2'), "transformOriginX",'249.5px');
        Velocity.hook($('#Q8r2'), "transformOriginY",'107.5px');
        Velocity.hook($('#Q8r3'), "transformOriginX",'425px');
        Velocity.hook($('#Q8r3'), "transformOriginY",'178px');
        function Q8roll(){
            Velocity($('#Q8rolling'),{'opacity': 1},{duration: 50});
            Velocity($('#Q8head'),{translateY: 0},{duration: 200});
            Velocity($('#Q8r1'),{"stroke-dashoffset": 0},{duration: 800,delay:100});
            Velocity($('#Q8r2'),{"stroke-dashoffset": 0},{duration: 800,delay:300});
            Velocity($('#Q8r3'),{"stroke-dashoffset": 0},{duration: 800,delay:600});
            Velocity($('#Q8r1'),{rotateZ: 360},{duration: 800,queue:false,easing:'linear',delay:300});
            Velocity($('#Q8r2'),{rotateZ: 360},{duration: 800,queue:false,easing:'linear',delay:300});
            Velocity($('#Q8r3'),{rotateZ: 360},{duration: 800,queue:false,easing:'linear',delay:300});
            $('#Q8cloth .Q8clothdown')[0].beginElement();
            $('#Q8clothR .Q8clothRdown')[0].beginElement();
            $('#Q8clothL .Q8clothLdown')[0].beginElement();
        };
        function Q8rollOut(){
            Velocity($('#Q8rolling'),'stop');
            Velocity($('#Q8head'),'stop');
            Velocity($('#Q8rolling'),{'opacity': 0},{duration: 0});
            Velocity($('#Q8head'),{translateY: -4},{duration: 0});
            Velocity($('#Q8r1'),{"stroke-dashoffset": 400},{duration:0});
            Velocity($('#Q8r2'),{"stroke-dashoffset": 400},{duration:0});
            Velocity($('#Q8r3'),{"stroke-dashoffset": 400},{duration:0});
            Velocity($('#Q8r1'),{rotateZ: 0},{duration: 0,queue:false});
            Velocity($('#Q8r2'),{rotateZ: 0},{duration: 0,queue:false});
            Velocity($('#Q8r3'),{rotateZ: 0},{duration: 0,queue:false});
        };
        function Q8shell(){
            Velocity($('#Q8defense'),{'opacity': 1},{duration: 50});
            Velocity($('#Q8defense'),{translateY: 1},{duration: 150,
                complete:function(){
                    Velocity($('#Q8defense'),{translateY: 0},{duration: 0});
                }
            });
            Velocity($('#Q8shield'),{translateY: 3},{duration: 100,delay:100,
                complete:function(){
                    Velocity($('#Q8shield'),{translateY: 1},{duration: 100});
                }
            });
        };
        function Q8shellOut(){
            Velocity($('#Q8defense'),'stop');
            Velocity($('#Q8shield'),'stop');
            Velocity($('#Q8shield'),{translateY: 0},{duration: 0});
            Velocity($('#Q8defense'),{translateY: -2},{duration: 0});
            // $('.Q8shield').css("transform", `translateY(0px)`);
            $('#Q8defense').css("opacity", `0`);
        };
        //歸位
        Velocity($('#Q8defense'),{translateY: -2},{duration: 0});
        Velocity($('#Q8head'),{translateY: -4},{duration: 0});

        if($('.ans1').css('backgroundColor')=="rgb(131, 183, 121)"){
            Q8rollOut()
            Q8shell();
        }else if($('.ans2').css('backgroundColor')=="rgb(131, 183, 121)"){
            Q8shellOut()
            Q8roll();
        }else{
            Q8rollOut();
            Velocity($('#Q8defense'),{'opacity': 1},{duration: 50});
            Velocity($('#Q8shield'),{'opacity': 0},0);
            Velocity($('#Q8defense'),{translateY: 1},{duration: 150,
                complete:function(){
                    Velocity($('#Q8defense'),{translateY: 0},{duration: 0});
                }
            });
        }
        $('.ans1').click(function(){
            Q8rollOut();
            Velocity($('#Q8shield'),{'opacity': 1},0);
            Q8shell();
        })
        $('.ans2').click(function(){
            Q8shellOut()
            if(justforUQ8==1){
                Q8roll();
            }
        })

        $('.ans2').mouseenter(function() {
            Q8shellOut()
            if(justforUQ8==1){
                Q8roll();
            }
            
        })
        $('.ans1').mouseenter(function() {
            Q8rollOut()
            Velocity($('#Q8shield'),{'opacity': 1},0);
            Q8shell();
        })
    }
    render(){
        return(
            <div className='questAnimate'>
                <Q8svg />
            </div>
        )
    }

}

class Quest9 extends React.Component{
    componentDidMount(){
        Velocity.hook($('#Q9man'), "transformOriginX",'379.5px');
        Velocity.hook($('#Q9man'), "transformOriginY",'202px');
        Velocity.hook($('#Q9eye'), "transformOriginX",'361px');
        Velocity.hook($('#Q9eye'), "transformOriginY",'67px');
        Velocity($('#Q9bullet'),{'stroke-dashoffset': -10000},{duration: 20000,easing:'linear',loop:true});
        Velocity($('.Q9BGn1'),{'stroke-dashoffset': -10000},{duration: 20000,easing:'linear',loop:true});
        Velocity($('.Q9BGn2'),{'stroke-dashoffset': -10000},{duration: 30000,easing:'linear',loop:true});
        Velocity($('.Q9BGn3'),{'stroke-dashoffset': -10000},{duration: 25000,easing:'linear',loop:true});
        Velocity($('.Q9BGn4'),{'stroke-dashoffset': -10000},{duration: 15000,easing:'linear',loop:true});
        let Q9i = 0;
        function Q9ult(){
            Q9stop();
            Velocity($('#Q9man'),{rotateZ: '-13deg'},{duration: 300});
            Velocity($('#Q9shoesLeft'),{translateX:-23},{duration: 300});
            Velocity($('#Q9shoesRight'),{translateX:17},{duration: 300});
            Velocity($('#Q9sward'),{opacity:1},{duration: 300});
            Velocity($('#Q9gun'),{opacity:0},{duration: 300});
            Velocity($('#Q9upperHand'),{opacity:1},{duration: 300});
            Velocity($('#Q9underHandS'),{opacity:1},{duration: 300});
            Velocity($('#Q9underHandG'),{opacity:0},{duration: 300});
            Velocity($('#Q9bullet'),{opacity:0},{duration: 300,queue:false});
            Velocity($('#Q9BG'),{opacity:1},{duration: 300,queue:false});
            Velocity($('#Q9eye'),{rotateZ: '-0deg'},{duration: 100});
            function Q9footAnimate(){
                $('.Q9foot1-back')[0].beginElement();                   
                $('.Q9foot2-back')[0].beginElement();                   
            }
            if(justforUQ9 == 1){
                if(Q9i==2||Q9i==0){
                    Q9footAnimate();
                    Q9i=1;
                }
            }
        }
        function Q9stop(){
            Velocity($('#Q9man'),'stop');
            Velocity($('#Q9shoesLeft'),'stop');
            Velocity($('#Q9shoesRight'),'stop');
            Velocity($('#Q9sward'),'stop');
            Velocity($('#Q9gun'),'stop');
            Velocity($('#Q9upperHand'),'stop');
            Velocity($('#Q9underHandS'),'stop');
            Velocity($('#Q9underHandG'),'stop');
            Velocity($('#Q9eye'),'stop');
            Velocity($('#Q9foot1'),'stop');
            Velocity($('#Q9foot2'),'stop');
        }
        function Q9daily(){
            Q9stop();
            Velocity($('#Q9man'),{rotateZ: '0deg'},{duration: 300});
            Velocity($('#Q9shoesLeft'),{translateX:0},{duration: 300});
            Velocity($('#Q9shoesRight'),{translateX:0},{duration: 300});
            Velocity($('#Q9sward'),{opacity:0},{duration: 300});
            Velocity($('#Q9gun'),{opacity:1},{duration: 300});
            Velocity($('#Q9upperHand'),{opacity:0},{duration: 300});
            Velocity($('#Q9underHandS'),{opacity:0},{duration: 300});
            Velocity($('#Q9underHandG'),{opacity:1},{duration: 300});
            Velocity($('#Q9bullet'),{opacity:1},{duration: 300,queue:false});
            Velocity($('#Q9BG'),{opacity:0},{duration: 300,queue:false});
            Velocity($('#Q9eye'),{rotateZ: '31deg'},{duration: 100});
            function Q9footAnimate(){
                $('.Q9foot1-go')[0].beginElement();
                $('.Q9foot2-go')[0].beginElement();
            }
            if(justforUQ9 == 1){//判定是否在q9中，避免錯誤
                if(Q9i==1||Q9i==0){//0->判定若開始時滑鼠不在按鈕上,1->從ans2過來的狀況
                    Q9footAnimate();
                    Q9i=2;
                }
            }

        }

        // Q9daily();//預設執行Q9ult
        if($('.ans2').css('backgroundColor')=="rgb(131, 183, 121)"){
            Q9i=1;
            Q9daily();
        }else if($('.ans1').css('backgroundColor')=="rgb(131, 183, 121)"){
            Q9i=2;
            Q9ult();
        }
        
        $('.ans1').click(function(){
            Q9ult();
        })
        $('.ans2').click(function(){
            Q9daily();
        })

        $('.ans1').mouseenter(function() {
            Q9ult();
        })
        $('.ans2').mouseenter(function() {
            Q9daily();
        })    
    }

    
    render(){
        return(
            <div className='questAnimate'>
                <Q9svg />
            </div>
        )
    }
}
class Quest10 extends React.Component{
    componentDidMount(){
        function Q10slow(){
            clearInterval(Q10Q);
            clearInterval(Q10S);
            Velocity($('#Q10clickEffect'),'stop');
            Velocity($('#Q10thumb1'),'stop');
            Velocity($('#Q10clickEffect'),{"stroke-dashoffset":0},{duration:0});
            Velocity($('#Q10clickEffect'),{"stroke-dashoffset":-1250},{duration: 60000,easing:'linear'});
            
            Q10S = setInterval(()=>{
                if(justforUQ10 ==1){
                $('.Q10thumb1-slowgo')[0].beginElement();
                $('.Q10thumb1-slowback')[0].beginElement();
                }
            },670)
            
        }
        function Q10quick(){
            clearInterval(Q10Q);
            clearInterval(Q10S);
            Velocity($('#Q10clickEffect'),'stop');
            Velocity($('#Q10thumb1'),'stop');
            Velocity($('#Q10clickEffect'),{"stroke-dashoffset":0},{duration:0});
            Velocity($('#Q10clickEffect'),{"stroke-dashoffset":-5000},{duration: 60000,easing:'linear'});
                Q10Q = setInterval(()=>{
                    if(justforUQ10 ==1){
                        $('.Q10thumb1-fastgo')[0].beginElement();
                        $('.Q10thumb1-fastback')[0].beginElement();
                    }
                },205)
        }
        
        if($('.ans1').css('backgroundColor')=="rgb(131, 183, 121)"){
            Q10slow();
        }else if($('.ans2').css('backgroundColor')=="rgb(131, 183, 121)"){
            Q10quick();
        }
        $('.ans2').mouseenter(function() {
            Q10quick();
        })
        $('.ans1').mouseenter(function() {
            Q10slow();
        })
        


    }
    render(){
        return(
            <div className='questAnimate'>
                <Q10svg />
                <div className='result'></div>
            </div>
        )
    }
}

class QuestAnimate extends React.Component{//key Q1widthR1 linkStyle
    constructor(props){
        super(props);
    }
    render(){
        let key1 = this.props.keyName;
        if(key1 == 0){
            return ( <Quest1/> );   
        }
        if(key1 == 1){
            return ( <Quest2/> );   
        }
        if(key1 == 2){
            return ( <Quest3/> );
        }
        if(key1 == 3){
            return ( <Quest4/> );
        }
        if(key1 == 4){
            return ( <Quest5/> );
        }
        if(key1 == 5){
            return ( <Quest6/> );
        }
        if(key1 == 6){
            return ( <Quest7/> );
        }
        if(key1 == 7){
            return ( <Quest8/> );
        }
        if(key1 == 8){
            return ( <Quest9/> );
        }
        if(key1 == 9){
            return ( <Quest10/> );
        }else{
            return(<div className='deleteafteralldone'></div>)
        }
    }
}
class EnterPage extends React.Component{//入口頁動畫
    constructor(props){
        super(props);
        this.StartNum = this.StartNum.bind(this);
    }
    StartNum(){
        Velocity($('.cardContainer'),{'opacity':'0'},{duration:450})
        Velocity($('.startCard'),{translateX:25,translateY:25},{duration:450})
        setTimeout(()=>{
            this.props.handleStartNum();
            },450)
        setTimeout(()=>{
        if(window.innerWidth>window.innerHeight && window.innerWidth<800){
            Velocity.hook($('.test'), 'flex-grow','1');
        }else{
            Velocity.hook($('.test'), 'flex-grow','0.65');
        }
        Velocity.hook($('.test'), 'display','flex');
        Velocity.hook($('.test'), 'opacity','1');
        Velocity($('.ci'),{'margin-top':'1.5%','margin-bottom':'1.5%'},{duration:250,queue:false})
        },500)

        setTimeout(()=>{
            Velocity($('.testCi'),{opacity:1},{duration:250,display:"flex"})
            },800)
    }

    componentDidMount(){        
        var elementStartText = document.querySelector('.startText').offsetHeight;
        Velocity.hook($('#enterT'), "transformOriginX",'50%');
        Velocity.hook($('#enterT'), "transformOriginY",'50%');
        Velocity.hook($('#enterFT'), "transformOriginX",'50%');
        Velocity.hook($('#enterFT'), "transformOriginY",'50%');
        Velocity.hook($('#ldInnerLine'), "transformOriginX",'50%');
        Velocity.hook($('#ldOutLine'), "transformOriginX",'50%');
        Velocity.hook($('#ldHand'), "transformOriginX",'50%');
        Velocity($('.enterT1'),{translateY:-10},0)
        Velocity($('.enterT2'),{translateY:-10},0)
        Velocity($('.enterT3'),{translateY:-10},0)
        Velocity($('.start'),{translateY:-10},0)
        
        Velocity($('.startText'),{width:elementStartText},0);//設定中間的DIV是正方形
        $(window).resize(function () {//視窗變換時更換大小
            if(document.querySelector('.startText')!=null){//若有找到startText就重新設定大小
                elementStartText = document.querySelector('.startText').offsetHeight;
            }
            
            Velocity($('.startText'),{width:elementStartText},0);
        });
        //loading 旋轉動畫
        Velocity($('#ldInnerLine'),{'stroke-dashoffset':50,rotateY:179},{duration:1500,loop:true})
        Velocity($('#ldOutLine'),{'stroke-dashoffset':50,rotateY:-179},{duration:1500,delay:250,loop:true})
        Velocity($('#ldHand'),{rotateY:180},{duration:1500,loop:true})
        //進入動畫
        window.onload = function() {
            setTimeout(()=>{
                //fadeOut
                Velocity($('#loadingCover'),{opacity:0},{duration:300,display:"none"})
                //start text animate start
                if(window.innerWidth<1025){//若手機板 則不跑旋轉動畫
                    Velocity($('#enterT'),{'stroke-dashoffset':0},{duration:1500})
                    Velocity($('#enterFT'),{'opacity':1},{duration:1500,delay:0})
                }else{
                    Velocity($('#enterT'),{'stroke-dashoffset':0,rotateZ:'15deg'},{duration:1500})
                    Velocity($('#enterFT'),{'opacity':1,rotateZ:'-15deg'},{duration:1500,delay:0})
                }
                Velocity($('#incircle'),{'stroke-dashoffset':0},{duration:1400})
                Velocity($('.enterT1'),{'opacity':1,translateY:0},{duration:800,delay:0})
                Velocity($('.enterT2'),{'opacity':1,translateY:0},{duration:800,delay:0})
                Velocity($('.enterT3'),{'opacity':1,translateY:0},{duration:800,delay:0})
                Velocity($('.startD'),{'opacity':1,translateY:0},{duration:800,delay:0})
                //防止動畫跑到一半被stop，加上startCover蓋在start上,於動畫結束時display:none
                Velocity($('.startCover'),{translateY:0},{duration:0,delay:1400,display:'none'})
            },2000)
          };
        let during = 350;//卡片的時間參數
        //卡片滑過翻面動畫
        $('.startCard').mouseenter(function() {
            // Velocity($(this),'stop');
            Velocity($(this),{translateX:'-15px',translateY:'-15px'},{duration:250,queue:false})
            Velocity($(this),{rotateY: '180deg'},{duration:during,easing:'linear',delay:250,queue:false})
            Velocity($(this).find('.enterCardBack'),{opacity:0},{duration:0,delay:during*0.7+250,queue:false});
            Velocity($(this).find('.enterCardFront'),{opacity:1},{duration:0,delay:during*0.7+250,queue:false});

        }).mouseleave(function() {
            Velocity($(this),{rotateY: '0deg'},{duration:200,easing:'linear',delay:during*8,queue:false})
            Velocity($(this).find('.enterCardBack'),{opacity:1},{duration:0,delay:during*8+100,queue:false});
            Velocity($(this).find('.enterCardFront'),{opacity:0},{duration:0,delay:during*8+100,queue:false});
            Velocity($(this),{translateX:'0px',translateY:'0px'},{duration:250,delay:during*8+100,queue:false})

        });
        //開始按鈕的動畫控制
        $('.start').mouseenter(function() {
            Velocity($('.start'),'stop');
            Velocity($('#incircle'),'stop');
            Velocity($('.enterBG .st3'),'stop');
            Velocity($('.enterBG .st2'),'stop');
            Velocity($('.enterBG .st0'),'stop');
            Velocity($('#enterTGray'),'stop');
            Velocity($('.enterT3'),'stop');
            //stop
            Velocity($('.start'),{color:'#D44A49'},500);
            Velocity($('#incircle'),{stroke:'#cccccc'},500);
            Velocity($('.enterBG .st3'),{stroke:'#cccccc'},500);
            Velocity($('.enterBG .st2'),{fill:'#cccccc'},500);
            Velocity($('.enterBG .st0'),{stroke:'#cccccc'},500);
            Velocity($('#enterTGray'),{"stroke-dashoffset":0},500);
            Velocity($('.enterT3'),{'border-bottom':'#cccccc'},500);

        }).mouseleave(function() {
            Velocity($('.start'),'stop');
            Velocity($('#incircle'),'stop');
            Velocity($('.enterBG .st3'),'stop');
            Velocity($('.enterBG .st2'),'stop');
            Velocity($('.enterBG .st0'),'stop');
            Velocity($('#enterTGray'),'stop');
            Velocity($('.enterT3'),'stop');
            //stop
            Velocity($('.start'),{color:'#ffffff'},500);
            Velocity($('#incircle'),{stroke:'#DEAE69'},500);
            Velocity($('.enterBG .st3'),{stroke:'#DEAE69'},500);
            Velocity($('.enterBG .st2'),{fill:'#DEAE69'},500);
            Velocity($('.enterBG .st0'),{stroke:'#DEAE69'},500);
            Velocity($('#enterTGray'),{"stroke-dashoffset":100},500);
            Velocity($('.enterT3'),{'border-bottom':'#DEAE69'},500);
        });
        //卡片隨滑鼠位置轉動
        window.document.addEventListener("mousemove", (e) => {
            let enterHelfW = window.innerWidth/2;
            let enterMXWin = e.clientX-enterHelfW;//設置滑鼠於最左側為負，最右為正
            let enterMXWinValue = parseInt(Velocity.hook($('.startCard'), "rotateX"))+enterMXWin*0.001;
            Velocity($('.startCard'),{rotateX:enterMXWinValue},{duration:0,easing:'linear',queue:false})
          });
    }
    render(){
        let cardsRow = []//宣告array
        let startCardRow = [];
        cardsRow[0]=[];
        cardsRow[1]=[];
        cardsRow[2]=[];
        cardsRow[3]=[];
        cardsRow[4]=[];
        cardsRow[5]=[];
        cardsRow[6]=[];
        cardsRow[7]=[];
        function cardRowR(n){//跑亂數與push卡正面與背面的內容進array
            let startCardRandomStart = Math.random().toFixed(2)*100%(weaponNumber-1);
            let startCardRandom = startCardRandomStart.toFixed(0);
            cardsRow[n].push(
                <div className='startCard'>
                    <img  className = 'enterCardBack' src = {cardBack}></img>
                    <img  className = 'enterCardFront' src = {cardRowForRandom[startCardRandom]}></img>
                </div>)
        }
        for(let i =0;i<63;i++){//為了讓每個卡片得到不同亂數 所以建立跑64次(橫8*直8)的迴圈
            if(i%8 == 0){cardRowR(i%8)}
            if(i%8 == 1){cardRowR(i%8)}
            if(i%8 == 2){cardRowR(i%8)}
            if(i%8 == 3){cardRowR(i%8)}
            if(i%8 == 4){cardRowR(i%8)}
            if(i%8 == 5){cardRowR(i%8)}
            if(i%8 == 6){cardRowR(i%8)}
            if(i%8 == 7){cardRowR(i%8)}
        }
        for(let i =0;i<8;i++){//製造多個cards的DIV
            startCardRow.push(<div className='cards'>{cardsRow[i]}</div>)
        }
        return(
            <div className='cardContainer'>
                {startCardRow}
                <div className="startText" onClick={this.StartNum}>
                    <EnterBG />
                    <div className="insideStartText">
                        <div className='enterT1'>也來試試這個玩法吧!!</div>
                        <div className='enterT2'>每個魔物獵人都該做的</div>
                        <div className='enterT3'>流派測驗</div>
                        <div className="startD" >
                            <p className='start'>START</p>
                            <p className='startCover'></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class ProgressBar extends React.Component{//props:prog，生成進度條
    constructor(props){
        super(props);
    }
    render(){
        let prog = this.props.prog;
        let progPersent = prog*10;
        return (
            <div className="score">
                <div className='scoreBoard' style={{width:progPersent+'%'}}></div>
            </div>
        )
    }

}
class ScorePBar extends React.Component{//props:score，生成結果%數字
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const scoreRowH = this.props.score;
        const scoreTopFive = this.props.topFive;
        let MaxScore = Math.max(...scoreRowH);
        const scoreRowSumH = scoreRowH.reduce((a,b)=>a+b*b*b*b,0);//通通加起來
        for(var s = 0;s<weaponNumber;s++){//給予分數條的值
            const scoreRowPersent = Math.pow(scoreRowH[s],4)/scoreRowSumH*80;//最高高度80%
            const scoreCount = scoreRowPersent/Math.pow(MaxScore,4)*scoreRowSumH+'%';
            Velocity($('.scoreBar'+s),{height:scoreCount},{duration:450,queue:false});
            if(s == scoreTopFive[0]||s == scoreTopFive[1]||s == scoreTopFive[2]||s == scoreTopFive[3]||s == scoreTopFive[4]){
                Velocity($('.scoreBar'+s),{'background-color': '#E5B36A'},{duration:100});
                Velocity($('.scoreBarName'+s),{'background-color': '#E5B36A'},{duration:100});
            }
        }
        function scoreColorGo(s){//設定條的顏色
            Velocity($('.scoreBar'+s),{'background-color': '#6bb2c3'},{duration:100});
            Velocity($('.scoreBarName'+s),{'background-color': '#6bb2c3'},{duration:100});
        }
        function scoreColorBack(s){//條的顏色動畫(返回)
            Velocity($('.scoreBar'+s),"stop");
            Velocity($('.scoreBarName'+s),"stop");
            Velocity($('.scoreBar'+s),"reverse",{duration:100});
            Velocity($('.scoreBarName'+s),"reverse",{duration:100});
        }
        //條的顏色動畫(hover)
        $('.scoreBarName0').mouseenter(function() {scoreColorGo(0)}).mouseleave(function() {scoreColorBack(0)});
        $('.scoreBarName1').mouseenter(function() {scoreColorGo(1)}).mouseleave(function() {scoreColorBack(1)});
        $('.scoreBarName2').mouseenter(function() {scoreColorGo(2)}).mouseleave(function() {scoreColorBack(2)});
        $('.scoreBarName3').mouseenter(function() {scoreColorGo(3)}).mouseleave(function() {scoreColorBack(3)});
        $('.scoreBarName4').mouseenter(function() {scoreColorGo(4)}).mouseleave(function() {scoreColorBack(4)});
        $('.scoreBarName5').mouseenter(function() {scoreColorGo(5)}).mouseleave(function() {scoreColorBack(5)});
        $('.scoreBarName6').mouseenter(function() {scoreColorGo(6)}).mouseleave(function() {scoreColorBack(6)});
        $('.scoreBarName7').mouseenter(function() {scoreColorGo(7)}).mouseleave(function() {scoreColorBack(7)});
        $('.scoreBarName8').mouseenter(function() {scoreColorGo(8)}).mouseleave(function() {scoreColorBack(8)});
        $('.scoreBarName9').mouseenter(function() {scoreColorGo(9)}).mouseleave(function() {scoreColorBack(9)});
        $('.scoreBarName10').mouseenter(function() {scoreColorGo(10)}).mouseleave(function() {scoreColorBack(10)});
        $('.scoreBarName11').mouseenter(function() {scoreColorGo(11)}).mouseleave(function() {scoreColorBack(11)});
        $('.scoreBarName12').mouseenter(function() {scoreColorGo(12)}).mouseleave(function() {scoreColorBack(12)});
        $('.scoreBarName13').mouseenter(function() {scoreColorGo(13)}).mouseleave(function() {scoreColorBack(13)});
        $('.scoreBarName14').mouseenter(function() {scoreColorGo(14)}).mouseleave(function() {scoreColorBack(14)});
        $('.scoreBarName15').mouseenter(function() {scoreColorGo(15)}).mouseleave(function() {scoreColorBack(15)});
        $('.scoreBarName16').mouseenter(function() {scoreColorGo(16)}).mouseleave(function() {scoreColorBack(16)});
        $('.scoreBarName17').mouseenter(function() {scoreColorGo(17)}).mouseleave(function() {scoreColorBack(17)});
        $('.scoreBarName18').mouseenter(function() {scoreColorGo(18)}).mouseleave(function() {scoreColorBack(18)});
        $('.scoreBarName19').mouseenter(function() {scoreColorGo(19)}).mouseleave(function() {scoreColorBack(19)});
        $('.scoreBarName20').mouseenter(function() {scoreColorGo(20)}).mouseleave(function() {scoreColorBack(20)});
        $('.scoreBarName21').mouseenter(function() {scoreColorGo(21)}).mouseleave(function() {scoreColorBack(21)});
        $('.scoreBarName22').mouseenter(function() {scoreColorGo(22)}).mouseleave(function() {scoreColorBack(22)});
        $('.scoreBarName23').mouseenter(function() {scoreColorGo(23)}).mouseleave(function() {scoreColorBack(23)});
        $('.scoreBarName24').mouseenter(function() {scoreColorGo(24)}).mouseleave(function() {scoreColorBack(24)});
        $('.scoreBarName25').mouseenter(function() {scoreColorGo(25)}).mouseleave(function() {scoreColorBack(25)});
        $('.scoreBarName26').mouseenter(function() {scoreColorGo(26)}).mouseleave(function() {scoreColorBack(26)});


    }
    render(){
        let scoreBarP = [];
        let scoreBarName = [];
        const scoreRowP = this.props.score;
        const scoreRowSumP = scoreRowP.reduce((a,b)=>a+b*b*b*b,0);//通通加起來(4次方)
        for(var s = 0;s<weaponNumber;s++){//生成分數條名稱的div
            const scoreRowPersent = Math.pow(scoreRowP[s],4)/scoreRowSumP*100;//4次方加大級距
            scoreBarP.push(
            <div className='scoreBarFrame'>
                <div className='scoreBarPersent'>
                    {scoreRowPersent.toFixed(1)+'%'}
                </div>
                <div className={'scoreBar scoreBar'+s}></div>
            </div>//該項目的%
            );
            scoreBarName.push(
                <div className={'scoreBarName scoreBarName'+s}>{OUTCOME[s].name}</div>
            )
        }
        return (
            <div className='rtMoreInfo'>
                <div className='rtMoreInfoBar'>{scoreBarP}</div>
                <div className='rtMoreInfoName'>{scoreBarName}</div>
            </div>
        )
    }

}

class PrintResult extends React.Component{
    constructor(props){
        super(props);
        this.changeContent = this.changeContent.bind(this);
    }
    componentDidMount(){
        Velocity($('.ci'),{'margin-top':'1%','margin-bottom':'1%'},{duration:0})
    }
    changeContent(e){
        this.props.changeContent(e);
        console.log(e);
        //更換rtTopItem底色
        Velocity($('.rtTopItem'),{'background-color':'#191919',},{duration:100})
        Velocity($('.rtTopFive'+e),{'background-color':'#DEAE69',},{duration:100})
    }

    render(){
        const scoreRowH = this.props.score;
        const scoreTopFive = this.props.topFive;
        let topFiveShowWhich = this.props.topFiveShowWhich;
        let topFiveRow = [];
        const scoreRowSumH = scoreRowH.reduce((a,b)=>a+b*b*b*b,0);//通通加起來
        let OC1name = OUTCOME[this.props.topFive[topFiveShowWhich]].name;
        let OC1url = OUTCOME[this.props.topFive[topFiveShowWhich]].url;
        let OC1explain = OUTCOME[this.props.topFive[topFiveShowWhich]].explain;

        for(var i = 0;i<5;i++){//填入前五名的內容
            const scoreRowPersent = Math.pow(scoreRowH[scoreTopFive[i]],4)/scoreRowSumH*100;
            const ccValue = i;
            topFiveRow.push(
                <div className={"rtTopItem rtTopFive"+i} onClick={()=> this.changeContent(ccValue)} key={"rtTopFive"+i}>
                    <span key={"rtTopFiveSapn1"+i}>{OUTCOME[scoreTopFive[i]].name}</span>
                    <span key={"rtTopFiveSapn2"+i}>{scoreRowPersent.toFixed(1)+'%'}</span>
                </div>
            )
        }//錯誤處理:onClick={()=> this.changeContent(ccValue)} >>> 只寫this.changeContent()會導致無限render的錯誤
        

        return(
            <div className='rtChange'>
                <div className="rtResult">測驗結果</div>
                <div className="rtTopFive">
                    {topFiveRow}
                </div>
                <div className='rtMainContainer'>
                    <div className="rCard">
                        <img className='rCardImg2' src={cardBack} alt={'cardBack'}/>
                        <img className='rCardImg1' src={OC1url} alt={OC1name}/>
                    </div>
                    <div className="rText">
                        <div className="rtTitle"><span>{OC1name}</span></div>
                        <div className="rtContainer"><span>{OC1explain}</span></div>
                    </div>
                </div>
        </div>
        )

    }
}

class PrintWhich extends React.Component{//props:nowPrintResult
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.nowPrintResult){
            return <PrintResult 
                topFive={this.props.topFive} 
                score={this.props.scoreNow} 
                topFiveShowWhich={this.props.topFiveShowWhich}
                changeContent = {this.props.changeContent}
                />
        }else{
            return <ScorePBar score={this.props.scoreNow} topFive={this.props.topFive} />
        }
    }
}

class NextQuestion extends React.Component{
    constructor(props){
        super(props);
        this.state={
            whichOne:-1,
            score:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//若增加武器這裡也要增加
            topFive:[],
            nowPrintResult:true,//判定現在是顯示結果或是更多資訊
            moreInfoOrBack:'更多內容',
            topFiveShowWhich:0,//結果顯示時出現哪個內容
        }
        this.changeNum = this.changeNum.bind(this);
        this.handleStartNum = this.handleStartNum.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.more = this.more.bind(this);
        this.share = this.share.bind(this);
    }
    handleChangeContent(topFiveShowWhich) {//更換結果的選項
        setTimeout(( () => this.setState({topFiveShowWhich:topFiveShowWhich}) ), 700);//延遲更換的時間

        Velocity($('.rCard img'),{rotateY: '180deg'},{duration:500,easing:'linear'});
        Velocity($('.rText span'),{opacity:0},{duration:700});
        Velocity($('.rText span'),{opacity:1},{duration:500});
        Velocity($('.rCardImg1'),{opacity:0},{duration:0,delay:250,queue:false});
        Velocity($('.rCardImg1'),{opacity:1},{duration:0,delay:950,queue:false});
        Velocity($('.rCard img'),{rotateY: '0deg'},{duration:500,delay:700,easing:'linear',queue:false});
        
    }
    handleStartNum(){
        this.setState({whichOne:this.state.whichOne+1});
    }

    changeNum(value){//選項執行>>增加whichOne的計數
        //進度條動畫
        Velocity($('.scoreBoard'),'stop');
        Velocity($('.scoreBoard'),{'background-color': '#333333'},{duration:550,
            complete:function(){
                Velocity($('.scoreBoard'),{'background-color': '#1C1C1C'},{duration:350});
            }
        });
        if(this.state.whichOne == 9){//為result進入動畫騰出時間
            Velocity($('.ci'),{'margin-top': '1%','margin-bottom':'1%'},{duration:350});
            Velocity($('.Q10svg'),{'opacity': '0'},{duration:350,display:'none'});
            Velocity($('.testCi'),{'opacity': '0'},{duration:350,display:'none'});
            Velocity($('.test'),{'flex-grow': '0.00001'},{duration:350});
            setTimeout(()=>{
                this.setState({whichOne:this.state.whichOne+1});
            },1500);
            
        }else{//其他狀況
            //判定若是手持裝置，則延後換題時間跑動畫
            if(window.innerWidth<1025){
                setTimeout(()=>{
                    this.setState({whichOne:this.state.whichOne+1});
                },1500);
            }else{
                this.setState({whichOne:this.state.whichOne+1});
            }
            
        }
        let i =0;
        const row = [];
        const num = parseInt(this.state.whichOne);
        console.log('num:'+num);
        const testScoreRow = [this.props.Data[num].score1,this.props.Data[num].score2]//選擇SCROE1
        const factor = parseInt(this.props.Data[num].factor, 10);//數字化factor
        this.state.score.forEach((n)=>{//加分
            let r = Math.round(Math.random()*1000)/100000;//加入亂數避免相同值
            let m = parseInt(testScoreRow[value][i], 10)*factor;//乘上倍率
            row.push(n+m+r);//建立現在的分數
            i++;
        });
        this.setState({score:row},() => console.log("this.state.score:"+this.state.score));//更新分數
        //forQ8
        if(num==7){
            justforUQ8 = 2;
        }
        if(num==2){
            justforUQ3 = 2;
        }
        if(num==8){
            justforUQ9 = 2;
        }
        if(num==9){
            justforUQ10 = 2;
        }
        if(num==10){
            clearInterval(Q10Q);
            clearInterval(Q10S);
        }
    }
    more(){//更多資訊按鈕
        // let scoreBarWidth = window.innerWidth/27;//平均長度
        //計算高度
        this.setState({nowPrintResult:!this.state.nowPrintResult});
        if(this.state.nowPrintResult){
            this.setState({moreInfoOrBack:'返回'});          
        }else{
            this.setState({moreInfoOrBack:'更多內容'}); 
        }
    }
    share(n){
        window.sessionStorage.setItem("MHWtestValue", "1");
        window.open('https://mhwweapontest.github.io/W'+n+'.html?value=1');
    }
    render(){//props:Date,OutCome
        let P = this.state.whichOne
        const data = this.props.Data;//挑出題目資料
        const scoreNow = this.state.score;//挑出分數資料
        const outCome = this.props.OutCome;//挑出結果資料
        let scoreSort = this.state.score.map(n => n);//複製一份score
        let title = '';
        let ans1 = '';
        let ans2 = '';
        let topFive = [];
        let top5Name = [];

        function whichQ(n){//選取資料填入
            title = data[n].title;
            ans1 = data[n].ans1;
            ans2 = data[n].ans2;
        }

        function searchTopFive(){
            scoreSort.sort(function(a, b) {
                return b-a;
            });
            const no1 = scoreNow.indexOf(scoreSort[0]);//第1~5名的位置
            const no2 = scoreNow.indexOf(scoreSort[1]);
            const no3 = scoreNow.indexOf(scoreSort[2]);
            const no4 = scoreNow.indexOf(scoreSort[3]);
            const no5 = scoreNow.indexOf(scoreSort[4]);
            topFive = [no1,no2,no3,no4,no5];
            top5Name = [OUTCOME[no1].name,OUTCOME[no2].name,OUTCOME[no3].name,OUTCOME[no4].name,OUTCOME[no5].name]
        }
        if(P==-1){
            return(
                <div className="container">
                    <div className="ci">
                        <div className="topline"></div>
                        <EnterPage handleStartNum={this.handleStartNum}/>
                        <div className="butline"></div>
                    </div>
                    <div id='loadingCover'>
                        <LoadingSvg />
                    </div>
                </div>
                
            )
        }else if(P < questNumber){
            whichQ(P);
            console.log("P"+P);
            return(//render 題目區的內容
                    <div className="container">
                        <div className="ci">
                            <div className="topline"></div>
                            <div className="interact" ><QuestAnimate keyName={P}/></div>
                            <ProgressBar prog={P}/>
                            <div className="butline"></div>
                        </div>
                        <div className="test" id="test">
                            <div className="testCi">
                                <div className="title">{title}</div>
                                <div className="ans1 .ans1Q1 ans" onClick={()=> this.changeNum(0)} >
                                    <span className='ans1text anstext'>{ans1}</span>
                                    <div className='ans1cover anscover'></div>
                                    </div>
                                <div className="ans2 .ans2Q1 ans" onClick={()=> this.changeNum(1)} >
                                    <span className='ans2text anstext'>{ans2}</span>
                                    <div className='ans2cover anscover'></div>
                                </div>
                            </div>
                        </div>
                    </div>
            )
        }else{
            searchTopFive();
            //RWD result頁判定
            if(window.innerWidth<650){
                Velocity.hook($('.container'),'justify-content','start');
                Velocity.hook($('.container'),'height','auto');
                Velocity.hook($('.ci'),'height','auto');
                Velocity.hook($('.interact'),'height','auto');               
            }
            $(window).resize(function(){
                if(window.innerWidth<650){
                    Velocity.hook($('.container'),'justify-content','start');
                    Velocity.hook($('.container'),'height','auto');
                    Velocity.hook($('.ci'),'height','auto');
                    Velocity.hook($('.interact'),'height','auto');               
                }else{
                    Velocity.hook($('.container'),'justify-content','space-evenly');
                    Velocity.hook($('.container'),'height','96vh');
                    Velocity.hook($('.ci'),'height','0');
                    Velocity.hook($('.interact'),'height','0');               

                }
            })
            
            return(//render 結果
            
            <div className="container">
                    <div className="ci">
                    <div className="topline"></div>
                    <div className="interact">
                        {/* <CSSTransition in={true} timeout={1000} classNames="gogo"> */}
                        <div className="result">
                            <PrintWhich 
                                nowPrintResult={this.state.nowPrintResult} 
                                score={this.state.score} 
                                topFive={topFive} 
                                scoreNow={scoreNow}
                                topFiveShowWhich = {this.state.topFiveShowWhich}
                                changeContent = {this.handleChangeContent}
                                />
                            <div className="rtButton">
                                <a className="rtBtn1" onClick={this.more}>{this.state.moreInfoOrBack}</a>
                                <a className="rtBtn2" href="index.html">再試一次</a>
                                <a className="rtBtn3" onClick={()=> this.share(topFive[0])}>分享</a>
                            </div>
                        </div>
                        
                        {/* </CSSTransition> */}
                    </div>
                    {/* <ScoreBar score={scoreNow}/> */}
                    
                    <div className="butline"></div>
                </div>
                
            </div>
    )
        }
    }
}

const OUTCOME = [
    {key: 1, name: quest.N1, url:card1, explain: quest.E1},
    {key: 2, name: quest.N2, url:card2, explain: quest.E2},
    {key: 3, name: quest.N3, url:card3, explain: quest.E3},
    {key: 4, name: quest.N4, url:card4, explain: quest.E4},
    {key: 5, name: quest.N5, url:card5, explain: quest.E5},
    {key: 6, name: quest.N6, url:card6, explain: quest.E6},
    {key: 7, name: quest.N7, url:card7, explain: quest.E7},
    {key: 8, name: quest.N8, url:card8, explain: quest.E8},
    {key: 9, name: quest.N9, url:card9, explain: quest.E9},
    {key: 10, name: quest.N10, url:card10, explain: quest.E10},
    {key: 11, name: quest.N11, url:card11, explain: quest.E11},
    {key: 12, name: quest.N12, url:card12, explain: quest.E12},
    {key: 13, name: quest.N13, url:card13, explain: quest.E13},
    {key: 14, name: quest.N14, url:card14, explain: quest.E14},
    {key: 15, name: quest.N15, url:card15, explain: quest.E15},
    {key: 16, name: quest.N16, url:card16, explain: quest.E16},
    {key: 17, name: quest.N17, url:card17, explain: quest.E17},
    {key: 18, name: quest.N18, url:card18, explain: quest.E18},
    {key: 19, name: quest.N19, url:card19, explain: quest.E19},
    {key: 20, name: quest.N20, url:card20, explain: quest.E20},
    {key: 21, name: quest.N21, url:card21, explain: quest.E21},
    {key: 22, name: quest.N22, url:card22, explain: quest.E22},
    {key: 23, name: quest.N23, url:card23, explain: quest.E23},
    {key: 24, name: quest.N24, url:card24, explain: quest.E24},
    {key: 25, name: quest.N25, url:card25, explain: quest.E25},
    {key: 26, name: quest.N26, url:card26, explain: quest.E26},
    {key: 27, name: quest.N27, url:card27, explain: quest.E27},
  ];
  
  const DATA = [
    {key: 1,factor:quest.F1, title: quest.Q1, ans1: quest.AnsA1,ans2:quest.AnsB1,score1:quest.A1,score2:quest.B1},
    {key: 2,factor:quest.F2, title: quest.Q2, ans1: quest.AnsA2,ans2:quest.AnsB2,score1:quest.A2,score2:quest.B2},
    {key: 3,factor:quest.F3, title: quest.Q3, ans1: quest.AnsA3,ans2:quest.AnsB3,score1:quest.A3,score2:quest.B3},
    {key: 4,factor:quest.F4, title: quest.Q4, ans1: quest.AnsA4,ans2:quest.AnsB4,score1:quest.A4,score2:quest.B4},
    {key: 5,factor:quest.F5, title: quest.Q5, ans1: quest.AnsA5,ans2:quest.AnsB5,score1:quest.A5,score2:quest.B5},
    {key: 6,factor:quest.F6, title: quest.Q6, ans1: quest.AnsA6,ans2:quest.AnsB6,score1:quest.A6,score2:quest.B6},
    {key: 7,factor:quest.F7, title: quest.Q7, ans1: quest.AnsA7,ans2:quest.AnsB7,score1:quest.A7,score2:quest.B7},
    {key: 8,factor:quest.F8, title: quest.Q8, ans1: quest.AnsA8,ans2:quest.AnsB8,score1:quest.A8,score2:quest.B8},
    {key: 9,factor:quest.F9, title: quest.Q9, ans1: quest.AnsA9,ans2:quest.AnsB9,score1:quest.A9,score2:quest.B9},
    {key: 10,factor:quest.F10, title: quest.Q10, ans1: quest.AnsA10,ans2:quest.AnsB10,score1:quest.A10,score2:quest.B10},
  
  ];

export {
    NextQuestion,
    DATA,
    OUTCOME
  }