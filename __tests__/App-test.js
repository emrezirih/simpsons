/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';
import List from '../src/list';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('AppTesting', () => {
  it('renders correctly', () => {
    const snapshot = renderer.create(<App />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});