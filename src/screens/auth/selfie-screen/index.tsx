/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Button, SizedBox, SvgIcon} from '@components';
import {usePhotoUploadMutation} from '@services/mutationApi';
import {palette} from '@theme';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';
import {styles} from './styles';

export const SelfieScreen = ({navigation}: any) => {
  const [notice, setNotice] = useState(true);
  const {width} = Dimensions.get('window');
  // @ts-ignore
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState('');
  const isUrl = (str: string) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    return pattern.test(str);
  };

  const [
    photoUpload,
    {
      data: photoData,
      isLoading: photoLoading,
      isSuccess: photoSuccess,
      isError: photoIsError,
      error: photoErr,
    },
  ] = usePhotoUploadMutation();

  useEffect(() => {
    if (photo?.length) {
      photoUpload({
        photo: photo,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo]);

  useEffect(() => {
    if (photoSuccess) {
      navigation.navigate('FinishProfile', {values: photoData});
      console.log(photoData);
    }
    if (photoIsError) {
      console.log(photoErr, 'move it');
      // @ts-ignore
      flash.danger({description: photoErr?.data?.message});
      setIsLoading(false);
    }
  }, [
    photoLoading,
    photoSuccess,
    photoIsError,
    navigation,
    photoData,
    photoErr,
  ]);

  const takePic = async () => {
    setIsLoading(true);
    try {
      const selfie = await takePicture();
      const image = await RNFS.readFile(selfie.uri, 'base64').then(res => {
        return res;
      });
      console.log(`data:image/png;base64,${image}`);
      let imgdata = {
        file: `data:image/png;base64,${image}`,
        upload_preset: 'fznurftp',
      };
      fetch('https://api.cloudinary.com/v1_1/dkb3vq7ai/upload', {
        body: JSON.stringify(imgdata),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      })
        .then(async r => {
          let resdata = await r.json();
          setPhoto(resdata.url);
        })
        .catch(err => console.log(err));
      // singleUpload({
      //   file: `data:image/png;base64,${image}`,
      // });
    } catch (err) {
      console.log('errored', err);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.pageWrap}>
      <View style={styles.container}>
        <View>
          <SvgIcon
            name="back"
            size={40}
            onPress={() => navigation.goBack()}
            containerStyle={{alignSelf: 'flex-start'}}
          />
          <SizedBox height={8} />
          <View>
            <Text style={styles.headerLabel}>Take a Selfie</Text>
            <Text style={styles.headerSub}>
              {notice
                ? 'Please check if you are fine with your selfie. If not, you can retake it.'
                : 'Please look into the camera and hold still, before snapping.'}
            </Text>
          </View>
        </View>
        <SizedBox height={80} />
        <View>
          {notice ? (
            <SvgIcon name="selfie-notice" size={280} />
          ) : (
            <View style={styles.cameraBox}>
              <RNCamera
                ref={cameraRef}
                type={RNCamera.Constants.Type.front}
                style={styles.preview}
              />
              <View style={styles.cameraCrop}>
                <SvgIcon name="crop" size={217} />
              </View>
            </View>
          )}
        </View>
      </View>
      <View style={styles.bottomText}>
        {notice ? (
          <Button
            title="Confirm"
            containerStyle={{width: width * 0.9}}
            onPress={() => setNotice(false)}
          />
        ) : (
          <>
            {isLoading ? (
              <ActivityIndicator color={palette.blue} />
            ) : (
              <SvgIcon name="shot" size={64} onPress={() => takePic()} />
            )}
            <SizedBox height={10} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};
