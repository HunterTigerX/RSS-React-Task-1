import '@testing-library/jest-dom';
import { server } from '../../__mocks__/server';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { installGlobals } from '@remix-run/node';

installGlobals();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
