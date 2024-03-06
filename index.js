console.clear();

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

// console.log(plants);

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

// put all select elements into an object
const selections = document.getElementsByTagName("select");

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

addOptions(plantsValues, selections);

// create some helper functions to reduce repetition of code
function displayObjects(arrayOfObjects) {
  const displayArea = document.getElementById("displayArea");
  displayArea.innerHTML = "";
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
    image.src = `${src}.png`;
    image.alt = src;
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

displayObjects(plants);

let selectedFilters = {};


function filterDisplay() {
    let keyId = this.getAttribute("id");
    // console.log(`element id: ${keyId}`);
    let optionValue = this.value;
    // console.log(`option value: ${optionValue}`);
    selectedFilters[keyId] = optionValue;
    // console.log(selectedFilters);
    console.log(selectedFilters);
    // create a filtered array that is a copy of original array of objects
    let filteredPlants = plants;
    //******************* filtered plants is not renewing!!!! */
    console.log(filteredPlants);
    // loop through plants from last to first
    for (let i=filteredPlants.length-1; i>=0 ; i--) {
        // loop through selected filters
        // returns true or false
        //console.log(filteredPlants[i].feeding === "6 weeks");
        for (let [ key, value ] of Object.entries(selectedFilters)) {
            if (key && value) {
                console.log(`${value} is not empty`);
                for (let [k, v] of Object.entries(filteredPlants[i])) {
                    // console.log(`filter key is ${key}`)
                    // console.log(`filter value is ${value}`)
                    // console.log(`plant key is ${k}`)
                    // console.log(`plant value is ${v}`)
                    if (key === k && value !== v) {
                        filteredPlants.splice(i, 1);
                    }
                }
            }
            else {
                console.log(`${value} IS empty`);
                continue;
            }           
        }
        }
    if (filteredPlants.length === 0) {
        console.log("no plants left");
    }
    else {
        displayObjects(filteredPlants);

        console.log(filteredPlants);
    }
}
 
    // loop through selected filters j
    // if plant[i]key === sf[j]key and plant[i] property !== selectedfilter[j]property:
            //remove plant from plant array
            // end up with array of filtered plants
            // take plant names from this list (map function)
            // go through all articles, if article id is in the filtered list, show else display none
            // display objects(filtered array)

const selectList = document.querySelectorAll("select");
selectList.forEach(elem => elem.addEventListener("change", filterDisplay))

// console.log(plants[3].name);

// loops through each object in array and outputs the name
// plants.forEach(plant => console.log(plant.name));

const plantsNames = plants.map(plant => plant.name);

// console.log(plantsNames);


const plantsAvgHumidity = plants.filter(plant => plant.humidity === "average");
// console.log(plantsAvgHumidity);


// find the number of boxes inside display area
var element = document.getElementById("displayArea");
var numberOfChildren = element.getElementsByTagName('article').length
// console.log(numberOfChildren)

// console.log(plants[3].name);

// const box = document.getElementById("aloe vera");
// console.log(selections)

// selectionsArray = document.querySelectorAll("select");
// console.log(selectionsArray)



const emma = "";
if (emma) {
    console.log("empty is still true")
}
else {
    console.log("empty is false")
}