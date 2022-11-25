import React, { useRef, useEffect } from 'react';

const OutputCanvas = (p) => {
    const canvasRef = useRef(null);
    const { sounds } = p;
    const draw = (ctx) => {
        ctx.fillStyle = '#2563eb';
        if (!sounds || sounds.length === 0) return;
        sounds.map((i) => {
            ctx.beginPath();
            ctx.arc(50, i.height, 2, 0, 2 * Math.PI);
            ctx.fill();
        });
        return;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = '#4b5563';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        draw(context);
    }, [draw]);

    return <canvas ref={canvasRef} {...p} />;
};

export { OutputCanvas };
