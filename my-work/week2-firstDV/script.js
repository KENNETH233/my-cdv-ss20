console.log("hi");

let data = [
    {
        "timestamp": "2020-02-19T15:31:37.096Z",
        "uniqlo": 10,
        "ur": 10,
        "hm": 8,
        "zara": 8,
        "pullbear": 10,
        "bershka": 10
    },
    {
        "timestamp": "2020-02-19T15:33:18.432Z",
        "uniqlo": 7,
        "ur": 1,
        "hm": 6,
        "zara": 7,
        "pullbear": 1,
        "bershka": 1
    },
    {
        "timestamp": "2020-02-19T15:33:25.574Z",
        "uniqlo": 10,
        "ur": 6,
        "hm": 10,
        "zara": 10,
        "pullbear": 5,
        "bershka": 5
    },
    {
        "timestamp": "2020-02-19T15:34:43.468Z",
        "uniqlo": 9,
        "ur": 8,
        "hm": 6,
        "zara": 2,
        "pullbear": 7,
        "bershka": 4
    },
    {
        "timestamp": "2020-02-19T15:39:49.310Z",
        "uniqlo": 7,
        "ur": 8,
        "hm": 7,
        "zara": 7,
        "pullbear": 8,
        "bershka": 10
    },
    {
        "timestamp": "2020-02-19T15:40:27.007Z",
        "uniqlo": 7,
        "ur": 5,
        "hm": 8,
        "zara": 9,
        "pullbear": 8,
        "bershka": 7
    },
    {
        "timestamp": "2020-02-19T15:42:47.620Z",
        "uniqlo": 5,
        "ur": 3,
        "hm": 8,
        "zara": 8,
        "pullbear": 2,
        "bershka": 1
    },
    {
        "timestamp": "2020-02-19T15:43:16.199Z",
        "uniqlo": 10,
        "ur": 7,
        "hm": 8,
        "zara": 7,
        "pullbear": 8,
        "bershka": 9
    },
    {
        "timestamp": "2020-02-19T15:43:51.741Z",
        "uniqlo": 8,
        "ur": 5,
        "hm": 8,
        "zara": 7,
        "pullbear": 1,
        "bershka": 1
    },
    {
        "timestamp": "2020-02-19T15:44:33.510Z",
        "uniqlo": 8,
        "ur": 7,
        "hm": 9,
        "zara": 8,
        "pullbear": 8,
        "bershka": 7
    },
    {
        "timestamp": "2020-02-19T15:44:48.026Z",
        "uniqlo": 5,
        "ur": 9,
        "hm": 8,
        "zara": 7,
        "pullbear": 5,
        "bershka": 2
    },
    {
        "timestamp": "2020-02-19T15:45:08.723Z",
        "uniqlo": 6,
        "ur": 7,
        "hm": 7,
        "zara": 8,
        "pullbear": 7,
        "bershka": 5
    },
    {
        "timestamp": "2020-02-19T15:53:29.678Z",
        "uniqlo": 10,
        "ur": 8,
        "hm": 5,
        "zara": 6,
        "pullbear": 10,
        "bershka": 8
    },
    {
        "timestamp": "2020-02-19T15:59:52.331Z",
        "uniqlo": 6,
        "ur": 6,
        "hm": 6,
        "zara": 6,
        "pullbear": 6,
        "bershka": 7
    },
    {
        "timestamp": "2020-02-19T16:07:21.510Z",
        "uniqlo": 4,
        "ur": 4,
        "hm": 8,
        "zara": 10,
        "pullbear": 6,
        "bershka": 5
    },
    {
        "timestamp": "2020-02-19T17:55:58.965Z",
        "uniqlo": 9,
        "ur": 7,
        "hm": 8,
        "zara": 8,
        "pullbear": 10,
        "bershka": 10
    },
    {
        "timestamp": "2020-02-20T01:37:09.163Z",
        "uniqlo": 1,
        "ur": 5,
        "hm": 7,
        "zara": 8,
        "pullbear": 1,
        "bershka": 1
    },
    {
        "timestamp": "2020-02-20T02:00:33.728Z",
        "uniqlo": 10,
        "ur": 10,
        "hm": 4,
        "zara": 6,
        "pullbear": 3,
        "bershka": 2
    }
]
console.log(data);
// the function dates a data
// arrayn as an argument

//function to get averageData
function averageData(data){
  // new empty array to be filled
  // with data in new structure
  let newData = [];
  // assuming each data point has the same
  // keys/categories, we extract an array of them from the
  // first data point in the array
  // in class we changed it to the last element instead
  // as the first one did not have all the categories filled out
  // there is more thorough ways to do this, but for out purposes
  // now, this will be enough
  let keys = Object.keys(data[0]);
  // now we loop over the keys/categories
  for(let i = 0; i < keys.length; i++){
    // store the current key/category in
    // a variable:
    let key = keys[i];
    // now we will loop over each data point
    // in the data set, check if it has a value
    // for the key/category and add them to
    // a total sum variable
    // as well as count the occurences in order to
    // calulate the averae in the end
    let sum = 0;
    let num = 0;
    for(let j = 0; j < data.length; j++){
      let datum = data[j];
      // check if the key exists
      // for this datapoint
      if(key in datum){
        // add to sum
        sum += datum[key];
        // increase count
        num++;
      }
    }
    // now calculate the average
    let avg = sum/num;
    // make sure the value is a number
    // (some value might be strings)
    if(!isNaN(avg)){
      // create an object with both the average
      // and also the number of measurements that
      // went into the average
      let newDataPoint = {"name": key, "average": avg, 'numMeasurements': num};
      // add the new datapoint to the new data array
      newData.push(newDataPoint);
    }
  }
  // return everything when it is done
  return newData;
}

let transformedData = averageData(data);
console.log(transformedData);

// for loop showing all the data in bar
for(let i = 0; i < transformedData.length; i++){
  let datapoint = transformedData[i];
  var holderId = [0,1,2,3,4,5];
  console.log(datapoint);
  // Create a flex holder
  let box = document.createElement("div");
  box.className="dataBox";
  box.id="holder"+holderId[i];
  document.getElementById("viz").appendChild(box);

  // Create a image
  let logo = document.createElement("img")

  if(datapoint.name == "uniqlo"){
    logo.src="img/uniqlo-logo.png";
  }else if(datapoint.name == "ur"){
    logo.src="img/ur.png";
  }else if(datapoint.name == "hm"){
    logo.src="img/HM.jpg";
  }else if(datapoint.name == "zara"){
    logo.src="img/zara-logo.png";
  }else if(datapoint.name =="pullbear"){
    logo.src="img/pb.png";
  }else if(datapoint.name == "bershka"){
    logo.src="img/bershka.jpg";
  }

  logo.className = "pic";

  document.getElementById("holder"+holderId[i]).appendChild(logo);

  //create data bar
  let bar = document.createElement("div");
  bar.className="bar";
  bar.style.width = datapoint.average*150 + "px";
  // bar.innerHTML = datapoint.name + "    " + datapoint.average;
  // bar.innerHTML.className="name"
  // bar.innerHTML = datapoint.average;
  document.getElementById("holder"+holderId[i]).appendChild(bar);

  // create an bar name div
  let barNameDiv = document.createElement("div");
  barNameDiv.className="barNameDiv";
  document.getElementById("holder"+holderId[i]).appendChild(barNameDiv);

  // create text
  let barName = document.createElement("p");
  barName.innerHTML = datapoint.name + "   " +datapoint.average;

  barName.className = "name";
  barNameDiv.appendChild(barName);



}
