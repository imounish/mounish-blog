import React from 'react';
import { Link } from 'gatsby';
import { socialLinks, websiteUrl } from '../../constants/social';

function Footer() {
  return (
    <footer className="font-worksans w-full px-0 text-gray-800 dark:bg-black dark:text-gray-400 sm:px-4">
      <div className="mx-auto w-full max-w-full px-4 py-4 sm:px-0 md:flex md:items-center md:justify-between">
        <span className="text-sm sm:text-center">
          &#169; {new Date().getFullYear()}{' '}
          <a
            href={websiteUrl}
            target="blank"
            className="text-gray-800 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-200"
          >
            mounish.dev
          </a>
          &#8482;. All Rights Reserved.
        </span>
        {/* <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
          <li>
            <Link to="/about" className="mr-4 hover:underline md:mr-6">
              About
            </Link>
          </li>
          <li>
            <a
              href="https://mounish.dev/privacy-policy"
              className="mr-4 hover:underline md:mr-6"
            >
              Privacy Policy
            </a>
          </li>
        </ul> */}
        <div className="flex flex-row items-end justify-between gap-4 md:justify-start">
          <ul className="mt-3 flex flex-wrap items-center gap-4 md:mt-0">
            {socialLinks.map(item => (
              <li key={item.name} className="">
                <a href={item.url} target="blank">
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>

          <p className="font-worksans text-xs md:text-sm">
            Built with <span style={{ color: '#e25555' }}>&#9829;</span> by{' '}
            <Link
              to="/authors/mounish-pedagandham"
              className="text-gray-800 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-200"
            >
              Mounish
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
