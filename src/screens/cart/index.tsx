/* eslint-disable react-native/no-inline-styles */
import {
  BottomSheet,
  Button,
  Select,
  SizedBox,
  SvgIcon,
  TextInput,
} from '@components';
import {HDP, RF} from '@helpers';
import {flash} from '@helpers/FlashMessageHelpers';
import {
  useAddAddressMutation,
  useCreateOrderMutation,
  useValidateOrderMutation,
} from '@services/mutationApi';
import {useGetAddressesQuery} from '@services/queryApi';
import {setAddress} from '@slices/address';
import {deleteMeal, updateMeal} from '@slices/restaurants';
import {palette} from '@theme';
import {Formik} from 'formik';
import React, {createRef, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {WebView} from 'react-native-webview';
import {RootState, useAppDispatch, useAppSelector} from 'store';
import * as yup from 'yup';
import styles from './styles';

export const Cart = () => {
  const {restaurants, address} = useAppSelector<any>(
    (store: RootState) => store,
  );
  const {width} = Dimensions.get('window');
  const dispatch = useAppDispatch();
  const mapRef = createRef<any>();
  const [allMeals, setAllMeals] = useState<any>(null);
  const [latitude, setLatitude] = useState<any>(false);
  const [longitude, setLongitude] = useState<any>(false);
  const [lat, setLat] = useState<any>(false);
  const [lng, setLng] = useState<any>(false);
  const [location, setLocation] = useState<any>(false);
  const [startPay, setStartPay] = useState(false);

  const changeRegion = () => {
    mapRef.current.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      1000,
    );
  };

  console.log(location, 'throw');
  useEffect(() => {
    Geocoder.init('AIzaSyAHpG5J2Fcu_m4wBDNSw4s3nhJyNTemJN4', {language: 'en'});
    Geocoder.from(location?.coords?.latitude, location?.coords?.longitude)
      .then(json => {
        var addressComponent = json.results[0].address_components[0];
        console.log(addressComponent, 'addressComponent');
      })
      .catch(error => console.warn(error));
  }, [location?.coords?.latitude, location?.coords?.longitude]);

  // Function to get permission for location
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  // function to check permissions and get Location
  const getLocation = () => {
    if (Platform.OS === 'ios') {
      Geolocation.getCurrentPosition(
        position => {
          setLocation(position);
          setLatitude(position?.coords?.latitude);
          setLongitude(position?.coords?.longitude);
        },
        error => {
          // See error code charts below.
          console.log(error);
          setLocation(false);
          setLatitude(null);
          setLongitude(null);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      const result = requestLocationPermission();
      result.then(res => {
        if (res) {
          Geolocation.getCurrentPosition(
            position => {
              setLocation(position);
              setLatitude(position?.coords?.latitude);
              setLongitude(position?.coords?.longitude);
            },
            error => {
              // See error code charts below.
              console.log(error);
              setLocation(false);
              setLatitude(null);
              setLongitude(null);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      });
    }
  };

  useEffect(() => {
    getLocation();
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues = {
    street: '',
    tag: '',
    dropOffOption: 'DOORSTEP',
    houseNo: '',
    buildingName: '',
  };

  const initSchema = yup.object().shape({
    street: yup.string().required('Street is required'),
    tag: yup.string().required('Tag is required'),
    houseNo: yup.string().required('House number is required'),
    buildingName: yup.string().required('Building name is required'),
  });

  const tags = [
    {key: 'HOME', value: 'Home'},
    {key: 'OFFICE', value: 'Office'},
    {key: 'OTHER', value: 'Other'},
  ];
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const formRef = useRef<any>();

  const findRestaurantIdByMealId = targetMealId => {
    for (const restaurant of restaurants) {
      const foundMeal = restaurant?.meals?.find(
        meal => meal?.selectedMealId === targetMealId,
      );
      if (foundMeal) {
        return restaurant?.restaurantId;
      }
    }
    return null; // Return null if mealId is not found
  };

  const {
    data: addresses,
    refetch: addyFetch,
    isLoading: addyLoad,
  } = useGetAddressesQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [addAddress, {isLoading, isSuccess, isError, error, reset}] =
    useAddAddressMutation();

  useEffect(() => {
    if (isSuccess) {
      addyFetch();
    }
    if (isError) {
      console.log(error);
      //@ts-ignore
      flash.danger({
        //@ts-ignore
        description: mailErr?.data?.message || phoneErr?.data?.message,
      });
      reset();
    }
  }, [addyFetch, error, isError, isSuccess, reset]);

  console.log(addresses, 'addresses');

  const emptyScreen = () => {
    const handleSubmit = () => {
      if (formRef.current) {
        formRef.current.handleSubmit();
      }
    };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          addAddress(values);
        }}
        innerRef={formRef}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={initSchema}>
        {({errors, setFieldValue}) => (
          <View style={styles.formBox}>
            <MapView
              ref={mapRef}
              style={{
                flex: 1,
                backgroundColor: 'red',
                height: HDP(200),
                width,
                alignSelf: 'center',
              }}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onRegionChangeComplete={changeRegion}
              provider={PROVIDER_GOOGLE}>
              <Marker
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                }}
              />
            </MapView>
            <View style={styles.headGrid}>
              <Text style={styles.formLabel}>Please select your location</Text>
              {addresses?.length ? (
                <SvgIcon
                  name="close"
                  size={24}
                  onPress={() => {
                    setShow(false);
                    setAdd(false);
                  }}
                />
              ) : null}
            </View>
            <Text style={styles.formText}>
              Fill out the fields below and double-check for accuracy before
              proceeding. Your address is kept secure and will only be used for
              order delivery purposes.
            </Text>
            <SizedBox height={30} />
            <Text style={styles.miniLabel}>Street</Text>
            <SizedBox height={5} />
            <GooglePlacesAutocomplete
              placeholder="Street Address"
              currentLocation={true}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
                setFieldValue('street', data?.description);
                Geocoder.from(data?.description)
                  .then(json => {
                    var location = json.results[0].geometry.location;
                    console.log(location, 'truth');
                    setLat(location?.lat);
                    setLng(location?.lng);
                  })
                  .catch(error => console.warn(error));
              }}
              query={{
                key: 'AIzaSyAHpG5J2Fcu_m4wBDNSw4s3nhJyNTemJN4',
                language: 'en',
              }}
              styles={{
                container: {
                  borderRadius: HDP(4),
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  marginBottom: HDP(16),
                  paddingHorizontal: HDP(16),
                },
                textInput: {
                  height: HDP(38),
                  color: '#082932',
                  fontSize: RF(10),
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
            />
            <Select
              onSelect={value => {
                setFieldValue('tag', value);
              }}
              placeholder="Select Tag"
              save="key"
              // label="Tag"
              data={tags}
              // @ts-ignore
              error={errors?.tag}
            />
            <TextInput
              placeholder="House Number"
              label="House Number"
              name="houseNo"
              autoCorrect={false}
              // @ts-ignore
              error={errors?.houseNo}
              onChangeText={value => setFieldValue('houseNo', value)}
            />
            <TextInput
              placeholder="Building Name"
              label="Building Name"
              name="buildingName"
              autoCorrect={false}
              // @ts-ignore
              error={errors?.buildingName}
              onChangeText={value => setFieldValue('buildingName', value)}
            />
            <Button
              title="Save Address"
              onPress={handleSubmit}
              loading={isLoading || addyLoad}
            />
            <SizedBox height={30} />
          </View>
        )}
      </Formik>
    );
  };

  const fillScreen = () => {
    return (
      <View>
        <View style={styles.modalHeader}>
          <Text style={[styles.mainText, {paddingTop: 0}]}>
            Search an address
          </Text>
          <SvgIcon name="close" onPress={() => setShow(false)} size={24} />
        </View>
        <View style={styles.addyWrap}>
          {addresses?.map(addy => (
            <TouchableOpacity
              style={styles.addyBox}
              onPress={() => {
                dispatch(setAddress(addy?.street));
                setShow(false);
              }}>
              <View style={styles.addyLeft}>
                <Text style={styles.addyTag}>{addy?.tag}</Text>
                <Text style={styles.addyText}>{addy?.street}</Text>
              </View>
              <SvgIcon name="caret-right" size={24} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.addCta}>
          <Button title="Add Address" onPress={() => setAdd(true)} />
        </View>
        <SizedBox height={20} />
      </View>
    );
  };

  useEffect(() => {
    const mealsArr = restaurants
      ?.map(obj => obj?.meals)
      ?.reduce((acc, meals) => acc?.concat(meals), []);

    setAllMeals(mealsArr);
  }, [restaurants]);

  const [
    validateOrder,
    {
      data: valDetails,
      isLoading: valLoading,
      isError: valFalse,
      error: valError,
    },
  ] = useValidateOrderMutation();

  const [
    createOrder,
    {
      data: creDetails,
      isSuccess: creTrue,
      isLoading: creLoading,
      isError: creFalse,
      error: creError,
    },
  ] = useCreateOrderMutation();

  useEffect(() => {
    if (valFalse) {
      flash.danger({
        //@ts-ignore
        description: valError?.data?.message,
      });
    }
  }, [valError, valFalse]);

  useEffect(() => {
    if (creFalse) {
      flash.danger({
        //@ts-ignore
        description: creError?.data?.message,
      });
    }
    if (creTrue) {
      if (creDetails?.paymentLink?.length > 0) {
        setStartPay(true);
      }
    }
  }, [creDetails, creError, creFalse, creTrue]);

  useEffect(() => {
    const foundAddress = addresses?.find(item => item.street === address);
    const cartArray = allMeals?.map(item => ({
      mealId: item?.selectedMealId,
      mealSizeId: item?.selectedSizeId,
      quantity: item?.quantity,
      deliveryOption: 'DELIVERY',
      addonIds: [item?.selectedAddsId],
      timeslotId: item?.selectedTimeId,
    }));

    const order = {
      deliveryAddressId: foundAddress?.id,
      voucherId: '',
      orderItems: cartArray,
    };

    validateOrder(order);
  }, [address, addresses, allMeals, validateOrder]);

  const handleTop = async val => {
    const kitchenID = await findRestaurantIdByMealId(val?.selectedMealId);

    dispatch(
      updateMeal({
        restaurantId: kitchenID,
        mealId: val?.selectedMealId,
        updatedMeal: {
          selectedMealName: val?.selectedMealName,
          quantity: val?.quantity + 1,
          selectedMealId: val?.selectedMealId,
          selectedMealAmt: val?.selectedMealAmt,
          selectedSizeId: val?.selectedSizeId,
          selectedSize: val?.selectedSize,
          selectedSizeAmt: val?.selectedSizeAmt,
          selectedAddsId: val?.selectedAddsId,
          selectedAdds: val?.selectedAdds,
          selectedAddsAmt: val?.selectedAddsAmt,
          selectedTimeId: val?.selectedTimeId,
          selectedTime: val?.selectedTime,
          selectedDate: val?.selectedDate,
        },
      }),
    );
  };

  const handleDown = async val => {
    const kitchenID = await findRestaurantIdByMealId(val?.selectedMealId);
    if (val?.quantity > 1) {
      dispatch(
        updateMeal({
          restaurantId: kitchenID,
          mealId: val?.selectedMealId,
          updatedMeal: {
            selectedMealName: val?.selectedMealName,
            quantity: val?.quantity - 1,
            selectedMealId: val?.selectedMealId,
            selectedMealAmt: val?.selectedMealAmt,
            selectedSizeId: val?.selectedSizeId,
            selectedSize: val?.selectedSize,
            selectedSizeAmt: val?.selectedSizeAmt,
            selectedAddsId: val?.selectedAddsId,
            selectedAdds: val?.selectedAdds,
            selectedAddsAmt: val?.selectedAddsAmt,
            selectedTimeId: val?.selectedTimeId,
            selectedTime: val?.selectedTime,
            selectedDate: val?.selectedDate,
          },
        }),
      );
    } else {
      dispatch(
        deleteMeal({
          restaurantId: kitchenID,
          mealId: val?.selectedMealId,
        }),
      );
    }
  };

  const handleSubmit = async () => {
    const foundAddress = addresses?.find(item => item.street === address);
    const cartArray = allMeals?.map(item => ({
      mealId: item?.selectedMealId,
      mealSizeId: item?.selectedSizeId,
      quantity: item?.quantity,
      deliveryOption: 'DELIVERY',
      addonIds: [item?.selectedAddsId],
      timeslotId: item?.selectedTimeId,
    }));

    const order = {
      deliveryAddressId: foundAddress?.id,
      voucherId: '',
      orderItems: cartArray,
    };

    createOrder(order);
  };

  console.log(allMeals, 'restaurants');

  return (
    <View style={styles.pageWrap}>
      <View style={styles.header}>
        {startPay && (
          <SvgIcon name="back" size={20} onPress={() => setStartPay(false)} />
        )}
        <Text style={styles.headerText}>
          {startPay ? 'Make Payment' : 'Cart'}
        </Text>
      </View>
      {startPay ? (
        <WebView source={{uri: creDetails?.paymentLink}} />
      ) : (
        <>
          <ScrollView>
            <View>
              <FlatList
                contentContainerStyle={{
                  gap: HDP(26),
                  paddingTop: HDP(16),
                  paddingLeft: HDP(16),
                  marginRight: HDP(16),
                  paddingBottom: HDP(30),
                }}
                showsVerticalScrollIndicator={false}
                data={allMeals}
                renderItem={({item}) => (
                  <View style={styles.itemGrid}>
                    <View>
                      <Text style={styles.itemName}>
                        {item?.selectedMealName}
                      </Text>
                      <Text>{item?.selectedIngredients}</Text>
                      <Text style={styles.itemAmt}>
                        ₦{' '}
                        {(
                          (item?.selectedAddsAmt +
                            (item?.selectedMealAmt || item?.selectedSizeAmt)) *
                          item?.quantity
                        )?.toLocaleString()}
                      </Text>
                    </View>
                    <View style={styles.itemCta}>
                      <TouchableOpacity
                        onPress={() => handleDown(item)}
                        style={styles.itemCtaBtn}>
                        <Text
                          style={[
                            styles.itemCtaText,
                            {paddingHorizontal: HDP(3)},
                          ]}>
                          -
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.itemCtaText}>{item?.quantity}</Text>
                      <TouchableOpacity
                        onPress={() => handleTop(item)}
                        style={styles.itemCtaBtn}>
                        <Text
                          style={[
                            styles.itemCtaText,
                            {paddingHorizontal: HDP(3)},
                          ]}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
            {allMeals?.length ? (
              <View style={styles.paddingWrap}>
                <View style={styles.addressBox}>
                  <Text style={styles.addyBold}>Address</Text>
                  <View style={styles.addyCtaGrid}>
                    <Text style={styles.addyCtaText}>{address}</Text>
                    <TouchableOpacity onPress={() => setShow(true)}>
                      <Text style={styles.addySpan}>Change</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {valLoading ? (
                  <>
                    <SizedBox height={20} />
                    <ActivityIndicator size="large" color={palette.blue} />
                  </>
                ) : (
                  <>
                    <View style={styles.feeBox}>
                      <View style={styles.feeItem}>
                        <Text style={styles.feeLeft}>Sub Total</Text>
                        <Text style={styles.feeRight}>
                          ₦ {valDetails?.subTotal?.toLocaleString()}
                        </Text>
                      </View>
                      <View style={styles.feeItem}>
                        <Text style={styles.feeLeft}>Voucher Discount</Text>
                        <Text style={styles.feeRight}>
                          ₦ {valDetails?.voucherDiscount?.toLocaleString()}
                        </Text>
                      </View>
                      <View style={styles.feeItem}>
                        <Text style={styles.feeLeft}>Delivery Fee</Text>
                        <Text style={styles.feeRight}>
                          ₦ {valDetails?.deliveryFee?.toLocaleString()}
                        </Text>
                      </View>
                      <View style={styles.feeItem}>
                        <Text style={styles.feeLeft}>Delivery Discount</Text>
                        <Text style={styles.feeRight}>
                          ₦ {valDetails?.deliveryDiscount?.toLocaleString()}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.feeBox}>
                      <View style={styles.feeItem}>
                        <Text style={styles.feeLeft}>Total</Text>
                        <Text style={styles.feeRight}>
                          ₦{' '}
                          {(
                            valDetails?.subTotal +
                            valDetails?.voucherDiscount +
                            valDetails?.deliveryFee +
                            valDetails?.deliveryDiscount
                          )?.toLocaleString()}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.feeBox}>
                      <Button
                        title={`Order  ₦ ${(
                          valDetails?.subTotal +
                          valDetails?.voucherDiscount +
                          valDetails?.deliveryFee +
                          valDetails?.deliveryDiscount
                        )?.toLocaleString()}`}
                        loading={creLoading}
                        onPress={handleSubmit}
                      />
                    </View>
                  </>
                )}
              </View>
            ) : (
              <View>
                <SvgIcon name="empty-cart" size={100} />
                <SizedBox height={20} />
                <Text style={styles.emptyText}>No item found in cart</Text>
              </View>
            )}
            <SizedBox height={100} />
          </ScrollView>
          <BottomSheet
            afterHide={() => {
              setShow(false);
              setAdd(false);
            }}
            show={show}
            content={add || !addresses?.length ? emptyScreen() : fillScreen()}
          />
        </>
      )}
    </View>
  );
};
