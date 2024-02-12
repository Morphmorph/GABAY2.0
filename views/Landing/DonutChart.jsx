import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Circle, G, Text as SvgText } from 'react-native-svg';

const chartWidth = 180; // Adjust the width
const chartHeight = 180; // Adjust the height
const chartRadius = chartWidth / 2;

const { width, height } = Dimensions.get('window');

// Calculate the font size based on the screen resolution
const fontSize = width === 360 && height === 720 ? 24 : 10;
const marginRight = width === 360 && height === 720 ? 5 : 10;

const chartConfig = {
  color: (index) => {
    const colors = [
      '#FF5733', '#33FF57', '#3366FF', '#FF33FF', '#FFCC33',
      '#33FFFF', '#9933FF', '#FF3333', '#33FF33', '#33CCFF',
      '#FF99CC', '#FF66CC', '#33FFCC', '#993333', '#FFFF33',
      '#66FF33', '#6633FF', '#FF6666', '#FF3399', '#33FF99',
      '#FF9933', '#33FF66', '#3399FF', '#FF3366', '#CC33FF',
      '#66CCFF', '#CC66FF', '#FF6666', '#99CCFF', '#99FFCC'
    ];
    return colors[index % colors.length];
  },
};

function DonutChart({ data, total_sum,predict = null }) {
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    // Calculate the total expense whenever data changes
    const newTotalExpense = data.reduce((acc, item) => acc + item.value, 0);
    setTotalExpense(newTotalExpense);
  }, [data]);

  const getFontSize = () => {
    const totalExpenseStr = predict ? predict.toLocaleString():totalExpense.toLocaleString();
    const numDigits = totalExpenseStr.replace(/,/g, '').length;

    if (numDigits >= 1 && numDigits <= 5) {
      return 17;
    } else if (numDigits === 6) {
      return 15;
    } else if (numDigits === 7) {
      return 14;
    } else {
      return 13; // for 8+ digits
    }
  };
  const pieData = data.map((item, index) => ({
    key: item.key,
    value: item.value,
    svg: { fill: chartConfig.color(index) },
  }));

  // Set a minimum angle for each slice
  const minAngle = 5; // You can adjust this value as needed

  const Labels = ({ slices }) => {
    return slices.map((slice, index) => {
      const { pieCentroid, data } = slice;
      const percentage = ((data.value / totalExpense) * 100).toFixed() + '%';
      const textX = pieCentroid[0];
      const textY = pieCentroid[1];
      const textAnchor = 'middle';

      return (
        <G key={index}>
          {data.value / totalExpense * 180 >= minAngle && (
            <SvgText
              x={textX}
              y={textY}
              fill={'#144714'}
              textAnchor={textAnchor}
              fontSize={14}
              fontWeight={'bold'}
              fontStyle= {'italic'}
              backgroundColor={'lightgray'}
            >
              {percentage}
            </SvgText>
          )}
        </G>
      );
    });
  };

  const legendItems = data.map((value, index) => (
    <View key={index} style={styles.legendItem}>
      <View style={[styles.legendColorBox, { backgroundColor: chartConfig.color(index) }]} />
      <Text style={styles.legendText}>{value.key}</Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <PieChart
          style={{ width: chartWidth, height: chartHeight }}
          data={pieData}
          innerRadius={'50%'}
          padAngle={0.02}
        >
          <Labels />
        </PieChart>
        <View style={styles.centeredTextContainer}>
          <Text style={[styles.centeredText, { fontSize: getFontSize(), color: totalExpense > total_sum ? 'red' : '#144714' }]}>₱{predict || predict == 0 ? predict.toLocaleString():totalExpense.toLocaleString()}</Text>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.legend}>{legendItems}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chartContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: chartWidth,
    height: chartHeight,
  },
  centeredTextContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -40 }, { translateY: -20 }],
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: 5,
    zIndex: 2,
  },
  centeredText: {
    fontSize: 15,
    fontWeight: 'bold',
    width:"100%",
    textAlign:'center',
    color: '#144714'
  },
  legend: {
    flexDirection: 'row',
  },
  legendItem: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: marginRight,
  },
  legendColorBox: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  legendText: {
    fontSize: fontSize,
    margin: 5,
  },
});

export default DonutChart;