'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { UserSummary } from 'src/types/Analytics';
type Props = {
  label: string;
  value: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  bgColor: string;
  iconColor: string;
  users?: UserSummary[];
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onToggle?: () => void;
};

export function SummaryCardWithHoverList({
  label,
  value,
  icon: Icon,
  bgColor,
  iconColor,
  trend,
  users = [],
  onToggle,
}: Props) {
  const [side, setSide] = React.useState<'top' | 'bottom'>('bottom');
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const userCount = users?.length || 0;

  React.useEffect(() => {
    const updatePosition = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      setSide(spaceBelow < 400 ? 'top' : 'bottom');
    };
    const mq = window.matchMedia('(max-width: 767px)');
    const setFromMQ = () => setIsMobile(mq.matches);
    setFromMQ();
    mq.addEventListener?.('change', setFromMQ);
    updatePosition();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
      mq.removeEventListener?.('change', setFromMQ);
    };
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <HoverCard
        open={isMobile ? mobileOpen : undefined}
        onOpenChange={isMobile ? setMobileOpen : undefined}
        openDelay={isMobile ? undefined : 60}
        closeDelay={isMobile ? undefined : 80}
      >
        <HoverCardTrigger asChild>
          <Card
            onClick={() => {
              if (isMobile) {
                setMobileOpen(!mobileOpen);
              } else if (onToggle) {
                onToggle();
              }
            }}
            className={cn(
              ' border-2 border-gray-100 backdrop-blur-sm',
              'transition-all duration-300 ease-out',
              'hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1',
              'hover:border-primary/20',
            )}
          >
            <CardContent className="p-6 cursor-pointer" onClick={onToggle}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className={cn(
                      'relative h-14 w-14 rounded-2xl flex items-center justify-center shrink-0',
                      'transition-all duration-300',
                      bgColor,
                    )}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
                    <Icon className={cn('h-7 w-7 relative z-10', iconColor)} aria-hidden="true" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-muted-foreground mb-1.5 tracking-wide uppercase">
                      {label}
                    </div>
                    <div className="flex items-baseline gap-3">
                      <div className="text-4xl font-bold text-foreground tracking-tight">
                        {value}
                      </div>
                      {trend && (
                        <div
                          className={cn(
                            'text-sm font-semibold flex items-center gap-1 px-2 py-0.5 rounded-full',
                            trend.isPositive
                              ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30'
                              : 'text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/30',
                          )}
                        >
                          <span>{trend.isPositive ? '↑' : '↓'}</span>
                          <span>{Math.abs(trend.value)}%</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1.5">
                      {userCount} {userCount === 1 ? 'employee' : 'employees'}
                    </div>
                  </div>
                </div>
                <div className="md:hidden">
                  <button
                    type="button"
                    aria-label="Show details"
                    aria-expanded={mobileOpen}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileOpen((v) => !v);
                    }}
                    className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  >
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </HoverCardTrigger>

        <HoverCardContent
          side={side}
          align="center"
          sideOffset={8}
          className="p-0 border-none shadow-none bg-transparent w-[min(25rem,90vw)]"
        >
          <div
            className={cn(
              'rounded-xl border border-border/20 border-gray-400',
              'bg-popover/95 backdrop-blur-2xl shadow-2xl',
              'p-4 max-h-72 overflow-auto',
              'ring-1 ring-black/5',
            )}
          >
            {users?.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/50">
                  <h4 className="text-sm font-semibold text-foreground">{label} Team Members</h4>
                  <span className="text-xs text-muted-foreground">{userCount} total</span>
                </div>

                <ul className="space-y-2">
                  {users?.map((user: UserSummary, index) => (
                    <li
                      key={user.userId}
                      className={cn(
                        'flex items-center justify-between p-1 rounded-lg',
                        'transition-colors duration-200',
                        'hover:bg-accent/50 border border-border/30 border-gray-300',
                      )}
                      style={{
                        animation: `fadeInSlide 0.3s ease-out ${index * 30}ms both`,
                      }}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Users className="h-4 w-4 text-primary" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm text-foreground font-medium truncate block">
                            {user?.username}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full font-medium">
                          {user?.groupName}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="text-center">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/50">
                  <h4 className="text-sm font-semibold text-foreground">{label} Team Members</h4>
                  <span className="text-xs text-muted-foreground">{userCount} total</span>
                </div>
                <Users className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
                <div className="text-sm text-muted-foreground">No employees {label}</div>
              </div>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
