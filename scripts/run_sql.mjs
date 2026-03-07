#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import db from '../src/models/db.js';

const cmd = process.argv[2];
if (!cmd) {
    console.log('Usage: node scripts/run_sql.mjs <practice|seed|drop-faculty|truncate-faculty>');
    process.exit(1);
}

const cwd = process.cwd();

const readSqlFile = (relPath) => {
    const full = path.resolve(cwd, relPath);
    if (!fs.existsSync(full)) throw new Error(`SQL file not found: ${full}`);
    return fs.readFileSync(full, 'utf8');
};

const finish = async () => {
    try {
        if (typeof db.close === 'function') await db.close();
        else if (typeof db.end === 'function') await db.end();
    } catch (err) {
        // ignore
    }
};

(async () => {
    try {
        if (cmd === 'practice') {
            const sql = readSqlFile('src/models/sql/practice.sql');
            console.log('Applying practice.sql...');
            await db.query(sql);
            console.log('Applied practice.sql');
        } else if (cmd === 'seed') {
            const sql = readSqlFile('src/models/sql/seed.sql');
            console.log('Applying seed.sql...');
            await db.query(sql);
            console.log('Applied seed.sql');
        } else if (cmd === 'drop-faculty') {
            console.log('Dropping faculty table...');
            await db.query('DROP TABLE IF EXISTS faculty CASCADE;');
            console.log('Dropped faculty');
        } else if (cmd === 'truncate-faculty') {
            console.log('Truncating faculty table...');
            await db.query('TRUNCATE TABLE faculty RESTART IDENTITY;');
            console.log('Truncated faculty');
        } else {
            console.log('Unknown command:', cmd);
        }
    } catch (err) {
        console.error('Error executing command:', err.message);
        process.exitCode = 1;
    } finally {
        await finish();
    }
})();
