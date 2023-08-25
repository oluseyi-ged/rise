/* eslint-disable react-native/no-inline-styles */
import {Button, SizedBox, SvgIcon} from '@components';
import {HDP} from '@helpers';
import {flash} from '@helpers/FlashMessageHelpers';
import {useCreatePlanMutation} from '@services/mutationApi';
import {useGetProjectionQuery} from '@services/queryApi';
import {palette} from '@theme';
import moment from 'moment';
import React, {useEffect} from 'react';
import {Dimensions, SafeAreaView, ScrollView, Text, View} from 'react-native';
import styles from './styles';

export const Projections = ({navigation, route}: any) => {
  console.log(route.params?.data);
  const data = route.params?.data;
  const {width} = Dimensions.get('window');

  const monthsDiff = moment(data?.date)?.diff(moment(), 'months');

  const {data: projection} = useGetProjectionQuery({
    pay: Number(data?.amount) / monthsDiff,
    target: data?.amount,
    date: data?.date,
  });

  const [createPlan, {isLoading, isSuccess, isError, error}] =
    useCreatePlanMutation();

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('PlanSuccess');
    }
    if (isError && 'status' in error!) {
      if (error?.data?.message?.length) {
        flash.danger({description: error?.data?.message});
      }
    }
  }, [data, isError, isSuccess, navigation, error]);

  console.log(projection);

  return (
    <SafeAreaView style={styles.pageWrap}>
      <ScrollView style={{paddingHorizontal: HDP(20)}}>
        <View style={styles.header}>
          <SvgIcon name="back" size={36} onPress={() => navigation.goBack()} />
          <Text style={styles.headerText}>Review</Text>
          <SizedBox width={36} />
        </View>
        <SizedBox height={24} />
        <View style={styles.spanBox}>
          <Text style={styles.spanText}>{data?.reason}</Text>
          <Text style={styles.spanAmt}>
            ₦ {Number(data?.amount)?.toFixed(2)?.toLocaleString()}
          </Text>
          <Text style={styles.spanDate}>
            by {moment(data?.date)?.format('DD MMMM YYYY')}
          </Text>
        </View>

        <SizedBox height={30} />

        <View style={styles.projects}>
          <View style={styles.projGrid}>
            <View style={styles.invBox} />
            <Text style={styles.projText}>
              Investments • ₦{projection?.total_invested}
            </Text>
          </View>
          <SizedBox width={30} />

          <View style={styles.projGrid}>
            <View style={styles.retBox} />
            <Text style={styles.projText}>
              Returns • ₦{projection?.total_returns || '0'}
            </Text>
          </View>
        </View>

        <SizedBox height={30} />

        <SvgIcon
          name="graph"
          containerStyle={{
            height: HDP(217),
            width,
            alignSelf: 'center',
          }}
        />
        <View style={styles.amtGrid}>
          <Text style={styles.amtRight}>Estimated monthly investment</Text>
          <Text style={styles.amtLeft}>
            ₦{' '}
            {(Number(data?.amount) / monthsDiff)?.toFixed(2)?.toLocaleString()}
          </Text>
        </View>
        <SizedBox height={27} />

        <View style={styles.infoBox}>
          <SvgIcon name="info" size={24} />
          <Text style={styles.infoText}>
            Returns not guaranteed. Investing involves risk. Read our
            Disclosures.
          </Text>
        </View>
        <SizedBox height={27} />

        <Text style={styles.extraText}>
          These are your starting settings, they can always be updated.
        </Text>
        <SizedBox height={29} />

        <Button
          title="Agree & Continue"
          loading={isLoading}
          onPress={() => {
            createPlan({
              plan_name: data?.reason,
              target_amount: Number(data?.amount),
              maturity_date: data?.date,
            });
          }}
        />
        <SizedBox height={10} />
        <Button
          title="Start over"
          textStyle={{
            color: palette.teal,
          }}
          containerStyle={{
            backgroundColor: 'rgba(113, 135, 156, 0.10)',
          }}
        />
        <SizedBox height={30} />
      </ScrollView>
    </SafeAreaView>
  );
};
