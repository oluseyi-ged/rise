/* eslint-disable react-native/no-inline-styles */
import {Hue} from '@assets/images';
import {Button, ModalView, SizedBox, SvgIcon} from '@components';
import {HDP} from '@helpers';
import {
  useGetPlansQuery,
  useGetQuoteQuery,
  useGetUserQuery,
} from '@services/queryApi';
import {family, palette} from '@theme';
import React, {useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootState, useAppSelector} from 'store';
import styles from './styles';

const {width, height} = Dimensions.get('window');

export const Home = ({navigation}: any) => {
  const {auth} = useAppSelector((store: RootState) => store);
  const [startPlan, setStartPlan] = useState(false);

  const planIntro = [
    {
      id: 1,
      title: 'Give us a few details',
      desc: 'Tell us what you want to achieve and we will help you get there',
      icon: 'service',
    },
    {
      id: 2,
      title: 'Turn on auto-invest',
      desc: 'The easiest way to get your investment working for you is to fund to periodically. ',
      icon: 'date',
    },
    {
      id: 3,
      title: 'Modify as you progress',
      desc: 'You are in charge. Make changes to your plan, from adding funds, funding source, adding money to your wallet and more.',
      icon: 'gear',
    },
  ];

  const {
    data: profileData,
    isFetching: profileFetching,
    // @ts-ignore
  } = useGetUserQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: plansData,
    // @ts-ignore
  } = useGetPlansQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: quotes,
    isFetching: quotesLoad,
    // @ts-ignore
  } = useGetQuoteQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  return (
    <ScrollView style={styles.pageWrap}>
      <ImageBackground
        source={Hue} // Replace with the actual image path
        style={styles.hueBg}>
        <View style={styles.welcome}>
          <View>
            <Text style={styles.dayText}>Good morning ☀</Text>
            <Text style={styles.nameText}>{auth?.first_name}</Text>
          </View>
          <View style={styles.headAside}>
            <TouchableOpacity style={styles.referBtn}>
              <Text style={styles.referTxt}>Earn 3% bonus </Text>
            </TouchableOpacity>
            <SizedBox width={8} />
            <SvgIcon name="notif" size={42} />
          </View>
        </View>
        <SizedBox height={10} />
        <View style={styles.balBox}>
          <View style={styles.boxHeader}>
            <Text style={styles.balText}>Total Balance</Text>
            <SvgIcon name="eye-close" size={20} />
          </View>
          <SizedBox height={12} />
          <Text style={styles.balance}>
            $
            {profileFetching
              ? '--:--'
              : profileData?.total_balance?.toFixed(2)?.toLocaleString()}
          </Text>
          <View style={styles.divide} />
          <View style={styles.plRow}>
            <Text style={[styles.plText]}>Total Gains </Text>
            <SvgIcon name="rise" size={15} />
            <Text style={[styles.plText, {color: '#27BF41'}]}>
              {profileData?.total_returns || '0.00'}%
            </Text>
            <SvgIcon name="caret-right" size={20} />
          </View>
          <SizedBox height={12} />
          <View style={styles.indRow}>
            <View style={styles.indicate} />
            <View style={styles.unindicate} />
            <View style={styles.unindicate} />
          </View>
          <SizedBox height={5} />
        </View>
      </ImageBackground>
      <View style={styles.paddingWrap}>
        <TouchableOpacity style={styles.addCta}>
          <SvgIcon name="plus" size={21} />
          <Text style={styles.addText}>Add Money</Text>
        </TouchableOpacity>
        <SizedBox height={31} />

        <View>
          <View style={styles.plansHead}>
            <Text style={styles.plansMain}>Create a plan</Text>
            <TouchableOpacity
              style={styles.plansSide}
              disabled={!plansData?.items?.length}>
              <Text
                style={[
                  styles.plansSub,
                  plansData?.items?.length && {color: palette.teal},
                ]}>
                View all plans
              </Text>
              <SvgIcon name="arrow-right" size={12} />
            </TouchableOpacity>
          </View>
          <SizedBox height={12} />
          <Text style={styles.plansDesc}>
            Start your investment journey by creating a plan"
          </Text>
          <SizedBox height={20} />
          <TouchableOpacity
            onPress={() => setStartPlan(true)}
            style={styles.addInv}>
            <SvgIcon name="add" size={45} />
            <SizedBox height={5} />
            <Text style={styles.addInvText}>Create an investment plan</Text>
          </TouchableOpacity>
        </View>

        <SizedBox height={31} />

        <View style={styles.helpCta}>
          <View style={styles.helpLeft}>
            <SvgIcon name="help" size={25} />
            <Text style={styles.helpText}>Need help? </Text>
          </View>
          <View style={{width: '40%'}}>
            <Button
              title="Contact us"
              textStyle={{fontFamily: family.Regular}}
              containerStyle={{borderRadius: HDP(6)}}
            />
          </View>
        </View>

        <SizedBox height={34} />

        {!quotesLoad && (
          <View style={styles.quoteBox}>
            <Text style={styles.quoteHeader}>TODAY’S QUOTE</Text>
            <View style={styles.divideMini} />
            <Text style={styles.quote}>{quotes?.quote}</Text>
            <SizedBox height={22} />
            <View style={styles.citeSection}>
              <Text style={styles.citeText}>{quotes?.author}</Text>
              <SvgIcon name="share" size={42} />
            </View>
          </View>
        )}

        <SizedBox height={32} />

        <SvgIcon name="logo-white" size={85} />
      </View>
      <SizedBox height={100} />
      <ModalView
        modalStyle={{height, width, alignSelf: 'center'}}
        show={startPlan}
        desc={
          <ScrollView>
            <View style={styles.modalHead}>
              <SvgIcon
                name="close"
                onPress={() => setStartPlan(false)}
                size={36}
              />
              <Text style={styles.modalHeadText}>Create a plan</Text>
              <View style={{width: HDP(36)}} />
            </View>
            <SizedBox height={30} />
            <Text style={styles.modalSub}>Reach your goals faster</Text>
            <SizedBox height={61} />
            <SvgIcon name="cart" size={100} />
            <SizedBox height={53} />
            {planIntro?.map(intro => (
              <View style={styles.introItem}>
                <SvgIcon name={intro?.icon} size={40} />
                <View style={{flex: 1}}>
                  <Text style={styles.introBold}>{intro?.title}</Text>
                  <Text style={styles.introSub}>{intro?.desc}</Text>
                </View>
              </View>
            ))}
            <SizedBox height={60} />
            <Button title="Continue" />
            <SizedBox height={20} />
          </ScrollView>
        }
      />
    </ScrollView>
  );
};
