import { useState, useEffect, useCallback } from "react"



const fetchCurrentWeather = (authorizationKey, locationName) => {
    return fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${authorizationKey}&locationName=${locationName}`)
        .then(res => res.json())
        .then((data) => {
            let location = data.records.location[0];

            let weatherElement = location.weatherElement.reduce(
                (neededElement, item) => {
                    if (["WDSD", "TEMP"].includes(item.elementName)) {
                        neededElement[item.elementName] = item.elementValue;
                    }
                    return neededElement;
                }, {});
            return {
                windSpeed: weatherElement.WDSD,
                temperature: weatherElement.TEMP,
                observationTime: location.time.obsTime,
                isLoading: false,
            };
        });
}; // fetchCurrentWeather

const fetchWeatherForecast = (authorizationKey, cityName) => {
    return fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${authorizationKey}&locationName=${cityName}`)
        .then((res) => res.json())
        .then((data) => {
            let location = data.records.location[0];
            let weatherElement = location.weatherElement.reduce(
                (neededElement, item) => {
                    if (["Wx", "PoP", "CI"].includes(item.elementName)) {
                        neededElement[item.elementName] = item.time[0].parameter;
                    }
                    return neededElement;
                }, {});
            return {
                description: weatherElement.Wx.parameterName,
                weatherCode: weatherElement.Wx.parameterValue,
                rainPossibility: weatherElement.PoP.parameterName,
                comfortability: weatherElement.CI.parameterName
            }
        })
}
// fetchWeatherForecast;


const useWeatherAPI = ( locationName, cityName, authorizationKey ) => {
    let [weatherElement, setweatherElement] = useState({
        locationName: "cityName",
        description: " ",
        comfortability: " ",
        weatherCode: 0,
        windSpeed: 0,
        temperature: 0,
        rainPossibility: 0,
        observationTime: new Date(),
        isLoading: true
    })

    const fetchData = useCallback(async () => {
        const [currentWeather, weatherForecast] = await Promise.all(
            [fetchCurrentWeather(authorizationKey, locationName), fetchWeatherForecast(authorizationKey, cityName)]
        );
        setweatherElement((preState) => {
            return {
                ...preState,
                ...currentWeather,
                ...weatherForecast,
                locationName:cityName,
                isLoading:false
            }
        });
    }, [authorizationKey,locationName,cityName])

    useEffect(() => {
        fetchData();
    }, [fetchData])

    return [weatherElement, fetchData];


}

export default useWeatherAPI;