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
import ioitImage from '~/assets/ioit.png';
import portfolioM from '~/assets/portfolioM.png'

const projects = [
  {
    name: 'DT40 DaLieu IOIT WEB/APP',
    image: ioitImage,
    description: 'An advanced dermatology management system with AI-powered skin analysis capabilities. Built with modern web technologies, this application helps healthcare professionals diagnose skin conditions through image analysis, providing an innovative approach to dermatological record management and patient care.',
    technologies: ['React', 'Node.js', 'AI/ML', 'Healthcare APIs'],
  },
  {
    name: 'Broom',
    image: broomImage,
    description: 'A comprehensive Vue.js-based accommodation booking platform inspired by Airbnb. Features include dynamic property listings, interactive maps with location services, advanced search and filtering capabilities, and a complete booking management system with user authentication and payment processing.',
    technologies: ['Vue.js', 'Vuex', 'Vue Router', 'Map APIs', 'Payment Integration'],
  },
  {
    name: 'Bi-note',
    image: biNoteImage,
    description: 'A collaborative reading platform designed to foster learning culture within organizations. The system tracks individual reading progress, provides detailed analytics, and enables team discussions. Features include study hour scheduling, note-taking capabilities similar to Notion, and comprehensive reading statistics to encourage continuous learning.',
    technologies: ['React', 'Node.js', 'Real-time Features', 'Analytics', 'Collaboration Tools'],
  },
  {
    name: 'Portfolio 2024',
    image: portfolioM,
    description: 'A modern, responsive portfolio website showcasing my work and skills. Built with Remix and featuring smooth animations, 3D elements, and a focus on accessibility and performance.',
    technologies: ['Remix', 'React', 'Three.js', 'CSS Modules', 'Vite'],
  },
  {
    name: 'Coming soon...',
    image: null,
    description: 'More exciting projects are in development. Stay tuned for updates on new web applications, mobile apps, and innovative solutions!',
    technologies: ['In Development'],
  },
];

export const SmartSparrow = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const imageWrapperStyle = {
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '15px',
    margin: '20px auto',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
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
                {project.technologies && (
                  <div style={{ marginTop: '16px' }}>
                    <Text size="s" as="p" style={{ marginBottom: '8px', fontWeight: '500' }}>
                      Technologies:
                    </Text>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          style={{
                            background: 'var(--accent)',
                            color: 'var(--black)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </ProjectTextRow>
              {project.image && (
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
              )}
            </ProjectSectionContent>
          </ProjectSection>
        ))}
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};