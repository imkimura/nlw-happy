import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlus } from "react-icons/fi"; 
import { Marker, Popup, MapContainer, TileLayer } from 'react-leaflet';

import './styles.css';
import mapMarkerImg from "../../assets/images/map-marker.svg";
import mapIcon from '../../utils/mapIcon';
import api from '../../services/api';

interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: boolean;
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Rio do Sul</strong>
                    <span>Santa Catarina</span>
                </footer>
            </aside>

            <MapContainer  
                center={[-27.2092052,-49.6401092]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer 
                    // url="https://a.tile.apenstreetmap.org/{z}/{x}/{y}.png"
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

               {orphanages.map((orpahanage) => {
                   return (
                    <Marker 
                    position={[orpahanage.latitude, orpahanage.longitude]}
                    icon={mapIcon}
                    >
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                            Lar das meninas
                            <Link to="/orphanages/1">
                                <FiArrowRight size={20} color="#FFF" />
                            </Link>
                        </Popup>
                    </Marker>
                   )
               })}
            </MapContainer>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanagesMap;