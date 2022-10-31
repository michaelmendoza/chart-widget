import React, { useState } from 'react';
import { MapOptions, MapOptionsList } from '../../../models/MapConstants'; 

interface Props {
    continent: any,
    setContinent: any
}

const MapSelect = (props : Props) => {

    const [continent, setContinent] = useState(props.continent);

    const handleChange = (event : any) => { 
        setContinent(event.target.value);
        if (props.setContinent) props.setContinent(event.target.value);
    };
    
    return (
        <div className='Continent-select'>
            <select onChange={handleChange} value={continent}>
                { Object.keys(MapOptionsList).map((mapOption) => <option key={mapOption} value={ mapOption }> {mapOption} </option>)}
            </select>
        </div>
    );
};

export default MapSelect;