import { useState } from '#app';

export const useCounter = () => {
    const counter = useState('counter', () => Math.round(Math.random() * 1000));

    return {
        counter: `Test useCounter - counter - random value: ${counter.value}`,
    };
};
