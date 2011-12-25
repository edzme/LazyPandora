function fireEvent(element,event){
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true );
    return!element.dispatchEvent(evt);
}

var countClicks = null;

function clickIfExists(){
    var listening = document.getElementsByClassName("buttons")[0];  
    console.log('did var listening');  
    if(listening){
        fireEvent(listening,'click');
        console.log('Booyaa');
        countClicks++;
    }
}
setInterval(clickIfExists,5000);


//showPop displays the popup.. we need to send it a variable
function showPop(){
    (function(d) {
    
    console.log('function d');
    
        // make the popup element
        var popup = d.createElement('div'),
            setStyle = function(el, styles) {
                for(var i in styles) {
                    el.style[i] = styles[i];
                }
            }
        
        // set the style of the popup element
        setStyle(popup, {position: 'fixed', top: '10px', right: '10px', padding: '10px', backgroundColor: '#fff', zIndex: 1000});
        
        var html = [];
            html.push('<div>',
                        'Your music continued X times and Y videos skipped for you by Lazy Pandora Listener.',
                        '<div style="margin-top: 10px">Buy Amazon!</div>',
                      '</div>');
        
        popup.innerHTML = html.join('');
        
        document.body.appendChild(popup);
    })(document);    
}
//displays the popup after 1000ms
setTimeout(showPop, 1000)