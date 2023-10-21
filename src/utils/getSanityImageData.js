import { getImageData } from 'gatsby-plugin-image';

function urlBuilder({ baseUrl, width, height, format, options }) {
  return `${baseUrl}?w=${width}&h=${height}&fmt=${format}&q=${options.quality}`
}

export default function getSanityImageData({ image, ...props }) {
  return  getImageData({
    baseUrl: image.url,
    sourceWidth: image.width,
    sourceHeight: image.height,
    urlBuilder,
    format: ['auto'],
    options: {
      quality: 80,
    },
    pluginName: 'gatsby-source-sanity',
    ...props
  });
}