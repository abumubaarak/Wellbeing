declare module 'react-native-config' {
  export interface NativeConfig {
    ENVIRONMENT?: 'production' | 'development' | 'staging';
    WEB_CLIENT_ID: string;
    API_URL: string;
    CLIENT_ID_IOS: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
