import sliceAppPlaceholder from '~/assets/slice-app-placeholder.jpg';
import sliceApp from '~/assets/slice-app.jpg';
import bgIcd from '~/assets/icd10.jpg';
import sliceBackgroundBar from '~/assets/slice-background-bar.jpg';
import sliceBackgroundLarge from '~/assets/slice-background-large.jpg';
import sliceBackgroundPlaceholder from '~/assets/slice-background-placeholder.jpg';
import sliceBackground from '~/assets/slice-background.jpg';
import sliceSlidesPlaceholder from '~/assets/slice-slides-placeholder.jpg';
import sliceSlides from '~/assets/slice-slides.jpg';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { Fragment } from 'react';
import { media } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import styles from './slice.module.css';

const title = 'Clinical Coding Toolkit for Healthcare';
const description =
  'This project provides effective tools for managing disease coding and health conditions, supporting users in easily searching, viewing details, and sending feedback to improve service quality. With a user-friendly interface and bilingual support, this toolkit is a perfect solution for healthcare facilities and health management in Vietnam and internationally.';
const roles = ['UX and UI Design', 'Front End Development'];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const Slice = () => {
  return (
    <Fragment>
      <ProjectContainer className={styles.slice}>
        <ProjectBackground
          src={sliceBackground}
          srcSet={`${sliceBackground} 1280w, ${sliceBackgroundLarge} 2560w`}
          width={1280}
          height={800}
          placeholder={sliceBackgroundPlaceholder}
          opacity={0.8}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://icd.kcb.vn/"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={`${sliceApp} 400w, ${sliceApp} 800w, ${sliceApp} 1200w`}
              width={400}
              height={250}
              placeholder={sliceAppPlaceholder}
              alt="ICD."
              sizes={`(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw`}
              borderRadius={15}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Smart Search</ProjectSectionHeading>
              <ProjectSectionText>
                The system uses AI to support efficient searches, offering suggestions and auto-complete to help users find information more accurately. It enables searches across the entire system, including ICD-9 and ICD-10, without switching between modules. Users can filter results by code, name, includes, and notes, ensuring more relevant results. The detailed, intuitive interface helps users easily access information on disease codes and related medical issues.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${sliceSlides} 400w, ${sliceSlides} 800w, ${sliceSlides} 1200w`}
              width={400}
              height={250}
              placeholder={sliceSlidesPlaceholder}
              alt="The new My Slides tab in slice, showing annotated and favorited slides."
              sizes={`(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw`}
              borderRadius={15}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>ICD-10</ProjectSectionHeading>
              <ProjectSectionText>
                The toolkit also integrates a mortality statistics dashboard application for Vietnam with beautiful, intuitive charts and many flexible options:
              </ProjectSectionText>
              <ProjectSectionText>
                <ul>
                  <li>Allows users to track and analyze mortality data over time, helping identify trends and changes in data.</li>
                  <li>Detailed statistics of recorded deaths by the Ministry of Health, distributed by province and gender.</li>
                  <li>Display mortality distribution on a map, giving users an overview of mortality across different regions.</li>
                  <li>Intuitive charts showing mortality rates by gender, age, and diseases, providing deeper analysis of factors affecting mortality.</li>
                  <li>Users can select the time period, location, or disease type they want to track and analyze, making data usage flexible and suitable for practical needs.</li>
                </ul>
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${sliceBackgroundBar} 800w, ${sliceBackgroundBar} 1920w`}
              width={800}
              height={500}
              placeholder={sliceSlidesPlaceholder}
              alt="The new My Slides tab in slice, showing annotated and favorited slides."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
              borderRadius={15}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>ICD-10</ProjectSectionHeading>
              <ProjectSectionText>
                ICD-10 (International Classification of Diseases, 10th Revision) is a global system developed by WHO to code and classify diseases and health conditions.
              </ProjectSectionText>
              <ProjectSectionText>
                Users can easily navigate the list of ICD-10 chapters through a user-friendly web interface. The system supports fast, accurate searches within ICD-10 vol 1 and vol 3, with results displayed instantly. Detailed views of main groups, subgroups, and diseases are provided, with highlighted codes for each. A feedback function allows users to send comments, helping Admin improve the system’s quality.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${bgIcd} 800w, ${bgIcd} 1920w`}
              width={800}
              height={500}
              placeholder={sliceSlidesPlaceholder}
              alt="The new My Slides tab in slice, showing annotated and favorited slides."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
              borderRadius={15}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Project outcomes</ProjectSectionHeading>
              <ProjectSectionText>
              The project has successfully completed multiple testing phases and continues to undergo further development and improvements. We welcome your feedback and encourage you to stay tuned for the upcoming version ^-^.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
