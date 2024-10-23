import React from 'react';
import styled from 'styled-components/native';

export const MyText = styled.Text``;
export const MapCallout = ({ restaurant }) => (
  <MyText>{restaurant.name}</MyText>
);
