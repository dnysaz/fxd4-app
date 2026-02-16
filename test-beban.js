import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    // Skenario: Naikkan beban ke 50 user dalam 10 detik, tahan 20 detik
    stages: [
        { duration: '10s', target: 50 }, 
        { duration: '20s', target: 50 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<200'], // 95% request harus di bawah 200ms
    },
};

export default function () {
    const res = http.get('https://fxd4.vercel.app');
    
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time kencang': (r) => r.timings.duration < 100,
    });

    sleep(1); // User beraksi setiap 1 detik
}