//Worker.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const serviceWorker = setupServer(...handlers);
