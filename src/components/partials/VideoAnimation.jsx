import parse from 'html-react-parser';
import React, { useEffect } from 'react';
import videoAssetFor from '../../utils/videoUrl';

function VideoAnimation({ value }) {
  if (!value.webm && !value.fallback) {
    return null;
  }
  /* eslint-disable react-hooks/rules-of-hooks */
  /* eslint-disable import/no-extraneous-dependencies  */
  /* eslint-disable global-require */
  useEffect(() => {
    const loadLozad = async () => {
      const lozad = require('lozad');
      const observer = lozad();
      observer.observe();
    };

    loadLozad();
  });
  const webmAsset = videoAssetFor(value.webm);
  const fallbackAsset = videoAssetFor(value.fallback);
  const caption =
    parse(String(value.caption)) === 'undefined'
      ? null
      : parse(String(value.caption));

  return (
    <figure className="flex flex-col gap-1 py-4 md:gap-1.5">
      <video
        title={value.alt}
        className="lozad"
        loop
        muted
        autoPlay
        playsInline
      >
        <source
          data-src={webmAsset.url}
          type={`video/${webmAsset.extension}`}
        />
        <source
          data-src={fallbackAsset.url}
          type={`video/${fallbackAsset.extension}`}
        />
      </video>
      {caption && (
        <figcaption className="font-worksans text-center text-xs text-gray-500 md:text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default VideoAnimation;
