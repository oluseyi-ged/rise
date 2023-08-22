/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
// import { SizedBox } from '@components/sized-box';
import {Header, SizedBox, SvgIcon} from '@components';
import {HDP} from '@helpers';
import moment from 'moment';
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import style from './styles';

export const Notifications = ({}: any) => {
  const notifications = [
    {
      name: 'John Doe',
      action: 'Liked your post',
      apartment: 'Casa Bella',
      date: '2023-05-29T14:30:00Z',
      image: 'av1',
    },
    {
      name: 'Jane Smith',
      action: 'Rated your apartment',
      apartment: 'The Oasis',
      date: '2023-05-29T16:45:00Z',
      image: 'av2',
    },
    {
      name: 'Alice Johnson',
      action: 'Booked a viewing',
      apartment: 'Sunset Heights',
      date: '2023-05-29T18:15:00Z',
      image: 'av3',
    },
    {
      name: 'Bob Williams',
      action: 'Commented on your post',
      apartment: 'Skyview Towers',
      date: '2023-05-30T09:10:00Z',
      image: 'av4',
    },
    {
      name: 'Emily Davis',
      action: 'Liked your photo',
      apartment: 'Garden Paradise',
      date: '2023-05-30T12:05:00Z',
      image: 'av5',
    },
    {
      name: 'Michael Wilson',
      action: 'Shared your post',
      apartment: 'Harmony Residence',
      date: '2023-05-30T14:20:00Z',
      image: 'av6',
    },
    {
      name: 'Sophia Brown',
      action: 'Added a comment',
      apartment: 'Lakeside Manor',
      date: '2023-05-31T08:35:00Z',
      image: 'av7',
    },
    {
      name: 'Oliver Taylor',
      action: 'Followed you',
      apartment: 'Dreamland Apartments',
      date: '2023-05-31T11:50:00Z',
      image: 'av8',
    },
    {
      name: 'Emma Davis',
      action: 'Saved your listing',
      apartment: 'Palm Grove Residences',
      date: '2023-05-31T13:10:00Z',
      image: 'av9',
    },
    {
      name: 'Noah Johnson',
      action: 'Sent you a message',
      apartment: 'Tranquil Retreat',
      date: '2023-05-31T16:25:00Z',
      image: 'av10',
    },
  ];

  // Group notifications by date
  const groupedNotifications = notifications.reduce((groups, notification) => {
    const date = moment(notification.date).format('YYYY-MM-DD');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notification);
    return groups;
  }, {});

  // Sort the dates in descending order
  const sortedDates = Object.keys(groupedNotifications).sort((a, b) =>
    moment(b).diff(moment(a)),
  );

  return (
    <SafeAreaView style={{backgroundColor: '#F1F1F1'}}>
      <Header back />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={style.container}>
        <View style={style.notifHeader}>
          <Text style={style.notifLeft}>Notifications</Text>
          <Text style={style.notifRight}>3 new notifications</Text>
        </View>

        <View style={style.notifBox}>
          {sortedDates.map(date => {
            const formattedDate = moment(date).format('Do MMM, YYYY');
            const today = moment().format('YYYY-MM-DD');
            const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');
            const daysAgo = moment(date).fromNow();
            let title = '';

            if (date === today) {
              title = 'Today';
            } else if (date === yesterday) {
              title = 'Yesterday';
            } else {
              title = `${daysAgo}`;
            }

            return (
              <View style={{marginBottom: HDP(28)}} key={date}>
                <Text style={style.dateText}>{title}</Text>
                {groupedNotifications[date].map(notification => (
                  <View style={style.notifItem}>
                    <View>
                      <SvgIcon name={notification.image} size={50} />
                    </View>
                    <View
                      style={{
                        flex: 1,
                      }}
                      key={notification.name}>
                      <Text style={style.actionName}>
                        {notification.name}{' '}
                        <Text style={style.actionWord}>
                          {notification.action}
                        </Text>
                      </Text>
                      <Text style={style.propName}>
                        {notification.apartment}
                      </Text>
                      <Text style={style.actionTime}>
                        {moment(notification.date).fromNow()}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            );
          })}
        </View>

        <SizedBox height={50} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
