import { authorize } from './auth';
import { listLabels } from './gmail';

(async () => {
    try {
        const auth = await authorize();
        await listLabels(auth);
    } catch (err) {
        console.log(err);
    }
})();
