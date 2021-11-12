import fs from 'fs';

export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename);
  } catch (error) {
    // eslint-disable-next-line no-useless-return
    return;
  }

  await fs.promises.unlink(filename);
};
