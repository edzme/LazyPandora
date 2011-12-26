didSetup = false;


function lazySetup(popupElement)
{
    if(didSetup){
        return;
    }
    didSetup = true;    
	document.body.appendChild(popupElement);
 }


function fireEvent(element,event){
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true );
    return!element.dispatchEvent(evt);
}



if(!localStorage.totalClicks){
    localStorage.totalClicks = 0;
}
var countClicks = localStorage.totalClicks;
var afterFirstPop = 0;

function clickIfExists(){
    //switch listening to an element that exists all the time with this line
    //var listening = document.getElementsByClassName("pauseButton")[0];    
    var listening = document.getElementsByClassName("still_listening button btn_bg")[0];
    

    if (afterFirstPop != 1){
        showPop();
        afterFirstPop = 1;
    }
    



    if(listening) {        
        //if it exists increment
        if (localStorage.totalClicks){
            localStorage.totalClicks= new Number(localStorage.totalClicks)+1;
            showAgain();
        }
        else {
            localStorage.totalClicks=1;
        }
        countClicks = localStorage.totalClicks;
        
        fireEvent(listening,'click');
        setCountInAlert(); 
        
        //Run showPop only if we havent run it yet
        if (afterFirstPop != 1){
            showPop();
            afterFirstPop = 1;
        }
    }
}


//showPop displays the popup.
function showPop(){
    (function(d) {
        // make the popup element
        var popup = d.createElement('div'),
        
            setStyle = function(el, styles) {
                for(var i in styles) {
                    el.style[i] = styles[i];
                }
            }
        popup.setAttribute('id', 'lazyPopup');
        // set the style of the popup element
        setStyle(popup, {visibility: 'visible', position: 'fixed', bottom: '10px', right: '10px', padding: '10px', backgroundColor: 'black', zIndex:510000});
		var html = [];
            html.push('<div id="box" style="text-align:center; font-size:14px;border-radius:50px;">',
            '<input type="button" onclick="document.getElementById(\'lazyPopup\').style.visibility=\'hidden\'" style="float:right;font-size:9px;font-color:black;background:grey;border-radius:5px;" value="close" />',
                        'Your music automatically continued <span id="thecount">' + countClicks +'</span> times.',
                        '<div style="margin-top: 10px">Be lazy and support Lazy Pandora Listener: ',
                        '<a target="_blank" href="http://www.facebook.com/sharer.php?u=http://bit.ly/tLQeKj&t=Lazy Pandora for Chrome">Share with friends</a>',
                        '</div>',
                      '</div>');
        console.log('this many ' + countClicks)
        popup.innerHTML = html.join('');
        lazySetup(popup);
    })(document);   
};


//Sets the changing count in the div.. its called after it increments
function setCountInAlert(){
    document.getElementById('thecount').innerHTML = countClicks;
}

//Makes the div visible again after you click close
function showAgain(){
    document.getElementById('lazyPopup').style.visibility='visible';
}


//Check every 5 seconds and click, then show the popup that we clicked
setInterval(clickIfExists,5000);