declare module 'react-native-config' {
  export interface NativeConfig {
    ENVIRONMENT?: 'production' | 'development' | 'staging';
    CLIENT_ID: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
