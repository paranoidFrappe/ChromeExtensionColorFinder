
const body = document.querySelector("body");
const aPopUpBox = document.createElement('div');
aPopUpBox.setAttribute('id', 'box-of-color')
aPopUpBox.style.width = "380px";
aPopUpBox.style.height = "300px";
aPopUpBox.style.backgroundColor = "rgba(150, 50, 150, 0.15)";
aPopUpBox.style.color = "rgba(50, 150, 150, 0.75)";
aPopUpBox.style.fontSize = "20px";
aPopUpBox.style.fontWeight = "700";
aPopUpBox.style.position = "fixed";
aPopUpBox.style.zIndex = "2147483647";
aPopUpBox.style.top = '0';
aPopUpBox.style.left = '150px';
aPopUpBox.style.padding = '10px 10px 10px 50px';
aPopUpBox.style.borderRadius = "10px";
body.appendChild(aPopUpBox);

const dancer01 = document.createElement("img");
// dancer01.src = "https://imgs.qiubiaoqing.com/qiubiaoqing/imgs/6283f44b02a5bTte.gif";
dancer01.src = chrome.extension.getURL("Dancer001.gif");
dancer01.style.width = "220px";
dancer01.style.top = '600px';
dancer01.style.right = '10px';
dancer01.style.zIndex = "2147483640";
dancer01.style.position = "fixed";
body.appendChild(dancer01);




document.addEventListener("mouseover", function (event) {
    
  varColor = getCssColor(event.target)
  let aaa = event.target;
  let ccc = window.getComputedStyle(aaa).getPropertyValue('color');
  // alert(ccc);
  let bbb = window.getComputedStyle(aaa).getPropertyValue('background-color');
  // alert(bbb);
  // console.log(checkingIfItIsRGBAColor(ccc));
  // console.log(checkingIfItIsRGBColor(ccc));
  // console.log(checkingIfItIsHexColor(ccc));
  whatColorIsIt(ccc);
  whatColorIsIt2(bbb);
  aPopUpBox.innerHTML = "COLOR: " + "<br>" +"rgbA: " + rgbaColor + "<br>" + "HEX: " + hexColor + "<br>" + "Background Color: " + "<br>" + "rgbA: " + rgbaColorBG + "<br>" + "HEX: " + hexColorBG;

})


//if it is ok to drag... 
let ItIsOkToDrag = false;
let locationOfInput = {x:0, y:0};
aPopUpBox.addEventListener('mousedown', (event)=>{
  ItIsOkToDrag = true;
  locationOfInput.x = event.clientX - aPopUpBox.offsetLeft;
  locationOfInput.y = event.clientY - aPopUpBox.offsetTop;
  aPopUpBox.style.cursor = "grabbing";
});

aPopUpBox.addEventListener('mouseup', ()=>{
  ItIsOkToDrag = false;
  aPopUpBox.style.cursor = "grab";
});

aPopUpBox.addEventListener('mousemove', (event) => {
  if(ItIsOkToDrag === true){
    aPopUpBox.style.left = event.clientX - locationOfInput.x + "px";
    aPopUpBox.style.top = event.clientY - locationOfInput.y + "px";
    aPopUpBox.style.cursor = "grabbing";
  }
});


let varColor = "";

function getCssColor (input){
  let result = input.style.color;
  return result;
}




let rgbaColor;
let hexColor;
let rgbaColorBG;
let hexColorBG;

function whatColorIsIt(input){
  if (checkingIfItIsHexColor(input)){
    hexColor = input;
    rgbaColor = hexColorToRgbaColor(input);
  }
  else if (checkingIfItIsRGBAColor(input)){
    rgbaColor = input;
    hexColor = RgbaColorToHexColor(input);
  }
  else if (checkingIfItIsRGBColor(input)){   //rgb(155, 200, 250)   ===>  //rgba(155, 200, 250 , 1)
    // rgbColor = input;
    rgbaColor = "rgba" + input.substring(3, input.length - 1) + ", 1)";
    hexColor = RgbaColorToHexColor(rgbaColor);
  }
}

function whatColorIsIt2(input){
  if (checkingIfItIsHexColor(input)){
    hexColorBG = input;
    rgbaColorBG = hexColorToRgbaColor(input);
  }
  else if (checkingIfItIsRGBAColor(input)){
    rgbaColorBG = input;
    hexColorBG = RgbaColorToHexColor(input);
  }
  else if (checkingIfItIsRGBColor(input)){   //rgb(155, 200, 250)   ===>  //rgba(155, 200, 250 , 1)
    // rgbColor = input;
    rgbaColorBG = "rgba" + input.substring(3, input.length - 1) + ", 1)";
    hexColorBG = RgbaColorToHexColor(rgbaColorBG);
  }
}





function checkingIfItIsHexColor(input){
  if(/^#(([\dA-Fa-f]{3}){1,2}|([\dA-Fa-f]{4}){1,2})$/.test(input)){
    return true;
  }
}
function checkingIfItIsRGBAColor(input){
  if((/^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d?\.?\d+)\)$/i).test(input)){
    return true;
  }
}
function checkingIfItIsRGBColor(input){
  if((/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/i).test(input)){
    return true;
  }
}



//~${}, 
// console.log(checkingIfItIsRGBAColor(rgba(255, 0, 0, 0.5)));



//////////Transfer the color from HEX color code to  RGBA code :D~~
function hexColorToRgbaColor(hexCode) {
  let colorArray = hexCode.substring(1).split('');
  let newColorArray = [];
  switch (colorArray.length){
    case 3:   
      newColorArray.push(colorArray[0] + colorArray[0]);
      newColorArray.push(colorArray[1] + colorArray[1]);
      newColorArray.push(colorArray[2] + colorArray[2]);
      newColorArray.push("ff");
      break;
    case 4:
      newColorArray.push(colorArray[0] + colorArray[0]);
      newColorArray.push(colorArray[1] + colorArray[1]);
      newColorArray.push(colorArray[2] + colorArray[2]);
      newColorArray.push(colorArray[3] + colorArray[3]);
      break;
    case 6:
      newColorArray.push(colorArray[0] + colorArray[1]);
      newColorArray.push(colorArray[2] + colorArray[3]);
      newColorArray.push(colorArray[4] + colorArray[5]);
      newColorArray.push("ff");
      break;
    case 8:
      newColorArray.push(colorArray[0] + colorArray[1]);
      newColorArray.push(colorArray[2] + colorArray[3]);
      newColorArray.push(colorArray[4] + colorArray[5]);
      newColorArray.push(colorArray[6] + colorArray[7]);
      break;
  }
    let str = newColorArray.map((eachChar) => parseInt(eachChar, 16).toString());
    str[3] = (Math.round((parseInt(str[3], 10)/255)*100)/100).toString();

    return `rgba(${str[0]}, ${str[1]}, ${str[2]}, ${str[3]})`;
}
function RgbaColorToHexColor(rgbaCode){//rgba(200, 100, 222, 0.5)
  let colorCode = rgbaCode.substring(rgbaCode.indexOf('(') + 1, rgbaCode.lastIndexOf(')'));
  colorCode = colorCode.split(",");  //transfer it to an array
 
  let variableRed = parseInt(colorCode[0], 10).toString(16).padStart(2, "0");
  let variableGreen = parseInt(colorCode[1], 10).toString(16).padStart(2, "0");
  let variableBlue = parseInt(colorCode[2], 10).toString(16).padStart(2, "0");

  let hexCode = "#" + variableRed + variableGreen + variableBlue;
  return hexCode;
}







