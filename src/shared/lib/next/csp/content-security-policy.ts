import { env } from '@/shared/config/env.mjs';

export class ContentSecurityPolicy {
  private readonly policy: Record<string, string[] | undefined> = {};

  public add(directive: Directive, value?: string, options: { devOnly?: boolean; condition?: boolean } = {}) {
    const { devOnly = false, condition = true } = options;

    if (devOnly && env.NODE_ENV !== 'development') return this;
    if (!condition) return this;

    const curr = this.policy[directive];

    if (curr && value) {
      this.policy[directive] = [...curr, value];
      return this;
    }

    if (!curr && value) {
      this.policy[directive] = [value];
      return this;
    }

    this.policy[directive] = undefined;

    return this;
  }

  public build() {
    return Object.entries(this.policy)
      .map(([key, value]) => {
        if (value) return `${key} ${value.join(' ')};`;
        return `${key};`;
      })
      .join(' ');
  }
}
