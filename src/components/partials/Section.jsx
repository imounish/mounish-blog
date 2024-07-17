import React from "react";
import SectionHeading from "../typography/SectionHeading";

function Section({ children, className, sectionHeading, ...props }) {
  return (
    <div className={`px-6 py-2 ${className || ""}`} {...props}>
      {sectionHeading && (
        <SectionHeading className="pt-2 font-semibold lowercase lg:pt-4">
          {/* section heading classname - mx-auto px-4 lg:px-12 */}
          {sectionHeading}
        </SectionHeading>
      )}
      {children}
    </div>
  );
}

export default Section;
