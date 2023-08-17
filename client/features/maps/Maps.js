import React, { useState, useEffect } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import mapStyles from "./mapStyles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Map() {
  const [selectedListing, setSelectedListing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [userMarker, setUserMarker] = useState(null);
  const [fetchedListings, setFetchedListings] = useState([]);

  useEffect(() => {
    axios.get(`/api/listings`)
      .then((response) => {
        const fetchedListings = response.data;
        setFilteredListings(fetchedListings);
        setFetchedListings(fetchedListings);
      })
      .catch((error) => {
        console.error("Error fetching listings:", error);
      });

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

    // Filter listings based on the search query
    const filteredListings = fetchedListings.filter((listing) =>
      listing.city.toLowerCase().includes(query.toLowerCase()) ||
      listing.state.toLowerCase().includes(query.toLowerCase()) ||
      listing.zipcode.includes(query)
    );

    setFilteredListings(filteredListings);
  };

  const navigate = useNavigate();
  const handleNavigateListing = () => {
    navigate(`/listings/${selectedListing.id}`)
  }

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
            scaledSize: new window.google.maps.Size(50, 50),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15)
          }}
        />
      )}

      {/* Render filtered listings */}
      {filteredListings.map(listing => (
        <Marker
          key={listing.id}
          position={{
            lat: listing.lat,
            lng: listing.lng
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
            lat: selectedListing.lat,
            lng: selectedListing.lng,
          }}
          onCloseClick={() => {
            setSelectedListing(null);
          }}
        >
          <div>
            <h2>{selectedListing.name}</h2>
            <p>Class Type: {selectedListing.classtype}</p>
            Address: {selectedListing.address}, {selectedListing.city},{" "}
            {selectedListing.state}, {selectedListing.zipcode}
            <p>Date & Time: {selectedListing.date} @ {selectedListing.time}</p>
            <p>Spots Available: {selectedListing.stock}</p>
            <p>Price: ${selectedListing.price}</p>
            <button onClick={handleNavigateListing}>Click Here to Book a Class!</button>
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
    //map takes up the entire screen with w/h settings
    <div className="googleMapBox" style={{ width: '100vw', height: '70vh' }}>
      {/* loads higher component "withScripts(withGoogleMap)" */}
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapsSecret}`}
        //  these three props are how we want the map to be displayed inside the div when the map renders
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  )
}