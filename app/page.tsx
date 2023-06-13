import styles from "./page.module.css";
import Form from "./components/Form";
import Posts from "./components/Posts";

// posts is initially empty when loading the page => problem

export default async function Home() {
	return (
		<main className={styles.main}>
			<Form />
			<h1 className="big-title">Anime posts </h1>

			{/* @ts-ignore */}
			<Posts />
		</main>
	);
}
