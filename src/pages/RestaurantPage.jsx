import React from 'react';

import { useParams } from 'react-router-dom';

import RestaurantContainer from '@containers/RestaurantContainer';

export default function RestaurantPage({ params }) {
  const { id } = params || useParams();

  return <RestaurantContainer restaurantId={id} />;
}
