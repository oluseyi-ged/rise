/* eslint-disable react-native/no-inline-styles */
import {Map} from '@assets/images';
import {BottomSheet, Button, SizedBox, SvgIcon} from '@components';
import {HDP, RF} from '@helpers';
import {
  useGetKitchenByIDQuery,
  useGetKitchenMealsQuery,
  useGetTimeSlotsQuery,
} from '@services/queryApi';
import {addMeal, addRestaurant, updateMeal} from '@slices/restaurants';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {RootState, useAppDispatch, useAppSelector} from 'store';
import styles from './styles';

const {height, width} = Dimensions.get('window');

export const Kitchen = ({navigation, route}: any) => {
  const {restaurants, address} = useAppSelector<any>(
    (store: RootState) => store,
  );
  const dispatch = useAppDispatch();
  const currentDate = moment().format('YYYY-MM-DD');
  const [quantity, setQuantity] = useState(1);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const [selectedMealId, setSelectedMealId] = useState<any>(null);
  const [selectedMealName, setSelectedMealName] = useState<any>(null);
  const [selectedMealAmt, setSelectedMealAmt] = useState<any>(null);
  const [selectedSizeId, setSelectedSizeId] = useState<any>('');
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [selectedSizeAmt, setSelectedSizeAmt] = useState<any>(null);
  const [selectedAddsId, setSelectedAddsId] = useState<any>('');
  const [selectedAdds, setSelectedAdds] = useState<any>(null);
  const [selectedAddsAmt, setSelectedAddsAmt] = useState<any>(null);
  const [selectedTimeId, setSelectedTimeId] = useState<any>('');
  const [selectedTime, setSelectedTime] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [cartLength, setCartLength] = useState(0);
  const [cartAmt, setCartAmt] = useState(0);
  const [showSize, setShowSize] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const {data: kitchenData} = useGetKitchenByIDQuery(route?.params?.id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const exists = restaurants?.some(
    item => item?.restaurantId === route?.params?.id,
  );

  console.log(selectedMeal);

  const existingKitchen = restaurants?.find(
    item => item?.restaurantId === route?.params?.id,
  );

  useEffect(() => {
    setCartLength(existingKitchen?.meals?.length);
    const totalArray = existingKitchen?.meals?.map(item => {
      const total =
        (item?.selectedAddsAmt +
          (item?.selectedMealAmt || item?.selectedSizeAmt)) *
        item?.quantity;
      return {...item, total};
    });
    const overallSum = totalArray?.reduce((sum, item) => sum + item?.total, 0);

    setCartAmt(overallSum);
  }, [existingKitchen]);

  console.log(existingKitchen, 'existingKitchen');

  useEffect(() => {
    const existingMeal = existingKitchen?.meals?.find(
      item => item?.selectedMealId === selectedMealId,
    );

    if (existingMeal !== undefined) {
      setSelectedMealName(existingMeal?.selectedMealName);
      setQuantity(existingMeal?.quantity);
      setSelectedMealId(existingMeal?.selectedMealId);
      setSelectedMealAmt(existingMeal?.selectedMealAmt);
      setSelectedSizeId(existingMeal?.selectedSizeId);
      setSelectedSize(existingMeal?.selectedSize);
      setSelectedSizeAmt(existingMeal?.selectedSizeAmt);
      setSelectedAddsId(existingMeal?.selectedAddsId);
      setSelectedAdds(existingMeal?.selectedAdds);
      setSelectedAddsAmt(existingMeal?.selectedAddsAmt);
      setSelectedTimeId(existingMeal?.selectedTimeId);
      setSelectedTime(existingMeal?.selectedTime);
      setSelectedDate(existingMeal?.selectedDate);
    }

    console.log('first', existingMeal);
  }, [existingKitchen, selectedMealId]);

  const handleOrder = () => {
    if (existingKitchen === undefined) {
      dispatch(
        addRestaurant({
          restaurantName: kitchenData?.kitchenName,
          restaurantId: route?.params?.id,
          meals: [
            {
              selectedMealName,
              quantity: quantity || 1,
              selectedMealId,
              selectedMealAmt,
              selectedSizeId,
              selectedSize,
              selectedSizeAmt,
              selectedAddsId,
              selectedAdds,
              selectedAddsAmt,
              selectedTimeId,
              selectedTime,
              selectedDate,
            },
          ],
        }),
      );
    } else {
      const existingMeal = existingKitchen?.meals?.find(
        item => item?.selectedMealId === selectedMealId,
      );
      if (existingMeal === undefined) {
        dispatch(
          addMeal({
            restaurantId: route?.params?.id,
            newMeal: {
              selectedMealName,
              quantity: quantity || 1,
              selectedMealId,
              selectedMealAmt,
              selectedSizeId,
              selectedSize,
              selectedSizeAmt,
              selectedAddsId,
              selectedAdds,
              selectedAddsAmt,
              selectedTimeId,
              selectedTime,
              selectedDate,
            },
          }),
        );
      } else {
        dispatch(
          updateMeal({
            restaurantId: route?.params?.id,
            mealId: selectedMealId,
            updatedMeal: {
              selectedMealName,
              quantity,
              selectedMealId,
              selectedMealAmt,
              selectedSizeId,
              selectedSize,
              selectedSizeAmt,
              selectedAddsId,
              selectedAdds,
              selectedAddsAmt,
              selectedTimeId,
              selectedTime,
              selectedDate,
            },
          }),
        );
      }
    }
    setSelectedMeal(null);
    setSelectedMealName(null);
    setQuantity(1);
    setSelectedMealId(null);
    setSelectedMealAmt(null);
    setSelectedSizeId(null);
    setSelectedSize(null);
    setSelectedSizeAmt(null);
    setSelectedAddsId(null);
    setSelectedAdds(null);
    setSelectedAddsAmt(null);
    setSelectedTimeId(null);
    setSelectedTime(null);
  };

  console.log('restarting', restaurants);

  const {data: meals} = useGetKitchenMealsQuery(route?.params?.id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const {data: times} = useGetTimeSlotsQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const uniqueDates = [
    ...new Set(meals?.map(item => moment(item?.date)?.format('YYYY-MM-DD'))),
  ];

  const filteredDates = uniqueDates?.filter((date: any) =>
    moment(date).isSameOrAfter(currentDate),
  );

  const getDateObjects = date => {
    return meals?.filter(
      item => moment(item?.date).format('YYYY-MM-DD') === date,
    );
  };

  useEffect(() => {
    const todayExists = uniqueDates?.includes(currentDate);

    if (todayExists) {
      setSelectedDate(currentDate);
    } else {
      const datesAfterToday = uniqueDates?.filter((date: any) =>
        moment(date)?.isAfter(currentDate),
      );
      if (datesAfterToday.length > 0) {
        setSelectedDate(datesAfterToday[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meals]);

  return (
    <>
      <KeyboardAwareScrollView
        style={{backgroundColor: '#fff', position: 'relative'}}
        keyboardShouldPersistTaps="handled">
        <View style={styles.topOptions}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.topCta}>
            <SvgIcon name="back" size={24} />
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.topCta}>
              <SvgIcon
                name={kitchenData?.isFavorite ? 'like' : 'unlike'}
                size={24}
              />
            </TouchableOpacity>
            <SizedBox width={8} />
            <TouchableOpacity style={styles.topCta}>
              <SvgIcon name="share" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bannerImg}>
          <Image
            style={styles.bannerImg}
            source={{uri: kitchenData?.kitchenBannerImage}}
          />
          <View style={styles.slant} />
        </View>
        <View style={[styles.paddingWrap, styles.divide]}>
          <Image
            style={styles.logoImg}
            source={{uri: kitchenData?.kitchenLogo}}
          />
          <Text style={styles.mainText}>{kitchenData?.kitchenName}</Text>
          <View style={[styles.miniBio, {justifyContent: 'space-between'}]}>
            <View style={styles.miniBio}>
              <SvgIcon name="star" size={16} />
              <Text style={styles.miniText}>
                {kitchenData?.rating} ({kitchenData?.reviewCount}{' '}
                {kitchenData?.reviewCount?.length ? '' : 'Reviews'}){' '}
              </Text>
              <Text style={styles.miniText}>
                - {kitchenData?.deliveryOption}
              </Text>
            </View>
            {/* <TouchableOpacity style={styles.miniBio}>
              <Text>Information</Text>
              <SvgIcon name="caret-right" size={12} />
            </TouchableOpacity> */}
          </View>

          <View style={styles.addyGrid}>
            <Text style={styles.addyText}>
              Have your order delivered to:{' '}
              <Text style={[styles.addyText, {fontWeight: '700'}]}>
                {address}
              </Text>
            </Text>
            <TouchableOpacity>
              <ImageBackground
                source={Map} // Replace with the actual image path
                style={styles.mapBg}>
                <SvgIcon name="loc" size={24} />
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          contentContainerStyle={styles.listStyle}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filteredDates}
          renderItem={({item}: any) => (
            <TouchableOpacity
              onPress={() => setSelectedDate(item)}
              style={[styles.dateGrid]}>
              <Text style={styles.dateText}>
                {moment(item).format('dddd Do')}
              </Text>
              <View style={selectedDate === item && styles.dateLine} />
            </TouchableOpacity>
          )}
        />
        {getDateObjects(selectedDate)?.map((dish, i) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedMeal(dish);
              setSelectedMealId(dish?.id);
              setSelectedMealName(dish?.name);
              setSelectedMealAmt(dish?.sizes[0]?.price);
            }}
            disabled={
              dish?.sizes.reduce(
                (total, plate) => total + plate?.quantity,
                0,
              ) === 0
            }
            style={[
              styles.dishItem,
              dish?.sizes.reduce(
                (total, plate) => total + plate?.quantity,
                0,
              ) === 0 && {opacity: 0.7},
            ]}
            key={i}>
            <View style={{flex: 1}}>
              <View
                style={
                  dish?.sizes?.length > 0
                    ? dish?.sizes.reduce(
                        (total, plate) => total + plate?.quantity,
                        0,
                      ) === 0
                      ? styles.soldOut
                      : dish?.sizes.reduce(
                          (total, plate) => total + plate?.quantity,
                          0,
                        ) <= 10
                      ? styles.lessThanTen
                      : styles.greaterThanTen
                    : null
                }>
                {dish?.sizes?.length > 0 ? (
                  <Text
                    style={
                      dish?.sizes?.length > 0
                        ? dish?.sizes.reduce(
                            (total, plate) => total + plate?.quantity,
                            0,
                          ) === 0
                          ? styles.sText
                          : dish?.sizes.reduce(
                              (total, plate) => total + plate?.quantity,
                              0,
                            ) <= 10
                          ? styles.lText
                          : styles.gText
                        : null
                    }>
                    {dish?.sizes.reduce(
                      (total, plate) => total + plate?.quantity,
                      0,
                    )}{' '}
                    plates{' '}
                    {dish?.sizes.reduce(
                      (total, plate) => total + plate?.quantity,
                      0,
                    ) > 10
                      ? 'available'
                      : 'left'}
                  </Text>
                ) : (
                  <Text>Sold Out</Text>
                )}
              </View>

              <Text style={styles.dishText}>{dish?.name}</Text>
              <Text style={[styles.dishText, {fontSize: RF(12)}]}>
                ₦ {dish?.sizes[0]?.price?.toLocaleString()}
              </Text>
              <Text style={styles.dateText}>{dish?.ingredients}</Text>
            </View>
            <Image style={styles.dishImg} source={{uri: dish?.image}} />
          </TouchableOpacity>
        ))}
        <SizedBox height={50} />

        <BottomSheet
          modalStyle={{height: height * 0.7}}
          afterHide={() => setSelectedMeal(null)}
          show={selectedMeal !== null}
          content={
            <View>
              <View style={styles.modalHeader}>
                <Text style={[styles.mainText, {paddingTop: 0}]}>
                  Personalise your order
                </Text>
                <SvgIcon
                  name="close"
                  onPress={() => setSelectedMeal(null)}
                  size={24}
                />
              </View>
              <View style={[styles.dishItem]}>
                <View style={{flex: 1}}>
                  <Text style={[styles.dishText, {fontSize: RF(12)}]}>
                    {selectedMeal?.name}
                  </Text>
                  <Text style={[styles.dishText, {fontSize: RF(12)}]}>
                    ₦ {selectedMeal?.sizes[0]?.price?.toLocaleString()}
                  </Text>
                </View>
                <Image
                  style={styles.dishImg}
                  source={{uri: selectedMeal?.image}}
                />
              </View>

              <View style={styles.dishInner}>
                <Text style={styles.innerText}>ADD-ONS</Text>
                <SizedBox height={8} />
                {selectedMeal?.addons?.map((option: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedAddsId !== option?.id) {
                        setSelectedAddsId(option?.id);
                        setSelectedAdds(option?.addon?.label);
                        setSelectedAddsAmt(option?.price);
                      } else {
                        setSelectedAddsId(null);
                        setSelectedAdds(null);
                        setSelectedAddsAmt(null);
                      }
                    }}
                    disabled={option?.quantity < 1}
                    key={option.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: HDP(8),
                    }}>
                    {option?.quantity > 0 ? (
                      <SvgIcon
                        name={
                          selectedAddsId === option?.id
                            ? 'checked'
                            : 'unchecked'
                        }
                        size={24}
                      />
                    ) : (
                      <SvgIcon name={'no-check'} size={24} />
                    )}
                    <SizedBox width={12} />
                    <Text
                      style={
                        option?.quantity > 0
                          ? [styles.innerText, {marginBottom: 0}]
                          : styles.uncheckText
                      }>
                      {option?.addon?.label} (+ ₦{option?.price})
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.dishInner}>
                <View>
                  <Text style={styles.innerText}>WHAT YOU WOULD GET</Text>
                  <Text style={styles.dateText}>
                    {selectedMeal?.additionalInfo}
                  </Text>
                </View>
                <SizedBox height={16} />
                <View>
                  <Text style={styles.innerText}>INGREDIENTS</Text>
                  <Text style={styles.dateText}>
                    {selectedMeal?.ingredients}
                  </Text>
                </View>
                <SizedBox height={16} />
                <View>
                  <Text style={styles.innerText}>ALLERGENS</Text>
                  <Text style={styles.dateText}>
                    {selectedMeal?.allergens
                      ?.map(allergen => allergen.name)
                      .join(', ')}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setShowSize(true)}
                style={[styles.lineGrid]}>
                <Text style={styles.innerText}>Bowl Size</Text>
                <Text style={styles.textBlue}>
                  {selectedSize?.length ? selectedSize : 'Select bowl size'}
                </Text>
              </TouchableOpacity>

              <View style={[styles.lineGrid]}>
                <Text style={styles.innerText}>Delivery date</Text>
                <Text style={styles.textBlue}>
                  {moment(selectedDate).format('dddd Do, MMMM')}
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.lineGrid]}
                onPress={() => setShowTime(true)}>
                <Text style={styles.innerText}>Delivery window</Text>
                <Text style={styles.textBlue}>
                  {selectedTime?.length
                    ? selectedTime
                    : 'Choose your delivery time slot'}
                </Text>
              </TouchableOpacity>

              <View style={styles.ctaSection}>
                <View style={styles.qBtn}>
                  <TouchableOpacity
                    onPress={() => setQuantity(quantity - 1)}
                    disabled={quantity === 1}>
                    <Text style={styles.qText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qText}>{quantity}</Text>
                  <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                    <Text style={styles.qText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Button
                  title="Preorder your meal"
                  containerStyle={styles.ctaBtn}
                  disabled={
                    !selectedMealId?.length ||
                    !selectedSizeId?.length ||
                    !selectedAddsId?.length ||
                    !selectedTimeId?.length
                  }
                  onPress={() => {
                    handleOrder();
                  }}
                />
              </View>

              <BottomSheet
                afterHide={() => setShowSize(false)}
                show={showSize}
                content={
                  <View>
                    <View style={styles.modalHeader}>
                      <Text style={[styles.mainText, {paddingTop: 0}]}>
                        Choose meal portion size
                      </Text>
                      <SvgIcon
                        name="close"
                        size={24}
                        onPress={() => {
                          setShowSize(false);
                          setSelectedSizeId(null);
                          setSelectedSize(null);
                          setSelectedSizeAmt(null);
                        }}
                      />
                    </View>
                    <View style={{padding: HDP(16)}}>
                      {selectedMeal?.sizes?.map((option: any) =>
                        option?.quantity > 0 ? (
                          <TouchableOpacity
                            onPress={() => {
                              if (selectedSizeId !== option?.id) {
                                setSelectedSizeId(option?.id);
                                setSelectedSize(option?.size);
                                setSelectedSizeAmt(option?.price);
                              } else {
                                setSelectedSizeId(null);
                                setSelectedSize(null);
                                setSelectedSizeAmt(null);
                              }
                            }}
                            disabled={option?.quantity < 1}
                            key={option.id}
                            style={[
                              styles.sizeGrid,
                              selectedSizeId === option?.id && {
                                backgroundColor: '#ECEFF1',
                              },
                            ]}>
                            <Text
                              style={
                                option?.quantity > 0
                                  ? [styles.innerText, {marginBottom: 0}]
                                  : styles.uncheckText
                              }>
                              {option?.size}
                            </Text>
                            {selectedSizeId === option?.id ? (
                              <SvgIcon name="check" size={24} />
                            ) : null}
                          </TouchableOpacity>
                        ) : null,
                      )}
                    </View>

                    <Button
                      title="Confirm Meal Portion"
                      onPress={() => setShowSize(false)}
                      containerStyle={{width: width * 0.9, alignSelf: 'center'}}
                    />
                    <SizedBox height={20} />
                  </View>
                }
              />

              <BottomSheet
                afterHide={() => setShowTime(false)}
                show={showTime}
                content={
                  <View>
                    <View style={styles.modalHeader}>
                      <Text style={[styles.mainText, {paddingTop: 0}]}>
                        Choose your delivery time slot
                      </Text>
                      <SvgIcon
                        name="close"
                        size={24}
                        onPress={() => {
                          setShowTime(false);
                          setSelectedTimeId(null);
                          setSelectedTime(null);
                        }}
                      />
                    </View>
                    <View style={{padding: HDP(16)}}>
                      {times?.map((option: any) => (
                        <TouchableOpacity
                          onPress={() => {
                            if (selectedTimeId !== option?.id) {
                              setSelectedTimeId(option?.id);
                              setSelectedTime(option?.title);
                            } else {
                              setSelectedTimeId(null);
                              setSelectedTime(null);
                            }
                          }}
                          key={option.id}
                          style={[
                            styles.sizeGrid,
                            selectedTimeId === option?.id && {
                              backgroundColor: '#ECEFF1',
                            },
                          ]}>
                          <Text style={[styles.innerText, {marginBottom: 0}]}>
                            {option?.title} {option?.start} - {option?.end}
                          </Text>
                          {selectedTimeId === option?.id ? (
                            <SvgIcon name="check" size={24} />
                          ) : null}
                        </TouchableOpacity>
                      ))}
                    </View>

                    <Button
                      title="Confirm delivery time slot"
                      onPress={() => setShowTime(false)}
                      containerStyle={{width: width * 0.9, alignSelf: 'center'}}
                    />
                    <SizedBox height={20} />
                  </View>
                }
              />
            </View>
          }
        />
      </KeyboardAwareScrollView>
      {exists && (
        <TouchableOpacity
          style={styles.floatCta}
          onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.floatText}>{cartLength} items</Text>
          <Text style={styles.floatText}>VIEW CART</Text>
          <Text style={styles.floatText}>₦ {cartAmt?.toLocaleString()}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};
