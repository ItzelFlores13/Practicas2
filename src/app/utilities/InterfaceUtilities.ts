export type Modify<OriginalInterface, Modified> = Omit<OriginalInterface, keyof Modified> & Modified;
