import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';

import { semaphores } from './constant';

const semaphoreStyle = new Style({
  image: new Icon({
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction',
    size: [24, 24],
    offset: [0, 0],
    src: '/semaphore.svg',
  }),
});

const allSemaphores = semaphores.features.map((semaphore) => {
  const iconFeatures = new Feature({
    geometry: new Point([semaphore.geometry.coordinates[0], semaphore.geometry.coordinates[1]]),
    name: semaphore.id,
    properties: {
      ...semaphore.properties,
    },
  });
  iconFeatures.setStyle(semaphoreStyle);
  return iconFeatures;
});

const semaphoreSource = new VectorSource({
  features: allSemaphores,
});

export const semaphoreLayer = new VectorLayer({
  source: semaphoreSource,
});
