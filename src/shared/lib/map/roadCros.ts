import Feature from 'ol/Feature';
import { Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

import { roadCros } from './constant';

const allRoadCros = roadCros.features.map((roadCros) => {
  const roadCrosFeatures = new Feature({
    geometry: new Polygon(roadCros.geometry.coordinates),
    name: roadCros.id,
    properties: {
      ...roadCros.properties,
    },
  });
  return roadCrosFeatures;
});

const allRoadCrosStyle = new Style({
  stroke: new Stroke({
    color: 'blue',
    width: 3,
  }),
  fill: new Fill({
    color: 'rgba(0, 0, 255, 0.1)',
  }),
});

const allRoadCrosSource = new VectorSource({
  features: allRoadCros,
});

export const allRoadCrosLayer = new VectorLayer({
  source: allRoadCrosSource,
  style: allRoadCrosStyle,
});
