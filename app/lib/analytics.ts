export function track(ev: string, props?: Record<string, any>) {
  try {
    // @ts-ignore
    window.plausible?.(ev, props ? { props } : undefined);
  } catch {}
}
