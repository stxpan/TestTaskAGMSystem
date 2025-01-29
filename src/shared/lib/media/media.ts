import { createMedia } from '@artsy/fresnel';

export const { MediaContextProvider, Media, createMediaStyle } = createMedia({
  breakpoints: {
    sm: 0,
    md: 768,
    lg: 1024,
    xl: 1192,
  },
});

export const mediaStyle = createMediaStyle();
