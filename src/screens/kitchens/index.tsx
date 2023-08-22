/* eslint-disable react-native/no-inline-styles */
import {SizedBox, SvgIcon, TextInput, TriCards, WideCards} from '@components';
import {HDP} from '@helpers';
import {useAddFavMutation, useDelFavMutation} from '@services/mutationApi';
import {
  useGetCuisinesQuery,
  useGetKitchenByCuisineQuery,
  useGetNewKitchensQuery,
} from '@services/queryApi';
import {palette} from '@theme';
import {showToastMessage} from '@utils/prompt';
import React, {useEffect, useState} from 'react';
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

export const Kitchens = ({navigation, route}: any) => {
  const {cuisine} = route?.params;
  const [food, setFood] = useState(cuisine);
  const [favId, setFavId] = useState('');
  const [kitchensArr, setKitchensArr] = useState<any>([]);
  const [newbies, setNewbies] = useState<any>([]);
  const kArr: any = Array.from(kitchensArr);
  const nArr: any = Array.from(newbies);
  const [searchMode, setSearchMode] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  console.log(searchedText, 'kitkit');

  const {data: cuisines} = useGetCuisinesQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const filteredItems = searchedText
    ? kitchensArr?.filter(item =>
        item?.kitchenName?.toLowerCase()?.includes(searchedText?.toLowerCase()),
      )
    : kitchensArr;

  const {data: rookies, isSuccess: rookiesTrue} = useGetNewKitchensQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const {data: kitchens, isSuccess: kitchenTrue} = useGetKitchenByCuisineQuery(
    food?.id,
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    },
  );

  const [addFav, {isError: addFalse}] = useAddFavMutation();

  const [delFav, {isError: delFalse}] = useDelFavMutation();

  useEffect(() => {
    const targetIndexKArr = kArr.findIndex(item => item?.id === favId);
    const targetIndexNArr = nArr.findIndex(item => item?.id === favId);

    if (addFalse) {
      showToastMessage('Error adding to favorites');
      if (targetIndexKArr !== -1) {
        const newItem = {
          ...kArr[targetIndexKArr],
          isFavorite: false,
        };
        kArr[targetIndexKArr] = newItem;
        setKitchensArr(kArr);
      } else if (targetIndexNArr !== -1) {
        const newItem = {
          ...nArr[targetIndexNArr],
          isFavorite: false,
        };
        nArr[targetIndexNArr] = newItem;
        setNewbies(nArr);
      }
    }
    if (delFalse) {
      showToastMessage('Error removing from favorites');
      if (targetIndexKArr !== -1) {
        const newItem = {
          ...kArr[targetIndexKArr],
          isFavorite: true,
        };
        kArr[targetIndexKArr] = newItem;
        setKitchensArr(kArr);
      } else if (targetIndexNArr !== -1) {
        const newItem = {
          ...nArr[targetIndexNArr],
          isFavorite: true,
        };
        nArr[targetIndexNArr] = newItem;
        setNewbies(nArr);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addFalse, delFalse]);

  useEffect(() => {
    if (kitchenTrue) {
      setKitchensArr(kitchens);
    }
    if (rookiesTrue) {
      setNewbies(rookies);
    }
  }, [kitchenTrue, kitchens, rookies, rookiesTrue]);

  const handleFav = id => {
    console.log(id);

    const targetIndexKArr = kArr.findIndex(item => item?.id === id);
    const targetIndexNArr = nArr.findIndex(item => item?.id === id);

    if (targetIndexKArr !== -1) {
      if (!kArr[targetIndexKArr]?.isFavorite) {
        addFav({
          id: id,
        });
      } else {
        delFav({
          id: id,
        });
      }
      const newItem = {
        ...kArr[targetIndexKArr],
        isFavorite: !kArr[targetIndexKArr]?.isFavorite,
      };
      kArr[targetIndexKArr] = newItem;
      console.log(kArr, 'kitkitta');
      setKitchensArr(kArr);
    } else if (targetIndexNArr !== -1) {
      if (!kArr[targetIndexNArr]?.isFavorite) {
        addFav({
          id: id,
        });
      } else {
        delFav({
          id: id,
        });
      }
      const newItem = {
        ...nArr[targetIndexNArr],
        isFavorite: !nArr[targetIndexNArr]?.isFavorite,
      };
      nArr[targetIndexNArr] = newItem;
      setNewbies(nArr);
    } else {
      console.log('Object with target ID not found in the arrays.');
    }
  };

  console.log(rookies);

  return (
    <SafeAreaView style={styles.pageWrap}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <SvgIcon
            name="back"
            size={24}
            onPress={() =>
              searchMode ? setSearchMode(false) : navigation.goBack()
            }
          />
          {searchMode ? (
            <View style={{flex: 1}}>
              <TextInput
                onChangeText={txt => setSearchedText(txt)}
                placeholder="Search Kitchen"
                inputStyle={styles.searchBox}
              />
            </View>
          ) : (
            <Text style={styles.headerText}>{food?.label}</Text>
          )}
        </View>
        {!searchMode && (
          <SvgIcon
            name="search"
            size={24}
            onPress={() => setSearchMode(true)}
          />
        )}
      </View>

      {!searchedText?.length && (
        <View>
          <FlatList
            contentContainerStyle={{
              gap: HDP(12),
              paddingTop: HDP(16),
              paddingLeft: HDP(16),
              marginRight: HDP(16),
              paddingBottom: HDP(5),
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={cuisines}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => setFood(item)}
                style={[
                  styles.foodGrid,
                  food?.label === item?.label && {
                    borderBottomColor: palette.blue,
                    borderBottomWidth: HDP(3),
                    borderTopRightRadius: HDP(15),
                    borderTopLeftRadius: HDP(15),
                  },
                ]}
                key={item?.id}>
                <Image
                  style={[
                    styles.gridImg,
                    food?.label === item?.label && {
                      borderColor: palette.blue,
                      borderWidth: HDP(4),
                    },
                  ]}
                  source={{
                    uri: item?.image,
                  }}
                />
                <Text style={styles.foodText}>{item?.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <ScrollView>
        <View style={styles.paddingWrap}>
          {filteredItems?.length ? (
            filteredItems?.map((kitchen, i) => (
              <TriCards
                key={i}
                image1={kitchen?.kitchenBannerImage}
                image2={kitchen?.kitchenBannerImage}
                image3={kitchen?.kitchenBannerImage}
                name={kitchen?.kitchenName}
                reviews={kitchen?.reviewCount}
                rating={kitchen?.rating}
                onPress={() => {
                  navigation.navigate('Kitchen', {id: kitchen?.id});
                }}
                isFav={kitchen?.isFavorite}
                onFavPress={() => {
                  setFavId(kitchen?.id);
                  handleFav(kitchen?.id);
                }}
              />
            ))
          ) : (
            <View style={styles.noneView}>
              <SizedBox height={50} />
              <SvgIcon name="none" size={100} />
              <SizedBox height={20} />
              <Text style={styles.noneText}>
                No kitchen found for this{' '}
                {searchedText?.length ? 'search' : 'cuisine'}
              </Text>
              <SizedBox height={20} />
            </View>
          )}
        </View>

        <View style={[styles.paddingWrap, styles.divide]}>
          <Text style={styles.mainText}>New Kitchens</Text>
          <FlatList
            contentContainerStyle={{
              gap: HDP(12),
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={newbies}
            renderItem={({item}) => (
              <WideCards
                image1={item?.kitchenBannerImage}
                name={item?.kitchenName}
                reviews={item?.reviewCount}
                rating={item?.rating}
                onPress={() => {
                  navigation.navigate('Kitchen', {id: item?.id});
                }}
                isFav={item?.isFavorite}
                onFavPress={() => {
                  setFavId(item?.id);
                  handleFav(item?.id);
                }}
              />
            )}
          />
        </View>
        <SizedBox height={100} />
      </ScrollView>
    </SafeAreaView>
  );
};
