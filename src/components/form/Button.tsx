import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

type ButtonProps = {
  title: string;
  variant?: 'primary' | 'secondary' | 'disabled' | 'danger';
  onPress: () => void;
};

const Button: React.FC<ButtonProps> = ({ title, variant = 'primary', onPress }) => {
  const buttonStyle = [
    styles.button,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    variant === 'disabled' && styles.disabled,
    variant === 'danger' && styles.danger,
  ];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={variant === 'disabled'}>
      <Text
        style={[
          styles.text,
          variant === 'secondary' && styles.secondaryText,
          variant === 'disabled' && styles.disabledText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '80%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  disabled: {
    backgroundColor: colors.gray,
  },
  danger: {
    backgroundColor: colors.red,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  secondaryText: {
    color: colors.white,
  },
  disabledText: {
    color: colors.white,
  },
});

export default Button;