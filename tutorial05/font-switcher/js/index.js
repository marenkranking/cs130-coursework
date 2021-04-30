const makeBigger = () => {
   document.querySelector('.content').style.fontSize = "1.6em";
};

const makeSmaller = () => {
   document.querySelector('.content').style.fontSize = "1.4em";
};


document.querySelector('.a1').onclick = makeBigger;
document.querySelector('.a2').onclick = makeSmaller;
