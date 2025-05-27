import React from 'react';
import { TextAtom } from '../atoms';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import okIcon from '../../assets/images/ok_icon-01.svg'

interface EmptySectionProps {
  title?: string; // Title text
  description?: string; // Description text
  imageIconPath?: string; // Path to the image icon
  height?: string | number; // Height of the section
  borderColor?: string; // Border color
}

const EmptySection: React.FC<EmptySectionProps> = ({
  title = '',
  description = '',
  imageIconPath: icon = okIcon,
  height = '20%',
  borderColor = 'primary.light',
}) => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height={height}
      textAlign="center"
      gap={2}
      sx={{
        border: '2px dashed',
        borderColor: borderColor,
        borderRadius: 2,
        padding: 3,
      }}
    >
      {icon && (
        <img
          src={icon}
          alt="Empty Section Icon"
            style={{
                maxHeight: '100px',
                maxWidth: '100px',
                width: 'auto',
            }}
        />
      )}

      <TextAtom variant="body" size="medium" fontWeight="bold">
          {title || t('components.molecules.emptySection.title', 'Sin registros para mostrar')}
        </TextAtom>

      <TextAtom variant="body" color="text.secondary" size="small">
          {description || t('components.molecules.emptySection.description', 'Parece que no tienes nada aquí. ¡Vuelve más tarde o crea una nuevo registro!')}
        </TextAtom>
    </Box>
  );
};

export default EmptySection;