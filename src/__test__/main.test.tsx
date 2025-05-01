import { createRoot } from 'react-dom/client';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

describe('main.tsx', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the App component when root element is found', () => {
    // Mock elemen root
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);

    // Jalankan ulang file main.tsx
    jest.isolateModules(() => {
      require('../main');
    });

    // Pastikan createRoot dipanggil dengan elemen root
    expect(createRoot).toHaveBeenCalledWith(rootElement);

    // Pastikan render dipanggil
    const mockRender = createRoot(rootElement).render;
    expect(mockRender).toHaveBeenCalled();
  });

  it('logs an error when root element is not found', () => {
    // Hapus elemen root jika ada
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.remove();
    }

    // Mock console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Jalankan ulang file main.tsx
    jest.isolateModules(() => {
      require('../main');
    });

    // Pastikan console.error dipanggil
    expect(consoleErrorSpy).toHaveBeenCalledWith('Root element not found');

    consoleErrorSpy.mockRestore();
  });
});
