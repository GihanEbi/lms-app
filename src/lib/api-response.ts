import { NextResponse } from "next/server";

export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T | null;
  error?: string;
};

export function createResponse<T>(
  success: boolean,
  message: string,
  data?: T | null,
  status: number = 200,
) {
  return NextResponse.json({ success, message, data }, { status });
}
