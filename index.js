var lastNode = null;

function addLine(lineText) {
  var newLine = document.createElement("div");
  newLine.innerHTML = lineText;
  newLine.classList.add("output");
  document.getElementById("outputContainer").insertBefore(newLine, lastNode);
  lastNode = newLine;
}

function checkStatus() {
  navigator.permissions.query({name: 'geolocation'}).then(function(result) {
    addLine("Status is " + result.state);
  });
}

function geoSuccess(position) {
  addLine("Position is (" + position.coords.latitude + ", " + position.coords.longitude + ")");
}

function geoError(error) {
  if (error.code == 1) {
    addLine("Permission denied.");
  } else if (error.code == 2) {
    addLine("Position unavailable.");
  } else if (error.code == 3) {
    addLine("Timeout.");
  } else {
    addLine("Unknown error.");
  }
}

function readLocation() {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}

function readLocationDelayed() {
  window.setTimeout(readLocation, 5000);
}

function search() {
  window.location.href="index.html?q="+document.getElementById("search").value;
}

window.onload = function() {
  if (window.location.href.includes("?q=")) {
    document.getElementById("searchResults").style.display = "block";
  }
}
