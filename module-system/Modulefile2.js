/**
 * Modulefile2.js - The Utility Provider
 *
 * This file acts as a library, exporting various tools using
 * modern ES6 Module syntax. It demonstrates how to organize
 * reusable code in a clean, maintainable way.
 */

// 1. Constant Exports (Configuration data)
export const LIBRARY_NAME = "Node-Utility-Core";
export const VERSION = "1.0.4";

/**
 * 2. Named Function Exports
 * Specialized math utilities for data analysis.
 */

// Calculate percentage growth between two numbers
export const calculateGrowth = (oldVal, newVal) => {
    const growth = ((newVal - oldVal) / oldVal) * 100;
    return `${growth.toFixed(2)}%`;
};

// Generate a unique ID for data entries
export function generateID(prefix = "USER") {
    const random = Math.floor(Math.random() * 10000);
    return `${prefix}-${Date.now()}-${random}`;
}

/**
 * 3. Class Export
 * Showing how to export entire object blueprints.
 */
export class DataFormatter {
    constructor(data) {
        this.data = data;
    }

    // Convert string to "Title Case"
    toTitleCase() {
        return this.data
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    // Check if data is valid
    isValid() {
        return this.data && this.data.length > 3;
    }
}

/**
 * 4. Default Export
 * Every module can have one 'default' export.
 * This is usually the primary feature of the file.
 */
const mainUtility = {
    checkHealth: () => "System Module 2 is active.",
    getTimestamp: () => new Date().toISOString(),
};

export default mainUtility;

/**
 * WHY THIS IS BETTER:
 * 1. Flexibility: It provides both specific tools (Named) and a main tool (Default).
 * 2. Reusability: These functions are "pure"—they don't depend on global state.
 * 3. Clean Documentation: Each export is clearly explained.
 */
