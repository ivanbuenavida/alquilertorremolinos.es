import type { PropertyId } from '@alquiler/domain';

export interface Beds24Config {
  apiToken: string;
  baseUrl: string;
  /** Maps internal monorepo PropertyId -> Beds24 numeric roomId. */
  roomMap: Record<PropertyId, number>;
}

/**
 * Loads Beds24 configuration from environment variables.
 * Supports both single-property (BEDS24_ROOM_ID) and multi-property (BEDS24_ROOM_MAP) setups.
 */
export function loadBeds24Config(env: NodeJS.ProcessEnv = process.env): Beds24Config {
  const apiToken = env.BEDS24_API_TOKEN?.trim() ?? '';
  const baseUrl = (env.BEDS24_BASE_URL?.trim() || 'https://beds24.com/api/v2').replace(/\/+$/, '');
  const roomMap: Record<PropertyId, number> = {};

  if (env.BEDS24_ROOM_MAP) {
    const parsed = JSON.parse(env.BEDS24_ROOM_MAP) as Record<string, number>;
    for (const [propertyId, roomId] of Object.entries(parsed)) {
      if (typeof roomId === 'number' && Number.isFinite(roomId)) {
        roomMap[propertyId] = roomId;
      }
    }
  } else if (env.BEDS24_ROOM_ID) {
    const defaultPropertyId = env.BEDS24_DEFAULT_PROPERTY_ID?.trim() || 'torremolinos-centro';
    const parsedRoomId = Number(env.BEDS24_ROOM_ID);
    if (Number.isFinite(parsedRoomId)) {
      roomMap[defaultPropertyId] = parsedRoomId;
    }
  }

  return { apiToken, baseUrl, roomMap };
}
