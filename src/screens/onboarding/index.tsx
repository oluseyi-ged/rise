/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Onb1, Onb2, Onb3 } from "@assets/images"
import { HDP } from "@helpers"
import { setFirst } from "@slices/first"
import React, { FC, useRef, useState } from "react"
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { useAppDispatch } from "store"
import { SizedBox } from "../../components/sized-box/index"
import style from "./styles"

export const Onboarding: FC = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
  const width = Dimensions.get("window").width

  const slides = [
    {
      id: 1,
      img: Onb1,
      label: "Why eat unhealthy, expensive junk food?",
      desc: "Wiith FoodieApp, you get a better, healthier, delicious choice of home-cooked meals from seasoned home chefs.... and a taste of home.",
    },
    {
      id: 2,
      img: Onb2,
      label: "Why wait hours for your food to be delivered?",
      desc: "Wiith FoodieApp, you get a better, healthier, delicious choice of home-cooked meals from seasoned home chefs.... and a taste of home.",
    },
    {
      id: 3,
      img: Onb3,
      label:
        "Do your friends and family swear by your delicious cooking skills",
      desc: "Share your cooking magic with the world and get paid while you enjoy doing what you love",
    },
  ]

  const ref = useRef<any>(null)

  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollIndex = () => {
    const nextSlideIndex = currentIndex + 1
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width
      ref?.current?.scrollToOffset({ offset })
      setCurrentIndex(nextSlideIndex)
    }
  }

  const updateIndex = (e) => {
    const contentOffset = e.nativeEvent.contentOffset.x
    const newIndex = Math.round(contentOffset / width)
    setCurrentIndex(newIndex)
  }

  return (
    <SafeAreaView style={style.pageWrap}>
      <View style={style.container}>
        <View style={style.flowContainer}>
          <FlatList
            ref={ref}
            data={slides}
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled
            onMomentumScrollEnd={updateIndex}
            renderItem={({ item }) => {
              return (
                <View style={style.swipeCont}>
                  <Image
                    style={style.onbImg}
                    source={item?.img}
                    resizeMode="contain"
                  />
                  <View style={style.swipeTextContainer}>
                    <SizedBox height={59} />
                    <Text style={style.swipeLabel}>{item.label}</Text>
                    <SizedBox height={5} />
                    <Text style={style.swipeDesc}>{item.desc}</Text>
                  </View>
                  {/* Render indicator */}
                  <View style={style.ctaGrid}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: HDP(3),
                      }}
                    >
                      {slides.map((_, index) => (
                        <View
                          style={[
                            currentIndex === index
                              ? style.indicate
                              : style.unindicate,
                          ]}
                        />
                      ))}
                    </View>
                  </View>
                </View>
              )
            }}
          />
        </View>

        <View style={style.btnContain}>
          <TouchableOpacity
            style={style.proceedCta}
            onPress={() => {
              if (currentIndex !== slides.length - 1) {
                scrollIndex()
              } else {
                navigation.navigate("Auth")
                dispatch(setFirst(false))
              }
            }}
          >
            <Text style={style.proceedText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={style.floatSkip}
        onPress={() => {
          navigation.navigate("Auth")
          dispatch(setFirst(false))
        }}
      >
        <Text style={style.skipText}>SKIP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
