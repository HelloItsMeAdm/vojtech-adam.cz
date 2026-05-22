export interface Photo {
  src: string;
  i18nKey: string;
  category: 'photo' | 'drone';
  aspect?: 'landscape' | 'portrait' | 'square';
}

export const photos: Photo[] = [
  {
    src: '/images/photos/koncert-zpevacka-modra.jpg',
    i18nKey: 'photography.photos.koncert-zpevacka-modra',
    category: 'photo',
    aspect: 'landscape',
  },
  {
    src: '/images/photos/makro-skorpion.jpg',
    i18nKey: 'photography.photos.makro-skorpion',
    category: 'photo',
    aspect: 'landscape',
  },
  {
    src: '/images/photos/sport-florbal-1.jpg',
    i18nKey: 'photography.photos.sport-florbal-1',
    category: 'photo',
    aspect: 'landscape',
  },
  {
    src: '/images/photos/business-editorial.jpg',
    i18nKey: 'photography.photos.business-editorial',
    category: 'photo',
    aspect: 'landscape',
  },
  {
    src: '/images/photos/event-soutez-radost.jpg',
    i18nKey: 'photography.photos.event-soutez-radost',
    category: 'photo',
    aspect: 'landscape',
  },
  {
    src: '/images/photos/animal-kolie.jpg',
    i18nKey: 'photography.photos.animal-kolie',
    category: 'photo',
    aspect: 'landscape',
  },
  {
    src: '/images/photos/portrait-car-castle.jpg',
    i18nKey: 'photography.photos.portrait-car-castle',
    category: 'photo',
    aspect: 'portrait',
  },
  {
    src: '/images/photos/event-dance-show.jpg',
    i18nKey: 'photography.photos.event-dance-show',
    category: 'photo',
    aspect: 'landscape',
  },
  {
    src: '/images/photos/reportaz-soutez.jpg',
    i18nKey: 'photography.photos.reportaz-soutez',
    category: 'photo',
    aspect: 'landscape',
  },
];

// Curated 4-photo mosaic for home page: tall left + 2 small top-right + wide dog bottom-right
export const teaserPhotos = [photos[0], photos[1], photos[2], photos[5]];
