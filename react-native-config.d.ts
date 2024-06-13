declare module 'react-native-config' {
  export interface NativeConfig {
    ENVIRONMENT?: 'production' | 'development' | 'staging';
  }

  export const Config: NativeConfig;
  export default Config;
}
