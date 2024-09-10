import { Link } from '~/components/link';
import { StoryContainer } from '../../../.storybook/story-container';

export default {
  title: 'Link',
};

export const Default = () => (
  <StoryContainer style={{ fontSize: 18 }}>
    <Link href="quanganh-mark.vercel.app">Primary link</Link>
    <Link secondary href="quanganh-mark.vercel.app">
      Secondary link
    </Link>
  </StoryContainer>
);
