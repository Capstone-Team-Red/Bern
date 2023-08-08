import React, { useState, useEffect } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import listingsData from "./data/listings.json";
import mapStyles from "./mapStyles";

function Map() {
  const [selectedListing, setSelectedListing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredListings, setFilteredListings] = useState(listingsData.info);
  const [userLocation, setUserLocation] = useState(null);
  const [userMarker, setUserMarker] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = { lat: latitude, lng: longitude };

          setUserLocation(userLocation);

          setUserMarker({
            lat: latitude,
            lng: longitude,
            time: new Date(),
          });

          // If user provides permission to their location, center the map on the user's location
          if (mapRef.current) {
            mapRef.current.panTo(userLocation);
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("User's location is not supported by this browser.");
    }
  }, []);

  const mapRef = React.useRef();

  // Function to filter listings based on the search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredListings = listingsData.info.filter(listing =>
      listing.fulladdress.city.toLowerCase().includes(query.toLowerCase()) ||
      listing.fulladdress.state.toLowerCase().includes(query.toLowerCase()) ||
      listing.fulladdress.zipcode.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredListings(filteredListings);
  };

  return (
    <GoogleMap
      defaultZoom={10}
      center={userLocation || { lat: 40.71427, lng: -74.00597 }}
      defaultOptions={{ styles: mapStyles }}
    >

      {/* Search Bar */}
      <div className="searchBarContainer">
        <input
          type="text"
          placeholder="Search for a listing by city, state, or zipcode!"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="searchBarField"
        />
      </div>

      {userMarker && (
        <Marker
          position={{ lat: userMarker.lat, lng: userMarker.lng }}
          icon={{
            //Optional: User's current location with personalized marker
            // url: "/images/logo.png",
            scaledSize: new window.google.maps.Size(50, 50),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15)
          }}
        />
      )}

      {/* Render filtered listings */}
      {filteredListings.map(listing => (
        <Marker
          key={listing.key}
          position={{
            lat: listing.latlng[0],
            lng: listing.latlng[1]
          }}
          onClick={() => {
            setSelectedListing(listing);
          }}
          icon={{
            url: "/images/logo.png",
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      ))}

      {selectedListing && (
        <InfoWindow
          position={{
            lat: selectedListing.latlng[0],
            lng: selectedListing.latlng[1],
          }}
          onCloseClick={() => {
            setSelectedListing(null);
          }}
        >
          <div>
            <h2>{selectedListing.name.name}</h2>
            <p>Class Type: {selectedListing.classtype}</p>
            <p>Address: {Object.values(selectedListing.fulladdress).join(", ")}</p>
            <p>Date & Time: {Object.values(selectedListing.datetime).join(" @ ")}</p>
            <p>Spots Available: {selectedListing.stock}</p>
            <p>Price: {selectedListing.price}</p>
            <p>Interested in booking a class?</p>
            <p>
              {selectedListing.link.map((link, index) => (
                <li key={index}>
                  <a href={`//${link}`}>
                    CLICK THIS LINK FOR NEXT STEPS!
                  </a>
                </li>
              ))}
            </p>

          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default function Maps() {
  const WrappedMap = withScriptjs(withGoogleMap(Map))
  const [mapsSecret, setMapsSecret] = useState();

  useEffect(() => {
    const fetchMapsSecret = async () => {
      const response = await fetch("/get-maps-secret");
      const data = await response.json();
      setMapsSecret(data.mapsSecret);
    };

    fetchMapsSecret();
  }, []);

  if (mapsSecret === null) { return null }
  return (
    //map takes up the entire sreen with w/h settings
    <div style={{ width: '100vw', height: '70vh' }}>
      {/* loads higher component "withScripts(withGoogleMap)" */}
      <WrappedMap
        googleMapURL={`http://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapsSecret}`}
        //  these three props are how we want the map to be displayed inside the div when the map renders
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  )
}
