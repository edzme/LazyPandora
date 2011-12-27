(function(d) {
    var $ = function(id) {
        if(id instanceof Element) {
            return id;
        } else {
            return d.getElementById(id) || document.createElement('div');
        }
    },
    $c = function(name) {
        return d.getElementsByClassName(name);
    },
    $e = function(id, type, fn) {
        $(id).addEventListener(type, fn, false);
    },
    didSetup = false;
    
    function init(popupElement)
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
    
    
    var afterFirstPop = 0;
    var totalReloads = 0;
    
    function clickIfExists(){
        //switch listening to an element that exists all the time with this line
        //var listening = $c("pauseButton")[0];    
        var listening = $c("still_listening button btn_bg")[0];
        
        //Check if an ad exists at the same time. if so reload
        videoCheck();
    
        if (afterFirstPop != 1){
            showPop();
            afterFirstPop = 1;
        }
    
    
        if(listening) {        
            // Increment Clicks
            localStorage.totalClicks= (parseInt(localStorage.totalClicks) || 0) + 1;
            showAgain();
            
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
            setStyle(popup, {visibility: 'visible', position: 'fixed', bottom: '10px', right: '10px', padding: '10px', zIndex:510000});
    		var html = [];
                html.push('<div id="box" style="text-align:center; font-size:14px;border-radius:10px;padding:10px;background-color:black;">',
                '<input type="button" id="closeButton" style="float:right;font-size:9px;font-color:black;background:grey;border-radius:5px;" value="close" />',
                            'Your music automatically continued <span id="thecount">' + (localStorage.totalClicks || 0) +'</span> times.',
                            '<div style="margin-top: 10px">Be lazy and support Lazy Pandora Listener: ',
                            '<a target="_blank" href="http://www.facebook.com/sharer.php?u=http://bit.ly/tLQeKj&t=Lazy Pandora for Chrome">Share with friends</a>',
                            '</div>',
                          '</div>');
            console.log('this many ' + (localStorage.totalClicks || 0))
            popup.innerHTML = html.join('');
            init(popup);
            $e('closeButton', 'click', function() {
                $('lazyPopup').style.visibility= 'hidden';
            });
        })(document);   
    };
    
    
    //Sets the changing count in the div.. its called after it increments
    function setCountInAlert(){
        $('thecount').innerHTML = (localStorage.totalClicks || 0);
    }
    
    //Makes the div visible again after you click close
    function showAgain(){
        $('lazyPopup').style.visibility='visible';
    }
    
    //Check and reload if video player
    function videoCheck(){
        try {
        var videoPlayer = $("videoPlayer");
        if (videoPlayer) {
            if (videoPlayer.offsetTop != 0){
             window.location.reload();
            }       
        } else {
        }
        } catch(e) {
            console.log(e);
        }
    }
    
    //Check every 3 seconds and click, then show the popup that we clicked
    setInterval(clickIfExists,3000);
})(document);