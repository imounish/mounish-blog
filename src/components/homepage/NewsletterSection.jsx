import React from 'react';
import { Button, Tooltip } from '@material-tailwind/react';
import Section from '../partials/Section';
import SectionRest from '../partials/SectionRest';
import Input from '../input/Input';

function NewsletterSection({ heading, className }) {
  return (
    <Section className={className} sectionHeading={heading}>
      <SectionRest className="flex flex-col items-center justify-center ">
        <p className="w-full font-warnock text-lg sm:text-xl text-gray-700 dark:text-gray-300 text-center">
          Hit that subscribe button (<i>ofc, after entering your email</i>) to
          be a part of <i>not</i> so <b>exclusive</b> fam and get latest
          updates.
        </p>
        {/* <p className="font-warnockcapt text-xl sm:text-xl text-gray-800 dark:text-gray-100 mt-2 sm:mt-4">
          enter you email here
        </p> */}
        <Input
          type="email"
          name="Email"
          id="search"
          placeholder="jamesbond@mi6.com"
          className="py-3 px-5 my-2 md:mt-3 w-full sm:w-96 font-worksans text-lg rounded-lg"
        />
        <Button
          size="sm"
          className="w-full sm:w-96 mt-2 mb-1 text-lg font-medium font-worksans lowercase dark:bg-white dark:text-blue-gray-900 dark:shadow-blue-gray-500/10 dark:hover:shadow-blue-gray-500/20"
        >
          subscribe
        </Button>
        <div className="flex flex-row items-center justify-center pt-1">
          <p className="font-warnockcapt text-md text-base sm:text-lg text-gray-600 dark:text-gray-400">
            I&apos;ll keep your email safe.
          </p>
          <Tooltip
            styles={{
              bg: 'bg-gray-700',
              fontFamily: 'font-lora',
              fontSize: 'text-sm',
              fontWeight: 'font-medium',
            }}
            content={
              <p className="py-1 px-1 w-auto font-worksans text-center">
                <span className="text-gray-500">
                  You&apos;ll receive no spam from me.
                  <br />
                  But, don&apos;t be like 007 disclosing his name everywhere.
                </span>
              </p>
            }
            placement="bottom"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
          >
            <p className="font-warnockcapt text-md text-base sm:text-lg text-gray-600 dark:text-gray-400 underline pl-1">
              More info
            </p>
          </Tooltip>
        </div>
      </SectionRest>
    </Section>
  );
}

export default NewsletterSection;
