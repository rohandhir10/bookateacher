export type SessionStatus = "scheduled" | "completed" | "cancelled" | "no_show";
export type PaymentStatus = "pending" | "paid" | "refunded" | "free";

const allowedTransitions: Record<SessionStatus, SessionStatus[]> = {
  scheduled: ["completed", "cancelled", "no_show"],
  completed: [],
  cancelled: [],
  no_show: [],
};

export function canTransitionSession(currentStatus: SessionStatus, nextStatus: SessionStatus): boolean {
  return currentStatus === nextStatus || allowedTransitions[currentStatus].includes(nextStatus);
}

export function canTransitionPayment(currentStatus: PaymentStatus, nextStatus: PaymentStatus): boolean {
  if (currentStatus === nextStatus) return true;
  if (currentStatus === "pending") return nextStatus === "paid" || nextStatus === "free";
  if (currentStatus === "paid") return nextStatus === "refunded";
  return false;
}

export function calculateSessionAmount(hourlyRate: number | null | undefined, durationMinutes: number): number {
  if (!hourlyRate || hourlyRate <= 0) return 0;
  return Math.round((hourlyRate * durationMinutes) / 60);
}
