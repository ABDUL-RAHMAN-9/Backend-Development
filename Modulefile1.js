/**
 * Modulefile1.js - The Logic Consumer
 *
 * This is the entry point for our utility demo. It imports
 * the tools from Modulefile2 and uses them to process
 * simulated business data.
 */

// 1. Different Import Styles
import mainTool, {
    calculateGrowth,
    generateID,
    DataFormatter,
    VERSION as libVersion, // Alias: renaming an import to avoid name conflicts
} from "./Modulefile2.js";

// Namespace Import: Importing EVERYTHING as one object
import * as utils from "./Modulefile2.js";

console.log("==================================================");
console.log(`   BOOTING ${utils.LIBRARY_NAME} (v${libVersion})   `);
console.log("==================================================");

/**
 * SIMULATED WORKFLOW:
 * We are going to process a new "Subscriber" registration.
 */

const rawName = "abdul rahman node developer";
const stats = { lastYear: 500, thisYear: 1250 };

// Use the Class
const formatter = new DataFormatter(rawName);

if (formatter.isValid()) {
    console.log(`[Status] Initializing data for: ${formatter.toTitleCase()}`);

    // Use the functions
    const userID = generateID("MEMBER");
    const growthRate = calculateGrowth(stats.lastYear, stats.thisYear);

    console.log(`[ID]     Generated Identity: ${userID}`);
    console.log(`[Stats]  Annual Growth Rate: ${growthRate}`);
}

// Use the Default Export
console.log(`[Health] ${mainTool.checkHealth()}`);
console.log(`[Time]   Processed at: ${mainTool.getTimestamp()}`);

/**
 * ADVANCED CHECK:
 * Demonstrating that 'utils' (Namespace) contains all exports.
 */
console.log("\n--- Internal Module Inspection ---");
console.log("Available Exports in Module2:", Object.keys(utils));

console.log("==================================================");
console.log("         UTILITY PROCESSING COMPLETE              ");
console.log("==================================================");

/**
 * WHY THIS IS BETTER:
 * 1. Alias Usage: Renaming 'VERSION' shows you know how to manage large codebases.
 * 2. Logic Flow: It's not just "code," it's a story (Processing a subscriber).
 * 3. Inspection: 'Object.keys(utils)' shows you understand JS Reflection.
 */
