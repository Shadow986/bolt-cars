import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.boltcars.app',
  appName: 'Bolt Cars',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
