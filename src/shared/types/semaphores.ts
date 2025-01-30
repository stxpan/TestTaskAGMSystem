interface Geometry {
  type: string;
  coordinates: [number, number, number];
}

export interface Properties {
  road_code: number;
  roadid: string;
  vertical_order: number;
  delete_date: null | string;
  km_beg: number;
  create_date: null | string;
}

interface Features {
  id: number;
  type: string;
  id_layer: number;
  tooltip: null;
  icon: null;
  marker_point: null;
  angle: number;
  has_files: boolean;
  has_images: boolean;
  geometry: Geometry;
  properties: Properties;
}

export interface Semaphores {
  crs: null;
  type: string;
  stat: null;
  features: Features[];
}
