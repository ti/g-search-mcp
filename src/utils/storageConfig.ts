import * as fs from "fs";
import * as path from "path";
import * as os from "os";

/**
 * Get the storage state directory path
 * Uses STORAGE_STATE_PATH environment variable if set, otherwise defaults to ~/.local/mcp/share/
 * Creates the directory if it doesn't exist
 * @returns The storage state directory path
 */
export function getStorageStateDir(): string {
  const envPath = process.env.STORAGE_STATE_PATH;
  const defaultPath = path.join(os.homedir(), ".local", "mcp", "share");
  
  const storageDir = envPath || defaultPath;
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
  }
  
  return storageDir;
}

/**
 * Get the full path for a state file
 * @param filename The state file name
 * @returns The full path to the state file
 */
export function getStateFilePath(filename: string): string {
  const storageDir = getStorageStateDir();
  return path.join(storageDir, filename);
}
