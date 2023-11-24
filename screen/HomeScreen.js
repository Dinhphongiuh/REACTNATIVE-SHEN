import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { StyleSheet, Dimensions,Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView, TextInput, ImageBackground, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import axios from 'axios';

const {height, width} =  Dimensions.get("window");
export default function App({navigation, route}) {
  const [isLogin, setIsLogin] = useState(false);
  if (route.params != undefined)
  {
    const {userName} = route.params;
    console.log(userName);
  }
  const checkLogin = () => {
    if (route.params != undefined)
    {
      
    }
  };
  checkLogin();

  const scrollPageref = useRef();
  const scrollCategoryRef = useRef();
  const flatListCategoryRef = useRef();

  const [activeIndexPage, setActiveIndexPage] = useState(0);

  const hanldePageButtonPress = (index) => {
    let newPosition = index * width;
    scrollPageref.current.scrollTo({x: newPosition, y: 0,animated: true});
    handlePageCateGory1Scroll(index);
    setActiveIndexPage(index);
  };

  const handlePageCateGory1Scroll = (index) => {
    let newPosition1;
    if (index >= 4)
    {
      newPosition1 = index * 100;
    }
    else
    {
      newPosition1 = index / 300;
    }
    scrollCategoryRef.current.scrollTo({x: newPosition1, y: 0,animated: true});
  };

  const handlePageScrollEnd = (event) => {
    let contentOffset = event.nativeEvent.contentOffset.x; 
    let index = Math.round(contentOffset / width);
    handlePageCateGory1Scroll(activeIndexPage);
    setActiveIndexPage(index);
  };


   // data ListCategory1
  const [listCategory1, setListCategory1] = useState([]);

  useEffect(() => {
    let fetchDatalistCategory1 = async() => {
      try
      {
        let response = await axios.get('https://65565e3c84b36e3a431fa766.mockapi.io/listCategory1');
        let data  = response.data;
        setListCategory1(data);
      }
      catch (error)
      {
        console.log('error fetching data category1: ', error);
      }

    };
    fetchDatalistCategory1();
  }, []);

  const PageAll = () => {
    let flatListAdsRef  = useRef();

    let [activeIndexAds, setActiveIndexAds] = useState(0);

    // ADS Data List
    let [listAdsImage, setListAdsImage] = useState([]);
    useEffect(() => {
      let fetchDatalistAdsImage = async() => {
        try
        {
          let response = await axios.get('https://65565e3c84b36e3a431fa766.mockapi.io/listAdsImage');
          let data  = response.data;
          setListAdsImage(data);
        }
        catch (error)
        {
          console.log('error fetching data category1: ', error);
        }
  
      };
      fetchDatalistAdsImage();
    }, []);

    let getItemLayoutAds = (data, index) => ({
      length: width,
      offset: width * index,
      index: index
    });

    let handleScrollAdsFlatList = (event) => 
    {
      let scrollPosision = event.nativeEvent.contentOffset.x;
  
      // const index = scrollPosision / width;
      let index = Math.floor(scrollPosision / width);
      setActiveIndexAds(index);
    };
    
    let renderItemAds = ({item, index}) => {
      return(
        <TouchableOpacity 
                        style={styles.adsOption}
                        key={index}
                      >
                        <Image
                            style={styles.adsImage}
                            resizeMode='contain'
                            // source={item.image}
                            source={{uri:item.image}}
                        ></Image>
        </TouchableOpacity>
      );
    };

    useEffect(() => {
      let interval = setInterval(() => {
        if (listAdsImage.length > 0) {
          if (flatListAdsRef.current) {
            if (activeIndexAds === listAdsImage.length - 1) {
              flatListAdsRef.current.scrollToIndex({
                index: 0,
                animated: true,
              });
            } else {
              flatListAdsRef.current.scrollToIndex({
                index: activeIndexAds + 1,
                animated: true,
              });
            }
          }
        }
      }, 1000);
    
      return () => clearInterval(interval);
    }, [activeIndexAds, listAdsImage.length, flatListAdsRef.current]);

    // Ads Container
    let adsViewFlasList = () => {
      return(
        <SafeAreaView style={styles.adsContainer}>
                <SwiperFlatList
                  data={listAdsImage}
                  ref={flatListAdsRef}
                  getItemLayout={getItemLayoutAds}
                  keyExtractor={(item) => item.id}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  pagingEnabled
                  onScroll={handleScrollAdsFlatList}
                  renderItem={renderItemAds}
                  showPagination
                  paginationDefaultColor='#EBD4EB'
                  paginationActiveColor='#6F5F6F'
                /> 
          </SafeAreaView>
      );
    };
    // End ADS
    // F
    // Time Freeshipping
    let [Hour, setHour] = useState(24);
    let [Minute, setMinute] = useState(0);
    let [Second, setSecond] = useState(0);

    useEffect(() => {
      let timer = setInterval(() => {
        if (Hour === 0 && Minute === 0 && Second === 0) {
          clearInterval(timer); // Countdown is finished
        } else {
          if (Minute === 0 && Second === 0) {
            setHour(Hour - 1);
            setMinute(59);
            setSecond(59);
          } else if (Second === 0) {
            setMinute(Minute - 1);
            setSecond(59);
          } else {
            setSecond(Second - 1);
          }
        }
      }, 1000); // Update every second

      return () => clearInterval(timer); // Cleanup when component unmounts
    }, [Hour, Minute, Second]);
  // categoryProduct
  let [ListCategoryProduct, setListCategoryProduct] = useState([]);
    useEffect(() => {
      let fetchDataListCategoryProduct = async() => {
        try
        {
          let response = await axios.get('https://6556774984b36e3a431fcc54.mockapi.io/ListCategoryProduct');
          let data  = response.data;
          setListCategoryProduct(data);
        }
        catch (error)
        {
          console.log('error fetching data ListCategoryProduct: ', error);
        }
  
      };
      fetchDataListCategoryProduct();
    }, []);
    // FlashSaleProduct
    let [listFlashSaleProduct, setlistFlashSaleProduct] = useState([]);
      useEffect(() => {
        let fetchDatalistFlashSaleProduct = async() => {
          try
          {
            let response = await axios.get('https://6556774984b36e3a431fcc54.mockapi.io/listFlashSaleProduct');
            let data  = response.data;
            setlistFlashSaleProduct(data);
          }
          catch (error)
          {
            console.log('error fetching data ListCategoryProduct: ', error);
          }
    
        };
        fetchDatalistFlashSaleProduct();
      }, []);
    let renderFlashSaleProduct = () => {
      return(
        <View style={{width: width, height: 200, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                <ImageBackground
                  style={{width: '100%', height: '100%'}}
                  resizeMode='cover'
                  source={require('./Image/backgroundimg/flasBackground.png')}
                >
                  <View style={{width: '100%', flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                    <View style={{width: '55%', flexDirection: 'row'}}>
                      <Image
                        style={{}}
                        source={require('./Icon/flashIcon.png')}
                      ></Image>
                      <Text style={{color: '#fff', fontWeight: 'bold', paddingLeft: 10}}>Flash Sale</Text>
                    </View>
                    <View style={{width: '50%', flexDirection: 'row'}}>
                      <Text style={{color: '#fff', fontWeight: 'bold', paddingLeft: 10, paddingRight: 10}}>Ends in</Text>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.timeContainerr}>
                          <Text style={styles.timeText}>{String(Hour).padStart(2, '0')}</Text>
                        </View>
                        <Text style={{color: '#fff'}}>:</Text>
                        <View style={styles.timeContainerr}>
                          <Text style={styles.timeText}>{String(Minute).padStart(2, '0')}</Text>
                        </View>
                        <Text style={{color: '#fff'}}>:</Text>
                        <View style={styles.timeContainerr}>
                          <Text style={styles.timeText}>{String(Second).padStart(2, '0')}</Text>
                        </View>
                      </View>
                      <Text style={{color: '#fff', fontWeight: 'bold', paddingLeft: 10,}}>{'>'}</Text>
                    </View>
                  </View>
                  <View style={{width: '100%'}}>
                    <ScrollView 
                      nestedScrollEnabled={true}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      {listFlashSaleProduct.map((product, index) => (
                        <TouchableOpacity 
                          style={{width: 110, height: 250, paddingLeft: 10}}
                          key={index}
                        >
                          <View style={{}}>
                            <ImageBackground
                              style={{width: 100, height: 120}}
                              resizeMode='cover'
                              // source={product.image}
                              source={{uri: product.image}}
                            >
                              <View style={{backgroundColor: '#FACF19', width: '45%', height: '35%', alignItems: 'center', padding: 5}}>
                                <Image
                                  style={{}}
                                  source={require('./Icon/flashIconBlack.png')}
                                ></Image>
                                <Text>{'-'}{product.discount}%</Text>
                              </View>
                              {index === listFlashSaleProduct.length - 1 ? (
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                  <Image
                                    style={{width: 40, height: 40}}
                                    source={require('./Icon/arrowLeftCircleIcon.png')}
                                  ></Image>
                                  <Text style={{}}>View More</Text>
                                </View>
                              ) : null}
                            </ImageBackground>
                          </View>
                          <Text style={{color: '#FA6338', fontSize: 15, fontWeight: 'bold'}}>$ {(parseFloat(product.price) - (parseFloat(product.price) * (parseInt(product.discount)/100))).toFixed(2)}</Text>
                          <Text style={{color: '#959595', fontSize: 13, fontWeight: '500', textDecorationLine: 'line-through'}}>$ {product.price}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </ImageBackground>
              </View>
      );
    };
    // End FlashSaleProduct

    let renderItemCategoryProductList = ({item, index}) => {
      return(
        <View 
          style={{width: width, justifyContent: 'center', alignItems: 'center'}}
        >
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15,}}>
            {item.list.map((list) => (
                <TouchableOpacity
                style={{width: 100, height: 100, justifyContent: 'center', alignItems: 'center'}}
                key={list.id}
              >
                <Image
                  style={{width: '100%', height: '100%'}}
                  resizeMode='contain'
                  // source={list.image}
                  source={{uri: list.image}}
                ></Image>
                <Text style={styles.text}>{list.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', minHeight: 120}}>
            {item.list1.map((list) => (
                <TouchableOpacity
                style={{width: 100, height: 100, justifyContent: 'center', alignItems: 'center'}}
                key={list.id}
              >
                <Image
                  style={{width: '100%', height: '100%'}}
                  resizeMode='contain'
                  // source={list.image}
                  source={{uri: list.image}}
                ></Image>
                <Text style={styles.text}>{list.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    };

    let [activeIndexdotCategoryPRD, setactiveIndexdotCategoryPRD] = useState(0);

    let handleScrollCategoryPRD = (event) => {
      let scrollPosision = event.nativeEvent.contentOffset.x;
      let index = scrollPosision / width;

      setactiveIndexdotCategoryPRD(index);
      // console(index);
    };

    let renderDotCategoryProduct = () => {
      return ListCategoryProduct.map((dot, index) => {
        if (activeIndexdotCategoryPRD === index)
        {
          return(
            <View style={{width: '5%', height: 3, flexDirection: 'row', backgroundColor: '#000000',}}>

            </View>
          )
        }
        else
        {
          return(
            <View style={{width: '5%', height: 3, flexDirection: 'row', backgroundColor: '#E5E5E5',}}>
            </View>
          )
        }
      });
    };
  // productView
  let [listProductHome, setlistProductHome] = useState([]);
  
  useEffect(() => {
    let fetchDatalistProductHome = async() => {
      try
      {
        let response = await axios.get('https://655694ab84b36e3a431feda4.mockapi.io/listProductHome');
        let data  = response.data;
        setlistProductHome(data);
      }
      catch (error)
      {
        console.log('error fetching data ListCategoryProduct: ', error);
      }

    };
    fetchDatalistProductHome();
  }, []);

  let renderProductRows = () => (
    <View style={{ width: '100%', flexDirection: 'row', backgroundColor: '#F6F6F6', marginLeft: 5}}>
      <View style={{ width: '50%', minheight: 460 }}>
        {listProductHome.map((product, index) => {
          if (index % 2 === 0) {
            return (
              <TouchableOpacity 
                key={product.id} 
                style={styles.leftProductBtn}
              >
                <ImageBackground 
                  // source={product.image} 
                  source={{uri: product.image}}
                  resizeMode='cover'
                  style={styles.productImageLeft} 
                >
                  <View style={{backgroundColor: '#000000', marginTop: 5, width: '55%'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12, padding: 4}}>Marketplance</Text>
                  </View>
                </ImageBackground>
                <View style={{padding: 10, width: '100%'}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '60%', marginBottom: 4}}>
                    <Text style={{color: product.discount === "0" ? 'black' : '#FA6338', fontWeight: 'bold'}}>$ {(parseFloat(product.price) - (parseFloat(product.price) * (parseInt(product.discount)) / 100)).toFixed(2)}</Text>
                    {product.discount !== "0" && (
                      <View style={{borderWidth: 1, borderColor: '#FA6338'}}>
                        <Text style={{color: '#FA6338', textAlign: 'center'}}>-{product.discount}%</Text>
                      </View>
                    )}
                  </View>
                  <Text style={{color: '#767676'}} numberOfLines={1} ellipsizeMode="tail">
                    {product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
          return null;
        })}
      </View>
      <View style={{ width: '50%', minheight: 460}}>
        {listProductHome.map((product, index) => {
          if (index % 2 === 1) {
            return (
              <TouchableOpacity key={product.id} style={styles.rightProductBtn}>
                <ImageBackground 
                  // source={product.image} 
                  source={{uri: product.image}}
                  resizeMode='cover'
                  style={styles.productImageRight} 
                >
                  <View style={{backgroundColor: '#000000', marginTop: 5, width: '55%'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12, padding: 4}}>Marketplance</Text>
                  </View>
                </ImageBackground>
                <View style={{padding: 10, width: '100%'}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '60%', marginBottom: 4}}>
                    <Text style={{color: product.discount === "0" ? 'black' : '#FA6338', fontWeight: 'bold'}}>$ {(parseFloat(product.price) - (parseFloat(product.price) * (parseInt(product.discount)) / 100)).toFixed(2)}</Text>
                    {product.discount !== "0" && (
                      <View style={{borderWidth: 1, borderColor: '#FA6338'}}>
                        <Text style={{color: '#FA6338', textAlign: 'center'}}>-{product.discount}%</Text>
                      </View>
                    )}
                  </View>
                  <Text style={{color: '#767676'}} numberOfLines={1} ellipsizeMode="tail">
                    {product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
          return null;
        })}
      </View>
    </View>
  );

    return <View style={[styles.pages]} >
      <ScrollView
        style={{minHeight: 500}}
      >
        {/* AdsView */}
        {adsViewFlasList()}
        {/* FreeShipngContainer */}
        <View style={{width: '94%', justifyContent: 'center', alignItems: 'center', marginLeft: '2%', marginTop: '3%'}}>
              <View style={styles.FreeSPContainer}>
                <TouchableOpacity
                  style={styles.FreeShipngBtn}
                >
                  <View style={{padding: 12,}}>
                    <Text style={styles.FreeSPText1}>Free Shipping</Text>
                    <View style={styles.FreeSPContainer2}>
                      <Text style={styles.FreeSPText2}>Ends in</Text>
                      <View style={styles.timeFreeSPContainer}>
                        <View style={styles.timeContainerr}>
                          <Text style={styles.timeText}>{String(Hour).padStart(2, '0')}</Text>
                        </View>
                        <Text style={{fontWeight: 'bold'}}>:</Text>
                        <View style={styles.timeContainerr}>
                          <Text style={styles.timeText}>{String(Minute).padStart(2, '0')}</Text>
                        </View>
                        <Text style={{fontWeight: 'bold'}}>:</Text>
                        <View style={styles.timeContainerr}>
                          <Text style={styles.timeText}>{String(Second).padStart(2, '0')}</Text>
                        </View>
                      </View>
                      <Image
                        style={styles.FreeSPIcon}
                        resizeMode='contain'
                        source={require('./Icon/truckCartIcon.png')}
                      ></Image>
                    </View>
                  </View>
                </TouchableOpacity>
                {/* 2 */}
                <TouchableOpacity
                  style={styles.FreeShipngBtn}
                >
                  <View style={{padding: 12,}}>
                    <Text style={styles.FreeSPText1}>Return Policy</Text>
                    <View style={styles.FreeSPContainer2}>
                      <Text style={[styles.FreeSPText2]}>Free returns within 35 d</Text>
                      <Image
                        style={styles.FreeSPIcon}
                        resizeMode='contain'
                        source={require('./Icon/BackIcon.png')}
                      ></Image>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {/* SalesContainer */}
            <View style={{width: '100%', height: 60}}>
              <TouchableOpacity
                style={styles.salesBtn}
              >
                <Image
                  style={{width: '100%', height: '100%'}}
                  resizeMode='contain'
                  source={require('./Image/sale.png')}
                ></Image>
              </TouchableOpacity>
            </View>
        {/* End FressShing */}
        {/* CategoryProduct */}
        <View style={styles.CategoryProduct}>
              <View style={styles.listCategoryPRD}>
                <FlatList
                  data={ListCategoryProduct}
                  ref={flatListCategoryRef}
                  renderItem={renderItemCategoryProductList}
                  keyExtractor={(item) => item.id}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  pagingEnabled
                  onScroll={handleScrollCategoryPRD}
                />
                <View style={{flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center'}}>
                  {renderDotCategoryProduct()}
                </View>
              </View>
            </View>
        {/* ENd CategoryProduct */}
        {/* Flash Sale Product */}
        {renderFlashSaleProduct()}
        {/* End sale Flash product */}
        {/* product View */}
        <View style={{width: width, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 80}}>
              <Image
                style={{}}
                resizeMode='contain'
                source={require('./Icon/IconPPh.png')}
              ></Image>
              <Text style={{fontSize: 14, fontWeight: '600', padding: 30}}>Recommend</Text>
              <Image
                style={{}}
                resizeMode='contain'
                source={require('./Icon/IconPPh.png')}
              ></Image>
            </View>
            {renderProductRows()}
            {/*  */}
      </ScrollView>
    </View>;
  };

  const PageWomen = ({}) => {
    let flatListAdsRef  = useRef();

    let [activeIndexAds, setActiveIndexAds] = useState(0);

    // ADS Data List
    let [listAdsImage, setListAdsImage] = useState([]);
    useEffect(() => {
      let fetchDatalistAdsImage = async() => {
        try
        {
          let response = await axios.get('https://65577f1cbd4bcef8b612c1ab.mockapi.io/Ads');
          let data  = response.data;
          setListAdsImage(data);
        }
        catch (error)
        {
          console.log('error fetching data category1: ', error);
        }
  
      };
      fetchDatalistAdsImage();
    }, []);

    let getItemLayoutAds = (data, index) => ({
      length: width,
      offset: width * index,
      index: index
    });

    let handleScrollAdsFlatList = (event) => 
    {
      let scrollPosision = event.nativeEvent.contentOffset.x;
  
      // const index = scrollPosision / width;
      let index = Math.floor(scrollPosision / width);
      setActiveIndexAds(index);
    };
    
    let renderItemAds = ({item, index}) => {
      return(
        <TouchableOpacity 
                        style={styles.adsOption}
                        key={index}
                      >
                        <Image
                            style={styles.adsImage}
                            resizeMode='contain'
                            // source={item.image}
                            source={{uri:item.image}}
                        ></Image>
        </TouchableOpacity>
      );
    };

    useEffect(() => {
      let interval = setInterval(() => {
        if (listAdsImage.length > 0) {
          if (flatListAdsRef.current) {
            if (activeIndexAds === listAdsImage.length - 1) {
              flatListAdsRef.current.scrollToIndex({
                index: 0,
                animated: true,
              });
            } else {
              flatListAdsRef.current.scrollToIndex({
                index: activeIndexAds + 1,
                animated: true,
              });
            }
          }
        }
      }, 1000);
    
      return () => clearInterval(interval);
    }, [activeIndexAds, listAdsImage.length, flatListAdsRef.current]);

    // Ads Container
    let adsViewFlasList = () => {
      return(
        <SafeAreaView style={styles.adsContainer}>
                <SwiperFlatList
                  data={listAdsImage}
                  ref={flatListAdsRef}
                  getItemLayout={getItemLayoutAds}
                  keyExtractor={(item) => item.id}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  pagingEnabled
                  onScroll={handleScrollAdsFlatList}
                  renderItem={renderItemAds}
                  showPagination
                  paginationDefaultColor='#EBD4EB'
                  paginationActiveColor='#6F5F6F'
                /> 
          </SafeAreaView>
      );
    };
    // End ADS
    // women - costume type
    let [listCostumeWomenType, setListCostumeWomenType] = useState([]);
    useEffect(() => {
      let fetchDatalistCostumeWomenType = async() => {
        try
        {
          let response = await axios.get('https://65577f1cbd4bcef8b612c1ab.mockapi.io/listCostumeWomenType');
          let data  = response.data;
          setListCostumeWomenType(data);
        }
        catch (error)
        {
          console.log('error fetching data category1: ', error);
        }
  
      };
      fetchDatalistCostumeWomenType();
    }, []);

    let renderlistCostumeWomenType = () => 
    {
      return(
        <View style={{width: width, height: 125, marginTop: 10}}>
          <ScrollView
            style={{}}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {listCostumeWomenType.map((data) => (
              <TouchableOpacity 
                style={{width: 100, height: '100%', padding: 3}}
                key={data.id}
              >
                <Image
                  style={{width: '100%', height: '100%'}}
                  resizeMode='contain'
                  source={{uri: data.image}}
                ></Image>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )
    };
    // categoryProduct
  let [ListCategoryProduct, setListCategoryProduct] = useState([]);
  useEffect(() => {
    let fetchDataListCategoryProduct = async() => {
      try
      {
        let response = await axios.get('https://655896efe93ca47020a97e05.mockapi.io/ListCategoryProduct');
        let data  = response.data;
        setListCategoryProduct(data);
      }
      catch (error)
      {
        console.log('error fetching data ListCategoryProduct: ', error);
      }

    };
    fetchDataListCategoryProduct();
  }, []);
  // renderItemCategoryProductList
  let renderItemCategoryProductList = ({item, index}) => {
    return(
      <View 
        style={{width: width, justifyContent: 'center', alignItems: 'center'}}
      >
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15,}}>
          {item.list.map((list) => (
              <TouchableOpacity
              style={{width: 100, height: 100, justifyContent: 'center', alignItems: 'center'}}
              key={list.id}
            >
              <Image
                style={{width: '100%', height: '100%'}}
                resizeMode='contain'
                // source={list.image}
                source={{uri: list.image}}
              ></Image>
              <Text style={styles.text}>{list.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', minHeight: 120}}>
          {item.list1.map((list) => (
              <TouchableOpacity
              style={{width: 100, height: 100, justifyContent: 'center', alignItems: 'center'}}
              key={list.id}
            >
              <Image
                style={{width: '100%', height: '100%'}}
                resizeMode='contain'
                // source={list.image}
                source={{uri: list.image}}
              ></Image>
              <Text style={{textAlign: 'center'}}>{list.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  let [activeIndexdotCategoryPRD, setactiveIndexdotCategoryPRD] = useState(0);

    let handleScrollCategoryPRD = (event) => {
      let scrollPosision = event.nativeEvent.contentOffset.x;
      let index = scrollPosision / width;

      setactiveIndexdotCategoryPRD(index);
      // console(index);
    };

    let renderDotCategoryProduct = () => {
      return ListCategoryProduct.map((dot, index) => {
        if (activeIndexdotCategoryPRD === index)
        {
          return(
            <View style={{width: '5%', height: 3, flexDirection: 'row', backgroundColor: '#000000',}}>

            </View>
          )
        }
        else
        {
          return(
            <View style={{width: '5%', height: 3, flexDirection: 'row', backgroundColor: '#E5E5E5',}}>
            </View>
          )
        }
      });
    };
    // 

    // Time Freeshipping
    let [Hour, setHour] = useState(24);
    let [Minute, setMinute] = useState(0);
    let [Second, setSecond] = useState(0);

    useEffect(() => {
      let timer = setInterval(() => {
        if (Hour === 0 && Minute === 0 && Second === 0) {
          clearInterval(timer); // Countdown is finished
        } else {
          if (Minute === 0 && Second === 0) {
            setHour(Hour - 1);
            setMinute(59);
            setSecond(59);
          } else if (Second === 0) {
            setMinute(Minute - 1);
            setSecond(59);
          } else {
            setSecond(Second - 1);
          }
        }
      }, 1000); // Update every second

      return () => clearInterval(timer); // Cleanup when component unmounts
    }, [Hour, Minute, Second]);

    // FlashSaleProduct
    let [listFlashSaleProduct, setlistFlashSaleProduct] = useState([]);
      useEffect(() => {
        let fetchDatalistFlashSaleProduct = async() => {
          try
          {
            let response = await axios.get('https://655896efe93ca47020a97e05.mockapi.io/listFlashSaleProduct');
            let data  = response.data;
            setlistFlashSaleProduct(data);
          }
          catch (error)
          {
            console.log('error fetching data ListCategoryProduct: ', error);
          }
    
        };
        fetchDatalistFlashSaleProduct();
      }, []);
    let renderFlashSaleProduct = () => {
      return(
        <View style={{width: width, height: 200, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                <ImageBackground
                  style={{width: '100%', height: '100%'}}
                  resizeMode='cover'
                  source={require('./Image/backgroundimg/FlashSaleProductBackground2.png')}
                >
                  <View style={{width: '100%', flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                    <View style={{width: '55%', flexDirection: 'row'}}>
                      <Image
                        style={{}}
                        source={require('./Icon/flashIcon.png')}
                      ></Image>
                      <Text style={{color: '#fff', fontWeight: 'bold', paddingLeft: 10}}>Flash Sale</Text>
                    </View>
                    <View style={{width: '50%', flexDirection: 'row'}}>
                      <Text style={{color: '#fff', fontWeight: 'bold', paddingLeft: 10, paddingRight: 10}}>Ends in</Text>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.timeContainerr}>
                          <Text style={styles.timeText}>{String(Hour).padStart(2, '0')}</Text>
                        </View>
                        <Text style={{color: '#fff'}}>:</Text>
                        <View style={styles.timeContainerr}>
                          <Text style={styles.timeText}>{String(Minute).padStart(2, '0')}</Text>
                        </View>
                        <Text style={{color: '#fff'}}>:</Text>
                        <View style={styles.timeContainerr}>
                          <Text style={styles.timeText}>{String(Second).padStart(2, '0')}</Text>
                        </View>
                      </View>
                      <Text style={{color: '#fff', fontWeight: 'bold', paddingLeft: 10,}}>{'>'}</Text>
                    </View>
                  </View>
                  <View style={{width: '100%'}}>
                    <ScrollView 
                      nestedScrollEnabled={true}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      {listFlashSaleProduct.map((product, index) => (
                        <TouchableOpacity 
                          style={{width: 110, height: 250, paddingLeft: 10}}
                          key={index}
                        >
                          <View style={{}}>
                            <ImageBackground
                              style={{width: 100, height: 120}}
                              resizeMode='cover'
                              // source={product.image}
                              source={{uri: product.image}}
                            >
                              <View style={{backgroundColor: '#FACF19', width: '45%', height: '35%', alignItems: 'center', padding: 5}}>
                                <Image
                                  style={{}}
                                  source={require('./Icon/flashIconBlack.png')}
                                ></Image>
                                <Text>{'-'}{product.discount}%</Text>
                              </View>
                              {index === listFlashSaleProduct.length - 1 ? (
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                  <Image
                                    style={{width: 40, height: 40}}
                                    source={require('./Icon/arrowLeftCircleIcon.png')}
                                  ></Image>
                                  <Text style={{}}>View More</Text>
                                </View>
                              ) : null}
                            </ImageBackground>
                          </View>
                          <Text style={{color: '#FA6338', fontSize: 15, fontWeight: 'bold'}}>$ {(parseFloat(product.price) - (parseFloat(product.price) * (parseInt(product.discount)/100))).toFixed(2)}</Text>
                          <Text style={{color: '#959595', fontSize: 13, fontWeight: '500', textDecorationLine: 'line-through'}}>$ {product.price}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </ImageBackground>
              </View>
      );
    };
    // End FlashSaleProduct
    // productView
  let [listProductHome, setlistProductHome] = useState([]);
  
  useEffect(() => {
    let fetchDatalistProductHome = async() => {
      try
      {
        let response = await axios.get('https://6558c74ae93ca47020a9b57e.mockapi.io/WomenProductView');
        let data  = response.data;
        setlistProductHome(data);
      }
      catch (error)
      {
        console.log('error fetching data ListCategoryProduct: ', error);
      }

    };
    fetchDatalistProductHome();
  }, []);

  let renderProductRows = () => (
    <View style={{ width: '100%', flexDirection: 'row', backgroundColor: '#F6F6F6', marginLeft: 5}}>
      <View style={{ width: '50%', minheight: 460 }}>
        {listProductHome.map((product, index) => {
          if (index % 2 === 0) {
            return (
              <TouchableOpacity 
                key={product.id} 
                style={styles.leftProductBtn}
              >
                <ImageBackground 
                  // source={product.image} 
                  source={{uri: product.image}}
                  resizeMode='cover'
                  style={styles.productImageLeft} 
                >
                  <View style={{backgroundColor: '#000000', marginTop: 5, width: '55%'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12, padding: 4}}>Marketplance</Text>
                  </View>
                </ImageBackground>
                <View style={{padding: 10, width: '100%'}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '60%', marginBottom: 4}}>
                    <Text style={{color: product.discount === "0" ? 'black' : '#FA6338', fontWeight: 'bold'}}>$ {(parseFloat(product.price) - (parseFloat(product.price) * (parseInt(product.discount)) / 100)).toFixed(2)}</Text>
                    {product.discount !== "0" && (
                      <View style={{borderWidth: 1, borderColor: '#FA6338'}}>
                        <Text style={{color: '#FA6338', textAlign: 'center'}}>-{product.discount}%</Text>
                      </View>
                    )}
                  </View>
                  <Text style={{color: '#767676'}} numberOfLines={1} ellipsizeMode="tail">
                    {product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
          return null;
        })}
      </View>
      <View style={{ width: '50%', minheight: 460}}>
        {listProductHome.map((product, index) => {
          if (index % 2 === 1) {
            return (
              <TouchableOpacity key={product.id} style={styles.rightProductBtn}>
                <ImageBackground 
                  // source={product.image} 
                  source={{uri: product.image}}
                  resizeMode='cover'
                  style={styles.productImageRight} 
                >
                  <View style={{backgroundColor: '#000000', marginTop: 5, width: '55%'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12, padding: 4}}>Marketplance</Text>
                  </View>
                </ImageBackground>
                <View style={{padding: 10, width: '100%'}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '60%', marginBottom: 4}}>
                    <Text style={{color: product.discount === "0" ? 'black' : '#FA6338', fontWeight: 'bold'}}>$ {(parseFloat(product.price) - (parseFloat(product.price) * (parseInt(product.discount)) / 100)).toFixed(2)}</Text>
                    {product.discount !== "0" && (
                      <View style={{borderWidth: 1, borderColor: '#FA6338'}}>
                        <Text style={{color: '#FA6338', textAlign: 'center'}}>-{product.discount}%</Text>
                      </View>
                    )}
                  </View>
                  <Text style={{color: '#767676'}} numberOfLines={1} ellipsizeMode="tail">
                    {product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
          return null;
        })}
      </View>
    </View>
  );

    return <View style={[styles.pages]} >
      <ScrollView
        style={{minHeight: 500}}
      >
        {/* AdsView */}
        {adsViewFlasList()}
        {/* renderlistCostumeWomenType */}
        {renderlistCostumeWomenType()}
        {/* End */}
        {/* CategoryProduct */}
        <View style={styles.CategoryProduct}>
              <View style={styles.listCategoryPRD}>
                <FlatList
                  nestedScrollEnabled={true}
                  data={ListCategoryProduct}
                  ref={flatListCategoryRef}
                  renderItem={renderItemCategoryProductList}
                  keyExtractor={(item) => item.id}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  pagingEnabled
                  onScroll={handleScrollCategoryPRD}
                />
                <View style={{flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center'}}>
                  {renderDotCategoryProduct()}
                </View>
              </View>
            </View>
        {/* ENd CategoryProduct */}
        {/* Flash Sale Product */}
        {renderFlashSaleProduct()}
        {/* End sale Flash product */}
        {/* product View */}
        <View style={{width: width, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 80}}>
              <Image
                style={{}}
                resizeMode='contain'
                source={require('./Icon/IconPPh.png')}
              ></Image>
              <Text style={{fontSize: 14, fontWeight: '600', padding: 30}}>Recommend</Text>
              <Image
                style={{}}
                resizeMode='contain'
                source={require('./Icon/IconPPh.png')}
              ></Image>
            </View>
            {renderProductRows()}
            {/*  */}
      </ScrollView>
    </View>;
  };

  const PageCurve = ({ backgroundColor, data }) => {
    let flatListAdsRef  = useRef();

    let [activeIndexAds, setActiveIndexAds] = useState(0);

    // ADS Data List
    let [listAdsImage, setListAdsImage] = useState([]);
    useEffect(() => {
      let fetchDatalistAdsImage = async() => {
        try
        {
          let response = await axios.get('https://655bb2dcab37729791a97eae.mockapi.io/listAdsImage');
          let data  = response.data;
          setListAdsImage(data);
        }
        catch (error)
        {
          console.log('error fetching data category1: ', error);
        }
  
      };
      fetchDatalistAdsImage();
    }, []);

    let getItemLayoutAds = (data, index) => ({
      length: width,
      offset: width * index,
      index: index
    });

    let handleScrollAdsFlatList = (event) => 
    {
      let scrollPosision = event.nativeEvent.contentOffset.x;
  
      // const index = scrollPosision / width;
      let index = Math.floor(scrollPosision / width);
      setActiveIndexAds(index);
    };
    
    let renderItemAds = ({item, index}) => {
      return(
        <TouchableOpacity 
                        style={styles.adsOption}
                        key={index}
                      >
                        <Image
                            style={styles.adsImage}
                            resizeMode='contain'
                            // source={item.image}
                            source={{uri:item.image}}
                        ></Image>
        </TouchableOpacity>
      );
    };

    useEffect(() => {
      let interval = setInterval(() => {
        if (listAdsImage.length > 0) {
          if (flatListAdsRef.current) {
            if (activeIndexAds === listAdsImage.length - 1) {
              flatListAdsRef.current.scrollToIndex({
                index: 0,
                animated: true,
              });
            } else {
              flatListAdsRef.current.scrollToIndex({
                index: activeIndexAds + 1,
                animated: true,
              });
            }
          }
        }
      }, 1000);
    
      return () => clearInterval(interval);
    }, [activeIndexAds, listAdsImage.length, flatListAdsRef.current]);

    // Ads Container
    let adsViewFlasList = () => {
      return(
        <SafeAreaView style={styles.adsContainer}>
                <SwiperFlatList
                  data={listAdsImage}
                  ref={flatListAdsRef}
                  getItemLayout={getItemLayoutAds}
                  keyExtractor={(item) => item.id}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  pagingEnabled
                  onScroll={handleScrollAdsFlatList}
                  renderItem={renderItemAds}
                  showPagination
                  paginationDefaultColor='#EBD4EB'
                  paginationActiveColor='#6F5F6F'
                /> 
          </SafeAreaView>
      );
    };
    // End ADS
    // women - costume type
    let [listCostumeWomenType, setListCostumeWomenType] = useState([]);
    useEffect(() => {
      let fetchDatalistCostumeWomenType = async() => {
        try
        {
          let response = await axios.get('https://655bb2dcab37729791a97eae.mockapi.io/listCostumeCurveType');
          let data  = response.data;
          setListCostumeWomenType(data);
        }
        catch (error)
        {
          console.log('error fetching data category1: ', error);
        }
  
      };
      fetchDatalistCostumeWomenType();
    }, []);

    let renderlistCostumeWomenType = () => 
    {
      return(
        <View style={{width: width, height: 125, marginTop: 10}}>
          <ScrollView
            style={{}}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {listCostumeWomenType.map((data) => (
              <TouchableOpacity 
                style={{width: 100, height: '100%', padding: 3}}
                key={data.id}
              >
                <Image
                  style={{width: '100%', height: '100%'}}
                  resizeMode='contain'
                  source={{uri: data.image}}
                ></Image>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )
    };
    // categoryProduct
  let [ListCategoryProduct, setListCategoryProduct] = useState([]);
  useEffect(() => {
    let fetchDataListCategoryProduct = async() => {
      try
      {
        let response = await axios.get('https://655bb6caab37729791a982b1.mockapi.io/ListCategoryProduct');
        let data  = response.data;
        setListCategoryProduct(data);
      }
      catch (error)
      {
        console.log('error fetching data ListCategoryProduct: ', error);
      }

    };
    fetchDataListCategoryProduct();
  }, []);
  // renderItemCategoryProductList
  let renderItemCategoryProductList = ({item, index}) => {
    return(
      <View 
        style={{width: width, justifyContent: 'center', alignItems: 'center'}}
      >
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15,}}>
          {item.list.map((list) => (
              <TouchableOpacity
              style={{width: 100, height: 100, justifyContent: 'center', alignItems: 'center'}}
              key={list.id}
            >
              <Image
                style={{width: '100%', height: '100%'}}
                resizeMode='contain'
                // source={list.image}
                source={{uri: list.image}}
              ></Image>
              <Text style={styles.text}>{list.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', minHeight: 120}}>
          {item.list1.map((list) => (
              <TouchableOpacity
              style={{width: 100, height: 100, justifyContent: 'center', alignItems: 'center'}}
              key={list.id}
            >
              <Image
                style={{width: '100%', height: '100%'}}
                resizeMode='contain'
                // source={list.image}
                source={{uri: list.image}}
              ></Image>
              <Text style={{textAlign: 'center'}}>{list.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  let [activeIndexdotCategoryPRD, setactiveIndexdotCategoryPRD] = useState(0);

    let handleScrollCategoryPRD = (event) => {
      let scrollPosision = event.nativeEvent.contentOffset.x;
      let index = scrollPosision / width;

      setactiveIndexdotCategoryPRD(index);
      // console(index);
    };

    let renderDotCategoryProduct = () => {
      return ListCategoryProduct.map((dot, index) => {
        if (activeIndexdotCategoryPRD === index)
        {
          return(
            <View style={{width: '5%', height: 3, flexDirection: 'row', backgroundColor: '#000000',}}>

            </View>
          )
        }
        else
        {
          return(
            <View style={{width: '5%', height: 3, flexDirection: 'row', backgroundColor: '#E5E5E5',}}>
            </View>
          )
        }
      });
    };
    // 

    // Time Freeshipping
    let [Hour, setHour] = useState(24);
    let [Minute, setMinute] = useState(0);
    let [Second, setSecond] = useState(0);

    useEffect(() => {
      let timer = setInterval(() => {
        if (Hour === 0 && Minute === 0 && Second === 0) {
          clearInterval(timer); // Countdown is finished
        } else {
          if (Minute === 0 && Second === 0) {
            setHour(Hour - 1);
            setMinute(59);
            setSecond(59);
          } else if (Second === 0) {
            setMinute(Minute - 1);
            setSecond(59);
          } else {
            setSecond(Second - 1);
          }
        }
      }, 1000); // Update every second

      return () => clearInterval(timer); // Cleanup when component unmounts
    }, [Hour, Minute, Second]);

    // FlashSaleProduct
    let [listFlashSaleProduct, setlistFlashSaleProduct] = useState([]);
      useEffect(() => {
        let fetchDatalistFlashSaleProduct = async() => {
          try
          {
            let response = await axios.get('https://655bb6caab37729791a982b1.mockapi.io/listFlashSaleProduct');
            let data  = response.data;
            setlistFlashSaleProduct(data);
          }
          catch (error)
          {
            console.log('error fetching data ListCategoryProduct: ', error);
          }
    
        };
        fetchDatalistFlashSaleProduct();
      }, []);
    let renderFlashSaleProduct = () => {
      return(
        <View style={{width: width, height: 200, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                <ImageBackground
                  style={{width: '100%', height: '100%'}}
                  resizeMode='cover'
                  source={require('./Image/backgroundimg/FlashSaleProductBackground2.png')}
                >
                  <View style={{width: '100%', flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                    <View style={{width: '55%', flexDirection: 'row'}}>
                      <Image
                        style={{}}
                        source={require('./Icon/flashIcon.png')}
                      ></Image>
                      <Text style={{color: '#fff', fontWeight: 'bold', paddingLeft: 10}}>Flash Sale</Text>
                    </View>
                    <View style={{width: '50%', flexDirection: 'row'}}>
                      <Text style={{color: '#fff', fontWeight: 'bold', paddingLeft: 10, paddingRight: 10}}>Ends in</Text>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.timeContainerr}>
                          <Text style={styles.timeText}>{String(Hour).padStart(2, '0')}</Text>
                        </View>
                        <Text style={{color: '#fff'}}>:</Text>
                        <View style={styles.timeContainerr}>
                          <Text style={styles.timeText}>{String(Minute).padStart(2, '0')}</Text>
                        </View>
                        <Text style={{color: '#fff'}}>:</Text>
                        <View style={styles.timeContainerr}>
                          <Text style={styles.timeText}>{String(Second).padStart(2, '0')}</Text>
                        </View>
                      </View>
                      <Text style={{color: '#fff', fontWeight: 'bold', paddingLeft: 10,}}>{'>'}</Text>
                    </View>
                  </View>
                  <View style={{width: '100%'}}>
                    <ScrollView 
                      nestedScrollEnabled={true}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      {listFlashSaleProduct.slice(0, 8).map((product, index) => (
                        <TouchableOpacity 
                          style={{width: 110, height: 250, paddingLeft: 10}}
                          key={index}
                        >
                          <View style={{}}>
                            <ImageBackground
                              style={{width: 100, height: 120}}
                              resizeMode='cover'
                              // source={product.image}
                              source={{uri: product.image}}
                            >
                              <View style={{backgroundColor: '#FACF19', width: '45%', height: '35%', alignItems: 'center', padding: 5}}>
                                <Image
                                  style={{}}
                                  source={require('./Icon/flashIconBlack.png')}
                                ></Image>
                                <Text>{'-'}{product.discount}%</Text>
                              </View>
                              {index === listFlashSaleProduct.length - 1 ? (
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                  <Image
                                    style={{width: 40, height: 40}}
                                    source={require('./Icon/arrowLeftCircleIcon.png')}
                                  ></Image>
                                  <Text style={{}}>View More</Text>
                                </View>
                              ) : null}
                            </ImageBackground>
                          </View>
                          <Text style={{color: '#FA6338', fontSize: 15, fontWeight: 'bold'}}>$ {(parseFloat(product.price) - (parseFloat(product.price) * (parseInt(product.discount)/100))).toFixed(2)}</Text>
                          <Text style={{color: '#959595', fontSize: 13, fontWeight: '500', textDecorationLine: 'line-through'}}>$ {product.price}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </ImageBackground>
              </View>
      );
    };
    // End FlashSaleProduct
    // productView
  let [listProductHome, setlistProductHome] = useState([]);
  
  useEffect(() => {
    let fetchDatalistProductHome = async() => {
      try
      {
        let response = await axios.get('https://655bc0f7ab37729791a98ca6.mockapi.io/WomenProductView');
        let data  = response.data;
        setlistProductHome(data);
      }
      catch (error)
      {
        console.log('error fetching data ListCategoryProduct: ', error);
      }

    };
    fetchDatalistProductHome();
  }, []);

  let renderProductRows = () => (
    <View style={{ width: '100%', flexDirection: 'row', backgroundColor: '#F6F6F6', marginLeft: 5}}>
      <View style={{ width: '50%', minheight: 460 }}>
        {listProductHome.map((product, index) => {
          if (index % 2 === 0) {
            return (
              <TouchableOpacity 
                key={product.id} 
                style={styles.leftProductBtn}
              >
                <ImageBackground 
                  // source={product.image} 
                  source={{uri: product.image}}
                  resizeMode='cover'
                  style={styles.productImageLeft} 
                >
                  <View style={{backgroundColor: '#000000', marginTop: 5, width: '55%'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12, padding: 4}}>Marketplance</Text>
                  </View>
                </ImageBackground>
                <View style={{padding: 10, width: '100%'}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '60%', marginBottom: 4}}>
                    <Text style={{color: product.discount === "0" ? 'black' : '#FA6338', fontWeight: 'bold'}}>$ {(parseFloat(product.price) - (parseFloat(product.price) * (parseInt(product.discount)) / 100)).toFixed(2)}</Text>
                    {product.discount !== "0" && (
                      <View style={{borderWidth: 1, borderColor: '#FA6338'}}>
                        <Text style={{color: '#FA6338', textAlign: 'center'}}>-{product.discount}%</Text>
                      </View>
                    )}
                  </View>
                  <Text style={{color: '#767676'}} numberOfLines={1} ellipsizeMode="tail">
                    {product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
          return null;
        })}
      </View>
      <View style={{ width: '50%', minheight: 460}}>
        {listProductHome.map((product, index) => {
          if (index % 2 === 1) {
            return (
              <TouchableOpacity key={product.id} style={styles.rightProductBtn}>
                <ImageBackground 
                  // source={product.image} 
                  source={{uri: product.image}}
                  resizeMode='cover'
                  style={styles.productImageRight} 
                >
                  <View style={{backgroundColor: '#000000', marginTop: 5, width: '55%'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12, padding: 4}}>Marketplance</Text>
                  </View>
                </ImageBackground>
                <View style={{padding: 10, width: '100%'}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '60%', marginBottom: 4}}>
                    <Text style={{color: product.discount === "0" ? 'black' : '#FA6338', fontWeight: 'bold'}}>$ {(parseFloat(product.price) - (parseFloat(product.price) * (parseInt(product.discount)) / 100)).toFixed(2)}</Text>
                    {product.discount !== "0" && (
                      <View style={{borderWidth: 1, borderColor: '#FA6338'}}>
                        <Text style={{color: '#FA6338', textAlign: 'center'}}>-{product.discount}%</Text>
                      </View>
                    )}
                  </View>
                  <Text style={{color: '#767676'}} numberOfLines={1} ellipsizeMode="tail">
                    {product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
          return null;
        })}
      </View>
    </View>
  );

    return <View style={[styles.pages]} >
      <ScrollView
        style={{minHeight: 500}}
      >
        {/* AdsView */}
        {adsViewFlasList()}
        {/* renderlistCostumeWomenType */}
        {renderlistCostumeWomenType()}
        {/* End */}
        {/* CategoryProduct */}
        <View style={styles.CategoryProduct}>
              <View style={styles.listCategoryPRD}>
                <FlatList
                  nestedScrollEnabled={true}
                  data={ListCategoryProduct}
                  ref={flatListCategoryRef}
                  renderItem={renderItemCategoryProductList}
                  keyExtractor={(item) => item.id}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  pagingEnabled
                  onScroll={handleScrollCategoryPRD}
                />
                <View style={{flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center'}}>
                  {renderDotCategoryProduct()}
                </View>
              </View>
            </View>
        {/* ENd CategoryProduct */}
        {/* Flash Sale Product */}
        {renderFlashSaleProduct()}
        {/* End sale Flash product */}
        {/* product View */}
        <View style={{width: width, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 80}}>
              <Image
                style={{}}
                resizeMode='contain'
                source={require('./Icon/IconPPh.png')}
              ></Image>
              <Text style={{fontSize: 14, fontWeight: '600', padding: 30}}>Recommend</Text>
              <Image
                style={{}}
                resizeMode='contain'
                source={require('./Icon/IconPPh.png')}
              ></Image>
            </View>
            {renderProductRows()}
            {/*  */}
      </ScrollView>
    </View>;
  };

  const PageKinds = ({ backgroundColor, data }) => {
    return (
      <View style={[styles.pages, { backgroundColor }]}>
        <View style={{ backgroundColor: 'yellow', width: 100, height: 100 }}>
          <Text>ID: {data.id}</Text>
          {/* Thêm các trường khác của data */}
        </View>
      </View>
    );
  };
  

  const renderPage = () => {
    return(
      <ScrollView
        ref={scrollPageref}
        horizontal
        pagingEnabled
        style={{flex: 1}}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handlePageScrollEnd}
      >
        {listCategory1.map((data, index) => 
        {
           if (data.name === "All")
           {
            return (
              <PageAll
                key={data.id}
                data={data}
              />
            );
           }
           else if (data.name === "Women")
           {
            return(
              <PageWomen
              key={data.id}
              backgroundColor={index % 2 === 0 ? 'red' : 'blue'}
              data={data}
            />
            )
           }
           else if (data.name === "Curve")
           {
            return(
              <PageCurve
              key={data.id}
              backgroundColor={index % 2 === 0 ? 'red' : 'blue'}
              data={data}
            />
            )
           }
           else (data.name === "Curve")
           {
            return(
              <PageKinds
              key={data.id}
              backgroundColor={index % 2 === 0 ? 'red' : 'blue'}
              data={data}
            />
            )
           }
        })}
      </ScrollView>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerCN1}>
          <TouchableOpacity
            style={styles.messageBtn}
          >
            <Image
              style={styles.headerIcon}
              resizeMode='contain'
              source={require('./Icon/envelopIcon.png')}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.calendarBtn}
          >
            <Image
              style={styles.headerIcon}
              resizeMode='contain'
              source={require('./Icon/calendarIcon.png')}
            ></Image>
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Image
              style={styles.SearchIcon}
              resizeMode='contain'
              source={require('./Icon/SearchIcon.png')}
            ></Image>
            <TextInput
              style={styles.inputSearch}
              placeholder='Jean '
              placeholderTextColor={'#777777'}
            ></TextInput>
          </View>
          <TouchableOpacity
            style={styles.HeartBtn}
            >
              <Icon
                style={[styles.headerIcon, {color: '#cccccc', fontSize: 20,}]}
                name='heart'
              ></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.CartBtn}
              onPress={() => navigation.push("accountScreen")}
            >
              <Image
                style={styles.headerIcon}
                resizeMode='contain'
                source={require('./Icon/cartIcon.png')}
              ></Image>
            </TouchableOpacity>
        </View>
        <View style={styles.navbarList}>
          <View style={styles.ListCateGoryContainer}>
            <ScrollView 
              ref={scrollCategoryRef}
              style={styles.scrollViewCategory1} 
              horizontal={true} 
              showsHorizontalScrollIndicator={false}
            >
            {listCategory1.map((category, index) => (
                <TouchableOpacity
                  style={styles.category1Btn}
                  key={category.id}
                  onPress={() => hanldePageButtonPress(index)}
                >
                  {/* <Text style={[styles.category1Text, category.active ? styles.category1TextActive : null]}>{category.name}</Text> */}
                  <Text style={[styles.category1Text, index === activeIndexPage ? styles.category1TextActive : null]}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={styles.menuBtn}
          >
            <Image
              style={styles.headerIcon}
              resizeMode='contain'
              source={require('./Icon/barsIcon.png')}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
      {/* End Header */}
      {/* Content */}
      <View style={styles.contentContainer}>
        {renderPage()}
      </View>
      {/* End Content */}
      {/* Footer */}
      <View style={styles.BottomMenu}>
        <TouchableOpacity
          style={styles.HomeFTBtn}
        >
          <Image
            style={styles.HomeIconFT}
            resizeMode='contain'
            source={require('./Icon/IconFooter/HomeActive.png')}
          ></Image>
          <Text>Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.HomeFTBtn}
        >
          <Image
            style={styles.HomeIconFT}
            resizeMode='contain'
            source={require('./Icon/IconFooter/categoryNoActive.png')}
          ></Image>
          <Text>Category</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.HomeFTBtn}
        >
          <Image
            style={styles.HomeIconFT}
            resizeMode='contain'
            source={require('./Icon/IconFooter/fashionNoActive.png')}
          ></Image>
          <Text>New</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.HomeFTBtn}
        >
          <Image
            style={styles.HomeIconFT}
            resizeMode='contain'
            source={require('./Icon/IconFooter/CartNoActive.png')}
          ></Image>
          <Text>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.HomeFTBtn}
        >
          <Image
            style={styles.HomeIconFT}
            resizeMode='contain'
            source={require('./Icon/IconFooter/UserNoActive.png')}
          ></Image>
          <Text>Me</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // header Style
  headerContainer:{
    width: '95%',
  },
  headerCN1:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  searchContainer:{
    flexDirection: 'row',
    width: '65%',
    backgroundColor: '#F2F2F2',
    height: 30,
    alignItems: 'center',
  },
  headerIcon:
  {
    width: 20,
    height: 20,
  },
  SearchIcon:{
    // opacity: '0.4',
    padding: 10,
    width: 18,
    height: 18,
    margin: 5,
  },
  inputSearch:{
    width: '100%',
  },

  navbarList: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ListCateGoryContainer:{
    borderRightWidth: 1,
    borderColor: '#E1E1E1',
    width: '84%',
  },
  scrollViewCategory1:{
    // minWidth: 100,
  },
  category1Btn:{
    
  },
  category1Text:{
    fontSize: 14,
    padding: 5,
    color: '#777777',
  },
  category1TextActive:{
    textDecorationLine: 'underline',
    // borderBottomWidth: 2,
    color: 'black',
    fontWeight: 'bold',
  },
  menuBtn:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
  // End headerStyle

  // Content Style
  contentContainer:{
    width: width,
    height: '80%',
  },
  pages:{
    width: width,
    height: '100%',
  },
  // ads
  adsContainer:{
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adsOption:{
    width: width,
    // width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adsImage:{
    // width: 176,
    width: width,
    height: '100%',
  },
  // timeFreeShipng
  FreeSPContainer:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  FreeShipngBtn:{
    backgroundColor: '#FAEFD8',
    borderRadius: 15,
    width: '49%',
  },
  FreeSPContainer2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeFreeSPContainer:{
    flexDirection: 'row',
  },
  FreeSPText1:{
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
    // padding: 10,
  },
  FreeSPText2:{
    fontWeight: '400',
    color: '#756F67',
    // paddingLeft: 10,
    // paddingBottom: 20,
    fontSize: 12,
    
  },
  timeContainerr:{
    backgroundColor: '#000000',
    borderRadius: 5,
    width: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText:{
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  FreeSPIcon:{
    width: 20,
    height: 20,
  },
  // Product View
  leftProductBtn: {
    backgroundColor: '#fff',
    width: '95%',
    height: 275,
    marginBottom: 6,
    alignItems: 'center',
  },
  rightProductBtn: {
    backgroundColor: '#fff',
    width: '95%',
    height: 335,
    marginBottom: 6,
  },
  productImageLeft: {
    width: '100%',
    // height: '88%',
    height: 215,
  },
  productImageRight:{
    width: '100%',
    // height: '88%',
    height: 275,
  },


  // Footer
  BottomMenu:{
    width: '100%',
    height: '8%',
    borderTopWidth: 1,
    borderColor: '#DADADA',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  HomeFTBtn:{
    width: 60,
    // height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HomeIconFT:{
    width: '65%',
    height: '40%',
  }
});
