import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { debounce } from 'es-toolkit';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import Overlay from 'ol/Overlay.js';
import OSM from 'ol/source/OSM';

import { Properties, Semaphores } from '@/shared/types/semaphores';

import semaphoresData from '../entities/semaphores.json';

import 'ol/ol.css';

import { toStringHDMS } from 'ol/coordinate';
import Feature, { FeatureLike } from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import { toLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';

const semaphores = semaphoresData as Semaphores;

interface SemaphorePopupContent {
  geometry: Point;
  name: number;
  properties: Properties;
}

function HomePage() {
  const mapElement = useRef();
  const [coordinateForPopup, setCoordinateForPopup] = useState([0, 0]);
  const [semaphorePopupIsOpen, setSemaphorePopupIsOpen] = useState(false);
  const [semaphorePopupContent, setSemaphorePopupContent] = useState<SemaphorePopupContent | undefined>(undefined);

  useEffect(() => {
    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });

    const iconStyle = new Style({
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
      iconFeatures.setStyle(iconStyle);
      return iconFeatures;
    });

    const vectorSource = new VectorSource({
      features: allSemaphores,
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const popupContainer = document.getElementById('popup');

    const popupOverlay = new Overlay({
      element: popupContainer,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });

    const map = new Map({
      target: mapElement.current,
      layers: [osmLayer, vectorLayer],
      view: new View({
        projection: 'EPSG:4326',
        center: [38.987857582, 45.026964681],
        zoom: 15,
      }),
      overlays: [popupOverlay],
    });

    map.on('singleclick', function (event) {
      const hit = map.hasFeatureAtPixel(event.pixel);

      if (!hit) {
        return;
      }

      const feature = map.forEachFeatureAtPixel(event.pixel, function (feature) {
        return feature;
      });

      setSemaphorePopupContent(feature?.getProperties() as SemaphorePopupContent);
      setSemaphorePopupIsOpen(!semaphorePopupIsOpen);
      console.log(feature?.getProperties());
    });

    const debouncedPopup = debounce((coordinate, isHit) => {
      if (isHit) {
        return;
      }
      setSemaphorePopupIsOpen(false);
      popupOverlay.setPosition(coordinate);
    }, 250);

    map.on('pointermove', function (event) {
      const coordinate = event.coordinate;
      const hit = map.hasFeatureAtPixel(event.pixel);

      debouncedPopup(coordinate, hit);

      if (hit) {
        popupOverlay.setPosition(undefined);
        return;
      }

      setCoordinateForPopup(coordinate);
      popupOverlay.setPosition(undefined);
    });

    map.on('pointermove', function (event) {
      const hit = map.hasFeatureAtPixel(event.pixel);
      map.getTarget().style.cursor = hit ? 'pointer' : '';
    });

    return () => map.setTarget(null);
  }, []);

  return (
    <div className="relative h-full w-full">
      <div style={{ height: '100%', width: '100%' }} ref={mapElement} className="map-container" />
      <div id="popup" className="absolute w-[400px] rounded-xl bg-black p-4">
        <div id="popup-content" className="flex justify-between">
          <div>{coordinateForPopup[0]}</div>
          <div>{coordinateForPopup[1]}</div>
        </div>
      </div>

      {semaphorePopupIsOpen && semaphorePopupContent && (
        <div
          id="semaphorePopup"
          className="absolute bottom-0 right-0 w-[300px] rounded-xl rounded-br-none rounded-tr-none bg-black p-4"
        >
          <div id="semaphorePopup-content" className="flex flex-col">
            <span>Create date: {semaphorePopupContent?.properties.create_date || 'Неизвестно'}</span>
            <span>Delete date: {semaphorePopupContent.properties.delete_date || 'Неизвестно'}</span>
            <span>Km Beg: {semaphorePopupContent.properties.km_beg || 'Неизвестно'}</span>
            <span>Road сode: {semaphorePopupContent.properties.road_code}</span>
            <span>Road id: {semaphorePopupContent.properties.roadid || 'Неизвестно'}</span>
            <span>Vertical Order: {semaphorePopupContent.properties.vertical_order || 'Неизвестно'}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
