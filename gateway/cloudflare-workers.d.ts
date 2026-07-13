declare module "cloudflare:workers" {
  export class WorkflowEntrypoint<Env, Params> {
    protected readonly env: Env;
  }

  export type WorkflowEvent<Params> = Readonly<{
    payload: Params;
    instanceId: string;
    timestamp: string;
  }>;

  export interface WorkflowStep {
    do<T>(name: string, callback: () => Promise<T>): Promise<T>;
    waitForEvent<T>(name: string, options: Readonly<{ type: string; timeout: string }>): Promise<T>;
    sleepUntil(name: string, timestamp: Date | number): Promise<void>;
  }
}
