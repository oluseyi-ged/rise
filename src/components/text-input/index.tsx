/* eslint-disable react-native/no-inline-styles */
import {SizedBox} from '@components';
import {SvgIcon} from '@components/svg-icon';
import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import React, {FC, useEffect, useState} from 'react';
import {TextInput as TN, Text, View} from 'react-native';
import style from './styles';

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
  charLength?: any;
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
  labelStyle?: any;
}
export const TextInput: FC<Props> = ({
  padding = HDP(12),
  inputStyle,
  placeholder,
  placeholderTextColor = '#292F33',
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
  type,
  label,
  charLength = 0,
  onChangeText,
  iconName1,
  iconName2,
  iconSize1,
  iconSize2,
  onPress1,
  onPress2,
  numberOfLines,
  innerStyle,
  bordered,
  shouldFocus,
  autoCorrect,
  white,
  error,
  labelStyle,
}) => {
  const [focused, setFocused] = useState(false);
  const [valueText, setValueText] = useState(0);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevIsPasswordVisible => !prevIsPasswordVisible);
  };
  useEffect(() => {
    console.log(value);
    if (value) {
      setValueText(value.length);
    }
  }, [value]);

  return (
    <>
      <View
        style={
          [
            // @ts-ignore
            // error && {
            //   borderColor: '#D32F2F50',
            //   borderWidth: HDP(4),
            //   borderRadius: HDP(7),
            // },
            // focused && {
            //   borderColor: '#0898A0',
            //   borderWidth: HDP(4),
            //   borderRadius: HDP(7),
            // },
          ]
        }>
        <View
          style={[
            style.inputContainer,
            {paddingHorizontal: padding},
            inputStyle,
            bordered && style.bordered,
            focused && {borderColor: palette.teal},
            error?.length && {borderColor: palette.red},
          ]}>
          {(label && focused) || (label && value?.length) ? (
            <>
              <Text
                style={[
                  style.label,
                  // @ts-ignore
                  error?.length && {color: palette.red},
                  white && {color: '#13556D'},
                  labelStyle,
                ]}>
                {label}
              </Text>
            </>
          ) : null}
          {iconName1 && (
            <SvgIcon
              name={iconName1}
              size={iconSize1 || 20}
              onPress={onPress1}
            />
          )}
          <TN
            placeholder={placeholder}
            style={[
              {
                padding,
                flex: 1,
                color: bordered ? '#fff' : '#292F33',
                fontSize: RF(15),
                fontFamily: family.Bold,
              },
              innerStyle,
            ]}
            placeholderTextColor={bordered ? '#EAFFD270' : placeholderTextColor}
            onFocus={() => {
              onFocus;
              setFocused(true);
            }}
            onBlur={() => {
              onBlur;
              setFocused(false);
            }}
            maxLength={maxLength}
            editable={editable}
            secureTextEntry={!isPasswordVisible && type === 'password'}
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
          {iconName2 && (
            <SvgIcon
              name={iconName2}
              size={iconSize2 || 20}
              onPress={onPress2}
            />
          )}
          {type === 'password' && (
            <SvgIcon
              name={isPasswordVisible ? 'open-eye' : 'eye-close'}
              size={23}
              onPress={togglePasswordVisibility}
            />
          )}
        </View>
      </View>
      {charLength > 0 && (
        <Text style={[style.charLength]}>
          {valueText} /{charLength}
        </Text>
      )}
      {error?.length ? (
        <>
          <Text style={[style.error]}>{error}</Text>
          <SizedBox height={17} />
        </>
      ) : (
        <SizedBox height={17} />
      )}
    </>
  );
};
