export const WS_MAX_RECONNECT_DELAY = 5000;
export const WS_BASE_RECONNECT_DELAY = 1000;
export const STATE_CONNECTING_TIMEOUT = 5000;
export const STATE_READY_TIMEOUT = 20_000;
export const SUB_MAX_RECONNECT_ATTEMPTS = 5;

export enum WSCloseCodes {
  Normal = 1000,
  NoClientId = 4001,
  NoAuth = 4002,
  NoConnectedGuild = 4003,
  InternalError = 4000,
  DuplicateConnection = 4004,
  ServerShutdown = 4005,
}

export enum PerformanceSettings {
  MaxMissedFrames = 3000,
  BufferSize = 4096,
}
