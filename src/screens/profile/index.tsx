/* eslint-disable react-native/no-inline-styles */
import {Button, Select, SizedBox, SvgIcon, TextInput} from '@components';
import {flash} from '@helpers/FlashMessageHelpers';
import {useUpdateProfileMutation} from '@services/mutationApi';
import {useGetProfileQuery} from '@services/queryApi';
import {setProfile} from '@slices/profile';
import {Formik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {RootState, useAppDispatch, useAppSelector} from 'store';
import * as yup from 'yup';
import styles from './styles';

const status = [
  {key: '1', value: 'Single'},
  {key: '2', value: 'Married'},
  {key: '3', value: 'Divorced'},
  {key: '5', value: 'In a Relationship'},
  {key: '6', value: 'Engaged'},
  {key: '11', value: 'Other'},
];

// Add more status options as needed

export const Profile = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [statusObj, setStatusObj] = useState<any>({});

  console.log(statusObj);
  const profileSchema = yup.object().shape({
    nextOfKin: yup.string().required('Field cannot be empty'),
    maritalStatus: yup.string().required('Field cannot be empty'),
  });

  const formRef = useRef<any>();
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const {profile} = useAppSelector<any>((store: RootState) => store);

  useEffect(() => {
    const foundObject = status.find(
      item => item.value === profile?.profile?.maritalStatus,
    );
    setStatusObj(foundObject);
  }, [profile]);

  const profileValues = {
    nextOfKin: profile?.profile?.nextOfKin || '',
    maritalStatus: profile?.profile?.maritalStatus || '',
  };

  const {data: profileData, refetch} = useGetProfileQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  console.log(profileData);

  useEffect(() => {
    const userUpdate = {...profile};
    userUpdate.profile = profileData;
    dispatch(setProfile(userUpdate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

  const [updateProfile, {data, isLoading, isSuccess, isError, error, reset}] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      flash.success({description: 'Profile Updated successfully'});
      refetch();
    }
    if (isError) {
      console.log(error);
      //@ts-ignore
      flash.danger({description: error?.data?.message});
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, isError, isSuccess, navigation, reset]);

  return (
    <SafeAreaView style={styles.pageWrap}>
      <KeyboardAwareScrollView
        style={styles.scrollWrap}
        keyboardShouldPersistTaps="handled">
        <View>
          <SvgIcon
            name="back"
            size={40}
            onPress={() => navigation.goBack()}
            containerStyle={{alignSelf: 'flex-start'}}
          />
          <SizedBox height={8} />
          <View>
            <Text style={styles.headerLabel}>Profile</Text>
            <Text style={styles.headerSub}>
              Below are your personal details given to us, you can make changes
              if needed
            </Text>
          </View>
        </View>
        <SizedBox height={40} />
        <Formik
          initialValues={profileValues}
          onSubmit={values => {
            console.log(values);
            updateProfile(values);
          }}
          innerRef={formRef}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={profileSchema}>
          {({errors, setFieldValue, values}) => (
            <View>
              <TextInput
                label="Fullname"
                placeholder="Seyi komolafe"
                editable={false}
                value={
                  profile?.profile?.firstName + ' ' + profile?.profile?.lastName
                }
              />
              <SizedBox height={14} />
              <TextInput
                editable={false}
                label="Username"
                value={'@' + profile?.profile?.username}
              />
              <SizedBox height={14} />
              <TextInput
                label="Phone Number"
                editable={false}
                value={profile?.phone}
              />
              <SizedBox height={14} />
              <TextInput
                label="Email Address"
                editable={false}
                value={profile?.email}
              />
              {/* <SizedBox height={14} />
          <TextInput label="Address" placeholder="Somewhere in the world" /> */}
              <SizedBox height={14} />
              <TextInput
                label="Next of Kin"
                placeholder="Enter Next of Kin Name here..."
                name="nextOfKin"
                // @ts-ignore
                error={errors?.nextOfKin}
                autoCorrect={false}
                onChangeText={value => setFieldValue('nextOfKin', value)}
                value={values.nextOfKin}
              />
              <SizedBox height={14} />
              <Select
                save="value"
                data={status}
                placeholder="Select Here"
                label="Marital Status"
                onSelect={value => {
                  setFieldValue('maritalStatus', value);
                  console.log(value);
                }}
                defaultOption={statusObj}
                // @ts-ignore
                error={errors?.maritalStatus}
              />
              <SizedBox height={50} />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      <View style={styles.bottomCta}>
        <Button
          title="Save Changes"
          loading={isLoading}
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};
