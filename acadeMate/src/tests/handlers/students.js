import { http, HttpResponse } from 'msw';

const BASE = 'https://69fc380afce564e259177e83.mockapi.io/students';

export const studentHandlers = [
    http.get(BASE, () =>
        HttpResponse.json([
            { id: '1', name: 'Alice', studentId: 'S001', major: 'CS', createdAt: '2024-01-01T00:00:00.000Z', avatar: '' },
            { id: '2', name: 'Bob',   studentId: 'S002', major: 'Math', createdAt: '2024-01-02T00:00:00.000Z', avatar: '' },
        ])
    ),
    http.post(BASE, async ({ request }) => {
        const body = await request.json();
        return HttpResponse.json({ id: '3', ...body }, { status: 201 });
    }),
    http.put(`${BASE}/:id`, async ({ request }) => {
        const body = await request.json();
        return HttpResponse.json(body);
    }),
    http.delete(`${BASE}/:id`, () => new HttpResponse(null, { status: 200 })),
];
