function fireEvent(element,event){
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true );
    return!element.dispatchEvent(evt);
}

localStorage.totalClicks;

function clickIfExists(){
    console.log('checking if element exists');
    //switch listening to an element that exists all the time with this line
    //var listening = document.getElementsByClassName("skinContainer")[0];    
    var listening = document.getElementsByClassName("still_listening button btn_bg")[0];
    
    
    if(listening){
        console.log('Booyaa');
        
        //if it exists increment
        if (localStorage.totalClicks)
          {
          localStorage.totalClicks= new Number(localStorage.totalClicks)+1;
          console.log('logged a click!');
          }
        else
          {
          localStorage.totalClicks=1;
          console.log('made it =1');
          }
        countClicks = localStorage.totalClicks;
        console.log(countClicks);
        
        fireEvent(listening,'click');
    }
}
//checks every 5s
setInterval(clickIfExists,5000);


//showPop displays the popup.. we need to send it a variable?
function showPop(){
    (function(d) {
        
        // make the popup element
        var popup = d.createElement('div'),
            setStyle = function(el, styles) {
                for(var i in styles) {
                    el.style[i] = styles[i];
                }
            }
        console.log('createded popup');
        // set the style of the popup element
        setStyle(popup, {position: 'fixed', bottom: '10px', right: '10px', padding: '10px', backgroundColor: 'black', zIndex:510000});
        var html = [];
            html.push('<div style="text-align:center; font-size:14px;">',
                        '<div id="closeButton" style="float:right;font-size:9px;padding:2px;background:white;">close</div>',
                        'Your music automatically continued ' + countClicks +' times.',
                        '<div style="margin-top: 10px">Be lazy and support Lazy Pandora Listener: ',
                        '<a target="_blank" href="http://www.facebook.com/sharer.php?u=http://bit.ly/tLQeKj&t=Lazy Pandora for Chrome">Share with friends</a>',
                        '</div>',
                      '</div>');
        console.log('pushed');
        popup.innerHTML = html.join('');
        
        document.body.appendChild(popup);
    })(document);    
    
    //Start closebutton
    console.log('got to closebutton');
    var closeButton = document.getElementById('closeButton');
    closeButton.addEventListener("click", function(){
        alert("worked");
    }, true);


};

setInterval(showPop, 3000);



//displays the popup after 10s








