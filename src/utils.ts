export type IconWeight = 'thin' | 'light' | 'regular' | 'solid';
export type IconFamily =
  | 'classic'
  | 'sharp'
  | 'brands'
  | 'chisel'
  | 'etch'
  | 'jelly'
  | 'jelly-duo'
  | 'jelly-fill'
  | 'notdog'
  | 'notdog-duo'
  | 'slab'
  | 'slab-press'
  | 'thumbprint'
  | 'utility'
  | 'utility-duo'
  | 'utility-fill'
  | 'whiteboard';
export type IconVariant = 'duotone' | 'fill' | undefined;
export type IconSize = 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '1x' | '2x' | '3x' | '5x' | '7x' | '10x';

export interface IconProps {
  icon: string;
  size?: IconSize;
  weight?: IconWeight;
  family?: IconFamily;
  variant?: IconVariant;
}

export function parseIconName(icon: string): {
  name: string;
  customWeight?: IconWeight;
} {
  const parts = icon.split(':');
  let name = icon;
  let customWeight: IconWeight | undefined;

  if (parts.length === 2) {
    const [weight, iconName] = parts;
    if (
      ['thin', 'light', 'regular', 'solid'].includes(weight)
    ) {
      customWeight = weight as IconWeight;
      name = iconName;
    }
  }

  return { name, customWeight };
}

export function getIconClass(
  name: string,
  weight: IconWeight,
  family: IconFamily,
  variant?: IconVariant
): string {
  const baseClass = 'fa';
  const weightClass = weight !== 'solid' ? `fa-${weight}` : '';
  const familyClass = family !== 'classic' ? `fa-${family}` : '';
  const variantClass = variant ? `fa-${variant}` : '';
  const iconClass = `fa-${name}`;

  return [baseClass, familyClass, weightClass, variantClass, iconClass]
    .filter(Boolean)
    .join(' ');
}
