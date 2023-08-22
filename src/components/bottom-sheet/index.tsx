// import { SizedBox } from '@components/sized-box';
import {SizedBox} from '@components';
import {HDP} from '@helpers';
import React, {FC} from 'react';
import {ScrollView, View} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

interface Props {
  title?: string;
  content?: any;
  show?: boolean;
  dropPress?: any;
  afterHide?: any;
  modalStyle?: any;
}

export const BottomSheet: FC<Props> = ({
  title,
  content,
  show = false,
  dropPress,

  afterHide,
  modalStyle,
}) => {
  return (
    <Modal
      isVisible={show}
      avoidKeyboard={true}
      onBackdropPress={dropPress}
      onModalHide={afterHide}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={[
          styles.modalView,
          title?.length! > 0 && {paddingHorizontal: HDP(24)},
          modalStyle,
        ]}>
        <View>{content}</View>
        <SizedBox height={24} />
      </ScrollView>
    </Modal>
  );
};
