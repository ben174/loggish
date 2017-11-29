Build with the assumption that this redis cache will be flushed regularly, maybe offloaded to a database.
If the cache is allowed to continue to grow infinitely, fetching the logs will become expensive quickly.
