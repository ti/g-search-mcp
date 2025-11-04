import * as fs from "fs";
import * as path from "path";
import * as os from "os";

/**
 * Expand ~ and $HOME in path strings
 * @param inputPath The path that may contain ~ or $HOME
 * @returns The expanded path
 */
function expandPath(inputPath: string): string {
  if (inputPath.startsWith("~/")) {
    return path.join(os.homedir(), inputPath.slice(2));
  }
  if (inputPath.startsWith("$HOME/")) {
    return path.join(os.homedir(), inputPath.slice(6));
  }
  if (inputPath === "~" || inputPath === "$HOME") {
    return os.homedir();
  }
  return inputPath;
}

/**
 * Get the storage state directory path
 * Uses STORAGE_STATE_PATH environment variable if set, otherwise defaults to ~/.local/mcp/share/
 * Supports ~ and $HOME expansion in paths
 * Creates the directory if it doesn't exist
 * @returns The storage state directory path
 */
export function getStorageStateDir(): string {
  const envPath = process.env.STORAGE_STATE_PATH;
  const defaultPath = path.join(os.homedir(), ".local", "mcp", "share");
  
  const storageDir = envPath ? expandPath(envPath) : defaultPath;
  
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
