import React from 'react';
import { Button, Tooltip } from '@material-tailwind/react';
import Section from '../partials/Section';
import SectionRest from '../partials/SectionRest';
import Input from '../input/Input';

function NewsletterSection({ heading, className }) {
  return (
    <Section className={className} sectionHeading={heading}>
      <SectionRest className="flex flex-col items-center justify-center ">
        <p className="font-warnock w-full text-center text-lg text-gray-700 dark:text-gray-300 sm:text-xl">
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
          className="font-worksans my-2 w-full rounded-lg px-5 py-3 text-lg sm:w-96 md:mt-3"
        />
        <Button
          size="sm"
          className="font-worksans dark:text-blue-gray-900 dark:shadow-blue-gray-500/10 dark:hover:shadow-blue-gray-500/20 mb-1 mt-2 w-full text-lg font-medium lowercase dark:bg-white sm:w-96"
        >
          subscribe
        </Button>
        <div className="flex flex-row items-center justify-center pt-1">
          <p className="font-warnockcapt text-md text-base text-gray-600 dark:text-gray-400 sm:text-lg">
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
              <p className="font-worksans w-auto px-1 py-1 text-center">
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
            <p className="font-warnockcapt text-md pl-1 text-base text-gray-600 underline dark:text-gray-400 sm:text-lg">
              More info
            </p>
          </Tooltip>
        </div>
      </SectionRest>
    </Section>
  );
}

export default NewsletterSection;
