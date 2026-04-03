/**
 * fsmodule.js - Advanced File System Management Toolkit
 *
 * This module demonstrates deep knowledge of the Node.js 'fs' module,
 * covering Async/Await, Streams, Buffer management, and Event Watching.
 *
 */

import fs from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// --- Setup ---
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "sandbox");
const TEST_FILE = path.join(DATA_DIR, "test_log.txt");
const LARGE_FILE = path.join(DATA_DIR, "large_data.bin");

// Professional Logger Utility
const log = (msg) =>
    console.log(`[FS-TOOL] ${new Date().toLocaleTimeString()} - ${msg}`);

/**
 * 1. Directory Management
 * Demonstrates recursive folder creation and cleanup.
 */
async function initializeEnvironment() {
    try {
        log("Initializing sandbox environment...");
        await fs.mkdir(DATA_DIR, { recursive: true });
        log(`Directory verified: ${DATA_DIR}`);
    } catch (err) {
        console.error("Error creating directory:", err.message);
    }
}

/**
 * 2. CRUD Operations (Create, Read, Update, Delete)
 * Using the modern fs/promises API for clean, readable code.
 */
async function runFileOperations() {
    try {
        log("--- Starting CRUD Operations ---");

        // Create/Write
        const initialContent = "Entry 01: Initializing log sequence.\n";
        await fs.writeFile(TEST_FILE, initialContent, "utf-8");
        log("File created successfully.");

        // Update/Append
        const extraContent = "Entry 02: New data appended by fsmodule.js.\n";
        await fs.appendFile(TEST_FILE, extraContent);
        log("File updated with appended data.");

        // Read
        const data = await fs.readFile(TEST_FILE, "utf-8");
        log(`Content Read:\n"${data.trim()}"`);

        // Metadata & Stats
        const stats = await fs.stat(TEST_FILE);
        log(
            `File Stats: Size: ${stats.size} bytes | Created: ${stats.birthtime}`,
        );

        // Rename
        const newName = path.join(DATA_DIR, "system_logs.txt");
        await fs.rename(TEST_FILE, newName);
        log(`File renamed to: ${path.basename(newName)}`);
    } catch (err) {
        log(`CRUD Error: ${err.message}`);
    }
}

/**
 * 3. Working with Streams
 * CRITICAL: This shows you know how to handle memory efficiently.
 * Streams allow us to process large files without crashing the RAM.
 */
async function demonstrateStreams() {
    log("--- Starting Stream Operations (Memory Efficient) ---");

    return new Promise((resolve, reject) => {
        const writer = createWriteStream(LARGE_FILE);

        log("Writing large chunks of data via Stream...");
        for (let i = 0; i < 1000; i++) {
            writer.write(
                `Line ${i}: Simulating high-volume data stream chunk.\n`,
            );
        }
        writer.end();

        writer.on("finish", () => {
            log("Stream Write Finished.");

            // Now Read it back using a ReadStream
            const reader = createReadStream(LARGE_FILE, {
                encoding: "utf-8",
                highWaterMark: 1024,
            });
            let chunkCount = 0;

            reader.on("data", (chunk) => {
                chunkCount++;
                // We don't log the whole thing to keep console clean, just tracking chunks
            });

            reader.on("end", () => {
                log(
                    `Read stream complete. Processed ${chunkCount} data chunks.`,
                );
                resolve();
            });

            reader.on("error", (err) => reject(err));
        });
    });
}

/**
 * 4. Advanced: File System Watcher
 * Monitoring a file for real-time changes.
 */
async function startWatcher() {
    log("--- Initializing File Watcher ---");
    log("Watching for changes in the sandbox directory...");

    try {
        const watcher = fs.watch(DATA_DIR);

        // This is a simplified watcher loop
        (async () => {
            for await (const event of watcher) {
                log(
                    `Change Detected! Event Type: ${event.eventType} on File: ${event.filename}`,
                );
            }
        })();

        // Automatically stop watcher after 10 seconds for demo purposes
        setTimeout(() => {
            log("Stopping watcher...");
            process.exit(0); // Exit script
        }, 10000);
    } catch (err) {
        log(`Watcher Error: ${err.message}`);
    }
}

/**
 * 5. Directory Exploration
 * Listing files and identifying types (File vs Directory).
 */
async function listFiles() {
    try {
        log("--- Listing Directory Content ---");
        const entries = await fs.readdir(DATA_DIR, { withFileTypes: true });

        for (const entry of entries) {
            const type = entry.isDirectory() ? "[DIR]" : "[FILE]";
            log(`- ${type} ${entry.name}`);
        }
    } catch (err) {
        log(`List Error: ${err.message}`);
    }
}

/**
 * MAIN EXECUTION FLOW
 * We wrap everything in an async function to execute sequentially.
 */
const runMasterDemo = async () => {
    console.log("=============================================");
    console.log("      NODE.JS FILE SYSTEM MASTER CLASS       ");
    console.log("=============================================");

    await initializeEnvironment();
    await runFileOperations();
    await demonstrateStreams();
    await listFiles();

    log("Demo complete. Initializing Watcher (Auto-exit in 10s)...");
    await startWatcher();
};

// Start the application
runMasterDemo().catch((err) => console.error("FATAL ERROR:", err));

/**
 * WHY THIS IS BETTER:
 * 1. Uses fs/promises for modern async/await syntax.
 * 2. Demonstrates STREAMS, which is vital for senior backend roles.
 * 3. Handles recursive directory creation safely.
 * 4. Implements a Watcher to show real-time capabilities.
 * 5. Uses proper path resolution with the path module.
 */
