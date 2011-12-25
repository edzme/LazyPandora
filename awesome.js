function fireEvent(element,event){
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true );
    return!element.dispatchEvent(evt);
}

function clickIfExists(){
    var listening = document.getElementsByClassName("still_listening button btn_bg")[0];
    if(listening){
        fireEvent(listening,'click');
        console.log('Booyaa');
    }
}
setInterval(clickIfExists,5000);
