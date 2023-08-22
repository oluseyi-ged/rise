/* eslint-disable react-native/no-inline-styles */
import {SizedBox, SvgIcon} from '@components';
import {HDP} from '@helpers';
import {palette} from '@theme';
import moment from 'moment';
import React, {FC, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import style from './styles';

interface Props {
  onSubmit?: any;
  label?: string;
  placeholder?: string;
  error?: any;
  value?: any;
  disabled?: boolean;
}

export const DateSelect: FC<Props> = ({
  onSubmit,
  label,
  placeholder,
  error,
  value,
  disabled,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  // const minDate = new Date();
  const maxDate = new Date();

  const handleDateChange = date => {
    setSelectedDate(date);
    const formattedDate = moment(date).format('YYYY-MM-DD');
    onSubmit(formattedDate); // Pass the selected date to the parent component
  };

  return (
    <View
      style={[
        // @ts-ignore
        error && {
          borderColor: '#D32F2F50',
          borderWidth: HDP(4),
          borderRadius: HDP(7),
        },
        // focused && {
        //   borderColor: "#E3F2FD",
        //   borderWidth: HDP(4),
        //   borderRadius: HDP(7),
        // },
      ]}>
      <TouchableOpacity
        disabled={disabled}
        // @ts-ignore
        style={[
          style.inputContainer,
          value && {borderColor: palette.teal},
          error?.length && {borderColor: palette.red},
        ]}
        onPress={() => setOpen(!open)}>
        <View>
          {label ? (
            //  && !value?.length
            <>
              <Text
                style={[
                  style.label,
                  // @ts-ignore
                  error?.length && {color: palette.red},
                ]}>
                {label}
              </Text>
            </>
          ) : null}
          <Text style={style.placeholderText}>{value || placeholder}</Text>
        </View>
        <SvgIcon name="calendar" size={20} />
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={selectedDate}
        onCancel={() => setOpen(false)}
        onDateChange={handleDateChange}
        onConfirm={handleDateChange}
        mode="date"
        maximumDate={maxDate}
      />
      {error?.length && <Text style={[style.error]}>{error}</Text>}
      <SizedBox height={10} />
    </View>
  );
};
