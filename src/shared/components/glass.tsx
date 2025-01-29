import { cn } from '@/shared/lib/cn';

interface GlassProps {
  className?: string;
}

export const Glass = (props: GlassProps) => {
  const { className } = props;

  const glassVars = {
    '--extended-by': '100px',
    '--cutoff': 'calc(100% - var(--extended-by))',
    '--blur': '30px',
  };

  const edgeVars = {
    '--extended-by': '80px',
    '--offset': '20px',
    '--thickness': '2px',
    '--blur': '90px',
    '--saturate': '160%',
    '--brightness': '1.3',
  };

  return (
    <div className={cn('relative z-0', className)}>
      <div
        className="pointer-events-none absolute inset-0 bottom-[calc(-1_*_var(--extended-by))] backdrop-blur-[var(--blur)] [mask-image:linear-gradient(to_bottom,black_0,black_var(--cutoff),transparent_var(--cutoff))]"
        // @ts-expect-error don't accept vars
        style={glassVars}
      />
      <div
        className="pointer-events-none absolute left-0 right-0 top-[calc(100%_-_var(--offset)_+_var(--thickness))] -z-[1] h-[calc(var(--extended-by)_+_var(--offset))] backdrop-blur-[var(--blur)] backdrop-brightness-[var(--brightness)] backdrop-saturate-[var(--saturate)] [mask-image:linear-gradient(to_bottom,black_0,black_var(--offset),transparent_var(--offset))]"
        // @ts-expect-error don't accept vars
        style={edgeVars}
      />
    </div>
  );
};
