// import { SizedBox } from '@components/sized-box';
import {SizedBox} from '@components';
import moment from 'moment';
import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

interface Props {
  question?: string;
  answer?: string;
  date?: string;
  onPress?: any;
  cta?: boolean;
  bg?: string;
  img?: string;
}

export const FeedCard: FC<Props> = ({
  question,
  answer,
  date,
  onPress,
  cta = true,
  bg,
  img,
}) => {
  return (
    <TouchableOpacity
      style={[styles.questionBox, {backgroundColor: bg || '#fff'}]}
      onPress={onPress}>
      <View style={styles.grid}>
        <Text style={styles.questionLabel}>- Question</Text>
        <Text style={styles.questionDate}>
          - {moment(date).format('DD/MM/YYYY')}
        </Text>
      </View>
      <SizedBox height={15} />
      <Text style={styles.question}>{question}</Text>
      {img ? (
        <>
          <SizedBox height={20} />
          <Image
            style={styles.questionImg}
            source={{
              uri: img,
            }}
          />
        </>
      ) : null}
      {answer ? (
        <>
          <SizedBox height={20} />
          <Text style={styles.answer} numberOfLines={2}>
            {answer}
          </Text>
        </>
      ) : null}
      {cta ? (
        <>
          <SizedBox height={25} />
          <View style={styles.grid}>
            {/* <Text style={styles.questionPatient}>- {patient}</Text> */}
            <View />
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.questionCta}>Read More</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </TouchableOpacity>
  );
};

interface QaProps {
  question?: string;
  date?: string;
  cardStyle?: any;
}

export const QaCard: FC<QaProps> = ({question, date, cardStyle}) => {
  return (
    <View style={[styles.qaBox, cardStyle]}>
      <View style={styles.grid}>
        <Text style={styles.questionLabel}>- Question</Text>
        <Text style={styles.questionDate}>
          - {moment(date).format('DD/MM/YYYY')}
        </Text>
      </View>
      <SizedBox height={15} />
      <Text style={styles.question}>{question}</Text>
      <SizedBox height={20} />
      <Text style={styles.answer}>- Question have not been answered</Text>
    </View>
  );
};
