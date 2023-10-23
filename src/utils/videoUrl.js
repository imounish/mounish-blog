import { getFileAsset } from '@sanity/asset-utils';
import sanityConfig from '../../sanity.config';

export default function videoAssetFor(source) {
  return getFileAsset(source.asset, sanityConfig);
}
