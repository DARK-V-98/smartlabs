import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 18.5V2.5a2.5 2.5 0 0 0-2.5-2.5h-15A2.5 2.5 0 0 0 2 2.5v16A2.5 2.5 0 0 0 4.5 21h15a2.5 2.5 0 0 0 2.5-2.5Z" />
      <path d="M12 12H2" />
      <path d="m16 6-2.5 2.5 2.5 2.5" />
      <path d="M12 12v9" />
    </svg>
  );
}
