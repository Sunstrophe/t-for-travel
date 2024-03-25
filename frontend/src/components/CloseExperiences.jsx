import React, { useState } from 'react'
import { Marker, useMapEvent } from 'react-leaflet'

function CloseExperiences() {
    const [experiences, setExeperiences] = useState(null)

    const getExperiences = async() => {
        const mapCenter = map.getCenter()
        const lat = mapCenter["lat"]
        const lng = mapCenter["lng"]
    
        const response = await fetch(`http://localhost:8000/experience?lat=${lat}&lng=${lng}`, {
          method: "GET",
        })
        if (!response.ok) {
          throw new Error("Error getting experiences")
        }
        const data = await response.json()
        console.log(data)
        setExeperiences(data)
      }

    const map = useMapEvent({
        moveend () {
            // console.log("TEST!!!")
            getExperiences()
        }
    })

    const getMarker = (experience) => {
        console.log(experience)
        const latitude = experience["latitude"]
        const longitude = experience["longitude"]
        const position = latitude + ", " + longitude
        return <Marker position={position} />
    }


  return experiences === null ? null : 
    (experiences.forEach(getMarker))
  
}

export default CloseExperiences