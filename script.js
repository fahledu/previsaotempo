//Criar uma conta no https://openweathermap.org/ criar uma API KEY e substituir abaixo
const key = "71318a03d05babe4e58296dda507d912"; 

document.addEventListener('DOMContentLoaded', () => {
    const updateWeatherData = (data) => {
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = `${Math.floor(data.main.temp)}ºC`;
        document.querySelector('.img-weather').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        document.querySelector('.text-weather').innerHTML = `${data.weather[0].description}`;
        document.querySelector('.humidity').innerHTML = `Umidade: ${data.main.humidity}%`;
    };

    const getLocation = async () => {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const { latitude: lat, longitude: lon } = position.coords;

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
            const data = await response.json();
            const city = data.name;

            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},BRA&appid=${key}&lang=pt_br&units=metric`);
            const weatherData = await weatherResponse.json();

            updateWeatherData(weatherData);
        } catch (error) {
            console.log('Erro ao obter localização', error);
            
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=sao%20paulo,BRA&appid=${key}&lang=pt_br&units=metric`);
            const data = await response.json();

            updateWeatherData(data);
        }
    };

    getLocation();

    const searchCity = async (input) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input},BRA&appid=${key}&lang=pt_br&units=metric`);
            const data = await response.json();

            updateWeatherData(data);
        } catch (error) {
            console.log('Erro ao obter dados do clima', error);
        }
    };

    const button = document.querySelector('button');
    button.addEventListener('click', () => {
        const input = document.querySelector('.input').value;
        searchCity(input);
    });
});
