filterSelection("all")
function filterSelection(c) {
  un_op_filter()
  var x, i;
  x = document.getElementsByClassName("item");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
  }
}

function AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1); 
    }
  }
  element.className = arr1.join(" ");
}

var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

function unfilter(){
  var x, i;
  x = document.getElementsByClassName("item");
  for (i = 0; i < x.length; i++) {
    AddClass(x[i], "show");
  }
}

function img_bright() {
  unfilter();
  var image = document.querySelectorAll("img");
  for (let i =0; i<image.length;i++){ image[i].style.filter="brightness(150%)"; };
}

function img_blur() {
  unfilter();
  var image = document.querySelectorAll("img");
  for (let i =0; i<image.length;i++){ image[i].style.filter="blur(4px)"; };
}

function img_contrast() {
  unfilter();
  var image = document.querySelectorAll("img");
  for (let i =0; i<image.length;i++){ image[i].style.filter="contrast(150%)"; };
}

function img_gray() {
  unfilter();
  var image = document.querySelectorAll("img");
  for (let i =0; i<image.length;i++){ image[i].style.filter="grayscale(80%)"; };
}


function img_invert() {
  unfilter();
  var image = document.querySelectorAll("img");
  for (let i =0; i<image.length;i++){ image[i].style.filter="invert(70%)"; };
}

function img_opacity() {
  unfilter();
  var image = document.querySelectorAll("img");
  for (let i =0; i<image.length;i++){ image[i].style.filter="opacity(80%)"; };
}

function img_saturate() {
  unfilter();
  var image = document.querySelectorAll("img");
  for (let i =0; i<image.length;i++){ image[i].style.filter="saturate(50%)"; };
}

function img_sepia() {
  unfilter();
  var image = document.querySelectorAll("img");
  for (let i =0; i<image.length;i++){ 
    image[i].style.filter="sepia(1)"; };
}

function un_op_filter() {
  var image = document.querySelectorAll("img");
  for (let i =0; i<image.length;i++)
  {
    image[i].style.filter="brightness(1)"; 
    image[i].style.filter="blur(0)"; 
    image[i].style.filter="contrast(1)"; 
    image[i].style.filter="grayscale(0)";
    image[i].style.filter="invert(0)"; 
    image[i].style.filter="opacity(1)"; 
    image[i].style.filter="saturate(1)"; 
    image[i].style.filter="sepia(0)"; 
  };
}


function img_red() {
  unfilter();
  var images = document.querySelectorAll("img");
  changered(images)
}
function img_green() {
  unfilter();
  var images = document.querySelectorAll("img");
  changegreen(images)
}

function img_blue() {
  unfilter();
  var images = document.querySelectorAll("img");
  changeblue(images)
}


function changered(images) 
{ 
  for (let i = 0; i < images.length; i++) 
  { 
    const canvas = document.createElement('canvas'); 
    const context = canvas.getContext('2d'); 
    canvas.width = images[i].width; 
    canvas.height = images[i].height; 
    context.drawImage(images[i], 0, 0,canvas.width, canvas.height); 
    const imagedata = context.getImageData(0, 0, canvas.width, canvas.height); 
    const data = imagedata.data; 
    for (let j = 0; j < data.length; j += 4) 
    { 
      data[j] = data[j]+data[j+1]+data[j+2]; 

    } 
    context.putImageData(imagedata, 0, 0); 
    images[i].src = canvas.toDataURL(); 
  } 
}
function changegreen(images) 
{ 
  for (let i = 0; i < images.length; i++) 
  { 
    const canvas = document.createElement('canvas'); 
    const context = canvas.getContext('2d'); 
    canvas.width = images[i].width; 
    canvas.height = images[i].height; 
    context.drawImage(images[i], 0, 0, canvas.width, canvas.height); 
    const imagedata = context.getImageData(0, 0, canvas.width, canvas.height); 
    const data = imagedata.data; 
    for (let j = 0; j < data.length; j += 4) 
    { data[j+1] = data[j]+data[j+1]+data[j+2]; 
    } 
    context.putImageData(imagedata, 0, 0); 
    images[i].src = canvas.toDataURL(); 
  } 
}
function changeblue(images) 
{ 
  for (let i = 0; i < images.length; i++) 
  { 
    const canvas = document.createElement('canvas'); 
    const context = canvas.getContext('2d'); 
    canvas.width = images[i].width; 
    canvas.height = images[i].height; 
    context.drawImage(images[i],0,0, canvas.width, canvas.height); 
    const imagedata = context.getImageData(0,0, canvas.width, canvas.height); 
    const data = imagedata.data; 
    for (let j = 0; j < data.length; j += 4) 
    { data[j+2] = data[j]+data[j+1]+data[j+2]; 
    } 
    context.putImageData(imagedata, 0, 0); 
    images[i].src = canvas.toDataURL(); 
  } 
}

function img_qr() {
  var images = document.querySelectorAll('.photo');
  for (var i = 0; i < images.length; i++) {
    var img = images[i];
    var qr = new QRCode(img, {
      text: img.src,
      width: 200,
      height: 200,
    });
  img.src = qr._el.childNodes[0].toDataURL();
  }
}

function img_dup() {
  var images = document.querySelectorAll("img");
  for (let i = 0; i < images.length; i++) 
  {
    const currentImage = images[i];
    const newImage = document.createElement('img');
    newImage.src = currentImage.src;
    newImage.width=200;
    newImage.height=400;
    const galleryContainer = document.querySelector('.grid-wrap');
    galleryContainer.appendChild(newImage);
    
  }
}

function img_avatar() {
  var image = document.querySelectorAll("img");
  for (let i =0; i<image.length;i++){ 
    image[i].style.borderRadius="50%";
    image[i].style.width="70%"; 
    image[i].style.height="70%";
  };
}