import { LaunchOptions } from "playwright";

/**
 * Get Chromium launch configuration with support for custom executable path
 */
export function getChromiumLaunchOptions(options: Partial<LaunchOptions> = {}): LaunchOptions {
  const config: LaunchOptions = {
    ...options,
  };

  // Support custom Chromium executable path via environment variable
  if (process.env.CHROMIUM_EXECUTABLE_PATH) {
    config.executablePath = process.env.CHROMIUM_EXECUTABLE_PATH;
  }

  return config;
}
