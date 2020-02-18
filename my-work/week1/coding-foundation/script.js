document.getElementById("n").addEventListener("click",main); // add function to submit button
let n = 0;

// function to create a box
function drawBox(){
  var box = document.createElement("div"); // create a <div> element
  box.className="box"; //style the box
  document.getElementById("mainBox").appendChild(box); //add box to the mainBox <div>
}

//function to remove box
function removeBox(){
  var elem = document.getElementsByClassName("box");
  console.log(elem[0]);
  return elem[0].parentNode.removeChild(elem[0]);
}

// the function to draw box according to the input number
function main(){
  var value = document.getElementById("myInput").value // extract number from input form
  if(n===0){
  for (var i = 0; i < value; i++){
    drawBox();
    n=value;
  }
}if(n>value){  // if the new input number is smaller than the current number of boxes-- remove the boxes
    var increased = n-value;
    for (var i = 0; i < increased; i++){
      removeBox();
    }
    n = value;
  }
 if(n < value){ // if the new input number is larger than the current number of boxes-- add more boxes
   var decreased = value - n;
   for (var i = 0; i < decreased; i++){
     drawBox();
   }
   n = value;
 }
}
