import { JSDOM } from 'jsdom';
import hook from 'css-modules-require-hook';

global.document = new JSDOM('<!doctype html><html><body></body></html>').window.document;
global.window = document.defaultView;
global.navigator = global.window.navigator;

hook({
  generateScopedName: '[name]__[local]___[hash:base64:5]'
});
