import { createRoot } from 'react-dom/client';

jest.mock('react-dom/client', () => {
  const mockRender = jest.fn();
  return {
    createRoot: jest.fn(() => ({
      render: mockRender,
    })),
    __mockRender: mockRender, // Tambahkan ini untuk memeriksa panggilan render
  };
});

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
    const { __mockRender } = jest.requireMock('react-dom/client');
    expect(__mockRender).toHaveBeenCalled();
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
