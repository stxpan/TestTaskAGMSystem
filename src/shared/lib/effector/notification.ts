import { createEffect, createEvent, sample } from 'effector';
import { toast } from 'sonner';

type NotifyType = Exclude<keyof typeof toast, 'promise' | 'custom' | 'dismiss'>;

export interface NotifyFxOptions<T extends NotifyType = NotifyType> {
  message: Parameters<(typeof toast)[T]>[0];
  data?: Parameters<(typeof toast)[T]>[1];
  type?: T;
}

const notifyFx = createEffect(<T extends NotifyType = NotifyType>(options: NotifyFxOptions<T>) => {
  const { message, data, type = 'message' } = options;

  const toastType = toast[type];

  return toastType(message, data);
});

export const notified = createEvent<NotifyFxOptions>();

sample({
  clock: notified,
  target: notifyFx,
});
