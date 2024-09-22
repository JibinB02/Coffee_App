import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useStore} from '../store/store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';

const DetailsScreen = ({navigation, route}: any) => {
  const ItemofIndex = useStore((state: any) =>
    route.params.type === 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];

  const BackHandler = () => {
    navigation.pop();
  };

  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavorites = useStore(
    (state: any) => state.deleteFromFavorites,
  );

  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartprice = useStore((state: any) => state.calculateCartPrice);

  const [fullDesc, setFullDesc] = useState(false);
  const [price, setPrice] = useState(ItemofIndex.prices[0]);

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavorites(type, id) : addToFavoriteList(type, id);
  };

  const addToCartHandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{...price, quantity: 1}],
    });
    calculateCartprice();
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={ItemofIndex.imagelink_portrait}
          type={ItemofIndex.type}
          id={ItemofIndex.id}
          favourite={ItemofIndex.favourite}
          name={ItemofIndex.name}
          special_ingredient={ItemofIndex.special_ingredient}
          ingredients={ItemofIndex.ingredients}
          average_rating={ItemofIndex.average_rating}
          ratings_count={ItemofIndex.ratings_count}
          roasted={ItemofIndex.roasted}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />
        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => setFullDesc(prev => !prev)}>
              <Text style={styles.DescriptionText}>
                {ItemofIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => setFullDesc(prev => !prev)}>
              <Text style={styles.DescriptionText} numberOfLines={3}>
                {ItemofIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {ItemofIndex.prices.map((data: any, index: any) => (
              <TouchableOpacity
                onPress={() => setPrice(data)}
                key={index}
                style={[
                  styles.SizeBox,
                  {
                    borderColor:
                      data.size == price.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryDarkGreyHex,
                  },
                ]}>
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize:
                        ItemofIndex.type == 'bean'
                          ? FONTSIZE.size_14
                          : FONTSIZE.size_16,
                      color:
                        data.size == price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.secondaryLightGreyHex,
                    },
                  ]}>
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => {
            addToCartHandler({
              id: ItemofIndex.id,
              index: ItemofIndex.index,
              name: ItemofIndex.name,
              roasted: ItemofIndex.roasted,
              imagelink_square: ItemofIndex.imagelink_square,
              special_ingredient: ItemofIndex.special_ingredient,
              type: ItemofIndex.type,
              price: price,
            });
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    letterSpacing: 0.5,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
  SizeBox: {
    flex: 1,
    height: SPACING.space_24 * 2,
    borderWidth: 2,
    borderRadius: BORDERRADIUS.radius_10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
});

export default DetailsScreen;
