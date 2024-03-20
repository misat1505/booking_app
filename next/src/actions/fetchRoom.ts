"use server";

import { getRoom } from "@/app/api/rooms/utils/functions";
import { Room } from "@/models/Room";

export async function fetchRoom(roomId: string): Promise<Room | null> {
  return getRoom(roomId);
}
