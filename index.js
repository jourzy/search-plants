console.clear();

// update this in future interation to take data from a plant api
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
  let allKeys = [];
  for (let key in arrayOfObjects[0]) {
    allKeys.push(key);
  }
  return allKeys;
}

const plantsKeys = getKeys(plants);


// create a dictionary with sets of all possible values for each attribute (key), excluding empty
function getValues(allKeys, arrayOfObjects) {
  let allValues = {};
  for (let key of allKeys) {
    let values = [];
    for (let object of arrayOfObjects) {
      // if the value is not already in the array
      if (values.indexOf(object[key]) === -1) {
        values.push(object[key]);
      } 
    } 
    allValues[key] = values;
  } 
  return allValues;
}

// returns a dictionary where each value is an array of all the possible values for that key.
const plantsValues = getValues(plantsKeys, plants);


// function to add options to the select elements
function addOptions(arrayOfObjects, selections) {
  // for each key/value pair in array of objects
  for (let [key, value] of Object.entries(arrayOfObjects)) {
    for (let j=0; j <selections.length; j++) {
      if (key === selections[j].id) {
        let selection = document.getElementById(selections[j].id);
        for (let k=0; k < value.length; k++) {
          let optionValue = value[k];
          let option = document.createElement("option");
          option.textContent = optionValue;
          option.setAttribute("value", optionValue);
          selection.appendChild(option);
        }        
      }
    }
  }
}


const selections = document.getElementsByTagName("select");


// call the function to add the options to all the select elements
addOptions(plantsValues, selections);


// create some helper functions to reduce repetition of code
function displayObjects(arrayOfObjects) {
  const displayArea = document.getElementById("displayArea");
  displayArea.innerHTML = "";
  if (arrayOfObjects.length===0) {
    const noResults = document.createElement("p");
    noResults.textContent = "No plants meet this criteria";
    noResults.style.color="red";
    noResults.style.textAlign="center";
    displayArea.appendChild(noResults);
  }
  else {
    for (let object of arrayOfObjects) {
      let box = document.createElement("article");
      box.setAttribute("id", object.name);
      displayArea.appendChild(box);
      let title = document.createElement("h3");
      title.textContent = object.name;
      box.appendChild(title);  
      // add an image of the object --- I did not get time to save the images  
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
    let optionValue = this.value;
    selectedFilters[keyId] = optionValue;


    // create a filtered array that is a copy of original array of objects
    // this worked with fix of || {} on line 159
    filteredArray = plants.map(a => {return {...a}});
    

    // loop through plants from last to first (so splicing function does not skip one)
    for (let i=filteredArray.length-1; i>=0 ; i--) {
        for (let [ key, value ] of Object.entries(selectedFilters)) {
            if (key && value) {
                // Uncaught TypeError: Cannot convert undefined or null to object at Function.entries (<anonymous>)
                // this fix worked: || {}
                for (let [k, v] of Object.entries(filteredArray[i] || {})) {
                    if (key === k && value !== v) {
                      filteredArray.splice(i, 1);
                    }
                }
            }
            else {
                continue;
            }           
        }
    }
    // update the output based on plants that match the filters
    displayObjects(filteredArray);
}
 
// create an array of select elements that we can loop through with forEach function
const selectList = document.querySelectorAll("select");
// we can use forEach function to add event listener to all these select elements
selectList.forEach(elem => elem.addEventListener("change", filterDisplay))






