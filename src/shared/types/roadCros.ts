interface Properties {
  roadid: string;
  road_code: number;
  km_beg: number;
  k_s025_1: string;
  angle: number | null;
  name: string;
  width: number;
  create_date: null;
  delete_date: null;
}

interface Geometry {
  type: string;
  coordinates: number[][][];
}

interface MarkerPoint {
  type: string;
  coordinates: number[];
}

interface Features {
  id: number;
  type: string;
  id_layer: number;
  tooltip: null;
  icon: string;
  marker_point: MarkerPoint;
  angle: number;
  has_files: boolean;
  has_images: boolean;
  geometry: Geometry;
  properties: Properties;
}
export interface RoadCros {
  crs: null;
  type: string;
  stat: null;
  features: Features[];
}
