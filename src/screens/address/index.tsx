/* eslint-disable no-catch-shadow */
/* eslint-disable react-native/no-inline-styles */
// import { SizedBox } from '@components/sized-box';
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
import {useAddAddressMutation} from '@services/mutationApi';
import {useGetAddressesQuery} from '@services/queryApi';
import {setAddress} from '@slices/address';
import {Formik} from 'formik';
import React, {createRef, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {RootState, useAppDispatch, useAppSelector} from 'store';
import * as yup from 'yup';
import styles from './styles';

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

export const Address = ({navigation}) => {
  const {width} = Dimensions.get('window');
  const {address} = useAppSelector<any>((store: RootState) => store);
  const [show, setShow] = useState(false);
  const formRef = useRef<any>();
  const mapRef = createRef<any>();
  const dispatch = useAppDispatch();
  const [latitude, setLatitude] = useState<any>(false);
  const [longitude, setLongitude] = useState<any>(false);
  const [lat, setLat] = useState<any>(false);
  const [lng, setLng] = useState<any>(false);
  const [location, setLocation] = useState<any>(false);

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

  const {
    data: addresses,
    refetch: addyFetch,
    isLoading: addyLoad,
    isSuccess: addyTrue,
  } = useGetAddressesQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (addyTrue) {
      if (addresses?.length) {
        dispatch(setAddress(addresses[0]?.street));
      } else {
        dispatch(setAddress(''));
      }
    }
  }, [addresses, addyTrue, dispatch]);

  useEffect(() => {
    if (
      // !addresses?.length ||
      !address.length
    ) {
      setShow(true);
    }
  }, [address]);

  const [addAddress, {isLoading, isSuccess, isError, error, reset}] =
    useAddAddressMutation();

  useEffect(() => {
    if (isSuccess) {
      addyFetch();
      setShow(false);
      flash.success({description: 'Addresses added successfully'});
    }
    if (isError) {
      console.log(error);
      //@ts-ignore
      flash.danger({
        //@ts-ignore
        description: error?.data?.message,
      });
      reset();
    }
  }, [addyFetch, error, isError, isSuccess, reset]);

  const [editTriggers, setEditTriggers] = useState(
    Array(addresses.length).fill(false),
  );

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
                  latitude: lat,
                  longitude: lng,
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

  return (
    <SafeAreaView style={styles.pageWrap}>
      <View style={styles.header}>
        <SvgIcon name="back" size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Address </Text>
      </View>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <SizedBox height={20} />
        <View style={styles.paddingWrap}>
          <View style={styles.pageHead}>
            <View>
              <Text style={styles.userName}>Saved addresses</Text>
              <SizedBox height={12} />
              <Text style={styles.userMail}>
                No problem, type a new email address below. To keep your account
                secure, we’ll need you to enter your password to confirm it’s
                really you.
              </Text>
            </View>
          </View>
          <SizedBox height={28} />
          {addresses?.map((addy, i) => (
            <View key={i} style={styles.addyBox}>
              <View style={styles.addyLeft}>
                <Text style={styles.addyTag}>{addy?.tag}</Text>
                <Text style={styles.addyText}>{addy?.street}</Text>
              </View>
              <SvgIcon
                name="tri-dots"
                onPress={() => {
                  const newEditTriggers = [...editTriggers];
                  newEditTriggers[i] = !newEditTriggers[i];
                  setEditTriggers(newEditTriggers);
                }}
                size={24}
              />
              {editTriggers[i] && (
                <View style={styles.addyCta}>
                  <TouchableOpacity>
                    <Text style={styles.ctaText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.ctaText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}

          <TouchableOpacity
            onPress={() => setShow(true)}
            style={styles.addyBox}>
            <View style={styles.addyNew}>
              <SvgIcon name="add" onPress={() => setShow(true)} size={24} />
              <Text style={styles.addyText}>Add a new delivery address</Text>
            </View>
          </TouchableOpacity>
        </View>
        <SizedBox height={100} />
      </KeyboardAwareScrollView>
      <BottomSheet
        afterHide={() => {
          setShow(false);
        }}
        show={show}
        content={emptyScreen()}
      />
    </SafeAreaView>
  );
};

// AIzaSyAHpG5J2Fcu_m4wBDNSw4s3nhJyNTemJN4
