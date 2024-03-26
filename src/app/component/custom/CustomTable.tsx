import React from 'react';

function CustomTable({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        'w-full border-[1px] rounded-2xl flex flex-col overflow-hidden ' +
        className
      }
    >
      {children}
    </div>
  );
}

export default CustomTable;

export function CustomTHeder({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={'w-full uppercase flex flex-col ' + className}>
      {children}
    </div>
  );
}

export function CustomTBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={'w-full flex flex-col ' + className}>{children}</div>;
}

export function CustomTFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={'w-full flex flex-col ' + className}>{children}</div>;
}

export function CustomTRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={'w-full flex flex-row items-center ' + className}>
      {children}
    </div>
  );
}

export function CustomTCol({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string | '';
}) {
  return <div className={'px-1 ' + className}>{children}</div>;
}
