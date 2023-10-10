import { Link } from 'gatsby';
import React from 'react';
import { socialLinks, websiteUrl } from '../../constants/social';

function Footer() {
  return (
    <footer className="w-full px-0 sm:px-4 dark:bg-black dark:text-gray-400 text-gray-800 font-worksans">
      <div className="w-full mx-auto max-w-full p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm sm:text-center">
          © {new Date().getFullYear()}{' '}
          <a href={websiteUrl} target="blank" className="hover:underline">
            mounish.dev™.
          </a>{' '}
          All Rights Reserved.
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
        <ul className="flex flex-wrap mt-3 items-center sm:mt-0">
          {socialLinks.map((item) => (
            <li key={item.name} className="mr-4 sm:mr-0 ml-0 sm:ml-4">
              <a href={item.url} target="blank">
                {item.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
