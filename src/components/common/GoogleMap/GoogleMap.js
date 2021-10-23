import { Circle, GoogleMap, LoadScript } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

const containerStyle = {
  width: "10vw",
  height: "10vw",
};

export default (props) => {
  console.log("stats Rendered");
  const [mapLocation, setMapLocation] = useState({
    radius: 20,
    lat: 32.109333,
    lng: 34.855499,
  });
  const center = {
    lat: mapLocation.lat,
    lng: mapLocation.lng,
  };

  const radiusRef = useRef(null);

  const updateLocations = () => {
    if (
      radiusRef.current === null ||
      (radiusRef.current.state.circle.radius / 1000 === mapLocation.radius &&
        radiusRef.current.state.circle.center.toJSON().lat ===
          mapLocation.lat &&
        radiusRef.current.state.circle.center.toJSON().lng === mapLocation.lng)
    )
      return;
    setMapLocation({
      radius: Math.round(radiusRef.current.state.circle.radius / 1000),
      lat: radiusRef.current.state.circle.center.toJSON().lat,
      lng: radiusRef.current.state.circle.center.toJSON().lng,
    });
  };

  useEffect(() => {
    props.setMapState(mapLocation);
  }, [mapLocation.radius, mapLocation.lat, mapLocation.lng]);

  const options = {
    strokeColor: "#116e72",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#116e72",
    fillOpacity: 0.35,
    clickable: true,
    draggable: true,
    editable: true,
    visible: true,
    radius: mapLocation.radius * 1000,
    zIndex: 1,
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCIrk_V17EOO1XG86v6tLaIfHmFXAF5r1Q"
      language="en"
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
        {/* Child components, such as markers, info windows, etc. */}

        <Circle
          ref={radiusRef}
          center={center}
          options={options}
          onDragEnd={() => {
            updateLocations();
          }}
          onRadiusChanged={() => updateLocations()}
        />
      </GoogleMap>
    </LoadScript>
  );
};
