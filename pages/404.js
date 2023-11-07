import { useRouter } from "next/router";
import styles from "../styles/404.module.css";

export default function Error() {
    const router = useRouter();
    const handleBackClick = () => {
        router.push("/");
    };

    return (
        <div className={styles.container}>
            <title>NextJs SpeechRecognition</title>
            <div className={styles.name}>
                <a>NextJs SpeechRecognition</a>
            </div>
            <div className={styles.alert}>
                <a>This page is not existing</a>
            </div>
            <div className={styles.back}>
                <a onClick={handleBackClick}>Return</a>
            </div>
        </div>
    );
}