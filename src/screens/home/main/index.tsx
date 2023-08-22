import {Address, SizedBox} from '@components';
import {HDP} from '@helpers';
import {useGetCuisinesQuery} from '@services/queryApi';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';

export const Home = ({navigation}: any) => {
  const {data: cuisines} = useGetCuisinesQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  return (
    <SafeAreaView style={styles.pageWrap}>
      <Address />
      <ScrollView>
        <View style={styles.paddingWrap}>
          <Text style={styles.mainText}>Be inspired</Text>
          <Image
            style={styles.bannerImg}
            source={{
              uri: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            }}
          />
        </View>

        <View>
          <FlatList
            contentContainerStyle={{
              gap: HDP(12),
              paddingTop: HDP(16),
              paddingLeft: HDP(16),
              marginRight: HDP(16),
              paddingBottom: HDP(30),
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={cuisines}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Kitchens', {cuisine: item})}
                style={styles.foodGrid}
                key={item?.id}>
                <Image
                  style={styles.gridImg}
                  source={{
                    uri: item?.image,
                  }}
                />
                <Text style={styles.foodText}>{item?.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <SizedBox height={100} />
      </ScrollView>
    </SafeAreaView>
  );
};
