import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("https://rpc.sepolia.org/", () => {
    return HttpResponse.json({
      message: "successfull mock response from Sepolia handler",
    });
  }),
];
