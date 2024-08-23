const container = document.querySelector(".container");
const search = document.querySelector(".srch-box button");
const weatherbox = document.querySelector(".weather-box");
const weatherdetails = document.querySelector(".weather-details");

const error404= document.querySelector(".not-found");

search.addEventListener( "click" , () => {

    const APIKey = "429e74be75732ec8a6cd08b4d94bf5b0";
    const city = document.querySelector(".srch-box input").value;

    if (city === "")
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
 
 //niche ka sara for error image upto error404.classlist.......line 30 
        if (json.cod =="404"){
            container.style.height = "400px";
            weatherbox.classList.remove("active");
            weatherdetails.classList.remove("active");
            error404.classList.add("active");
            return;
           }

           container.style.height = "555px";
           weatherbox.classList.add("active");
           weatherdetails.classList.add("active");
           error404.classList.remove("active");
        
 
 //for image image,temp,description,humidity,wind changeing
        const img = document.querySelector(".weather-box img");
        const temperature = document.querySelector(".weather-box .temperature");
        const descripton = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(".weather-details .wind span");

        // switch(key) {
        //     case value:

        //          break;

        //     default:
        //         break;
        // }
//forimage change
        switch(json.weather[0].main) {
            case "Clear":
                img.src = "clear.png";
                console.log("Set image to clear.png"); // Debugging line
                 break;

            case "Rain":
                img.src = "rain.png";
                console.log("Set image to rain.png"); // Debugging line
                break;

            case "Snow":
                img.src = "snow.png";
                console.log("Set image to snow.png"); // Debugging line
                break;

            case "Clouds":
                img.src = "cloud.png";
                break;

           case "Mist":
                img.src = "mist.png";
                console.log("Set image to mist.png"); // Debugging line
                break;

            case "Haze":
                img.src = "mist.png";
                console.log("Set image to mist.png"); // Debugging line
                break;

            default:
                img.src = "cloud.png";
                console.log("Set image to default cloud.png"); // Debugging line
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>` ;     //use `  called backticks instead of ' in api url
        descripton.innerHTML = `${json.weather[0].description}` ; 
        humidity.innerHTML = `${json.main.humidity}%`; 
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h` ; 

    })
    .catch(error => {
        console.error("Error fetching weather data:", error);
    });
});