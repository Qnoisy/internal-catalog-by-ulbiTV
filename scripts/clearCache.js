// scripts/clearCache.js

const fs = require('fs');
const path = require('path');

const cachePath = path.resolve(__dirname, '../node_modules/.cache');

try {
	fs.rmSync(cachePath, {
		recursive: true,
		force: true
	});

	console.log(`✓ Cache removed: ${cachePath}`);
} catch (error) {
	console.error('✗ Failed to remove cache:', error);
	process.exit(1);
}
