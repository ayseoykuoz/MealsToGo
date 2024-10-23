import React, { useContext, useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps'; // Correct import for MapView, Marker, Callout
import styled from 'styled-components/native';

import { LocationContext } from '../../../services/location/location.context';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';

import { Search } from '../components/search.component';
import { MapCallout } from '../components/map-callout.component'; // Correct file path and import

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantsContext);

  const [latDelta, setLatDelta] = useState(0);

  const { lat, lng, viewport } = location || {
    lat: 0,
    lng: 0,
    viewport: { northeast: { lat: 0 }, southwest: { lat: 0 } },
  };

  useEffect(() => {
    if (viewport) {
      const northeastLat = viewport.northeast.lat;
      const southwestLat = viewport.southwest.lat;
      setLatDelta(northeastLat - southwestLat);
    }
  }, [location, viewport]);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat || 0,
          longitude: lng || 0,
          latitudeDelta: latDelta || 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.placeId}
            title={restaurant.name}
            coordinate={{
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            }}
          >
            <Callout>
              <MapCallout
                onPress={() =>
                  navigation.navigate('RestaurantDetail', {
                    restaurant,
                  })
                }
                restaurant={restaurant}
              />
            </Callout>
          </Marker>
        ))}
      </Map>
    </>
  );
};
