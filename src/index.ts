import { authorize } from './auth';
import { listLabels } from './gmail';


(async () => {
    try {
        console.log("MailAutoResponder")
        const auth = await authorize();
        await listLabels(auth);
        // console.log(auth);
    } catch (err) {
        console.log(err);
    }
})();


