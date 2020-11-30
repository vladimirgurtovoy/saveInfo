let shift=1;
let keyword;
const caesarBtn=document.querySelector("button#caesarBtn");
const vizhBtn=document.querySelector("button#vizhBtn");
const inputString=document.querySelector("#CodeString");
const inputStringV=document.querySelector("#CodeStringV");
const inputShift=document.querySelector("#shift");
const inputKeyWord=document.querySelector("#keyWord");
const inputRadios=document.getElementsByName("crypt");
const inputRadiosV=document.getElementsByName("cryptV");
let radioValue;
let keys=new Array();
let string="вова";
let arrString="";
let result;
let letters=['а','б','в','г','д','е',/*'ё',*/'ж','з','и','й','к','л','м','н','о','п','р',
'с','т','у','ф','х','ц','ч','ш','щ','ь','ы','ъ','э','ю','я'];

caesarBtn.addEventListener('click', e=> {
    arrString="";
    inputRadios.forEach(e=>{
        if(e.checked) {
            radioValue=e.value;
        }
    });
    e.preventDefault();
    string=inputString.value;
    shift=parseInt(inputShift.value,10);
    Caesar();
});


vizhBtn.addEventListener('click', e=> {
    arrString="";
    inputRadiosV.forEach(e=>{
        if(e.checked) {
            radioValue=e.value;
        }
    });
    e.preventDefault();
    string=inputStringV.value;
    keyWord=inputKeyWord.value;
    Vigenere();
});
let word=false;

function Caesar() {
    if(radioValue==="encrypt") {
        for(let i=0;i<string.length;i++) {
            word=false;
            for(let j=0;j<letters.length;j++) {
                if(string[i]===letters[j]) {
                    if(j+shift>31) {
                        arrString=arrString +(letters[(j+shift)-32]);
                        word=true;
                        break;
                    } else {
                        arrString=arrString +(letters[j+shift]);
                        word=true;
                        break;
                    }
                }
            }
            if(word===false) {
                arrString=arrString +(string[i]);
            }
        }
    } else {
        for(let i=0;i<string.length;i++) {
            word=false;
            for(let j=0;j<letters.length;j++) {
                if(string[i]===letters[j]) {
                    if(j-shift<0) {
                        arrString=arrString +(letters[(j-shift)+32]);
                        word=true;
                        break;
                    } else {
                        arrString=arrString +(letters[j-shift]);
                        word=true;
                        break;
                    }
                }
            }
            if(word===false) {
                arrString=arrString +(string[i]);
            }
        }
    }
    document.querySelector("h3#caes").innerHTML="Результат: "+arrString;
    console.log(arrString);
}




function Vigenere() {
    let keyIndex=0;
    if(radioValue==="encrypt") {
        for(let i=0;i<string.length;i++) {
            word=false;
            for(let j=0;j<letters.length;j++) {
                if(keyIndex===keyWord.length) {
                    keyIndex=0;
                }
                for(let m=0;m<letters.length;m++) {
                    if(keyWord[keyIndex]===letters[m]) {
                        shift=m;
                        break;
                    } else {
                        shift=0;
                    }
                }
                if(string[i]===letters[j]) {
                    if(j+shift>31) {
                        arrString=arrString +(letters[(j+shift)-32]);
                        word=true;
                        keyIndex++;
                        keys.push(keyWord[keyIndex-1]);
                        break;
                    } else {
                        arrString=arrString +(letters[j+shift]);
                        word=true;
                        keyIndex++;
                        keys.push(keyWord[keyIndex-1]);
                        break;
                    }
                }
            }
            if(word===false) {
                arrString=arrString +(string[i]);
                keys.push(" ");
            }
        }
    } else {
        for(let i=0;i<string.length;i++) {
            word=false;
            for(let j=0;j<letters.length;j++) {
                if(keyIndex===keyWord.length) {
                    keyIndex=0;
                }
                for(let m=0;m<letters.length;m++) {
                    if(keyWord[keyIndex]===letters[m]) {
                        shift=m;
                        break;
                    } else {
                        shift=0;
                    }
                }
                if(string[i]===letters[j]) {
                    if(j-shift<0) {
                        // console.log("сдвиг=",j+shift,j,shift);
                        arrString=arrString +(letters[(j-shift)+32]);
                        word=true;
                        keyIndex++;
                        keys.push(keyWord[keyIndex-1]);
                        break;
                    } else {
                        // console.log("сдвиг=",j+shift,j,shift);
                        arrString=arrString +letters[j-shift];
                        word=true;
                        keyIndex++;
                        keys.push(keyWord[keyIndex-1]);
                        break;
                    }
                }
            }
            if(word===false) {
                arrString=arrString +(string[i]);
                keys.push(" ");
            }
        }
    }

    document.querySelector("h3#vig").innerHTML="Результат: "+arrString;
    console.log(arrString);
    console.log(keys);
}