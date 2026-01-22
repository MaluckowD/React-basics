import type { PropsWithChildren } from 'react';

export const Layout = ({ children, ...rest }: PropsWithChildren) => {
  return (
    <main
      className="min-h-screen min-w-[100vw] bg-[#282c34] text-[calc(5px+2vmin)] text-[white] grid place-items-center"
      {...rest}
    >
      <div className="min-h-screen min-w-[90%] max-w-[90%] flex flex-col gap-[20px]">
        {children}
      </div>
    </main>
  );
};
