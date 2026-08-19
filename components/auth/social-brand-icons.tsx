import Svg, { Circle, Path } from 'react-native-svg';

type SocialBrandIconProps = {
  size?: number;
};

export function GoogleBrandIcon({ size = 20 }: SocialBrandIconProps) {
  return (
    <Svg
      accessible={false}
      height={size}
      pointerEvents="none"
      viewBox="0 0 18 18"
      width={size}
    >
      <Path
        d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.482h4.844a4.14 4.14 0 0 1-1.797 2.715v2.258h2.909c1.702-1.567 2.684-3.874 2.684-6.614Z"
        fill="#4285F4"
      />
      <Path
        d="M9 18c2.43 0 4.468-.806 5.956-2.181l-2.909-2.258c-.806.54-1.836.859-3.047.859-2.344 0-4.328-1.585-5.037-3.714H.956v2.332A9 9 0 0 0 9 18Z"
        fill="#34A853"
      />
      <Path
        d="M3.963 10.706A5.414 5.414 0 0 1 3.682 9c0-.592.102-1.168.281-1.706V4.962H.956A9 9 0 0 0 0 9c0 1.452.347 2.827.956 4.038l3.007-2.332Z"
        fill="#FBBC05"
      />
      <Path
        d="M9 3.58c1.321 0 2.507.454 3.442 1.345l2.582-2.582C13.464.89 11.426 0 9 0A9 9 0 0 0 .956 4.962l3.007 2.332C4.672 5.165 6.656 3.58 9 3.58Z"
        fill="#EA4335"
      />
    </Svg>
  );
}

export function FacebookBrandIcon({ size = 20 }: SocialBrandIconProps) {
  return (
    <Svg
      accessible={false}
      height={size}
      pointerEvents="none"
      viewBox="0 0 24 24"
      width={size}
    >
      <Circle cx="12" cy="12" fill="#0866FF" r="12" />
      <Path
        d="M13.62 21v-8h2.68l.4-3.12h-3.08V7.9c0-.9.25-1.52 1.55-1.52h1.65V3.6a22.5 22.5 0 0 0-2.4-.12c-2.38 0-4.01 1.46-4.01 4.14v2.26H7.72V13h2.69v8h3.21Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}
