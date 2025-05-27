import { Typography, TypographyProps } from '@mui/material';
import React from 'react';

type TextAtomProps = {
  variant: 'display' | 'headline' | 'title' | 'label' | 'body';
  size: 'large' | 'medium' | 'small';
} & Omit<TypographyProps, 'variant' | 'style'>;

const variantMap: Record<
  TextAtomProps['variant'],
  Record<TextAtomProps['size'], TypographyProps['variant']>
> = {
  display: {
    large: 'displayLarge',
    medium: 'displayMedium',
    small: 'displaySmall',
  },
  headline: {
    large: 'headlineLarge',
    medium: 'headlineMedium',
    small: 'headlineSmall',
  },
  title: {
    large: 'titleLarge',
    medium: 'titleMedium',
    small: 'titleSmall',
  },
  label: {
    large: 'labelLarge',
    medium: 'labelMedium',
    small: 'labelSmall',
  },
  body: {
    large: 'bodyLarge',
    medium: 'bodyMedium',
    small: 'bodySmall',
  },
};

const TextAtom: React.FC<TextAtomProps> = ({ variant, size, ...props }) => {
  const typographyVariant = variantMap[variant][size];

  return <Typography variant={typographyVariant} {...props} />;
};

export default TextAtom;
