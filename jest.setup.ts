import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill untuk TextEncoder dan TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
