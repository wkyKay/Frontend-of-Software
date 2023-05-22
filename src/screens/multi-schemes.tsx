import React from 'react';
import {
  ScrollView,
  Text,
  Button,
  useColorModeValue,
  View,
  extendTheme,
  Modal,
  Box,
} from 'native-base';

import { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AnimatedColorBox from '../components/animated-color-box';
import Navbar from '../components/navbar';
import Masthead from '../components/masthead';

type Coordinate = [number, number];

class TwoDimensionalArray<T> {
  private array: T[][];

  constructor(rows: number, columns: number) {
    this.array = new Array(rows);

    for (let i = 0; i < rows; i++) {
      this.array[i] = new Array(columns).fill(''); // 将所有元素设置为空字符串
    }
    
  }

  get(coordinate: Coordinate): T | undefined {
    const [row, col] = coordinate;
    return this.array[row]?.[col];
  }

  set(coordinate: Coordinate, value: T): void {
    const [row, col] = coordinate;
    this.array[row][col] = value;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  tableContainer: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tableCell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#000',
    height:120,
  },
  tableCellText: {
    fontSize: 16,
  },
});

const MultiSchemes = ({ route }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const nav = useNavigation();
  const { multi_Schemes } = route.params;
  // console.log('接收了');
  const [array, setArray] = useState(new TwoDimensionalArray<string>(7, 6));

  const handlePress = () => {
    console.log('返回选课界面');
    nav.navigate('About');
  };
  const handleItemPress = (item) => {
    const index = multi_Schemes.findIndex(
      (scheme) =>
        scheme.features === item.features && scheme.plan === item.plan
    );
    setSelectedItem(multi_Schemes[index]);
    setShowModal(true);
    
    const targetObject = multi_Schemes[index];
    if (targetObject) {
      const { plan } = targetObject;
      const newArray = new TwoDimensionalArray<string>(7, 6); // 创建新的二维数组
      newArray.set([0,1],'一');
      newArray.set([0,2],'二');
      newArray.set([0,3],'三');
      newArray.set([0,4],'四');
      newArray.set([0,5],'五');
      newArray.set([1,0],'1-2');
      newArray.set([2,0],'3-4');
      newArray.set([3,0],'5-6');
      newArray.set([4,0],'7-8');
      newArray.set([5,0],'9-10');
      newArray.set([6,0],'11');

      plan.forEach((item) => {
        // 在这里遍历 plan 数组的每个元素
        const times = item.time.split(' ');
        times.forEach(element => {
          if(element === '星期一第1-2节'){
            newArray.set([1,1],item.class_name);
          }else if(element === '星期一第3-4节'){
            newArray.set([2,1],item.class_name);
          }else if(element === '星期一第5-6节'){
            newArray.set([3,1],item.class_name);
          }else if(element === '星期一第7-8节'){
            newArray.set([4,1],item.class_name);
          }else if(element === '星期一第9-10节'){
            newArray.set([5,1],item.class_name);
          }else if(element === '星期一第11节'){
            newArray.set([6,1],item.class_name);
          }else if(element === '星期二第1-2节'){
            newArray.set([1,2],item.class_name);
          }else if(element === '星期二第3-4节'){
            newArray.set([2,2],item.class_name);
          }else if(element === '星期二第5-6节'){
            newArray.set([3,2],item.class_name);
          }else if(element === '星期二第7-8节'){
            newArray.set([4,2],item.class_name);
          }else if(element === '星期二第9-10节'){
            newArray.set([5,2],item.class_name);
          }else if(element === '星期二第11节'){
            newArray.set([6,2],item.class_name);
          }else if(element === '星期三第1-2节'){
            newArray.set([1,3],item.class_name);
          }else if(element === '星期三第3-4节'){
            newArray.set([2,3],item.class_name);
          }else if(element === '星期三第5-6节'){
            newArray.set([3,3],item.class_name);
          }else if(element === '星期三第7-8节'){
            newArray.set([4,3],item.class_name);
          }else if(element === '星期三第9-10节'){
            newArray.set([5,3],item.class_name);
          }else if(element === '星期三第11节'){
            newArray.set([6,3],item.class_name);
          }else if(element === '星期四第1-2节'){
            newArray.set([1,4],item.class_name);
          }else if(element === '星期四第3-4节'){
            newArray.set([2,4],item.class_name);
          }else if(element === '星期四第5-6节'){
            newArray.set([3,4],item.class_name);
          }else if(element === '星期四第7-8节'){
            newArray.set([4,4],item.class_name);
          }else if(element === '星期四第9-10节'){
            newArray.set([5,4],item.class_name);
          }else if(element === '星期四第11节'){
            newArray.set([6,4],item.class_name);
          }else if(element === '星期五第1-2节'){
            newArray.set([1,5],item.class_name);
          }else if(element === '星期五第3-4节'){
            newArray.set([2,5],item.class_name);
          }else if(element === '星期五第5-6节'){
            newArray.set([3,5],item.class_name);
          }else if(element === '星期五第7-8节'){
            newArray.set([4,5],item.class_name);
          }else if(element === '星期五第9-10节'){
            newArray.set([5,5],item.class_name);
          }else if(element === '星期五第11节'){
            newArray.set([6,5],item.class_name);
          }
        });
        setArray(newArray); // 更新array数组的状态
        // console.log(item);
      });
    }
  };




  const renderTable = () => {
    if (selectedItem) {
      const tableData = [];
      for (let i = 0; i < 7; i++) {
        const rowData = [];
        for (let j = 0; j < 6; j++) {
          rowData.push(
            <View style={styles.tableCell} key={j}>
              <Text style={styles.tableCellText}>
                {array.get([i, j])}
              </Text>
            </View>
          );
        }
        tableData.push(
          <View style={styles.tableRow} key={i}>
            {rowData}
          </View>
        );
      }
      return (
        <ScrollView style={styles.tableContainer}>
          {tableData}
        </ScrollView>
      );
    }
  };
  

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#008B8B' : '#48D1CC';

    return (
      <View style={{ marginBottom: 10, borderRadius: 8 }}>
        <TouchableOpacity
          onPress={() => handleItemPress(item)}
          style={{ backgroundColor: backgroundColor, borderRadius: 8, padding: 10 }}
        >
          <Text>
            {item.features}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'warmGray.900')}
      w="full"
    >
      <Masthead
        title="你的选课方案特征"
        image={require('../assets/about-masthead.png')}
      >
        <Navbar />
      </Masthead>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, padding: 16 }}>
          <SafeAreaView style={styles.container}>
            <FlatList
              data={multi_Schemes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          </SafeAreaView>
        </View>
      </SafeAreaView>
      <Button onPress={handlePress}>返回</Button>
      <Modal isOpen={showModal} onClose={closeModal}>
        <Box
          bg="white"
          p={4}
          rounded="md"
          shadow={3}
          w={Dimensions.get('window').width - 32}
          maxHeight={Dimensions.get('window').height - 100}
        >
          {renderTable()}
          <Button onPress={closeModal}>关闭</Button>
        </Box>
      </Modal>
    </AnimatedColorBox>
  );
};

export default MultiSchemes;


