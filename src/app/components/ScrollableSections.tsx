import React, { Fragment, MutableRefObject } from "react";

interface SectionConfig {
  id: string;
  Component: React.ComponentType;
}

interface ScrollableSectionsProps {
  sections: readonly SectionConfig[];
  sectionRefs: MutableRefObject<Record<string, HTMLElement | null>>;
  scrollMarginTop?: string;
}

/**
 * Renders a list of page sections with proper refs for scroll detection
 * Each section is wrapped with an id and ref for navigation tracking
 */
export default function ScrollableSections({
  sections,
  sectionRefs,
  scrollMarginTop = "10px",
}: ScrollableSectionsProps) {
  return (
    <>
      {sections.map(({ id, Component }) => (
        <Fragment key={id}>
          <section
            id={id}
            ref={(node) => {
              sectionRefs.current[id] = node;
            }}
            className="relative"
            style={{ scrollMarginTop }}
          >
            <Component />
          </section>
        </Fragment>
      ))}
    </>
  );
}
