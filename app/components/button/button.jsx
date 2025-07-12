import { Icon } from '~/components/icon';
import { Loader } from '~/components/loader';
import { Transition } from '~/components/transition';
import { Link } from '@remix-run/react';
import { forwardRef } from 'react';
import { classes } from '~/utils/style';
import styles from './button.module.css';

function isExternalLink(href) {
  return href?.includes('://');
}

export const Button = forwardRef(({ href, ...rest }, ref) => {
  if (isExternalLink(href) || !href) {
    return <ButtonContent href={href} ref={ref} {...rest} />;
  }

  return (
    <ButtonContent
      as={Link}
      to={href}
      ref={ref}
      {...rest}
    />
  );
});

const ButtonContent = forwardRef(
  (
    {
      className,
      as,
      secondary,
      loading,
      loadingText = 'loading',
      icon,
      iconEnd,
      iconHoverShift,
      iconOnly,
      children,
      rel,
      target,
      href,
      disabled,
      onClick,
      ...rest
    },
    ref
  ) => {
    const isExternal = isExternalLink(href);
    const defaultComponent = href ? 'a' : 'button';
    const Component = as || defaultComponent;

    const handleClick = (event) => {
      // Prevent form submission on hover events
      if (event.type === 'mouseenter' || event.type === 'mouseover') {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      
      // Call original onClick if provided
      if (onClick) {
        onClick(event);
      }
    };

    return (
      <Component
        className={classes(styles.button, className)}
        data-loading={loading}
        data-icon-only={iconOnly}
        data-secondary={secondary}
        data-icon={icon}
        href={href}
        rel={rel || isExternal ? 'noopener noreferrer' : undefined}
        target={target || isExternal ? '_blank' : undefined}
        disabled={disabled}
        ref={ref}
        onClick={handleClick}
        {...rest}
      >
        {!!icon && (
          <Icon
            className={styles.icon}
            data-start={!iconOnly}
            data-shift={iconHoverShift}
            icon={icon}
          />
        )}
        {!!children && <span className={styles.text}>{children}</span>}
        {!!iconEnd && (
          <Icon
            className={styles.icon}
            data-end={!iconOnly}
            data-shift={iconHoverShift}
            icon={iconEnd}
          />
        )}
        <Transition unmount in={loading}>
          {({ visible, nodeRef }) => (
            <Loader
              ref={nodeRef}
              className={styles.loader}
              size={32}
              text={loadingText}
              data-visible={visible}
            />
          )}
        </Transition>
      </Component>
    );
  }
);
