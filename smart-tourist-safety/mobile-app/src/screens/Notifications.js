import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Nearest police dispatched',
      message: 'Police unit KLM-05 is on the way to your location',
      time: '2 min ago',
      type: 'police',
      caseId: 'CASE-2025-001245',
      read: false,
    },
    {
      id: '2',
      title: 'ERSS call triggered',
      message: 'Emergency Response System activated for your incident report',
      time: '5 min ago',
      type: 'emergency',
      caseId: 'CASE-2025-001245',
      read: true,
    },
    {
      id: '3',
      title: 'Hospital notified',
      message: 'Kochi General Hospital has been notified of your medical emergency',
      time: '10 min ago',
      type: 'hospital',
      caseId: 'CASE-2025-001243',
      read: true,
    },
  ]);

  // In a real app, this would connect to a WebSocket or polling mechanism
  useEffect(() => {
    // Simulate receiving a new notification
    const timer = setTimeout(() => {
      const newNotification = {
        id: '4',
        title: 'Help Arriving',
        message: 'Police unit KLM-05 will arrive in 2 minutes',
        time: 'Just now',
        type: 'police',
        caseId: 'CASE-2025-001245',
        read: false,
      };
      
      setNotifications(prev => [newNotification, ...prev]);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        !item.read && styles.unreadNotification,
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationHeader}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <View style={styles.notificationFooter}>
        <Text style={styles.caseId}>Case ID: {item.caseId}</Text>
        <View style={[
          styles.typeIndicator,
          {
            backgroundColor: 
              item.type === 'police' ? '#2196F3' :
              item.type === 'emergency' ? '#F44336' :
              item.type === 'hospital' ? '#4CAF50' : '#9C27B0'
          }
        ]} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
      </View>
      
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContainer: {
    padding: 10,
  },
  notificationCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  caseId: {
    fontSize: 12,
    color: '#999',
  },
  typeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default Notifications;