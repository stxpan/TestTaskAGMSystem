import { encode } from '@googlemaps/polyline-codec';
import Feature from 'ol/Feature';
import Polyline from 'ol/format/Polyline';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

import { lines } from './constant';

const polylines = lines.features.map((feature) => {
  const polyline = encode(
    feature.geometry.coordinates.map((coord) => [coord[1], coord[0]]),
    6,
  );

  const line = new Polyline({
    factor: 1e6,
  }).readGeometry(polyline, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:4326',
  });

  const lineFeature = new Feature({
    type: 'route',
    geometry: line,
    properties: feature.properties,
  });

  return lineFeature;
});

const styles: Record<string, Style> = {
  route: new Style({
    stroke: new Stroke({
      width: 4,
      color: 'red',
    }),
  }),
};

export const vectorLayer = new VectorLayer({
  source: new VectorSource({
    features: polylines,
  }),
  style: (feature) => {
    return styles[feature.get('type')];
  },
});
