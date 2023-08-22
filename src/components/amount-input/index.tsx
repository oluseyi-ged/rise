/* eslint-disable @typescript-eslint/no-unused-vars */

import {SvgIcon} from '@components';
import {HDP} from '@helpers';
import React, {FC, useState} from 'react';
import {TextInput as TN, View} from 'react-native';
import styles from './styles';

interface Props {
  padding?: number;
  onSubmit?: () => void;
  // onPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: any;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  value?: any;
  containerStyle?: any;
  inputStyle?: any;
  marginTop?: number;
  textAlign?: 'left' | 'right' | 'center';
  error?: string;
  editable?: boolean;
  maxLength?: number;
  placeholder?: any;
  inputErrMsg?: any;
  bvnLength?: any;
  multiline?: boolean;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad';
  textPaddingVertical?: number;
  bottomTitle?: string;
  rightIcon?: string;
  shouldFocus?: boolean;
  onTouchStart?: () => void;
  [x: string]: any;
  lessMargin?: boolean;
  isError?: boolean;
  label?: string;
  type?: 'password' | 'text';
  iconName1?: string;
  iconName2?: string;
  iconSize1?: number;
  iconSize2?: number;
  onPress1?: any;
  onPress2?: any;
  placeholderTextColor?: string;
  numberOfLines?: number;
  innerStyle?: any;
  bordered?: boolean;
  white?: boolean;
  autoCorrect?: boolean;
}
export const AmountInput: FC<Props> = ({
  padding = HDP(12),
  inputStyle,
  placeholder,
  placeholderTextColor = '#98989A',
  keyboardType,
  onSubmit,
  onFocus,
  onBlur,
  editable,
  textAlign,
  textAlignVertical,
  multiline,
  refValue,
  value,
  maxLength,
  onChangeText,
  numberOfLines,
  innerStyle,
  bordered,
  shouldFocus,
  autoCorrect,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.mainWrap, inputStyle]}>
      <SvgIcon
        name="naira-green"
        size={30}
        containerStyle={{height: HDP(70)}}
      />
      <TN
        placeholder={placeholder}
        style={[styles.inputContainer, innerStyle]}
        placeholderTextColor={bordered ? '#EAFFD270' : placeholderTextColor}
        onFocus={() => {
          onFocus;
          setFocused(true);
        }}
        // onBlur={onBlur}
        maxLength={maxLength}
        editable={editable}
        textAlign={textAlign}
        textAlignVertical={textAlignVertical || 'top'}
        multiline={multiline}
        onSubmitEditing={onSubmit}
        ref={refValue}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        autoCapitalize={'none'}
        numberOfLines={numberOfLines}
        autoFocus={shouldFocus}
        autoCorrect={autoCorrect}
      />
    </View>
  );
};
