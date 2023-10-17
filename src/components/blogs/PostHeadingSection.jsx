import React from 'react';
import socialShareLinks  from '../social/SocialShareButtons';
import Break from '../partials/Break';
import TimeToRead from '../typography/TimeToRead';

function PostHeadingSection({
  postTitle,
  postSubHeading,
  postPublishedAt,
  postURL,
  timeToRead,
}) {
  return (
    <div className="py-4 px-4">
      <div className="flex flex-col items-center justify-center text-center py-2 lg:py-4">
        <h1 className="font-warnockdisp font-semibold text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 py-2 lg:py-4">
          {postTitle}
        </h1>
        <h3 className="font-warnocksubh font-light text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-400 py-1 lg:py-2 px-2">
          {postSubHeading}
        </h3>
      </div>
      <Break />
      <div className="flex flex-row items-center justify-between py-2 lg:py-4 font-worksans text-gray-700 dark:text-gray-400">
        {timeToRead && (
          <>
            <div className="w-full flex flex-row items-center justify-between md:hidden">
              <p>
                <span className="font-warnockcapt lowercase text-base font-bold italic pl-0.5 pr-1.5">
                  published on
                </span>
                <span className="text-base">
                  {new Date(postPublishedAt).toLocaleDateString("en-us", {
                    // weekday: 'short',
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </p>
              <p>
                <TimeToRead timeToRead={timeToRead} />
              </p>
            </div>
            <div className="hidden md:flex md:flex-col md:items-start">
              <TimeToRead timeToRead={timeToRead} />
              <p>
                <span className="font-warnockcapt lowercase text-base font-bold italic pl-0.5 pr-1.5">
                  published on
                </span>
                <span className="text-base">
                  {new Date(postPublishedAt).toLocaleDateString("en-us", {
                    // weekday: 'short',
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </p>
            </div>
          </>
        )}
        {!timeToRead && (
          <div className="flex flex-col items-start">
            <p>
              <span className="font-warnockcapt lowercase text-base font-bold italic pl-0.5 pr-1.5">
                published on
              </span>
              <span className="text-base">
                {new Date(postPublishedAt).toLocaleDateString("en-us", {
                  // weekday: 'short',
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </p>
          </div>
        )}
        {/* social share links not working correctly, check once */}
        <ul className="hidden md:flex flex-row align-middle justify-between gap-4 text-gray-700 dark:text-gray-400">
          {socialShareLinks.map((item) => (
            <li key={item.name} className="">
              <item.component
                url={postURL.siteURL + postURL.path}
                title={postTitle}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostHeadingSection;
