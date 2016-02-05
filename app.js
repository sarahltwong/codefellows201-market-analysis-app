var images = [];

var imageName = [
  "Bag",
  "Banana",
  "Boots",
  "Chair",
  "Ctulhu",
  "Dragon",
  "Pen",
  "Scissors",
  "Shark",
  "Baby Broom",
  "Unicorn",
  "USB",
  "Watering Can",
  "Wine Glass",
]

var imageSource = [
  "imgs/bag.jpg",
  "imgs/banana.jpg",
  "imgs/boots.jpg",
  "imgs/chair.jpg",
  "imgs/cthulhu.jpg",
  "imgs/dragon.jpg",
  "imgs/pen.jpg",
  "imgs/scissors.jpg",
  "imgs/shark.jpg",
  "imgs/sweep.jpg",
  "imgs/unicorn.jpg",
  "imgs/usb.jpg",
  "imgs/water_can.jpg",
  "imgs/wine_glass.jpg",
];

var imageDescription = [
  "Bag Description",
  "Banana Description",
  "Boots Description",
  "Chair Description",
  "Ctulhu Description",
  "Dragon Description",
  "Pen Description",
  "Scissors Description",
  "Shark Description",
  "Baby Broom Description",
  "Unicorn Description",
  "USB Description",
  "Watering Can Description",
  "Wine Glass Description",
]

function Image (imageName, imageSource, imageDescription) {
  this.imageName = imageName;
  this.imageSource = imageSource;
  this.imageDescription = imageDescription;
  this.counter = 0;

  images.push(this);
};

for (var i = 0; i < imageName.length; i++) {
  new Image (imageName[i],imageSource[i],imageDescription[i])
};

function shuffle (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random()*currentIndex);
    currentIndex -= 1;
    temporaryValue = images[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

document.addEventListener("click",displayImage,false);

function displayImage () {
  console.log(event.target.id);
  if (event.target.id === "imageOne") {
    images[0].counter ++
    console.log(images[0].counter)
  }

  shuffle (images);

  document.getElementById("imageOne").src = images[0].imageSource;
  document.getElementById("titleOne").textContent = images[0].imageName;
  document.getElementById("descriptionOne").textContent = images[0].imageDescription;
  document.getElementById("imageTwo").src = images[1].imageSource;
  document.getElementById("titleTwo").textContent = images[1].imageName;
  document.getElementById("descriptionTwo").textContent = images[1].imageDescription;
  document.getElementById("imageThree").src = images[2].imageSource;
  document.getElementById("titleThree").textContent = images[2].imageName;
  document.getElementById("descriptionThree").textContent = images[2].imageDescription;
};
