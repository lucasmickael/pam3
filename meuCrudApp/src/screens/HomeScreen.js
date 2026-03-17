import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native'; 

const HomeScrren = () => {
    const [peoples, setPeoples] = useState([]);

    useEffect(() => {
    fetch('http://localhost:3000/peoples')
    .then(response => response.json())
    .then(data => setPeoples(data))
    .catch(error => console.error(error));
}, []);

  return (
    <View styles={{ flex: 1, paddingTop: 50 }}>
        
      <FlatList
        data={peoples}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <View style={{ marginBottom: 15, padding: 10, borderBottomWidth: 1 }}>
                <Text>{item.firstname} {item.lastname}</Text>
               <Text>{item.email}</Text>
            </View>
        )}
    />
    

    </View>
  );
};

export default HomeScreen;

