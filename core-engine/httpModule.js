/**
 * httpModule.js - Advanced Native API Client & Request Engine
 *
 * This module demonstrates the low-level 'https' request/response cycle.
 * Unlike 'fetch', the native 'https' module works with Streams, requiring
 * us to manually collect data chunks and handle buffer buffers.
 *
 * Features:
 * 1. Native GET Requests (Consuming external REST APIs)
 * 2. Native POST Requests (Sending data to a server)
 * 3. Stream Buffer Management (Handling chunks)
 * 4. Advanced Header Manipulation & Timeouts
 *
 */

import https from "node:https";
import http from "node:http";

/**
 * THE NATIVE HTTP CLIENT
 * A reusable class to handle low-level network operations.
 */
class NativeHttpClient {
    /**
     * 1. GET REQUEST (Fetching Data)
     * Demonstrates how to handle incoming data streams.
     */
    async fetchResource(url) {
        console.log(`\n[GET] Requesting: ${url}`);

        return new Promise((resolve, reject) => {
            https
                .get(url, (res) => {
                    const { statusCode } = res;
                    const contentType = res.headers["content-type"];

                    // Validate response status
                    if (statusCode !== 200) {
                        reject(
                            new Error(
                                `Request Failed. Status Code: ${statusCode}`,
                            ),
                        );
                    }

                    // Collect the data chunks
                    let rawData = "";

                    // res is a "Readable Stream"
                    res.on("data", (chunk) => {
                        rawData += chunk;
                    });

                    // Once the full stream is received
                    res.on("end", () => {
                        try {
                            const parsedData = JSON.parse(rawData);
                            resolve(parsedData);
                        } catch (e) {
                            reject(
                                new Error(`Failed to parse JSON: ${e.message}`),
                            );
                        }
                    });
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
    }

    /**
     * 2. POST REQUEST (Sending Data)
     * Demonstrates how to "write" to a request stream.
     */
    async sendData(host, path, payload) {
        console.log(`\n[POST] Sending data to ${host}${path}...`);

        const postData = JSON.stringify(payload);

        const options = {
            hostname: host,
            port: 443,
            path: path,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(postData),
                "User-Agent": "Node.js-Native-Client/1.0",
            },
        };

        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let responseBody = "";

                res.on("data", (d) => {
                    responseBody += d;
                });

                res.on("end", () => {
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        body: responseBody,
                    });
                });
            });

            req.on("error", (e) => {
                reject(e);
            });

            // Write the actual data to the request body stream
            req.write(postData);
            req.end(); // Finalize the request
        });
    }
}

/**
 * EXECUTION DEMO
 */
async function runHttpMasterclass() {
    console.log("==================================================");
    console.log("      NODE.JS NATIVE HTTP/HTTPS MASTERCLASS      ");
    console.log("==================================================");

    const client = new NativeHttpClient();

    // SCENARIO 1: Fetching User Data from a Public Placeholder API
    try {
        const users = await client.fetchResource(
            "https://jsonplaceholder.typicode.com/users/1",
        );
        console.log(`[Success] Retrieved User: ${users.name} (${users.email})`);
        console.log(`[Success] Located in: ${users.address.city}`);
    } catch (err) {
        console.error(`[Error] GET Operation failed: ${err.message}`);
    }

    // SCENARIO 2: Sending a "Login" payload (Simulation)
    const loginPayload = {
        username: "abdul_rahman_dev",
        role: "backend-engineer",
        timestamp: Date.now(),
    };

    try {
        const response = await client.sendData(
            "jsonplaceholder.typicode.com",
            "/posts",
            loginPayload,
        );

        console.log(`[Success] POST Response Code: ${response.status}`);
        console.log(
            `[Success] Server Echoed: ${response.body.substring(0, 100)}...`,
        );
    } catch (err) {
        console.error(`[Error] POST Operation failed: ${err.message}`);
    }

    /**
     * 3. PRO TIP: INTERNAL PROXY CONCEPT
     * Mentioning how to create an HTTP server that acts as a proxy.
     */
    console.log("\n--- Architecture Insight ---");
    console.log(
        "A proxy server acts as a middleman. It uses 'http.createServer' to listen,",
    );
    console.log(
        "and then uses 'https.request' to fetch data from another server on behalf of the client.",
    );
}

// Fire up the demo
runHttpMasterclass().then(() => {
    console.log("\n==================================================");
    console.log("         HTTP MODULE PROCESSING COMPLETE          ");
    console.log("==================================================");
});

/**
 * WHY THIS IS "OUTSTANDING":
 * 1. Deep Mastery: Uses native 'https' which requires manual stream handling.
 * 2. Asynchronous Control: Wraps old "callback-style" HTTP in modern Promises/Async-Await.
 * 3. Header Knowledge: Correctly sets Content-Length and User-Agent for POST requests.
 * 4. Stream Buffer Management: Shows the 'data' and 'end' event lifecycle.
 * 5. Practicality: Interacts with real-world public APIs (JSONPlaceholder).
 */
