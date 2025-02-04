interface Geometry {
  type: string;
  coordinates: [number, number, number][];
}

export interface LinesProperties {
  roadid: string;
  road_code: number;
  km_beg: number;
  km_end: number;
  delete_date: null | string;
  create_date: null | string;
}

interface MarkerPoint {
  type: string;
  coordinates: [number, number, number];
}

interface Features {
  id: number;
  type: string;
  id_layer: number;
  tooltip: null;
  icon: null;
  marker_point: MarkerPoint;
  angle: number;
  has_files: boolean;
  has_images: boolean;
  geometry: Geometry;
  properties: LinesProperties;
}

export interface Lines {
  crs: null;
  type: string;
  stat: null;
  features: Features[];
}
