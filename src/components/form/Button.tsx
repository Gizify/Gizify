import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

type ButtonProps = {
  title: string;
  variant?: 'primary' | 'secondary' | 'disabled';
  onPress: () => void;
};

const Button: React.FC<ButtonProps> = ({ title, variant = 'primary', onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant]]}
      onPress={onPress}
      disabled={variant === 'disabled'}
    >
      <Text style={[styles.text, variant === 'secondary' && styles.secondaryText, variant === 'disabled' && styles.disabledText]}>
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
    backgroundColor: colors.backgroundText,
  },
  disabled: {
    backgroundColor: colors.accent,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  secondaryText: {
    color: colors.text,
  },
  disabledText: {
    color: colors.gray,
  },
});

export default Button;