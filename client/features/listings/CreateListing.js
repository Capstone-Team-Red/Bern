import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { addListing } from '../../store/allListingsSlice';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
    const dispatch = useDispatch();
    const renterId = useSelector((state) => state.auth.me.id);

    const [name, setName] = useState('');
    const [classtype, setClasstype] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [mapsSecret, setMapsSecret] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMapsSecret = async () => {
            try {
                const response = await fetch("/get-maps-secret");
                const data = await response.json();
                setMapsSecret(data.mapsSecret);
            } catch (error) {
                console.error("Error fetching maps secret:", error);
            }
        };

        fetchMapsSecret();
    }, []);

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: `${address}, ${city}, ${state} ${zipcode}`,
                    key: mapsSecret
                },
            });

            const { results } = response.data;
            if (results && results.length > 0) {
                const { lat, lng } = results[0].geometry.location;

                dispatch(addListing({ renterId: renterId, name, classtype, address, city, state, zipcode, date, time, price, stock, lat, lng }));
                setName('');
                setClasstype('');
                setAddress('');
                setCity('');
                setState('');
                setZipcode('');
                setDate('');
                setTime('');
                setPrice('');
                setStock('');

                navigate(`/listings/${renterId}/renterListings`);
            }

        } catch (error) {
            console.error('Error geocoding:', error);
        }
    };

    return (
        <>
            <h1>Add a New Listing</h1>
            <form id='add-listing-form' onSubmit={handleSubmit}>
                <label htmlFor='name'>Title: </label>
                <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br></br>
                <label htmlFor='classtype'>Class Type: </label>
                <input
                    name="classtype"
                    value={classtype}
                    onChange={(e) => setClasstype(e.target.value)}
                />
                <br></br>
                <label htmlFor='address'>Address: </label>
                <input
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <br></br>
                <label htmlFor='city'>City: </label>
                <input
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <br></br>
                <label htmlFor='state'>State: </label>
                <input
                    name="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                <br></br>
                <label htmlFor='zipcode'>Zipcode: </label>
                <input
                    name="zipcode"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                />
                <br></br>
                <label htmlFor='date'>Date: </label>
                <input
                    name="date"
                    value={date}
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                />
                <br></br>
                <label htmlFor='time'>Time: </label>
                <input
                    name="time"
                    value={time}
                    type="time"
                    onChange={(e) => setTime(e.target.value)}
                />
                <br></br>
                <label htmlFor='price'>Price: </label>
                <input
                    name="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <br></br>
                <label htmlFor='stock'>Spots Available: </label>
                <input
                    name="stock"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
                <br></br>
                <button type="submit">Submit new listing</button>
                <br></br>
                <Link to='/*'>Cancel</Link>
            </form>
        </>
    );
};

export default CreateListing;