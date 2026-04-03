/**
 * nodeJsEvents.js - Advanced Event-Driven Architecture
 *
 * This module demonstrates how to build a custom System Monitoring
 * tool using the 'events' module. It shows how to handle multiple
 * listeners, pass data, and handle errors via events.
 *
 */

import EventEmitter from "node:events";

// 1. Define a Custom Class that extends EventEmitter
// This is the industry standard for building "reusable" event logic.
class SystemMonitor extends EventEmitter {
    constructor() {
        super();
        this.status = "OFFLINE";
    }

    // Method to simulate starting the system
    start() {
        this.status = "ONLINE";
        console.log(`[System] Initializing...`);

        // Emit an 'online' event
        this.emit("online", { timestamp: new Date().toISOString() });
    }

    // Method to simulate a user login
    userLogin(userName) {
        // Emit event with data (Object)
        this.emit("login", {
            user: userName,
            id: Math.floor(Math.random() * 1000),
        });
    }

    // Method to simulate a critical error (like high temperature)
    triggerAlert(severity, message) {
        this.emit("alert", severity, message);
    }

    // Method to simulate a database query
    queryDatabase() {
        console.log("-> Running DB Query...");
        // Emit an event that triggers once
        this.emit("db_query");
    }
}

// 2. Initialize our System
const monitor = new SystemMonitor();

/**
 * 3. LOGGING LISTENERS
 * These "Listen" for the events and act on them.
 */

// Listener for System Online
monitor.on("online", (info) => {
    console.log(
        `\x1b[32m%s\x1b[0m`,
        `[Status] System is now ONLINE as of ${info.timestamp}`,
    );
});

// Listener for User Logins
monitor.on("login", (data) => {
    console.log(
        `\x1b[36m%s\x1b[0m`,
        `[Log] User ${data.user} (ID: ${data.id}) has logged in.`,
    );
});

// "Once" Listener - This will only trigger the FIRST time a query happens
monitor.once("db_query", () => {
    console.log(
        "[Log] First Database Query of the session. Authenticating connection...",
    );
});

// Critical Alert Listener
monitor.on("alert", (severity, msg) => {
    const color = severity === "CRITICAL" ? "\x1b[31m" : "\x1b[33m"; // Red or Yellow
    console.log(`${color}%s\x1b[0m`, `[ALERT: ${severity}] ${msg}`);
});

// Global Error Handler - Essential for production code
monitor.on("error", (err) => {
    console.error(`[FATAL] A system error occurred: ${err.message}`);
});

/**
 * 4. EXECUTION FLOW
 * Simulating real-world server activity over time.
 */

console.log("=============================================");
console.log("      NODE.JS EVENT-DRIVEN SYSTEM MONITOR    ");
console.log("=============================================");

// Step 1: Start System
monitor.start();

// Step 2: Simulate various activities using timers
setTimeout(() => {
    monitor.userLogin("Abdul_Rahman");
}, 1000);

setTimeout(() => {
    monitor.queryDatabase();
}, 2000);

setTimeout(() => {
    // Simulate a second query (The 'once' listener won't trigger this time!)
    monitor.queryDatabase();
}, 3000);

setTimeout(() => {
    monitor.userLogin("Guest_User");
}, 4000);

setTimeout(() => {
    // Simulate a warning
    monitor.triggerAlert("WARNING", "Server Room Temperature: 45°C");
}, 5000);

setTimeout(() => {
    // Simulate a critical failure
    monitor.triggerAlert(
        "CRITICAL",
        "CPU Overheating! Shutting down modules...",
    );
    console.log("---------------------------------------------");
    console.log("Demo Complete: All Event types handled.");
}, 7000);

/**
 * WHY THIS IS BETTER:
 * 1. Uses Class Inheritance (extends EventEmitter).
 * 2. Demonstrates 'once' vs 'on'.
 * 3. Shows how to pass complex Objects through events.
 * 4. Uses ANSI Color Codes in console for professional UI.
 * 5. Includes a standard 'error' event listener.
 */
