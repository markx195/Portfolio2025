import { Form, useActionData, useNavigation } from '@remix-run/react';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Input } from '~/components/input';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { useFormInput } from '~/hooks';
import { useRef } from 'react';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { baseMeta } from '~/utils/meta';

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}

export const meta = () => {
  return baseMeta({
    title: 'Contact',
    description:
      "Get in touch with me to discuss potential projects, collaborations, or just to say hello. I'm always interested in new opportunities and interesting conversations.",
    keywords: 'contact, hire, collaboration, web development, front-end development',
    ogType: 'website',
  });
};

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;

export async function action({ request }) {
  console.log('Contact action called');
  const { json } = await import('@remix-run/node');
  return json({ success: true });
}

export default function Contact() {
  const errorRef = useRef();
  const email = useFormInput('');
  const message = useFormInput('');
  const initDelay = tokens.base.durationS;
  const actionData = useActionData();
  const { state } = useNavigation();
  const sending = state === 'submitting';

  console.log('Contact component rendering, state:', state);

  return (
    <Section style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Transition unmount in={!actionData?.success} timeout={1600}>
        {({ status, nodeRef }) => (
          <Form
            method="post"
            ref={nodeRef}
            noValidate
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <Heading
              level={3}
              as="h1"
              style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText text="Say hello" start={status !== 'exited'} delay={300} />
            </Heading>
            <Divider
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
            />
            <Input
              required
              style={getDelay(tokens.base.durationXS, initDelay)}
              autoComplete="email"
              label="Your email"
              type="email"
              name="email"
              maxLength={MAX_EMAIL_LENGTH}
              {...email}
            />
            <Input
              required
              multiline
              style={getDelay(tokens.base.durationS, initDelay)}
              autoComplete="off"
              label="Message"
              name="message"
              maxLength={MAX_MESSAGE_LENGTH}
              {...message}
            />
            <Transition
              unmount
              in={!sending && actionData?.errors}
              timeout={msToNum(tokens.base.durationM)}
            >
              {({ status: errorStatus, nodeRef }) => (
                <div
                  ref={nodeRef}
                  data-status={errorStatus}
                  style={{ color: 'var(--error)', padding: '10px', backgroundColor: 'color-mix(in lab, var(--error) 10%, transparent)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon icon="error" />
                    {actionData?.errors?.email}
                    {actionData?.errors?.message}
                    {actionData?.errors?.general}
                  </div>
                </div>
              )}
            </Transition>
            <Button
              data-sending={sending}
              style={getDelay(tokens.base.durationM, initDelay)}
              disabled={sending}
              loading={sending}
              loadingText="Sending..."
              icon="send"
              type="submit"
            >
              Send message
            </Button>
          </Form>
        )}
      </Transition>
      <Transition unmount in={actionData?.success}>
        {({ status, nodeRef }) => (
          <div ref={nodeRef} style={{ textAlign: 'center', padding: '20px' }}>
            <Heading
              level={3}
              as="h3"
              data-status={status}
            >
              Message Sent
            </Heading>
            <Text
              size="l"
              as="p"
              data-status={status}
              style={getDelay(tokens.base.durationXS)}
            >
              I'll get back to you within a couple days, sit tight
            </Text>
            <Button
              secondary
              iconHoverShift
              data-status={status}
              style={getDelay(tokens.base.durationM)}
              href="/"
              icon="chevron-right"
            >
              Back to homepage
            </Button>
          </div>
        )}
      </Transition>
      <Footer />
    </Section>
  );
} 