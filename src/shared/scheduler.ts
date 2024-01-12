function getRandomInterval() {
    // Generates random interval between 45 and 120 seconds
    return Math.floor(Math.random() * (120000 - 45000)) + 45000; 
}

export async function schedule(callback: Function) {
    try {
        await callback();
    } catch (error) {
        console.error('Error executing sequence:', error);
    } finally {
        const interval = getRandomInterval();

        const now = new Date();
        const nextExecutionTime = new Date(now.getTime() + interval).toLocaleTimeString();

        console.log(`\nNext run scheduled at: ${nextExecutionTime}`);

        setTimeout(() => schedule(callback), interval);
    }
}
