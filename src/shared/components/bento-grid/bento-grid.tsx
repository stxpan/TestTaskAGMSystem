import { cn, twx } from '@/shared/lib/cn';

export const BentoGrid = twx.div`grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 mx-auto`;

export interface BentoGridItemProps {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}

export const BentoGridItem = (props: BentoGridItemProps) => {
  const { className, title, description, header, icon } = props;

  return (
    <div
      className={cn(
        'group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-input bg-white p-4 shadow-input dark:bg-black dark:shadow-none',
        className,
      )}
    >
      <div className="flex flex-1 items-center justify-center">{header}</div>

      <div>
        {icon}
        <div className="mb-2 mt-2 font-bold text-primary">{title}</div>
        <div className="text-xs font-normal text-muted-foreground">{description}</div>
      </div>
    </div>
  );
};
