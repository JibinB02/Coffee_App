import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import GradientBGIcon from './GradientBGIcon';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

interface ImageBackgroundInfoProps {
  EnableBackHandler: boolean;
  imagelink_portrait: ImageProps;
  type: string;
  id: string;
  favourite: boolean;
  name: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  roasted: string;
  BackHandler?: any;
  ToggleFavourite: any;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  EnableBackHandler,
  imagelink_portrait,
  type,
  id,
  favourite,
  name,
  special_ingredient,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  BackHandler,
  ToggleFavourite,
}) => {
  return (
    <View>
      <ImageBackground
        source={imagelink_portrait}
        style={styles.ItemBackgroundImg}>
        {EnableBackHandler ? (
          <View style={styles.HeaderViewWithBack}>
            <TouchableOpacity onPress={() => BackHandler()}>
              <GradientBGIcon
                name="left"
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => ToggleFavourite(favourite, type, id)}>
              <GradientBGIcon
                name="like"
                size={FONTSIZE.size_16}
                color={
                  favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                }
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.HeaderViewWithoutBack}>
            <TouchableOpacity
              onPress={() => ToggleFavourite(favourite, type, id)}>
              <GradientBGIcon
                name="like"
                size={FONTSIZE.size_16}
                color={
                  favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                }
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.ImageInfoOuterContainer}>
          <View style={styles.ImageInfoInnerContainer}>
            <View style={styles.InfoContainerRow}>
              <View>
                <Text style={styles.TitleText}>{name}</Text>
                <Text style={styles.SubtitleText}>{special_ingredient}</Text>
              </View>

              <View style={styles.ItemPropertiesContainer}>
                {/* first property */}
                <View style={styles.Properties}>
                  <CustomIcon
                    name={type === 'Bean' ? 'bean' : 'beans'}
                    size={type === 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text
                    style={[
                      styles.FirstPropertiesText,
                      {
                        marginTop:
                          type === 'Bean'
                            ? SPACING.space_2 + SPACING.space_4
                            : 0,
                      },
                    ]}>
                    {type}
                  </Text>
                </View>

                {/* second property */}
                <View style={styles.Properties}>
                  <CustomIcon
                    name={type === 'Bean' ? 'location' : 'drop'}
                    size={FONTSIZE.size_16}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text style={styles.SecondPropertiesText}>{ingredients}</Text>
                </View>
              </View>
            </View>
            <View style={styles.InfoContainerRow}>
              <View style={styles.RatingContainer}>
                <CustomIcon
                  name="star"
                  color={COLORS.primaryOrangeHex}
                  size={FONTSIZE.size_20}
                />
                <Text style={styles.RatingText}>{average_rating}</Text>
                <Text style={styles.RatingCountText}>({ratings_count})</Text>
              </View>
              <View style={styles.RoastedContainer}>
                <Text style={styles.RoastedText}>{roasted}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  ItemBackgroundImg: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  HeaderViewWithBack: {
    flexDirection: 'row',
    padding: SPACING.space_30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderViewWithoutBack: {
    flexDirection: 'row',
    padding: SPACING.space_30,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  ImageInfoOuterContainer: {
    paddingVertical: SPACING.space_24,
    paddingHorizontal: SPACING.space_30,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
    borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
  },
  ImageInfoInnerContainer: {
    gap: SPACING.space_15,
    justifyContent: 'space-between',
  },
  InfoContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ItemPropertiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_20,
  },
  TitleText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryWhiteHex,
  },
  SubtitleText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  Properties: {
    height: 55,
    width: 55,
    borderRadius: BORDERRADIUS.radius_15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryGreyHex,
  },
  FirstPropertiesText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  SecondPropertiesText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
    marginTop: SPACING.space_4 + SPACING.space_2,
  },
  RatingContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  RatingText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  RatingCountText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
  RoastedContainer: {
    height: 55,
    width: 55 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryGreyHex,
  },
  RoastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
});

export default ImageBackgroundInfo;
