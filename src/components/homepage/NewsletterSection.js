import React from 'react'
import { Button, Tooltip,  } from "@material-tailwind/react";
import Section from "../partials/Section";
import SectionRest from '../partials/SectionRest';
import Input from "../input/Input";

function NewsletterSection() {
  return (
    <Section sectionHeading="stay in touch?">
      <SectionRest className="flex flex-col items-center justify-center ">
        <p className="w-full font-warnockcapt text-lg sm:text-xl text-gray-700 dark:text-gray-300 text-center">
          Hit that subscribe button (<i>after entering you email</i>) to be part
          of <i>not</i> <b>exclusive</b> fam and get latest updates.
        </p>
        <p className="font-warnockcapt text-xl sm:text-xl text-gray-800 dark:text-gray-100 mt-2 sm:mt-4">
          enter you email here
        </p>
        <Input
          type="email"
          name="Email"
          id="search"
          placeholder="jamesbond@mi6.com"
          className="py-3 px-5 mt-1 mb-2 w-full sm:w-96 font-worksans text-xl"
        />
        <Button
          size="sm"
          className="w-full sm:w-48 mt-2 mb-1 text-lg font-medium font-worksans lowercase dark:bg-white dark:text-blue-gray-900 dark:shadow-blue-gray-500/10 dark:hover:shadow-blue-gray-500/20"
        >
          subscribe
        </Button>

        <Tooltip
          styles={{
            bg: "bg-gray-700",
            fontFamily: "font-lora",
            py: "py-2",
            px: "px-2",
            fontSize: "text-sm",
            fontWeight: "font-medium",
          }}
          content={
            <p className="w-auto lowercase font-worksans text-center">
              i'll keep your email safe
              <br />
              <span className="text-gray-500">
                You'll not be pestered by any marketing emails from me.
                <br />If you
                are, then please don't be like James Bond and give your email
                everywhere.
              </span>
              {/* <Typography color="white" className="font-medium">
                Material Tailwind
              </Typography>
              <Typography
                variant="small"
                color="white"
                className="font-normal opacity-80"
              >
                Material Tailwind is an easy to use components library for
                Tailwind CSS and Material Design.
              </Typography> */}
            </p>
          }
          placement="bottom"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
        >
          <p className="font-warnock text-md lowercase text-base sm:text-lg text-gray-600 dark:text-gray-400">
            no spam from me
          </p>
        </Tooltip>
      </SectionRest>
    </Section>
  );
}

export default NewsletterSection;