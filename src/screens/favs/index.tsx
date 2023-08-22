import {SizedBox, SvgIcon, TriCards} from '@components';
import {HDP} from '@helpers';
import {useDelFavMutation} from '@services/mutationApi';
import {useGetFavsQuery} from '@services/queryApi';
import {palette} from '@theme';
import {showToastMessage} from '@utils/prompt';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from 'react-native';
import styles from './styles';

export const Favs = ({navigation}) => {
  const [favsArr, setFavsArr] = useState<any>([]);
  const favList: any = Array.from(favsArr);

  const {
    data: favs,
    refetch: favFetch,
    isSuccess: favTrue,
    isLoading: favLoad,
  } = useGetFavsQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    favFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (favTrue) {
      setFavsArr(favs);
    }
  }, [favTrue, favs]);

  const [delFav, {isError: delFalse, isSuccess: delTrue}] = useDelFavMutation();

  useEffect(() => {
    if (delTrue) {
      favFetch();
    }
    if (delFalse) {
      showToastMessage('Error removing from favorites');
      favFetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delFalse]);

  const handleFav = id => {
    const targetIndexfavsArr = favList?.findIndex(item => item?.id === id);

    if (targetIndexfavsArr !== -1) {
      delFav({
        id: id,
      });
      favFetch();
      // const newList = favList?.filter(item => item?.id === id);

      // setFavsArr(newList);
    } else {
      console.log('Object with target ID not found in the arrays.');
    }
  };

  return (
    <View style={styles.pageWrap}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Favorites</Text>
      </View>
      {favLoad ? (
        <View>
          <SizedBox height={100} />
          <ActivityIndicator color={palette.blue} size="large" />
        </View>
      ) : (
        <ScrollView>
          {favList?.length ? (
            <View>
              <FlatList
                contentContainerStyle={{
                  gap: HDP(12),
                  paddingTop: HDP(16),
                  paddingLeft: HDP(16),
                  marginRight: HDP(16),
                  paddingBottom: HDP(30),
                }}
                showsVerticalScrollIndicator={false}
                data={favList}
                renderItem={({item}) => (
                  <TriCards
                    key={item?.id}
                    image1={item?.kitchenBannerImage}
                    image2={item?.kitchenBannerImage}
                    image3={item?.kitchenBannerImage}
                    name={item?.kitchenName}
                    reviews={item?.reviewCount}
                    rating={item?.rating}
                    onPress={() => {
                      navigation.navigate('Kitchen', {id: item?.id});
                    }}
                    isFav={true}
                    onFavPress={() => {
                      handleFav(item?.id);
                    }}
                  />
                )}
              />
            </View>
          ) : (
            <View>
              <SizedBox height={50} />
              <SvgIcon name="fav-empty" size={100} />
              <SizedBox height={20} />
              <Text style={styles.emptyText}>
                You have not liked any kitchen
              </Text>
            </View>
          )}
          <SizedBox height={100} />
        </ScrollView>
      )}
    </View>
  );
};
