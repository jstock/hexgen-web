// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;
