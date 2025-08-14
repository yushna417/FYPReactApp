// components/VegetablePriceTracker.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { VegetableService } from '@/api/axios';
import { IDailyPrice } from '@/types/dailyPriceInterface';

interface Props {
  vegetableId: number;
}

const VegetablePriceTracker = ({ vegetableId }: Props) => {
  const [prices, setPrices] = useState<IDailyPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await VegetableService.getDailyPrices(vegetableId);
        setPrices(data);
      } catch (error) {
        console.error('Failed to fetch prices:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [vegetableId]);

  if (loading) return <ActivityIndicator size="large" />;

  if (!prices.length) return <Text>No price data available</Text>;

  return (
    <View style={styles.container}>
      {/* Price Trend Chart */}
      <LineChart
        data={{
          labels: prices.map(p => new Date(p.date).toLocaleDateString()),
          datasets: [{
            data: prices.map(p => p.avg_price),
          }]
        }}
        width={Dimensions.get('window').width - 40}
        height={220}
        yAxisLabel="₹"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: 4,
            strokeWidth: 2,
            stroke: '#3b82f6'
          }
        }}
        bezier
      />

      {/* Price List */}
      <View style={styles.priceList}>
        {prices.map((price) => (
          <View key={price.id} style={styles.priceItem}>
            <Text style={styles.dateText}>
              {new Date(price.date).toLocaleDateString()}
            </Text>
            <Text style={styles.priceText}>₹{price.avg_price.toFixed(2)}</Text>
            <Text style={[
              styles.changeText,
              price.trend === 'up' && styles.trendUp,
              price.trend === 'down' && styles.trendDown
            ]}>
              {price.daily_change ? `${price.daily_change.toFixed(1)}%` : '-'}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff'
  },
  priceList: {
    marginTop: 20
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },
  dateText: {
    flex: 2,
    color: '#6b7280'
  },
  priceText: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '600'
  },
  changeText: {
    flex: 1,
    textAlign: 'right'
  },
  trendUp: {
    color: '#ef4444' // Red for increase
  },
  trendDown: {
    color: '#10b981' // Green for decrease
  }
});

export default VegetablePriceTracker;