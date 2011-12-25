function fireEvent(element,event){
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true );
    return!element.dispatchEvent(evt);
}

var countClicks = localStorage.totalClicks;


function clickIfExists(){
    var listening = document.getElementsByClassName("still_listening button btn_bg")[0];  
    if(listening){
        fireEvent(listening,'click');
        console.log('Booyaa');
        if (localStorage.totalClicks)
          {
          localStorage.totalClicks= new Number(localStorage.totalClicks)+1;
          }
        else
          {
          localStorage.totalClicks=1;
          }
        countClicks = localStorage.totalClicks;
        console.log(countClicks);
    }
}
//checks every 5s
setInterval(clickIfExists,5000);


//showPop displays the popup.. we need to send it a variable
function showPop(){
    (function(d) {
        
        // make the popup element
        var popup = d.createElement('div'),
            setStyle = function(el, styles) {
                for(var i in styles) {
                    el.style[i] = styles[i];
                }
            }
        
        // set the style of the popup element
        setStyle(popup, {position: 'fixed', bottom: '10px', right: '10px', padding: '10px', backgroundColor: 'black', zIndex:510000});
        var html = [];
            html.push('<div style="text-align:center">',
                        'Your music was continued ' + countClicks +' times.',
                        '<div style="margin-top: 10px">Be lazy and support Lazy Pandora Listener:',
                        'Buy stuff on ',
                        '<a target="_blank" href="http://amazon.com/?_encoding=UTF8&tag=accesfinde-20&linkCode=ur2&camp=1789&creative=9325">Amazon!</a>',
                        '<img src="http://www.assoc-amazon.com/e/ir?t=accesfinde-20&l=ur2&o=1" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
                        '</div>',
                      '</div>');
        
        popup.innerHTML = html.join('');
        
        document.body.appendChild(popup);
    })(document);    
};


//displays the popup after 10s
setInterval(showPop, 10000);