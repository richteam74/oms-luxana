import type { CourierProvider } from "@/lib/courier/types";
import { JntCourierProvider } from "@/lib/courier/jnt-provider";
import { SpxCourierProvider } from "@/lib/courier/spx-provider";
import { MockCourierProvider } from "@/lib/courier/mock-provider";

export function getCourierProvider(code: string): CourierProvider {
  switch (code.toUpperCase()) {
    case "JNT": return new JntCourierProvider();
    case "SPX": return new SpxCourierProvider();
    default: return new MockCourierProvider();
  }
}
