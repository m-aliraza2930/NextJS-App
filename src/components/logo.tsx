import type { FC } from 'react';
import { useTheme } from '@mui/material/styles';

export const Logo: FC = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <svg
      width="26"
      height="24"
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_88_2031)">
        <path
          d="M19.5014 0.588989H6.49857L0 12L6.49857 23.411H19.4957L25.9943 12L19.5014 0.588989ZM12.9971 18.0707C9.64231 18.0707 6.92649 15.3548 6.92649 12C6.92649 8.64517 9.64801 5.92934 12.9971 5.92934C16.352 5.92934 19.0678 8.64517 19.0678 12C19.0678 15.3548 16.352 18.0707 12.9971 18.0707Z"
          fill="#F7C600"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.1477 11.3153C18.8282 8.44545 16.5517 6.16895 13.6875 5.85515V4.44019H12.3125V5.85515C9.44264 6.17466 7.16615 8.45116 6.85234 11.3153H5.43738V12.6846H6.85234C7.17185 15.5545 9.44835 17.831 12.3125 18.1448V19.5598H13.6875V18.1448C16.5574 17.8253 18.8339 15.5488 19.1477 12.6846H20.5627V11.3153H19.1477ZM17.7613 12.6846C17.4589 14.79 15.7929 16.4617 13.6875 16.7584V15.4347H12.3125V16.7584C10.2072 16.456 8.53547 14.79 8.23878 12.6846H9.56246V11.3153H8.23878C8.54117 9.20999 10.2072 7.53828 12.3125 7.24159V8.56527H13.6875V7.24159C15.7929 7.54398 17.4646 9.20999 17.7613 11.3153H16.4376V12.6846H17.7613Z"
          fill="#9B7D00"
        />
        <path
          d="M12.6491 10.7505V11.6463H11.7534V12.3537H12.6491V13.2495H13.3509V12.3537H14.2467V11.6463H13.3509V10.7505H12.6491Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_88_2031">
          <rect
            width="26"
            height="22.822"
            fill="white"
            transform="translate(0 0.588989)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
