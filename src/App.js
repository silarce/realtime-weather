//模組與套件
import { useState, useEffect, useMemo } from "react"
import useWeatherAPI from "./hook/useWeatherAPI.js";
import styled from "@emotion/styled"
import { ThemeProvider } from "@emotion/react"
//component
import { getMoment, findLocation } from "./utils/helpers.js";
import WeatherCard from "./views/WeatherCard.jsx"
import WeatherSetting from "./views/WeatherSetting.jsx"




const theme = {
  light: {
    backgroundColor: '#ededed',
    foregroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor: '#212121',
    temperatureColor: '#757575',
    textColor: '#828282',
  },
  dark: {
    backgroundColor: '#1F2022',
    foregroundColor: '#121416',
    boxShadow:
      '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc',
  },
};

const Container = styled.div`
background-color: ${(props) => { return props.theme.backgroundColor }};
height: 100%;
display: flex;
align-items: center;
justify-content: center;
`



const authorizationKey = "CWB-FB394ECD-996E-47D5-92E3-88B85723AA0D";

const storageCity = localStorage.getItem('cityName') || "臺中市"


function App() {
  const [theTheme, setTheTheme] = useState("light");
  const [currentPage, setCurrentPage] = useState("WeatherCard");
  const [currentCity, setCurrentCity] = useState(storageCity);

  // -----------------------------------------------
  // -----------------------------------------------
  // 改動state的函式
  const handleCurrentPageChange = (currentPage) => {
    setCurrentPage(currentPage);
  }
  const handleCurrentCityChange = (currentCity) => {
    setCurrentCity(currentCity);
  }

  // -----------------------------------------------
  const currentLocation = useMemo(() => {
    return findLocation(currentCity)
  }, [currentCity])

  const { cityName, locationName, sunriseCityName } = currentLocation;


  const [weatherElement, fetchData] = useWeatherAPI(
    locationName,
    cityName,
    authorizationKey
  )


  let moment = useMemo(() => {
    return getMoment(sunriseCityName)
  }, [sunriseCityName])


  useEffect(() => {
    setTheTheme(moment === "day" ? "light" : "dark")
  }, [moment])


  return (
    <>
      <ThemeProvider theme={theme[theTheme]}>
        <Container>
          {currentPage === "WeatherCard" && (
            <WeatherCard
              weatherElement={weatherElement}
              moment={moment}
              fetchData={fetchData}
              handleCurrentPageChange={handleCurrentPageChange}
            />
          )}
          {currentPage === "WeatherSetting" && (
            <WeatherSetting
              cityName={cityName}
              handleCurrentPageChange={handleCurrentPageChange}
              handleCurrentCityChange={handleCurrentCityChange} />
          )}
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
