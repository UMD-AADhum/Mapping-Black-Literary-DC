console.log("falling-text is connected!")

let fallTime = null;

// >>> fallingText function

function fallingText() {
// grab HTML elements to be moved
    let fallName = document.getElementById("divChiDataName");
    let fallComp = document.getElementById("divChiDataComp");

// set starting element position
    let position = 0;

// set timing for element movement
    clearInterval(fallTime);
    fallTime = setInterval(fall, 10);

// move elements according to timing
    function fall() {
        if (position == 500) {
            clearInterval(fallTime);
            fallTime = setInterval(fall, 10);
            position = 0
        }   
        else {
            position++;
            fallName.style.top = position + 'px'; 
            fallComp.style.left = position + 'px';
        }
    }
};

// button click event
