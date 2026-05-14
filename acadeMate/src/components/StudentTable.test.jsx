import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import StudentTable from './StudentTable';
import { renderWithProviders } from '../tests/utils';
import { server } from '../tests/server';

const BASE = 'https://69fc380afce564e259177e83.mockapi.io/students';

describe('StudentTable', () => {
    test('shows loading spinner initially', () => {
        renderWithProviders(<StudentTable />);
        expect(screen.getByText(/loading students/i)).toBeInTheDocument();
    });

    test('renders student rows after data loads', async () => {
        renderWithProviders(<StudentTable />);
        await waitFor(() => {
            expect(screen.getByText('Alice')).toBeInTheDocument();
            expect(screen.getByText('Bob')).toBeInTheDocument();
        });
    });

    test('shows error message when fetch fails', async () => {
        server.use(
            http.get(BASE, () => new HttpResponse(null, { status: 403 }))
        );
        renderWithProviders(<StudentTable />);
        await waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });
    });
});
