"use strict";

// this is a sample cache integration using redis instead of the default
// in-memory cache
const cacheManager = require("cache-manager");
const redisStore = require("cache-manager-ioredis");
const log = require("../../server/logger");

// if we are using a redis instance, listen for errors
if (process.env.REDIS_URL) {
  const uri = new URL(process.env.REDIS_URL);

  // If redis URI found, use redis, otherwise fall back to in memory cache
  const cache = cacheManager.caching({
    store: redisStore,
    host: uri.hostname,
    password: uri.password,
    port: uri.port,
    keyPrefix: "library",
    db: 0,
    // TTL is infinite, redis expiration strategy is set at Heroku level
    ttl: 0,
  });

  const redisClient = cache.store.getClient();
  redisClient.on("error", (err) => log.error("ERROR FROM REDIS CLIENT:", err));
} else {
  const cache = cacheManager.caching({ store: "memory" });
}

module.exports = cache;
