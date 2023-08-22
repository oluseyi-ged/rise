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
import React, {FC, createRef, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {RootState, useAppDispatch, useAppSelector} from 'store';
import * as yup from 'yup';
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

export const Address: FC<Props> = ({}) => {
  const {width} = Dimensions.get('window');
  const {address} = useAppSelector<any>((store: RootState) => store);
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const formRef = useRef<any>();
  const mapRef = createRef<any>();
  const dispatch = useAppDispatch();
  const [latitude, setLatitude] = useState<any>(0);
  const [longitude, setLongitude] = useState<any>(0);
  const [lat, setLat] = useState<any>(0);
  const [lng, setLng] = useState<any>(0);
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
          setLatitude(0);
          setLongitude(0);
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
              setLatitude(0);
              setLongitude(0);
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
    let timeoutId;

    if (!address.length) {
      // Set a timeout of 5 seconds before setting `show` to `true`
      timeoutId = setTimeout(() => {
        setShow(true);
      }, 5000); // 5000 milliseconds = 5 seconds
    }

    // Clear the timeout if the effect is cleaned up
    return () => clearTimeout(timeoutId);
  }, [address]);

  const [addAddress, {isLoading, isSuccess, isError, error, reset}] =
    useAddAddressMutation();

  useEffect(() => {
    if (isSuccess) {
      addyFetch();
      setAdd(false);
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
              listViewDisplayed={false}
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
            <Text>{errors?.street}</Text>
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

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.gridLeft} onPress={() => setShow(true)}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', gap: HDP(10)}}>
          <SvgIcon name="gold-loc" size={20} />
          <Text style={styles.addyMain}>{address}</Text>
        </View>
        <SvgIcon name="caret-down" size={20} />
      </TouchableOpacity>
      {/* <SvgIcon name="search" size={20} /> */}
      <BottomSheet
        afterHide={() => {
          setShow(false);
          setAdd(false);
        }}
        show={show}
        content={add || !addresses?.length ? emptyScreen() : fillScreen()}
      />
    </View>
  );
};

// AIzaSyAHpG5J2Fcu_m4wBDNSw4s3nhJyNTemJN4
