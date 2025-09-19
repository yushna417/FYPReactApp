// utils/types.ts
export function isFormData(data: any): data is FormData {
  return data instanceof FormData;
}