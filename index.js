console.clear();

// array of objects
const plants = [
  {name: "spider plant", sun: "partial sun", watering: "10-14 days", feeding: "monthly", temp: "18-27", humidity: "average"}, 
  {name: "snake plant", sun: "sun", watering: "3-4 weeks", feeding: "6 weeks", temp: "21-32", humidity: "low"}, 
  {name: "fiddle leaf fig", sun: "sun", watering: "7-10 days", feeding: "monthly", temp: "18-27", humidity: "average"}, 
  {name: "monstera deliciosa", sun: "partial sun", watering: "7-10 days", feeding: "2 weeks", temp: "20-30", humidity: "high"}, 
  {name: "rubber plant", sun: "sun", watering: "10-14 days", feeding: "2 weeks", temp: "15-29", humidity: "average"}, 
  {name: "pothos", sun: "shade", watering: "10-14 days", feeding: "monthly", temp: "17-30", humidity: "average"}, 
  {name: "cacti", sun: "sun", watering: "3-4 weeks", feeding: "monthly", temp: "21-29", humidity: "low"}, 
  {name: "peace lily", sun: "shade", watering: "5-7 days", feeding: "6 weeks", temp: "18-29", humidity: "high"}, 
  {name: "jade plant", sun: "sun", watering: "2-3 weeks", feeding: "2 weeks", temp: "18-24", humidity: "low"}, 
  {name: "zz plant", sun: "shade", watering: "3-4 weeks", feeding: "8 weeks", temp: "18-26", humidity: "low"}, 
  {name: "aloe vera", sun: "sun", watering: "3-4 weeks", feeding: "monthly", temp: "20-25", humidity: "low"}, 
  {name: "succulents", sun: "sun", watering: "3-4 weeks", feeding: "monthly", temp: "21-29", humidity: "average"}, 
  {name: "calathea", sun: "shade", watering: "5-7 days", feeding: "monthly", temp: "18-27", humidity: "high"}, 
  {name: "anthurium", sun: "partial sun", watering: "7-10 days", feeding: "6 weeks", temp: "18-27", humidity: "high"}, 
  {name: "kentia palm", sun: "shade", watering: "7-10 days", feeding: "2 weeks", temp: "18-27", humidity: "average"}, 
  {name: "string of pearls", sun: "sun", watering: "3-4 weeks", feeding: "2 weeks", temp: "18-27", humidity: "low"}, 
  {name: "boston fern", sun: "shade", watering: "5-7 days", feeding: "monthly", temp: "18-27", humidity: "high"}, 
  {name: "philodendron", sun: "shade", watering: "7-10 days", feeding: "6 weeks", temp: "18-27", humidity: "high"}
];


// list the available attributes (keys) for each plant

// a function to find all the keys in an array of objects by copying all the keys from the first object
function getKeys(arrayOfObjects) {
  // creating an array called allKeys to store all the keys in the array of objects
  let allKeys = [];
  // for each key in the first object in the array.....
  for (let key in arrayOfObjects[0]) {
    // add it to the keys array
    allKeys.push(key);
  }
  // return the array of keys to the main program
  return allKeys;
}

// run the getKeys function and return the array to plantsKeys
const plantsKeys = getKeys(plants);

// console.log(plantsKeys);
// returns: ["name","sun","watering","feeding","temp","humidity"]

// create a dictionary with sets of all possible values for each attribute (key), excluding empty

// create function with two parameters
function getValues(allKeys, arrayOfObjects) {
  // create new dictionary to store data
  let allValues = {};
  // loop through all the keys
  for (let key of allKeys) {
    // empty array to store values
    let values = [];
    // loop through each object in array
    for (let object of arrayOfObjects) {
      // if the value is not already in the array
      if (values.indexOf(object[key]) === -1) {
        // add it to the new array
        values.push(object[key]);
      } // end of if
    } // end of for (objects)
    // add the key value pair to the dictionary
    allValues[key] = values;
  } // end of for (keys)
  // return the dictionary
  return allValues;
} // end of function

// returns a dictionary where each value is an array of all the possible values for that key.
const plantsValues = getValues(plantsKeys, plants);
// console.log(plantsValues);


// function to add options to the select elements
function addOptions(arrayOfObjects, selections) {
    // for each key/value pair in array of objects
  for (let [key, value] of Object.entries(arrayOfObjects)) {
    // loop through the select elements
    for (let j=0; j <selections.length; j++) {
        // if the key matches the select element id
      if (key === selections[j].id) {
        // assign the correct select element to a variable
        let selection = document.getElementById(selections[j].id);
        // loop through the array of values
        for (let k=0; k < value.length; k++) {
            // add the value to a variable
          let optionValue = value[k];
          // create an option element
          let option = document.createElement("option");
          // add the value to the option element
          option.textContent = optionValue;
          // use the same variable to assign a value attribute
          option.setAttribute("value", optionValue);
          // append the option to the select element
          selection.appendChild(option);
        }        
      }
    }
}
}

// put all select elements into an object
const selections = document.getElementsByTagName("select");

// call the function to add the options to all the select elements
addOptions(plantsValues, selections);

// create some helper functions to reduce repetition of code
function displayObjects(arrayOfObjects) {
  const displayArea = document.getElementById("displayArea");
  // clear the display every time this function is called
  displayArea.innerHTML = "";
  if (arrayOfObjects.length===0) {
    displayArea.textContent = "No plants meet this criteria";
    console.log("no plants left");
  }
  else {
    for (let object of arrayOfObjects) {
      let box = document.createElement("article");
      box.setAttribute("id", object.name);
      // box.className = "responsive";
      displayArea.appendChild(box);
      let title = document.createElement("h3");
      title.textContent = object.name;
      box.appendChild(title);    
      let image = document.createElement("img");
      let src = object.name;
      //image.src = `${src}.png`;
      //image.alt = src;
      box.appendChild(image);
      let sun = document.createElement("p");
      sun.textContent = `Sun: ${object.sun}`;
      box.appendChild(sun);
      let watering = document.createElement("p");
      watering.textContent = `Watering: ${object.watering}`;
      box.appendChild(watering);
      let feeding = document.createElement("p");
      feeding.textContent = `Feeding: ${object.feeding}`;
      box.appendChild(feeding);
      let temp = document.createElement("p");
      temp.textContent = `Temperature: ${object.temp}`;
      box.appendChild(temp);
      let humidity = document.createElement("p"); 
      humidity.textContent = `Humidity: ${object.humidity}`;
      box.appendChild(humidity);
  }
  }
}

// call the function to display the plants
displayObjects(plants);

// initialise an object that will store the users' selections to filter the houseplants
let selectedFilters = {};
// initialise an array that will copy the original plants array and be used to filter the output
let filteredArray = [];


// when the user changes the select elements, this function filters the output according to their selections
function filterDisplay() {
    // storing the id of the select element (which corresponds to the keys in the plant object)
    let keyId = this.getAttribute("id");
    // storing their chosen option for filtering
    let optionValue = this.value;
    // storing this key/value pair in the selectedFilters object
    selectedFilters[keyId] = optionValue;
    // checking this in the console
    console.log("filters:");
    console.log(selectedFilters);

    // create a filtered array that is a copy of original array of objects
    // this worked with fix of || {}
    filteredArray = plants.map(a => {return {...a}});
    
    // checking filteredArray in the console
    console.log("filtered array: "); 
    console.log(filteredArray);

    // loop through plants from last to first (so splicing function does not skip one)
    for (let i=filteredArray.length-1; i>=0 ; i--) {
        // loop through selected filters
        for (let [ key, value ] of Object.entries(selectedFilters)) {
          // if a value exists for both
            if (key && value) {
                // Uncaught TypeError: Cannot convert undefined or null to object at Function.entries (<anonymous>)
                // this fix worked: || {}  - not sure why?
                // loop through each key/value pair in the filteredArray
                for (let [k, v] of Object.entries(filteredArray[i] || {})) {
                    // if the keys match but the values do not match
                    if (key === k && value !== v) {
                      // remove the item from the filteredArray
                      filteredArray.splice(i, 1);
                    }
                }
            }
            // if there is not a value for both the key/value
            else {
                // skip to next one
                continue;
            }           
        }
    }
    // update the output based on plants that match the filters
    displayObjects(filteredArray);

    // check output in console
    console.log(filteredArray);
}
 
// create an array of select elements that we can loop through with forEach function
const selectList = document.querySelectorAll("select");
// we can use forEach function to add event listener to all these select elements
selectList.forEach(elem => elem.addEventListener("change", filterDisplay))


    // didnt work issues: 
    // Uncaught TypeError: Cannot convert undefined or null to object at Function.entries (<anonymous>)
    // let filteredArray = JSON.parse(JSON.stringify(plants));

    // didnt work
    // let filteredArray = [];
    // filteredArray.map(plants);

    // didnt work issues: 
    // Uncaught TypeError: Cannot convert undefined or null to object at Function.entries (<anonymous>)
    // let filteredArray = [];
    // for (i = 0; i < plants.length; i++) {
    //   filteredArray[i] = plants[i];
    // }

    // this clone didnt work
    // Uncaught TypeError: Cannot convert undefined or null to object at Function.entries (<anonymous>)
    // let filteredArray = [...plants];

    //******************* filtered plants is not renewing!!!! */
    //filteredArray = plants; // this is not working second time around 

// loops through each object in array and outputs the name
// plants.forEach(plant => console.log(plant.name));

// const plantsNames = plants.map(plant => plant.name);

// console.log(plantsNames);


// const plantsAvgHumidity = plants.filter(plant => plant.humidity === "average");
// console.log(plantsAvgHumidity);


// find the number of boxes inside display area
// var element = document.getElementById("displayArea");
// var numberOfChildren = element.getElementsByTagName('article').length
// console.log(numberOfChildren)

// console.log(plants[3].name);

// const box = document.getElementById("aloe vera");
// console.log(selections)



// search for a plant

// on change search bar
// reset all filters to all??
// use js search bar tutorial.
// instead of showing the name it filters the articles




