import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'; 
import {FiPlus, FiArrowRight} from 'react-icons/fi'; 
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapIcon from '../utils/mapIcon';

import '../styles/pages/orphanages-map.css';

import mapMarkerImg from '../images/map-marker.svg';
import api from '../services/api'

interface Orphanage {
    id: number,
    latitude: number,
    longitude: number,
    name: string,
}

function OrphanagesMap() {
    
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    
    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        })
    }, []);

   return(
    <div className="page-map">
        <aside>
            <header>
                <img src={mapMarkerImg} alt="Happy" />
                <h2>Escolha um orfanato no mapa</h2>
                <p>Muitas crianças estao esperando pela sua visita :)</p>
            </header>

            <footer>
                <strong>Niteroi</strong>
                <span>Rio de Janeiro</span>
            </footer>
        </aside> 
            
       <Map 
        center={[-22.8682398,-43.6073292]}
        zoom={15}
        style={{ width:'100%', height:'100%'}}
       >
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
        />


        {orphanages.map(orphanage => {
            return(<Marker
                icon={mapIcon}
                position={[orphanage.latitude, orphanage.longitude]}
                key={orphanage.id}
                >
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                        {orphanage.name}
                        <Link to={`/orphanages/${orphanage.id}`}>
                            <FiArrowRight size={20} color="ff"></FiArrowRight>
                        </Link>
                    </Popup>
                </Marker>);
        })}
       </Map>

        <Link to="/orphanages/create" className="create-orphanage">
            <FiPlus size={32} color="#FFF"/>
        </Link>
    </div>
    ); 
}

export default OrphanagesMap;