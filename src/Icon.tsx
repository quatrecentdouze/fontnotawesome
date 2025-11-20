import { forwardRef, HTMLAttributes } from 'react';
import { IconProps, parseIconName, getIconClass } from './utils';

export const Icon = forwardRef<
  HTMLElement,
  IconProps & HTMLAttributes<HTMLElement>
>(
  (
    {
      icon,
      size,
      style,
      className,
      weight = 'solid',
      family = 'classic',
      variant,
      ...props
    },
    ref
  ) => {
    const { name, customWeight } = parseIconName(icon);
    const finalWeight = customWeight || weight;
    const classes = getIconClass(name, finalWeight, family, variant);
    const sizeClass = size ? `fa-${size}` : '';
    const finalClassName = [classes, sizeClass, className]
      .filter(Boolean)
      .join(' ');

    const finalStyle = {
      ...style,
    };

    return (
      <i
        ref={ref}
        className={finalClassName}
        {...props}
        style={finalStyle}
      />
    );
  }
);

Icon.displayName = 'Icon';
