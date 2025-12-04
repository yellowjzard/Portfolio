export type ImagePlaceholder = {
  id: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = [
  {
    id: 'ai-workflow',
    imageUrl: '/images/ai-workflow.jpg',
    imageHint: 'ai workflow',
  },
  {
    id: 'city-installation',
    imageUrl: '/images/city-installation.jpg',
    imageHint: 'city installation',
  },
  {
    id: 'graphic-design',
    imageUrl: '/images/graphic-design.jpg',
    imageHint: 'graphic design',
  },
  {
    id: 'science-art',
    imageUrl: '/images/science-art.jpg',
    imageHint: 'science art',
  },
  {
    id: '3d-scanning',
    imageUrl: '/images/3d-scanning.jpg',
    imageHint: '3d scanning',
  },
];
