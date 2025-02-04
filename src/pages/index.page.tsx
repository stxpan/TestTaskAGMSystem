import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { decode, encode } from '@googlemaps/polyline-codec';
import { debounce } from 'es-toolkit';
import { Map, View } from 'ol';
import GeoJSON from 'ol/format/GeoJSON.js';
import { defaults } from 'ol/interaction/defaults';
import DoubleClickZoom from 'ol/interaction/DoubleClickZoom.js';
import TileLayer from 'ol/layer/Tile';
import Overlay from 'ol/Overlay.js';
import OSM from 'ol/source/OSM';

import { SemaphoreProperties, Semaphores } from '@/shared/types/semaphores';

import linesData from '../entities/line.json';
import roadCrosData from '../entities/road_cros.json';
import semaphoresData from '../entities/semaphores.json';

import 'ol/ol.css';

import Feature from 'ol/Feature';
import Polyline from 'ol/format/Polyline.js';
import { Polygon } from 'ol/geom';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

import { Panorama } from '@/features/panorama/panorama';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { Lines, LinesProperties } from '@/shared/types/lines';
import { RoadCros, RoadCrosProperties } from '@/shared/types/roadCros';

const semaphores = semaphoresData as Semaphores;
const lines = linesData as Lines;
const roadCros = roadCrosData as RoadCros;

interface SemaphorePopupContent {
  geometry: Point;
  name: number;
  properties: SemaphoreProperties | RoadCrosProperties | LinesProperties;
}
const isSemaphoreProperties = (
  properties: SemaphoreProperties | RoadCrosProperties | LinesProperties,
): properties is SemaphoreProperties => {
  return 'vertical_order' in properties;
};

const isLinesProperties = (
  properties: SemaphoreProperties | RoadCrosProperties | LinesProperties,
): properties is LinesProperties => {
  return 'km_end' in properties;
};

const isRoadCrosProperties = (
  properties: SemaphoreProperties | RoadCrosProperties | LinesProperties,
): properties is RoadCrosProperties => {
  return 'k_s025_1' in properties;
};

function HomePage() {
  const mapElement = useRef();
  const [coordinateForPopup, setCoordinateForPopup] = useState([0, 0]);
  const [semaphorePopupIsOpen, setSemaphorePopupIsOpen] = useState(false);
  const [popupContent, setSemaphorePopupContent] = useState<SemaphorePopupContent | undefined>(undefined);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

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

    const source = new VectorSource({
      features: allRoadCros,
    });

    const allRoadCrosLayer = new VectorLayer({
      source: source,
      style: allRoadCrosStyle,
    });

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

    const styles = {
      route: new Style({
        stroke: new Stroke({
          width: 4,
          color: 'red',
        }),
      }),
    };

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: polylines,
      }),
      style: function (feature) {
        return styles[feature.get('type')];
      },
    });
    const semaphoreSource = new VectorSource({
      features: allSemaphores,
    });

    const semaphoreLayer = new VectorLayer({
      source: semaphoreSource,
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
      layers: [osmLayer, vectorLayer, semaphoreLayer, allRoadCrosLayer],
      view: new View({
        projection: 'EPSG:4326',
        center: [38.987857582, 45.026964681],
        zoom: 15,
      }),
      interactions: defaults({
        doubleClickZoom: false,
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
    });

    map.on('dblclick', function (event) {
      const hit = map.hasFeatureAtPixel(event.pixel);
      if (!hit) {
        return;
      }

      setDialogIsOpen(true);
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

      {semaphorePopupIsOpen && popupContent && (
        <div
          id="semaphorePopup"
          className="absolute bottom-0 right-0 w-[300px] rounded-xl rounded-br-none rounded-tr-none bg-black p-4"
        >
          <div id="semaphorePopup-content" className="flex flex-col">
            {isSemaphoreProperties(popupContent.properties) && (
              <>
                <span>Road сode: {popupContent.properties.road_code}</span>
                <span>Road id: {popupContent.properties.roadid || 'Неизвестно'}</span>
                <span>Km Beg: {popupContent.properties.km_beg || 'Неизвестно'}</span>
                <span>Vertical Order: {popupContent.properties.vertical_order || 'Неизвестно'}</span>
                <span>Create date: {popupContent?.properties.create_date ?? 'Неизвестно'}</span>
                <span>Delete date: {popupContent.properties.delete_date ?? 'Неизвестно'}</span>
              </>
            )}

            {isLinesProperties(popupContent.properties) && (
              <>
                <span>Road id: {popupContent.properties.roadid || 'Неизвестно'}</span>
                <span>Road сode: {popupContent.properties.road_code}</span>
                <span>Km Beg: {popupContent.properties.km_beg || 'Неизвестно'}</span>
                <span>Km End: {popupContent.properties.km_end || 'Неизвестно'}</span>
                <span>Create date: {popupContent?.properties.create_date ?? 'Неизвестно'}</span>
                <span>Delete date: {popupContent.properties.delete_date ?? 'Неизвестно'}</span>
              </>
            )}

            {isRoadCrosProperties(popupContent.properties) && (
              <>
                <span>Road id: {popupContent.properties.roadid || 'Неизвестно'}</span>
                <span>Road сode: {popupContent.properties.road_code}</span>
                <span>Km Beg: {popupContent.properties.km_beg || 'Неизвестно'}</span>
                <span>K_s025_1: {popupContent.properties.k_s025_1}</span>
                <span>Angle: {popupContent.properties.angle ?? 'Неизвестно'}</span>
                <span>Name: {popupContent.properties.name || 'Неизвестно'}</span>
                <span>Width: {popupContent.properties.width || 'Неизвестно'}</span>
                <span>Create date: {popupContent?.properties.create_date ?? 'Неизвестно'}</span>
                <span>Delete date: {popupContent.properties.delete_date ?? 'Неизвестно'}</span>
              </>
            )}
          </div>
        </div>
      )}

      <Dialog open={dialogIsOpen} onOpenChange={() => setDialogIsOpen(false)}>
        <DialogContent className="h-[90%] w-full max-w-full p-0 md:max-w-[90%]">
          <Panorama />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default HomePage;
