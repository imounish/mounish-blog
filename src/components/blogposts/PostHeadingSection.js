import React from 'react';
import SocialShareButtons from '../social/SocialShareButtons';
import TagsArray from '../tags/TagsArray';

function PostHeadingSection({ postTitle, postSubHeading, postAuthor, postPublishedAt, tags, ...props }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  return (
    <div className="py-4 px-4">
      <div className="flex flex-col items-center justify-center text-center py-2 lg:py-4">
        <h1 className="font-warnockdisp font-semibold text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-gray-50 py-2 lg:py-4">
          {postTitle}
        </h1>
        <h3 className="font-warnocksubh font-light text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 py-1 lg:py-2 px-2">
          {postSubHeading}
        </h3>
      </div>
      <hr />
      <div className="flex flex-row items-center justify-between py-2 lg:py-4">
        <div className="flex flex-col items-start font-worksans text-gray-700 dark:text-gray-300">
          <p className="font-warnockcapt lowercase text-base font-bold italic pl-0.5">
            published on
          </p>
          <p className="text-base">
            {new Date(postPublishedAt).toLocaleDateString("en-us", {
              // weekday: 'short',
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        {tags && (
          <TagsArray
            tags={tags}
            className="font-worksans text-md gap-1 flex flex-col items-center  sm:text-base sm:gap-4 sm:flex-row sm:items-center"
          />
        )}

        {/* social share links not working correctly, check once */}
        <SocialShareButtons url={url} title={postTitle} />
      </div>
    </div>
  );
}

export default PostHeadingSection