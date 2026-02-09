import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import type { ButtonProps } from 'antd';
import type { CSSProperties, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
} & ButtonProps;
export default function IconButton({
  children,
  className,
  style,
  onClick,
  title,
  ...props
}: Props) {
  const isDarkMode = false;

  return (
    <button
      {...props}
      title={title}
      type="button"
      style={style}
      className={cn(
        `flex cursor-pointer items-center justify-center rounded-full transition-all  ${
          isDarkMode && 'hover:bg-slate-800 active:bg-slate-700'
        } dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-transparent dark:active:bg-slate-600
        } p-2 ${
          !isDarkMode && 'bg-gray-100 text-slate-800 hover:bg-slate-300 active:bg-slate-400'
        }`,
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
