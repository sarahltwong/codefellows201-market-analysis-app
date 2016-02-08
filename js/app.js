var images = [];
var votes = 0;
var imageName = ["Bag","Banana","Boots","Chair","Ctulhu","Dragon","Pen","Scissors","Shark","Baby Broom","Unicorn","USB","Watering Can","Wine Glass"];
var imageSource = ["imgs/img2/bag.jpg","imgs/img2/banana.jpg","imgs/img2/boots.jpg","imgs/img2/chair.jpg","imgs/img2/cthulhu.jpg","imgs/img2/dragon.jpg","imgs/img2/pen.jpg","imgs/img2/scissors.jpg","imgs/img2/shark.jpg","imgs/img2/sweep.jpg","imgs/img2/unicorn.jpg","imgs/img2/usb.jpg","imgs/img2/water_can.jpg","imgs/img2/wine_glass.jpg"];

function Image (imageName, imageSource) {
  this.imageName = imageName;
  this.imageSource = imageSource;
  this.appearance = 0;
  this.counter = 0;
  images.push(this);
};

for (var i = 0; i < imageName.length; i++) {
  new Image (imageName[i],imageSource[i])
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

document.getElementById("submit").style.display = "none";
document.getElementById("replay").style.display = "none";
document.getElementById("mainBox").addEventListener("click",displayImage,false);

function displayImage () {
  for (var i = 0; i < images.length; i++) {
    if (event.target.id === images[i].imageName) {
      images[i].counter++;
      votes++;
    };
  };
  document.getElementById("voteTracker").innerHTML = "Votes submitted: " + votes + "<br>" + "Votes left: "+ (15 - votes);
  document.getElementById("mainBox").innerHTML = "";
  shuffle (images);
  for (var i = 0; i < 3; i++) {
    var sectionEl = document.createElement("section");
  
    var headerEl = document.createElement("h2");
    var headerContent = document.createTextNode(images[i].imageName);
    headerEl.appendChild(headerContent);
    sectionEl.appendChild(headerEl);
    document.getElementById("mainBox").appendChild(sectionEl);

    var imageEl = document.createElement("img");
    imageEl.src = images[i].imageSource;
    sectionEl.appendChild(imageEl);
    sectionEl.id = headerEl.id = imageEl.id = images[i].imageName;

    images[i].appearance++;
  }
  if (votes === 15) {
    document.getElementById("mainBox").innerHTML = "";
    document.getElementById("submit").style.display = "block";
    document.getElementById("replay").style.display = "block";
  };
};

document.getElementById("showResults").addEventListener("click",displayResults,false);
document.getElementById("playAgain").addEventListener("click",reload,false);

function displayResults () {
  document.getElementById("submit").style.display = "none";
  images.sort(function(a,b){return b.counter-a.counter});
  var tableEl = document.createElement("table");
  var tableBody = document.createElement("tbody");
  var tableHeaders = ["Product","Votes"];
  var row = document.createElement("tr");
  for (var i = 0; i < tableHeaders.length; i++) {
    var theadEl = document.createElement("th");
    var cellText = document.createTextNode(tableHeaders[i]);
    theadEl.appendChild(cellText);
    row.appendChild(theadEl);
    tableBody.appendChild(row);
  };
  for (var k = 0; k < imageName.length; k++) {
    var row2 = document.createElement("tr");
    for (var j = 0; j < 2; j++) {
      var rowContent = [images[k].imageName,images[k].counter];
      var cell = document.createElement("td");
      var cellText2 = document.createTextNode(rowContent[j]);
      cell.appendChild(cellText2);
      row2.appendChild(cell);
    };
    tableBody.appendChild(row2);
  };
  tableEl.appendChild(tableBody);
  document.getElementById("table").appendChild(tableEl);
}

function reload () {
  window.location.reload();
}
