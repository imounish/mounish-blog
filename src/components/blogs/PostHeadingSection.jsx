import React from 'react';
import socialShareButtons from '../social/SocialShareButtons';
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
    <div className="px-4 py-4">
      <div className="flex flex-col items-center justify-center py-2 text-center lg:py-4">
        <h1 className="font-warnockdisp py-2 text-4xl font-semibold text-gray-900 dark:text-gray-100 md:text-5xl lg:py-4 lg:text-6xl">
          {postTitle}
        </h1>
        <h3 className="font-warnocksubh px-2 py-1 text-xl font-light text-gray-700 dark:text-gray-400 md:text-2xl lg:py-2 lg:text-3xl">
          {postSubHeading}
        </h3>
      </div>
      <Break />
      <div className="font-worksans flex flex-row items-center justify-between py-2 text-gray-700 dark:text-gray-400 lg:py-4">
        {timeToRead && (
          <>
            <div className="flex w-full flex-row items-center justify-between md:hidden">
              <p>
                <span className="font-warnockcapt pl-0.5 pr-1.5 text-base font-bold lowercase italic">
                  published on
                </span>
                <span className="text-base">
                  {new Date(postPublishedAt).toLocaleDateString('en-us', {
                    // weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
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
                <span className="font-warnockcapt pl-0.5 pr-1.5 text-base font-bold lowercase italic">
                  published on
                </span>
                <span className="text-base">
                  {new Date(postPublishedAt).toLocaleDateString('en-us', {
                    // weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </p>
            </div>
          </>
        )}
        {!timeToRead && (
          <div className="flex flex-col items-start">
            <p>
              <span className="font-warnockcapt pl-0.5 pr-1.5 text-base font-bold lowercase italic">
                published on
              </span>
              <span className="text-base">
                {new Date(postPublishedAt).toLocaleDateString('en-us', {
                  // weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </p>
          </div>
        )}
        {/* social share links not working correctly, check once */}
        <ul className="hidden flex-row justify-between gap-4 align-middle md:flex">
          {socialShareButtons.map(item => (
            <li key={item.name} className="">
              <item.component
                url={postURL.siteUrl + postURL.path}
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
