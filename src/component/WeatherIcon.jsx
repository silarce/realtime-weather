import styled from "@emotion/styled";
import { useMemo } from "react";

import { ReactComponent as DayClear } from "../image/weather-icons/images/day-clear.svg"
import { ReactComponent as DayCloudyFog } from "../image/weather-icons/images/day-cloudy-fog.svg"
import { ReactComponent as DayCloudy } from "../image/weather-icons/images/day-cloudy.svg"
import { ReactComponent as DayFog } from "../image/weather-icons/images/day-fog.svg"
import { ReactComponent as DayPartiallyClear } from "../image/weather-icons/images/day-partially-clear-with-rain.svg"
import { ReactComponent as DaySnowing } from "../image/weather-icons/images/day-snowing.svg"
import { ReactComponent as DayThunderstorm } from "../image/weather-icons/images/day-thunderstorm.svg"
import { ReactComponent as NightClear } from "../image/weather-icons/images/night-clear.svg"
import { ReactComponent as NightCloudyFog } from "../image/weather-icons/images/night-cloudy-fog.svg"
import { ReactComponent as NightCloudy } from "../image/weather-icons/images/night-cloudy.svg"
import { ReactComponent as NightFog } from "../image/weather-icons/images/night-fog.svg"
import { ReactComponent as NightPartiallyClear } from "../image/weather-icons/images/night-partially-clear-with-rain.svg"
import { ReactComponent as NightSnowing } from "../image/weather-icons/images/night-snowing.svg"
import { ReactComponent as NightThunderstorm } from "../image/weather-icons/images/night-thunderstorm.svg"


const weatherTypes = {
    isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
    isClear: [1],
    isCloudyFog: [25, 26, 27, 28],
    isCloudy: [2, 3, 4, 5, 6, 7],
    isFog: [24],
    isPartiallyClearWithRain: [
        8, 9, 10, 11, 12, 13,
        14, 19, 20, 29, 30, 31,
        32, 38, 39,
    ],
    isSnowing: [23, 37, 42],
};

const weatherIcons = {
    day: {
        isThunderstorm: <DayThunderstorm />,
        isClear: <DayClear />,
        isCloudyFog: <DayCloudyFog />,
        isCloudy: <DayCloudy />,
        isFog: <DayFog />,
        isPartiallyClearWithRain: <DayPartiallyClear />,
        isSnowing: <DaySnowing />
    },
    night: {
        isThunderstorm: <NightThunderstorm />,
        isClear: <NightClear />,
        isCloudyFog: <NightCloudyFog />,
        isCloudy: <NightCloudy />,
        isFog: <NightFog />,
        isPartiallyClearWithRain: <NightPartiallyClear />,
        isSnowing: <NightSnowing />
    }
}

const weatherCodeToType = (weatherCode) => {
    const [weatherType] =
        Object.entries(weatherTypes).find(([weatherType, weatherCodes]) => {
            return weatherCodes.includes(Number(weatherCode))
        }) || [];
    return weatherType
}





const IconContainer = styled.div`
flex-basis: 30%;
svg{
    max-height:110px;
    margin-right:30px;
    
};
`

// console.log(new Date().getHours())

const WeatherIcon = ({weatherCode,moment}) => {


    const weatherType = useMemo(()=>{
     return  weatherCodeToType(weatherCode);
    },[weatherCode])
    


    return (
        <IconContainer>
            {/* <DayCloudy /> */}
            {weatherIcons[moment][weatherType]}
        </IconContainer>
    )
}

export default WeatherIcon;