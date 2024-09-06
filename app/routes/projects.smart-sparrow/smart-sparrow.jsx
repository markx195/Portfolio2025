import backgroundSprLarge from '~/assets/spr-background-large.jpg';
import backgroundSprPlaceholder from '~/assets/spr-background-placeholder.jpg';
import backgroundSpr from '~/assets/spr-background.jpg';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import { useTheme } from '~/components/theme-provider';
import { Fragment } from 'react';
import { media } from '~/utils/style';

const title = 'List of My Projects';
const description =
  'This is a collection of projects I’ve developed. Some are private, while others are not yet launched.';
const roles = [
  'UX and UI Design',
  'Front End Development',
];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

import broomImage from '~/assets/broom.png';
import biNoteImage from '~/assets/binote.png';

const projects = [
  {
    name: 'IOIT',
    image: biNoteImage,
    description: 'This project is designed to foster a reading culture among company employees by tracking individual reading progress and creating a collaborative learning environment. The platform allows users to monitor how many books they have read, view reading statistics, and engage in discussions. It also offers a study hour feature where employees can exchange insights. Additionally, the website tracks reading time and provides a note-taking functionality, similar to Notion, where users can document their thoughts and reflections as they read.',
  },
  {
    name: 'Broom',
    image: broomImage,
    description: 'A Vue.js-based project that simulates Airbnb functionality, featuring dynamic property listings, interactive maps, advanced search filters, and a responsive user interface. The app includes a booking system, offering a seamless experience for users to explore and book accommodations.',
  },
  {
    name: 'Bi-note',
    image: biNoteImage,
    description: 'This project is designed to foster a reading culture among company employees by tracking individual reading progress and creating a collaborative learning environment. The platform allows users to monitor how many books they have read, view reading statistics, and engage in discussions. It also offers a study hour feature where employees can exchange insights. Additionally, the website tracks reading time and provides a note-taking functionality, similar to Notion, where users can document their thoughts and reflections as they read.',
  },
  {
    name: 'Portfolio',
    image: biNoteImage,
    description: '2024 Portfolio'
  },
  // Add more projects as needed
];

export const SmartSparrow = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const imageWrapperStyle = {
    width: '300px',
    height: '188px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '15px',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  return (
    <Fragment>
      <ProjectContainer>
        <ProjectBackground
          opacity={isDark ? 0.5 : 0.8}
          src={backgroundSpr}
          srcSet={`${backgroundSpr} 1080w, ${backgroundSprLarge} 2160w`}
          placeholder={backgroundSprPlaceholder}
        />
        <ProjectHeader
          title={title}
          description={description}
          roles={roles}
        />
        {projects.map((project, index) => (
          <ProjectSection key={index} light={index % 2 === 0}>
            <ProjectSectionContent>
              <ProjectTextRow>
                <ProjectSectionHeading>{project.name}</ProjectSectionHeading>
                <ProjectSectionText>{project.description}</ProjectSectionText>
              </ProjectTextRow>
              <div style={imageWrapperStyle}>
                <Image
                  srcSet={`${project.image} 300w, ${project.image} 600w, ${project.image} 900w`}
                  src={project.image}
                  placeholder={project.image}
                  alt={`Screenshot of ${project.name}`}
                  sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 80vw, 70vw`}
                  style={imageStyle}
                />
              </div>
            </ProjectSectionContent>
          </ProjectSection>
        ))}
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};