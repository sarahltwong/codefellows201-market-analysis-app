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

document.getElementById("buttons").style.display = "none";
document.getElementById("charts").style.display = "none";
document.getElementById("mainBox").addEventListener("click",displayImage,false);

function displayImage () {
  for (var i = 0; i < images.length; i++) {
    if (event.target.id === images[i].imageName) {
      images[i].counter++;
      votes++;
    };
  };
  document.getElementById("voteTracker").innerHTML = "Votes submitted: " + votes;
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
  if (votes % 15 === 0 && votes > 0) {
    localStorage.setItem('storedVotes',JSON.stringify(votes));
    localStorage.setItem('storedImages',JSON.stringify(images));
    document.getElementById("guideText").innerHTML = "What would you like to do now?";
    document.getElementById("voteTracker").style.display = "none";
    document.getElementById("mainBox").style.display = "none";
    document.getElementById("buttons").style.display = "block";
  };
};

document.getElementById("showResults").addEventListener("click",displayResults,false);
document.getElementById("playAgain").addEventListener("click",reload,false);
document.getElementById("keepPlaying").addEventListener("click",continuePlay,false);

function reload () {
  window.location.reload();
}

function continuePlay () {
  images = JSON.parse(localStorage.getItem('storedImages'));
  votes = JSON.parse(localStorage.getItem('storedVotes'));
  document.getElementById("voteTracker").style.display = "block";
  document.getElementById("mainBox").style.display = "flex";
  document.getElementById("buttons").style.display = "none";
}

var data = {
    labels: [],
    datasets: [
        {
            label: "Appearances",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: []
        },
        {
            label: "Votes",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: []
        }
    ]
};


function displayResults () {
  images.sort(function(a,b){return b.counter-a.counter});
  for (var i = 0; i < images.length; i++) {
    data.labels.push(images[i].imageName);
    data.datasets[0].data.push(images[i].appearance);
    data.datasets[1].data.push(images[i].counter);
  };

  var ctx = document.getElementById("chartOne").getContext("2d");
  var myNewChart = new Chart(ctx).Bar(data);

  document.getElementById("submit").style.display = "none";
  images.sort(function(a,b){return b.counter-a.counter});
  document.getElementById("charts").style.display = "block";

  var tableEl = document.createElement("table");
  var tableBody = document.createElement("tbody");
  var tableHeaders = ["Product","Votes","Appearances"];
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
    for (var j = 0; j < 3; j++) {
      var rowContent = [images[k].imageName,images[k].counter,images[k].appearance];
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
