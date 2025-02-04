import React, { useEffect, useRef, useState } from 'react';
import { debounce } from 'es-toolkit';
import { Map, View } from 'ol';
import { defaults } from 'ol/interaction/defaults';
import TileLayer from 'ol/layer/Tile';
import Overlay from 'ol/Overlay.js';
import OSM from 'ol/source/OSM';

import { SemaphoreProperties } from '@/shared/lib/map/types/semaphores';

import 'ol/ol.css';

import Point from 'ol/geom/Point';

import { Panorama } from '@/features/panorama/panorama';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { allRoadCrosLayer, semaphoreLayer, vectorLayer } from '@/shared/lib/map';
import { isLinesProperties, isRoadCrosProperties, isSemaphoreProperties } from '@/shared/lib/map/properties';
import { LinesProperties } from '@/shared/lib/map/types/lines';
import { RoadCrosProperties } from '@/shared/lib/map/types/roadCros';

interface SemaphorePopupContent {
  geometry: Point;
  name: number;
  properties: SemaphoreProperties | RoadCrosProperties | LinesProperties;
}

function HomePage() {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const [coordinateForPopup, setCoordinateForPopup] = useState([0, 0]);
  const [semaphorePopupIsOpen, setSemaphorePopupIsOpen] = useState(false);
  const [popupContent, setSemaphorePopupContent] = useState<SemaphorePopupContent | undefined>(undefined);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (mapElementRef.current === null) {
      return;
    }

    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });

    const popupContainer = document.getElementById('popup');

    const popupOverlay = new Overlay({
      element: popupContainer ?? undefined,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });

    const map = new Map({
      target: mapElementRef.current,
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

    map.on('singleclick', (event) => {
      const hit = map.hasFeatureAtPixel(event.pixel);

      if (!hit) {
        return;
      }

      const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => {
        return feature;
      });

      setSemaphorePopupContent(feature?.getProperties() as SemaphorePopupContent);
      setSemaphorePopupIsOpen(true);
    });

    map.on('dblclick', (event) => {
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

    map.on('pointermove', (event) => {
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

    map.on('pointermove', (event) => {
      const hit = map.hasFeatureAtPixel(event.pixel);

      const target = map.getTarget();

      if (target && typeof target !== 'string') {
        target.style.cursor = hit ? 'pointer' : '';
      }
    });

    return () => map.setTarget();
  }, []);

  return (
    <div className="relative h-full w-full">
      <div style={{ height: '100%', width: '100%' }} ref={mapElementRef} className="map-container" />
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
