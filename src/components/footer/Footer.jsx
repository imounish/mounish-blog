import React from 'react';
import { Link } from 'gatsby';
import { socialLinks, websiteUrl } from '../../constants/social';

function Footer() {
  return (
    <footer className="w-full px-0 sm:px-4 dark:bg-black dark:text-gray-400 text-gray-800 font-worksans">
      <div className="w-full mx-auto max-w-full py-4 px-4 sm:px-0 md:flex md:items-center md:justify-between">
        <span className="text-sm sm:text-center">
          &#169; {new Date().getFullYear()}{" "}
          <a href={websiteUrl} target="blank" className="hover:underline">
            mounish.dev
          </a>&#8482;.{" "}
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
        <div className="flex flex-row items-end justify-between md:justify-start gap-4">
          <ul className="flex flex-wrap mt-3 gap-4 items-center md:mt-0">
            {socialLinks.map((item) => (
              <li key={item.name} className="">
                <a href={item.url} target="blank">
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>

          <p className="font-worksans text-xs md:text-sm">
            Built with <span style={{ color: "#e25555" }}>&#9829;</span> by{' '}
            <Link to='/authors/mounish-pedagandham' className='hover:underline' >Mounish</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
