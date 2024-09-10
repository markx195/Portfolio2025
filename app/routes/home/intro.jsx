import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { useTheme } from '~/components/theme-provider';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { VisuallyHidden } from '~/components/visually-hidden';
import { Link as RouterLink } from '@remix-run/react';
import { useInterval, usePrevious, useScrollToHash } from '~/hooks';
import { Suspense, lazy, useEffect, useState, useRef } from 'react';
import { cssProps } from '~/utils/style';
import config from '~/config.json';
import { useHydrated } from '~/hooks/useHydrated';
import styles from './intro.module.css';

const DisplacementSphere = lazy(() =>
  import('./displacement-sphere').then(module => ({ default: module.DisplacementSphere }))
);

export function Intro({ id, sectionRef, scrollIndicatorHidden, ...rest }) {
  const { theme } = useTheme();
  const { disciplines } = config;
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const [typedDiscipline, setTypedDiscipline] = useState('');
  const [showCaret, setShowCaret] = useState(true);
  const prevTheme = usePrevious(theme);
  const introLabel = disciplines.join(', ');
  const currentDiscipline = disciplines.find((item, index) => index === disciplineIndex);
  const titleId = `${id}-title`;
  const scrollToHash = useScrollToHash();
  const isHydrated = useHydrated();
  const caretRef = useRef(null);

  useInterval(
    () => {
      const index = (disciplineIndex + 1) % disciplines.length;
      setDisciplineIndex(index);
      setTypedDiscipline('');
    },
    5000,
    theme
  );

  useEffect(() => {
    if (prevTheme && prevTheme !== theme) {
      setDisciplineIndex(0);
      setTypedDiscipline('');
    }
  }, [theme, prevTheme]);

  useEffect(() => {
    if (currentDiscipline && typedDiscipline.length < currentDiscipline.length) {
      const timer = setTimeout(() => {
        setTypedDiscipline(currentDiscipline.slice(0, typedDiscipline.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentDiscipline, typedDiscipline]);

  useEffect(() => {
    if (caretRef.current) {
      caretRef.current.style.left = `${typedDiscipline.length * 0.6}em`;
    }
  }, [typedDiscipline]);

  useEffect(() => {
    const caretInterval = setInterval(() => {
      setShowCaret(prev => !prev);
    }, 500);
    return () => clearInterval(caretInterval);
  }, []);

  const handleScrollClick = event => {
    event.preventDefault();
    scrollToHash(event.currentTarget.href);
  };

  return (
    <Section
      className={styles.intro}
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}
    >
      <Transition in key={theme} timeout={3000}>
        {({ visible, status }) => (
          <>
            {isHydrated && (
              <Suspense>
                <DisplacementSphere />
              </Suspense>
            )}
            <header className={styles.text}>
              <h1 className={styles.name} data-visible={visible} id={titleId}>
                <DecoderText text={config.name} delay={500} />
              </h1>
              <Heading level={0} as="h2" className={styles.title}>
                <VisuallyHidden className={styles.label}>
                  {`${config.role} ${introLabel}`}
                </VisuallyHidden>
                <span aria-hidden className={styles.row}>
                  <span
                    className={styles.word}
                    data-status={status}
                    style={cssProps({ delay: tokens.base.durationXS })}
                  >
                    {config.role}
                  </span>
                </span>
                <span aria-hidden className={styles.row}>
                  <span
                    className={styles.word}
                    data-status={status}
                    style={cssProps({ delay: tokens.base.durationL })}
                  >
                    {typedDiscipline}
                    <span 
                      className={styles.caret} 
                      ref={caretRef}
                      style={{ opacity: showCaret ? 1 : 0 }}
                    >
                      |
                    </span>
                  </span>
                </span>
              </Heading>
            </header>
            <RouterLink
              to="/#project"
              className={styles.scrollIndicator}
              data-status={status}
              data-hidden={scrollIndicatorHidden}
              onClick={handleScrollClick}
            >
              <VisuallyHidden>Scroll to projects</VisuallyHidden>
            </RouterLink>
            <RouterLink
              to="/#project"
              className={styles.mobileScrollIndicator}
              data-status={status}
              data-hidden={scrollIndicatorHidden}
              onClick={handleScrollClick}
            >
              <VisuallyHidden>Scroll to projects</VisuallyHidden>
              <svg
                aria-hidden
                stroke="currentColor"
                width="43"
                height="15"
                viewBox="0 0 43 15"
              >
                <path d="M1 1l20.5 12L42 1" strokeWidth="2" fill="none" />
              </svg>
            </RouterLink>
          </>
        )}
      </Transition>
    </Section>
  );
}
