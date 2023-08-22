/* eslint-disable react-native/no-inline-styles */
// import { SizedBox } from '@components/sized-box';
import {SizedBox, SvgIcon} from '@components';
import {HDP, RF} from '@helpers';
import {family} from '@theme';
import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

interface Props {
  name?: string;
  address?: string;
  rating?: number;
  onPress?: any;
  amount?: number;
  img?: string;
  duration?: string;
}

export const MiniCard: FC<Props> = ({
  name,
  address,
  rating,
  amount,
  onPress,
  img,
  duration,
}) => {
  return (
    <TouchableOpacity style={[styles.miniBox]} onPress={onPress}>
      <Image
        style={styles.miniImg}
        source={{
          uri: img,
        }}
      />
      <View style={{flex: 1}}>
        <View>
          <Text numberOfLines={1} style={styles.propName}>
            {name}
          </Text>
          <View style={styles.addyGrid}>
            <SvgIcon name="location-fade" size={15} />
            <Text numberOfLines={1} style={styles.propAddy}>
              {address}
            </Text>
          </View>
          <View
            style={[
              styles.addyGrid,
              {alignItems: 'center', marginTop: HDP(5)},
            ]}>
            <SvgIcon name="star" size={20} />
            <Text style={styles.propStar}>{rating}</Text>
          </View>
        </View>
        <SizedBox height={29} />
        <Text style={styles.propRent}>
          ₦ {amount?.toLocaleString()}
          <Text style={styles.subRent}>/{duration}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

interface QaProps {
  name?: string;
  address?: string;
  rating?: number;
  onPress?: any;
  amount?: number;
  img?: string;
  duration?: string;
  baths?: number;
  rooms?: number;
  parks?: number;
  units?: number;
  isAvailable?: boolean;
  isFavourite?: boolean;
}

export const FullCard: FC<QaProps> = ({
  name,
  address,
  amount,
  onPress,
  img,
  duration,
  baths = 0,
  rooms = 0,
  parks = 0,
  units = 0,
  isAvailable,
  isFavourite,
}) => {
  return (
    <TouchableOpacity style={[styles.fullBox]} onPress={onPress}>
      <View style={styles.topView}>
        {isFavourite && (
          <View style={styles.faved}>
            <SvgIcon name="like" size={24} />
          </View>
        )}
        <Image
          style={styles.fullImg}
          source={{
            uri: img,
          }}
        />
        <View style={styles.feeBox}>
          <Text style={styles.fullRent}>
            ₦ {amount?.toLocaleString()}
            <Text style={styles.rentSub}>/{duration}</Text>
          </Text>
          {isAvailable ? (
            <View style={{flexDirection: 'row', gap: 2}}>
              <SvgIcon name="check" size={10} />
              <Text style={styles.availText}>Available</Text>
            </View>
          ) : null}
        </View>
      </View>
      <View>
        <Text numberOfLines={1} style={[styles.propName, {fontSize: RF(16)}]}>
          {name}
        </Text>
        <View style={styles.addyGrid}>
          <SvgIcon name="location-fade" size={15} />
          <Text
            numberOfLines={1}
            style={[styles.propAddy, {fontFamily: family.Bold}]}>
            {address}
          </Text>
        </View>
        <View
          style={[
            styles.addyGrid,
            {
              alignItems: 'center',
              flexWrap: 'wrap',
              marginTop: HDP(5),
              gap: HDP(6),
            },
          ]}>
          {baths !== undefined && baths > 0 && (
            <View
              style={[styles.addyGrid, {alignItems: 'center', gap: HDP(2)}]}>
              <SvgIcon name="bath" size={20} />
              <Text style={styles.proText}>{baths} Bath</Text>
            </View>
          )}
          {rooms !== undefined && rooms > 0 && (
            <View
              style={[styles.addyGrid, {alignItems: 'center', gap: HDP(2)}]}>
              <SvgIcon name="bed" size={20} />
              <Text style={styles.proText}>{rooms} Bed</Text>
            </View>
          )}
          {parks !== undefined && parks > 0 && (
            <View
              style={[styles.addyGrid, {alignItems: 'center', gap: HDP(2)}]}>
              <SvgIcon name="park" size={20} />
              <Text style={styles.proText}>{parks} Parking</Text>
            </View>
          )}
          {units !== undefined && units > 0 && (
            <View
              style={[styles.addyGrid, {alignItems: 'center', gap: HDP(2)}]}>
              <SvgIcon name="unit" size={20} />
              <Text style={styles.proText}>{units} Units</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface TriProps {
  name?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  reviews?: string;
  onPress?: any;
  rating?: number;
  isFav?: boolean;
  onFavPress?: any;
}

export const TriCards: FC<TriProps> = ({
  name,
  image1,
  image2,
  image3,
  reviews,
  onPress,
  rating,
  isFav,
  onFavPress,
}) => {
  return (
    <TouchableOpacity style={[styles.fullBox]} onPress={onPress}>
      <View style={styles.imgGrid}>
        <Image style={styles.imgBanner} source={{uri: image1}} />
        <View style={styles.imgSide}>
          <Image style={styles.imgFlex} source={{uri: image2}} />
          <Image style={styles.imgFlex} source={{uri: image3}} />
        </View>
      </View>
      <Text style={styles.kitchenName}>{name}</Text>
      <View>
        <View />
        <View style={styles.rateBox}>
          <SvgIcon name="star" size={16} />
          <Text style={styles.ratetext}>
            {rating} ({reviews})
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => onFavPress()} style={styles.floatLike}>
        <SvgIcon name={isFav ? 'like' : 'unlike'} size={30} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

interface WideProps {
  name?: string;
  image1?: string;
  reviews?: string;
  onPress?: any;
  rating?: number;
  isFav?: boolean;
  onFavPress?: any;
}

export const WideCards: FC<WideProps> = ({
  name,
  image1,
  reviews,
  onPress,
  rating,
  isFav,
  onFavPress,
}) => {
  return (
    <TouchableOpacity style={[styles.fullBox]} onPress={onPress}>
      <Image style={styles.imgWide} source={{uri: image1}} />
      <Text style={styles.kitchenName}>{name}</Text>
      <View>
        <View />
        <View style={styles.rateBox}>
          <SvgIcon name="star" size={16} />
          <Text style={styles.ratetext}>
            {rating} ({reviews})
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => onFavPress()} style={styles.floatLike}>
        <SvgIcon name={isFav ? 'like' : 'unlike'} size={30} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
