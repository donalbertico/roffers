/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Amplify, { AuthModeStrategyType, DataStore, Auth, API, Hub } from 'aws-amplify';
import awsconfig from './screens/aws-exports';
import { Offer } from './screens/models'
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

Amplify.configure({
  ...awsconfig,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
  }
})

function Section () {
  const [offers,setOffers] = React.useState()
  const [dataStoreready, setDSReady] = React.useState(false)

  const isDarkMode = useColorScheme() === 'dark';

  React.useEffect(() => {
    const removeListener = Hub.listen('datastore', async (capsule) => {
      const { payload : {event, data}} = capsule
      if (event === 'ready') {
        setDSReady(true)
      }
    })
    const removeAuthListener = Hub.listen('core', async (capsule) => {
      const { payload : {event, data}} = capsule
      console.log(event);
    })
    DataStore.query(Offer).then(r => setOffers(r)).catch(e => console.log(e))
    // console.log('CAACAA', Offer);
      // DataStore.start()
      return () => {
        removeListener()
        setDSReady(false)
        // DataStore.clear()
      }
    },[])

  React.useEffect(() => {
    console.log(offers);
  },[offers])

  React.useEffect(() => {
    console.log(dataStoreready);
    if(dataStoreready){
      DataStore.clear()
      DataStore.query(Offer).then(r => setOffers(r)).catch(e => console.log(e))

    }
    },[dataStoreready])

  return (
    <View style={styles.sectionContainer}>

    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
