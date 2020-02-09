// GRAB COLOR BLOCKS HTML ELEMENT
var colors = document.querySelectorAll('.color');

// GENERATE RANDOM COLOR
function generateRandomColor(block){
    var red = Math.floor(Math.random()*255);
    var green = Math.floor(Math.random()*255);
    var blue = Math.floor(Math.random()*255);
    return ('rgb(' + red + ',' + green + ',' + blue + ')');
}

// CHOOSE DIFFICULTY AND INITIATE PARAMETERS
var diff = 'hard';
var blockNum = 6;
generateHardBlocks();
// grabRGB();
randomRgb = grabRGB();

// Grab H2 Element for guessed RGB
var h2rgb = document.getElementById('guessThisRgb');
h2rgb.textContent = colors[randomRgb].textContent;
console.log(randomRgb);

var level = document.getElementsByClassName('level');

// HIGHLIGHT HARD AS DEFAULT DIFFICULTY
level[1].classList.add('chosen-diff');

/////// FIX THIS - randomRGB NOT CHANGING AFTER CHOSEN DIFF

// CHANGE DIFF CLICKING ON LEVEL
for (i=0; i<2; i++){
    level[i].addEventListener('click',function(){
        diff = this.getAttribute('value');
        this.classList.add('chosen-diff');
        // CHANGE HIGHLIGHT BASED ON LEVEL SELECTED
        if (diff === 'hard'){
            document.getElementById('easy').classList.remove('chosen-diff');
            blockNum = 6;
            generateHardBlocks();
            showOnHard();
            randomRgb = grabRGB();
            console.log(randomRgb);
            // Prints on screen the RGB to be guessed
            h2rgb.textContent = colors[randomRgb].textContent;
        }
        if (diff === 'easy'){
            document.getElementById('hard').classList.remove('chosen-diff');
            hideOnEasy();
            blockNum = 3;
            generateEasyBlocks();
            randomRgb = grabRGB();
            console.log(randomRgb);
            // Prints on screen the RGB to be guessed
            h2rgb.textContent = colors[randomRgb].textContent;
        }  
        })
                }      

// REMOVE BLOCKS BASED ON DIFF

function hideOnEasy(){
    for (i=3; i<6; i++){
        console.log('HideOnEasy');
        colors[i].setAttribute('hidden','true');
    }
}


function showOnHard(){
    for (i=3; i<6; i++){
        console.log('ShowOnHard');
        colors[i].removeAttribute('hidden');
    }
}

///////////////////////////////////////////////////////////////////////////

// SET RGB COLOR TO BE GUESSED

// Grab RGB to be guessed, 0 to 5 - index for color blocks
function grabRGB(){
    if (diff === 'hard'){
        console.log('LOOP HARD');
        return Math.floor(Math.random() * 6);
    }
    if (diff === 'easy'){
        // 
        console.log('LOOP EASY');
        return Math.floor(Math.random() * 3);
    }
}

///////////////////////////////////////////////////////////////////////////

// APPLY RANDOM COLOR TO BLOCK
// EASY MODE
function generateEasyBlocks(){
for (i=0; i<3; i++){
    var rgb = generateRandomColor(colors[i]);
    colors[i].style.background = rgb;
    colors[i].textContent = rgb;
    colors[i].classList.add('hide');  
}};

// HARD MODE
function generateHardBlocks(){
    for (i=0; i<6; i++){
        var rgb = generateRandomColor(colors[i]);
        colors[i].style.background = rgb;
        colors[i].textContent = rgb;
        colors[i].classList.add('hide');  
}};

// APPLY HIGHLIGHT TO BLOCKS WHEN MOUSE OVER
for (i=0; i<colors.length; i++){
    colors[i].addEventListener('mouseover',function(){
        this.classList.add('highlight');
    })
};
// REMOVE HIGHLIGHT FROM BLOCKS WHEN MOUSE OUT
for (i=0; i<colors.length; i++){
    colors[i].addEventListener('mouseout',function(){
        this.classList.remove('highlight');
    })
};

// CHECK IF GUESS IS RIGHT

var result = document.getElementById('result');

for (i=0; i<colors.length; i++){
    colors[i].addEventListener('click',function(){
        if ((randomRgb + 1) === Number(this.getAttribute('value'))){
            console.log('YOU GUESSED RIGHT!');
            result.innerHTML = '<strong>CORRECT!</strong>';
            // result.setAttribute('hidden','false');
            this.classList.remove('hide');
        }
        else{
            result.innerHTML = '<strong>WRONG!</strong>';
            // result.setAttribute('hidden','false');
        }
    })
}
