import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddStudentForm from './AddStudentForm';
import { renderWithProviders } from '../tests/utils';

describe('AddStudentForm', () => {
    test('shows validation error when required fields are empty', async () => {
        renderWithProviders(<AddStudentForm />);
        await userEvent.click(screen.getByRole('button', { name: /enroll student/i }));
        expect(screen.getByText(/name and student id are required/i)).toBeInTheDocument();
    });

    test('submits form successfully and resets fields', async () => {
        renderWithProviders(<AddStudentForm />);
        await userEvent.type(screen.getByPlaceholderText(/full name/i), 'Charlie');
        await userEvent.type(screen.getByPlaceholderText(/student id/i), '12345');
        await userEvent.click(screen.getByRole('button', { name: /enroll student/i }));
        await waitFor(() => {
            expect(screen.getByPlaceholderText(/full name/i)).toHaveValue('');
        });
    });
});
