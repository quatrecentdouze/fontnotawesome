import { useMemo } from 'react';
import { IconProps, parseIconName, getIconClass } from './utils';

export function useIcon(
  props: Omit<IconProps, 'icon'> & { icon: string }
) {
  const { icon, weight = 'solid', family = 'classic', variant, size } = props;

  return useMemo(() => {
    const { name, customWeight } = parseIconName(icon);
    const finalWeight = customWeight || weight;
    const className = getIconClass(name, finalWeight, family, variant);
    const sizeClass = size ? `fa-${size}` : '';

    return {
      className: [className, sizeClass].filter(Boolean).join(' '),
      weight: finalWeight,
      family,
    };
  }, [icon, weight, family, variant, size]);
}
