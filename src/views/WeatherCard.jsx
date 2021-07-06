
import styled from "@emotion/styled"
import dayjs from "dayjs"

import WeatherIcon from "../component/WeatherIcon.jsx";
import { ReactComponent as RainIcon } from "../image/weather-icons/images/rain.svg"
import { ReactComponent as AirFlowIcon } from "../image/weather-icons/images/airFlow.svg"
import { ReactComponent as RefreshIcon } from "../image/weather-icons/images/refresh.svg"
import { ReactComponent as LoadingIcon } from "../image/weather-icons/images/loading.svg"
import { ReactComponent as CogIcon } from "../image/weather-icons/images/cog.svg"



const WeatherCardWrapper = styled.div`
position: relative;
min-width:360px;
box-shadow:${({ theme }) => theme.boxShadow};
background-color: ${({ theme }) => theme.foregroundColor};
box-sizing:border-box;
padding: 30px 15px;
`
const Location = styled.div`
font-size:28px;
color:${({ theme }) => theme.titleColor};
margin-bottom:20px;
`
const Cog = styled(CogIcon)`
position:absolute;
top: 30px;
right: 15px;
width:15px;
height:15px;
cursor:pointer;
`
const Description = styled.div`
font-size:15px;
color:${({ theme }) => theme.textColor};
margin-bottom:20px;
`
const WeatherElement = styled.div`
display:flex;
justify-content:space-between;
flex-wrap:nowrap;
height:100px;
`
const Temperature = styled.div`
color:${({ theme }) => theme.temperatureColor};
font-size: 60px;
text-align:center;
vertical-align:middle;
display:flex;
justify-content:center;
line-height:100px
`
const Celsius = styled.span`
display:inline-block;
font-size: 30px;
line-height:60px;
`

const AirFlow = styled.div`
color:${({ theme }) => theme.textColor};
margin: 10px 0 0 0;
svg{
  width:25px;
  height:auto;
  margin: 0 30px 0 0;
}
`
const Rain = styled.div`
color:${({ theme }) => theme.textColor};
margin: 10px 0 0 0;
svg{
  width:25px;
  height:auto;
  margin: 0 30px 0 0;
}
`
const Refresh = styled.div`
color:${({ theme }) => theme.textColor};
text-align:end;
height:25px;
line-height: 25px;
font-size:0.5rem;

svg{
  display:inline;
  width:20px;
  height:20px;
  margin: 0 0 0 30px;
  vertical-align:middle;
  cursor:pointer;
  ${({ isLoading }) => {
        return isLoading ? "animation :rotate infinite 1.5s linear" : ""
    }};
  
}
@keyframes rotate{
  from{
    transform: rotate(360deg);
  } to {
    transform: rotate(0deg);}
}
`





function WeatherCard({ weatherElement, moment, fetchData, handleCurrentPageChange }) {
    const {
        locationName,
        description,
        windSpeed,
        temperature,
        rainPossibility,
        observationTime,
        isLoading,
        comfortability,
        weatherCode
    } = weatherElement

    return (
        <WeatherCardWrapper>
            <Location>
                {locationName}
                <Cog onClick={() => { handleCurrentPageChange("WeatherSetting") }} />
            </Location>
            <Description>{description}{" " + comfortability}</Description>
            <WeatherElement>
                <Temperature>
                    {Math.round(temperature)}<Celsius>°c </Celsius>
                </Temperature>
                <WeatherIcon weatherCode={weatherCode} moment={moment} />
            </WeatherElement>
            <AirFlow>
                <AirFlowIcon />{windSpeed} m/h
            </AirFlow>
            <Rain><RainIcon />{rainPossibility}%</Rain>
            <Refresh isLoading={isLoading}>
                最後觀測時間 : {new Intl.DateTimeFormat('zh-TW', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                }).format(dayjs(observationTime))}
                {isLoading ?
                    <LoadingIcon /> : <RefreshIcon onClick={fetchData} />}
            </Refresh >
        </WeatherCardWrapper>
    )

}

export default WeatherCard;