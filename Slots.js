let slot_screen = document.getElementById("slot-screen");
let reel = document.getElementsByClassName("reel");
let reels = document.getElementsByClassName("reels");
let stop_button = document.getElementsByClassName("stop-button");
let start_button = document.getElementById("start-button");

let sec = 100; //reels speed
let stopReelFlag=[]; //reel stop flag
let reelCounts=[]; //which symbol to position
let slotFrameHeight; //frame size
let slotReelHeight; //overall symbol size
let slotReelitemHeight; //size of one symbol
let slotReelStartHeight; //initial image value

//initialization
let slot = {
    init:function(){
        stopReelFlag[0] = stopReelFlag[1] = stopReelFlag[2] = false;
        reelCounts[0] = reelCounts[1] = reelCounts[2] = 0;
    },

    //start button
    start:function(){
        slot.init();
        for(let index = 0; index < 3; index++){
            slot.animation(index);
        }
    },

    //stop button
    stop:function(i){
        stopReelFlag[i] = true
        if(stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]){
            start_button.removeAttribute("disabled");
        }
    },

    //set first position
    resetLocationInfo:function(){
        slotFrameHeight = slot_screen.offsetHeight;
        slotReelHeight = reels[0].offsetHeight;
        slotReelitemHeight = reel[0].offsetHeight;
        slotReelStartHeight = -slotReelHeight;
        slotReelStartHeight += slotFrameHeight -(slotFrameHeight /2) + slotReelitemHeight * 3 / 2;
        for(let i = 0; i < reels>length; i++){
            reels[i].style.top = String(slotReelStartHeight) + "px";
        }
    },

    //reel spinning
    animation:function(index){
        if(reelCounts[index] >= 8){
            reelCounts[index] = 0;
        }

        $(".reels").eq(index).animate({
            "top":slotReelStartHeight + (reelCounts[index] * slotReelitemHeight)
        },

        {
            duration:sec,
            easing:"linear",
            complete:function(){
                if(stopReelFlag[index]){
                    return;
                }
                reelCounts[index]++;
                slot.animation(index);
            }
        });
    },
};

window.onload = function(){
    slot.init();
    slot.resetLocationInfo();
    start_button.addEventListener("click", function(e){
        e.target.setAttribute("disabled", true)
        slot.start();
        for(let i = 0; i < stop_button.length; i++){
            stop_button[i].removeAttribute("disabled");
        }
    });

    for(let i = 0; i < stop_button.length; i++){
        stop_button[i].addEventListener("click",function(e){
            slot.stop(parseInt(e.target.getAttribute("data-val"), 10));

        })
    }
};
