// Run: node lib/frame.test.js
import assert from 'node:assert';
import { allowsFraming } from './frame.js';

const h = obj => new Headers(obj);
const site = 'https://shrikant-dev.vercel.app';

assert.equal(allowsFraming(h({}), site), true, 'no headers → allowed');
assert.equal(allowsFraming(h({ 'x-frame-options': 'DENY' }), site), false, 'DENY → blocked');
assert.equal(allowsFraming(h({ 'x-frame-options': 'SAMEORIGIN' }), site), false, 'SAMEORIGIN → blocked');
assert.equal(allowsFraming(h({ 'content-security-policy': `frame-ancestors 'self' ${site}` }), site), true, 'listed origin → allowed');
assert.equal(allowsFraming(h({ 'content-security-policy': "frame-ancestors 'self'" }), site), false, 'unlisted origin → blocked');
assert.equal(allowsFraming(h({ 'x-frame-options': 'DENY', 'content-security-policy': `default-src 'self'; frame-ancestors ${site}` }), site), true, 'CSP overrides XFO');
console.log('frame.test.js: all checks passed');
