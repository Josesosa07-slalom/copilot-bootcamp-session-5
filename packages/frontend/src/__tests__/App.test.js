import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('should delete a todo when delete button is clicked', async () => {
  const testQueryClient = createTestQueryClient();
  const mockTodos = [
    { id: 1, title: 'Test Todo 1', completed: false },
    { id: 2, title: 'Test Todo 2', completed: false },
  ];

  // Mock fetch to return todos initially, then handle delete
  global.fetch
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([mockTodos[1]]),
    });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for todos to load
  await waitFor(() => {
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
  });

  // Find all buttons and identify delete button by aria-label or role
  const allButtons = screen.getAllByRole('button');
  // Delete buttons are the ones with error color (second and fourth buttons after Add button)
  const deleteButton = allButtons[2]; // First delete button (after checkbox and edit button)
  await userEvent.click(deleteButton);

  // Verify DELETE request was made
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/todos/1'),
      expect.objectContaining({
        method: 'DELETE',
      })
    );
  });

  // Verify todo is removed from UI
  await waitFor(() => {
    expect(screen.queryByText('Test Todo 1')).not.toBeInTheDocument();
  });
});

test('should display correct stats for incomplete and completed todos', async () => {
  const testQueryClient = createTestQueryClient();
  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false },
    { id: 4, title: 'Todo 4', completed: true },
    { id: 5, title: 'Todo 5', completed: true },
  ];

  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(mockTodos),
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for todos to load
  await waitFor(() => {
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
  });

  // Verify stats: 2 incomplete, 3 completed
  expect(screen.getByText('2 items left')).toBeInTheDocument();
  expect(screen.getByText('3 completed')).toBeInTheDocument();
});

test('should display empty state message when no todos exist', async () => {
  const testQueryClient = createTestQueryClient();

  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve([]),
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for loading to complete
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  // Verify empty state message is displayed
  expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
});

test('should display error message when API request fails', async () => {
  const testQueryClient = createTestQueryClient();

  // Mock fetch to reject (network error)
  global.fetch.mockRejectedValueOnce(new Error('Network error'));

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for error to be displayed
  await waitFor(() => {
    expect(screen.getByText(/error loading todos/i)).toBeInTheDocument();
  });
});

test('should edit a todo when edit button is clicked and saved', async () => {
  const testQueryClient = createTestQueryClient();
  const mockTodos = [
    { id: 1, title: 'Original Title', completed: false },
  ];

  // Mock fetch for initial load, then edit request, then refetch
  global.fetch
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 1, title: 'Updated Title', completed: false }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([{ id: 1, title: 'Updated Title', completed: false }]),
    });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for todo to load
  await waitFor(() => {
    expect(screen.getByText('Original Title')).toBeInTheDocument();
  });

  // Click edit button (first icon button after the checkbox)
  const allButtons = screen.getAllByRole('button');
  const editButton = allButtons[1]; // Edit button is the second button (after Add button, before delete)
  await userEvent.click(editButton);

  // Find edit input and change value
  const editInput = screen.getByDisplayValue('Original Title');
  await userEvent.clear(editInput);
  await userEvent.type(editInput, 'Updated Title');

  // Save the edit (assume there's a save button or enter key)
  await userEvent.keyboard('{Enter}');

  // Verify PUT/PATCH request was made
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/todos/1'),
      expect.objectContaining({
        method: expect.stringMatching(/PUT|PATCH/),
        body: expect.stringContaining('Updated Title'),
      })
    );
  });

  // Verify updated title appears
  await waitFor(() => {
    expect(screen.getByText('Updated Title')).toBeInTheDocument();
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
