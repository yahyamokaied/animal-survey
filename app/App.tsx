import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Provider} from 'react-redux';
import SurveysComponent from './src/components/SurveysComponent';
import store from './src/store/store';
import commonStyles from './src/theme/commonStyles';

const App: React.FC = () => {
  store.subscribe(() => {
    console.log('Current state:', JSON.stringify(store.getState(), null, 2));
  });

  return (
    <Provider store={store}>
      <SafeAreaView style={commonStyles.fullScreen}>
        <Text style={commonStyles.textTitle}>
          Veterinary Consultation Feedback
        </Text>
        <SurveysComponent />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
