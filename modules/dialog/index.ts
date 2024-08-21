import DialogModule from "./src/DialogModule";

export async function show(
  title: string,
  message: string,
  positive: string,
  negative: string,
) {
  return await DialogModule.show(title, message, positive, negative);
}
