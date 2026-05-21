/**
 * Custom Middleware: postLogger
 * Logs every successful POST request with timestamp and user ID.
 */
function postLogger(req, res, next) {
  if (req.method === "POST") {
    // We hook into the response finish event to log only successful requests
    res.on("finish", () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const timestamp = new Date().toISOString();
        const userId = req.session?.userId || "unauthenticated";
        console.log(`📝 [POST LOG] Timestamp: ${timestamp} | Path: ${req.path} | UserID: ${userId} | Status: ${res.statusCode}`);
      }
    });
  }
  next();
}

module.exports = { postLogger };
