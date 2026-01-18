export class ApiError extends Error {
  status: number;
  code?: string;
  payload?: any;

  constructor(message: string, status: number, payload?: any, code?: string) {
    super(message);
    this.status = status;
    this.payload = payload;
    this.code = code;
  }
}

export const fetchWithCredentials = async (
  url: string,
  options: RequestInit = {}
) => {
  try {
    const isFormData = options.body instanceof FormData;
    const response = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(options.headers || {}),
      },
    });

    let data: any = null;
    console.log("Response status:", response.status);
    console.log("Response status:", response);
    try {
      data = await response.json();
    } catch {
      data = { message: "Invalid response format" };
    }

    if (!response.ok) {
      // Backend may provide code + message
      const message = data?.message || response.statusText || "Unknown error";
      const code = data?.code;
      throw new ApiError(message, response.status, data, code);
    }

    return data;
  } catch (err: any) {
    if (err instanceof ApiError) throw err;

    // Network errors, CORS, timeouts
    throw new ApiError(err.message || "Network error", 0);
  }
};
