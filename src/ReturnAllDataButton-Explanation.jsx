import { useState } from 'react'
import './App.css'
//store the api ky to use as a variable. in normal apps this would be stored in a .env that should be in gitignore also, but this key doesn't matter
const API_KEY = 'bb37f6d9';

//this is the function that this JSX component will return
function App() {
    //all of our destructured state management stuff
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    //function that handles what happens when we click our button
    const handleClick = async (searchValue) => {
        //this isn't required but is a good idea if you are building a more detailed application. we will handle loading and error states in our try/catch block but at the beginning of the function we want them to be in their original state, so even if the state is changed somewhere else, whenever this function is called we will manage the state for these thusly
      setLoading(true);
      setError(null);
        //try catch is a better way to handle javascript promises and i feel like i don't really need to explain that because i think it will be confusing but i will if you want me to
      try {
        //here we're fetching data from the API and storing it in a variable called response. We access the api key given to use by omdbapi.com. API_KEY is variable we have stored and we are accessing it with a template literal (the `${}`) which is js specific. in lieu of using a string, we use the ` so the url can be parsed with our variables. The s=${searchValue} is specific to the API and is required. Right now it's just returning every movie, this "searchValue" variable is meaningless. When we update the button, this searchValue will reflect the input we capture and store as sate
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`);
  
        //this if block is saying if the response (our api fetch stored as a variable) is not ok (! is basically saying "not" or "opposite" and ok is a built in js method) then we will throw a new error that shows us the response.status. "throw" "new" "Error" and ".status" are all javascript specific
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        //we save our response in json format in a variable called "data" which is managed with useState
        const data = await response.json();
        //we use the setter in useState to update the state of our data
        setData(data);
        //in the console you can see all the data
        // console.log(data)
        //here we can use dot notation to access the Search array
        // console.log(data.Search)
        //here we can use bracket notation to access the 0th index of Search array
        console.log(data.Search[0])
        //and now i can isolate just the imdbID to use when we map over our array
        //this will be needed later when we implement the search. Right now our button is simply retrieving everything. When we enter a value into input and click the button, we will store the results based on the input in our own array (managed with useState hook) and when we loop over our array to display our results, we will need this imdbID - i don't remember why but it's a react rule that we need a unique id
        console.log(data.Search[0].imdbID)

      } catch (e) {
        //if an error is caught, we update error state
        setError(e);
      } finally {
        //we switch our loading state to false since we have made it out of our try/catch block, which means we are no longer loading. a loading state is helpful if you want to have a loading/buffering spinner etc. It can also be useful to trigger other actions that will be outside the scope of this project
        setLoading(false);
      }
      
    };
 
    //the return is what is displayed in this component
    return (
      <div>
        {/* button that has an onClick class that points to the handleClick function (the function that is calling the API) */}
        <button onClick={handleClick} disabled={loading}>
            {/* ternary logig gate that checks the loading state, if it is true the right side of the : returns else the left side of : returns */}
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
        {/* this is a Logical AND (&&) (logical conjuction) that evaluates operands from left to right, returning immediately with the value of the first falsy operand it encounters; if all values are truthy, the value of the last operand is returned. so this is checking if error state is truthy or falsy (we have our error state initialized to null which javascript will return as falsy UNLESS we catch an error somewhere that will update the state of error to true)and if it is falsy then we don't render the <p> and we move on */}
        {error && <p>Error: {error.message}</p>}
        {/* same deal with this, if loading state is true we will render the <p> else we just move on */}
        {loading && <p>Loading data...</p>}
        {/* here (when working correctly) our data is "true" (which in javascript terms just means it's not null. data exists so it returns true) and we render our data. JSON.stringify is a built in js method that converts a js value in a JSON string. the syntax is stringify(value, replacer, space) so this is saying take our data state as the vale, replace nothing(null is used here to say we aren't replacing anything but if you were replacing something, you would put that here. The replacer argument can either be a function that is called on every property in the object, or an array that contains keys that should exist in the final output.), and a space of 2 which is just white space to make it more readable  */}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    );
}

export default App
